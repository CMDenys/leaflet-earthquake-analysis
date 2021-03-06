
//////  HW SCRIPT //////////////
////////////////////////////////


// Creating the map object
// Using Albuquerque, NM as center point
var myMap = L.map("map", {
    center: [35.0844, -106.6504],
    zoom: 6
});
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
  
  
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson"


d3.json(url).then(function(data) {
    console.log(data)
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        } 
        return magnitude * 4;
    }
    

    function getColor(myColor) {
        if (myColor <= 2.5) {
            myColor = "lightgreen"
        }
        else if (myColor > 2.5 && myColor <= 5.4) {
            myColor = "green"
        }
        else if (myColor >= 5.5 && myColor <= 6) {
            myColor = "darkgreen"
        }
        else if (myColor >= 6.1 && myColor <= 6.9) {
            myColor = "yellow"
        }
        else if (myColor >= 7 && myColor <= 7.9) {
            myColor = "orange"
        }
        else if (myColor >= 8) {
            myColor = "red"
        }    
        return myColor
    }

    

    //Create object (array of features)
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return new L.CircleMarker(latlng, {radius: 8, 
                fillOpacity: 1, 
                color: 'black', 
                fillColor: getColor(feature.properties.mag),
                weight: 1,
                radius: getRadius(feature.properties.mag)
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on(
                {
                    "mouseover": function(event) {
                        event.target.bindPopUp()
                    },
                    "mouseout": function(event) {
                        event.target.bindPopUp()
                    }
                    // "click": function(event) {
                    //     console.log(event);
                    //     myMap.fitBounds(event.target.getBounds());    
                    // }
                } 
            );    
            layer.bindPopup(`<h2>${feature.properties.mag}</h2><hr>`)
        }
    }).addTo(myMap)
})



    
  