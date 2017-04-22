import { lazy } from '../src/utils';
import { assert } from 'chai';


describe('Utils', function() {
  describe('lazy', function() {
    it('should return a function', function() {
      const add = (a: number, b: number): number => a + b;
      const actual = (typeof lazy(add, [1,2]));
      const expected = 'function'

      assert.equal(actual, expected);
    });

    it('should return a function that lazily applies given function', function() {
      const add = (a: number, b: number): number => a + b;
      const lazyAdd = lazy(add, [1,2]);
      const actual = lazyAdd();
      const expected = 3;

      assert.equal(actual, expected);
    });
  });
});