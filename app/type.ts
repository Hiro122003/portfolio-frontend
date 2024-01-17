export type UserType = {
    id: number;
    username: string;
    email: string;
    password: string;
    posts:PostType[];
    profile: ProfileType;
}

export type PostType = {
    id: number;
    content: string;
    createdAt: string;
    authorId: number;
    author: UserType;
}

export type ProfileType = {
    id: number;
    bio: string;
    profileImageUrl: string ;
    userId: number;
    user: UserType
}