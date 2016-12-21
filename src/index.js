'use strict';

function CancellablePromise(executor) {
	return CancellablePromise.makeCancellable(new Promise(executor));
}

CancellablePromise.makeCancellable = function (promise) {
	var cancel;
	var p2 = new Promise(function (resolve, reject) {
		cancel = reject;
	});
	var p3 = Promise.race([ promise, p2 ]);

	p3.cancel = cancel;

	return p3;
};

module.exports = CancellablePromise;
