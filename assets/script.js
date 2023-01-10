let apiKey = `d4d47f02cada0dd2afaf7aee439b9c40`
let searchInput = document.querySelector("#search-input")
let searchButton = document.querySelector("#search-button")
var cities = JSON.parse(localStorage.getItem("Cities"))||[]

// consol logging the city name typed in 
// fetching data from API when searching for a city 
searchButton.addEventListener("click", function (event) {
    let cityName = searchInput.value
    event.preventDefault()
    getForcast(cityName)
    

});

function getForcast (cityName) {
if (cityName === "" || cityName === undefined || cityName === null) {
    document.getElementById("city-alert").removeAttribute("class")
    setTimeout(function(){
        document.getElementById("city-alert").setAttribute("class", "hide")
    }, 1500)
    return ;
}

let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`
fetch(url)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        var city = data.city.name
        if (!cities.includes(city)){
            cities.push(city)
            localStorage.setItem("Cities", JSON.stringify(cities))
        }
        var cardArray = []
        for (var i =0; i<data.list.length; i++){
            var timeStamp = data.list[i].dt_txt.split(" ")[1]
            if (timeStamp === "12:00:00") {
                cardArray.push(data.list[i])
            }
        }
        displayForcast(cardArray, city, data)
        var weather = data.list[0]
        var currentData = { temp: weather.main.temp, wind: weather.wind.speed, humidity: weather.main.humidity, name:data.city.name}
        displayCurrentWeather(currentData)
    });
}


function createButton () { 
    console.log(cities)
    for (var i = 0; i <cities.length; i++){
        var cityButton = document.createElement("button")
        cityButton.textContent = cities[i]
        cityButton.setAttribute("value", cities[i])
        cityButton.onclick = function(){
            getForcast(this.value)
        }
        document.querySelector(".previous-cities-list").appendChild(cityButton)
    }
}
createButton()


function displayForcast (weatherArray, cityName, data) {
    document.querySelector(".container-cards").innerHTML = ""
    for (var i = 0 ; i < weatherArray.length ; i ++) {
        var weatherList = data.list
        var cardIcon = document.createElement("img")
        cardIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherList[i].weather[0].icon + "@2x.png")
        var cardDiv = document.createElement("div")
        cardDiv.setAttribute("class", "card")
        cardDiv.setAttribute("style", "width:18rem")
        var cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body")
        var ulCard = document.createElement("ul")
        ulCard.setAttribute("class", "ulCard")
        // ul card attribute for name, temp, wind, and humidity

        // card name
        var liCardName = document.createElement("li")
        liCardName.setAttribute("class", "liName")
        liCardName.innerText = cityName
        // card temp
        var liCardTemp = document.createElement("li")
        liCardTemp.setAttribute("class", "liTemp")
        liCardTemp.innerText = "Temperature: " + weatherArray[i].main.temp
        // card wind
        var liCardWind = document.createElement("li")
        liCardWind.setAttribute("class", "liWind")
        liCardWind.innerText = "Wind Speed: " + weatherArray[i].wind.speed + " mph"
        // card humidity
        var liCardHumidity = document.createElement("li")
        liCardHumidity.setAttribute("class", "liHumidity")
        liCardHumidity.innerText = "Humidity " + weatherArray[i].main.humidity + "%"
        // appending the card container 
        cardDiv.appendChild(cardBody)
        cardBody.appendChild(ulCard)
        ulCard.append(cardIcon, liCardName, liCardTemp, liCardWind, liCardHumidity)
        document.querySelector(".container-cards").appendChild(cardDiv)
    }
}


function displayCurrentWeather (weatherobj){
    // earses the current weather box when the same city is searched again
    document.querySelector(".container-info").innerHTML = ""
    // displays the name of the city 
    var pName = document.createElement("p")
    pName.textContent = weatherobj.name
    // display the temperature of the city 
    var pTemp = document.createElement("p")
    pTemp.textContent = "Temperature: " + weatherobj.temp
    // display the wind of the city 
    var pWind = document.createElement("p")
    pWind.textContent = "Wind: " + weatherobj.wind
    // displays the humditiy of the city 
    var pHumidity = document.createElement("p")
    pHumidity.textContent = "Humidity: " + weatherobj.humidity
    document.querySelector(".container-info").append(pName, pTemp, pWind, pHumidity)
}


