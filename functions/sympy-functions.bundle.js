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
		exports["sympy-functions"] = factory();
	else
		root["sympy-functions"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./sympy-functions.js":
/*!****************************!*\
  !*** ./sympy-functions.js ***!
  \****************************/
/***/ ((module) => {

eval("{/**\n * SymPy-inspired Symbolic Math Functions\n * for RexxJS.\n */\n\n// Base class for all symbolic expressions\nclass Expr {\n  constructor() {\n    if (this.constructor === Expr) {\n      throw new Error(\"Abstract class Expr cannot be instantiated directly.\");\n    }\n  }\n\n  // These methods allow for building expressions like: x.add(y).mul(2)\n  add(other) {\n    return new Add(this, _to_expr(other));\n  }\n\n  mul(other) {\n    return new Mul(this, _to_expr(other));\n  }\n\n  pow(other) {\n    return new Pow(this, _to_expr(other));\n  }\n\n  // A generic differentiation method\n  diff(s) {\n    throw new Error(`diff() not implemented for ${this.constructor.name}`);\n  }\n}\n\n// Represents a symbolic variable\nclass Symbol extends Expr {\n  constructor(name) {\n    super();\n    this.name = name;\n  }\n\n  toString() {\n    return this.name;\n  }\n\n  diff(s) {\n    return this.name === s.name ? new Num(1) : new Num(0);\n  }\n}\n\n// Represents a numeric literal\nclass Num extends Expr {\n  constructor(value) {\n    super();\n    if (typeof value !== 'number') {\n      throw new Error(\"Num value must be a number.\");\n    }\n    this.value = value;\n  }\n\n  toString() {\n    return this.value.toString();\n  }\n\n  diff(s) {\n    return new Num(0);\n  }\n}\n\n// Helper to convert numbers to Num objects\nconst _to_expr = (val) => {\n  if (val instanceof Expr) {\n    return val;\n  } else if (typeof val === 'number') {\n    return new Num(val);\n  } else {\n    throw new Error(`Cannot convert ${val} to an expression.`);\n  }\n}\n\n// Represents addition\nclass Add extends Expr {\n  constructor(a, b) {\n    super();\n    this.a = _to_expr(a);\n    this.b = _to_expr(b);\n  }\n\n  toString() {\n    return `(${this.a.toString()} + ${this.b.toString()})`;\n  }\n\n  diff(s) {\n    return this.a.diff(s).add(this.b.diff(s));\n  }\n}\n\n// Represents multiplication\nclass Mul extends Expr {\n  constructor(a, b) {\n    super();\n    this.a = _to_expr(a);\n    this.b = _to_expr(b);\n  }\n\n  toString() {\n    return `(${this.a.toString()} * ${this.b.toString()})`;\n  }\n\n  diff(s) {\n    const f = this.a;\n    const g = this.b;\n    const df = f.diff(s);\n    const dg = g.diff(s);\n    return df.mul(g).add(f.mul(dg));\n  }\n}\n\n// Represents a power\nclass Pow extends Expr {\n  constructor(base, exp) {\n    super();\n    this.base = _to_expr(base);\n    this.exp = _to_expr(exp);\n  }\n\n  toString() {\n    return `(${this.base.toString()}**${this.exp.toString()})`;\n  }\n\n  diff(s) {\n    const base = this.base;\n    const exp = this.exp;\n\n    if (exp instanceof Num) {\n      const n = exp.value;\n      const u = base;\n      const du_dx = u.diff(s);\n      // n * u**(n-1) * du_dx\n      return _to_expr(n).mul(u.pow(n - 1)).mul(du_dx);\n    } else {\n      throw new Error(\"Differentiation of symbolic exponents is not supported yet.\");\n    }\n  }\n}\n\nconst sympyFunctions = {\n  // Factory function for creating symbols\n  'SY_SYMBOL': (name) => {\n    if (typeof name !== 'string' || name.length === 0) {\n      throw new Error(\"Symbol name must be a non-empty string.\");\n    }\n    return new Symbol(name);\n  },\n\n  // Factory function for creating numbers, useful for explicit construction\n  'SY_NUM': (value) => {\n    if (typeof value !== 'number') {\n      throw new Error(\"Numeric value must be a number.\");\n    }\n    return new Num(value);\n  },\n\n  'SY_DIFF': (expr, sym) => {\n    if (!(expr instanceof Expr)) {\n      expr = _to_expr(expr);\n    }\n    if (!(sym instanceof Symbol)) {\n      throw new Error(\"The variable to differentiate with respect to must be a symbol.\");\n    }\n    return expr.diff(sym);\n  },\n\n  // Expose classes for type checking if needed later\n  __internal__: {\n    Expr,\n    Symbol,\n    Num,\n    Add,\n    Mul,\n    Pow,\n    _to_expr\n  }\n};\n\n// Detection function for REQUIRE system\nsympyFunctions.SYMPY_FUNCTIONS_MAIN = () => ({\n    type: 'library_info',\n    name: 'SymPy Functions',\n    version: '1.0.0',\n    loaded: true\n});\n\n// Export for both Node.js and browser environments\nif ( true && module.exports) {\n  module.exports = { \n    sympyFunctions: {\n      ...sympyFunctions,\n      __internal__: { Expr, Symbol, Num, Add, Mul, Pow }\n    },\n    ...sympyFunctions,\n    SYMPY_FUNCTIONS_MAIN: sympyFunctions.SYMPY_FUNCTIONS_MAIN\n  };\n} else if (typeof window !== 'undefined') {\n  Object.assign(window, sympyFunctions);\n  window.SYMPY_FUNCTIONS_MAIN = sympyFunctions.SYMPY_FUNCTIONS_MAIN;\n}\n\n\n//# sourceURL=webpack://sympy-functions/./sympy-functions.js?\n}");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./sympy-functions.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});