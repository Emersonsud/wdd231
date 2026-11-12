import "./common.js";

/* ---------- OpenWeatherMap settings ---------- */
const apiKey = "65febee696ff16e77a8ca6653b570ec6"; // <- paste your free OpenWeatherMap key here
const lat = 36.17; // Las Vegas, NV
const lon = -115.14;
const base = "https://api.openweathermap.org/data/2.5";

const levels = { 1: "Member", 2: "Silver", 3: "Gold" };

/* ---------- Weather ---------- */
async function getWeather() {
  const box = document.querySelector("#weather-content");
  try {
    const [nowRes, fcRes] = await Promise.all([
      fetch(
        `${base}/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`,
      ),
      fetch(
        `${base}/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`,
      ),
    ]);
    if (!nowRes.ok || !fcRes.ok) throw new Error("Weather request failed");
    const now = await nowRes.json();
    const fc = await fcRes.json();
    displayWeather(now);
    displayForecast(fc);
  } catch (error) {
    console.error(error);
    box.textContent = "Weather is unavailable right now.";
  }
}

function displayWeather(data) {
  const icon = document.querySelector("#weather-icon");
  const w = data.weather[0];
  document.querySelector("#temp").textContent =
    `${Math.round(data.main.temp)}°F`;
  document.querySelector("#desc").textContent = w.description;
  icon.src = `https://openweathermap.org/img/wn/${w.icon}.png`;
  icon.alt = w.description;
}

function displayForecast(data) {
  const tz = data.city.timezone; // seconds from UTC
  const days = {};
  data.list.forEach((item) => {
    const local = new Date((item.dt + tz) * 1000);
    const key = local.toISOString().slice(0, 10);
    const hour = local.getUTCHours();
    const diff = Math.abs(hour - 12);
    if (!days[key] || diff < days[key].diff) days[key] = { diff, item, local };
  });
  const keys = Object.keys(days).sort();
  const todayKey = new Date((data.list[0].dt + tz) * 1000)
    .toISOString()
    .slice(0, 10);
  const next = keys.filter((k) => k !== todayKey).slice(0, 3);

  const list = document.querySelector("#forecast");
  list.innerHTML = "";
  next.forEach((k) => {
    const { item, local } = days[k];
    const name = local.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "UTC",
    });
    const li = document.createElement("li");
    li.innerHTML = `<span>${name}</span> <strong>${Math.round(item.main.temp)}°F</strong>`;
    list.appendChild(li);
  });
}

/* ---------- Spotlights ---------- */
async function getSpotlights() {
  const container = document.querySelector("#spotlights");
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const members = await response.json();
    const eligible = members.filter(
      (m) => m.membership === 2 || m.membership === 3,
    );
    const picks = shuffle(eligible).slice(0, 3);
    displaySpotlights(picks, container);
  } catch (error) {
    console.error(error);
    container.textContent = "Member spotlights are unavailable right now.";
  }
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function displaySpotlights(members, container) {
  container.innerHTML = "";
  members.forEach((m) => {
    const card = document.createElement("article");
    card.classList.add("card", `level-${m.membership}`);
    card.innerHTML = `
      <img src="images/${m.image}" alt="${m.name} logo" width="400" height="150" loading="lazy">
      <div class="card-body">
        <h3>${m.name}</h3>
        <p class="tagline">${m.tagline}</p>
        <p>${m.address}</p>
        <p><a href="tel:${m.phone.replace(/[^\d+]/g, "")}">${m.phone}</a></p>
        <p><a href="${m.website}" target="_blank" rel="noopener">Visit website</a></p>
        <span class="badge">${levels[m.membership]}</span>
      </div>`;
    container.appendChild(card);
  });
}

getWeather();
getSpotlights();
