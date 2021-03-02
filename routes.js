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
const ADD_PATTERN = "/:id/createpattern";
const RECORD_PATTERN = "/:id/recordpattern/:day";

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
    deleteMemo: DELETE_MEMO,
    addPattern: ADD_PATTERN,
    recordPattern: RECORD_PATTERN
};

export default routes;