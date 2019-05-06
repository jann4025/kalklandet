document.addEventListener("DOMContentLoaded", start);

let intro = [];
let priser = [];
let beskrivelse = document.querySelector(".beskrivelse");

function start() {
    console.log("start");

    function visIntro() {
        console.log("vis intro");
        console.log(beskrivelse)
        let dest = document.querySelector(".beskrivelse");
        let temp = document.querySelector(".intro-temp");
        intro.forEach(intro => {
            let klon = temp.cloneNode(true).content;
            klon.querySelector("h1").textContent = intro.intro_overskrift;
            klon.querySelector("p").textContent = intro.intro;
            dest.appendChild(klon);
        });
    }

    function visPrisBooking() {
        console.log("Vis pris og booking");
        let dest = document.querySelector(".priser-intro");
        let temp = document.querySelector(".pris-temp");
        priser.forEach(priser => {
            let klon = temp.cloneNode(true).content;
            klon.querySelector(".pris_overskrift").innerHTML = priser.priser_og_booking;
            klon.querySelector(".pris_intro").innerHTML = priser.pris_og_booking_beskrivelse;
            dest.appendChild(klon);
        });
    }

    getJsonIntro();

    async function getJsonIntro() {
        console.log("get json intro");
        let url = "https://janhol.dk/kea/07-cms/kalklandet/backend/wp-json/wp/v2/skole";
        let jsonData = await fetch(url);
        intro = await jsonData.json();
        visIntro();
    }


    async function getJsonPrisBooking() {
        console.log("get json prig og booking");
        let url = "https://janhol.dk/kea/07-cms/kalklandet/backend/wp-json/wp/v2/skole";
        let jsonData = await fetch(url);
        priser = await jsonData.json();
        visPrisBooking();

    }
    getJsonPrisBooking();

}
