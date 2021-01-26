const calendarHead = document.querySelector(".calendar__head");
const calendarHeadTitle = document.querySelector(".calendar__head-title");
const calendarBody = document.querySelector(".calendar__body");
const toDoForm = document.querySelector(".js-toDoForm");
const toDoList = document.querySelector(".js-toDoList");


const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const prevPageBtn = document.getElementById("js-prevPageBtn");
const nextPageBtn = document.getElementById("js-nextPageBtn");
const patternList = document.getElementById("js-patternList");
const patternAddBtn = document.getElementById("pattern--add-Btn");

const viewerWrap = document.querySelector(".viewer--wrap");

const leapYearMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
const notLeapYearMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

// 클릭이 될 수 있는 모든 일의 td배열 
let clickedDate;

// 클릭된 td의 id
let tdId;

// 그리고 싶은 달의 첫째날
let firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

// 클릭된 요일을 표시하는 클래스
const VIEW_DAY = "view-day";

// 할 일을 저장하는 로컬스토리지의 이름. 이 뒤에는 td의 아이디가 붙는다. ex) toDos20200101 (2020년 1월 1일의 todos)
const TODOS_LS = "toDos";

let distance = 0;

let toDos = [];

function paintCalendar(){
    let months;
    let day = 1;

    // 윤년 체크
    if(firstDate.getFullYear() % 4 === 0){
        months = leapYearMonth;
    } else {
        months = notLeapYearMonth;
    }

    // 첫째날의 요일 (첫째주에 무슨요일부터 1일인지를 표현하기 위함)
    const firstDay = firstDate.getDay();
    calendarHeadTitle.innerHTML = firstDate.getFullYear()+"년 "+(firstDate.getMonth()+1)+"월";

    for(let i=0; i<6; i++){
        const tr = document.createElement("tr");
        tr.className = 'week';
        
        for(let j=0; j<7; j++){
            const td = document.createElement("td");
            
            // 첫째주이면서, 1일 이전의 요일은 빈칸 
            if(i===0 && j<firstDay){
                tr.appendChild(td);
            } else {
                
                // 1월 1일을 0101로 표시하기 위해 삼항연산자를 사용함.
                td.id = `${firstDate.getFullYear()}`+`${firstDate.getMonth()<9 ? '0'+(firstDate.getMonth()+1) : firstDate.getMonth()+1}`+`${day<10 ? '0'+day : day}`;
                td.textContent = day;
                tr.appendChild(td);
                day++;

                // 그 달의 말일인 경우 반복문 탈출
                if(day > months[firstDate.getMonth()])
                    break;
            }
        }
        calendarBody.appendChild(tr);
        if(day > months[firstDate.getMonth()])
            break;
    }

    clickedDate = document.querySelectorAll(".week > td");
    
    for(let i=0; i<clickedDate.length; i++){
        if(clickedDate[i].id !== ''){
            clickedDate[i].addEventListener('click', viewDay);
        } 
    }
}


function deleteCalendar(){
    const tds = document.querySelectorAll(".week > td");
    tds.forEach(function(e){
        e.remove();
    });

    const trs = document.querySelectorAll(".week");
    trs.forEach(function(e){
        e.remove();
    });

    tdId = undefined;
}

function prev(){
    cleanToDoList();
    deleteCalendar();

    if(firstDate.getMonth() === 0){
        firstDate = new Date(firstDate.getFullYear() -1 , 11, 1);
    }else{
        firstDate = new Date(firstDate.getFullYear(), firstDate.getMonth()-1, 1);
    }
    
    paintCalendar();

}

function next(){
    cleanToDoList();
    deleteCalendar();

    if(firstDate.getMonth() === 11){
        firstDate = new Date(firstDate.getFullYear()+1, 0, 1);
    } else {
        firstDate = new Date(firstDate.getFullYear(), firstDate.getMonth()+1, 1);
    }

    paintCalendar();
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    // Object를 String으로 변환
    localStorage.setItem(TODOS_LS+tdId, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    delBtn.classList.add("far");
    delBtn.classList.add("fa-trash-alt");
    const newId = toDos.length + 1;
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function cleanToDoList(){
    while(toDoList.hasChildNodes()){
        toDoList.removeChild(toDoList.lastChild);
    }
}

function viewDay(){
    let td;
    
    // 이전에 클릭된 표시를 지우는 부분
    if(tdId !== undefined){
        td = document.getElementById(tdId);
        td.classList.remove(VIEW_DAY);
    }

    // 처음 앱을 키면 오늘의 날짜를 표시하기 위함.
    if(this.id === undefined){
        tdId = `${new Date().getFullYear()}`+`${firstDate.getMonth() < 9 ? '0'+(firstDate.getMonth()+1) : firstDate.getMonth()+1}`+`${new Date().getDate()<10?'0'+new Date().getDate():new Date().getDate()}`;
    } 
    // 클릭된 td의 아이디를 얻는 부분.
    else{
        tdId = this.id;
    }

    // 클릭된 날짜를 표시하는 부분.
    td = document.getElementById(tdId);
    td.classList.add(VIEW_DAY);

    toDos = [];
    
    cleanToDoList();

    const loadedToDos = localStorage.getItem(TODOS_LS+tdId);
    
    if(loadedToDos !== null){
        // String을 -> Object로 변환
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function handleSubmit(event){
    const toDoInput = toDoForm.querySelector("input");
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = '';
}

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
    paintCalendar();
    viewDay();
    toDoForm.addEventListener("submit", handleSubmit);
    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);
    nextPageBtn.addEventListener("click", nextPage);
    prevPageBtn.addEventListener("click", prevPage);
    patternAddBtn.addEventListener("click", addPattern);
    prevPageBtn.style.visibility = 'hidden';
}

if(calendarHead){
    init();
}


