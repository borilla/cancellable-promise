'use strict';

var CancellablePromise = require('../src/index');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('cancellable-promise', function () {
	var sandbox;

	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function () {
		sandbox.restore();
	});

	describe('a new cancellable promise', function () {
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
});
