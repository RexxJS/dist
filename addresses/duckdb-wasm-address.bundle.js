/*!
 * @rexxjs-meta=DUCKDB_WASM_ADDRESS_META
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
		module.exports = factory((function webpackLoadOptionalExternalModule() { try { return require("@duckdb/duckdb-wasm"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define(["@duckdb/duckdb-wasm"], factory);
	else if(typeof exports === 'object')
		exports["duckdb-wasm-address"] = factory((function webpackLoadOptionalExternalModule() { try { return require("@duckdb/duckdb-wasm"); } catch(e) {} }()));
	else
		root["duckdb-wasm-address"] = factory(root["@duckdb/duckdb-wasm"]);
})(this, (__WEBPACK_EXTERNAL_MODULE__duckdb_duckdb_wasm__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/duckdb-wasm-address.js":
/*!************************************!*\
  !*** ./src/duckdb-wasm-address.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("{/*!\n * rexxjs/duckdb-wasm-address v1.0.0 | (c) 2025 RexxJS Project | MIT License\n * @rexxjs-meta=DUCKDB_WASM_ADDRESS_META\n */\n/**\n * DuckDB-WASM ADDRESS Library - Provides an in-process analytical database via ADDRESS interface\n * This is an ADDRESS target library, not a functions library\n *\n * Usage:\n *   REQUIRE \"duckdb-wasm-address\"\n *   ADDRESS DUCKDB\n *   LET result = query sql=\"SELECT 42;\"\n *\n * Copyright (c) 2025 RexxJS Project\n * Licensed under the MIT License\n */\n\nlet duckdb = null;\ntry {\n  if (true) {\n    duckdb = __webpack_require__(/*! @duckdb/duckdb-wasm */ \"@duckdb/duckdb-wasm\");\n  } else // removed by dead control flow\n{}\n} catch (e) {\n  // DuckDB-WASM is expected to be loaded externally\n}\n\nlet dbInstance = null;\nlet dbLoadingPromise = null;\nlet dbConnection = null;\n\nasync function getDb() {\n    if (dbInstance) {\n        return dbInstance;\n    }\n\n    if (dbLoadingPromise) {\n        return dbLoadingPromise;\n    }\n\n    if (!duckdb) {\n        throw new Error('DuckDB-WASM is not loaded. Make sure to include it in your environment.');\n    }\n\n    console.log(\"Loading DuckDB-WASM...\");\n    dbLoadingPromise = (async () => {\n        const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();\n        const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);\n        const worker = new Worker(bundle.mainWorker);\n        const logger = new duckdb.ConsoleLogger();\n        const db = new duckdb.AsyncDuckDB(logger, worker);\n        await db.instantiate(bundle.mainModule, bundle.pthreadWorker);\n        return db;\n    })();\n\n    dbInstance = await dbLoadingPromise;\n    console.log(\"DuckDB-WASM loaded successfully.\");\n    dbLoadingPromise = null;\n    return dbInstance;\n}\n\nasync function getConnection() {\n    if (dbConnection) {\n        return dbConnection;\n    }\n    const db = await getDb();\n    dbConnection = await db.connect();\n    return dbConnection;\n}\n\n// DuckDB WASM ADDRESS metadata function\nfunction DUCKDB_WASM_ADDRESS_META() {\n    // DuckDB-WASM works in both Node.js and browser environments\n    return {\n        canonical: \"org.rexxjs/duckdb-wasm-address\",\n        type: 'address-handler',\n        name: 'DuckDB Service (WASM)',\n        version: '1.0.0',\n        description: 'In-process analytical database via DuckDB-WASM (portable, pure-JS)',\n        provides: {\n            addressTarget: 'duckdb',\n            handlerFunction: 'ADDRESS_DUCKDB_WASM_HANDLER',\n            commandSupport: true,\n            methodSupport: true\n        },\n        dependencies: {},\n        envVars: [],\n        loaded: true,\n        requirements: {\n            environment: 'both',  // Works in both Node.js and browser\n            modules: ['@duckdb/duckdb-wasm']\n        },\n        duckdbAvailable: typeof duckdb !== 'undefined'\n    };\n}\n\nasync function ADDRESS_DUCKDB_WASM_HANDLER(method, params) {\n    try {\n        const c = await getConnection();\n        let result;\n\n        if (typeof method === 'string' && !params) {\n            result = await c.query(method);\n            return { success: true, result: result.toArray().map(row => row.toJSON()), output: \"Query successful\" };\n        }\n\n        switch (method.toLowerCase()) {\n            case 'query':\n                const sql = params.sql || params.query;\n                if (typeof sql !== 'string') {\n                    throw new Error('The \"sql\" parameter must be a string.');\n                }\n                result = await c.query(sql);\n                const resultArray = result.toArray().map(row => row.toJSON());\n                return { success: true, result: resultArray, output: JSON.stringify(resultArray) };\n\n            case 'status':\n                const db = await getDb();\n                return {\n                    success: true,\n                    result: {\n                        version: await db.getVersion(),\n                        featureFlags: await db.getFeatureFlags(),\n                        connection: dbConnection ? 'connected' : 'disconnected'\n                    }\n                };\n\n            case 'register_file_url':\n                const { url, name, protocol } = params;\n                const db_reg = await getDb();\n                await db_reg.registerFileURL(name, url, protocol || duckdb.DuckDBDataProtocol.HTTP, false);\n                return { success: true, output: `File '${name}' registered from URL.` };\n\n            default:\n                throw new Error(`Unsupported method: ${method}`);\n        }\n    } catch (error) {\n        return {\n            success: false,\n            result: null,\n            error: error.message,\n            output: '',\n            errorMessage: error.message,\n            errorCode: 1,\n        };\n    }\n}\n\nconst ADDRESS_DUCKDB_WASM_METHODS = {\n    query: {\n        description: \"Execute a SQL query.\",\n        params: [\"sql\"],\n        returns: \"The result of the query as an array of objects.\"\n    },\n    status: {\n        description: \"Get the status of the DuckDB service.\",\n        params: [],\n        returns: \"An object with status information.\"\n    },\n    register_file_url: {\n        description: \"Register a file from a URL.\",\n        params: [\"name\", \"url\", \"protocol\"],\n        returns: \"Status message.\"\n    }\n};\n\nif (typeof window !== 'undefined') {\n    window.DUCKDB_WASM_ADDRESS_META = DUCKDB_WASM_ADDRESS_META;\n    window.ADDRESS_DUCKDB_WASM_HANDLER = ADDRESS_DUCKDB_WASM_HANDLER;\n    window.ADDRESS_DUCKDB_WASM_METHODS = ADDRESS_DUCKDB_WASM_METHODS;\n} else if (typeof __webpack_require__.g !== 'undefined') {\n    __webpack_require__.g.DUCKDB_WASM_ADDRESS_META = DUCKDB_WASM_ADDRESS_META;\n    __webpack_require__.g.ADDRESS_DUCKDB_WASM_HANDLER = ADDRESS_DUCKDB_WASM_HANDLER;\n    __webpack_require__.g.ADDRESS_DUCKDB_WASM_METHODS = ADDRESS_DUCKDB_WASM_METHODS;\n}\n\n\n//# sourceURL=webpack://duckdb-wasm-address/./src/duckdb-wasm-address.js?\n}");

/***/ }),

/***/ "@duckdb/duckdb-wasm":
/*!**************************************!*\
  !*** external "@duckdb/duckdb-wasm" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
if(typeof __WEBPACK_EXTERNAL_MODULE__duckdb_duckdb_wasm__ === 'undefined') { var e = new Error("Cannot find module '@duckdb/duckdb-wasm'"); e.code = 'MODULE_NOT_FOUND'; throw e; }

module.exports = __WEBPACK_EXTERNAL_MODULE__duckdb_duckdb_wasm__;

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/duckdb-wasm-address.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});