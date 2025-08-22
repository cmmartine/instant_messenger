import { THEMES, THEMEICONS } from "../constants_ts/THEMES";

export interface ChatroomInfo {
    id: number;
    active_status: string;
    user_ids: number[];
}

export interface ConnectedChatroom {
    info: ChatroomInfo,
    connection: any
}

export interface CurrentUserInfo {
    id: number;
    username: string;
    chatrooms: ChatroomInfo[];
}

export interface BuddyUserInfo {
    id: number;
    username: string;
}

export type Themes = typeof THEMES[keyof typeof THEMES]

export type ThemeIcons = typeof THEMEICONS[keyof typeof THEMES]