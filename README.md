<p align="center"><img src="/images/pipeline.jpg" alt="Sweet Pipeline Preview"></p>

# Sweet-Pipeline Package

In Development Stage

# Description

Sweet-Pipeline is a node package for defining and executing a simple sequential flow of process to process using functional programming principle.

## Installation

[Node](https://nodejs.org/en/) 13 + and [NPM](https://www.npmjs.com/) are required.

To get the latest version of Sweet-Pipeline, simply install it

```bash
npm install sweet-pipeline
```

## Usage

Process which are referred to as pipes in a pipeline are callable functions or closures and anything that can be invoked.

```javascript
const Pipeline = require("sweet-pipeline");
```

### Sync Usage

This is an example where pipes returns a concrete value.

```javascript
const pipes = [callablePipe1, callablePipe2, callablePipe3];

const pipeline = new Pipeline().send(pipeData).through(pipes).return();
```

#### Example without break method

_Note all data used here are dummy data, they are not real data_

```javascript
const usdToNairaRate = 400;
const btcToUSDRate = 10;
const tax = 0.5;

const nairaToUSD = (amount) => {
  return amount * usdToNairaRate;
};

const usdToBTC = (amount) => {
  return amount * btcToUSDRate;
};

const applyTax = (amount) => {
  return amount - (amount * tax);
};

const pipes = [nairaToUSD, usdToBTC, applyTax];
const pipeData = 100;

const result = new Pipeline().send(pipeData)
                             .through(pipes)
                             .return();
console.log(result);
/*
Calculation

First Process : 100 x 400 = 4,000
Second Process : 4000 x 10 = 40,000
Third Process: 40000 - (40000 * 0.3)  = 28,000

This will return (int) 28,000
*
```

With the example above the amount is passed to every pipe on the pipeline sequentially and the final result is returned.

#### Example with break method

You can also chain the pipeline class with a break method and pass a boolean of true to return the result of the first pipe on the pipeline that returns a true response and others will be ignored. This is applicable when you implementing a pipeline of services with the same logic or implementation or external service.

_Note by default the break method is false_

```javascript
class FirstService {
  handle() {
    return {
      handler: "First Service",
      error: "The first service is not avalibale",
    };
  }
}
class SecondService {
  handle() {
    return {
      handler: "Second Service",
      success: "The second service executed",
    };
  }
}
class ThirdService {
  handle() {
    return {
      handler: "Third Service",
      error: "The third service has an error",
    };
  }
}

module.exports = {
  FirstService,
  SecondService,
  ThirdService,
};
```

Now using pipeline to return the service that first return a true response

```javascript
const firstService = new FirstService();
const secondService = new SecondService();
const thirdService = new ThirdService();

const pipes = [
  firstService.handle(),
  secondService.handle(),
  thirdService.handle(),
];

const result = new Pipeline()
  .send(pipeData)
  .through(pipes)
  .break(true)
  .return();

console.log(result);

/*
  This will return

    { 
      "handler" : "Second Service",
     "success" : "The second service executed"
    }

  */
```

### Async Usage

This is an example where at least one pipe or all the pipes returns a promise

```javascript
var q = require("q");

const repeatTextAsync = (text) => {
  var deferred = q.defer();
  deferred.resolve(text + ", " + text);
  return deferred.promise;
};

const capitalizeFirstLetterAsync = (text) => {
  var deferred = q.defer();
  deferred.resolve(text[0].toUpperCase() + text.substring(1));
  return deferred.promise;
};

module.exports = {
  repeatTextAsync,
  capitalizeFirstLetterAsync,
};

const pipes = [repeatTextAsync, capitalizeFirstLetterAsync];

const text = "Hello";

const result = new Pipeline()
  .send(text)
  .through(asyncPipes)
  .return()
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  });

/*
  This will return
  
  Hello, hello

*/
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
