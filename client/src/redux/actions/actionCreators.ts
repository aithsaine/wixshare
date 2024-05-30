import { Post, User } from "../../types"
import {
    ADDAUTHDESCRIPTION,
    ADDAUTHENTICATE,
    ADDCOVERIMAGE,
    ADDNEWFRIENDS,
    ADDNEWMESSAGES,
    ADDNEWPOST,
    ADDNOTIFICATIONS,
    ADDSUGGESTFRIENDS,
    APPENDMULTIPLEPOSTS,
    APPENDNEWFRIEND,
    APPENDNEWMESSAGE,
    APPENDNEWPOST,
    APPENDPOSTS,
    GETPOSTS,
    INSERTNOTIFICATION,
    LOGOUT,
    MASKMESSAGESEEN,
    SETSELECTEDUSERID,
    TOGGLELIGHTMODE,
    UPDATEPROFILE
} from "./types"


export const Add_authenticate = (data: User) => {
    return {
        type: ADDAUTHENTICATE,
        payload: data
    }
}

export const toggleLightMode = (data: boolean) => {
    return {
        type: TOGGLELIGHTMODE,
        payload: data
    }
}

export const addNewPost = (data: Post) => {
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
export const logOut = () => {
    return {
        type: LOGOUT
    }
}


export const getPosts = (data: any) => {
    return {
        type: GETPOSTS,
        payload: data

    }
}
export const appendPosts = (data: any) => {
    return {
        type: APPENDPOSTS,
        payload: data
    }
}
export const setUserId = (data: any) => {
    return {
        type: SETSELECTEDUSERID,
        payload: data
    }
}

export const insertNotification = (data: any) => {
    return {
        type: INSERTNOTIFICATION,
        payload: data
    }
}

export const addNotifications = (data: any) => {
    return {
        type: ADDNOTIFICATIONS,
        payload: data
    }
}

export const updateProfile = (data: any) => {
    return {
        type: UPDATEPROFILE,
        payload: data
    }
}

export const addAuthDescription = (data: String) => {
    return {
        type: ADDAUTHDESCRIPTION,
        payload: data
    }
}

export const appendNewFriend = (data: User) => {
    return {
        type: APPENDNEWFRIEND
        , payload: data
    }
}

export const addCoverImage = (data: string) => {
    return {
        type: ADDCOVERIMAGE,
        payload: data
    }

}