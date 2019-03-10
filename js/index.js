const apiKey = "9c3fe5394573fc5670e07c55ec77eba6";

//getting all the required elements
let input = document.querySelector("#search-txt");
let search = document.querySelector("#search-btn");
let displayCity = document.querySelector("#city-name");
let cityIcon = document.querySelector("#icon");
let temperature = document.querySelector("#temp");
let humidity = document.querySelector("#humidity-div");

//by pressing enter, trigger a function
input.addEventListener('keyup', function (e) {
    //console.log(e);
    e.key == "Enter" ? fetchWeatherDetails() : false;
})
//clicks on search icon
search.addEventListener('click', function (e) {
    //console.log(e);
    fetchWeatherDetails();
})

//call http request function to get data
function fetchWeatherDetails() {
    if (input.value != '') {
        let url = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&appid=" + apiKey;
        //console.log(url);
        httpRequestAsync(url);
    }
}


//request & response
function httpRequestAsync() {
    //browser built-in object XMLHttpRequest to exchange data
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4){
            if(this.status == 200) {
            action(this.responseText);
            }
            else{
                alert((JSON.parse(this.responseText)).message);
                input.value="";
            }
        }
    }
    //using arguments object to get arguments
    let url= arguments[0];
    xhttp.open("GET", url, true);
    xhttp.send();
}

//show city name, temperature, humidity
function action(response) {
    //convert to json object from string
    let objResponse = JSON.parse(response);
        displayCity.textContent = objResponse.name;
        cityIcon.src = "http://openweathermap.org/img/w/" + objResponse.weather[0].icon + ".png";
    
        humidity.textContent = objResponse.main.humidity + "%";
        //default temperature's unit kelvin(response)
        //Tc=Tk-273
        temperature.textContent = parseInt(objResponse.main.temp - 273) + "°";

}




