document.addEventListener("DOMContentLoaded", start);
let priser = {};
let openingHours = [];
let intro = [];
let findVej = [];
let filter = "alle";


function start() {


    document.querySelectorAll(".filter_knap").forEach(elm => {
        elm.addEventListener("click", filtreing);
    });

    function filtreing() {
        filter = this.getAttribute("data-kat");
        document.querySelectorAll(".filter_knap").forEach(elm => {
            elm.classList.remove("aktiv");
        });
        this.classList.add("aktiv");
        console.log(filter);
        visEvents();
    }


    document.querySelectorAll(".dropdown-item").forEach(elm => {
        elm.addEventListener("click", filtreing1);
    });

    function filtreing1() {
        filter = this.getAttribute("data-kat");

        visEvents();
    }

    function visPris() {
        let dest = document.querySelector(".priser .row");
        let temp = document.querySelector(".priser_template");
        priser.forEach(pris => {
            if (pris.museum == "geomuseumfaxe") {
                let klon = temp.cloneNode(true).content;
                klon.querySelector("h4").innerHTML = pris.overskrift;
                klon.querySelector(".pris-beskrivelse").innerHTML = pris.beskrivelse;
                klon.querySelector(".pris .voksne").innerHTML = pris.voksne;
                klon.querySelector(".pris .stud").innerHTML = pris.student;
                klon.querySelector(".pris .born").innerHTML = pris.kids;
                dest.appendChild(klon);

            }
        });
    }

    function visIntro() {
        let dest = document.querySelector(".beskrivelse");
        let temp = document.querySelector(".intro_template");
        intro.forEach(intro => {
            let klon = temp.cloneNode(true).content;
            klon.querySelector("h1").innerHTML = intro.title.rendered;
            klon.querySelector("p").innerHTML = intro.beskrivelse;
            dest.appendChild(klon);
        });
    }


    function visOpeningHours() {
        let dest = document.querySelector(".txt");
        let temp = document.querySelector(".opening_template");

        openingHours.forEach(hour => {
            if (hour.museum == "geomuseumfaxe") {
                let klon = temp.cloneNode(true).content;
                klon.querySelector("p").innerHTML = hour.content.rendered;
                dest.appendChild(klon);
            }
        });

    }

    function visFindVej() {
        let dest = document.querySelector(".dest");
        let temp = document.querySelector(".find-vej-temp");
        findVej.forEach(find => {
            if (find.museum == "geomuseumfaxe") {
                let klon = temp.cloneNode(true).content;
                klon.querySelector(".beskrivelse").innerHTML = find.content.rendered;
                dest.appendChild(klon);
            }
        });

    }


    async function getJson() {
        let url = "https://janhol.dk/kea/07-cms/kalklandet/backend/wp-json/wp/v2/priser";
        let jsonData = await fetch(url);
        priser = await jsonData.json();
        visPris();
    }

    getJson();

    async function getJsonIntro() {
        let url = "https://janhol.dk/kea/07-cms/kalklandet/backend/wp-json/wp/v2/geomuseum";
        let jsonData = await fetch(url);
        intro = await jsonData.json();
        visIntro();
    }

    getJsonIntro();

    async function getJsonOpeningsHours() {
        let url = "https://janhol.dk/kea/07-cms/kalklandet/backend/wp-json/wp/v2/aabningstider";
        let jsonData = await fetch(url);
        openingHours = await jsonData.json();
        visOpeningHours();
    }

    getJsonOpeningsHours();

    async function getJsonFindVej() {
        let url = "https://janhol.dk/kea/07-cms/kalklandet/backend/wp-json/wp/v2/find_vej";
        let jsonData = await fetch(url);
        findVej = await jsonData.json();
        visFindVej();
    }

    getJsonFindVej();

}
