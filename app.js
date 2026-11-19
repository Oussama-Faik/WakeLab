//* Selection
const bienvenueFormulaire = document.getElementById("Bienvenueform");
const boutonDeBienvenueFormilaire = document.getElementById("commencerbouton");
const inputDeNom = document.getElementById("nomcomplete");
const cardsContainer = document.getElementById("cardscontainer");
const ajouterActiviterBouton = document.getElementById("ajouteractiviter");
const ajouterActiviterForm = document.getElementById("activityform");
const openFormAjouterActivity = document.getElementById(
  "openformajouteractivity",
);
const ajouterForm = document.forms["ajouterform"];
const searchInput = document.getElementById("searchInput");
const themeFilter = document.getElementById("themeFilter");
//* Logic
if (localStorage.getItem("Nom complete")) {
  bienvenueFormulaire.classList.add("hidden");
}
boutonDeBienvenueFormilaire.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.setItem("Nom complete", inputDeNom.value);
  bienvenueFormulaire.classList.add("hidden");
});

//* Get data
let apiData;
function getCards() {
  axios
    .get("http://localhost:3000/api/activites")
    .then((response) => {
      apiData = response.data;
      displayCards(apiData);
    })
    .catch((error) => console.log(error));
}
getCards();

//* Display cards
function displayCards(array) {
  array.forEach((activite) => {
    const divContainer = document.createElement("div");
    divContainer.className = "border border-gray-200 shadow-lg px-5 py-3";
    cardsContainer.appendChild(divContainer);
    const titre = document.createElement("h2");
    titre.textContent = activite.titre;
    titre.className = "font-bold mb-2";
    const theme = document.createElement("span");
    theme.textContent = activite.theme;
    theme.className = "bg-green-200 px-2 py-1 rounded-lg mb-2";
    const duree = document.createElement("span");
    duree.textContent = activite.duree;
    const description = document.createElement("p");
    description.textContent = activite.description;
    description.className =
      "bg-blue-100 rounded-lg mb-2 mt-2 break-words whitespace-pre-wrap";
    const auteur = document.createElement("span");
    auteur.className = "w-full block text-gray-400";
    auteur.textContent = localStorage.getItem("Nom complete");
    const modifierBouton = document.createElement("button");
    modifierBouton.textContent = "✎";
    modifierBouton.className = "modifier bg-green-400 px-5 ";
    modifierBouton.dataset.id = activite.id
    const supprimerBouton = document.createElement("button");
    supprimerBouton.textContent = "🗑️";
    supprimerBouton.className = "supprimer bg-red-400 px-5 ";
    supprimerBouton.dataset.id = activite.id;
    divContainer.append(
      titre,
      theme,
      duree,
      description,
      auteur,
      modifierBouton,
      supprimerBouton,
    );
  });
}
openFormAjouterActivity.addEventListener("click", () => {
  ajouterActiviterForm.classList.remove("hidden");
});

//* Add activity
ajouterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let titre = ajouterForm.titre.value;
  let theme = ajouterForm.theme.value;
  let objectifs = ajouterForm.objectifs.value;
  let duree = Number(ajouterForm.duree.value);
  let description = ajouterForm.description.value;
  let auteur = localStorage.getItem("Nom complete");
  ajouterActiviter(titre, theme, objectifs, duree, description, auteur);
});

function ajouterActiviter(titre, theme, objectifs, duree, description, auteur) {
  let ajouter = {
    titre,
    theme,
    objectifs,
    duree,
    description,
    auteur,
  };
  sendData(ajouter);
}

//* Send data
function sendData(ajouter) {
  console.log(ajouter);
  axios
    .post("http://localhost:3000/api/activites", ajouter)
    .then((response) => {
      ajouterForm.reset();
      ajouterActiviterForm.classList.add("hidden");
    })
    .catch((error) => {
      console.log("Status:", error.response.status);
      console.log("Message:", error.response.data);
      console.log("Errors:", error.response.data.errors);
    });
}

//* Search
searchInput.addEventListener("input", () => {
  let result = apiData.filter((Element) =>
    Element.titre.toLowerCase().includes(searchInput.value.toLowerCase()),
  );
  cardsContainer.innerHTML = "";
  displayCards(result);
});

//* Filter
themeFilter.addEventListener("change", () => {
  let result = apiData.filter((Element) => {
    if (themeFilter.value == "all") {
      return true;
    } else {
      return Element.theme === themeFilter.value;
    }
  });
  cardsContainer.innerHTML = "";
  displayCards(result);
});
