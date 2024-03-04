// create fetch api to get countries data from restcountries api
const rest_countries = fetch("https://restcountries.com/v3.1/all")
.then((data)=>data.json())
.then((data1) =>{foo(data1)});

// define a function for geting weather details through the same fetch api and
// use openweathermap api for retriving weather data for specific lat. and long.
function weatherData (lat, lng, col) {
    let weather = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=8c21f9beb03fdd7fdc44ac76aecb21ca`)
    .then((data2)=>data2.json())
    .then((data3) =>bar(data3,col))

}

// insert data from openweatherapi into specific elements
function bar(data3, col) {

    let temp = col.querySelector("#temp");
    temp.innerHTML = `Temperature: ${data3.main.temp} Fahrenheit`
    let humidity = col.querySelector("#humidity");
    humidity.innerHTML = `Humidity: ${data3.main.humidity}%`
    let wind = col.querySelector("#wind");
    wind.innerHTML = `Windspeed: ${data3.wind.speed} m/s`

   
    let weather = col.querySelector("#weather");
    weather.innerHTML = `Weather: ${data3.weather[0].description}`
}

// create a container and 
let container = document.createElement("div");
container.className = "container";
let row = document.createElement("div");
row.className = "row"


// create a function for creating crads using bootstrap4.6
function foo(data1) {

    for (let obj of data1) {
        

        let col = document.createElement("div");
        col.className = "col-lg-4 col-sm-12"

        col.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${obj.flags.png}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${obj.name.common}</h5>
        <p class="card-text">Region: ${obj.region}</p>
        <p class="card-text">Country Code: ${obj.altSpellings[0]}</p>
        <a href="#" class="btn btn-primary">Click for Weather</a>

        <div class="weather-info">
        <div class="content"><div class="numerals">
        <p id="temp">Temperature: </p>
        <p id="humidity">Humidity: </p>
        <p id="wind">Wind: </p>
        <p id="weather">Weather: </p>
        </div>
      
   
        </div>
      </div>`;

      // call the function retriving data from the api and append it corresponding 
      // elements

      weatherData(obj.latlng[0], obj.latlng[1], col)
      
      row.append(col);
      let btn = col.querySelector(".btn");
      btn.addEventListener("click", (event)=>{
        event.preventDefault()
        let weather_info = col.querySelector(".weather-info");
        let btn = col.querySelector('.btn');

        // if the button is "Click for Weather", then the specific box will be in
        // hidden, once it is clicked, the button goes to "Cancel", the "weather-info"
        // block will be visible
       
        if (weather_info.style.display === "none" || weather_info.style.display ==="") {
            weather_info.style.display = "block";
            btn.textContent = "Cancel"
        } else {
            weather_info.style.display = "none";
            btn.textContent = "Click for Weather";
        }

      })

      // At the end, append all elements to the container
      // then continer to the body of the document

      container.append(row);
      document.body.append(container)
    }

}