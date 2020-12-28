const mainCards=document.querySelector('.main-screen');


function handleClick(event){
    const icon = event.target;
    const btn = icon.parentNode;
    if(icon.classList.contains('changeColor')){
        icon.classList.remove('changeColor');
    }else{
        icon.classList.add('changeColor');
    }

}

mainCards.addEventListener('click', handleClick);

