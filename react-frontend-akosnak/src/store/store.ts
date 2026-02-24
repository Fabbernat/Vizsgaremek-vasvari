import type { Pizza } from "../types/Pizza";

export const baseURL = "http://localhost:3000/api";

const apiClient = {
    get: function (url: string) {
        return Promise.resolve({ data: null as Pizza[] | Pizza | null });
    },
    post: function (url: string, data: any) {
        return Promise.resolve();
    },
    put: function (url: string, data: any) {
        return Promise.resolve();
    },
    delete: function (url: string) {
        return Promise.resolve();
    }
}

export default apiClient;