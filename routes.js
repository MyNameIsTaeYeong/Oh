// Global
const HOME = "/";
const LOGIN = "/login";
const GOOGLE = "/auth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";

// User
const USER = "/user";
const USER_ID = "/:id";


// api
const API = "/api";
const ADD_MEMO = "/:id/addmemo/:day"
const VIEW_MEMO = "/:id/viewmemo/:day"
const DELETE_MEMO = "/:id/deletememo/:day/:idx";

// day

const dateObj = new Date();
const year = dateObj.getFullYear();
const month = dateObj.getMonth() < 9 ? '0' + (dateObj.getMonth()+1) : dateObj.getMonth()+1;
const date = dateObj.getDate() < 9 ? '0' + dateObj.getDate() : dateObj.getDate();
let DAY = `${year}${month}${date}`;

const routes = {
    home: HOME,
    login: LOGIN,
    user: USER,
    google: GOOGLE,
    googleCallback: GOOGLE_CALLBACK,
    api: API,
    addMemo: ADD_MEMO,
    userId: USER_ID,
    viewMemo: VIEW_MEMO,
    day:DAY,
    deleteMemo: DELETE_MEMO
};

export default routes;