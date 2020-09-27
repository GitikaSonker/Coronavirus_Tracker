$(document).ready(function () {
    var url = "https://www.trackcorona.live/api/provinces"//https://www.trackcorona.live/api/provinces"

    $.getJSON(url, function (data) {
        console.log(data)
    })
})

function updateMap() {
    console.log("Updating map with realtime data")
    fetch("https://www.trackcorona.live/api/provinces")
        .then(response => response.json())
        .then(rsp => {
            console.log(rsp.data)
            rsp.data.forEach(element => {
                latitude = element.latitude;
                longitude = element.longitude;

                cases = element.confirmed;
                if (cases > 200000) {
                    color = "rgb(255, 0, 0)";
                }

                else {
                    color = `rgb(${cases}, 0, 0)`;
                }

                // Mark on the map
                new mapboxgl.Marker({
                    draggable: false,
                    color: color
                }).setLngLat([longitude, latitude])
                    .addTo(map);
            });
        })
}

let interval = 20000;
setInterval(updateMap, interval); 