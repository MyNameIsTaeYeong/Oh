const mainScreen = document.querySelector(".main-screen");
const div1 = document.querySelector(".main-screen__div1");
const div2 = document.querySelector(".main-screen__div2");
const div3 = document.querySelector(".main-screen__div3");


const BTNS_LS = 'btns';

let cardCount = 0;

function paintCard(cardName){
    
    const div = document.createElement("div");
    const p = document.createElement("p");
    const btnHigh = document.createElement("button");
    const btnLow = document.createElement("button");
    const iUp = document.createElement('i');
    const iDown = document.createElement('i');
    // <i class="far fa-thumbs-up"></i>

    iUp.classList.add("far");
    iUp.classList.add("fa-thumbs-up");

    iDown.classList.add("far");
    iDown.classList.add("fa-thumbs-down");
    btnHigh.appendChild(iUp);
    btnLow.appendChild(iDown);

    btnHigh.classList.add("button__style");
    btnLow.classList.add("button__style");

    p.innerText = cardName;

    div.classList.add("main-screen__card");
    div.classList.add("vertical__flex");
    
    div.appendChild(p);
    div.appendChild(btnHigh);
    div.appendChild(btnLow);
    cardCount++;
    if(cardCount<=2){
        div1.appendChild(div);
    }
    else if(cardCount<=4){
        div2.appendChild(div);
    }
    else {
        div3.appendChild(div);
    }
}

function loadCards(){
    const loadedCards = localStorage.getItem(BTNS_LS);
    
    if(loadedCards[0] === '1'){
        paintCard("수면");
    }
    if(loadedCards[2] === '1'){
        paintCard("포만감");
    }
    if(loadedCards[4] === '1'){
        paintCard("공부");
    }
    if(loadedCards[6] === '1'){
        paintCard("폭식");
    }
    if(loadedCards[8] === '1'){
        paintCard("3대 중량");
    }
    if(loadedCards[10] === '1'){
        paintCard("무기력함");
        
    }
}

function init(){
    loadCards();
}


init();