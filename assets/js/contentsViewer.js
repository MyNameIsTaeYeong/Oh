const contentsViewer = document.querySelector(".viewer--window");

const prevPageBtn = document.getElementById("js-prevPageBtn");
const nextPageBtn = document.getElementById("js-nextPageBtn");

const viewerWrap = document.querySelector(".viewer--wrap");


let distance = 0;

const nextPage = () => {
    distance += 300;
    viewerWrap.style.transform = `translateX(-${distance}px)`;
    if(distance === 600){
        nextPageBtn.style.visibility = 'hidden';
    }
    prevPageBtn.style.visibility = 'visible';
}

const prevPage = () => {
    distance -= 300;
    viewerWrap.style.transform = `translateX(-${distance}px)`;
    if(distance === 0){
        prevPageBtn.style.visibility = 'hidden';
    }
    nextPageBtn.style.visibility = 'visible';
}



function init(){
    nextPageBtn.addEventListener("click", nextPage);
    prevPageBtn.addEventListener("click", prevPage);
    prevPageBtn.style.visibility = 'hidden';
}

if(contentsViewer){
    init();
}