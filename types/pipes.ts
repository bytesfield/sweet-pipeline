export type PipeFunction<T> = (passable: T, next: (value: T) => Promise<T>) => Promise<T>;
export type PipeObject<T> = { handle: (passable: T, next: (value: T) => Promise<T>) => Promise<T> };
export type Pipe<T> = PipeFunction<T> | PipeObject<T>;
