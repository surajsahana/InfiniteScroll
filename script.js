const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];


//Unsplach API
let count = 5; //initially loading only 5 images so that it loads faster and we have good user experience
const apiKey = `N90A2jWqUclc0AQwz82Irv1fMOnlEtjY5YfX-MgO-Gc`;
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//check if all images are loaded
function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30//we increase the number of image loaded = 30, when the user scrolls down
    }
}

//Helper function to add attributes
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements for links & photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images ', totalImages);
    
    photosArray.forEach((photo)=>{
        //create <a> to link to unsplash
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        
        //create image for photo
        const img = document.createElement('img');
        //img.setAttribute('src', photo.urls.regular);
        //img.setAttribute('alt', photo.alt_description);
        //img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        
        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        
        //Put img inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item); 
    });
    
    
}


//Get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
    }
}

//check to see if scrolling near bottom o page, load more photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

//on loading
getPhotos();