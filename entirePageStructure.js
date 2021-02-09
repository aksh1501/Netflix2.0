import {debounce,searchImplementation} from './debounceSearchImpl.js';

export function entirePage(objectFromJson)
{
  let movieDetails={};

  const ApiKey="109daa35";

  let searchKey=document.getElementsByClassName("my-input")[0]

  const showData=objectFromJson['shows'];
  
  function GetMovieInfo(id,e,callback)
  {
    let url='http://www.omdbapi.com/?apikey='+ApiKey+'&i='+id;
  
    if(movieDetails[id])
    {
      console.log("faster");
      callback(id,e);
      return;
    }

    // console.log(movieDetails);
  
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
            callback(id,e);
            return;
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
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

    GetMovieInfo(imdbId, e,renderInfoPage);
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
    <p align="center"><iframe class="trailerVideo" src=${trailerUrl}></iframe>
    <button type="button" class="backButton">back</button></p>`;


    document.getElementsByClassName('backButton')[0].addEventListener('click',()=>{
      searchKey.classList.remove("noShow");
      pageView.classList.remove("noShow");
      // entirePage(objectFromJson);
      firstPage();
    });
  }


  function firstPage()
  {
    document.getElementById("entireContent").innerHTML=`<ul id="myul" class="flex-container">
    ${showData.map(showTemplate).join("")}
    </ul>`;

    const movieBlock=document.getElementsByClassName("flex-container")[0];

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

