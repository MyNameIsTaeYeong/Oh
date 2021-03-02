import axios from "axios";
import globals from "./globals";

const patternList = document.getElementById("js-patternList");
const patternAddBtn = document.getElementById("pattern--add-Btn");

/*
    패턴 삭제시 3단계 수행
    1. 날짜별 패턴맵에서 해당패턴 인덱스 지우기
    2. 유저가 가지고 있는 패턴에서 해당패턴 인덱스 지우기
    3. 유저가 가지고 있는 패턴들의 relatedPattern요소에서 해당패턴 인덱스 지우기
*/

const paintPattern = () => {
    
}

// DB에 패턴 값 추가하기
export const recordPatternValue = async (event) => {
    const response = await axios({
        url: `/api/${globals.userId}/recordpattern/${globals.day}`,
        method: "POST",
        data:{
            patternIndexAndValue: event.target.id
        }
    });

    if(response.status === 200){
        
        //paintPattern();
    }
}


// Fake UI
export const addPattern = (patternName, btnId) => {
        const li = document.createElement("li");
        const patternCard = document.createElement("div");
        const patternBtnWrap = document.createElement("div");
        const p = document.createElement("p");
        const goodBtn = document.createElement("button");
        const averageBtn = document.createElement("button");
        const badBtn = document.createElement("button");

        // 버튼에 아이디부여 1,good => 1번패턴의 good값의 아이디
        goodBtn.id = `${btnId},good`;
        averageBtn.id = `${btnId},avg`;
        badBtn.id = `${btnId},bad`;

        goodBtn.addEventListener("click", recordPatternValue);
        averageBtn.addEventListener("click", recordPatternValue);
        badBtn.addEventListener("click", recordPatternValue);

        goodBtn.classList.add("far");
        goodBtn.classList.add("fa-smile-beam");
        averageBtn.classList.add("far");
        averageBtn.classList.add("fa-meh");
        badBtn.classList.add("far");
        badBtn.classList.add("fa-tired");


        patternBtnWrap.appendChild(goodBtn);
        patternBtnWrap.appendChild(averageBtn);
        patternBtnWrap.appendChild(badBtn);

        p.innerText = patternName;
        patternCard.appendChild(p);
        patternCard.appendChild(patternBtnWrap);

        li.appendChild(patternCard);
        patternList.appendChild(li);
        patternCard.classList = "pattern-card";
        
    
}

// DB에 패턴 추가하기
const createPattern = async () => {
    const patternName = prompt("패턴이름");
    alert(`${patternName}이(가) 추가 되었습니다.`);

    const response = await axios({
        url: `/api/${globals.userId}/createpattern`,
        method: "POST",
        data: {
            patternName
        }
    });

    if(response.status === 200){
        // 컨트롤러에서 res.send에 데이터 객체를 받아와서 버튼아이디를 부여한다.
        addPattern(patternName, response.data.btnId);
    }
}


const init = () => {
    patternAddBtn.addEventListener("click", createPattern);
}

if(patternList){
    init();
}