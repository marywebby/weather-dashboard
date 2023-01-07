let apiKey = `d4d47f02cada0dd2afaf7aee439b9c40`
let searchInput = document.querySelector("#search-input")
let searchButton = document.querySelector("#search-button")

// consol logging the city name typed in 
// fetching data from API when searching for a city 
searchButton.addEventListener("click", function (event) {
    let cityName = searchInput.value
    console.log(cityName)
    event.preventDefault()

    var ulCitiesList = document.createElement("ul")
    ulCitiesList.textContent = cityName
    document.querySelector(".previous-cities-list").appendChild(ulCitiesList)
    localStorage.setItem(cityName, ulCitiesList)



    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            var city = data.city.name
            var cardArray = []
            for (var i =0; i<data.list.length; i++){
                var timeStamp = data.list[i].dt_txt.split(" ")[1]
                if (timeStamp === "12:00:00") {
                    cardArray.push(data.list[i])
                }
            }
            displayForcast(cardArray, city)
            var weather = data.list[0]
            var currentData = { temp: weather.main.temp, wind: weather.wind.speed, humidity: weather.main.humidity, name:data.city.name}
            displayCurrentWeather(currentData)
        });
});

// trying to print local storage here, have items already set but need to grab and print on page when reloaded
// $(".previous-cities-list").val(localStorage.getItem(cityName));

function displayForcast (weatherArray, cityName) {
    console.log(weatherArray)
    document.querySelector(".container-cards").innerHTML = ""
    for (var i = 0 ; i < weatherArray.length ; i ++) {
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
        ulCard.append(liCardName, liCardTemp, liCardWind, liCardHumidity)
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


