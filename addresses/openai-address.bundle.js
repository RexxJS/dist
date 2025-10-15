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
		exports["openai-address"] = factory();
	else
		root["openai-address"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../node_modules/node-fetch/browser.js":
/*!******************************************************!*\
  !*** ../../../../node_modules/node-fetch/browser.js ***!
  \******************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";
eval("{\n\n// ref: https://github.com/tc39/proposal-global\nvar getGlobal = function () {\n\t// the only reliable means to get the global object is\n\t// `Function('return this')()`\n\t// However, this causes CSP violations in Chrome apps.\n\tif (typeof self !== 'undefined') { return self; }\n\tif (typeof window !== 'undefined') { return window; }\n\tif (typeof __webpack_require__.g !== 'undefined') { return __webpack_require__.g; }\n\tthrow new Error('unable to locate global object');\n}\n\nvar globalObject = getGlobal();\n\nmodule.exports = exports = globalObject.fetch;\n\n// Needed for TypeScript and Webpack.\nif (globalObject.fetch) {\n\texports[\"default\"] = globalObject.fetch.bind(globalObject);\n}\n\nexports.Headers = globalObject.Headers;\nexports.Request = globalObject.Request;\nexports.Response = globalObject.Response;\n\n\n//# sourceURL=webpack://openai-address/../../../../node_modules/node-fetch/browser.js?\n}");

/***/ }),

