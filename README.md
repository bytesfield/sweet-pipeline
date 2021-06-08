<p align="center"><img src="/images/pipeline.jpg" alt="Sweet Pipeline Preview"></p>

# Sweet-Pipeline Package

[![npm version](https://badge.fury.io/js/sweet-pipeline.svg)](https://badge.fury.io/js/sweet-pipeline)
[![GitHub license](https://img.shields.io/github/license/bytesfield/sweet-pipeline)](https://github.com/bytesfield/sweet-pipeline/blob/main/LICENSE.md)
[![Build Status](https://travis-ci.com/bytesfield/sweet-pipeline.svg?branch=main)](https://travis-ci.com/bytesfield/sweet-pipeline)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/bytesfield/sweet-pipeline/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/bytesfield/sweet-pipeline/?branch=main)
[![GitHub issues](https://img.shields.io/github/issues/bytesfield/sweet-pipeline)](https://github.com/bytesfield/sweet-pipeline/issues)
<br />

# Description

Sweet-Pipeline is a node package for defining and executing a simple sequential flow from process to process using functional programming principle. This process is initiated by a payload that is passed to the pipeline from one pipe (process) to another and finally completes the entire process and returns the final result.

## Installation

[Node](https://nodejs.org/en/) 13 + is required.

To get the latest version of Sweet-Pipeline, simply install it

```bash
npm install sweet-pipeline
```

## Usage

Processes which are referred to as pipes in the pipeline are callable functions, closures or anything that can be invoked.

To begin require it at the top.

```javascript
const Pipeline = require("sweet-pipeline");
```

### Synchronous (Sync) Usage

This is an example where pipes returns a concrete value.

```javascript
const pipes = [callablePipe1, callablePipe2, callablePipe3];
const pipeData = { data: "data" };

const pipeline = new Pipeline().send(pipeData).through(pipes).return();
```

#### Example without the break method

The example below demonstrate a function `nairaToUSD()` that converts a Nigerian (NGN) naira amount to USD, another function `usdToBTC()` that converts the result to Bitcoin (BTC) and lastly `applyTax()` that applies tax to the conversion's final result. Without pipeline this can be implemented like this: `applyTax(usdToBTC(nairaToUSD(amount)))`

_Note all data used here are dummy data, they are not real data_

```javascript
const usdToNairaRate = 200; // 1USD = N200
const btcToUSDRate = 10; // 1BTC = 10USD
const tax = 0.3; // 3%

const nairaToUSD = (amount) => {
  return amount / usdToNairaRate;
};

const usdToBTC = (amount) => {
  return amount / btcToUSDRate;
};

const applyTax = (amount) => {
  return amount - amount * tax;
};

const pipes = [nairaToUSD, usdToBTC, applyTax];
const pipeData = 10000;

const result = new Pipeline().send(pipeData).through(pipes).return();

console.log(result);

/*
Process Calculation

First Process : 10000/200 = 50USD
Second Process : 50/10 = 5BTC
Third Process: 5 - (5 * 0.3)  = 3.5BTC

This will return (int) 3.5BTC
*/
```

With the example above the amount is passed to every pipe on the pipeline sequentially which is processed by the pipes individually with there separate logics passed to the current result and the final result is returned.

#### Example with break method

You can also chain the pipeline class with a break method and pass a boolean of true, this will return the result of the first pipe on the pipeline that returns a true response and others will be ignored. This is applicable when you are implementing a pipeline of services with the same logic or implementation or external service.

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
      success: "The second service was executed",
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

Now using pipeline to return the service that first return a true response.

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
  This will return because that pipe is the first pipe that return a true response

    { 
      "handler" : "Second Service",
     "success" : "The second service was executed"
    }

  */
```

### Asynchronous (async) Usage

This is an example where at least one pipe or all the pipes returns a promise. The difference with the sync usage is the way the result is returned. If there is at least one pipe that returns a promise you will have to use the then() method to get the result.

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

The example above is an asynchronous implementation that returns a promise. The function ` repeatTextAsync` repeats a text passed to it and `capitalizeFirstLetterAsync` capitalizes the first letter of the first repeated text. When this is passed to the pipeline it will execute the first function and apply the second function's logic to the result and returns the final result.

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
