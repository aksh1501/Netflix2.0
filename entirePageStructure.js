import {debounce,searchImplementation} from './debounceSearchImpl.js';
import {GetMovieInfo} from "./movieData.js";

export const ApiKey="109daa35";
export let movieDetails=new Map();

export function entirePage(objectFromJson)
{
  let searchKey=document.getElementsByClassName("my-input")[0]

  const showData=objectFromJson['shows'];

  function showTemplate(show) 
  {
      return `<li class="flex-item">
            <article class="showContent">
            <img class="showImage" src="./img/posters/${show.poster}">
            <h3 class="showTitle">${show.title}</h3>
            <h4 class="releaseYear">(${show.year} )</h4>
            <h5 class="noShow">${show.imdbID}</h4>
            <h6 class="noShow">${show.trailer}</h4>
            <p class="showDescription">${show.description}</p>
            </article>
        </li>`;

  }

  function handleClick()
  {
    const imdbId=arguments[0]["target"].getElementsByTagName('h5')[0].innerText;
    
    const showTitle=movieDetails[imdbId]['Title'];  
     
    const releaseDate=movieDetails[imdbId]['Released']
     
    const description=movieDetails[imdbId]['Plot'];  
    
    const imagePath=arguments[0]["target"].getElementsByTagName('img')[0].src;
    
    const trailer=arguments[0]["target"].getElementsByTagName('h6')[0].innerText;

    const trailerUrl="https://www.youtube-nocookie.com/embed/"+trailer;

    const rating=movieDetails[imdbId]['Ratings'][0].Value;

    const pageView=document.getElementsByClassName("flex-container")[0];
   
    pageView.classList.add("noShow");

    searchKey.classList.add("noShow");

    document.getElementById("entireContent").innerHTML=`
    <ul class="moviePage">
      <li class="titlePageHead">${showTitle}</li>
      <li class="releaseDate">${releaseDate}</li>
      <li class="rating">Rating ${rating}</li>
      <li>
        <img class="titleImage" src=${imagePath}>
      </li>
      <li>${description}</li>
    </div>
    <p align="center"><iframe class="trailerVideo" src=${trailerUrl}></iframe></p>`;
  
  }


  //adding a better naming for the id of search element
  document.getElementById("entireContent").innerHTML=`<ul id="myul" class="flex-container">
  ${showData.map(showTemplate).join("")}
  </ul>`;

  const movieBlock=document.querySelectorAll(".flex-item");

  movieBlock.forEach((blk)=>{
    blk.removeEventListener('click',handleClick);
    blk.addEventListener('click',handleClick);
  });

  let debouncedSearch=debounce(searchImplementation,700);

  searchKey.oninput=() => {
      let textEntered=searchKey.value;
        
      if(textEntered!=='' && textEntered.length>=2)
      {
          debouncedSearch();
      }
    }
}


export function createMapping(data){
    const allShows=data["shows"];
      allShows.forEach((show)=>{
      GetMovieInfo(ApiKey ,show['imdbID'],movieDetails);
    });
    
  }
