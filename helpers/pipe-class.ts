export class MultiplyByThreePipe {
    async handle(value: number, next: (value: number) => Promise<number>): Promise<number> {
        return next(value * 3);  // Multiply by 3 and then pass to the next pipe
    }
}