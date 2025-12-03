import type { DashboardModel } from "../models/dashboard";
import { useAuth } from "@app/composables/useAuth";

const auth = useAuth();

export class DashboardService {
    async getStatistics(): Promise<DashboardModel> {
        const result = await $fetch("/api/dashboard", {
            method: "get",
            headers: await this.#headers(),
        });
        return result;
    }

    async #headers() {
        return {
            "X-Access-Token": await auth.getAccessToken(),
        };
    }
}
