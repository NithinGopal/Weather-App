// This script file is to interact with the weather APIs

// API Key from accuweather
const key = 'nys6dG4ig5XIPLIDXGAL8nO1jA09hjd4';

// Get weather information from current conditions API with city key 
const getWeather = async (locationId) => {   // gets locationId from getCity fn.
    // Resource URL from accuweather for current weather
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${locationId}?apikey=${key}`;
    // Query parameters // refer under resource url in accuweather
    const response = await fetch(base + query);
    const data = await response.json();
    
    //console.log(data);  
    return data[0];   // returns a promise, not data.
}

// Get the city key with city API
const getCity = async (city) => {

    // Resource URL from accuweather for city search
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    
    // Query parameters // refer under resource url in accuweather
    const query = `?apikey=${key}&q=${city}`;  // takes the API Key and the search value

    const response = await fetch(base + query);
    const data = await response.json();

    //console.log(data);    // gives all possible searches related to the city name
    //console.log(data[0]); // gives the popular search option
    return data[0];         // returns a promise, not data.
};

getCity('manchester').then(data => {  // to get city key after getCity promise
    //console.log(data.Key)  
    return getWeather(data.Key);      // uppercase K in Key
}).then(data => {                     // to get data from getWeather promise
    //console.log(data);
}).catch(err => console.log(err));    // in case of errors


//getWeather('329260');