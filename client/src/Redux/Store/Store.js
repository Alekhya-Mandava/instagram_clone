import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import thunk from "redux-thunk";
import { AuthReducer } from "../Auth/Reducer";
import { commentReducer } from "../Comment/Reducer";
import { postReducer } from "../Post/Reducer";
import { StoryReducer } from "../Story/Reducer";
import { userReducer } from "../User/Reducer";
import reelReducer from "../Reel/Reducer";


const rootReducers=combineReducers({

    post:postReducer,
    comments:commentReducer,
    user:userReducer,
    story:StoryReducer,
    auth:AuthReducer,
    reel:reelReducer,

});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))