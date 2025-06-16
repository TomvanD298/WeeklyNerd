document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.getElementById("dateDisplay");

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const currentDate = new Date().toLocaleDateString("nl-NL", options);

  dateElement.textContent = `${currentDate} | De laatste Nerds het eerst op TheWeeklyNerd.nl`;
});

/* /////////////////////////////////////////////////////// */
/* ///////////////////// Hamburger /////////////////////// */
/* /////////////////////////////////////////////////////// */

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu on link click
document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

/* /////////////////////////////////////////////////////// */
/* ///////////////////// Pop-Over //////////////////////// */
/* /////////////////////////////////////////////////////// */

const triggers = document.querySelectorAll(".popover-trigger");
const popover = document.getElementById("popover");
const iframe = document.getElementById("popoverIframe");
const overlay = document.getElementById("overlay");

triggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const type = trigger.getAttribute("data-type");
    const url = trigger.getAttribute("data-url");

    // Update popover class and content
    popover.classList.remove("phone", "desktop");
    popover.classList.add(type);
    iframe.src = url;

    // Show popover
    popover.style.display = "block";
    overlay.style.display = "block";
  });
});

function closePopover() {
  popover.style.display = "none";
  overlay.style.display = "none";
  iframe.src = ""; // Stop loading when closed
}

overlay.addEventListener("click", closePopover);

/* /////////////////////////////////////////////////////// */
/* ////////////////// NERD Pop-Over ////////////////////// */
/* /////////////////////////////////////////////////////// */

fetch("../weeklyNerds.json")
  .then((res) => res.json())
  .then((nerds) => {
    const container = document.getElementById("weeklyNerds");

    nerds.forEach((nerd, index) => {
      const article = document.createElement("article");
      article.classList.add("nerd-trigger");
      article.setAttribute("data-index", index);

      article.innerHTML = `
        <h2>${nerd.title}</h2>
        <h3>${nerd.date}</h3>
        <img src="${nerd.image}" alt="${nerd.title}" />
      `;

      container.appendChild(article);
    });

    initNerdTriggers(); // Now that elements exist, attach listeners
  });

let nerdData = [];

fetch("./weeklyNerds.json")
  .then((res) => res.json())
  .then((data) => {
    nerdData = data;
    initNerdTriggers();
  });

function initNerdTriggers() {
  document.querySelectorAll(".nerd-trigger").forEach((el, index) => {
    el.addEventListener("click", () => openNerdPopover(index));
  });
}

function openNerdPopover(index) {
  const nerd = nerdData[index];
  const content = `
    <h1>${nerd.title}</h1>
    <h4>${nerd.date}</h4>
    <img src="${nerd.image}" alt="${nerd.title}" />
    <div>${nerd.content}</div>
  `;
  document.getElementById("nerdContent").innerHTML = content;
  document.getElementById("nerdPopover").style.display = "block";
  document.getElementById("nerdOverlay").style.display = "block";
  document.body.classList.add("no-scroll");
}

function closeNerdPopover() {
  document.getElementById("nerdPopover").style.display = "none";
  document.getElementById("nerdOverlay").style.display = "none";
  document.body.classList.remove("no-scroll");
  document.getElementById("nerdContent").innerHTML = "";
}

document
  .getElementById("nerdOverlay")
  .addEventListener("click", closeNerdPopover);
