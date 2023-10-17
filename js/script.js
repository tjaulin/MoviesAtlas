const btnSearch = document.querySelector('#btn-search');
const searchMoviesInput = document.querySelector('#search-movies');
const content = document.querySelector('.content');
const buttonPrevious = document.querySelector('.button-previous');
const buttonNext = document.querySelector('.button-next');

// Pagination section
let currentPage = 1;
let totalPages = 1;

btnSearch.addEventListener('click', async function() {
    content.innerHTML = ``;
    currentPage = 1;
    try {
        const dataSearchMovies = await initMovies();
        console.log(dataSearchMovies);

        showSearchMovies(dataSearchMovies)

    } catch (error) {
        throw new Error(error);
    }
});

buttonPrevious.addEventListener('click', async function() {
    if (currentPage > 1) {
        content.innerHTML = ``;
        currentPage--;
        const dataSearchMovies = await initMovies(currentPage);
        showSearchMovies(dataSearchMovies);
    }
});

buttonNext.addEventListener('click', async function() {
    if (currentPage < totalPages) {
        content.innerHTML = ``;
        currentPage++;
        const dataSearchMovies = await initMovies(currentPage);
        showSearchMovies(dataSearchMovies);
    }
});

async function initMovies(numberOfPages = 1) {
    const initSearchMovies = await fetch(`${config.DEFAULT_API_URL}/search/movie?api_key=${config.API_KEY}&query=${searchMoviesInput.value}&language=fr-FR&page=${numberOfPages}`)
    const dataJson = await initSearchMovies.json();
    totalPages = dataJson.total_pages;
    if(dataJson.total_pages > 1) {
        buttonNext.style.display = 'block';
        buttonPrevious.style.display = 'block';
    } else {
        buttonNext.style.display = 'none';
        buttonPrevious.style.display = 'none';
    }
    return await dataJson;
}

function showSearchMovies(datas) {
    datas.results.forEach(movie => {
        const cardMovie = document.createElement('div');
        cardMovie.classList.add('card');
        const divImage = document.createElement('div');
        divImage.classList.add('image');
        const imgMovie = document.createElement('img');
        if(movie.poster_path) {
            imgMovie.src = `${config.BASE_URL}/original/${movie.poster_path}`;
        } else {
            imgMovie.src = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`
        }
        const divContent = document.createElement('div');
        divContent.classList.add('content');
        const titleMovie = document.createElement('p');
        titleMovie.innerText = movie.title;

        divImage.append(imgMovie);
        divContent.append(titleMovie);
        cardMovie.append(divImage, divContent);
        content.append(cardMovie);
    });
}

// console.log(`${config.BASE_URL}/original/1p5thyQ4pCy876HpdvFARqJ62N9.jpg`)