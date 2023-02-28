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
if (document.getElementById('recherche')) {


    document.getElementById('lancerRecherche').addEventListener('click', () => {
        filmARechercher = document.getElementById('recherche').value.trim();
        if (filmARechercher.length >= 2) {
            rechercherFilm(filmARechercher, (datas) => {
                console.log(datas);
                page = 1;
                totalPages = datas.total_pages;
                genereFiches(datas);
            });
        }
    });

}