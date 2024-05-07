import { ID } from "./id";

function convertToId(id: string): ID {
    return ID.fromString(id);
}

export function convertToIds(ids: string[]): ID[] {
    return ids.map(convertToId);
}
