import type { DashboardModel } from "../models/dashboard";

export class DashboardService {
    async getStatistics(): Promise<DashboardModel> {
        const result = await $fetch("/api/dashboard", { method: "get" });
        return result;
    }
}
