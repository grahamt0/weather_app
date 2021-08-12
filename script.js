window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=APIKEYHERE&units=imperial`;
        
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const {temp} = data.main;
                    const {icon} = data.weather[0];
                    const {main} = data.weather[0];
                    //Set DOM elements from the API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = data.weather[0].main;
                    locationTimezone.textContent = data.name;
                    //F to C Formula
                    let celcius = (temp - 32) * (5 / 9);
                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    //Change Celcuis to Farenheit
                    temperatureSection.addEventListener("click", () =>{
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celcius);
                        }else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temp;
                        }
                    })
                })
        });
    }

    function setIcons(icon, iconID){
        var skycons = new Skycons({color: "white"});
        var currentIcon;
        if(icon == "11d" || icon == "09d" || icon == "10d"){
            currentIcon = "RAIN";
        }
        else if(icon == "13d"){
            currentIcon = "SNOW";
        }
        else if(icon == "50d"){
            currentIcon = "FOG";
        }
        else if(icon == "01d"){
            currentIcon = "CLEAR_DAY";
        }
        else if(icon == "01n"){
            currentIcon = "CLEAR_NIGHT";
        }
        else if(icon == "02d"){
            currentIcon = "PARTLY_CLOUDY_DAY";
        }
        else if(icon == "02n"){
            currentIcon = "PARTLY_CLOUDY_NIGHT";
        }
        else{
            currentIcon = "CLOUDY";
        }
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
