export type User = {
    id: number,
    first_name: string,
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

export type Notification = {
    id: number,

}

export type Message = {
    id: number,

}

export type Post = {
    id: number,

}


export type Comment = {
    id: number,
}