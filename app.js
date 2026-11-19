
// =====================================
// 1. VARIABLES
// =====================================

let request = [];
let idActiviteAModifier = null;

const container = document.getElementById("cardsContainer");

const form = document.getElementById("formActivite");
const formActivite = document.getElementById("modalActivite");

const titre = document.getElementById("titre");
const theme = document.getElementById("theme");
const objectifs = document.getElementById("objectifs");
const duree = document.getElementById("duree");
const description = document.getElementById("description");


// =====================================
// 2. AFFICHER LES ACTIVITES
// =====================================

function afficherActivites() {

    axios.get("http://localhost:3000/api/activites")

    .then(response => {

        request = response.data;

        displayCards(request);

    })

    .catch(error => {
        console.log("Erreur affichage :", error);
    });

}


// =====================================
// 3. DISPLAY CARDS
// =====================================

function displayCards(array) {

    container.innerHTML = "";

    array.forEach(element => {

        container.innerHTML += `
        
        <article class="p-4">

            <div class="bg-white w-full max-w-sm p-5 rounded-2xl shadow-sm">

                <div>

                    <h2 class="font-bold text-blue-950 break-all">
                        ${element.titre}
                    </h2>

                    <div class="flex gap-2 text-xs mt-1">

                        <span class="bg-green-100 text-green-600 px-2 rounded-full">
                            ${element.theme}
                        </span>

                        <span class="text-gray-400">
                            ${element.duree}
                        </span>

                    </div>

                </div>

                <p class="text-gray-500 text-xs mt-5 leading-5 break-all">
                    ${element.description}
                </p>

                <div class="bg-purple-50 p-3 rounded-lg mt-4">

                    <p class="text-gray-500 text-xs break-all">
                        ${element.objectifs}
                    </p>

                </div>

                <hr class="my-4 border-gray-100">

                <div class="flex justify-between items-center">

                    <span class="text-xs font-semibold text-blue-950">
                        ${element.auteur}
                    </span>

                    <div class="flex gap-2">

                        <button 
                            class="btn-modifier bg-purple-100 p-2 rounded-lg text-purple-600"
                            data-id="${element.id}">
                            ✎
                        </button>

                        <button 
                            class="btn-supprimer bg-red-50 p-2 rounded-lg text-red-400"
                            data-id="${element.id}">
                            ✕
                        </button>

                    </div>

                </div>

            </div>

        </article>

        `;

    });

}


// Afficher les activités au chargement

afficherActivites();


// =====================================
// 4. FORMULAIRE DU NOM
// =====================================

const nomForm = document.getElementById("nameForm");
const monProfile = document.getElementById("monProfile");

monProfile.addEventListener("click", () => {

    nomForm.classList.remove("hidden");

});

const inputNom = document.getElementById("nom");
const submitNom = document.getElementById("submitNom");

submitNom.addEventListener("click", (e) => {

    e.preventDefault();

    localStorage.setItem("nom", inputNom.value);

    nomForm.classList.add("hidden");

});


// =====================================
// 5. OUVRIR ET FERMER LE FORMULAIRE
// =====================================

const ajouterActiviter = document.getElementById("ajouterActiviter");

ajouterActiviter.addEventListener("click", () => {

    idActiviteAModifier = null;

    form.reset();

    formActivite.classList.remove("hidden");

});

const ajouterActiviterBouton = document.getElementById("ajouterActiviterBouton");

ajouterActiviterBouton.addEventListener("click", () => {

    formActivite.classList.add("hidden");

});


// =====================================
// 6. AJOUTER OU MODIFIER
// =====================================

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const nouvelleActivite = {

        titre: titre.value,

        theme: theme.value.toLowerCase(),

        objectifs: objectifs.value,

        duree: Number(duree.value),

        description: description.value,

        auteur: localStorage.getItem("nom")

    };

    let requete;

    // MODIFIER

    if (idActiviteAModifier !== null) {

        requete = axios.put(
            `http://localhost:3000/api/activites/${idActiviteAModifier}`,
            nouvelleActivite
        );

    }

    // AJOUTER

    else {

        requete = axios.post(
            "http://localhost:3000/api/activites",
            nouvelleActivite
        );

    }

    requete

    .then(response => {

        console.log("Opération réussie :", response.data);

        form.reset();

        idActiviteAModifier = null;

        formActivite.classList.add("hidden");

        afficherActivites();

    })

    .catch(error => {

        console.log("CATCH KHدام");

        console.log("Status :", error.response?.status);

        console.log("Server error :", error.response?.data);

        console.log("Message :", error.message);

    });

});


// =====================================
// 7. MODIFIER ET SUPPRIMER
// =====================================

container.addEventListener("click", function(e) {

    // MODIFIER

    const boutonModifier = e.target.closest(".btn-modifier");

    if (boutonModifier) {

        const id = boutonModifier.dataset.id;

        const activite = request.find(element => element.id == id);

        if (!activite) {
            console.log("Activité introuvable");
            return;
        }

        idActiviteAModifier = id;

        titre.value = activite.titre;

        theme.value = activite.theme;

        objectifs.value = activite.objectifs;

        duree.value = activite.duree;

        description.value = activite.description;

        formActivite.classList.remove("hidden");

    }


    // SUPPRIMER

    const boutonSupprimer = e.target.closest(".btn-supprimer");

    if (boutonSupprimer) {

        const id = boutonSupprimer.dataset.id;

        axios.delete(`http://localhost:3000/api/activites/${id}`)

        .then(() => {

            console.log("Activité supprimée");

            afficherActivites();

        })

        .catch(error => {

            console.log("Erreur suppression :", error);

            console.log("Détails :", error.response?.data);

        });

    }

});
