const getTrendingMoviesPreview=async()=>{
 const response=await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
 const data =await response.json();
 const movies=data.results;

//  console.log(data);
//  console.log(movies);

 movies.forEach(movie => {
    const trendingMoviesPreviewContainer=document.querySelector('#trendingPreview .trendingPreview-movieList')
    const movieContainer=document.createElement('div');
    movieContainer.classList.add('movie-container');
    const imgMovie=document.createElement('img');
    imgMovie.classList.add('movie-img');
    imgMovie.setAttribute('alt',movie.title);
    imgMovie.setAttribute('src',`https://image.tmdb.org/t/p/w300${movie.poster_path}`);

    movieContainer.appendChild(imgMovie);
    trendingMoviesPreviewContainer.appendChild(movieContainer);


 });
}

const getCategoryMoviesPreview=async()=>{
    const response=await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    const data =await response.json();
    const categories=data.genres;
   
    console.log(data);
    console.log(categories);
   
    categories.forEach(category => {
       const previewCategoryContainer=document.querySelector('#categoriesPreview .categoriesPreview-list')
       const categoryContainer=document.createElement('div');
       categoryContainer.classList.add('category-container');

       const categoryTitle=document.createElement('h3');
       categoryTitle.classList.add('category-title');
       categoryTitle.setAttribute('id',`id${category.id}`);
       const textTitle=document.createTextNode(category.name);
       categoryTitle.appendChild(textTitle);
       categoryContainer.appendChild(categoryTitle);
       previewCategoryContainer.appendChild(categoryContainer);
   
   
    });
   }

getTrendingMoviesPreview();
getCategoryMoviesPreview();