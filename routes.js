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
const ADD_MEMO = "/:id/addmemo"
const VIEW_MEMO = "/:id/viewmemo"

// day
let DAY = "";

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
    day:DAY
};

export default routes;