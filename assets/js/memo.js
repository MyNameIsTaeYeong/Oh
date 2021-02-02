import axios from "axios";
import routes from "../../routes";

const memo = document.querySelector(".viewer__content--memo");
const memoForm = document.getElementById("js-memoForm");
let userId;

export const deleteMemo = async (event) => {
    const response = await axios({
        url: `/api/${userId}/deletememo/${routes.day}/${event.target.id}`,
        method: "POST"
    });

    if(response.status === 200){
        const { data: { memos } } = response
        eraseMemo();
        if(memos !== null){
            paintMemo(memos);
        }
    }   
}

export const eraseMemo = () => {
    const memoList = document.getElementById("js-memoList");
    while(memoList.lastElementChild){
        memoList.removeChild(memoList.lastElementChild);
    }
}



// Fake UI (like realTime)
const addMemo = (memoContent, btnId) => {
    const memoList = document.getElementById("js-memoList");
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.id = btnId;
    delBtn.addEventListener("click", deleteMemo);
    const span = document.createElement("span");
    delBtn.classList.add("far");
    delBtn.classList.add("fa-trash-alt");
    span.innerText = memoContent;
    li.appendChild(delBtn);
    li.appendChild(span);
    memoList.appendChild(li);

}

const sendMemo = async (memoContent) => {
    
    const response = await axios({
        url: `/api/${userId}/addmemo/${routes.day}`,
        method: "POST",
        data:{
            memoContent
        }
    });
  
    if(response.status === 200){
        addMemo(memoContent, response.data.btnId);
    }
}

const paintMemo = (memos) => {
    const memoList = document.getElementById("js-memoList");
    for(let i=0; i<memos.content.length; i++){
        const li = document.createElement("li");
        const delBtn = document.createElement("button");
        delBtn.addEventListener("click", deleteMemo);
        const span = document.createElement("span");
        delBtn.id = i;
        delBtn.classList.add("far");
        delBtn.classList.add("fa-trash-alt");
        span.innerText = memos.content[i];
        li.appendChild(delBtn);
        li.appendChild(span);
        memoList.appendChild(li);
    }
}


export const getMemosFromDB = async () => {
    const response = await axios({
        url: `/api/${userId}/viewmemo/${routes.day}`,
        method: "POST"
    });

    if(response.status === 200){
        const { data: { memos } } = response
        if(memos !== null){
            paintMemo(memos);
        }
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
    const address = window.location.href;
    const splitedAddress = address.split('/');
    userId = splitedAddress[splitedAddress.length - 1];
    
    // 유저 id 뒤에 '#'문자 제거 
    userId = userId.substring(0, userId.length - 1);

    memoForm.addEventListener("submit", handleSubmit);
    
}

if(memo){
    init();
}