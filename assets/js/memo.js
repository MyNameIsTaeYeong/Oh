import axios from "axios";
import routes from "../../routes";

const memo = document.querySelector(".viewer__content--memo");
const memoForm = document.getElementById("js-memoForm");


// Fake UI (like realTime)
const addMemo = (memoContent) => {
    const memoList = document.getElementById("js-memoList");
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    delBtn.classList.add("far");
    delBtn.classList.add("fa-trash-alt");
    span.innerText = memoContent;
    li.appendChild(delBtn);
    li.appendChild(span);
    memoList.appendChild(li);

}

const sendMemo = async (memoContent) => {
    const address = window.location.href;
    const splitedAddress = address.split('/');

    // 유저 id 뒤에 '#'문자 제거 
    let userId = splitedAddress[splitedAddress.length - 2];
    let memoDay = splitedAddress[splitedAddress.length - 1];
    memoDay = memoDay.substring(0, memoDay.length - 1);
    
    const response = await axios({
        url: `/api/${userId}/addmemo/${memoDay}`,
        method: "POST",
        data:{
            memoContent
        }
    });
  
    if(response.status === 200){
        addMemo(memoContent);
    }
}

const handleSubmit = (event) => {
    event.preventDefault();
    const memoInput = memoForm.querySelector("input");
    const memoContent = memoInput.value;
    sendMemo(memoContent);
    memoInput.value = "";
}

const init = () => {
    memoForm.addEventListener("submit", handleSubmit);
}

if(memo){
    init();
    console.log(routes.day);
}