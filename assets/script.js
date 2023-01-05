let apiKey = `d4d47f02cada0dd2afaf7aee439b9c40`
let searchInput = document.querySelector("#search-input")
let searchButton = document.querySelector("#search-button")

// consol logging the city name typed in 
// fetching data from API when searching for a city 
searchButton.addEventListener("click", function (event) {
    let cityName = searchInput.value
    console.log(cityName)
    event.preventDefault()

    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
        fetch(url)
            .then(function (response) {
                 return response.json()
             }) 
            .then (function (data) {
                    console.log(data);
             });
        });


// data.list[0].main.temp


// function searchCity ()


// function to add previous city names to previous cities ul and display 


// funtion to display the city name and current time when searched 


// function to apply the current temperature + wind + humidity 


// function to list the next 5 days weather forcast
        // functon to add in the selected picture icons in relation to that day 
            // for loop, "if the temperature is between 0 - 20, 20-40 , 40-60, 60-80, 80-100 "
            // or look to see if emoji is sent with the weather 
            // ask john 





// knowing which time to pick for more accurate data 

