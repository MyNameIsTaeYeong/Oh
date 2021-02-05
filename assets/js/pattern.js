const patternList = document.getElementById("js-patternList");
const patternAddBtn = document.getElementById("pattern--add-Btn");

export const addPattern = () => {
    const input = prompt("패턴이름");
    alert(input);
    if(input !== null){
        const li = document.createElement("li");
        const patternCard = document.createElement("div");
        const patternBtnWrap = document.createElement("div");
        const p = document.createElement("p");
        const goodBtn = document.createElement("button");
        const averageBtn = document.createElement("button");
        const badBtn = document.createElement("button");

        goodBtn.classList.add("far");
        goodBtn.classList.add("fa-smile-beam");
        averageBtn.classList.add("far");
        averageBtn.classList.add("fa-meh");
        badBtn.classList.add("far");
        badBtn.classList.add("fa-tired");


        patternBtnWrap.appendChild(goodBtn);
        patternBtnWrap.appendChild(averageBtn);
        patternBtnWrap.appendChild(badBtn);

        p.innerText = input;
        patternCard.appendChild(p);
        patternCard.appendChild(patternBtnWrap);

        li.appendChild(patternCard);
        patternList.appendChild(li);
        patternCard.classList = "pattern-card";
        
    }
}

const init = () => {
    patternAddBtn.addEventListener("click", addPattern);
}

if(patternList){
    init();
}