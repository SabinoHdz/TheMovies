searchFormBtn.addEventListener('click',()=>{
    location.hash="#search="+searchFormInput.value;
})

trendingBtn.addEventListener('click',()=>{
    location.hash="#trends";
})

arrowBtn.addEventListener('click',()=>{
    history.back();
    //location.hash="#home";
})


window.addEventListener('DOMContentLoaded',navigator,false);
window.addEventListener('hashchange',navigator,false);
function navigator() {
    if(location.hash.startsWith('#trends')){
       trendsPage();
    }else if(location.hash.startsWith('#search=')){
        searchPage();
    }else if(location.hash.startsWith("#movie=")){
        movieDetailsPage();
    }else if(location.hash.startsWith('#category=')){
      categoryPage();
    }else{
        homePage();
    }
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;
}
function homePage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');

    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoryMoviesPreview();
}
function categoryPage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    //desestructuracion de arrays
    const [_,categoryInfo]=location.hash.split('=');
    const [categoryId,categoryName]=categoryInfo.split('-');
    // Agregar el nombre de la categoria en la vista de filtrados por categorias
    headerCategoryTitle.innerHTML=categoryName;
    //Busca las peliculas por categorias
    getMoviesByCategory(categoryId);
}
function movieDetailsPage() {
    headerSection.classList.add('header-container--long');
    headerSection.style.background='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    const [_,movieId]=location.hash.split('=');
    console.log(movieId);
    getMovieById(movieId);
}
function searchPage(params) {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    const [_,searchValue]=location.hash.split('=');
    getMoviesBySearch(searchValue);

}

function trendsPage(params) {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    headerCategoryTitle.innerHTML="Tendencias";
    getTrendingMovies();
}
