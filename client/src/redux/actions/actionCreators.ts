import {
    ADDAUTHENTICATE,
    ADDNEWFRIENDS,
    ADDNEWMESSAGES,
    ADDNEWPOST,
    ADDSUGGESTFRIENDS,
    APPENDMULTIPLEPOSTS,
    APPENDNEWMESSAGE,
    APPENDNEWPOST,
    MASKMESSAGESEEN,
    TOGGLELIGHTMODE
} from "./types"


export const Add_authenticate = (data: any) => {
    return {
        type: ADDAUTHENTICATE,
        payload: data
    }
}

export const toggleLightMode = (data: any) => {
    return {
        type: TOGGLELIGHTMODE,
        payload: data
    }
}

export const addNewPost = (data: any) => {
    return {
        type: ADDNEWPOST,
        payload: data
    }
}

export const appendNewPost = (data: any) => {
    return {
        type: APPENDNEWPOST,
        payload: data
    }
}

export const appendMultiplePosts = (data: any) => {
    return {
        type: APPENDMULTIPLEPOSTS,
        payload: data
    }
}

export const addSuggestFriend = (data: any) => {
    return {
        type: ADDSUGGESTFRIENDS,
        payload: data
    }
}

export const addNewMessages = (data: any) => {
    return {
        type: ADDNEWMESSAGES,
        payload: data
    }
}

export const addNewFriends = (data: any) => {
    return {
        type: ADDNEWFRIENDS,
        payload: data
    }
}
export const appendNewMessage = (data: any) => {
    return {
        type: APPENDNEWMESSAGE,
        payload: data
    }
}
export const markMessagesSeen = (data: any) => {
    return {
        type: MASKMESSAGESEEN,
        payload: data
    }
}

