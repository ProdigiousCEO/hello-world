var map;
var infoWindow;
var markers = [];

function initMap() {
    let losAngeles = {lat: 34.063380, lng: -118.358080}
  map = new google.maps.Map(document.getElementById("map"), {
    center: losAngeles,
    zoom: 8,
    mapId:'fc4a17b11940c92d'
  });
  infoWindow = new google.maps.InfoWindow();
  getStores();
}

const createMarker = (latlng, name, address, openStatusText, phone, storeNumber) => {
    let html = `
        <div class="store-info-window">
            <div class="store-info-name">
                ${name}
            </div>
            <div class="store-info-open-status">
            ${openStatusText}
            </div>
            <div class="store-info-address">
                <div class="icon">
                    <i class="fas fa-location-arrow"></i>
                </div>
                <span>
                    ${address}
                </span>
            </div>
            <div class="store-info-phone">
                <div class="icon">
                    <i class="fas fa-phone-alt" ></i>
                </div>
                <span>
                    <a href="tel:${phone}">${phone}</a>
                </span>
            </div>
        </div>
    `;
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        label: `${storeNumber}`
    });
    google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent(html);
        infoWindow.open(map,marker);
    });
    markers.push(marker);
}

getStores = function() {
    const API_URL = "http://localhost:3001/api/stores";
    fetch(API_URL)
        .then((response)=>{
        if(response.status ==200){
            return response.json();
        } else {
            throw new Error(response.status);
            }
        }).then((data)=>{
            searchLocationsNear(data);
            setStoresList(data);
            setOnClickListener();
        })
        
    }

    const setOnClickListener = () => {
        let storeElements = document.querySelectorAll('.store-container');
        storeElements.forEach((elem, index) => {
            elem.addEventListener('click', () =>{ 
                google.maps.event.trigger(markers[index], 'click');
        
            })
        })
    }


const searchLocationsNear = (stores) => {
    var bounds = new google.maps.LatLngBounds();
    stores.forEach((store, index) => {
        let latlng = new google.maps.LatLng(
            store.location.coordinates[1],
            store.location.coordinates[0]);
        let name = store.storeName;
        let address = store.addressLines[0];
        let openStatusText = store.openStatusText;
        let phone = store.phoneNumber;
        bounds.extend(latlng);
        createMarker(latlng, name, address, openStatusText, phone, index+1)
    });
    map.fitBounds(bounds);
}

const setStoresList = (stores) => {
    let list = '';
    stores.forEach((store, index) => {
        list+= `
        <div class="store-container">
            <div class="store-container-background">
                <div class="store-info-container">
                    <div class="store-address">
                        <span>${store.addressLines[0]}</span>
                        <span>${store.addressLines[1]}</span>
                    </div>
                    <div class="store-phone-number">
                        ${store.phoneNumber}
                    </div>
                </div>
                <div class="store-number-container">
                    <div class="store-number">
                        ${index+1}
                    </div>
                </div>
            </div>
        </div>
    `;
})
document.querySelector('.stores-list').innerHTML = list;
}
    