// Global
const HOME = "/";
const LOGIN = "/login";
const GOOGLE = "/auth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";

// User
const USER = "/user";
const DAY = "/:id/:day";


// api
const API = "/api";
const ADD_MEMO = "/:id/memo/:day"

const routes = {
    home: HOME,
    login: LOGIN,
    user: USER,
    google: GOOGLE,
    googleCallback: GOOGLE_CALLBACK,
    api: API,
    addMemo: ADD_MEMO,
    day: DAY
};

export default routes;