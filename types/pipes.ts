export type PipeFunction<T> = (passable: T) => Promise<T>;
export type PipeObject<T> = { handle: (passable: T) => Promise<T> };
export type Pipe<T> = PipeFunction<T> | PipeObject<T>;

