document.addEventListener("DOMContentLoaded", () => {
    const dateElement = document.getElementById("dateDisplay");
  
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    const currentDate = new Date().toLocaleDateString("nl-NL", options);
  
    dateElement.textContent = `${currentDate} | De laatste Nerds het eerst op TheWeeklyNerd.nl`;
  });




