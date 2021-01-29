// User
const HOME = "/";
const LOGIN = "/login";
const USER_ID = "/:id";

// Google
const GOOGLE = "/auth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";

// api
const API = "/api";
const ADD_MEMO = "/:id/memo"

const routes = {
    home: HOME,
    login: LOGIN,
    userId: USER_ID,
    google: GOOGLE,
    googleCallback: GOOGLE_CALLBACK,
    api: API,
    addMemo: ADD_MEMO
};

export default routes;