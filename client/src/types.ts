export interface User {
    id: bigint,
    first_name: never,
    last_name: string,
    email: string,
    gender: string,
    birthday: string,
    picture: string,
    followers: number,
    following: number,
    posts: number,
    FollowStatus: string,
    status: string,
    description: string | null,
    phone: string | null,
    cover: string | null,


}

export interface Notification {
    id: bigint,

}

export interface Message {
    id: bigint,

}

export interface Post {
    id: bigint,

}


export interface Comment {
    id: bigint,
}