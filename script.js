const userInput = document.getElementById('user_input');
const searchButton = document.getElementById('search_button');
const weatherDiv = document.getElementById('weather');
const myKey = "071a7d8e67ff199c0211e175fa79551a"



const showLoading = () =>{
    weatherDiv.innerHTML ='<div class="loading">Loading...</div>';

};


async function getWeather(lat, long){
    showLoading();
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${myKey}`;
    console.log(url);
    const response = await fetch (
        url
    );
    const data = await response.json();
    displayWeather(data);

    // console.log(data);
    
}

 async function searchWeather(){
    const location = userInput.value.trim();
    if(location==""){
        alert("Please give a location");
        return;
    }
    if(location){
        showLoading();
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${myKey}`
        );
        const data = await response.json();
        console.log(data)
        displayWeather(data)
    }

}

function displayWeather(data){
    weatherDiv.innerHTML = `<div class="card">
                <h2>${data.name} <sup>${data.sys.country}</sup></h2>
                <h4>Teperature: ${Math.round(data.main.temp-273)}°</h4>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Wind Speed : ${data.wind.speed} </p>
            </div>`
}; 





// get user current location////////

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
        

        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        getWeather(lat, long);

    })
    
}searchButton.addEventListener('click',searchWeather)