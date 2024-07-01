import { PurposeService } from "~/lib/backend/application/purpose_service";

const srv = new PurposeService();

export const usePurposeService = () => srv;
