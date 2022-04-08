const URL_PATH = 'https://api.themoviedb.org';
const API_KEY = '38474c6f4c1989989d3397ae09b8f04e';
const IMG_URL = 'https://image.tmdb.org/t/p/w300';
let IDMOVIE = '';

$('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
$(window).on('load', function(){
  setTimeout(removeLoader, 500); 
});
function removeLoader(){
    $( "#loadingDiv" ).fadeOut(500, function() {
      
      $( "#loadingDiv" ).remove(); 
  });  
}

document.addEventListener('DOMContentLoaded', () => {
    IDMOVIE = showID().id;
    showFilms(IDMOVIE);
})

const showID = () => {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m,key,value){
        vars[key] = value;
    })
    return vars;
}

const getFilms = (movieID) => {
    const URL = `${URL_PATH}/3/movie/${movieID}?api_key=${API_KEY}&language=pt-BR`
    return fetch(URL)
        .then(resp => resp.json())
        .then(result => result)
        .catch(e => console.log(e));
}

const showFilms = async (movieId) => {
    const movie = await getFilms(movieId)
    const {poster_path, title, overview, genres, release_date, production_companies, vote_average, vote_count} = movie
    DataShow(title, overview, genres, release_date,poster_path, production_companies, vote_average, vote_count);
    console.log(movie)
}

const DataShow = (title, overview,genres, release_date,poster_path, production_companies, vote_average, vote_count) => {
    let htmlGenres = "";
    genres.forEach(gen => {
        htmlGenres += `<li>${gen.name}</li>`;
    })
    let htmlProducers = "";
    production_companies.forEach(prod => {
        htmlProducers += `<li>${prod.name}</li>`;
    })

const FilmElement = document.createElement('div')
FilmElement.classList.add('movie')

FilmElement.innerHTML = `
    <div class="movie-info">
        <h3>${title}</h3>
        <img src="${IMG_URL + poster_path}" alt="${title}" />
    </div>
    <div class ="movie-rate">
        <img class ="star" src="imgs/star.svg">
        <h5>${vote_average}</h5>
        <img class ="heart" src="imgs/heart.svg">
        <h4>${vote_count}</h4>
    </div>
    <div class="movie-gender">
        <ul>
        Genêros: 
            ${htmlGenres}
        </ul>
    </div>
    <div class="movie-producers">
        <ul>
        Produtoras: 
            ${htmlProducers}
        </ul>
    </div>
    <p>${overview}</p>
`
main.appendChild(FilmElement)
}