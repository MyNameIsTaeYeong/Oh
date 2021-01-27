const contentsViewer = document.querySelector(".viewer--window");

const prevPageBtn = document.getElementById("js-prevPageBtn");
const nextPageBtn = document.getElementById("js-nextPageBtn");
const patternList = document.getElementById("js-patternList");
const patternAddBtn = document.getElementById("pattern--add-Btn");

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

const addPattern = () => {
    const input = prompt("패턴이름");
    alert(input);
    if(input !== null){
        const li = document.createElement("li");
        const btn = document.createElement("button");
        li.appendChild(btn);
        btn.value = input;
        btn.innerText = input;
        patternList.appendChild(li);
        btn.classList = "pattern-button";
        
    }

}

function init(){
    nextPageBtn.addEventListener("click", nextPage);
    prevPageBtn.addEventListener("click", prevPage);
    patternAddBtn.addEventListener("click", addPattern);
    prevPageBtn.style.visibility = 'hidden';
}

if(contentsViewer){
    init();
}