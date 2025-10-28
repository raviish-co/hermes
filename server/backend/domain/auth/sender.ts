
export interface Sender {
    send(to: string, message: string): Promise<void>;
}
