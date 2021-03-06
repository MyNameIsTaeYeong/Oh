import globals from "./globals";
import { eraseMemo, getMemosFromDB } from "./memo";


const calendar = document.querySelector(".calendar");
const calendarHeadTitle = document.querySelector(".calendar__head-title");
const calendarBody = document.querySelector(".calendar__body");

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
    deleteCalendar();

    if(firstDate.getMonth() === 0){
        firstDate = new Date(firstDate.getFullYear() -1 , 11, 1);
    }else{
        firstDate = new Date(firstDate.getFullYear(), firstDate.getMonth()-1, 1);
    }
    
    paintCalendar();

}

function next(){
    deleteCalendar();

    if(firstDate.getMonth() === 11){
        firstDate = new Date(firstDate.getFullYear()+1, 0, 1);
    } else {
        firstDate = new Date(firstDate.getFullYear(), firstDate.getMonth()+1, 1);
    }

    paintCalendar();
}


function viewDay(){
    let td;
    
    // 이전에 클릭된 표시를 지우는 부분
    if(tdId !== undefined){
        td = document.getElementById(tdId);
        td.classList.remove(VIEW_DAY);
    }

    // 처음 앱을 키면 오늘의 날짜를 표시하기 위함.
    if(this === undefined){
        tdId = `${new Date().getFullYear()}`+`${firstDate.getMonth() < 9 ? '0'+(firstDate.getMonth()+1) : firstDate.getMonth()+1}`+`${new Date().getDate()<10?'0'+new Date().getDate():new Date().getDate()}`;
    } 
    // 클릭된 td의 아이디를 얻는 부분.
    else{
        tdId = this.id;
    }

    // 클릭된 날짜를 표시하는 부분.
    td = document.getElementById(tdId);
    td.classList.add(VIEW_DAY);

    
    if(this !== undefined){
        globals.day = tdId;
    
        // 이전 메모 지우기
        eraseMemo();
    
        // 클릭된 날짜의 메모 디비에서 얻어오기(비동기방식)
        getMemosFromDB();
    }
    
}

function init(){
    paintCalendar();
    viewDay();
    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);
}


if(calendar){
    init();
}