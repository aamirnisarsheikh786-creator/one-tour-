/* =========================
   SUPABASE SETUP
========================= */

const SUPABASE_URL =
"https://ouknykcoqvwuedlkctgz.supabase.co";

const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91a255a2NvcXZ3dWVkbGtjdGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTAyNjcsImV4cCI6MjA5Mzk4NjI2N30.SF4VoPIiNiqwjXCKeHTBHpLIW_IehimIRUNlHZ8Gw58";

const supabaseClient =
supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);


/* =========================
   SIDE MENU
========================= */

function openMenu(){

document.getElementById("sideMenu").style.left = "0";
document.getElementById("overlay").style.display = "block";

}

function closeMenu(){

document.getElementById("sideMenu").style.left = "-260px";
document.getElementById("overlay").style.display = "none";

}


/* =========================
   BOTTOM NAV ACTIVE
========================= */

const navItems =
document.querySelectorAll(".nav-item");

navItems.forEach(item => {

item.addEventListener("click", () => {

navItems.forEach(nav =>
nav.classList.remove("active"));

item.classList.add("active");

});

});


/* =========================
   HOME PACKAGE LOAD
========================= */

async function loadHomePackages(){

const container =
document.getElementById("homePackages");

if(!container) return;

container.innerHTML =
"<p style='padding:20px'>Loading Packages...</p>";

const { data, error } = await supabaseClient
.from("packages")
.select("*")
.limit(6);

if(error){

console.log(error);

container.innerHTML =
"<p style='padding:20px'>Failed to load packages</p>";

return;

}

container.innerHTML = "";

data.forEach(pkg => {

container.innerHTML += `

<div class="card">

<img src="${pkg.image}" alt="">

<div class="card-content">

<h3>${pkg.title}</h3>

<p>${pkg.days}</p>

<div class="price-row">

<div>
<h4>₹${pkg.price}</h4>
<span>per person</span>
</div>

<button onclick="openPackage('${pkg.detail_link || "gulmargdetail.html"}')">
<i class="fa-solid fa-arrow-right"></i>
</button>

</div>

</div>

</div>

`;

});

}


/* OPEN PACKAGE PAGE */

function openPackage(link){
  if(!link){
    alert("Link missing");
    return;
  }
  window.location.href = link;
}


/* =========================
   AUTO LOAD
========================= */

window.onload = function(){

loadHomePackages();

};


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
   SPLASH SCREEN ONLY FIRST OPEN
========================= */

window.addEventListener("load", () => {

const splash =
document.getElementById("splash-screen");

/* agar pehle open ho chuka */
if(sessionStorage.getItem("splashShown")){

if(splash){
splash.style.display = "none";
}

return;

}

/* first time open */
sessionStorage.setItem("splashShown", "true");

setTimeout(() => {

if(splash){

splash.style.opacity = "0";
splash.style.visibility = "hidden";

}

}, 4000);

});
