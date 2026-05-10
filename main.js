document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     AD SLIDER AUTO + DOTS
  ========================== */

  const slider = document.getElementById("adSlider");
  const dots = document.querySelectorAll(".dot");

  if(slider && dots.length){

    let index = 0;

    function updateDots(){
      dots.forEach(d => d.classList.remove("active"));
      if(dots[index]) dots[index].classList.add("active");
    }

    setInterval(() => {

      index++;

      if(index >= dots.length){
        index = 0;
      }

      slider.scrollTo({
        left: slider.clientWidth * index,
        behavior: "smooth"
      });

      updateDots();

    }, 3000);

    slider.addEventListener("scroll", () => {

      const i = Math.round(slider.scrollLeft / slider.clientWidth);

      index = i;

      dots.forEach(d => d.classList.remove("active"));

      if(dots[i]) dots[i].classList.add("active");

    });

  }


  /* =========================
     BOTTOM NAV ACTIVE COLOR
  ========================== */

  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach(item => {

    item.addEventListener("click", function(){

      navItems.forEach(i => i.classList.remove("active"));

      this.classList.add("active");

    });

  });


  /* =========================
     MENU OPEN / CLOSE
  ========================== */

  window.openMenu = function(){
    document.getElementById("sideMenu").style.right = "0";
    document.getElementById("overlay").style.display = "block";
  }

  window.closeMenu = function(){
    document.getElementById("sideMenu").style.right = "-260px";
    document.getElementById("overlay").style.display = "none";
  }

});