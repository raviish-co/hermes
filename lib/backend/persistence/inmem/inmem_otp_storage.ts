import type { OtpStorage } from "../../domain/auth/otp_storage";



export class InmemOtpStorage implements OtpStorage {
    #storage: Record<string, string> = {};

    get(username: string): string {
        return this.#storage[username];
    }

    save(username: string, otp: string): void {
        this.#storage[username] = otp;
    }
}
