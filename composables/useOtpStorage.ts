import { InmemOtpStorage } from "~/lib/backend/persistence/inmem/inmem_otp_storage";

const storage = new InmemOtpStorage()

export const useOtpStorage = () => storage;
