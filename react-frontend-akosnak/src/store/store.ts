import type { Restaurant } from "../types/Restaurant";

export const baseURL = "http://localhost:4000";

const apiClient = {
    get: function (_url: string) {
        return Promise.resolve({ data: null as Restaurant[] | Restaurant | null });
    },
    post: function (_url: string, _data: any) {
        return Promise.resolve();
    },
    put: function (_url: string, _data: any) {
        return Promise.resolve();
    },
    delete: function (_url: string) {
        return Promise.resolve();
    }
}

export default apiClient;