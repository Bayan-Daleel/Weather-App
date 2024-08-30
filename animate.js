const cityInputElm=document.getElementById("city-input");
const formElm=document.querySelector("form");
const weatherElmnt=document.getElementById("weather-data");

const keyApi="3f3b07e50f2e34011d95fe65d9a1e020";

formElm.addEventListener("submit",(e) => {
       
    e.preventDefault();
    const cityValue=cityInputElm.value;
    console.log(cityValue);
    getWeaherData(cityValue);
});


async function getWeaherData(cityValue){
    try{
   const response=await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${keyApi}&units=metric`);
 
    const data= await response.json();
   
    const temperature=Math.round(data.main.temp);
    
    const description=data.weather[0].description;

    const icon=data.weather[0].icon;

    const details=[
        `feels like: ${data.main.feels_like}`,
        `Humadity :${data.main.humidity} %`,
        `Wind Speed : ${data.wind.speed} m/s`
    ];
   // console.log(details);
   weatherElmnt.querySelector(".icon").innerHTML=`
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">`;
    
    weatherElmnt.querySelector(".tempreture").textContent=`${temperature}°C`;
    weatherElmnt.querySelector(".descreption").textContent=`${description}`;
    weatherElmnt.querySelector(".details").innerHTML=details.map(
      (detail)=>`<div>${detail}</div>`).join('');

    if(!response.ok) {
        throw new Error("Network response was not ok");
    }
    }
    catch(error){
        weatherElmnt.querySelector(".icon").innerHTML=``;
        
        weatherElmnt.querySelector(".tempreture").textContent=``;
        weatherElmnt.querySelector(".details").innerHTML="";
    weatherElmnt.querySelector(".descreption").textContent=`not found the city`;

    }
}