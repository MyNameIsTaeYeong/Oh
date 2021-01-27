const home = document.querySelector(".home");

// const toDoForm = document.querySelector(".js-toDoForm");
// const toDoList = document.querySelector(".js-toDoList");






// function deleteToDo(event){
//     const btn = event.target;
//     const li = btn.parentNode;
//     toDoList.removeChild(li);
//     const cleanToDos = toDos.filter(function(toDo){
//         return toDo.id !== parseInt(li.id);
//     });
//     toDos = cleanToDos;
//     saveToDos();
// }

// function saveToDos(){
//     // Object를 String으로 변환
//     localStorage.setItem(TODOS_LS+tdId, JSON.stringify(toDos));
// }

// function paintToDo(text){
//     const li = document.createElement("li");
//     const delBtn = document.createElement("button");
//     const span = document.createElement("span");
//     delBtn.classList.add("far");
//     delBtn.classList.add("fa-trash-alt");
//     const newId = toDos.length + 1;
//     delBtn.addEventListener("click", deleteToDo);
//     span.innerText = text;
//     li.appendChild(delBtn);
//     li.appendChild(span);
//     li.id = newId;
//     toDoList.appendChild(li);
//     const toDoObj = {
//         text: text,
//         id: newId
//     };
//     toDos.push(toDoObj);
//     saveToDos();
// }

// function cleanToDoList(){
//     while(toDoList.hasChildNodes()){
//         toDoList.removeChild(toDoList.lastChild);
//     }
// }



// function handleSubmit(event){
//     const toDoInput = toDoForm.querySelector("input");
//     event.preventDefault();
//     const currentValue = toDoInput.value;
//     paintToDo(currentValue);
//     toDoInput.value = '';
// }




function init(){
    
    //toDoForm.addEventListener("submit", handleSubmit);
  
}

if(home){
    init();
}


