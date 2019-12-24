// Select elements from the DOM
const buttonElement = document.getElementById("search");
const inputElement = document.getElementById("inputValue");
const movieSearchable = document.getElementById("movies-searchable");
const moviesContainer = document.getElementById("movies-container");

// function to handle movieSection
function movieSection(movies) {
  const section = document.createElement("section");
  section.classList = "section";

  movies.map(movie => {
    if (movie.poster_path) {
      const img = document.createElement("img");
      img.src = IMAGE_URL + movie.poster_path;
      img.setAttribute("data-movie-id", movie.id);

      section.appendChild(img);
    }
  });
  return section;
}

// Create the movie container
function createMovieContainer(movies, title = "") {
  // create div with a class of movie
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const header = document.createElement("h2");
  header.innerHTML = title;

  const content = document.createElement("div");
  content.classList = "content";

  const contentClose = `<p>X</p>`;
  content.innerHTML = contentClose;

  const section = movieSection(movies);

  movieElement.appendChild(header);
  movieElement.appendChild(section);
  movieElement.appendChild(content);
  return movieElement;
}
// function to render movie
function renderSearchMovies(data) {
  // data.results []
  movieSearchable.innerHTML = "";
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  movieSearchable.appendChild(movieBlock);
  console.log("Data: ", data);
}

// render function
function renderMovies(data) {
  const movies = data.results;
  const movieBlock = createMovieContainer(movies, this.title);
  moviesContainer.appendChild(movieBlock);
}

// Error Handler
function handleError(error) {
  console.log("Error: ", error);
}

// click event search feature
buttonElement.onclick = () => {
  // prevents the browser reload
  event.preventDefault();
  // input value
  const value = inputElement.value;
  searchMovie(value);

  // clear input value after search
  inputElement.value = "";
  console.log("searchInput: ", value);
};

// function for the movie trailer
function createIframe(video) {
  const iframe = document.createElement("iframe");
  iframe.src = `http://www.youtube.com/embed/${video.key}`;
  iframe.width = 300;
  iframe.height = 200;
  iframe.allowFullscreen = true;

  return iframe;
}

// create a video template to remove old search trailers
function createVideotemplate(data, content) {
  // TODO
  // display movie video trailer
  content.innerHTML = `<p id="content-close">X</p>`;
  console.log("Videos: ", data);
  const videos = data.results;
  const length = videos.length > 4 ? 4 : videos.length;
  const iframeContainer = document.createElement("div");

  for (let i = 0; i < videos.length; i++) {
    const video = videos[i]; // video
    const iframe = createIframe(video);
    iframeContainer.appendChild(iframe);
    content.appendChild(iframeContainer);
  }
}

// listen for click event on img EVENT DELEGATION
document.onclick = function(event) {
  const target = event.target;

  if (target.tagName.toLowerCase() === "img") {
    console.log("img has been clicked");
    const movieId = target.dataset.movieId;
    console.log("movieId: ", movieId);
    const section = event.target.parentElement; // section
    const content = section.nextElementSibling; // content
    content.classList.add("content-display");

    const path = `/movie/${movieId}/videos`;
    const url = generateURL(path);
    // fetch movie videos
    fetch(url)
      .then(res => res.json())
      .then(data => createVideotemplate(data, content))
      .catch(error => {
        console.log("Error: ", error);
      });
  }

  if (target.id === "content-close") {
    const content = target.parentElement;
    content.classList.remove("content-display");
  }
};

// adding new feature sections //

// upcoming movies
getPopularMovies();

// getUpcomingMovies();

// getTopRatedMovies();
