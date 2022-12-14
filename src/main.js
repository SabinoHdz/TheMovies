//Configuración de la API con Axios
const api=axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type':'application/json;utf-8'
    },
    params:{
        'api_key':API_KEY,
    }
});

//Helpers
function createMovies(movies,container) {
    container.innerHTML='';

    movies.forEach(movie => {
        const movieContainer=document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click',()=>{
            location.hash=`#movie=${movie.id}`;
        });
        const imgMovie=document.createElement('img');
        imgMovie.classList.add('movie-img');
        imgMovie.setAttribute('alt',movie.title);
        imgMovie.setAttribute('src',`https://image.tmdb.org/t/p/w300${movie.poster_path}`);
    
        movieContainer.appendChild(imgMovie);
        container.appendChild(movieContainer);
    
    });
}

function createCategories(categories,container) {
    container.innerHTML="";
    categories.forEach(category => {
        const categoryContainer=document.createElement('div');
        categoryContainer.classList.add('category-container');
 
        const categoryTitle=document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id',`id${category.id}`);
        categoryTitle.addEventListener('click',()=>{
             location.hash=`#category=${category.id}-${category.name}`;
        });
        const textTitle=document.createTextNode(category.name);
        categoryTitle.appendChild(textTitle);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer);
    });
}

//LLamados a la API
const getTrendingMoviesPreview=async()=>{
//  const response=await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
    const {data}=await api(`trending/movie/day`);
    const movies=data.results;
    createMovies(movies,trendingMoviesPreviewList);
}

const getCategoryMoviesPreview=async()=>{
    // const response=await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    const {data}=await api(`genre/movie/list`);
    const categories=data.genres;
    createCategories(categories,categoriesPreviewList);
   }

   const getMoviesByCategory=async(idCategory)=>{
    const {data}=await api(`discover/movie`,{
        params:{
            with_genres:idCategory
        },
    });
    const movies=data.results;
    createMovies(movies,genericSection);
   }

   const getMoviesBySearch=async(query)=>{
    const {data}=await api(`search/movie`,{
        params:{
            query
        },
    });
    const movies=data.results;
    createMovies(movies,genericSection);
   }

   const getTrendingMovies=async()=>{
    //  const response=await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
        const {data}=await api(`trending/movie/week`);
        const movies=data.results;
        createMovies(movies,genericSection);
    }

    const getMovieById=async(id)=>{
        const {data:movie}=await api(`/movie/${id}`);
        const movieImgUrl=`https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        headerSection.style.background=`
        linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
        url(${movieImgUrl})
        `;
    movieDetailTitle.textContent=movie.title
    movieDetailDescription.textContent =movie.overview;
    movieDetailScore .textContent=movie.vote_average;
    console.log(movie.genres);
    createCategories(movie.genres,movieDetailCategoriesList);
    getRelatedMoviesById(id);
    }
    async function getRelatedMoviesById(id) {
        const {data}=await api(`/movie/${id}/recommendations`);
        const relatedMovies=data.results;

        createMovies(relatedMovies,relatedMoviesContainer);
        
    }