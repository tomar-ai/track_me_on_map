'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(position){
    console.log("Position is correct", position)
    const { latitude } = position.coords;
    const { longitude} = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude]
    const map = L.map('map').setView(coords, 13 );

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click', function(mapE){

        mapEvent = mapE;
        // console.log(mapEvent);// given us the cordinate of the event

        form.classList.remove('hidden')
        inputDistance.focus();

}, function(){
    alert("Position is untraceable")
})
})
};

form.addEventListener('submit', function(e){

    e.preventDefault();
    // display marker

    const {lat, lng} = mapEvent.latlng;
    console.log(`this is`, lat, lng)
    console.log(`this`, map)
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
            L.popup({
                maxwidth : 250,
                minwidth : 100,
                autoclose : false,
                closeOnClick : false,
                className :'running-popup',

                })
            )
         .setPopupContent("Workout")
    .openPopup();
// console.log(map)
})