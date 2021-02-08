import {entirePage,createMapping} from './entirePageStructure.js';

fetch('https://demo0376970.mockable.io/movieslist',{
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
        entirePage(data);
        createMapping(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });





