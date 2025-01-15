import { Pipeline } from '../pipeline';
import {addOnePipe, MultiplyByThreePipe, multiplyByTwoPipe} from "../helpers";

describe('Pipeline Class Tests', () => {
    let pipeline: Pipeline<number>;

    beforeEach(() => {
        pipeline = new Pipeline<number>();
    });

    test('should pass a value through a single pipe function', async () => {
        const result = await pipeline
            .send(5)
            .through([addOnePipe])
            .then(async (value) => value);

        expect(result).toBe(6);  // 5 + 1 = 6
    });

    test('should pass a value through multiple pipe functions', async () => {
        const result = await pipeline
            .send(5)
            .through([addOnePipe, multiplyByTwoPipe])
            .then(async (value) => value);

        expect(result).toBe(12);  // (5 + 1) * 2 = 12
    });

    test('should pass a value through a mix of function and object pipes', async () => {
        const result = await pipeline
            .send(5)
            .through([addOnePipe, new MultiplyByThreePipe()])
            .then(async (value) => value);

        expect(result).toBe(18);  // (5 + 1) * 3 = 18
    });

    test('should handle no pipes correctly', async () => {
        const result = await pipeline
            .send(10)
            .through([])
            .then(async (value) => value);

        expect(result).toBe(10);  // No pipes, return the original value
    });

    test('should handle a pipe that is an object with a handle method', async () => {
        const result = await pipeline
            .send(2)
            .through([new MultiplyByThreePipe()])
            .then(async (value) => value);

        expect(result).toBe(6);  // 2 * 3 = 6
    });

    test('should throw an error if the pipe is neither a function nor an object with a handle method', async () => {
        await expect(() =>
            pipeline
                .send(2)
                .through([{} as any])  // Invalid pipe object (should be a function or an object with a handle method)
                .then(async (value) => value)
        ).rejects.toThrow('Pipe must be a function or an object with a "handle" method.');
    });

    test('should throw an error if no passable object is provided', async () => {
        const emptyPipeline = new Pipeline<number>();

        await expect(emptyPipeline.then(async (value) => value)).rejects.toThrow('No passable object provided to the pipeline.');
    });

    test('should handle asynchronous pipes correctly', async () => {
        // Define the asynchronous pipe
        const asyncPipe: (value: number) => Promise<number> = async (value) => {
            const result = value + 2;  // Asynchronous operation (simulated by a simple delay)
            return result * 2;  // Multiply the result by 2
        };

        const pipeline = new Pipeline<number>();

        const result = await pipeline
            .send(3)  // The initial data
            .through([asyncPipe])  // Apply the asynchronous pipe
            .then(async (value) => value);  // Final result

        expect(result).toBe(10);  // (3 + 2) * 2 = 10
    });

});
