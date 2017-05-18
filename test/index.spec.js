'use strict';

var CancellablePromise = require('../src/index');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;

chai.use(chaiAsPromised);

describe('cancellable-promise', function () {
	describe('when we create a new cancellable promise', function () {
		var promise;

		beforeEach(function () {
			promise = new CancellablePromise(function (/*resolve, reject*/) {});
		});

		it('should have a cancel method', function () {
			expect(promise.cancel).to.be.a('function');
		});

		describe('when cancel method is called', function () {
			var reason = { msg: 'Cancelled' };

			beforeEach(function () {
				promise.cancel(reason);
			});

			it('should immediately reject the promise', function () {
				return expect(promise).to.be.rejected;
			});

			it('should not fulfill the promise', function () {
				return expect(promise).to.not.be.fulfilled;
			});

			it('should reject the promise with the given reason', function () {
				return expect(promise).to.be.rejectedWith(reason);
			});
		});
	});

	describe('when we make an existing promise cancellable', function () {
		var originalPromise, resolve, reject;
		var cancellablePromise;

		beforeEach(function () {
			originalPromise = new Promise(function (_resolve, _reject) {
				resolve = _resolve;
				reject = _reject;
			});
			cancellablePromise = CancellablePromise.makeCancellable(originalPromise);
		});

		it('should have a cancel method', function () {
			expect(cancellablePromise.cancel).to.be.a('function');
		});

		describe('when cancel method is called', function () {
			var reason = { msg: 'Cancelled' };

			beforeEach(function () {
				cancellablePromise.cancel(reason);
			});

			it('should reject the cancellable promise', function () {
				return expect(cancellablePromise).to.be.rejected;
			});

			it('should reject the cancellable promise with the given reason', function () {
				return expect(cancellablePromise).to.be.rejectedWith(reason);
			});
		});

		describe('when original promise is resolved', function () {
			var value = { some: 'data' };

			beforeEach(function () {
				resolve(value);
			});

			it('should fulfill the cancellable promise', function () {
				return expect(cancellablePromise).to.be.fulfilled;
			});

			it('should fulfill the cancellable promise with the given value', function () {
				return expect(cancellablePromise).to.eventually.equal(value);
			});
		});

		describe('when original promise is rejected', function () {
			var reason = { some: 'reason' };

			beforeEach(function () {
				reject(reason);
			});

			it('should reject the cancellable promise', function () {
				return expect(cancellablePromise).to.be.rejected;
			});

			it('should fulfill the cancellable promise with the given value', function () {
				return expect(cancellablePromise).to.be.rejectedWith(reason);
			});
		});
	});
});
