let events = {};
let filter = "alle";


document.addEventListener("DOMContentLoaded", start);


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

    function visEvents() {
        document.querySelector(".aktiviteter").innerHTML = "";
        let dest = document.querySelector(".aktiviteter");
        let temp = document.querySelector("template");
        events.forEach(event => {
            if (filter == "alle" || filter == event.categories) {

                let klon = temp.cloneNode(true).content;
                klon.querySelector("img").src = event.billede.guid;
                klon.querySelector("h1").innerHTML = event.title.rendered;
                klon.querySelector(".overflow").innerHTML = event.beskrivelse;
                //            klon.querySelector(".pris").innerHTML = event.pris;
                klon.querySelector(".dato").innerHTML = event.dato;
                klon.querySelector(".button").href = event.link;
                dest.appendChild(klon);

            }
        })
    }

    async function getJson() {
        let url = "https://janhol.dk/kea/07-cms/kalklandet/backend/wp-json/wp/v2/event";
        let jsonData = await fetch(url);
        events = await jsonData.json();
        visEvents();
    }

    getJson();

}
