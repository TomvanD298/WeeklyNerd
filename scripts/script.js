document.addEventListener("DOMContentLoaded", () => {
    const dateElement = document.getElementById("dateDisplay");
  
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    const currentDate = new Date().toLocaleDateString("nl-NL", options);
  
    dateElement.textContent = `${currentDate} | De laatste Nerds het eerst op TheWeeklyNerd.nl`;
  });




  document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".site-logo");
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1) {
        logo.classList.add("shrink");
      } else {
        logo.classList.remove("shrink");
      }
    });
  });

/* /////////////////////////////////////////////////////// */
/* ///////////////////// Pop-Over //////////////////////// */
/* /////////////////////////////////////////////////////// */



  const triggers = document.querySelectorAll('.popover-trigger');
    const popover = document.getElementById('popover');
    const iframe = document.getElementById('popoverIframe');
    const overlay = document.getElementById('overlay');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const type = trigger.getAttribute('data-type');
        const url = trigger.getAttribute('data-url');

        // Update popover class and content
        popover.classList.remove('phone', 'desktop');
        popover.classList.add(type);
        iframe.src = url;

        // Show popover
        popover.style.display = 'block';
        overlay.style.display = 'block';
      });
    });

    function closePopover() {
      popover.style.display = 'none';
      overlay.style.display = 'none';
      iframe.src = ''; // Stop loading when closed
    }

    overlay.addEventListener('click', closePopover);