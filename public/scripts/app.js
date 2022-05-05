// This script file is for DOM manipulation

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    console.log(data)
    const cityDetails = data.cityDetails;  // make local varaibles with same name
    const weather = data.weather;

    // update details template
    details.innerHTML = `<h5 class="my-3 font-bold">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="text-4xl my-6">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`;

    // Update day/night & icon images
    const iconSrc = `/public/images/icons/${weather.WeatherIcon}.svg`
    let timeSrc = null;
    // Day/Night time icons
    if (weather.IsDayTime) {
        timeSrc = '/public/images/day.svg';
    } else {
        timeSrc = '/public/images/night.svg';
    }
    time.setAttribute('src', timeSrc);
    // weather Icon
    icon.setAttribute('src', iconSrc);

    // remove hidden class if present
    if(card.classList.contains('hidden')) {
        card.classList.remove('hidden');
    }
}

const updateCity = async (city) => {
    // console.log(city)
    const cityDetails = await getCity(city);  // runs getCity from forecast.js API file
    const weather = await getWeather(cityDetails.Key); // gets weather data

    //console.log('cityDetails: ', cityDetails);
    //console.log('weather: ', weather);
    return {      // returns a promise. not data
        cityDetails : cityDetails,
        weather : weather
    };

    //return {cityDetails, weather};  // Object shorthand
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();   // to prevent default action

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();  // resets form after submission

    // update the ui with city name
    updateCity(city)
        .then(data => updateUI(data))  // to access data from updateCity promise
        .catch(err => console.log(err));
})