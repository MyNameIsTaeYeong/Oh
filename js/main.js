const mainScreen = document.querySelector(".main-screen");
const div1 = document.querySelector(".main-screen__div1");
const div2 = document.querySelector(".main-screen__div2");
const div3 = document.querySelector(".main-screen__div3");


const BTNS_LS = 'btns';

let cardCount = 0;

function paintCard(cardName){
    
    const div = document.createElement("div");
    const p = document.createElement("p");
    const btnSmile = document.createElement("button");
    const btnMeh = document.createElement("button");
    const btnFrown = document.createElement("button");
    const iSmile = document.createElement('i');
    const iMeh = document.createElement('i');
    const iFrown = document.createElement('i');
    const iBox=document.createElement('div');

{/* <i class="far fa-smile-beam"></i>
         <i class="far fa-meh"></i><i class="far fa-frown"></i> */}
    iSmile.classList.add("far");
    iSmile.classList.add("fa-smile-beam");

    iMeh.classList.add("far");
    iMeh.classList.add("fa-meh");

    iFrown.classList.add("far");
    iFrown.classList.add("fa-frown");

    btnSmile.appendChild(iSmile);
    btnMeh.appendChild(iMeh);
    btnFrown.appendChild(iFrown);

    btnSmile.classList.add("button__style");
    btnMeh.classList.add("button__style");
    btnFrown.classList.add("button__style");
    

    iBox.appendChild(btnSmile);
    iBox.appendChild(btnMeh);
    iBox.appendChild(btnFrown);

    iBox.classList.add("horizontal__flex");

    p.innerText = cardName;

    div.classList.add("main-screen__card");
    div.classList.add("vertical__flex");
    
    div.appendChild(p);
    div.appendChild(iBox);
    
    cardCount++;
    mainScreen.appendChild(div);
   
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