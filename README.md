# Cancellable-promise

Adds a 'cancel' method to promises to immediately reject the promise

## TOC

* [Installation](#installation)
* [General usage](#general-usage)
  * [Creating a new cancellable promise](#creating-a-new-cancellable-promise)
  * [Modifying an existing promise](#modifying-an-existing-promise)

## Installation

Install the module using npm:
```shell
$ npm install cancellable-promise
```

## General usage

### Creating a new cancellable promise

```javascript
var CancellablePromise = require('cancellable-promise');

// create a new promise
var promise = new CancellablePromise(function (resolve, reject) { ... });

// ...later, cancel the promise
promise.cancel('Cancelled');
```

### Modifying an existing promise

```javascript
var CancellablePromise = require('cancellable-promise');

var promise = new Promise(function (resolve, reject) { ... });
var cancellable = CancellablePromise.makeCancellable(promise);

// ...later
cancellable.cancel('Cancelled');
```
