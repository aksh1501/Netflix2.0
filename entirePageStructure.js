import {debounce,searchImplementation} from './debounceSearchImpl.js';

export function entirePage(objectFromJson)
{
  let movieDetails={};

  const ApiKey="109daa35";

  const content=document.getElementById("entireContent");

  const searchKey=document.getElementsByClassName("my-input")[0]

  const showData=objectFromJson['shows'];
  
  function getMovieInfo(id,elem)
    {
      let url='http://www.omdbapi.com/?apikey='+ApiKey+'&i='+id;
  
      if(movieDetails[id])
      {
        console.log("faster");
        renderInfoPage(id,elem);
        return;
      }
  
      fetch(url,{
        method: "GET"
      })
      .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
            }
  
          // Examine the text in the response
            response.json().then(function(data) {
            movieDetails[id]=data;
            renderInfoPage(id,elem);
            return;
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :', err);
      });
  }

  function showTemplate(show) 
  {
      return `<li class="flex-item">
            <article class="showContent" data-movie-id=${show.imdbID} data-trailer=${show.trailer} data-image-path="./img/posters/${show.poster}">
            <img class="showImage" src="./img/posters/${show.poster}">
            <h3 class="showTitle">${show.title}</h3>
            <h4 class="releaseYear">(${show.year} )</h4>
            <p class="showDescription">${show.description}</p>
            </article>
        </li>`;

  }

  function handleClick(e)
  {
    const imdbId=e.target.getAttribute('data-movie-id');

    getMovieInfo(imdbId, e);
  }

  function renderInfoPage(imdbId,e)
  {
    const currMovie=movieDetails[imdbId];

    const showTitle=currMovie['Title'];  
     
    const releaseDate=currMovie['Released']
     
    const description=currMovie['Plot'];  

    const rating=currMovie['Ratings'][0].Value;
    
    const imagePath=e.target.dataset.imagePath;
   
    const trailer=e.target.dataset.trailer;

    const trailerUrl="https://www.youtube-nocookie.com/embed/"+trailer;

    const pageView=document.getElementsByClassName("movie-list-container")[0];
   
    pageView.classList.add("noShow");

    searchKey.classList.add("noShow");

    content.innerHTML=`
    <ul class="moviePage">
      <li class="titlePageHead">${showTitle}</li>
      <li class="releaseDate">${releaseDate}</li>
      <li class="rating">Rating ${rating}</li>
      <li>
        <img class="titleImage" src=${imagePath}>
      </li>
      <li>${description}</li>
    </div>
    <p align="center"><iframe class="trailerVideo" src=${trailerUrl}></iframe>
    <button type="button" class="backButton">back</button></p>`;


    const backButton=document.getElementsByClassName('backButton')[0];
    
    backButton.addEventListener('click',()=>{
      searchKey.classList.remove("noShow");
      pageView.classList.remove("noShow");
      firstPage();
    });
  }

  function firstPage()
  {
    content.innerHTML=`<ul id="myul" class="movie-list-container">
    ${showData.map(showTemplate).join("")}
    </ul>`;

    const movieBlock=document.getElementsByClassName("movie-list-container")[0];

    movieBlock.addEventListener('click',handleClick);

    let debouncedSearch=debounce(searchImplementation,700);

    searchKey.addEventListener('input',() => {
      const textEntered=searchKey.value;
        
      if(textEntered!=='' && textEntered.length>=2)
      {
          debouncedSearch();
      }
    });
  }

  firstPage();

}

