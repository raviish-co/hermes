export function getCurrentLocalDateTime(): string {
    const currentDate = getCurrentDate();
    return currentDate.toISOString().slice(0, 16);
}

function getCurrentDate(): Date {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    return currentDate;
}
