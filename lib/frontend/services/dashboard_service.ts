import type { DashboardModel } from "../models/dashboard_model";

export class DashboardService {
    async getStatistics(): Promise<DashboardModel> {
        const result = await $fetch("/api/dashboard", { method: "get" });
        return result;
    }
}
