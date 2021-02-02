import { deleteMemo } from "./memo";

const home = document.querySelector(".home");

function init(){
    const delBtns = document.querySelectorAll("#js-memoList button");
    for(let i=0; i<delBtns.length; i++){
        delBtns[i].addEventListener("click", deleteMemo);
    }
}

if(home){
    init();
}


