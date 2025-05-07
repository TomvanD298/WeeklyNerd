document.addEventListener("DOMContentLoaded", () => {
    const dateElement = document.getElementById("dateDisplay");
  
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    const currentDate = new Date().toLocaleDateString("nl-NL", options);
  
    dateElement.textContent = `${currentDate} | De laatste Nerds het eerst op TheWeeklyNerd.nl`;
  });




  document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".site-logo");
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        logo.classList.add("shrink");
      } else {
        logo.classList.remove("shrink");
      }
    });
  });