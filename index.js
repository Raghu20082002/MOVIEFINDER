const API_URL_SEARCH = "https://www.omdbapi.com/?apikey=e22d4dc8&s=";
const API_URL_DETAIL = "https://www.omdbapi.com/?apikey=e22d4dc8&i=";

var search_input = document.getElementById("search-input");
var card = document.getElementsByClassName("movie-cards")[0];

document.getElementsByClassName("search")[0].addEventListener("click", function() {
    console.log(search_input.value);
    const query = search_input.value;
    if (query) {
        getMovies(API_URL_SEARCH + encodeURIComponent(query));
    }
});

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    if (respData.Search) {
        showMovies(respData.Search);
    } else {
        console.error('No movies found or error in response:', respData);
    }
}

function showMovies(movies) {
    card.innerHTML = "";
    movies.forEach(async function(movie) {
        const movieData = await fetch(API_URL_DETAIL + movie.imdbID);
        const movieDataobj = await movieData.json();
        movie_display(movieDataobj);
    });
}

function movie_display(imovie) {
    const movieElm = document.createElement("div");
    movieElm.classList.add("movie-card");
    movieElm.innerHTML = `
        <div class="card">
            <img src="${imovie.Poster}" alt="Poster" width="300px" height="300px" />
            <br />
            <div class="movie-description">
                <span class="movie-title"><b>Title</b><span class="value">${imovie.Title}</span></span>
                <span class="movie-title"><b>Rating</b><span class="value">${imovie.imdbRating}</span></span>
                <span class="movie-title"><b>Director</b><span class="value">${imovie.Director}</span></span>
                <span class="movie-title"><b>Released Date</b><span class="value">${imovie.Released}</span></span>
                <span class="movie-title"><b>Genre</b><span class="value">${imovie.Genre}</span></span>
            </div>
        </div>
    `;
    card.appendChild(movieElm);
}
