const calendarHead = document.querySelector(".calendar__head");
const calendarHeadTitle = document.querySelector(".calendar__head-title");
const calendarBody = document.querySelector(".calendar__body");
const leapYearMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
const notLeapYearMonth = [31,28,31,30,31,30,31,31,30,31,30,31];


function paintCalendar(){
    let months;
    let day = 1;
    const today = new Date();

    // 윤년 체크
    if(today.getFullYear() % 4 === 0){
        months = leapYearMonth;
    } else {
        months = notLeapYearMonth;
    }

    // 첫째날의 요일 (첫째주에 무슨요일부터 1일인지를 표현하기 위함)
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    calendarHeadTitle.innerHTML = today.getMonth()+1+"월";

    for(let i=0; i<6; i++){
        const tr = document.createElement("tr");
        console.log(tr);
        for(let j=0; j<7; j++){
            const td = document.createElement("td");
            // 첫째주이면서, 1일 이전의 요일은 빈칸 
            if(i===0 && j<firstDay){
                tr.appendChild(td);
            } else {
                td.textContent = day;
                tr.appendChild(td);
                day++;
                
                // 그 달의 말일인 경우 반복문 탈출
                if(day > months[today.getMonth()])
                    break;
            }
        }
        calendarBody.appendChild(tr);
        if(day > months[today.getMonth()])
            break;
    }
}

function init(){
    paintCalendar();
}


init();