
const URL_PROVINCIES = "https://www.trackcorona.live/api/provinces";
let dataApi = {};
let provinces = [];
const infoWindowProvinces = province => {
  return `<div class="content">
  <ul>
  <strong>
  Ciudad: <FONT COLOR="#FF8000" >${province.location}</FONT> </br>
  <li style="color: green;" ><a> Recuperados: </a>${province.recovered}</li> </br>
  <li style="color: red;"><a>Muertes: </a>${province.dead}</li> </br>
  <li><a>Actualizacion: </a>${province.updated} </li></br></strong>
    </ul>
  </div`;
};

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 37.09, lng: -95.712 }
  });

  newFunction();
  const URL_COUNTRIES = "https://www.trackcorona.live/api/countries";
let countries = [];
const infoWindowcountries = countrie => {
  return `<div class="content">
  <ul>
  <strong>Pais:<FONT COLOR= "#FF0000">  ${countrie.location}</FONT> </br>
  <li style="color: green;" ><a>Recuperados:  </a>${countrie.recovered} </li></br>
  <li style="color: red;"><a>Muertes: </a>${countrie.dead} </li></br>
  <li><a>Actualizacion: </a>${countrie.updated} </li></br>
    </strong>
    </ul>
  </div`;
  };
  fetch(URL_COUNTRIES)
        .then(response => response.json())
        .then(data => {
          countries = [...data.data];
          console.log(countries);
          for (let index = 0; index < data.data.length; index++) {
            const countrie = data.data[index];
            if (countrie.country_code === "us") {
              const marker = new google.maps.Marker({
                position: { lat: countrie.latitude, lng: countrie.longitude },
                map: map,
                title: countrie.location,
                icon:'./virus.png'
              });
              const infowindow = new google.maps.InfoWindow({
                content: infoWindowcountries(countrie)
              });
              marker.addListener("mouseover", function () {
                infowindow.open(map, marker);
              });
              marker.addListener("mouseout", function () {
                infowindow.close(map, marker);
              });
            }
          }
        });


  function newFunction() {
    fetch(URL_PROVINCIES)
      .then(response => response.json())
      .then(data => {
        provinces = [...data.data];
        console.log(provinces);
        for (let index = 0; index < data.data.length; index++) {
          const province = data.data[index];
          if (province.country_code === "us") {
            const marker = new google.maps.Marker({
              position: { lat: province.latitude, lng: province.longitude },
              map: map,
              title: province.location,
              icon: './virus.png'
            });
            const infowindow = new google.maps.InfoWindow({
              content: infoWindowProvinces(province)
            });
            marker.addListener("mouseover", function () {
              infowindow.open(map, marker);
            });
            marker.addListener("mouseout", function () {
              infowindow.close(map, marker);
            });
          }
        }
      });
    const filter = document.getElementById("city");
    const buttonFilter = document.getElementById("filter");
    buttonFilter.addEventListener("click", function () {
      const province = provinces.find(province => {
        return province.location === filter.value;
      });

      if (province) {
        const html = infoWindowProvinces(province);
        document.getElementById("data").innerHTML = html;
        map.setZoom(7);
        map.setCenter(
          new google.maps.LatLng(province.latitude, province.longitude)
        );
      }
    });
  }
}