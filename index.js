
let authour = document.getElementById("authorName");
let cryptoShow = document.getElementById("crypto-top");
let timeShow = document.getElementById("time");
let weatherShow = document.getElementById("weather");
let theme = null;

theme = prompt("Enter your wallapaper style").toLowerCase();


fetch(
  `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${theme}`
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    authour.innerText = `By: ${data.user.name}`;
  })
  .catch((err) => {
    document.body.style.backgroundColor = "red";
  });



  


// baseurl:https://api.coingecko.com/api/v3

let money = null;
money = prompt("Enter your crypto currenc").toLowerCase();
fetch(`https://api.coingecko.com/api/v3/coins/${money}`)
  .then((res) => {
    if (!res.ok) {
      throw Error(
        "something going wrong becuase res status belonging in between 400 and 500 which is  not good for https"
      );
    }
    return res.json();
  })
  .then((data) => {
    // throw Error("This is an error");
    console.log(data);
    cryptoShow.innerHTML = `<img src=${data.image.small}/>
    <span>${data.name}</span>`;
    let curretPrice = data.market_data.current_price.usd;
    let highPrice = data.market_data.high_24h.usd;
    let lowPrice = data.market_data.low_24h.usd;
    document.querySelector(".currentCrypto").innerHTML = curretPrice;
    document.querySelector(".upCrypto").innerHTML = highPrice;
    document.querySelector(".downCrypto").innerHTML = lowPrice;
  })
  .catch((err) => console.error(err));

// time showing

function showCurrentTime() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let am_pm = "AM";

  if (hour > 12) {
    hour -= 12;
    am_pm = "PM";
  }
  if (hour == 0) {
    hr = 12;
    am_pm = "AM";
  }

  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  let currentTime = hour + ":" + min + ":" + sec + am_pm;

  timeShow.innerHTML = currentTime;
}
setInterval(showCurrentTime, 1000);

// ==================fetch location from geolocation
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
  )
    .then((res) => {
      if (!res.ok) throw Error("Something went wrong in the weather api");
      else {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      // converting img id into url -> https://openweathermap.org/weather-conditions
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      let temp = data.main.temp;
      const cityName = data.name;

      let tempIncelcius = ((temp - 32) * 5) / 9;
      weatherShow.innerHTML = `<img src=${iconUrl} /> <p class="weather-temp">${tempIncelcius.toFixed(
        2
      )}<sup>o</sup></p>
      <p class="weather-city">${cityName}</p>`;
    })
    .catch((err) => {
      console.error(err);
    });
});


