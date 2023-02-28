// // API TMDB
// const API_KEY         = 'api_key=20c7b8d480d4a435703ad88460e996a5&language=fr';
// const BASE_URL        = 'https://api.themoviedb.org/3';
// const SEARCH_URL         = BASE_URL + '/search/movie?' + API_KEY;
// const API_URL        = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
// console.log(API_URL);
// console.log(SEARCH_URL);


// const titreFilm         = document.getElementById('film1_titre');
// let realisationFilm   = document.getElementById('film1_realisation');
// let castingFilm       = document.getElementById('film1_casting');
// let PaysFilm          = document.getElementById('film1_pays');
// let DureeFilm         = document.getElementById('film1_duree');
// let SynopsisFilm      = document.getElementById('film1_synopsis');
// let RecompenseFilm    = document.getElementById('film1_recompense');

// function getMovies(url) {
//     fetch(url).then(res => res.json()).then(data => {
//         showMovies(data.results);
//     })
    
//     function showMovies(data) {
        
//     }
// getMovies(API_URL);

// async function recupererFilm() {
//     const requete = await fetch(API_URL, {
//         method: 'GET'
//     });

//     if (!requete.ok) {
//         alert('Un problème est survenu.');
//     } else {
//         donnees = await requete.json();
//         console.log(donnees);
//         remplirFilm();
//     }

    // function remplirFilm(donnees){
    //     let donneesFilm = '';
    //     let {title, runtime, overview} = donneesFilm;
    //     titreFilm.textContent = donnees.donneesFilm.title;
    // }
// }
// async function recupererFilm() {
//     const requete = await fetch(SEARCH_URL, {
//         method: 'GET'
//     });

//     if (!requete.ok) {
//         alert('Un problème est survenu.');
//     } else {
//         donnees = await requete.json();
//         console.log(donnees);
//         remplirFilm();
//     }

    // function remplirFilm(donnees){
    //     let donneesFilm = '';
    //     let {title, runtime, overview} = donneesFilm;
    //     titreFilm.textContent = donnees.donneesFilm.title;
    // }
// }
// let {title, runtime, overview} = donneesFilm;
// titreFilm.textContent= donneesFilm.title;

    // titreFilmInput.addEventListener('submit', (e) => {
    //     e.preventDefault();

    //     const chercherTitre = titreFilmInput+value;

    //     if(chercherTitre){
    //         recupererFilm(API_URL+'&query='+chercherTitre)
    //     }
    // })

// recupererFilm();




// let genereFiches = (datas) => {

//     if (page == 1) {
//         document.getElementById('resultats').innerHTML = '';
//     }

//     if (datas.total_results > 0) {
//         for (let i = 0; i < datas.results.length; i++) {

//             let ficheFilm = document.createElement('div');
//             ficheFilm.innerHTML = datas.results[i].title;
//             ficheFilm.classList.add('fiche_film');

//             if (datas.results[i].poster_path) {
//                 let affiche = document.createElement('img');
//                 affiche.setAttribute('src', AFFICHESDIRECTORY + datas.results[i].poster_path);
//                 ficheFilm.appendChild(affiche);
//             }
//             document.getElementById('resultats').appendChild(ficheFilm);
//         }
//         passage = false;

//         console.log(page + ' sur ' + datas.total_pages);

//         if (datas.total_pages > 1 && page < datas.total_pages) {

//             setTimeout(() => {

//                 window.addEventListener('scroll', () => {
//                     if (window.scrollY >= document.body.clientHeight - window.innerHeight - 50 && !passage) {

//                         // s'il reste des pages à parcourir
//                         if (page < totalPages) {
//                             page++;
//                             passage = true;
//                             console.log('Chargement page ' + page);
//                             rechercherFilm(filmARechercher, (datas) => {
//                                 genereFiches(datas);
//                             }, page);
//                         }
//                     }
//                 });
//             }, 2000);
//         }
//     }
//     else {
//         document.getElementById('resultats').innerHTML = 'Pas de films trouvés';
//     }
// }

const APIMOVIE         = '20c7b8d480d4a435703ad88460e996a5';
const URLAPIMOVIE = `https://api.themoviedb.org/3/search/movie?api_key=${APIMOVIE}&language=fr&region=FR&include_image_language=fr&query=`;
const AFFICHESDIRECTORY = 'https://image.tmdb.org/t/p/w500';

console.log(URLAPIMOVIE);

let rechercherFilm = (titre, callback, page = 1) => {
    fetch(URLAPIMOVIE + titre + '&page=' + page)
        .then(reponse => reponse.json())
        .then(datas => callback(datas))
        .catch(error => console.log(error));
};

let detailsFilm = (idFilm, callback) => {
    fetch(`https://api.themoviedb.org/3/movie/${idFilm}?api_key=${APIMOVIE}&language=fr&region=FR&include_image_language=fr`)
        .then(reponse => reponse.json())
        .then(datas => callback(datas))
        .catch(error => console.log(error));
};


// si l'input qui à l'ID recherche existe alors
if (document.getElementById('recherche')) {

    // je selectionne le bouton qui à l'ID lancerRecherche et je lui ajoute un ecouteur d'evenement de type click
    document.getElementById('lancerRecherche').addEventListener('click', () => {
        // je creer une variable raccourcis qui va récuperer la demande de l'utilisateur dans filmARechercher
        // à l'intérieur de recherche je cherche sa valeur (value), trim sert à retirer les espaces parasites
        let filmARechercher = document.getElementById('recherche').value.trim();
            // J'appel la function rechercherFilm qui a en parametre filmARechercher, et une fonction de callback qui va récuperer les datas
            rechercherFilm(filmARechercher, (datas) => {
                //je regarde ce que me renvoie l'API
                console.log(datas);
                // Je vide ma div resulat (si une demande à déja etait faite)
                document.getElementById('resultats').innerHTML= '';
                //si j'ai un resulat, (si j'ai des datas)
                if(datas.total_results > 0){
                    //J'affiche les données que je souhaite, je fait une boucle
                    // Si i=0 et si i est < au nombre de resultats(datas.results.length(la taille du tableau)) alors on boucle et on ajoute 1 à i
                    for(let i=0; i < datas.results.length; i++){
                        // Je creer une div
                        let ficheFilm = document.createElement('div');
                        // Dans cette div je met le titre
                        ficheFilm.innerHTML = datas.results[i].title;
                        // j'ajoute la classe fiche_film a mes div
                        ficheFilm.classList.add('fiche_film');
                        
                        //si il n'y a pas d'affiche, on rend une image, image not found
                        if(datas.results[i].poster_path != null){
                            //Je creer l'image, qui est un element de type img que j'ajoute au DOM
                            let affiche = document.createElement('img');
                            // j'u ajoute un attribut src, la source est composé de la constante AFFICHESDIRECTORY concaténé a poster_path 
                            affiche.setAttribute('src', AFFICHESDIRECTORY + datas.results[i].poster_path);
                            // j'ajoute cette image à la fiche 
                            ficheFilm.appendChild(affiche);
                        }else{
                            let affiche = document.createElement('img');
                            affiche.setAttribute('src', "../public/image/no-image-found.jpeg");
                            ficheFilm.appendChild(affiche);

                        }
                        // Cet div je l'ajoute à ma div résulstat
                        document.getElementById('resultats').appendChild(ficheFilm);
                    }
                } else {
                    // Si non j'affiche dans resultat, Pas de films trouvé
                    document.getElementById('resutats').innerHTML='Pas de films trouvé';
                }
            });
    
    });


    }

