import type { Restaurant } from "../types/Restaurant";

export const baseURL = "http://localhost:3000";

const apiClient = {
    get: function (url: string) {
        return Promise.resolve({ data: null as Restaurant[] | Restaurant | null });
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