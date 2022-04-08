
const API_MAIN = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=38474c6f4c1989989d3397ae09b8f04e&language=pt-BR&page=1'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'

const main = document.getElementById('main')

$('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
$(window).on('load', function(){
  setTimeout(removeLoader, 500); 
});
function removeLoader(){
    $( "#loadingDiv" ).fadeOut(500, function() {
      
      $( "#loadingDiv" ).remove(); 
  });  
}

getFilms(API_MAIN)

async function getFilms(url) {
    const res = await fetch(url)
    const data = await res.json()

    showFilms(data.results)
}

function showFilms(movies){
    main.innerHTML = ''


    movies.forEach((movie, index) => {
        if(index >= 10) return;
        const {id, title, poster_path, vote_average, overview, vote_count, release_date} = movie;
        const urlMoreInfo = `../movie.html?id=${id}`
        const FilmElement = document.createElement('div')
        FilmElement.classList.add('movie')

        FilmElement.innerHTML = `
            <a href="${urlMoreInfo}">
                <img src="${IMG_URL + poster_path}" alt="${title}"/>
            </a>
            <div class="movie-info">
                <a href="${urlMoreInfo}">
                    <h3>${title}</h3>
                </a>
            </div>
            <div class="movie-rate">
            <img class ="star" src="imgs/star.svg"  alt="star">
            <img class ="heart"
            src="imgs/heart.svg"
            alt="heart">
            </div>
            <h4>${vote_average}</h4>
            <h5>${release_date.substring(0, 4)}</h5>
            <h6>${vote_count}</h6>



        `
        main.appendChild(FilmElement)
    })
}