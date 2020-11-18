const mainCards=document.querySelector('.main-screen');


function handleClick(event){
    const icon = event.target;
    const btn = icon.parentNode;
    if(icon.classList.contains('changeColor')){
        // icon.classList.remove('far');
        // icon.classList.add('fas');
        icon.classList.remove('changeColor');
    }else{
        // icon.classList.remove('fas');
        icon.classList.add('changeColor');
        // icon.classList.add('far');
    }

}

mainCards.addEventListener('click', handleClick);

