const btn__sleep = document.querySelector("#btn__sleep"),
    btn__full = document.querySelector("#btn__full"),
    btn__study = document.querySelector("#btn__study"),
    btn__greed = document.querySelector("#btn__greed"),
    btn__freeweight = document.querySelector("#btn__freeweight"),
    btn__lazy = document.querySelector("#btn__lazy"),
    go = document.querySelector("#js-go")



const BTNS_LS = 'btns';

let btns = [];


function handleClick(event){
    const icon = event.target;
    const btn = icon.parentNode;
    if(icon.classList.contains('changeColor')){
        // icon.classList.remove('far');
        // icon.classList.add('fas');
        icon.classList.remove('changeColor');
        btn.value = 1;
    }else{
        // icon.classList.remove('fas');
        icon.classList.add('changeColor');
        // icon.classList.add('far');
        btn.value = 0;
    }

}

function handleGo(){
    btns.push(btn__sleep.value);
    btns.push(btn__full.value);
    btns.push(btn__study.value);
    btns.push(btn__greed.value);
    btns.push(btn__freeweight.value);
    btns.push(btn__lazy.value);
    localStorage.setItem(BTNS_LS, btns);
}

function init(){
    btn__sleep.addEventListener("click", handleClick);
    btn__full.addEventListener("click", handleClick);
    btn__study.addEventListener("click", handleClick);
    btn__greed.addEventListener("click", handleClick);
    btn__freeweight.addEventListener("click", handleClick);
    btn__lazy.addEventListener("click", handleClick);
    go.addEventListener("click", handleGo)
}

init();