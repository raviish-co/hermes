import type { DashboardModel } from "../models/dashboard";

const auth = useAuth();

export class DashboardService {
    async getStatistics(): Promise<DashboardModel> {
        const result = await $fetch("/api/dashboard", {
            method: "get",
            headers: this.headers,
        });
        return result;
    }

    get headers() {
        return {
            "X-Access-Token": auth.getToken(),
        };
    }
}
