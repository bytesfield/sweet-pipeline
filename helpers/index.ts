export const addOnePipe: (value: number) => Promise<number> = async (value) => {
    return value + 1;  // Add 1 and return the result
};

export const multiplyByTwoPipe: (value: number) => Promise<number> = async (value) => {
    return value * 2;  // Multiply by 2 and return the result
};

export class MultiplyByThreePipe {
    async handle(value: number): Promise<number> {
        return value * 3;  // Multiply by 3 and return the result
    }
}
