import { THEMES, THEMEICONS } from "../constants_ts/THEMES";

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

export type Themes = typeof THEMES[keyof typeof THEMES]

export type ThemeIcons = typeof THEMEICONS[keyof typeof THEMES]