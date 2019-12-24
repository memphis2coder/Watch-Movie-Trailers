// Initial Values
const appSecret = "config.appSecret";
const API_KEY = appSecret;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const url =
  "https://api.themoviedb.org/3/search/movie?api_key=b2532490f59083cb196f0daa924552e0";

// function to generateURL dynamic
function generateURL(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=b2532490f59083cb196f0daa924552e0`;
  return url;
}

// function to request new movies
function requestMovies(url, onComplete, onError) {
  fetch(url)
    .then(res => res.json())
    .then(onComplete)
    .catch(onError);
}

// function to search movies
function searchMovie(value) {
  const path = "/search/movie";
  // new url
  const url = generateURL(path) + "&query=" + value;
  requestMovies(url, renderSearchMovies, handleError);
}

// adding new functionality to the website //

// function to get upcoming movies

function getPopularMovies() {
  const path = "/movie/popular";
  const url = generateURL(path);
  const render = renderMovies.bind({ title: "Popular Movies" });
  requestMovies(url, render, handleError);
}

// function getUpcomingMovies() {
//   const path = "/movie/upcoming";
//   const url = generateURL(path);
//   const render = renderMovies.bind({ title: "Upcoming Movies" });
//   requestMovies(url, render, handleError);
// }

// function getTopRatedMovies() {
//   const path = "/movie/top_rated";
//   const url = generateURL(path);
//   const render = renderMovies.bind({ title: "Top Rated Movies" });
//   requestMovies(url, render, handleError);
// }
