const weather = document.querySelector('.js-weather');

const API_KEY = '622ade1306d981d65357a534797451db';
const COORDS = 'coords';

function getWeather(lat, lng) {
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGetSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGetSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);

    if (loadedCords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();