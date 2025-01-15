import {Pipe, PipeFunction, PipeObject} from "./types/pipes";

export class Pipeline<T> {
    private passable: T | null = null;
    private pipes: Pipe<T>[] = [];

    /**
     * Set the object being sent through the pipeline.
     * @param passable The data to be passed through the pipeline.
     * @returns {Pipeline<T>} The pipeline instance.
     */
    send(passable: T): this {
        this.passable = passable;
        return this;
    }

    /**
     * Set the array of pipes.
     * @param pipes The pipes to process the passable object.
     * @returns {Pipeline<T>} The pipeline instance.
     */
    through(pipes: Pipe<T>[] | Pipe<T>): this {
        this.pipes = Array.isArray(pipes) ? pipes : [pipes];
        return this;
    }

    /**
     * Execute the pipeline and resolve the final result.
     * @param destination The final operation after all pipes.
     * @returns {Promise<T>} The final processed result.
     */
    async then(destination: (value: T) => Promise<T>): Promise<T> {
        if (this.passable === null) {
            throw new Error('No passable object provided to the pipeline.');
        }

        if (!this.pipes.length) {
            return destination(this.passable);
        }

        // Reduce the pipes into a single composed function
        const pipeline = this.pipes.reduceRight(
            (next: (value: T) => Promise<T>, pipe: Pipe<T>) => {
                return async (passable: T): Promise<T> => {
                    if (this.isPipeFunction(pipe)) {
                        return pipe(passable, next);
                    }
                    if (this.isPipeObject(pipe)) {
                        return pipe.handle(passable, next);
                    }
                    throw new Error('Pipe must be a function or an object with a "handle" method.');
                };
            },
            destination
        );

        return pipeline(this.passable);
    }


    /**
     * Type guard to check if the pipe is a function.
     * @param pipe The pipe to check.
     * @returns {pipe is PipeFunction<T>} Whether the pipe is a function.
     */
    private isPipeFunction(pipe: Pipe<T>): pipe is PipeFunction<T> {
        return typeof pipe === 'function';
    }

    /**
     * Type guard to check if the pipe is an object with a handle method.
     * @param pipe The pipe to check.
     * @returns {pipe is PipeObject<T>} Whether the pipe is an object with a handle method.
     */
    private isPipeObject(pipe: Pipe<T>): pipe is PipeObject<T> {
        return typeof (pipe as PipeObject<T>).handle === 'function';
    }
}
