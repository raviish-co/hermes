export interface OtpStorage {
    get(username: string): string | undefined;
    save(username: string, otp: string): void;
    remove(username: string): void;
}
