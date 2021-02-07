let GLOBLA_USER_ID;
let DAY;

const init = () => {
    // userId
    const address = window.location.href;
    const splitedAddress = address.split('/');
    GLOBLA_USER_ID = splitedAddress[splitedAddress.length - 1];
    // 유저 id 뒤에 '#'문자 제거 
    GLOBLA_USER_ID = GLOBLA_USER_ID.substring(0, GLOBLA_USER_ID.length - 1);

    // day
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() < 9 ? '0' + (dateObj.getMonth()+1) : dateObj.getMonth()+1;
    const date = dateObj.getDate() < 9 ? '0' + dateObj.getDate() : dateObj.getDate();
    DAY = `${year}${month}${date}`;
}

init();

const globals = {
    userId: GLOBLA_USER_ID,
    day: DAY
}

export default globals;