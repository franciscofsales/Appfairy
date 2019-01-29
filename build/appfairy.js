require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpile", function() { return transpile; });
/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cheerio__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _git__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _libs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var _writers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }








const defaultPublicSubFolders = ["css", "fonts", "images", "js"];

const transpile = (() => {
  var _ref = _asyncToGenerator(function* (config) {
    let inputFiles;
    let outputFiles = [];
    try {
      yield Promise.all([_libs__WEBPACK_IMPORTED_MODULE_3__["fs"].readdir(config.input).then(function (files) {
        inputFiles = files;
      }), _git__WEBPACK_IMPORTED_MODULE_2__["default"].removeAppfairyFiles(config).then(function (files) {
        outputFiles.push(...files);
      })]);
    } catch (e) {
      console.log(e);
    }

    const folders = inputFiles.filter(function (file) {
      return !path__WEBPACK_IMPORTED_MODULE_1___default.a.extname(file).length && !defaultPublicSubFolders.includes(file);
    });
    try {
      yield Promise.all(folders.map(function (folder) {
        return _libs__WEBPACK_IMPORTED_MODULE_3__["fs"].readdir(`${config.input}/${folder}`).then(function (files) {
          inputFiles = [...(inputFiles || []), ...(files || []).map(function (file) {
            return `${folder}/${file}`;
          })];
        });
      }));
    } catch (e) {
      console.log(e);
    }
    const htmlFiles = inputFiles.filter(function (file) {
      return path__WEBPACK_IMPORTED_MODULE_1___default.a.extname(file) == ".html";
    });

    const publicSubDirs = inputFiles.filter(function (file) {
      return !path__WEBPACK_IMPORTED_MODULE_1___default.a.extname(file) && defaultPublicSubFolders.includes(file);
    });

    const scriptWriter = new _writers__WEBPACK_IMPORTED_MODULE_5__["ScriptWriter"]({
      baseUrl: config.input,
      prefetch: config.prefetch
    });

    const styleWriter = new _writers__WEBPACK_IMPORTED_MODULE_5__["StyleWriter"]({
      baseUrl: config.input,
      prefetch: config.prefetch,
      source: config.srouce
    });

    const transpilingHTMLFiles = htmlFiles.map(function (htmlFile) {
      return transpileHTMLFile(config, htmlFile, scriptWriter, styleWriter);
    });
    const viewWriters = yield Promise.all(transpilingHTMLFiles);
    const writingFiles = Promise.all([_writers__WEBPACK_IMPORTED_MODULE_5__["ViewWriter"].writeAll(viewWriters, config.output.src.views, config.output.src.components, config.output.src.meta, config.output.src.styles, config.output.src.controllers).then(function (paths) {
      return outputFiles.push(...paths);
    }),
    // scriptWriter.write(
    //   config.output.src.scripts
    // ).then((paths) => outputFiles.push(...paths)),
    styleWriter.write(config.output.src.styles).then(function (paths) {
      return outputFiles.push(...paths);
    })]);

    const makingPublicDir = makePublicDir(config, publicSubDirs).then(function (paths) {
      return outputFiles.push(...paths);
    });
    try {
      yield Promise.all([writingFiles, makingPublicDir]);
    } catch (e) {
      console.log(e);
    }

    return _git__WEBPACK_IMPORTED_MODULE_2__["default"].add(outputFiles, config).then(function (files) {
      return _git__WEBPACK_IMPORTED_MODULE_2__["default"].commit(files, "Update design");
    });
  });

  return function transpile(_x) {
    return _ref.apply(this, arguments);
  };
})();

