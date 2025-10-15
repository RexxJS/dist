/*!
 * @rexxjs-meta=JQ_WASM_FUNCTIONS_META
 */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory((function webpackLoadOptionalExternalModule() { try { return require("jq-wasm"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define(["jq-wasm"], factory);
	else if(typeof exports === 'object')
		exports["jq-wasm-functions"] = factory((function webpackLoadOptionalExternalModule() { try { return require("jq-wasm"); } catch(e) {} }()));
	else
		root["jq-wasm-functions"] = factory(root["jq-wasm"]);
})(this, (__WEBPACK_EXTERNAL_MODULE_jq_wasm__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/jq-wasm-functions.js":
/*!**********************************!*\
  !*** ./src/jq-wasm-functions.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("{/*!\n * rexxjs/jq-wasm-functions v1.0.0 | (c) 2025 RexxJS Project | MIT License\n * @rexxjs-meta=JQ_WASM_FUNCTIONS_META\n */\n/**\n * jq WASM Functions Library - JSON query execution functions\n * Uses jq-wasm for portable, pure-JavaScript implementation\n *\n * Usage:\n *   REQUIRE \"jq-wasm-functions\"\n *   LET result = jqQuery('{\"name\": \"RexxJS\"}', '.name')\n *   SAY result  // \"RexxJS\"\n *\n * Available functions:\n *   jqQuery(data, query) - Execute jq query, return parsed result\n *   jqRaw(data, query) - Execute jq query with -r flag, return raw string\n *   jqKeys(data) - Get object keys\n *   jqValues(data) - Get object values\n *   jqLength(data) - Get array/object length\n *   jqType(data) - Get JSON type\n *\n * Note: Works in both Node.js and browser environments with jq-wasm\n * For better performance with system jq binary, use jq-functions (native) instead\n *\n * Copyright (c) 2025 RexxJS Project\n * Licensed under the MIT License\n */\n\n// Import jq-wasm if available\nlet jq = null;\ntry {\n  if (true) {\n    try {\n      jq = __webpack_require__(/*! jq-wasm */ \"jq-wasm\");\n    } catch (requireError) {\n      // Fallback: check if jq is available globally\n      if (typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g.jq) {\n        jq = __webpack_require__.g.jq;\n      }\n    }\n  } else // removed by dead control flow\n{}\n} catch (e) {\n  // Will be loaded later\n}\n\n// jq WASM functions metadata\nfunction JQ_WASM_FUNCTIONS_META() {\n  // Check jq-wasm availability\n  let jqAvailable = false;\n  try {\n    if (jq && typeof jq.json === 'function') {\n      jqAvailable = true;\n    }\n  } catch (e) {\n    // Not available\n  }\n\n  return {\n    canonical: \"org.rexxjs/jq-wasm-functions\",\n    type: 'functions-library',\n    name: 'jq JSON Query Functions (WASM)',\n    version: '1.0.0',\n    description: 'JSON query execution functions using jq-wasm (portable, pure-JS)',\n    provides: {\n      functions: ['jqQuery', 'jqRaw', 'jqKeys', 'jqValues', 'jqLength', 'jqType']\n    },\n    dependencies: {},\n    envVars: [],\n    loaded: true,\n    requirements: {\n      environment: 'nodejs',\n      modules: ['jq-wasm']\n    },\n    jqAvailable: jqAvailable\n  };\n}\n\n/**\n * Execute jq query and return the result\n * @param {string|object} data - JSON data (string or object)\n * @param {string} query - jq query expression\n * @returns {any} Query result\n */\nasync function jqQuery(data, query) {\n  if (!jq || typeof jq.json !== 'function') {\n    throw new Error('jq-wasm not available. Please install jq-wasm: npm install jq-wasm');\n  }\n\n  try {\n    // jq-wasm accepts objects, arrays, or JSON strings\n    // Don't parse primitives - they need to stay as strings for jq-wasm\n    const queryStr = String(query);\n\n    // Execute jq query using jq-wasm (async)\n    const result = await jq.json(data, queryStr);\n\n    return result;\n  } catch (error) {\n    throw new Error(`jq query failed: ${error.message}`);\n  }\n}\n\n/**\n * Execute jq query with raw output\n * @param {string|object} data - JSON data (string or object)\n * @param {string} query - jq query expression\n * @returns {string} Raw string result\n */\nasync function jqRaw(data, query) {\n  if (!jq || typeof jq.raw !== 'function') {\n    throw new Error('jq-wasm not available. Please install jq-wasm: npm install jq-wasm');\n  }\n\n  try {\n    const queryStr = String(query);\n\n    // Execute jq query with raw output using jq-wasm\n    const result = await jq.raw(data, queryStr, ['-r']);\n\n    if (result.stderr) {\n      throw new Error(result.stderr);\n    }\n\n    return result.stdout.trim();\n  } catch (error) {\n    throw new Error(`jq query failed: ${error.message}`);\n  }\n}\n\n/**\n * Get object keys\n * @param {string|object} data - JSON data (string or object)\n * @returns {string[]} Array of keys\n */\nasync function jqKeys(data) {\n  return await jqQuery(data, 'keys');\n}\n\n/**\n * Get object values\n * @param {string|object} data - JSON data (string or object)\n * @returns {any[]} Array of values\n */\nasync function jqValues(data) {\n  return await jqQuery(data, '[.[]]');\n}\n\n/**\n * Get array/object length\n * @param {string|object} data - JSON data (string or object)\n * @returns {number} Length\n */\nasync function jqLength(data) {\n  return await jqQuery(data, 'length');\n}\n\n/**\n * Get JSON type\n * @param {string|object} data - JSON data (string or object)\n * @returns {string} Type (object, array, string, number, boolean, null)\n */\nasync function jqType(data) {\n  return await jqQuery(data, 'type');\n}\n\n// Export functions to global scope\nif (typeof window !== 'undefined') {\n  // Browser environment\n  window.JQ_WASM_FUNCTIONS_META = JQ_WASM_FUNCTIONS_META;\n  window.jqQuery = jqQuery;\n  window.jqRaw = jqRaw;\n  window.jqKeys = jqKeys;\n  window.jqValues = jqValues;\n  window.jqLength = jqLength;\n  window.jqType = jqType;\n} else if (typeof __webpack_require__.g !== 'undefined') {\n  // Node.js environment\n  __webpack_require__.g.JQ_WASM_FUNCTIONS_META = JQ_WASM_FUNCTIONS_META;\n  __webpack_require__.g.jqQuery = jqQuery;\n  __webpack_require__.g.jqRaw = jqRaw;\n  __webpack_require__.g.jqKeys = jqKeys;\n  __webpack_require__.g.jqValues = jqValues;\n  __webpack_require__.g.jqLength = jqLength;\n  __webpack_require__.g.jqType = jqType;\n}\n\n// CommonJS export\nif ( true && module.exports) {\n  module.exports = {\n    JQ_WASM_FUNCTIONS_META,\n    jqQuery,\n    jqRaw,\n    jqKeys,\n    jqValues,\n    jqLength,\n    jqType\n  };\n}\n\n\n//# sourceURL=webpack://jq-wasm-functions/./src/jq-wasm-functions.js?\n}");

/***/ }),

/***/ "jq-wasm":
/*!**************************!*\
  !*** external "jq-wasm" ***!
  \**************************/
/***/ ((module) => {

"use strict";
if(typeof __WEBPACK_EXTERNAL_MODULE_jq_wasm__ === 'undefined') { var e = new Error("Cannot find module 'jq-wasm'"); e.code = 'MODULE_NOT_FOUND'; throw e; }

module.exports = __WEBPACK_EXTERNAL_MODULE_jq_wasm__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/jq-wasm-functions.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});