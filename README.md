<p><img src="/images/pipeline.jpg" alt="Sweet Pipeline Preview"></p>

# Sweet-Pipeline Package

[![npm version](https://badge.fury.io/js/sweet-pipeline.svg)](https://badge.fury.io/js/sweet-pipeline)
[![GitHub license](https://img.shields.io/github/license/bytesfield/sweet-pipeline)](https://github.com/bytesfield/sweet-pipeline/blob/main/LICENSE.md)
[![Build Status](https://travis-ci.com/bytesfield/sweet-pipeline.svg?branch=main)](https://travis-ci.com/bytesfield/sweet-pipeline)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/bytesfield/sweet-pipeline/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/bytesfield/sweet-pipeline/?branch=main)
[![GitHub issues](https://img.shields.io/github/issues/bytesfield/sweet-pipeline)](https://github.com/bytesfield/sweet-pipeline/issues)
<br />

# Description

`Sweet Pipeline` is a flexible and powerful pipeline package for JavaScript/TypeScript, inspired by the Laravel pipeline design pattern. It enables you to define a simple sequential flow of processes leveraging on `functional programming` principles, making it easy to build complex workflows with a clear and readable structure.

## Installation

[Node](https://nodejs.org/en/) 14 + is required.

To get the latest version of Sweet-Pipeline, simply install it

```bash
npm install sweet-pipeline
```

## Usage

Processes which are referred to as `pipes` in the pipeline are callable `functions`, `closures` or anything that can be invoked.

To begin require it at the top.

```typescript
import { Pipeline } from "sweet-pipeline"
```

### Basic Usage

The basic idea behind the `pipeline` is to send data through a series of steps. Each step (or "pipe") modifies the data and passes it to the next step.

```typescript
const pipeline = new Pipeline<number>();

const result = await pipeline
        .send(1)  // The initial data
        .through([
          (value) => value + 1,     // First step: Add 1
          (value) => value * 2,     // Second step: Multiply by 2
        ])
        .then(result => {
          console.log(result); // Output: 4 (1 + 1 = 2, 2 * 2 = 4)
        });
```

#### Pipes

A `pipe` is a function that processes the data in the pipeline. Each pipe receives the data (`passable`) and can either return a value directly or a `Promise`.

##### Pipe as a Function
A function that takes the current passable object and a next function. The next function calls the next pipe.

```typescript
(value) => value + 1
```

##### Pipe as an Object with `handle` method
An object with a `handle` method that follows the same signature as the function pipe.

```typescript
const pipeObject = {
  handle: (value) => value * 2,
};
```

#### Handling Promises

You can use `async` pipes that return `promises`. The pipeline will `wait` for the promise to resolve before passing the result to the next pipe.

```typescript
const result = await new Pipeline<number>()
        .send(1)
        .through([
          async (value) => value + 1,     // First step: Add 1 (async)
          async (value) => value * 2,     // Second step: Multiply by 2 (async)
        ])
        .then(result => console.log(result)); // Output: 4
```

#### Breaking the Pipeline

You can `break` out of the pipeline early by using the `.break()` method. If a pipe returns `true` for the `break` condition, the pipeline will stop processing further pipes.

```typescript
const result = await new Pipeline<number>()
        .send(1)
        .through([
          (value) => value + 1,     // First step: Add 1
          (value) => value * 2,     // Second step: Multiply by 2
        ])
        .break(true)  // Stop after the first pipe
        .then(result => console.log(result)); // Output: 2 (1 + 1)
```

#### Chaining with `then`

The `then` method allows you to specify the final step in the pipeline after all pipes have been executed. This is where you define the ultimate result you want to achieve after passing through the pipeline.


```typescript
const result = await new Pipeline<number>()
        .send(1)
        .through([
          (value) => value + 1,     // Add 1
          (value) => value * 2,     // Multiply by 2
        ])
        .then(result => {
          console.log(result); // Output: 4
          return result * 2;   // You can also return a value for further chaining
        })
        .then(console.log);     // Output: 8
```

### API
#### `send(passable: T): this`
Sets the initial data (`passable`) that will be passed through the `pipeline`.

```typescript
pipeline.send(10);
```

#### `through(pipes: Pipe<T>[] | Pipe<T>): this`
Sets the pipes (steps) that will transform the data. This can be an array of pipes, which can be `functions` or `objects` with a `handle` method

```typescript
pipeline.through([
  (value) => value + 1,
  (value) => value * 2,
]);

```

#### `then(destination: (value: T) => Promise<T>): Promise<T>`
Executes the `pipeline` and returns the final result. Pipes are reduced into a single composed function that calls each pipe in sequence. The destination is the final step of the pipeline.

```typescript
const result = await pipeline.then(value => value + 5);
```

#### Note
_While `Sweet Pipeline` follows many `functional programming` principles—such as immutability, first-class functions, composition, and higher-order functions—it doesn't enforce pure functional programming strictly. It still allows for impure functions (if the user decides to use them), and side effects can be introduced in the pipes. However, if used correctly with pure functions, the package aligns well with functional programming principles_

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security related issues, please email `abrahamudele@gmail.com` instead of using the issue tracker.

## Credits

  ### Abraham Udele (Software Engineer) <br/>
  - Find me on <br/>
  <a href="https://www.abrahamudele.com">Website.</a> <br/>
  <a href="https://github.com/bytesfield/">Github.</a> <br/>
  <a href="https://x.com/mr_udele/">X (Twitter).</a> <br/>
  <a href="https://www.linkedin.com/in/abrahamudele/">Linkedin.</a>

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
