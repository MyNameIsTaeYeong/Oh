import { deleteMemo } from "./memo";
import { recordPatternValue } from "./pattern";

const home = document.querySelector(".home");

function init(){
    // 메모 삭제버튼에 리스너 붙이기
    const delBtns = document.querySelectorAll("#js-memoList button");
    for(let i=0; i<delBtns.length; i++){
        delBtns[i].addEventListener("click", deleteMemo);
    }

    // 패턴 상중하버튼에 리스너 붙이기
    const patternValueBtns = document.querySelectorAll("#js-patternList button");
    for(let i=0; i<patternValueBtns.length; i++){
        patternValueBtns[i].addEventListener("click", recordPatternValue);
    }
}

if(home){
    init();
}


