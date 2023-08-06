
"use strict";
//create individual prefix/keys for local storage
const prefix = "aem3780Project2-";
const breedKey = prefix + "dogBreed";
const limitKey = prefix + "limitNumber";
const favKey = prefix + "faveDogs";


//initialize images array
let imagesArray = [];

//create array of favorite images and store them
let favoriteDogs = localStorage.getItem(favKey);
let favorites = JSON.parse(favoriteDogs);

//called when random button is clicked
function randomButtonClicked(){
    //entry point for web service to get random dog image
    const RANDOM_DOG_URL = "https://dog.ceo/api/breeds/image/random";
    //set url equal to random dog url
    let url = RANDOM_DOG_URL;
    //get the data for random dog 
    getRandomData(url);
}

//retreives data for random dog when called
function getRandomData(url)
{
    //create a new xhr object
    let xhr = new XMLHttpRequest();
    //when xhr is loaded call dataLoadedRandom function
    xhr.onload = dataLoadedRandom;
    //if an error occurs call dataError function
    xhr.onerror = dataError;

    //open connection and send the request
    xhr.open("GET", url);
    xhr.send();
}

//called when loading data of random dog image
function dataLoadedRandom(e){
    // assign e.target as the xhr object
    let xhr = e.target;
    //turn text into a parsable JavaScript object
    let object = JSON.parse(xhr.responseText);
    
    //if there are no results or the data isn't loaded successfully
    if(object.status != "success"){
        document.querySelector("#content").innerHTML = "<p>There was a problem. Please try again :)</p>";
        return;
    }
    
    //assign object data to results
    let results = object.data
    //initialize string to empty
    let string = ""
    let resultURL = object.message;
    
    //create new img tag using object data
    string += `<div id='result'><img src='${resultURL}'></div>`;
    
    //display random dog 
    document.querySelector("#status").innerHTML = "Here's a random pup!"
    document.querySelector("#content").innerHTML = string;
}

//called when search button is clicked
function searchButtonClicked(){

    //entry point to dog api
    const SERVICE_URL = "https://dog.ceo/api/breed/";
    //let url equal service url
    let url = SERVICE_URL;
    //let breed variable be assigned the value of breed the user selected 
    let breedType = document.querySelector("#breed").value;
    //let limit variable be assigned to the value of images the user selected
    let limit = document.querySelector("#limitNum").value;
    //add breed type to url
    url += breedType + "/images/random/";
    //add image limit to url
    url+= + limit;
    //while searching update user that search is in progress
    document.querySelector("#status").innerHTML = "Searching for '" + breedType + "'...";
    //empty images array 
    imagesArray = [];
    //get data from url
    getData(url);
}

//retreives data when called
function getData(url)
{
    //create a new xhr object
    let xhr = new XMLHttpRequest();
    //when xhr is loaded call dataLoaded function
    xhr.onload = dataLoaded;
    //if an error occurs call dataError function
    xhr.onerror = dataError;
    //open connection and send the request
    xhr.open("GET", url);
    xhr.send();
}

//called when loading data of dog image
function dataLoaded(e){
    // assign e.target as the xhr object
    let xhr = e.target;
    //turn text into a parsable JavaScript object
    let object = JSON.parse(xhr.responseText);
    //assign object data to results
    let results = object.message;
    //initialize string to empty
    let string = "";
    let breedType = document.querySelector("#breed").value;
    //let limit variable be assigned to the value of images the user selected
    let limit = document.querySelector("#limitNum").value;
    //if there are no results or the data isn't loaded successfully
    if(object.status != "success"){
        document.querySelector("#content").innerHTML = "<p>An error occured. Please try a different search :)</p>";
        return;
    }
    //loop through array of result images
    for(let i = 0; i < results.length; i++){
            //initialize variable for new img tag to be created
            let newimg = "";
            //let result be the current images in loop
            let result = results[i];
            //let resultURL be the current image and add that to image array
            let resultURL = result;
            imagesArray.push(resultURL);
            //creates new img tag to put results into 
            newimg = `<div id='result'><img src='${resultURL}' width="100%" height="100%">`+
            `Add to Favorites<input type="checkbox" id='${i}'onclick="addToFavorites(${i})"></div>`;
            //add the new img tag created to string
            string += newimg;
    }
    //update the user that there are results for the breed they selected
    document.querySelector("#status").innerHTML = "Here are "+ limit+" results for '"+breedType+ "' dogs!";
    
    //add string to content
    document.querySelector("#content").innerHTML = string;
}

