export const addOnePipe: (value: number, next: (value: number) => Promise<number>) => Promise<number> = async (value, next) => {
    return next(value + 1);  // Add 1 and then pass to the next pipe
};

export const multiplyByTwoPipe: (value: number, next: (value: number) => Promise<number>) => Promise<number> = async (value, next) => {
    return next(value * 2);  // Multiply by 2 and then pass to the next pipe
};