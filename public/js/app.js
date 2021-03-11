const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#msg1");
const message2 = document.querySelector("#msg2");
const img = document.querySelector("img");
weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const locationtofind = search.value;
  message1.textContent = "Loading...";
  message2.textContent = "";

  fetch("/weather?loc=" + locationtofind).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = "Location: " + data.location;
        message2.textContent = "Forecast: " + data.forecast;
        img.src = data.img;
      }
    });
  });
});