//called when checkbox is clicked
function addToFavorites(i){
    let index = i;
    //pushes image at index to favorites array
    favorites.push(imagesArray[index]);
    //store the favorites array as a string and store in local storage
    favoriteDogs = JSON.stringify(favorites);
    localStorage.setItem(favKey, favoriteDogs);
    
}

//called when checkbox is clicked
function clearButtonClicked(){
    //set favorites to empty arrayy
    favorites = [];
    //store the favorites array as a string and store in local storage
    favoriteDogs = JSON.stringify(favorites);
    localStorage.setItem(favKey, favoriteDogs);
    //updates the user that they have cleared their favorites and clears the contetn area
    document.querySelector("#status").innerHTML = "You have cleared your favorites!";
    document.querySelector("#content").innerHTML = "";
    
}

//called when favorites button is clicked
function showFavoriteDogs(){
    let string = "";

    //if favorites array is empty tell the user they have no favorites
    if(favorites.length == 0){
        document.querySelector("#status").innerHTML = "You have no favorite furry friends :(";
    }
    //loop through favorites array
    for (let i = 0; i < favorites.length; i++) {
        //set the resultURL to the favorite image at i
        let resultURL = favorites[i];
        //create new image tag for the favorite image at i 
        let newimg = `<div id='result'><img src='${resultURL}'></div>`;
        //update user that their favorites are being displayed
        string += newimg;
        document.querySelector("#status").innerHTML = "Here are your favorite furry friends!";
    }
    //display favorites to user
    document.querySelector("#content").innerHTML = string;
}

//called when an error occurs or when search cant be completed
function dataError(e){
    //let user know theres been an error
    document.querySelector("#content").innerHTML = "An error ocurred. Please try a different search :)";
}

//when window loads
window.onload = (e) => {
    //initialize images array
    let imagesArray = [];
    //create array of checkbox buttons
    let favoriteButtons = [];
    //get value of the breed search field and store in breedType
    const breedType = document.querySelector("#breed");
    //gets breed stored in local storage
    const storedBreedType = localStorage.getItem(breedKey);
    //get value of the limit search field and store in imageLimit
    const imageLimit = document.querySelector("#limitNum");
    //gets limit stored in local storage
    const storedLimit = localStorage.getItem(limitKey);
    //when a different breed is selected store that value in local storage
        breedType.onchange = function(e){
        localStorage.setItem(breedKey, e.target.value);
    };
    //if there is a previously stored breed in local storage set the breed value to that breed
        if(storedBreedType != null){
        breedType.querySelector(`option[value='${storedBreedType}']`).selected = true;
    }
    //when a different limit is selected store that value in local storage
        imageLimit.onchange = function(e){
        localStorage.setItem(limitKey, e.target.value);
    };
    //if there is a previously stored limit in local storage set the limit value to that limit
        if(storedLimit != null){
        imageLimit.querySelector(`option[value='${storedLimit}']`).selected = true;
    }
    // if there are no favorited dogs, set favorites array to empty
    if (favorites == null) {
    favorites = [];
    }
    //when search button clicked call searchButtonClicked function
    document.querySelector("#search").onclick = searchButtonClicked;
    //when random button clicked call randomButtonClicked function
    document.querySelector("#random").onclick = randomButtonClicked;
    //when random button clicked call showFavorieDogs function
    document.querySelector("#favorites").onclick = showFavoriteDogs;
    //when random button clicked call randomButtonClicked function
    document.querySelector("#clear").onclick = clearButtonClicked;

};
