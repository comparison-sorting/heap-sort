"use strict";

(function () {

	"use strict";

	var definition = function definition(exports, undefined) {

		/* js/src/heapsort.js */

		/**
   * Template for a d-ary implementation of heapsort.
   *
   *
   */

		var dary = function dary(arity) {

			/**
    * Note that here we reverse the order of the
    * comparison operator since when we extract
    * values from the heap they can only be stored
    * at the end of the array. We thus build a max-heap
    * and then pop elements from it until it is empty.
    */

			var sort = function sort(compare, a, i, j) {

				var k = undefined,
				    y = undefined,
				    t = undefined,
				    current = undefined,
				    parent = undefined,
				    candidate = undefined,
				    tmp = undefined;

				// construct the max-heap

				for (k = i + 1; k < j; ++k) {

					current = k - i;

					// while we are not the root

					while (current !== 0) {

						// address of the parent in a zero-based
						// d-ary heap

						parent = i + ((current - 1) / arity | 0);
						current += i;

						// if current value is smaller than its parent
						// then we are done

						if (compare(a[current], a[parent]) <= 0) {
							break;
						}

						// otherwise
						// swap with parent

						tmp = a[current];
						a[current] = a[parent];
						a[parent] = tmp;

						current = parent - i;
					}
				}

				// exhaust the max-heap

				for (--k; k > i; --k) {

					// put max element at the end of the array
					// and percolate new max element down
					// the heap

					tmp = a[k];
					a[k] = a[i];
					a[i] = tmp;

					current = 0;

					while (true) {

						// address of the first child in a zero-based
						// d-ary heap

						candidate = i + arity * current + 1;

						// if current node has no children
						// then we are done

						if (candidate >= k) {
							break;
						}

						// search for greatest child

						t = Math.min(candidate + arity, k);

						y = candidate;

						for (++y; y < t; ++y) {

							if (compare(a[y], a[candidate]) > 0) {
								candidate = y;
							}
						}

						// if current value is greater than its greatest
						// child then we are done

						current += i;

						if (compare(a[current], a[candidate]) >= 0) {
							break;
						}

						// otherwise
						// swap with greatest child

						tmp = a[current];
						a[current] = a[candidate];
						a[candidate] = tmp;

						current = candidate - i;
					}
				}
			};

			return sort;
		};

		exports.dary = dary;

		return exports;
	};
	if (typeof exports === "object") {
		definition(exports);
	} else if (typeof define === "function" && define.amd) {
		define("aureooms-js-heapsort", [], function () {
			return definition({});
		});
	} else if (typeof window === "object" && typeof window.document === "object") {
		definition(window["heapsort"] = {});
	} else console.error("unable to detect type of module to define for aureooms-js-heapsort");
})();