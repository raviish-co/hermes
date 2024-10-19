export interface OtpStorage {
    get(username: string): string;
    save(username: string, otp: string): void;
}
