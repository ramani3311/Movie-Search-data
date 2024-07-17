
let input = document.querySelector(".searchMovie");
let searchList = document.querySelector(".search-list");
let right_gride=document.querySelector(".right-gride");
let left_gride=document.querySelector(".left-gride");

async function searchMovie(searchTearm) {
  url = `http://www.omdbapi.com/?s=${searchTearm}&apikey=8060b63f`;
  let responce = await fetch(url);
  let data = await responce.json();  
  addSearchList(data.Search);
}

function findMovie() {
  let movieName = input.value.trim();
  console.log(input.value);
  if (movieName.length > 0) {
    searchMovie(movieName);
  }  
}
function addSearchList(data) {
  searchList.innerHTML=``;
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    let div = document.createElement("div");
    div.setAttribute("id",data[i].imdbID);
    div.setAttribute("class","search-list-item")
    let moviePoster=data[i].Poster;
    div.innerHTML = `
        <div class="img">
          <img src="${moviePoster}" alt="search-list-img" class="search-list-img" />
        </div>
        <div class="imformation">
          <p class="search-list-imformation"><h3>${data[i].Title}</h3></p>
          <p class="search-list-year">${data[i].Year}</p>
        </div> `;
    searchList.append(div);
    div.addEventListener("click",()=>{
        console.log(div.getAttribute("id"));
        addResultdata(div.getAttribute("id"))
        searchList.innerHTML=``;

    })
  }
}
async function addResultdata(key){
    let newUrl=` http://www.omdbapi.com/?i=${key}&apikey=8060b63f`;
    let responce2=await fetch(newUrl);
    let data2=await responce2.json();
    console.log(data2);
    console.log();
    let img=document.createElement("img");
    img.src=data2.Poster;
    img.setAttribute("class","left_gride_img");
    left_gride.innerHTML=``;
    left_gride.append(img);
    right_gride.innerHTML=`
    <h1 class="movieName"> ${data2.Title}</h1>
    <ul class="yearRating">
      <li class="Year"><b>Year:</b> ${data2.Year} </li>
      <li class="Rating">Ratings: ${data2.imdbRating}</li>
      <li class="Relesed">Relesed: ${data2.Released}</li>
    </ul>
    <p class="Genre"><b>Genre:</b> ${data2.Genre} </p>
    <p class="Writer"><b>Writer:</b> ${data2.Writer}</p>
    <p class="Actors">
      <b>Actors:</b> ${data2.Actors}
    </p>
    <p class="Plot">
      <b>Plot:</b> ${data2.Plot}
    </p>
    <p class="Language">
      <i><b>Language:</b> ${data2.Language} </i>
    </p>`
}
