import { ADDAUTHDESCRIPTION, ADDAUTHENTICATE, ADDCOVERIMAGE, ADDNEWFRIENDS, ADDNEWMESSAGES, ADDNEWPOST, ADDNOTIFICATIONS, ADDSUGGESTFRIENDS, APPENDMULTIPLEPOSTS, APPENDNEWFRIEND, APPENDNEWMESSAGE, APPENDNEWPOST, DELETEPOST, GETPOSTS, INSERTNOTIFICATION, LOGOUT, MASKMESSAGESEEN, SETSELECTEDUSERID, TOGGLELIGHTMODE, UPDATEPROFILE } from "../actions/types";
import { User, Post, Message } from "../../types"
interface StatesTypes {
    auth: User | null,
    isDarkMode: boolean,
    posts: Post[],
    newPost: Post | null,
    suggestions: User[],
    messages: Message[],
    friends: User[],
    page: number,
    notifications: Notification[],
    selectedUserId: number | null




}
const initialState: StatesTypes = {
    auth: null,
    isDarkMode: localStorage.getItem("light_mode") === "dark" ?? false,
    posts: [],
    newPost: null,
    suggestions: [],
    messages: [],
    friends: [],
    notifications: [],
    page: 1,
    selectedUserId: null,//for chat component

}

function mainReducer(state = initialState, action: any) {
    switch (action.type) {
        case ADDAUTHENTICATE:
            return { ...state, auth: action.payload }
        case TOGGLELIGHTMODE:
            const newMode = !state.isDarkMode ? "dark" : "light";
            localStorage.setItem("light_mode", newMode);
            return { ...state, isDarkMode: !state.isDarkMode };
        case ADDNEWPOST:
            return { ...state, posts: [...action.payload] };
        case APPENDNEWPOST:
            return { ...state, newPost: action.payload };
        case APPENDMULTIPLEPOSTS:
            if (action.payload[action.payload.length - 1].id !== state.posts[state.posts.length - 1]?.id)
                return { ...state, posts: [...state.posts, ...action.payload], page: state.page + 1 };
            return state;
        case ADDSUGGESTFRIENDS:
            return { ...state, suggestions: action.payload }
        case ADDNEWMESSAGES:

            return { ...state, messages: [...action.payload] }
        case ADDNEWFRIENDS:
            return { ...state, friends: [...action.payload] }
        case APPENDNEWMESSAGE:
            if (action.payload !== state.messages[state.messages.length - 1])
                return { ...state, messages: [...state.messages, action.payload] }
            return state
        case LOGOUT:
            return {
                auth: null,
                isDarkMode: localStorage.getItem("light_mode") === "dark" ?? false,
                posts: [],
                newPost: null,
                suggestions: [],
                messages: [],
                friends: [],
                notifications: [],
                page: 1,
                selectedUserId: null
            }
        case MASKMESSAGESEEN:
            return {
                ...state, friends: state.friends.map((item: any) => {
                    if (item.id == action.payload)
                        return { ...item, msgs_not_seen: 0 }
                    return item
                })
            }
        case SETSELECTEDUSERID:
            return { ...state, selectedUserId: action.payload }

        case INSERTNOTIFICATION:
            if (action.payload !== state.notifications[0])
                return { ...state, notifications: [action.payload, ...state.notifications] }
            return state;
        case ADDNOTIFICATIONS:
            return { ...state, notifications: action.payload }
        case UPDATEPROFILE:
            return { ...state, auth: action.payload }
        case ADDAUTHDESCRIPTION:
            return { ...state, auth: { ...state.auth, description: action.payload } }
        case APPENDNEWFRIEND:
            if (!state.friends.find((item: any) => item.id == action.payload.id)) {

                return { ...state, friends: [...state.friends, action.payload] }
            }
            return { ...state }

        case ADDCOVERIMAGE:
            return { ...state, auth: { ...state.auth, cover: action.payload } }
        case DELETEPOST:
            return { ...state, posts: [state.posts.filter((post: Post) => post.id !== action.payload.id)] }
        default:
            return state;
    }
}

export default mainReducer;
