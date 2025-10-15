/*!
 * @rexxjs-meta=ECHO_ADDRESS_META
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
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["EchoAddress"] = factory();
	else
		root["EchoAddress"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/echo-address.js":
/*!*****************************!*\
  !*** ./src/echo-address.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("{/*!\n * rexxjs/echo-address v1.0.0 | (c) 2025 Paul Hammant | MIT License\n * @rexxjs-meta=ECHO_ADDRESS_META\n */\n/**\n * Echo ADDRESS Library - Simple test ADDRESS that echoes back interpolated input\n *\n * Usage:\n *   REQUIRE \"echo-address\"\n *   ADDRESS ECHO\n *   <<TEST\n *   message=Hello, {{name}}!\n *   TEST\n *   SAY RESULT.message  // Outputs: Hello, World! (if name=\"World\")\n *\n * Copyright (c) 2025 Paul Hammant\n * Licensed under the MIT License\n */\n\n// Metadata provider function\nfunction ECHO_ADDRESS_META() {\n  return {\n    canonical: \"org.rexxjs/echo-address\",\n    type: \"address-handler\",\n    dependencies: {},\n    libraryMetadata: {\n      interpreterHandlesInterpolation: true\n    },\n    name: 'Echo ADDRESS Service',\n    version: '1.0.0',\n    description: 'Simple echo ADDRESS for testing - returns interpolated input',\n    provides: {\n      addressTarget: 'echo',\n      handlerFunction: 'ADDRESS_ECHO_HANDLER',\n      commandSupport: true,\n      methodSupport: true\n    },\n    requirements: {\n      environment: 'nodejs-or-browser'\n    }\n  };\n}\n\n\n// ADDRESS target handler function\nasync function ADDRESS_ECHO_HANDLER(commandOrMethod, params, sourceContext) {\n  try {\n    // Apply RexxJS variable interpolation\n    const variablePool = params || {};\n    const interpolate = sourceContext && sourceContext.interpolation ? sourceContext.interpolation.interpolate : (str => str);\n    const interpolatedCommand = typeof commandOrMethod === 'string'\n      ? interpolate(commandOrMethod, variablePool)\n      : commandOrMethod;\n\n    // Handle heredoc/multi-line key=value format\n    if (typeof interpolatedCommand === 'string' && /^\\s*\\w+=/.test(interpolatedCommand)) {\n      const parsedParams = parseKeyValueHeredoc(interpolatedCommand);\n      return {\n        success: true,\n        echo: parsedParams,\n        message: parsedParams.message || JSON.stringify(parsedParams),\n        output: parsedParams.message || JSON.stringify(parsedParams),\n        errorCode: 0\n      };\n    }\n\n    // Handle simple string commands\n    if (typeof interpolatedCommand === 'string') {\n      return {\n        success: true,\n        echo: interpolatedCommand,\n        message: interpolatedCommand,\n        output: interpolatedCommand,\n        errorCode: 0\n      };\n    }\n\n    // Default: return empty result\n    return {\n      success: true,\n      echo: '',\n      message: '',\n      output: '',\n      errorCode: 0\n    };\n\n  } catch (error) {\n    throw new Error(error.message);\n  }\n}\n\n// Parse heredoc key=value format\nfunction parseKeyValueHeredoc(multilineText) {\n  const params = {};\n  const lines = multilineText.split('\\n');\n  let currentKey = null;\n  let currentValue = [];\n\n  for (const line of lines) {\n    const trimmed = line.trim();\n    if (!trimmed) continue;\n\n    // Check if this is a key=value line\n    const kvMatch = trimmed.match(/^(\\w+)=(.*)$/);\n    if (kvMatch) {\n      // Save previous key/value if exists\n      if (currentKey) {\n        params[currentKey] = currentValue.join('\\n').trim();\n      }\n      // Start new key/value\n      currentKey = kvMatch[1];\n      currentValue = [kvMatch[2]];\n    } else if (currentKey) {\n      // Continuation of previous value\n      currentValue.push(trimmed);\n    }\n  }\n\n  // Save last key/value\n  if (currentKey) {\n    params[currentKey] = currentValue.join('\\n').trim();\n  }\n\n  return params;\n}\n\n\n// Export to global scope - only metadata, handler discovered via metadata\nif (typeof window !== 'undefined') {\n  window.ECHO_ADDRESS_META = ECHO_ADDRESS_META;\n  window.ADDRESS_ECHO_HANDLER = ADDRESS_ECHO_HANDLER;\n} else if (typeof __webpack_require__.g !== 'undefined') {\n  __webpack_require__.g.ECHO_ADDRESS_META = ECHO_ADDRESS_META;\n  __webpack_require__.g.ADDRESS_ECHO_HANDLER = ADDRESS_ECHO_HANDLER;\n}\n\n\n//# sourceURL=webpack://EchoAddress/./src/echo-address.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/echo-address.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});