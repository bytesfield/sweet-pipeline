# Sweet-Pipeline Package

In Development Stage

# Description

Sweet-Pipeline is a node package for defining and executing a simple sequential flow of process to process using functional programming principle.

## Installation

[Node](https://nodejs.org/en/) 14 + and [NPM](https://www.npmjs.com/) are required.

To get the latest version of Sweet-Pipeline, simply install it

```bash
npm install sweet-pipeline
```

Or add the following line to the `dependencies` block of your `package.json` file.

```
"sweet-pipeline": "1.0.*"
```

You'll then need to run `npm install` or `npm update` to have it installed.

## Usage

```javascript
const Pipeline = require("sweet-pipeline");

const pipes = [Pipe1, Pipe2, Pipe3];

const pipeline = new Pipeline().send(pipeData).through(pipes).thenReturn();
```

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security related issues, please email abrahamudele@gmail instead of using the issue tracker.

## Credits

- [Abraham Udele](https://github.com/bytesfield) <br/>
  Find me on <br/>
  <a href="https://twitter.com/SaintAbrahams/">Twitter.</a> <br/>
  <a href="https://www.linkedin.com/in/abraham-udele-246003130/">Linkedin.</a>

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
