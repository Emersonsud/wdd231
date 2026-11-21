import "./common.js";

const params = new URLSearchParams(window.location.search);
const fields = ["fname", "lname", "email", "phone", "organization"];

fields.forEach((name) => {
  document.querySelector(`#out-${name}`).textContent = params.get(name) || "";
});

const stamp = params.get("timestamp");
document.querySelector("#out-timestamp").textContent = stamp
  ? new Date(stamp).toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    })
  : "";

if (!params.get("fname")) {
  document.querySelector("#thanks-message").textContent =
    "No application data was found. Please fill out the form on the Join page.";
}
