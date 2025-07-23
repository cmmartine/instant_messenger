export interface ChatroomInfo {
    id: number;
    active_status: string;
    user_ids: number[];
}

export interface CurrentUserInfo {
    id: number;
    username: string;
    chatrooms: ChatroomInfo[];
}