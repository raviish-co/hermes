export function getCurrentLocalDateTime(): string {
    const currentDate = getCurrentDate();
    return currentDate.toISOString().slice(0, 16);
}

function getCurrentDate(): Date {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    return currentDate;
}

export function getReturnDate(): string {
    const currentDate = getCurrentDate();
    return addDays(currentDate, 4).toISOString().slice(0, 16);
}

function addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}
