const btnSearch = document.querySelector('#btn-search');
const searchMoviesInput = document.querySelector('#search-movies');
const content = document.querySelector('.content');

btnSearch.addEventListener('click', async function() {
    content.innerHTML = ``;
    try {
        const initSearchMovies = await fetch(`${config.DEFAULT_API_URL}/search/movie?api_key=${config.API_KEY}&query=${searchMoviesInput.value}&language=fr-FR`)
        const dataSearchMovies = await initSearchMovies.json();

        console.log(dataSearchMovies);

        dataSearchMovies.results.forEach(movie => {
            const cardMovie = document.createElement('div');
            cardMovie.classList.add('card');
            cardMovie.style.maxWidth = '185px';
            const imgMovie = document.createElement('img');
            if(movie.poster_path) {
                imgMovie.src = `${config.BASE_URL}/original/${movie.poster_path}`;
            } else {
                imgMovie.style.width = '185px';
                imgMovie.src = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`
            }
            const titleMovie = document.createElement('p');
            titleMovie.style.textAlign = 'center';
            titleMovie.innerText = movie.title;

            cardMovie.append(imgMovie, titleMovie);
            content.append(cardMovie);
        });

    } catch (error) {
        throw new Error(error);
    }
});

// console.log(`${config.BASE_URL}/original/1p5thyQ4pCy876HpdvFARqJ62N9.jpg`)

