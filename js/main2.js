const calendarHead = document.querySelector(".calendar__head");
const calendarHeadTitle = document.querySelector(".calendar__head-title");
const calendarBody = document.querySelector(".calendar__body");
const toDoForm = document.querySelector(".js-toDoForm");
const toDoList = document.querySelector(".js-toDoList");
const toDoInput = toDoForm.querySelector("input");

const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

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

// 클릭이 되어있는지 저장하는 변수.
let clicked = false;

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
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌";
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
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = '';
}

function init(){
    console.log("hello");
    paintCalendar();
    viewDay();
    toDoForm.addEventListener("submit", handleSubmit);
    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);
    
}


init();