const transpileHTMLFile = (() => {
  var _ref2 = _asyncToGenerator(function* (config, htmlFile, scriptWriter, styleWriter) {
    const html = (yield _libs__WEBPACK_IMPORTED_MODULE_3__["fs"].readFile(`${config.input}/${htmlFile}`)).toString();
    const $ = cheerio__WEBPACK_IMPORTED_MODULE_0___default.a.load(html);
    const $head = $("head");
    if (!!scriptWriter && !!styleWriter) {
      // pass
    }
    const $body = $("body");
    const viewWriter = new _writers__WEBPACK_IMPORTED_MODULE_5__["ViewWriter"]({
      name: htmlFile.split('/')[htmlFile.split('/').length - 1].split(".").slice(0, -1).join("."),
      baseUrl: config.baseUrl,
      parent: htmlFile.split('/')[0] === htmlFile ? null : htmlFile.split('/')[0],
      isComponent: false,
      source: config.source
    });

    // setScripts(scriptWriter, $head, $)

    setStyles(viewWriter, styleWriter, $head, $, config.output.src.styles);
    setHTML(viewWriter, $body, $);

    return viewWriter;
  });

  return function transpileHTMLFile(_x2, _x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})();

const makePublicDir = (() => {
  var _ref3 = _asyncToGenerator(function* (config, publicSubDirs) {
    const publicDir = config.output.public;
    yield Promise.all(publicSubDirs.map(function (publicSubDir) {
      return Object(_libs__WEBPACK_IMPORTED_MODULE_3__["ncp"])(`${config.input}/${publicSubDir}`, `${publicDir}/${publicSubDir}`);
    }));

    // Resolving relative paths
    const filePaths = yield Object(_libs__WEBPACK_IMPORTED_MODULE_3__["reread"])(config.input);

    const relativePaths = filePaths.map(function (filePath) {
      const relativePath = path__WEBPACK_IMPORTED_MODULE_1___default.a.relative(config.input, filePath);

      return `${publicDir}/${relativePath}`;
    });

    // Encapsulate CSS files
    yield Promise.all(relativePaths.map((() => {
      var _ref4 = _asyncToGenerator(function* (relativePath) {
        if (path__WEBPACK_IMPORTED_MODULE_1___default.a.extname(relativePath) != ".css") return;

        let css = (yield _libs__WEBPACK_IMPORTED_MODULE_3__["fs"].readFile(relativePath)).toString();
        if (relativePath.split('/')[relativePath.split('/').length - 1] !== 'normalize.css') {
          css = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["encapsulateCSS"])(css, config.source);
        }
        yield _libs__WEBPACK_IMPORTED_MODULE_3__["fs"].writeFile(relativePath, css);
      });

      return function (_x8) {
        return _ref4.apply(this, arguments);
      };
    })()));

    return relativePaths;
  });

  return function makePublicDir(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
})();

// const setScripts = (scriptWriter, $head) => {
//   const $scripts = $head.find('script[type="text/javascript"]')

//   $scripts.each((i, script) => {
//     const $script = $head.find(script)

//     scriptWriter.setScript($script.attr('src'), $script.html())
//   })
// }

const setStyles = (viewWriter, styleWriter, $head, _, stylesDir) => {
  let $styles;

  $styles = $head.find('link[rel="stylesheet"][type="text/css"]');

  $styles.each((i, style) => {
    const $style = $head.find(style);

    viewWriter.setStyle($style.attr("href"), $style.html(), stylesDir);
    styleWriter.setStyle($style.attr("href"), $style.html());
  });

  $styles = $head.find("style");

  $styles.each((i, style) => {
    const $style = $head.find(style);

    viewWriter.setStyle($style.attr("href"), $style.html(), stylesDir);
    styleWriter.setStyle($style.attr("href"), $style.html());
  });
};

const setHTML = (viewWriter, $body, $) => {
  // Create a wrap around $body so we can inherit its style without actually
  // using a <body> tag
  const $div = $("<div>");
  $div.html($body.html());
  $div.attr($body.attr());
  viewWriter.html = $.html($div);
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commit", function() { return commit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAppfairyFiles", function() { return removeAppfairyFiles; });
/* harmony import */ var execa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var execa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(execa__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rimraf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var rimraf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rimraf__WEBPACK_IMPORTED_MODULE_2__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




// import { fs } from "./libs";

// attempt at supporting windows by monkey patching path.relative
// to prevent backslashes
const orPathRel = path__WEBPACK_IMPORTED_MODULE_1___default.a.relative;
path__WEBPACK_IMPORTED_MODULE_1___default.a.relative = (from, to) => orPathRel(from, to).replace(/\\/gi, '/');

// Will add given files and will ignore those who aren't exist
const add = (() => {
  var _ref = _asyncToGenerator(function* (files, config) {
    const { stdout: root } = yield execa__WEBPACK_IMPORTED_MODULE_0___default()("git", ["rev-parse", "--show-toplevel"]);

    files = files.map(function (file) {
      return path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(root, file);
    });

    let unstaged = yield Promise.all([execa__WEBPACK_IMPORTED_MODULE_0___default()("git", ["diff", "--name-only"]), execa__WEBPACK_IMPORTED_MODULE_0___default()("git", ["ls-files", "--others", "--exclude-standard"])]).then(function (results) {
      return results.reduce(function (unstaged, { stdout }) {
        return unstaged.concat(stdout.split("\n").filter(Boolean));
      }, []);
    });

    unstaged = unstaged.map(function (file) {
      return path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(root, file);
    });
    files = files.filter(function (file) {
      return unstaged.includes(file);
    });
    yield execa__WEBPACK_IMPORTED_MODULE_0___default()("git", ["add", ...files, `${config.output.src.root}/routes.js`, config.output.src.views, config.output.src.components, config.output.src.styles, config.output.server, config.output.public]);

    return [...files, `${config.output.src.root}/routes.js`, config.output.src.views, config.output.src.components, config.output.src.styles, config.output.server, config.output.public];
  });

  return function add(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

// Will commit changes, and if files not exist, will print status
const commit = (files, message, stdio = "inherit") => {
  if (files && files.length) try {
    return execa__WEBPACK_IMPORTED_MODULE_0___default()("git", ["commit", "-m", `update: ${message}`, '--allow-empty'], {
      stdio
    });
  } catch (e) {
    // Probably no changes were made
  }

  return execa__WEBPACK_IMPORTED_MODULE_0___default()("git", ["status"], {
    stdio
  });
};

const removeAppfairyFiles = (() => {
  var _ref2 = _asyncToGenerator(function* (config) {
    const { stdout: diffFiles } = yield execa__WEBPACK_IMPORTED_MODULE_0___default()("git", ["diff", "--name-only"]);

    if (diffFiles) {
      // throw Error(
      //   [
      //     "Cannot transpile: Your index contains uncommitted changes.",
      //     "Please commit or stash them."
      //   ].join("\n")
      // );
      console.log(['=========', 'Warning: You have uncommitted changes!', '========='].join('\n'));
    }

    // let { stderr, stdout: hash } = await execa("git", [
    //   "log",
    //   "-1",
    //   "--format=%H",
    //   `--grep=appfairy: Update design`
    // ]);

    // // Probably git is not initialized
    // if (stderr) throw Error(stderr);
    // // No previous migrations found
    // if (!hash) return [];

    // List all files but deleted ones
    // let { stdout: files } = await execa("git", [
    //   "diff",
    //   "--name-only",
    //   "--diff-filter=ACMRTUXB",
    //   `${hash}~1`,
    //   hash
    // ]);
    // files = files.split("\n").filter(Boolean);
    // console.log(files)

    // const { stdout: root } = await execa("git", ["rev-parse", "--show-toplevel"]);

    yield Promise.all([
    // ...files.map(async file => {
    //   return fs.unlink(`${root}/${file}`);
    // }),
    new Promise(function (res) {
      return rimraf__WEBPACK_IMPORTED_MODULE_2___default()(`${config.output.src.root}/routes.js`, function () {
        return res();
      });
    }), new Promise(function (res) {
      return rimraf__WEBPACK_IMPORTED_MODULE_2___default()(config.output.server, function () {
        return res();
      });
    }), new Promise(function (res) {
      return rimraf__WEBPACK_IMPORTED_MODULE_2___default()(config.output.src.views, function () {
        return res();
      });
    }), new Promise(function (res) {
      return rimraf__WEBPACK_IMPORTED_MODULE_2___default()(config.output.src.components, function () {
        return res();
      });
    }), new Promise(function (res) {
      return rimraf__WEBPACK_IMPORTED_MODULE_2___default()(config.output.src.styles, function () {
        return res();
      });
    })]);

    // return [...files||[]];
    return [`${config.output.src.root}/routes.js`, config.output.src.views, config.output.src.components, config.output.src.styles, config.output.server, config.output.public];
  });

  return function removeAppfairyFiles(_x3) {
    return _ref2.apply(this, arguments);
  };
})();

/* harmony default export */ __webpack_exports__["default"] = ({
  add,
  commit,
  removeAppfairyFiles
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("execa");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("rimraf");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fs", function() { return _fs__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _mkdirp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mkdirp", function() { return _mkdirp__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _ncp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ncp", function() { return _ncp__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _reread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reread", function() { return _reread__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _rimraf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rimraf", function() { return _rimraf__WEBPACK_IMPORTED_MODULE_4__["default"]; });







/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mkdir", function() { return mkdir; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readdir", function() { return readdir; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readFile", function() { return readFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stat", function() { return stat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unlink", function() { return unlink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeFile", function() { return writeFile; });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);



const mkdir = Object(util__WEBPACK_IMPORTED_MODULE_1__["promisify"])(fs__WEBPACK_IMPORTED_MODULE_0___default.a.mkdir);
const readdir = Object(util__WEBPACK_IMPORTED_MODULE_1__["promisify"])(fs__WEBPACK_IMPORTED_MODULE_0___default.a.readdir);
const readFile = Object(util__WEBPACK_IMPORTED_MODULE_1__["promisify"])(fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFile);
const stat = Object(util__WEBPACK_IMPORTED_MODULE_1__["promisify"])(fs__WEBPACK_IMPORTED_MODULE_0___default.a.stat);
const unlink = Object(util__WEBPACK_IMPORTED_MODULE_1__["promisify"])(fs__WEBPACK_IMPORTED_MODULE_0___default.a.unlink);
const writeFile = Object(util__WEBPACK_IMPORTED_MODULE_1__["promisify"])(fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFile);

/* harmony default export */ __webpack_exports__["default"] = ({
  mkdir,
  readdir,
  readFile,
  stat,
  unlink,
  writeFile
});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs_extra__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);



/* harmony default export */ __webpack_exports__["default"] = (Object(util__WEBPACK_IMPORTED_MODULE_1__["promisify"])(fs_extra__WEBPACK_IMPORTED_MODULE_0___default.a.mkdirp));

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs_extra__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);



/* harmony default export */ __webpack_exports__["default"] = (Object(util__WEBPACK_IMPORTED_MODULE_1__["promisify"])(fs_extra__WEBPACK_IMPORTED_MODULE_0___default.a.copy));

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var recursive_readdir__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var recursive_readdir__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(recursive_readdir__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);



/* harmony default export */ __webpack_exports__["default"] = (Object(util__WEBPACK_IMPORTED_MODULE_1__["promisify"])(recursive_readdir__WEBPACK_IMPORTED_MODULE_0___default.a));

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("recursive-readdir");

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs_extra__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);



/* harmony default export */ __webpack_exports__["default"] = (Object(util__WEBPACK_IMPORTED_MODULE_1__["promisify"])(fs_extra__WEBPACK_IMPORTED_MODULE_0___default.a.remove));

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escape", function() { return escape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encapsulateCSS", function() { return encapsulateCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "freeText", function() { return freeText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "freeLint", function() { return freeLint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "freeContext", function() { return freeContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "freeScope", function() { return freeScope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "upperFirst", function() { return upperFirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitWords", function() { return splitWords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "padLeft", function() { return padLeft; });
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Internal", function() { return _internal__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _requireText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requireText", function() { return _requireText__WEBPACK_IMPORTED_MODULE_1__["default"]; });




// Useful for nested strings that should be evaluated
const escape = (str, quote) => {
  str = str.replace(/\\/g, '\\\\');

  switch (quote) {
    case "'":
      return str.replace(/'/g, "\\'");
    case '"':
      return str.replace(/"/g, '\\"');
    case '`':
      return str.replace(/`/g, '\\`');
    default:
      return str.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/`/g, '\\`');
  }
};

// Encapsulates all rules under .af-view
const encapsulateCSS = (css, source) => {
  return css.replace(/((?:^|\{|\}|;)\s*(?:\/\*[^]*?\*\/\s*)*)([^@{}]+?)(\s*\{)/g, (match, left, rule, right) => {
    // Animation keyframe e.g. 50%
    if (/^\d/.test(rule)) return match;
    // Empty line skip, probably after a media query or so
    if (!rule.trim()) return match;

    // Apply for all selectors in rule
    // Note that <html /> and <body /> tags are replaced with .af-view
    rule = rule.replace(/\.([\w_-]+)/g, '.af-class-$1').replace(/\[class(.?)="( ?)([^"]+)( ?)"\]/g, '[class$1="$2af-class-$3$4"]').replace(/([^\s][^,]*)(\s*,?)/g, '.af-view $1$2').replace(/\.af-view html/g, '.af-view').replace(/\.af-view body/g, '.af-view');

    switch (source) {
      case 'webflow':
        rule = rule.replace(/af-class-w-/g, 'w-');
        break;
      case 'sketch':
        rule = rule.replace(/af-class-anima-/g, 'anima-').replace(/af-class-([\w_-]+)an-animation([\w_-]+)/g, '$1an-animation$2');
        break;
      default:
        rule = rule.replace(/af-class-w-/g, 'w-').replace(/af-class-anima-/g, 'anima-').replace(/af-class-([\w_-]+)an-animation([\w_-]+)/g, '$1an-animation$2');
    }

    return `${left}${rule}${right}`;
  });
};

// Will use the shortest indention as an axis
const freeText = text => {
  if (text instanceof Array) {
    text = text.join('');
  }

  // This will allow inline text generation with external functions, same as ctrl+shift+c
  // As long as we surround the inline text with ==>text<==
  text = text.replace(/( *)==>((?:.|\n)*?)<==/g, (match, baseIndent, content) => {
    return content.split('\n').map(line => `${baseIndent}${line}`).join('\n');
  });

  const lines = text.split('\n');

  const minIndent = lines.filter(line => line.trim()).reduce((minIndent, line) => {
    const currIndent = line.match(/^ */)[0].length;

    return currIndent < minIndent ? currIndent : minIndent;
  }, Infinity);

  return lines.map(line => line.slice(minIndent)).join('\n').trim().replace(/\n +\n/g, '\n\n');
};

// Calls freeText() and disables lint
const freeLint = script => {
  return freeText(`
    /* eslint-disable */

    ==>${freeText(script)}<==

    /* eslint-enable */
  `);
};

// Calls freeLint() and ensures that 'this' is represented by window
const freeContext = script => {
  return freeLint(`
    (function() {

    ==>${freeText(script)}<==

    }).call(window)
  `);
};

// Creates a completely isolated scope with Function constructor.
// args is a varToInject-injectedVarName map.
const freeScope = (script, context = 'window', args = {}) => {
  const callArgs = [context].concat(Object.keys(args));

  return freeText(`
    new Function(\`
      with (this) {
        ${script}
      }
    \`).call(${callArgs.join(', ')})
  `);
};

// upper -> Upper
const upperFirst = str => {
  return str.substr(0, 1).toUpperCase() + str.substr(1);
};

// foo_barBaz -> ['foo', 'bar', 'Baz']
const splitWords = str => {
  return str.replace(/[A-Z]/, ' $&').split(/[^a-zA-Z0-9]+/).filter(word => word.trim());
};

// abc 5 0 -> 00abc
const padLeft = (str, length, char = ' ') => {
  str = String(str);
  length = parseInt(length + 1 - str.length);

  return Array(length).join(char) + str;
};

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const Internal = _ => {
  if (typeof _ != 'symbol') {
    throw TypeError('Accessor must me a symbol');
  }

  return Klass => {
    if (typeof Klass != 'function') {
      throw TypeError('Provided target is not a class');
    }

    const internals = {};

    Object.defineProperty(Klass.prototype, _, {
      get() {
        const _this = _extends({}, internals);

        Object.keys(_this).forEach(key => {
          const value = _this[key];

          if (typeof value == 'function') {
            _this[key] = value.bind(this);
          }
        });

        Object.defineProperty(this, _, {
          value: _this
        });

        return _this;
      }
    });

    Object.getOwnPropertyNames(Klass.prototype).forEach(key => {
      if (key[0] != '_') return;

      const { value } = Object.getOwnPropertyDescriptor(Klass.prototype, key);

      if (typeof value != 'function') return;

      const publicKey = key.slice(1);
      internals[publicKey] = value;
      delete Klass.prototype[key];
    });
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Internal);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var resolve__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var resolve__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(resolve__WEBPACK_IMPORTED_MODULE_1__);



const cache = {};

const requireText = path => {
  path = resolve__WEBPACK_IMPORTED_MODULE_1___default.a.sync(path);

  return cache[path] = cache[path] || Object(fs__WEBPACK_IMPORTED_MODULE_0__["readFileSync"])(path).toString();
};

requireText.promise = path => new Promise((resolve, reject) => {
  resolve__WEBPACK_IMPORTED_MODULE_1___default()(path, (err, path) => {
    if (err) {
      return reject(err);
    }

    let content = cache[path];

    if (content) {
      return resolve(content);
    }

    Object(fs__WEBPACK_IMPORTED_MODULE_0__["readFile"])(path, (err, content) => {
      if (err) {
        return reject(err);
      }

      cache[path] = content = content.toString();

      resolve(content);
    });
  });
});

/* harmony default export */ __webpack_exports__["default"] = (requireText);

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("resolve");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _writer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Writer", function() { return _writer__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _view_writer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewWriter", function() { return _view_writer__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _script_writer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScriptWriter", function() { return _script_writer__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _style_writer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StyleWriter", function() { return _style_writer__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Writer = class Writer {
  write() {
    throw Error('Writer.write() must be implemented');
  }
};


/* harmony default export */ __webpack_exports__["default"] = (Writer);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cheerio__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var htmltojsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var htmltojsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(htmltojsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var statuses__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);
/* harmony import */ var statuses__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(statuses__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var uglify_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26);
/* harmony import */ var uglify_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(uglify_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _static_server__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(27);
/* harmony import */ var _static_server_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(28);
/* harmony import */ var _static_server_server__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(29);
/* harmony import */ var _libs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(30);
/* harmony import */ var _writer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(22);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(17);
var _dec, _class;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }













const writingFiles = [];

// attempt at supporting windows by monkey patching path.relative
// to prevent backslashes
const orPathRel = path__WEBPACK_IMPORTED_MODULE_2___default.a.relative;
path__WEBPACK_IMPORTED_MODULE_2___default.a.relative = (from, to) => orPathRel(from, to).replace(/\\/gi, '/');



const _ = Symbol("_ViewWriter");
const htmltojsx = new htmltojsx__WEBPACK_IMPORTED_MODULE_1___default.a({ createClass: false });

const flattenChildren = (children = [], flatten = []) => {
  children.forEach(child => {
    flattenChildren(child[_].children, flatten);
  });

  flatten.push(...children);

  return flatten;
};

const adjustImagesToRoot = html => html.replace(/src="/ig, 'src="/');
const removeHtmlFromLinks = html => adjustImagesToRoot(html.replace('index.html', '').replace(/\.html/ig, '').replace(/href="/ig, 'href="/'));

let ViewWriter = (_dec = Object(_utils__WEBPACK_IMPORTED_MODULE_11__["Internal"])(_), _dec(_class = class ViewWriter extends _writer__WEBPACK_IMPORTED_MODULE_10__["default"] {
  static writeAll(viewWriters, dir, componentDir, metaDir, stylesDir, ctrlsDir) {
    return _asyncToGenerator(function* () {
      yield Object(_libs__WEBPACK_IMPORTED_MODULE_8__["mkdirp"])(dir);
      yield Object(_libs__WEBPACK_IMPORTED_MODULE_8__["mkdirp"])(componentDir);
      yield Object(_libs__WEBPACK_IMPORTED_MODULE_8__["mkdirp"])(stylesDir);
      yield Object(_libs__WEBPACK_IMPORTED_MODULE_8__["mkdirp"])(metaDir);
      yield Object(_libs__WEBPACK_IMPORTED_MODULE_8__["mkdirp"])(`${dir}/../../server`);

      const serverPromises = [_libs__WEBPACK_IMPORTED_MODULE_8__["fs"].writeFile(`${dir}/../../server/index.js`, Object(_utils__WEBPACK_IMPORTED_MODULE_11__["freeLint"])(_static_server__WEBPACK_IMPORTED_MODULE_5__["default"])), _libs__WEBPACK_IMPORTED_MODULE_8__["fs"].writeFile(`${dir}/../../server/server.js`, Object(_utils__WEBPACK_IMPORTED_MODULE_11__["freeLint"])(_static_server_server__WEBPACK_IMPORTED_MODULE_7__["default"])), _libs__WEBPACK_IMPORTED_MODULE_8__["fs"].writeFile(`${dir}/../../server/loader.js`, Object(_utils__WEBPACK_IMPORTED_MODULE_11__["freeLint"])(_static_server_loader__WEBPACK_IMPORTED_MODULE_6__["default"]))];

      yield Promise.all(serverPromises);

      const indexFilePath = `${dir}/index.js`;
      const helpersFilePath = `${dir}/../helpers.js`;
      const routesFilePath = `${dir}/../routes.js`;
      const childFilePaths = [indexFilePath, helpersFilePath, routesFilePath];
      ctrlsDir = path__WEBPACK_IMPORTED_MODULE_2___default.a.relative(dir, ctrlsDir);
      const routes = `
import React from 'react';
import { Route } from 'react-router-dom';
import * as Views from './views';

export default () => [
  <Route key="route_index" path="/" component={Views.IndexView} exact />,
  ${viewWriters.map(function (viewWriter) {
        return `<Route key="route_${viewWriter.className.replace(/view/gi, '')}" path="${viewWriter.parent ? `/${viewWriter.parent}` : ''}/${viewWriter.className.replace(/view/gi, '').split(/(?=[A-Z])/).join('-').toLowerCase()}" component={Views.${viewWriter.className}} exact />`;
      }).join(",\n  ")}
]`;
      const index = viewWriters.map(function (viewWriter) {
        return `export { default as ${viewWriter.className} } from './${viewWriter.className}'`;
      }).join("\n");

      const leanViewWriters = [];
      viewWriters = flattenChildren(viewWriters);

      for (const viewWriter of viewWriters) {
        if (!leanViewWriters.find(function (vw) {
          return vw.className === viewWriter.className;
        })) {
          leanViewWriters.push(viewWriter);
        }
      }
      leanViewWriters.forEach((() => {
        var _ref = _asyncToGenerator(function* (viewWriter) {
          const filePaths = yield viewWriter.write(dir, componentDir, metaDir, stylesDir, ctrlsDir);
          childFilePaths.push(...filePaths);
        });

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      })());

      const writtingRoutes = _libs__WEBPACK_IMPORTED_MODULE_8__["fs"].writeFile(routesFilePath, Object(_utils__WEBPACK_IMPORTED_MODULE_11__["freeLint"])(routes));
      const writingIndex = _libs__WEBPACK_IMPORTED_MODULE_8__["fs"].writeFile(indexFilePath, Object(_utils__WEBPACK_IMPORTED_MODULE_11__["freeLint"])(index));
      const writingHelpers = _libs__WEBPACK_IMPORTED_MODULE_8__["fs"].writeFile(helpersFilePath, _raw__WEBPACK_IMPORTED_MODULE_9__["default"].viewHelpers);

      yield Promise.all([writingIndex, writingHelpers, writtingRoutes]);
      return childFilePaths;
    })();
  }

  get baseUrl() {
    return this[_].baseUrl;
  }

  set baseUrl(baseUrl) {
    this[_].baseUrl = String(baseUrl);
  }

  set isComponent(comp) {
    this[_].isComponent = comp;
  }

  get isComponent() {
    return this[_].isComponent;
  }

  get children() {
    return this[_].children.slice();
  }

  set name(name) {
    if (!isNaN(Number(name))) {
      name = statuses__WEBPACK_IMPORTED_MODULE_3___default.a[name];
    }

    const words = Object(_utils__WEBPACK_IMPORTED_MODULE_11__["splitWords"])(name);
    Object.assign(this[_], {
      ctrlClassName: words.concat("controller").map(_utils__WEBPACK_IMPORTED_MODULE_11__["upperFirst"]).join(""),
      metaClassName: words.concat("meta").map(_utils__WEBPACK_IMPORTED_MODULE_11__["upperFirst"]).join(""),
      className: words.concat("view").map(_utils__WEBPACK_IMPORTED_MODULE_11__["upperFirst"]).join(""),
      elName: words.map(word => word.toLowerCase()).join("-"),
      name: words.concat("view").map(word => word.toLowerCase()).join("-")
    });
  }

  get name() {
    return this[_].name;
  }

  get ctrlClassName() {
    return this[_].ctrlClassName;
  }

  get metaClassName() {
    return this[_].metaClassName;
  }

  get className() {
    return this[_].className;
  }

  get elName() {
    return this[_].elName;
  }

  set html(html) {
    if (!html) {
      this[_].html = "";
      this[_].children = [];
      return;
    }

    const children = this[_].children = [];
    const $ = cheerio__WEBPACK_IMPORTED_MODULE_0___default.a.load(html);

    // Encapsulate styles
    $("style").each((i, el) => {
      const $el = $(el);
      const html = $el.html();
      const css = Object(_utils__WEBPACK_IMPORTED_MODULE_11__["encapsulateCSS"])(html, this.source);

      $el.html(css);
    });

    $("*").each((i, el) => {
      const $el = $(el);
      let className = $el.attr("class");

      if (className && !/af-class-/.test(className)) {
        className = className.replace(/([\w_-]+)/g, "af-class-$1");

        switch (this.source) {
          case "webflow":
            className = className.replace(/af-class-w-/g, "w-");
            break;
          case "sketch":
            className = className.replace(/af-class-anima-/g, "anima-").replace(/af-class-([\w_-]+)an-animation([\w_-]+)/g, "$1an-animation$2");
            break;
          default:
            className = className.replace(/af-class-w-/g, "w-").replace(/af-class-anima-/g, "anima-").replace(/af-class-([\w_-]+)an-animation([\w_-]+)/g, "$1an-animation$2");
        }

        $el.attr("class", className);
      }
    });

    // console.log(this[_].className, ($("[af-el]") || []).length)

    let el = $("[af-el]")[0];
    while (el) {

      const $el = $(el);
      const elName = $el.attr("af-el");
      const $afEl = $(`<af-${elName}></af-${elName}>`);
      // const sock = $el.attr("af-sock");
      // $afEl.attr("af-sock", $el.attr("af-sock"));
      $el.attr("af-el", null);
      // $el.attr("af-sock", null);
      $afEl.insertAfter($el);
      // if (sock !== null && sock !== undefined) {
      //   $el.prepend(`<span af-sock="${sock}">`);
      //   $el.append('</span>');
      // }
      $el.remove();

      const child = new ViewWriter({
        name: elName,
        html: $.html($el),
        baseUrl: this.baseUrl,
        styles: this.styles,
        isComponent: true
      });

      children.push(child);
      el = $("[af-el]")[0];
    }

    // Apply ignore rules AFTER child elements were plucked
    $("[af-ignore]").remove();
    // Empty inner HTML
    $("[af-empty]").html("").attr("af-empty", null);

    this[_].scripts = [];

    // Set inline scripts. Will be loaded once component has been mounted
    $("script").each((i, script) => {
      const $script = $(script);
      const src = $script.attr("src");
      const type = $script.attr("type");

      // We're only interested in JavaScript script tags
      if (type && !/javascript/i.test(type)) return;

      if (src) {
        this[_].scripts.push({
          type: "src",
          body: src
        });
      } else {
        this[_].scripts.push({
          type: "code",
          body: $script.html()
        });
      }

      $script.remove();
    });

    // Wrapping with .af-view will apply encapsulated CSS
    const $body = $("body");
    const $afContainer = $('<span class="af-view" style="width:100%;height:100%;"></span>');

    $afContainer.append($body.contents());
    $afContainer.prepend("\n  ");
    $afContainer.append("\n  ");
    $body.append($afContainer);

    html = $body.html();

    this[_].html = html;

    const sockets = this[_].sockets = [];

    // Find root sockets
    $("[af-sock]").each((i, el) => {
      const $el = $(el);
      const socketName = $el.attr("af-sock");
      sockets.push(socketName);

      $el.attr("af-sock", null);
      // Workaround would help identify the closing tag
      el.tagName += `-af-sock-${socketName}`;
    });

    // Refetch modified html
    html = $body.html();

    // Transforming HTML into JSX
    let jsx = htmltojsx.convert(removeHtmlFromLinks(html)).trim();

    // DETECT LIST
    children.forEach((child, index) => {
      const isList = new RegExp(`(<af-${child.elName} />\\s+){2,}`, "").exec(jsx);
      if (isList) {
        this[_].sockets.push(`${camelize(child.className)}List${index}`);
        jsx = jsx.replace(new RegExp(`(<af-${child.elName} />\\s+){2,}`, ""), `{map(proxies['${camelize(child.className)}List${index}'], props => <React.Fragment ${mergeProps('')}>{props.children ? props.children : null}</React.Fragment>)}`);
      } else {
        jsx = jsx.replace(new RegExp(`(<af-${child.elName} />\\s*)+`, !this[_].isComponent ? "g" : ""), !this[_].isComponent ? `<${child.className}.Controller {...this.props}/>` : `{map(proxies['${child.className}-${index}'], props => <${child.className}.Controller ${mergeProps('')}>{props.children ? props.children : null}</${child.className}.Controller>)}`);
      }
    });

    // Bind controller to view
    this[_].jsx = bindJSX(jsx, children);
  }

  get scripts() {
    return this[_].scripts ? this[_].scripts.slice() : [];
  }

  get styles() {
    return this[_].styles.slice();
  }

  get html() {
    return this[_].html;
  }

  get jsx() {
    return this[_].jsx;
  }

  get sockets() {
    return this[_].sockets && [...this[_].sockets];
  }

  get source() {
    return this[_].source;
  }

  set source(source) {
    this[_].source = String(source);
  }

  constructor(options) {
    super();

    this[_].children = [];
    this[_].styles = options.styles || [];

    this.name = options.name;
    this.parent = options.parent;
    this.isComponent = options.isComponent;
    this.html = options.html;
    this.source = options.source;
  }

  write(dir, componentDir, metaDir, stylesDir, ctrlsDir) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const filePath = `${dir}/${_this.className}.js`;
      const childFilePaths = [filePath];
      const writingChildren = _this[_].children.map((() => {
        var _ref2 = _asyncToGenerator(function* (child) {
          if (!writingFiles.includes(child.className)) {
            writingFiles.push(child.className);
            const filePaths = yield child.write(componentDir, componentDir, metaDir, stylesDir, ctrlsDir);
            childFilePaths.push(...filePaths);
          }
        });

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      })());
      const isNestedComponent = dir === componentDir;
      let writingSelf;

      if (!writingFiles.includes(`${_this.className}.js`)) {
        try {
          yield _libs__WEBPACK_IMPORTED_MODULE_8__["fs"].readFile(`${dir}/${_this.className}.js`);
        } catch (e) {
          // pass
          writingSelf = _libs__WEBPACK_IMPORTED_MODULE_8__["fs"].writeFile(`${dir}/${_this.className}.js`, _this[_].compose(path__WEBPACK_IMPORTED_MODULE_2___default.a.relative(dir, componentDir), path__WEBPACK_IMPORTED_MODULE_2___default.a.relative(dir, metaDir), path__WEBPACK_IMPORTED_MODULE_2___default.a.relative(dir, stylesDir), ctrlsDir, !isNestedComponent));
        }
      }

      try {
        yield Promise.all([...writingChildren, writingSelf]);
      } catch (e) {
        console.log(e);
      }
      return childFilePaths;
    })();
  }

  setStyle(href, content, stylesDir) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let type;
      let body;

      if (href) {
        type = "href";
        body = /^\w+:\/\//.test(href) ? href : path__WEBPACK_IMPORTED_MODULE_2___default.a.resolve("/", href);
      } else {
        type = "sheet";
        body = content;
      }

      const exists = _this2[_].styles.some(function (style) {
        return style.body == body;
      });

      if (!exists) {
        _this2[_].styles.push({ type, body });
      }

      const sheets = _this2[_].styles.map(function ({ type, body }) {
        return type == "sheet" && body;
      }).filter(Boolean);

      let css = "";

      // css += hrefs.map((href) => {
      //   return `@import url(${href});`
      // }).join('\n')


      css += "\n\n";

      css += sheets.map(function (sheet) {
        return sheet;
      }).join("\n\n");
      if (!stylesDir || !css.length) return true;
      try {
        yield Object(_libs__WEBPACK_IMPORTED_MODULE_8__["mkdirp"])(stylesDir);
        yield _libs__WEBPACK_IMPORTED_MODULE_8__["fs"].writeFile(`${stylesDir}/${_this2.className}.css`, Object(_utils__WEBPACK_IMPORTED_MODULE_11__["escape"])(css.trim()));
      } catch (e) {
        console.log(e);
      }
    })();
  }

  _compose(compDir, metaDir, stylesDir, ctrlsDir, shouldHaveStyles = true) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_11__["freeLint"])(`
      import React from 'react'
      import { createScope, map, transformProxies } from '../helpers'
      ${shouldHaveStyles ? `import "${stylesDir}/${this.className}.css"` : ''}
      ==>${this[_].composeChildImports(compDir)}<==

      let Controller

      class ${this.className} extends React.Component {
        static get Controller() {
          if (Controller) return Controller

          try {
            Controller = require('${ctrlsDir}/${this.ctrlClassName}')
            Controller = Controller.default || Controller

            return Controller
          }
          catch (e) {
            if (e.code == 'MODULE_NOT_FOUND') {
              Controller = ${this.className}

              return Controller
            }

            throw e
          }
        }

        render() {
          const proxies = Controller !== ${this.className} ? transformProxies(this.props.children) : {
            ==>${this[_].composeProxiesDefault()}<==
          }

          ${this[_].isComponent ? '' : `
          let Metadata
          try {
            Metadata = require("${metaDir}/${this.metaClassName}")
            Metadata = Metadata.default || Metadata
          } catch (e) {
            // pass
            Metadata = null;
          }
          try {
            Metadata = require("${metaDir}/defaultMeta")
            Metadata = Metadata.default || Metadata
          } catch (e) {
            // pass
            Metadata = null;
          }
          `}


          return (
            <React.Fragment>
              ${!this[_].isComponent ? '{Metadata ? <Metadata {...this.props} /> : null}' : ''}
              ==>${this.jsx}<==
            </React.Fragment>
          )
        }
      }

      export default ${this.className}
    `);
  }

  _composeStyleImports() {
    // const hrefs = this[_].styles.map(({ type, body }) => {
    //   return type == 'href' && body
    // }).filter(Boolean)

    const sheets = this[_].styles.map(({ type, body }) => {
      return type == "sheet" && body;
    }).filter(Boolean);

    let css = "";

    // css += hrefs.map((href) => {
    //   return `@import url(${href});`
    // }).join('\n')

    css += "\n\n";

    css += sheets.map(sheet => {
      return sheet;
    }).join("\n\n");

    return Object(_utils__WEBPACK_IMPORTED_MODULE_11__["escape"])(css.trim());
  }

  _composeProxiesDefault() {
    return this[_].sockets.map(socket => {
      return `'${socket}': [],`;
    }).join("\n");
  }

  _composeChildImports(compDir) {
    if (!compDir) {
      compDir = '.';
    }
    const imported = [];

    const imports = this[_].children.map(child => {
      if (!imported.includes(child.className)) {
        imported.push(child.className);
        return `import ${child.className} from '${compDir}/${child.className}'`;
      }
    }).filter(imp => !!imp && imp.length);

    // Line skip
    imports.push("");

    return imports.join("\n");
  }

  _composeScriptsDeclerations() {
    return this[_].scripts.map(script => {
      if (script.type == "src") {
        return `fetch("${script.body}").then(body => body.text()),`;
      }

      const minified = uglify_js__WEBPACK_IMPORTED_MODULE_4___default.a.minify(script.body).code;
      // Unknown script format ??? fallback to maxified version
      const code = minified || script.body;

      return `Promise.resolve("${Object(_utils__WEBPACK_IMPORTED_MODULE_11__["escape"])(code)}"),`;
    }).join("\n");
  }

  _composeScriptsInvocations() {
    if (!this[_].scripts) return "";

    const invoke = Object(_utils__WEBPACK_IMPORTED_MODULE_11__["freeScope"])("eval(arguments[0])", "window", {
      script: null
    });

    return Object(_utils__WEBPACK_IMPORTED_MODULE_11__["freeText"])(`
      scripts.concat(Promise.resolve()).reduce((loaded, loading) => {
        return loaded.then((script) => {
          ==>${invoke}<==

          return loading
        })
      })
    `);
  }
}) || _class);


function camelize(text) {
  return text.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

function bindJSX(jsx, children = []) {
  children.forEach(child => {
    jsx = jsx.replace(new RegExp(`af-${child.elName}`, "g"), `${child.className}.Controller`);
  });

  // ORDER MATTERS
  // Open close
  return jsx
  // Open close
  .replace(/<([\w_-]+)-af-sock-([\w_-]+)(.*?)>([^]*)<\/\1-af-sock-\2>/g, (match, el, sock, attrs, children) =>
  // If there are nested sockets
  /<[\w_-]+-af-sock-[\w_-]+/.test(children) ? `{map(proxies['${sock}'], props => <${el} ${mergeProps(attrs)}>{createScope(props.children, proxies => <React.Fragment>${bindJSX(children)}</React.Fragment>)}</${el}>)}` : `{map(proxies['${sock}'], props => <${el} ${mergeProps(attrs)}>{props.children ? props.children : <React.Fragment>${children}</React.Fragment>}</${el}>)}`)
  // Self closing
  .replace(/<([\w_-]+)-af-sock-([\w_-]+)(.*?) \/>/g, (match, el, sock, attrs) => `{map(proxies['${sock}'], props => <${el} ${mergeProps(attrs)}>{props.children}</${el}>)}`);
}

// Merge props along with class name
function mergeProps(attrs) {
  attrs = attrs.trim();

  if (!attrs) {
    return "{...props}";
  }

  let className = attrs.match(/className="([^"]+)"/);

  if (!className) {
    return `${attrs} {...props}`;
  }

  className = className[1];
  attrs = attrs.replace(/ ?className="[^"]+"/, "");

  return `${attrs} {...{...props, className: \`${className} $\{props.className || ''}\`}}`.trim();
}

/* harmony default export */ __webpack_exports__["default"] = (ViewWriter);

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("htmltojsx");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("statuses");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("uglify-js");

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */

/* harmony default export */ __webpack_exports__["default"] = (`const md5File = require('md5-file');
const path = require('path');

// CSS styles will be imported on load and that complicates matters... ignore those bad boys!
const ignoreStyles = require('ignore-styles');
const register = ignoreStyles.default;

// We also want to ignore all image requests
// When running locally these will load from a standard import
// When running on the server, we want to load via their hashed version in the build folder
const extensions = ['.gif', '.jpeg', '.jpg', '.png', '.svg'];

// Override the default style ignorer, also modifying all image requests
register(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) => {
  if (!extensions.find(f => filename.endsWith(f))) {
    // If we find a style
    return ignoreStyles.noOp();
  } else {
    // If we find an image
    const hash = md5File.sync(filename).slice(0, 8);
    const bn = path.basename(filename).replace(/(\.\w{3})$/, '.'+hash+'$1');

    mod.exports = '/static/media/'+bn;
  }
});

// Set up babel to do its thing... env for the latest toys, react-app for CRA
// Notice three plugins: the first two allow us to use import rather than require, the third is for code splitting
// Polyfill is required for Babel 7, polyfill includes a custom regenerator runtime and core-js
require('@babel/polyfill');
require('@babel/register')({
  ignore: [/\\/(build|node_modules)\\//],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    'dynamic-import-node',
    'react-loadable/babel'
  ]
});

// Now that the nonsense is over... load up the server entry point
require('./server');
`);

/* eslint-enable */

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */

/* harmony default export */ __webpack_exports__["default"] = (`// Express requirements
import path from 'path';
import fs from 'fs';
import 'isomorphic-fetch'

// React requirements
import React from 'react';
import Helmet, { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router';
import { Frontload, frontloadServerRender } from 'react-frontload';
import Loadable from 'react-loadable';
import { renderToStringWithData, ApolloProvider } from "react-apollo";

import App from '../src/App';
import manifest from '../build/manifest.json';
import client from "../src/helpers/apollo-client";

// LOADER
export default (req, res) => {
  /*
    A simple helper function to prepare the HTML markup. This loads:
      - Page title
      - SEO meta tags
      - Preloaded state (for Redux) depending on the current route
      - Code-split script tags depending on the current route
  */
  const injectHTML = (data, { html, title, meta, body, scripts, state }) => {
    data = data.replace('<html>', '<html '+ html + '>');
    data = data.replace(/<title>.*?<\\/title>/g, title);
    data = data.replace('</head>', meta +
        '<link rel="stylesheet" href="/css/webflow.css" />' +
        '<link rel="stylesheet" href="/css/amli.webflow.css" />' +
        '<link rel="stylesheet" href="/css/normalize.css" />' +
    '</head>');
    data = data.replace(
      '<div id="root"></div>',
      '<div id="root">'+body+'</div><script>window.__APOLLO_STATE__ = '+JSON.stringify(state).replace(/</g, "\\u003c")+'</script>'
    );
    data = data.replace('</body>', scripts.join('') + '</body>');

    return data;
  };

  // Load in our HTML file from our build
  fs.readFile(
    path.resolve(__dirname, '../build/index.html'),
    'utf8',
    async (err, htmlData) => {
      // If there's an error... serve up something nasty
      if (err) {
        console.error('Read error', err);

        return res.status(404).end();
      }
      const helmetContext = {};
      const context = {};
      const modules = [];
      const routes = await App.getRoutes(client);
      const Root = () => (
        <HelmetProvider context={helmetContext}>
          <ApolloProvider client={client}>
            <Loadable.Capture report={m => modules.push(m)}>
              <StaticRouter location={req.url} context={context}>
                <Frontload isServer={true}>
                  <App routes={routes}>
                    <Helmet>
                      <title>AMLI Residential</title>
                    </Helmet>
                  </App>
                </Frontload>
              </StaticRouter>
            </Loadable.Capture>
          </ApolloProvider>
        </HelmetProvider>
      )
      /*
        Here's the core funtionality of this file. We do the following in specific order (inside-out):
          1. Load the <App /> component
          2. Inside of the Frontload HOC
          3. Inside of a Redux <StaticRouter /> (since we're on the server), given a location and context to write to
          4. Inside of the store provider
          5. Inside of the React Loadable HOC to make sure we have the right scripts depending on page
          6. Render all of this sexiness
          7. Make sure that when rendering Frontload knows to get all the appropriate preloaded requests

        In English, we basically need to know what page we're dealing with, and then load all the appropriate scripts and
        data for that page. We take all that information and compute the appropriate state to send to the user. This is
        then loaded into the correct components and sent as a Promise to be handled below.
      */
      frontloadServerRender(() =>
        renderToStringWithData(
          <Root />
        )
      ).then(async routeMarkup => {
        if (context.url) {

          res.writeHead(302, {
            Location: context.url
          });

          res.end();
        } else {
          // Otherwise, we carry on...

          const initialApolloState = client.extract();
          // Let's give ourself a function to load all our page-specific JS assets for code splitting
          const extractAssets = (assets, chunks) =>
            Object.keys(assets)
              .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
              .map(k => assets[k]);

          // Let's format those assets into pretty <script> tags
          const extraChunks = extractAssets(manifest, modules).map(
            c => '<script type="text/javascript" src="/'+c.replace(/^\\//, '')+'"></script>'
          );

          // We need to tell Helmet to compute the right meta tags, title, and such
          const { helmet } = helmetContext;

          // NOTE: Disable if you desire
          // Let's output the title, just to see SSR is working as intended
          console.log('THE TITLE ------- >', helmet.title.toString());

          // Pass all this nonsense into our HTML formatting function above
          const html = injectHTML(htmlData, {
            html: helmet.htmlAttributes.toString(),
            title: helmet.title.toString(),
            meta: helmet.meta.toString(),
            body: routeMarkup,
            scripts: extraChunks,
            state: initialApolloState
          });

          // We have all the final HTML, let's send it to the user already!
          res.send(html);
        }
      });
    }
  );
};
`);

/* eslint-enable */

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */

/* harmony default export */ __webpack_exports__["default"] = (`// Express requirements
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
// import forceDomain from 'forcedomain';
import Loadable from 'react-loadable';
import cookieParser from 'cookie-parser';

// Our loader - this basically acts as the entry point for each page load
import loader from './loader';

// Create our express app using the port optionally specified
const app = express();
const PORT = process.env.PORT || 3000;

// NOTE: UNCOMMENT THIS IF YOU WANT THIS FUNCTIONALITY
/*
  Forcing www and https redirects in production, totally optional.

  http://mydomain.com
  http://www.mydomain.com
  https://mydomain.com

  Resolve to: https://www.mydomain.com
*/
// if (process.env.NODE_ENV === 'production') {
//   app.use(
//     forceDomain({
//       hostname: 'www.mydomain.com',
//       protocol: 'https'
//     })
//   );
// }

// Compress, parse, log, and raid the cookie jar
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());

app.disable('x-powered-by');

// Set up homepage, static assets, and capture everything else
app.use(express.Router().get('/', loader));
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(loader);

// We tell React Loadable to load all required assets and start listening - ROCK AND ROLL!
Loadable.preloadAll().then(() => {
  app.listen(PORT, console.log('App listening on port' + PORT + '!'));
});

// Handle the bugs somehow
app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});`);

/* eslint-enable */

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);



const resolve = filename => path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(__dirname, '../src/raw', filename);

// Exporting an object since we're dealing with a getter
/* harmony default export */ __webpack_exports__["default"] = ({
  get viewHelpers() {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["requireText"])(resolve('viewHelpers.js'));
  }
});

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uglify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);
/* harmony import */ var uglify_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uglify_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _libs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _writer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }









const _ = Symbol('_ScriptWriter');

let ScriptWriter = (_dec = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["Internal"])(_), _dec(_class = class ScriptWriter extends _writer__WEBPACK_IMPORTED_MODULE_4__["default"] {
  get scripts() {
    return this[_].scripts.slice();
  }

  get prefetch() {
    return this[_].prefetch;
  }

  set prefetch(prefetch) {
    return this[_].prefetch = !!prefetch;
  }

  get baseUrl() {
    return this[_].baseUrl;
  }

  set baseUrl(baseUrl) {
    this[_].baseUrl = String(baseUrl);
  }

  constructor(options = {}) {
    super();

    this[_].scripts = [];

    this.baseUrl = options.baseUrl;
    this.prefetch = options.prefetch;
  }

  write(dir, options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield Object(_libs__WEBPACK_IMPORTED_MODULE_3__["mkdirp"])(dir);

      options = _extends({}, options, {
        prefetch: _this.prefetch
      });

      const indexFilePath = `${dir}/index.js`;
      const childFilePaths = [indexFilePath];

      if (!options.prefetch) {
        yield _libs__WEBPACK_IMPORTED_MODULE_3__["fs"].writeFile(indexFilePath, _this[_].composeScriptLoader());
        return childFilePaths;
      }

      const scriptFileNames = _this.scripts.map(function (script, index, { length }) {
        const fileName = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["padLeft"])(index, length / 10 + 1, 0) + '.js';
        const filePath = `${dir}/${fileName}`;
        childFilePaths.push(filePath);

        return fileName;
      });

      const fetchingScripts = _this.scripts.map((() => {
        var _ref = _asyncToGenerator(function* (script, index) {
          const scriptFileName = scriptFileNames[index];

          let code = script.type == 'code' ? script.body : /^http/.test(script.body) ? yield node_fetch__WEBPACK_IMPORTED_MODULE_0___default()(script.body).then(function (res) {
            return res.text();
          }).then(function (text) {
            return uglify_js__WEBPACK_IMPORTED_MODULE_2___default.a.minify(text).code;
          }) : Object(_utils__WEBPACK_IMPORTED_MODULE_5__["requireText"])(`${_this.baseUrl}/${script.body}`);
          code = code.replace(/\n\/\/# ?sourceMappingURL=.*\s*$/, '');
          code = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["freeContext"])(code);

          return _libs__WEBPACK_IMPORTED_MODULE_3__["fs"].writeFile(`${dir}/${scriptFileName}`, code);
        });

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      })());

      const scriptsIndexContent = scriptFileNames.map(function (scriptFileName) {
        return `import './${scriptFileName}'`;
      }).join('\n');

      const writingIndex = _libs__WEBPACK_IMPORTED_MODULE_3__["fs"].writeFile(indexFilePath, Object(_utils__WEBPACK_IMPORTED_MODULE_5__["freeLint"])(scriptsIndexContent));

      yield Promise.all([...fetchingScripts, writingIndex]);

      return childFilePaths;
    })();
  }

  setScript(src, content) {
    let type;
    let body;

    if (src) {
      type = 'src';
      body = /^\w+:\/\//.test(src) ? src : path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve('/', src);
    } else {
      type = 'code';
      body = uglify_js__WEBPACK_IMPORTED_MODULE_2___default.a.minify(content).code;
    }

    const exists = this[_].scripts.some(script => {
      return script.body == body;
    });

    if (!exists) {
      this[_].scripts.push({ type, body });
    }
  }

  _composeScriptLoader() {
    const scripts = this[_].scripts.map(script => {
      return Object(_utils__WEBPACK_IMPORTED_MODULE_5__["freeText"])(`
        {
          type: '${script.type}',
          body: '${Object(_utils__WEBPACK_IMPORTED_MODULE_5__["escape"])(script.body, "'")}',
        },
      `);
    }).join('\n');

    return Object(_utils__WEBPACK_IMPORTED_MODULE_5__["freeLint"])(`
      const scripts = [
        ==>${scripts}<==
      ]

      const loadingScripts = scripts.reduce((loaded, script) => loaded.then(() => {
        const scriptEl = document.createElement('script')
        scriptEl.type = 'text/javascript'
        let loading

        if (script.type == 'src') {
          scriptEl.src = script.body

          loading = new Promise((resolve, reject) => {
            scriptEl.onload = resolve
            scriptEl.onerror = reject
          })
        }
        else {
          scriptEl.innerHTML = script.body

          loading = Promise.resolve()
        }

        document.head.appendChild(scriptEl)

        return loading
      }), Promise.resolve())

      export default loadingScripts
    `);
  }
}) || _class);


/* harmony default export */ __webpack_exports__["default"] = (ScriptWriter);

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clean_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var clean_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clean_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _libs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var _writer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }










const _ = Symbol('_StyleWriter');
const cleanCSS = new clean_css__WEBPACK_IMPORTED_MODULE_0___default.a({
  rebaseTo: '..'
});

let StyleWriter = (_dec = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["Internal"])(_), _dec(_class = class StyleWriter extends _writer__WEBPACK_IMPORTED_MODULE_5__["default"] {
  get styles() {
    return this[_].styles.slice();
  }

  get prefetch() {
    return this[_].prefetch;
  }

  set prefetch(prefetch) {
    return this[_].prefetch = !!prefetch;
  }

  get baseUrl() {
    return this[_].baseUrl;
  }

  set baseUrl(baseUrl) {
    this[_].baseUrl = String(baseUrl);
  }

  get source() {
    return this[_].source;
  }

  set source(source) {
    this[_].source = String(source);
  }

  constructor(options = {}) {
    super();

    this[_].styles = [];

    this.baseUrl = options.baseUrl;
    this.prefetch = options.prefetch;
    this.source = options.srouce;
  }

  write(dir, options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield Object(_libs__WEBPACK_IMPORTED_MODULE_3__["mkdirp"])(dir);

      options = _extends({}, options, {
        prefetch: _this.prefetch
      });

      const indexFilePath = `${dir}/index.js`;
      const childFilePaths = [indexFilePath];

      if (!options.prefetch) {
        yield _libs__WEBPACK_IMPORTED_MODULE_3__["fs"].writeFile(indexFilePath, _this[_].composeStyleLoader());
        return childFilePaths;
      }

      const styleFileNames = _this.styles.map(function (style, index, { length }) {
        const fileName = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["padLeft"])(index, length / 10 + 1, 0) + '.css';
        const filePath = `${dir}/${fileName}`;
        childFilePaths.push(filePath);

        return fileName;
      });

      const fetchingStyles = _this.styles.map((() => {
        var _ref = _asyncToGenerator(function* (style, index) {
          const styleFileName = styleFileNames[index];

          const sheet = style.type == 'sheet' ? style.body : /^http/.test(style.body) ? yield node_fetch__WEBPACK_IMPORTED_MODULE_1___default()(style.body).then(function (res) {
            return res.text();
          }) : yield _utils__WEBPACK_IMPORTED_MODULE_4__["requireText"].promise(`${_this.baseUrl}/${style.body}`);

          return _libs__WEBPACK_IMPORTED_MODULE_3__["fs"].writeFile(`${dir}/${styleFileName}`, _this[_].transformSheet(sheet));
        });

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      })());

      const stylesIndexContent = styleFileNames.map(function (styleFileName) {
        return `import './${styleFileName}'`;
      }).join('\n');

      const writingIndex = _libs__WEBPACK_IMPORTED_MODULE_3__["fs"].writeFile(indexFilePath, Object(_utils__WEBPACK_IMPORTED_MODULE_4__["freeLint"])(stylesIndexContent));

      yield Promise.all([...fetchingStyles, writingIndex]);

      return childFilePaths;
    })();
  }

  setStyle(href, content) {
    let type;
    let body;

    if (href) {
      type = 'href';
      body = /^\w+:\/\//.test(href) ? href : path__WEBPACK_IMPORTED_MODULE_2___default.a.resolve('/', href);
    } else {
      type = 'sheet';
      body = content;
    }

    const exists = this[_].styles.some(style => {
      return style.body == body;
    });

    if (!exists) {
      this[_].styles.push({ type, body });
    }
  }

  _composeStyleLoader() {
    this[_].styles.forEach(style => {
      if (style.type == 'sheet') {
        style.body = this[_].transformSheet(style.body);
      }
    });

    const styles = this[_].styles.map(style => {
      return Object(_utils__WEBPACK_IMPORTED_MODULE_4__["freeText"])(`
        {
          type: '${style.type}',
          body: '${Object(_utils__WEBPACK_IMPORTED_MODULE_4__["escape"])(style.body, "'")}',
        },
      `);
    }).join('\n');

    return Object(_utils__WEBPACK_IMPORTED_MODULE_4__["freeLint"])(`
      const styles = [
        ==>${styles}<==
      ]

      const loadingStyles = styles.map((style) => {
        let styleEl
        let loading

        if (style.type == 'href') {
          styleEl = document.createElement('link')

          loading = new Promise((resolve, reject) => {
            styleEl.onload = resolve
            styleEl.onerror = reject
          })

          styleEl.rel = 'stylesheet'
          styleEl.type = 'text/css'
          styleEl.href = style.body
        }
        else {
          styleEl = document.createElement('style')
          styleEl.type = 'text/css'
          styleEl.innerHTML = style.body

          loading = Promise.resolve()
        }

        document.head.appendChild(styleEl)

        return loading
      })

      export default Promise.all(loadingStyles).then(() => {
        const styleSheets = Array.from(document.styleSheets).filter((styleSheet) => {
          return styleSheet.href && styles.some((style) => {
            return style.type == 'href' && styleSheet.href.match(style.body)
          })
        })
        styleSheets.forEach((styleSheet) => {
          Array.from(styleSheet.rules).forEach((rule) => {
            if (rule.selectorText) {
              rule.selectorText = rule.selectorText
                .replace(/\\.([\\w_-]+)/g, '.af-class-$1')
                .replace(/\\[class(.?)="( ?)([^"]+)( ?)"\\]/g, '[class$1="$2af-class-$3$4"]')
                .replace(/([^\\s][^,]*)(\\s*,?)/g, '.af-view $1$2')
                .replace(/\\.af-view html/g, '.af-view')
                .replace(/\\.af-view body/g, '.af-view')
                ==>${this[_].composeSourceReplacements()}<==
            }
          })
        })
      })
    `);
  }

  _composeSourceReplacements() {
    switch (this.source) {
      case 'webflow':
        return Object(_utils__WEBPACK_IMPORTED_MODULE_4__["freeText"])(`
          .replace(/af-class-w-/g, 'w-')
        `);
      case 'sketch':
        return Object(_utils__WEBPACK_IMPORTED_MODULE_4__["freeText"])(`
          .replace(/af-class-anima-/g, 'anima-')
          .replace(/af-class-([\\w_-]+)an-animation([\\w_-]+)/g, '$1an-animation$2')
        `);
      default:
        return Object(_utils__WEBPACK_IMPORTED_MODULE_4__["freeText"])(`
          .replace(/af-class-w-/g, 'w-')
          .replace(/af-class-anima-/g, 'anima-')
          .replace(/af-class-([\\w_-]+)an-animation([\\w_-]+)/g, '$1an-animation$2')
        `);
    }
  }

  // Will minify and encapsulate classes
  _transformSheet(sheet) {
    sheet = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["encapsulateCSS"])(sheet, this.source);
    sheet = cleanCSS.minify(sheet).styles;

    // Make URLs absolute so webpack won't throw any errors
    return sheet.replace(/url\(([^)]+)\)/g, (match, url) => {
      if (/^(.+):\/\//.test(url)) return match;

      url = path__WEBPACK_IMPORTED_MODULE_2___default.a.resolve('/', url);
      return `url(${url})`;
    });
  }
}) || _class);


/* harmony default export */ __webpack_exports__["default"] = (StyleWriter);

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("clean-css");

/***/ })
/******/ ]);
//# sourceMappingURL=appfairy.js.map