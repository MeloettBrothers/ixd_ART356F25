let weather;

function setup() {
  createCanvas(400, 400);
  loadJSON(
    "https://api.open-meteo.com/v1/forecast?latitude=37.6688&longitude=-122.0808&current=temperature_2m&hourly=temperature_2m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime",
    gotData
  );
}

function gotData(data) {
  weather = data;
}

function draw() {
  background(220);

  if (weather) {
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text(weather.current.time, 200, 100);
    text(weather.current.temperature_2m + "F", 200, 300);

    fill(weather.current.temperature_2m, 0, 0);
    ellipse(200, 200, weather.current.temperature_2m);
  }
}
