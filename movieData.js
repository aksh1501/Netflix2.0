export function GetMovieInfo(api,id,cache){

    let url='http://www.omdbapi.com/?apikey='+api+'&i='+id;
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
          // console.log(id,data);
          // console.log(cache);
          cache[id]=data;
        });
      }
    )
    .catch(function(err) {
      console.log("idk");
      console.log('Fetch Error :-S', err);
    });
  
  }