/***/ "./src/openai-address.js":
/*!*******************************!*\
  !*** ./src/openai-address.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("{/*!\n * rexxjs/openai-address v1.0.0 | (c) 2025 Paul Hammant | MIT License\n * @rexxjs-meta=OPENAI_ADDRESS_META\n */\n/**\n * OpenAI Chat Completions API ADDRESS Library - Provides AI chat operations via ADDRESS interface\n * This is an ADDRESS target library, not a functions library\n *\n * Usage:\n *   REQUIRE \"openai-address\" AS OPENAI\n *   ADDRESS OPENAI\n *   <<PROMPT\n *   model=gpt-3.5-turbo\n *   prompt=Say hello in one word\n *   PROMPT\n *\n * Environment Variable Required:\n *   OPENAI_API_KEY - Your OpenAI API key\n *\n * Copyright (c) 2025 Paul Hammant\n * Licensed under the MIT License\n */\n// Interpolation is provided via sourceContext.interpolation parameter\n\n// Active conversation state (single conversation at a time)\nlet activeConversation = null;  // { messages: [], system: string }\n\n// Consolidated metadata provider function\nfunction OPENAI_ADDRESS_META() {\n  return {\n    canonical: \"org.rexxjs/openai-address\",\n    type: \"address-handler\",\n    dependencies: {},\n    envVars: [\"OPENAI_API_KEY\"],\n    libraryMetadata: {\n      interpreterHandlesInterpolation: true\n    },\n    name: 'OpenAI Chat Completions Service',\n    version: '1.0.0',\n    description: 'OpenAI Chat Completions API integration via ADDRESS interface',\n    provides: {\n      addressTarget: 'openai',\n      handlerFunction: 'ADDRESS_OPENAI_HANDLER',\n      commandSupport: true,\n      methodSupport: true\n    },\n    requirements: {\n      environment: 'nodejs-or-browser',\n      modules: ['fetch'],\n      apiKey: 'OPENAI_API_KEY'\n    },\n    detectionFunction: 'OPENAI_ADDRESS_MAIN'\n  };\n}\n\n// Primary detection function with ADDRESS target metadata\nfunction OPENAI_ADDRESS_MAIN() {\n  return OPENAI_ADDRESS_META();\n}\n\n// ADDRESS target handler function with REXX variable management\nasync function ADDRESS_OPENAI_HANDLER(commandOrMethod, params, sourceContext) {\n  // Apply RexxJS variable interpolation\n  const variablePool = params || {};\n  const interpolate = sourceContext && sourceContext.interpolation ? sourceContext.interpolation.interpolate : (str => str);\n  const interpolatedCommand = typeof commandOrMethod === 'string'\n    ? interpolate(commandOrMethod, variablePool)\n    : commandOrMethod;\n\n  // Handle STATUS command (no API key required, never throws exceptions)\n  if (typeof interpolatedCommand === 'string' &&\n      interpolatedCommand.trim().toUpperCase() === 'STATUS') {\n    const apiKey = getApiKey();\n    const messageCount = activeConversation ? activeConversation.messages.length : 0;\n    let statusMessage;\n\n    if (apiKey) {\n      statusMessage = `OpenAI ADDRESS ready (${messageCount} messages in conversation)`;\n    } else {\n      statusMessage = `OpenAI ADDRESS ready (${messageCount} messages in conversation) - OPENAI_API_KEY not set`;\n    }\n\n    return formatOpenAIResultForREXX({\n      operation: 'STATUS',\n      success: true,\n      apiKeyConfigured: !!apiKey,\n      hasActiveConversation: !!activeConversation,\n      messageCount: messageCount,\n      message: statusMessage\n    });\n  }\n\n  try {\n    // Check API key availability for operations that need it\n    const apiKey = getApiKey();\n    if (!apiKey) {\n      throw new Error('OpenAI ADDRESS library requires OPENAI_API_KEY environment variable');\n    }\n\n    // Handle heredoc/multi-line key=value format (ADDRESS OPENAI <<LABEL)\n    // Detect heredoc by checking for key=value pattern (single or multi-line)\n    if (typeof interpolatedCommand === 'string' &&\n        /^\\s*\\w+=/.test(interpolatedCommand)) {\n      const parsedParams = parseKeyValueHeredoc(interpolatedCommand);\n      const result = await handleOpenAIHeredoc(parsedParams, apiKey);\n      return formatOpenAIResultForREXX(result);\n    }\n\n    // Handle CLOSE_CHAT command\n    if (typeof interpolatedCommand === 'string' &&\n        interpolatedCommand.trim().toUpperCase() === 'CLOSE_CHAT') {\n      const messageCount = activeConversation ? activeConversation.messages.length : 0;\n      activeConversation = null;\n      return formatOpenAIResultForREXX({\n        operation: 'CLOSE_CHAT',\n        success: true,\n        messageCount: messageCount,\n        message: `Conversation closed (${messageCount} messages)`\n      });\n    }\n\n    // Only heredoc format is supported\n    throw new Error('OpenAI ADDRESS only supports heredoc format (<<LABEL...LABEL), CLOSE_CHAT, or STATUS command');\n\n  } catch (error) {\n    const formattedError = formatOpenAIErrorForREXX(error);\n    throw new Error(error.message);\n  }\n}\n\n// Parse heredoc key=value format\nfunction parseKeyValueHeredoc(multilineText) {\n  const params = {};\n  const lines = multilineText.split('\\n');\n  let currentKey = null;\n  let currentValue = [];\n\n  for (const line of lines) {\n    const trimmed = line.trim();\n    if (!trimmed) continue;\n\n    // Check if this is a key=value line\n    const kvMatch = trimmed.match(/^(\\w+)=(.*)$/);\n    if (kvMatch) {\n      // Save previous key/value if exists\n      if (currentKey) {\n        params[currentKey] = currentValue.join('\\n').trim();\n      }\n      // Start new key/value\n      currentKey = kvMatch[1];\n      currentValue = [kvMatch[2]];\n    } else if (currentKey) {\n      // Continuation of previous value\n      currentValue.push(trimmed);\n    }\n  }\n\n  // Save last key/value\n  if (currentKey) {\n    params[currentKey] = currentValue.join('\\n').trim();\n  }\n\n  return params;\n}\n\n// Handle heredoc-style OpenAI request\nasync function handleOpenAIHeredoc(params, apiKey) {\n  const model = params.model || 'gpt-3.5-turbo';\n  const prompt = params.prompt || params.message || '';\n  const system = params.system || 'You are a helpful assistant.';\n  const temperature = params.temperature ? parseFloat(params.temperature) : undefined;\n  const maxTokens = params.max_tokens ? parseInt(params.max_tokens) : undefined;\n\n  if (!prompt) {\n    throw new Error('Heredoc format requires \"prompt=\" parameter');\n  }\n\n  // If no active conversation, start one with the system prompt\n  if (!activeConversation) {\n    activeConversation = {\n      messages: [],\n      system: system\n    };\n  }\n\n  // Add user message to conversation\n  activeConversation.messages.push({\n    role: 'user',\n    content: prompt\n  });\n\n  try {\n    // Make API call with full conversation history\n    const response = await callOpenAIAPI({\n      model: model,\n      messages: activeConversation.messages,\n      system: activeConversation.system,\n      temperature: temperature,\n      maxTokens: maxTokens\n    }, apiKey);\n\n    // Add assistant response to conversation\n    activeConversation.messages.push({\n      role: 'assistant',\n      content: response.content\n    });\n\n    return {\n      success: true,\n      response: response.content,\n      model: response.model,\n      tokensUsed: {\n        input: response.usage.prompt_tokens,\n        output: response.usage.completion_tokens,\n        total: response.usage.total_tokens\n      }\n    };\n  } catch (error) {\n    throw error;\n  }\n}\n\n// Get API key from environment or configuration\nfunction getApiKey() {\n  // Try environment variable first\n  if (typeof process !== 'undefined' && process.env && process.env.OPENAI_API_KEY) {\n    return process.env.OPENAI_API_KEY;\n  }\n\n  // Try global configuration\n  if (typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g.OPENAI_API_KEY) {\n    return __webpack_require__.g.OPENAI_API_KEY;\n  }\n\n  // Try window configuration (browser)\n  if (typeof window !== 'undefined' && window.OPENAI_API_KEY) {\n    return window.OPENAI_API_KEY;\n  }\n\n  return null;\n}\n\n// Make HTTP request to OpenAI API\nasync function callOpenAIAPI(session, apiKey) {\n  // Build messages array with system message first\n  const messages = [\n    { role: 'system', content: session.system },\n    ...session.messages\n  ];\n\n  const requestBody = {\n    model: session.model,\n    messages: messages\n  };\n\n  // Add optional parameters if provided\n  if (session.temperature !== undefined) {\n    requestBody.temperature = session.temperature;\n  }\n  if (session.maxTokens !== undefined) {\n    requestBody.max_tokens = session.maxTokens;\n  }\n\n  let fetchFn;\n  if (typeof fetch !== 'undefined') {\n    fetchFn = fetch;\n  } else if (true) {\n    // Node.js environment - try to require node-fetch\n    try {\n      fetchFn = __webpack_require__(/*! node-fetch */ \"../../../../node_modules/node-fetch/browser.js\");\n    } catch (e) {\n      throw new Error('OpenAI ADDRESS library requires fetch API or node-fetch module in Node.js');\n    }\n  } else // removed by dead control flow\n{}\n\n  const response = await fetchFn('https://api.openai.com/v1/chat/completions', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'Authorization': `Bearer ${apiKey}`\n    },\n    body: JSON.stringify(requestBody)\n  });\n\n  if (!response.ok) {\n    const errorData = await response.text();\n    throw new Error(`OpenAI API error ${response.status}: ${errorData}`);\n  }\n\n  const data = await response.json();\n\n  if (data.error) {\n    throw new Error(`OpenAI API error: ${data.error.message || 'Unknown error'}`);\n  }\n\n  if (!data.choices || data.choices.length === 0) {\n    throw new Error('OpenAI API returned no choices');\n  }\n\n  const choice = data.choices[0];\n  if (!choice.message || !choice.message.content) {\n    throw new Error('OpenAI API returned no content');\n  }\n\n  return {\n    content: choice.message.content,\n    model: data.model,\n    usage: data.usage\n  };\n}\n\n// ADDRESS target methods metadata\nconst ADDRESS_OPENAI_METHODS = {\n  chat: {\n    description: \"Send a message to OpenAI (with optional session ID)\",\n    params: [\"message\", \"chat_id\", \"system\"],\n    returns: \"object with OpenAI's response\"\n  },\n  message: {\n    description: \"Send a message to OpenAI (alias for chat)\",\n    params: [\"message\", \"chat_id\", \"system\"],\n    returns: \"object with OpenAI's response\"\n  },\n  start: {\n    description: \"Start a new chat session\",\n    params: [\"system\"],\n    returns: \"object with session ID\"\n  },\n  session: {\n    description: \"Start a new chat session (alias for start)\",\n    params: [\"system\"],\n    returns: \"object with session ID\"\n  },\n  end: {\n    description: \"End a chat session\",\n    params: [\"chat_id\"],\n    returns: \"object with session closure details\"\n  },\n  close: {\n    description: \"Close a chat session (alias for end)\",\n    params: [\"chat_id\"],\n    returns: \"object with session closure details\"\n  },\n  status: {\n    description: \"Get OpenAI service status\",\n    params: [],\n    returns: \"object with service information\"\n  }\n};\n\n// Format OpenAI result for proper REXX variable handling\nfunction formatOpenAIResultForREXX(result) {\n  const rexxResult = {\n    ...result, // Preserve original result structure\n    errorCode: 0  // Always 0 - REXX will check result.rc or result.success instead\n  };\n\n  // For heredoc prompts (success case)\n  if (result.success && result.response) {\n    rexxResult.output = result.response;\n    rexxResult.message = result.response;\n  }\n  // For session start, return session ID as RESULT\n  else if (result.operation === 'START_SESSION') {\n    rexxResult.output = result.sessionId.toString();\n  }\n  // For chat messages, return OpenAI's response as RESULT\n  else if (result.operation === 'CHAT_MESSAGE') {\n    rexxResult.output = result.response;\n    rexxResult.message = result.response;\n  }\n  // For session end or close chat, return confirmation message\n  else if (result.operation === 'END_SESSION' || result.operation === 'CLOSE_CHAT') {\n    rexxResult.output = result.message || `Conversation closed (${result.messageCount} messages)`;\n  }\n  // Default: return success message\n  else {\n    rexxResult.output = result.message || 'Operation completed';\n  }\n\n  return rexxResult;\n}\n\n// Format OpenAI error for proper REXX variable handling\nfunction formatOpenAIErrorForREXX(error) {\n  const rexxResult = {\n    operation: 'ERROR',\n    success: false,\n    errorCode: 1,\n    errorMessage: error.message,\n    output: error.message,\n    timestamp: new Date().toISOString()\n  };\n\n  return rexxResult;\n}\n\n// Export to global scope (required for REQUIRE system detection)\nif (typeof window !== 'undefined') {\n  // Browser environment\n  window.OPENAI_ADDRESS_META = OPENAI_ADDRESS_META;\n  window.OPENAI_ADDRESS_MAIN = OPENAI_ADDRESS_MAIN;\n  window.ADDRESS_OPENAI_HANDLER = ADDRESS_OPENAI_HANDLER;\n  window.ADDRESS_OPENAI_METHODS = ADDRESS_OPENAI_METHODS;\n} else if (typeof __webpack_require__.g !== 'undefined') {\n  // Node.js environment\n  __webpack_require__.g.OPENAI_ADDRESS_META = OPENAI_ADDRESS_META;\n  __webpack_require__.g.OPENAI_ADDRESS_MAIN = OPENAI_ADDRESS_MAIN;\n  __webpack_require__.g.ADDRESS_OPENAI_HANDLER = ADDRESS_OPENAI_HANDLER;\n  __webpack_require__.g.ADDRESS_OPENAI_METHODS = ADDRESS_OPENAI_METHODS;\n}\n\n\n//# sourceURL=webpack://openai-address/./src/openai-address.js?\n}");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/openai-address.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});