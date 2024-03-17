export function initializeQuantities(length: number, value: number = 1) {
    const quantities: number[] = [];

    for (let i = 0; i <= length; i++) {
        quantities[i] = value;
    }

    return quantities;
}
