// export const BASE_URL = "http://localhost:3000";
// export const ROUTES = {
//   HOME: "/",
//   DASHBOARD: "/dashboard",
//   LOGIN:'/login',
//   USER:'/api/user'
// };

// constants/api.js

export const API = {
  BASE_URL: "http://localhost:3000",

  USER: {
    REGISTER: "/api/user/register",
    LOGIN: "/api/user/login",
    PROFILE: "/api/user/profile",
    LOGOUT: "/api/user/logout",
  },
  CHAT: {
    ALLCHATS: "/api/all-Chats",
    CHATS: "/api/chats",
    GENERATE_TITLE: "/api/generate/title",
    DELETE_CHATE: "/api/chats",
    TOGGLEPIN: "/api/chats",
    RENAMECHAT: "/api/chats",
    SEARCHCHAT: "/api/chats/search",
    TEMPORARY_CHAT: "?temporary-chat=true",
  },

  LOCAL: {
    LOGIN: "/login",
    HOME: "/",
  },
};
