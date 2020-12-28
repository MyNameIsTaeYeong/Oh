const calendarHead = document.querySelector(".calendar__head");
const calendarHeadTitle = document.querySelector(".calendar__head-title");
const calendarBody = document.querySelector(".calendar__body");

const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

const leapYearMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
const notLeapYearMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

// 그리고 싶은 달의 첫째날
let firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

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
                td.id = `${firstDate.getFullYear()}${firstDate.getMonth()+1}${day<10?'0'+day:day}`;
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

function init(){
    paintCalendar();
    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);
}


init();