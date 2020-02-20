//
// EventTarget.addEventListener - options: { once, passive } (https://github.com/github/eventlistener-polyfill)
//
import 'eventlistener-Polyfill';
//
// END - EventTarget.addEventListener - options { once, passive }
//

//
// Promise (https://github.com/taylorhakes/promise-polyfill) (recommended by github/fetch)
//
import 'promise-polyfill/src/polyfill';
//
// END - Promise
//

//
// fetch (https://github.com/github/fetch)
//
import 'whatwg-fetch';
//
// END - fetch
//

//
// Symbol (https://github.com/medikoo/es6-symbol)
//
import 'es6-symbol/implement';
//
// END - Symbol
//

//
// Object.assign (https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill) (changed)
//
if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    writable: true,
    configurable: true,
    value: function(target) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(Object(nextSource));
        for (
          var nextIndex = 0, len = keysArray.length;
          nextIndex < len;
          nextIndex++
        ) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}
//
// END - Object.assign
//

//
// Array.from (https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill)
//
// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString;
    var isCallable = function(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError(
          'Array.from requires an array-like object - not null or undefined'
        );
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            'Array.from: when provided, the second argument must be a function'
          );
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] =
            typeof T === 'undefined'
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  })();
}
//
// END - Array.from
//

//
// ParentNode.append (https://developer.mozilla.org/de/docs/Web/API/ParentNode/append#Polyfill) (changed)
//
[Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(
  function(item) {
    if (item.hasOwnProperty('append')) return;
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function(argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(
            isNode ? argItem : document.createTextNode(String(argItem))
          );
        });

        this.appendChild(docFrag);
      }
    });
  }
);
//
// END - ParentNode.append
//

//
// Element.matches (https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill)
//
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}
//
// END - Element.matches
//

//
// Element.closest (https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill)
//
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}
//
// END - Element.closest
//

//
// ChildNode.remove (https://developer.mozilla.org/de/docs/Web/API/ChildNode/remove#Polyfill) (changed)
//
[Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach(
  function(item) {
    if (item.hasOwnProperty('remove')) return;
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode !== null) this.parentNode.removeChild(this);
      }
    });
  }
);
//
// END - ChildNode.remove
//

//
// NodeList.forEach (https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill)
//
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
//
// END - NodeList.forEach
//
