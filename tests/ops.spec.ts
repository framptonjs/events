import { Signal } from '@frampton/core';
import {
  closestToEvent,
  containsSelector,
  eventValue,
  onEvent,
  onCustom,
  onSelector
} from '../src/ops';
import { assert } from 'chai';


describe('Ops', function() {

  describe('closestToEvent', function() {
    var div1: HTMLElement = null;
    var div2: HTMLElement = null;
    var container: HTMLElement = null;

    beforeEach(function() {
      container = document.body;
      div1 = document.createElement('div');
      div2 = document.createElement('div');
      div1.classList.add('blue');
      div1.appendChild(div2);
      container.appendChild(div1);
    });

    afterEach(function() {
      container.removeChild(div1);
      container = null;
      div1 = null;
      div2 = null;
    });

    it('should return closest element to event matching selector', function() {
      const mockEvent: any = { target: div2 };
      const actual = closestToEvent('.blue', mockEvent);
      const expected = div1;

      assert.equal(actual, expected);
    });
  });

  describe('containsSelector', function() {
    var div1: HTMLElement = null;
    var div2: HTMLElement = null;
    var container: HTMLElement = null;

    beforeEach(function() {
      div1 = document.createElement('div');
      div2 = document.createElement('div');
      container = document.body;
      container.appendChild(div1);
      div1.appendChild(div2);
    });

    afterEach(function() {
      container.removeChild(div1);
      div1 = null;
      div2 = null;
      container = null;
    });

    it('should return true if event target has given selector', function() {
      const mockEvent: any = { target: div1 };
      div1.classList.add('blue');
      const actual: boolean = containsSelector('.blue', mockEvent);
      const expected: boolean = true;

      assert.equal(actual, expected);
    });

    it('should return true if event target contains given selector', function() {
      const mockEvent: any = { target: div1 };
      div2.classList.add('blue');
      const actual: boolean = containsSelector('.blue', mockEvent);
      const expected: boolean = true;

      assert.equal(actual, expected);
    });

    it('should return false if event target does not contain given selector', function() {
      const mockEvent: any = { target: div1 };
      div2.classList.add('blue');
      const actual: boolean = containsSelector('#blue', mockEvent);
      const expected: boolean = false;

      assert.equal(actual, expected);
    });
  });

  describe('eventValue', function() {
    it('should return the value of an event target', function() {
      const input = document.createElement('input');
      input.value = 'test';
      const mockEvent: any = {
        target: input
      };

      const actual = eventValue(mockEvent);
      const expected = 'test'

      assert.equal(actual, expected);
    });
  });

  describe('onEvent', function() {
    var container: HTMLElement = null;
    var div: HTMLElement = null;

    beforeEach(function() {
      container = document.body;
      div = document.createElement('div');
      container.appendChild(div);
    });

    afterEach(function() {
      container.removeChild(div);
      container = null;
      div = null;
    });

    it('should return a signal that responds to specified event on element', function() {
      const sig: Signal<number> =
        onEvent('click', div).map(1);

      assert.equal(sig.get(), undefined);

      div.click();

      assert.equal(sig.get(), 1);
    });
  });

  describe('onCustom', function() {
    var container: HTMLElement = null;
    var div: HTMLElement = null;

    beforeEach(function() {
      container = document.body;
      div = document.createElement('div');
      container.appendChild(div);
    });

    afterEach(function() {
      container.removeChild(div);
      container = null;
      div = null;
    });

    it('should return a signal that responds to specified event on object', function() {
      const sig: Signal<number> =
        onCustom('click', div).map(1);

      assert.equal(sig.get(), undefined);

      div.click();

      assert.equal(sig.get(), 1);
    });
  });

  describe('onSelector', function() {
    var container: HTMLElement = null;
    var div: HTMLElement = null;

    beforeEach(function() {
      container = document.body;
      div = document.createElement('div');
      div.classList.add('blue');
      container.appendChild(div);
    });

    afterEach(function() {
      container.removeChild(div);
      container = null;
      div = null;
    });

    it('should return a signal that responds to specified event on selector', function() {
      const sig: Signal<number> =
        onSelector('click', '.blue').map(1);

      assert.equal(sig.get(), undefined);

      div.click();

      assert.equal(sig.get(), 1);
    });

    it('should return a signal that responds to multiple events', function() {
      var test: string = '';

      const sig: Signal<string> =
        onSelector('click mouseover', '.blue').map((evt: Event): string => {
          return test += evt.type;
        });

      const evt: Event =
        document.createEvent("HTMLEvents");

      evt.initEvent('mouseover', true, true);

      div.dispatchEvent(evt);
      div.click();

      assert.equal(sig.get(), 'mouseoverclick');
    });
  });
});