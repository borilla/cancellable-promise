'use strict';

function CancellablePromise(executor) {
	return CancellablePromise.makeCancellable(new Promise(executor));
}

CancellablePromise.makeCancellable = function (promise) {
	var cancel, p2;

	p2 = new Promise(function (resolve, reject) {
		promise.then(resolve).catch(reject);
		cancel = reject;
	});
	p2.cancel = cancel;

	return p2;
};

module.exports = CancellablePromise;
