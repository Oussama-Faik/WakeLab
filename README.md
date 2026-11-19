#🚀 WakeLab – Application de gestion des activités pédagogiques
##📌 Contexte du projet

Chaque après-midi, la reprise de la formation commence par un réveil pédagogique de 10 à 20 minutes. Cette activité permet de dynamiser le groupe, de mobiliser ses connaissances ou de découvrir une nouvelle notion de manière ludique.

Pour faciliter la préparation de ces moments, WakeLab est une application permettant de centraliser, consulter et gérer les propositions d'activités pédagogiques.

##🎯 Objectif du projet

Développer une application web permettant aux utilisateurs de proposer, consulter, rechercher, modifier et supprimer des activités pédagogiques.

Chaque activité possède les informations suivantes :

ID : Identifiant unique généré par l'API.
Titre : Nom de l'activité.
Thème : Jeu, apprentissage, exercice ou autre.
Objectifs pédagogiques : Facultatifs.
Durée : Entre 10 et 20 minutes.
Description : Explication du déroulement de l'activité.
Auteur : Nom complet de la personne ayant créé l'activité.

L'application repose sur une seule entité principale : Activité.

##✨ Fonctionnalités principales
👤 Gestion du nom utilisateur
Enregistrement du nom complet lors de la première utilisation.
Validation du nom avant son enregistrement.
Conservation du nom dans le localStorage.
Association automatique du nom aux nouvelles activités.
Possibilité de modifier le nom enregistré.
📋 Affichage des activités
Récupération des activités depuis l'API avec une requête GET.
Affichage des activités sous forme de cartes dynamiques.
Présentation des informations de chaque activité.
Affichage du nom de l'auteur.
Actions de modification et de suppression.
➕ Ajout d'une activité
Création d'une activité à travers un formulaire.
Envoi des données à l'API avec une requête POST.
Association automatique du nom de l'auteur depuis le localStorage.
🔍 Recherche et filtrage
Recherche dynamique par titre.
Filtrage des activités par thème.
Actualisation des résultats selon les critères sélectionnés.
✏️ Modification complète
Sélection d'une activité.
Préremplissage du formulaire avec ses informations.
Modification de toutes les informations modifiables.
Mise à jour avec une requête PUT.
Conservation du nom de l'auteur initial.
⏱️ Modification partielle
Modification uniquement de la durée estimée.
Envoi des données avec une requête PATCH.
Validation de la nouvelle durée avant l'envoi.
🗑️ Suppression d'une activité
Suppression d'une activité avec une requête DELETE.
Demande de confirmation avant la suppression.
⚠️ Gestion des états de l'interface
Indicateur de chargement pendant les requêtes.
Message de confirmation après chaque opération réussie.
Messages d'erreur compréhensibles.
Message lorsque la liste est vide.
Message lorsqu'aucun résultat ne correspond à la recherche.
✅ Validation des formulaires

Les données saisies sont vérifiées avant chaque envoi à l'API.

Champ	Règles de validation
Nom complet	Au moins deux parties, lettres accentuées, espaces, apostrophes et traits d'union autorisés
Titre	Entre 5 et 100 caractères
Description	Entre 20 et 1 000 caractères
Durée	Nombre entier compris entre 10 et 20
Thème	Doit correspondre à une option proposée
Objectifs pédagogiques	Champ facultatif

Règles supplémentaires :

Suppression des espaces inutiles.
Utilisation des expressions régulières (Regex).
Affichage des erreurs à proximité des champs concernés.
Blocage de l'envoi lorsque les données sont invalides.
🛠️ Technologies utilisées
HTML5 – Structure de l'application.
CSS3 – Mise en forme et responsive design.
JavaScript Vanilla (ES6+) – Logique et interactions.
Axios – Communication avec l'API REST.
LocalStorage – Conservation du nom utilisateur.
API REST – Gestion et stockage des activités.
🔗 Méthodes HTTP utilisées
Méthode	Utilisation
GET	Récupérer les activités
POST	Ajouter une nouvelle activité
PUT	Modifier complètement une activité
PATCH	Modifier uniquement sa durée
DELETE	Supprimer une activité
⚙️ Contraintes techniques respectées
Utilisation de JavaScript Vanilla, sans framework.
Utilisation d'Axios pour toutes les requêtes HTTP.
Création dynamique des cartes avec document.createElement().
Insertion sécurisée des textes avec textContent.
Gestion des classes CSS avec classList.
Modification dynamique d'au moins une propriété CSS avec JavaScript.
Gestion des événements : submit, click, input et change.
Validation des formulaires avec Regex et contrôles adaptés.
Utilisation de localStorage pour conserver le nom utilisateur.
Utilisation des méthodes JavaScript :
find()
findIndex()
map()
filter()
reduce()
Utilisation de la syntaxe ES6+ :
const et let
Fonctions fléchées
Template literals
Gestion des opérations asynchrones avec async/await.
Gestion des erreurs avec try/catch.
Organisation du code en fonctions avec des responsabilités claires.
📱 Responsive Design

L'application est conçue pour s'adapter à différents formats d'écran :

💻 Ordinateur
📱 Smartphone
📲 Tablette
👨‍💻 Réalisation

WakeLab est un projet de développement web Front-End réalisé dans le cadre d'un exercice de formation.

L'objectif est de mettre en pratique la manipulation du DOM, la programmation JavaScript asynchrone, la consommation d'une API REST, la validation des formulaires et la gestion des données côté client.
