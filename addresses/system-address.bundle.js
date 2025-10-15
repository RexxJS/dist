/*!
 * @rexxjs-meta=SYSTEM_ADDRESS_META
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
		module.exports = factory((function webpackLoadOptionalExternalModule() { try { return require("child_process"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define(["child_process"], factory);
	else if(typeof exports === 'object')
		exports["system-address"] = factory((function webpackLoadOptionalExternalModule() { try { return require("child_process"); } catch(e) {} }()));
	else
		root["system-address"] = factory(root["child_process"]);
})(this, (__WEBPACK_EXTERNAL_MODULE_child_process__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/system-address.js":
/*!*******************************!*\
  !*** ./src/system-address.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("{/*!\n * rexxjs/system-address v1.0.0 | (c) 2025 RexxJS Project | MIT License\n * @rexxjs-meta=SYSTEM_ADDRESS_META\n */\n/**\n * System ADDRESS Library - Provides OS command execution via ADDRESS interface\n * This is an ADDRESS target library, not a functions library\n * \n * Usage:\n *   REQUIRE \"rexxjs/system-address\" AS SYSTEM\n *   ADDRESS SYSTEM\n *   \"ls -al\"\n *   \"echo 'Hello World'\"\n *   \"pwd\"\n *\n * Note: Only works in Node.js environment (command-line mode)\n * \n * Copyright (c) 2025 Paul Hammant\n * Licensed under the MIT License\n */\n\n/**\n * System ADDRESS Handler Class\n * Maintains persistent options state across command invocations\n */\nclass SystemAddressHandler {\n  constructor() {\n    // Persistent options that apply to all subsequent commands\n    this.persistentOptions = {\n      auto_exit: true,      // Automatically add 'set -e' for multi-line scripts\n      shell: '/bin/sh',     // Default shell\n      timeout: 30000,       // Default timeout in ms\n      combine_stderr: false // Combine stderr with stdout\n    };\n  }\n\n  /**\n   * Parse @options directive and update persistent options\n   */\n  updateOptions(optionsString) {\n    const optionsPart = optionsString.replace('@options', '').trim();\n\n    if (!optionsPart) {\n      // Empty @options - do nothing\n      return {\n        success: true,\n        operation: 'SET_OPTIONS',\n        message: 'Options unchanged',\n        options: { ...this.persistentOptions }\n      };\n    }\n\n    // Parse space-separated key=value pairs\n    const pairs = optionsPart.split(/\\s+/);\n\n    for (const pair of pairs) {\n      const eqIndex = pair.indexOf('=');\n      if (eqIndex === -1) continue;\n\n      const key = pair.slice(0, eqIndex).trim();\n      const value = pair.slice(eqIndex + 1).trim();\n\n      if (key) {\n        this.persistentOptions[key] = this.parseValue(value);\n      }\n    }\n\n    return {\n      success: true,\n      operation: 'SET_OPTIONS',\n      message: 'Options updated',\n      options: { ...this.persistentOptions }\n    };\n  }\n\n  /**\n   * Parse option value (convert strings to appropriate types)\n   */\n  parseValue(value) {\n    if (value === 'true') return true;\n    if (value === 'false') return false;\n    if (!isNaN(value)) return Number(value);\n    return value;\n  }\n\n  /**\n   * Main command handler\n   */\n  async handleCommand(commandOrMethod, params) {\n    // Check if it's an @options directive\n    if (typeof commandOrMethod === 'string' && commandOrMethod.trim().startsWith('@options')) {\n      return this.updateOptions(commandOrMethod);\n    }\n\n    // Merge persistent options with any one-time params\n    const options = { ...this.persistentOptions };\n\n    // Handle command-string style (traditional Rexx ADDRESS)\n    if (typeof commandOrMethod === 'string' && !params) {\n      return handleSystemCommand(commandOrMethod, options)\n        .then(result => formatSystemResultForREXX(result))\n        .catch(error => {\n          throw new Error(error.message);\n        });\n    }\n\n    // Handle method-call style (modern convenience)\n    let resultPromise;\n    switch (commandOrMethod.toLowerCase()) {\n      case 'execute':\n      case 'run':\n        const executeOptions = { ...options };\n        // Override with params if provided\n        if (params.combine_stderr !== undefined) {\n          executeOptions.combineStderr = params.combine_stderr === true || params.combine_stderr === 'true';\n        }\n        if (params.shell) {\n          executeOptions.shell = params.shell;\n        }\n        if (params.auto_exit !== undefined) {\n          executeOptions.auto_exit = params.auto_exit === true || params.auto_exit === 'true';\n        }\n        resultPromise = handleSystemCommand(params.command || params.cmd, executeOptions);\n        break;\n\n      case 'exec':\n        const execOptions = { ...options, ...(params.options || {}) };\n        if (params.combine_stderr !== undefined) {\n          execOptions.combineStderr = params.combine_stderr === true || params.combine_stderr === 'true';\n        }\n        if (params.shell) {\n          execOptions.shell = params.shell;\n        }\n        if (params.auto_exit !== undefined) {\n          execOptions.auto_exit = params.auto_exit === true || params.auto_exit === 'true';\n        }\n        resultPromise = handleSystemCommand(params.command || params.cmd, execOptions);\n        break;\n\n      case 'status':\n        resultPromise = Promise.resolve({\n          service: 'system',\n          version: process.version,\n          platform: process.platform,\n          arch: process.arch,\n          cwd: process.cwd(),\n          options: { ...this.persistentOptions },\n          methods: ['execute', 'run', 'exec', 'status'],\n          timestamp: new Date().toISOString(),\n          success: true\n        });\n        break;\n\n      default:\n        // Try to interpret as a direct system command\n        resultPromise = handleSystemCommand(commandOrMethod, options);\n        break;\n    }\n\n    return resultPromise.then(result => {\n      return formatSystemResultForREXX(result);\n    }).catch(error => {\n      throw new Error(error.message);\n    });\n  }\n}\n\n// System ADDRESS metadata function\nfunction SYSTEM_ADDRESS_META() {\n  // Check Node.js availability - fail fast if wrong environment\n  if (typeof process === 'undefined' || !process.versions || !process.versions.node) {\n    throw new Error('System ADDRESS library requires Node.js environment (not available in browser/web)');\n  }\n\n  return {\n    canonical: \"org.rexxjs/system-address\",\n    type: 'address-handler',\n    name: 'System Command Service',\n    version: '1.0.0',\n    description: 'OS command execution via ADDRESS interface with persistent options',\n    provides: {\n      addressTarget: 'system',\n      handlerFunction: 'ADDRESS_SYSTEM_HANDLER',\n      commandSupport: true,  // Indicates support for command-string style\n      methodSupport: true,   // Also supports method-call style for convenience\n      optionsDirective: true // Supports @options directive for persistent configuration\n    },\n    dependencies: {},\n    nodeonly: true,\n    envVars: [],\n    loaded: true,\n    requirements: {\n      environment: 'nodejs',\n      modules: ['child_process']\n    }\n  };\n}\n\n// Create singleton handler instance\nconst systemHandlerInstance = new SystemAddressHandler();\n\n// ADDRESS target handler function - delegates to singleton\nfunction ADDRESS_SYSTEM_HANDLER(commandOrMethod, params) {\n  // Check if we're in Node.js environment\n  if (typeof process === 'undefined' || !process.versions || !process.versions.node) {\n    throw new Error('System ADDRESS library only available in Node.js environment');\n  }\n\n  try {\n    return systemHandlerInstance.handleCommand(commandOrMethod, params);\n  } catch (error) {\n    if (error.code === 'MODULE_NOT_FOUND') {\n      throw new Error('System ADDRESS library requires child_process module (built into Node.js)');\n    }\n    throw error;\n  }\n}\n\n// Handle direct system command strings\nfunction handleSystemCommand(command, options = {}) {\n  return new Promise((resolve, reject) => {\n    const cmd = command.trim();\n\n    // Handle empty commands\n    if (!cmd) {\n      resolve({\n        operation: 'NOOP',\n        success: true,\n        message: 'Empty command - no operation performed',\n        stdout: '',\n        stderr: '',\n        exitCode: 0,\n        timestamp: new Date().toISOString()\n      });\n      return;\n    }\n\n    try {\n      const { execSync } = __webpack_require__(/*! child_process */ \"child_process\");\n\n      // Detect multi-line scripts\n      const isMultiLine = cmd.includes('\\n');\n\n      // Handle shell selection\n      let actualCommand = cmd;\n      let shell = options.shell || '/bin/sh'; // Default to /bin/sh for POSIX compatibility\n\n      // Auto-add 'set -e' for multi-line scripts (unless disabled)\n      const autoExit = options.auto_exit !== false; // Default true\n      if (isMultiLine && autoExit) {\n        // Prepend 'set -e' to exit on first error\n        actualCommand = 'set -e\\n' + actualCommand;\n      }\n\n      // Handle REXX-style stderr combination\n      const combineStderr = options.combineStderr === true;\n      if (combineStderr) {\n        // Use REXX-programmatic approach: modify command to combine stderr with stdout\n        actualCommand = `${actualCommand} 2>&1`;\n      }\n      \n      // Validate shell path (basic security check)\n      const validShells = ['/bin/sh', '/bin/bash', '/usr/bin/bash', 'bash', '/bin/zsh', '/usr/bin/zsh', 'zsh', '/bin/dash', '/usr/bin/dash'];\n      if (!validShells.includes(shell) && !shell.includes('/')) {\n        // Fallback to default shell for security\n        shell = '/bin/sh';\n      }\n      \n      // Extract REXX-specific options from execSync options\n      const { combineStderr: _, shell: __, ...cleanOptions } = options;\n      \n      // Default options for execSync - use shell option directly\n      const execOptions = {\n        encoding: 'utf8',\n        maxBuffer: 1024 * 1024, // 1MB buffer\n        timeout: 30000, // 30 second timeout\n        shell: shell, // Use the specified shell\n        ...cleanOptions\n      };\n      \n      let stdout = '';\n      let stderr = '';\n      let exitCode = 0;\n      \n      try {\n        stdout = execSync(actualCommand, execOptions);\n        // Remove trailing newline if present\n        if (stdout.endsWith('\\n')) {\n          stdout = stdout.slice(0, -1);\n        }\n      } catch (error) {\n        exitCode = error.status || 1;\n        \n        if (combineStderr) {\n          // When stderr is combined, both stdout and stderr are in the stdout stream\n          stdout = error.stdout ? error.stdout.toString() : '';\n          stderr = ''; // stderr was combined into stdout\n        } else {\n          stderr = error.stderr ? error.stderr.toString() : error.message;\n          stdout = error.stdout ? error.stdout.toString() : '';\n        }\n        \n        // For non-zero exit codes, we still resolve (not reject) to allow proper REXX handling\n        resolve({\n          operation: 'EXECUTE',\n          command: cmd, // Keep original command in result\n          actualCommand: actualCommand, // Show what was actually executed\n          shell: shell, // Include shell information\n          success: false,\n          exitCode: exitCode,\n          stdout: stdout,\n          stderr: stderr,\n          combineStderr: combineStderr,\n          message: `Command exited with code ${exitCode}`,\n          timestamp: new Date().toISOString()\n        });\n        return;\n      }\n      \n      resolve({\n        operation: 'EXECUTE',\n        command: cmd, // Keep original command in result\n        actualCommand: actualCommand, // Show what was actually executed\n        shell: shell, // Include shell information\n        success: true,\n        exitCode: exitCode,\n        stdout: stdout,\n        stderr: stderr,\n        combineStderr: combineStderr,\n        message: 'Command executed successfully',\n        timestamp: new Date().toISOString()\n      });\n      \n    } catch (error) {\n      reject(new Error(`System command execution failed: ${error.message}`));\n    }\n  });\n}\n\n// ADDRESS target methods metadata\nconst ADDRESS_SYSTEM_METHODS = {\n  execute: {\n    description: \"Execute a system command\",\n    params: [\"command\", \"combine_stderr\", \"shell\"],\n    returns: \"object with execution details\"\n  },\n  run: {\n    description: \"Run a system command (alias for execute)\",\n    params: [\"command\", \"combine_stderr\", \"shell\"],\n    returns: \"object with execution details\"\n  },\n  exec: {\n    description: \"Execute a system command with options\",\n    params: [\"command\", \"options\", \"combine_stderr\", \"shell\"],\n    returns: \"object with execution details\"\n  },\n  status: {\n    description: \"Get system service status\",\n    params: [],\n    returns: \"object with service information\"\n  }\n};\n\n// Format system result for proper REXX variable handling\nfunction formatSystemResultForREXX(result) {\n  // Set up result object with standard REXX fields\n  // RESULT = stdout, RC = exit code, ERRORTEXT = stderr (only when present)\n  const rexxResult = {\n    ...result, // Preserve original result structure (including operation, success, etc.)\n    output: result.stdout || result.message || '', // RESULT variable content\n    errorCode: result.exitCode || 0, // RC variable content\n  };\n  \n  // Only set errorMessage if there's actually an error message\n  if (result.stderr && result.stderr.length > 0) {\n    rexxResult.errorMessage = result.stderr;\n  }\n  \n  return rexxResult;\n}\n\n// Format system error for proper REXX variable handling\nfunction formatSystemErrorForREXX(error) {\n  const rexxResult = {\n    operation: 'ERROR',\n    success: false,\n    errorCode: 1, // RC = 1 for general error\n    errorMessage: error.message, // ERRORTEXT = error message\n    output: '', // RESULT = empty on error\n    timestamp: new Date().toISOString()\n  };\n  \n  return rexxResult;\n}\n\n// Export to global scope (required for REQUIRE system detection)\nif (typeof window !== 'undefined') {\n  // Browser environment (though this won't work due to Node.js dependency)\n  window.SYSTEM_ADDRESS_META = SYSTEM_ADDRESS_META;\n  window.ADDRESS_SYSTEM_HANDLER = ADDRESS_SYSTEM_HANDLER;\n  window.ADDRESS_SYSTEM_METHODS = ADDRESS_SYSTEM_METHODS;\n} else if (typeof __webpack_require__.g !== 'undefined') {\n  // Node.js environment\n  __webpack_require__.g.SYSTEM_ADDRESS_META = SYSTEM_ADDRESS_META;\n  __webpack_require__.g.ADDRESS_SYSTEM_HANDLER = ADDRESS_SYSTEM_HANDLER;\n  __webpack_require__.g.ADDRESS_SYSTEM_METHODS = ADDRESS_SYSTEM_METHODS;\n}\n\n//# sourceURL=webpack://system-address/./src/system-address.js?\n}");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
if(typeof __WEBPACK_EXTERNAL_MODULE_child_process__ === 'undefined') { var e = new Error("Cannot find module 'child_process'"); e.code = 'MODULE_NOT_FOUND'; throw e; }

module.exports = __WEBPACK_EXTERNAL_MODULE_child_process__;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/system-address.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});