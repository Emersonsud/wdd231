import "./common.js";

const membersUrl = "data/members.json";
const container = document.querySelector("#members");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

const levels = { 1: "Member", 2: "Silver", 3: "Gold" };

async function getMembers() {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Could not load members:", error);
    container.innerHTML = "<p>Sorry, the member list could not be loaded right now.</p>";
  }
}

function displayMembers(members) {
  container.innerHTML = "";
  members.forEach((m) => {
    const card = document.createElement("article");
    card.classList.add("card", `level-${m.membership}`);
    card.innerHTML = `
      <img src="images/${m.image}" alt="${m.name} logo" width="400" height="150" loading="lazy">
      <div class="card-body">
        <h2>${m.name}</h2>
        <p class="tagline">${m.tagline}</p>
        <p><strong>Address:</strong> ${m.address}</p>
        <p><strong>Phone:</strong> <a href="tel:${m.phone.replace(/[^\d+]/g, "")}">${m.phone}</a></p>
        <p><a href="${m.website}" target="_blank" rel="noopener">Visit website</a></p>
        <span class="badge">${levels[m.membership]}</span>
      </div>`;
    container.appendChild(card);
  });
}

function setView(view) {
  const isGrid = view === "grid";
  container.classList.toggle("grid", isGrid);
  container.classList.toggle("list", !isGrid);
  gridBtn.classList.toggle("active", isGrid);
  listBtn.classList.toggle("active", !isGrid);
  gridBtn.setAttribute("aria-pressed", isGrid);
  listBtn.setAttribute("aria-pressed", !isGrid);
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

getMembers();
