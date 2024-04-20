import { ADDAUTHENTICATE, ADDNEWFRIENDS, ADDNEWMESSAGES, ADDNEWPOST, ADDSUGGESTFRIENDS, APPENDMULTIPLEPOSTS, APPENDNEWMESSAGE, APPENDNEWPOST, GETPOSTS, LOGOUT, MASKMESSAGESEEN, TOGGLELIGHTMODE } from "../actions/types";

const initialState: any = {
    auth: null,
    isDarkMode: localStorage.getItem("light_mode") === "dark" ?? false,
    posts: [],
    suggestions: [],
    messages: [],
    test: "redux is working",
    friends: [],
    page: 1

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
            console.log(action.payload);
            return { ...state, posts: [action.payload, ...state.posts] };
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
            return { ...state, auth: null, messages: [], friends: [], suggests: [] }
        case MASKMESSAGESEEN:
            return {
                ...state, friends: state.friends.map((item: any) => {
                    if (item.id == action.payload)
                        return { ...item, msgs_not_seen: 0 }
                    return item
                })
            }

        default:
            return state;
    }
}

export default mainReducer;
