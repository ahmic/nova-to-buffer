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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(8)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue, router, store) {
    Vue.component('nova-to-buffer', __webpack_require__(5));
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(9)
/* template */
var __vue_template__ = __webpack_require__(18)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Tool.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68ff5483", Component.options)
  } else {
    hotAPI.reload("data-v-68ff5483", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iconbuffer__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iconbuffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__iconbuffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iconexternal__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iconexternal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__iconexternal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icondown__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icondown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__icondown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__preview__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__preview___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__preview__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['resourceName', 'resourceId', 'field', 'panel'],

    data: function data() {
        return {
            description: '',
            publishnow: false,
            processing: false,
            response: null,
            responsed: { "updates": [{ "_id": "5d16a867258cc50d7757a142", "client_id": "5d13f8aad267c037bb2069a2", "created_at": 1561765991, "day": "No scheduled days or times", "due_at": 0, "due_time": "-", "id": "5d16a867258cc50d7757a142", "is_video_processing": false, "library_update_id": "", "needs_approval": false, "organization_id": "5d13f7391366d5346f3c1125", "perm_approvable": false, "perm_editable": true, "pinned": false, "profile_id": "5d1540122a12ce0b141dbd22", "profile_service": "twitter", "shared_now": false, "status": "buffer", "text": "https://itbase.ba/vijesti/1342/otvorene-prijave-za-regionalni-elevator-lab-challenge", "text_formatted": "<a class=\"url\" href=\"https://itbase.ba/vijesti/1342/otvorene-prijave-za-regionalni-elevator-lab-challenge\" rel=\"external nofollow\" target=\"_blank\">https://itbase.ba/vijesti/1342/otvorene-prijave-za-regionalni-elevator-lab-challenge</a>", "text_md5": "0b42fc9e6f39da4343518f38208b767a", "type": "link", "updated_at": 1561765991, "user_id": "5d13f7391366d5346f3c1124", "via": "api", "service_link": "" }, { "_id": "5d16a868258cc50d7757a143", "client_id": "5d13f8aad267c037bb2069a2", "created_at": 1561765992, "day": "No scheduled days or times", "due_at": 0, "due_time": "-", "id": "5d16a868258cc50d7757a143", "is_video_processing": false, "library_update_id": "", "media": { "link": "https://itbase.ba/vijesti/1342/otvorene-prijave-za-regionalni-elevator-lab-challenge", "title": "Otvorene prijave za regionalni Elevator Lab Challenge | IT Base", "description": "Raiffeisen Bank dd Bosna i Hercegovina objavila je službeni početak regionalnog projekta za startupe u oblasti finansijskih tehnologija, \"Elevator Lab Challenge\", koji je dio međunarodnog Elevator...", "expanded_link": "https://itbase.ba/vijesti/1342/otvorene-prijave-za-regionalni-elevator-lab-challenge", "preview": "https://itbase.ba/storage/img/posts/8305a1b4-55dc-48a2-931b-e94ad6efe5b9.png" }, "needs_approval": false, "organization_id": "5d13f7391366d5346f3c1125", "perm_approvable": false, "perm_editable": true, "pinned": false, "profile_id": "5d13f781311f3c63c430771e", "profile_service": "facebook", "shared_now": false, "status": "buffer", "text": "", "text_formatted": "", "text_md5": "0b42fc9e6f39da4343518f38208b767a", "type": "link", "updated_at": 1561765992, "user_id": "5d13f7391366d5346f3c1124", "via": "api" }], "buffer_percentage": 10, "buffer_count": 1, "success": true, "message": "One more post in your Buffer. Keep it topped up!", "code": false },
            status: null,
            message: ''
        };
    },
    mounted: function mounted() {},


    computed: {
        url: function url() {
            return this.panel.fields[0].url;
        },
        profileIds: function profileIds() {
            return this.panel.fields[0].profile_ids;
        }
    },

    methods: {
        toggle: function toggle() {
            this.publishnow = !this.publishnow;
        },
        publish: function publish() {
            var _this = this;

            this.processing = true;

            Nova.request().post('/nova-vendor/nova-to-buffer', { url: this.url, description: this.description, now: this.publishnow }).then(function (response) {
                _this.processing = false;
                _this.response = response.data.data;
                _this.status = response.data.status;
                _this.message = response.data.message;
            }).catch(function (error) {
                _this.processing = false;
                _this.status = response.data.status;
                _this.message = response.data.message;
            });
        },
        showHelp: function showHelp() {}
    },

    components: {
        IconBuffer: __WEBPACK_IMPORTED_MODULE_0__iconbuffer___default.a,
        IconExternal: __WEBPACK_IMPORTED_MODULE_1__iconexternal___default.a,
        IconDown: __WEBPACK_IMPORTED_MODULE_2__icondown___default.a
    }
});

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(13)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(15)
/* template */
var __vue_template__ = __webpack_require__(16)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-271d414d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/preview.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-271d414d", Component.options)
  } else {
    hotAPI.reload("data-v-271d414d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("e8107190", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-271d414d\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./preview.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-271d414d\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./preview.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.preview[data-v-271d414d] {\n    box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);\n    border-radius: .5rem\n}\n.title[data-v-271d414d] {\n    font-size: 1.1em;\n}\n.url[data-v-271d414d] {\n    font-size: .8em;\n}\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['title', 'url', 'imageUrl', 'description'],

    mounted: function mounted() {}
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "preview border border-50 px-1 py-1 w-1/4" },
    [
      _vm.description.length > 0
        ? _c("span", {
            staticClass: "description inline-block mb-2 mt-1",
            domProps: { textContent: _vm._s(_vm.description) }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("img", { attrs: { src: _vm.imageUrl } }),
      _vm._v(" "),
      _c("span", {
        staticClass: "title mt-1 mb-2 inline-block",
        domProps: { textContent: _vm._s(_vm.title) }
      }),
      _vm._v(" "),
      _c("span", {
        staticClass: "url",
        domProps: { textContent: _vm._s(_vm.url) }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-271d414d", module.exports)
  }
}

/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "div",
        { staticClass: "flex items-center mb-3" },
        [
          _c(
            "heading",
            { staticClass: "text-90 font-normal text-2xl flex-no-shrink" },
            [_c("icon-buffer"), _vm._v(" Post to Buffer")],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "ml-3 w-full flex items-center justify-end" },
            [
              _c(
                "dropdown",
                {
                  attrs: { dusk: "select-all-dropdown" },
                  scopedSlots: _vm._u([
                    {
                      key: "default",
                      fn: function(ref) {
                        var toggle = ref.toggle
                        return _c(
                          "dropdown-trigger",
                          {
                            staticClass: "mr-3",
                            attrs: { "show-arrow": false, handleClick: toggle }
                          },
                          [
                            _c(
                              "button",
                              {
                                staticClass:
                                  "btn btn-default btn-icon btn-white text-80 font-normal no-text-shadow"
                              },
                              [
                                _vm.profileIds.length == 0
                                  ? _c("span", {
                                      staticClass:
                                        "inline-block rounded-full w-2 h-2 mr-2 bg-danger"
                                    })
                                  : _c("span", {
                                      staticClass:
                                        "inline-block rounded-full w-2 h-2 mr-2 bg-success"
                                    }),
                                _vm._v(
                                  "\n                        Profiles (" +
                                    _vm._s(_vm.profileIds.length) +
                                    ")\n                        "
                                ),
                                _c("icon-down")
                              ],
                              1
                            )
                          ]
                        )
                      }
                    }
                  ])
                },
                [
                  _vm._v(" "),
                  _c(
                    "dropdown-menu",
                    {
                      attrs: { slot: "menu", direction: "ltr", width: "250" },
                      slot: "menu"
                    },
                    [
                      _c("div", { staticClass: "px-3 py-2 text-center" }, [
                        _vm.profileIds.length == 0
                          ? _c("div", { staticClass: "warning" }, [
                              _vm._v(
                                "\n                            No profile ids found! Edit config\n                        "
                              )
                            ])
                          : _c(
                              "div",
                              {},
                              _vm._l(_vm.profileIds, function(profileId) {
                                return _c(
                                  "p",
                                  { staticClass: "py-1 text-xs" },
                                  [_vm._v(_vm._s(profileId))]
                                )
                              }),
                              0
                            )
                      ])
                    ]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass:
                    "btn btn-default btn-icon btn-white text-80 font-normal no-text-shadow",
                  attrs: {
                    href: "https://publish.buffer.com",
                    target: "_blank"
                  }
                },
                [_vm._v("Buffer dashboard "), _c("icon-external")],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.response == null
        ? _c("card", [
            _c("div", { staticClass: "px-3 py-3" }, [
              _c("div", { staticClass: "flex mb-3" }, [
                _c("div", { staticClass: "w-1/4" }, [
                  _c(
                    "label",
                    {
                      staticClass: "inline-block text-80 leading-tight",
                      attrs: { for: "publishnow" }
                    },
                    [
                      _vm._v(
                        "\n                        URL to be shared\n                    "
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "w-3/4" }, [
                  _c("input", {
                    staticClass:
                      "form-control form-input form-input-bordered w-full",
                    attrs: { type: "text", disabled: "" },
                    domProps: { value: _vm.url }
                  })
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "flex" }, [
                _c("div", { staticClass: "w-1/4" }, [
                  _c(
                    "label",
                    {
                      staticClass: "inline-block text-80 leading-tight",
                      attrs: { for: "publishnow" }
                    },
                    [
                      _vm._v(
                        "\n                        Post description\n                    "
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "w-3/4" }, [
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.description,
                        expression: "description"
                      }
                    ],
                    staticClass:
                      "post-status w-full form-control form-input form-input-bordered py-3 h-auto",
                    attrs: { name: "description", rows: "2" },
                    domProps: { value: _vm.description },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.description = $event.target.value
                      }
                    }
                  })
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "flex mt-3" }, [
                _c("div", { staticClass: "w-1/4 pr-3" }, [
                  _c(
                    "label",
                    {
                      staticClass: "inline-block text-80 leading-tight",
                      attrs: { for: "publishnow" }
                    },
                    [
                      _vm._v(
                        "\n                        Publish now\n                    "
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "w-3/4 flex flex-inline align-center" },
                  [
                    _c("checkbox", {
                      staticClass: "inline-flex",
                      attrs: {
                        id: _vm.publishnow,
                        name: "pusblishnow",
                        checked: _vm.publishnow,
                        disabled: false
                      },
                      on: { input: _vm.toggle }
                    }),
                    _vm._v(" "),
                    _c("help-text", { staticClass: "inline-flex ml-2" }, [
                      _vm._v(
                        "Check only if you want to publish immediately. Otherwise post will go to default queue."
                      )
                    ])
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "flex" }, [
                _c(
                  "div",
                  { staticClass: "ml-auto" },
                  [
                    _c(
                      "progress-button",
                      {
                        attrs: {
                          processing: _vm.processing,
                          disabled: _vm.processing
                        },
                        nativeOn: {
                          click: function($event) {
                            return _vm.publish($event)
                          }
                        }
                      },
                      [_vm._v("Send update")]
                    )
                  ],
                  1
                )
              ])
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.response != null
        ? _c("card", [
            _c("div", { staticClass: "px-3 py-3 flex" }, [
              _c("div", { staticClass: "w-full" }, [
                _c("div", { staticClass: "flex border-b border-40" }, [
                  _c("div", { staticClass: "w-1/4 py-4" }, [
                    _c("h4", { staticClass: "font-normal text-80" }, [
                      _vm._v("Message")
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "w-3/4 py-4" }, [
                    _c("p", { staticClass: "text-90" }, [
                      _vm._v(_vm._s(_vm.response.message))
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "flex border-b border-40" }, [
                  _c("div", { staticClass: "w-1/4 py-4" }, [
                    _c("h4", { staticClass: "font-normal text-80" }, [
                      _vm._v("Buffer count")
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "w-3/4 py-4" }, [
                    _c("p", { staticClass: "text-90" }, [
                      _vm._v(_vm._s(_vm.response.buffer_count))
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "flex" }, [
                  _c("div", { staticClass: "w-1/4 py-4" }, [
                    _c("h4", { staticClass: "font-normal text-80" }, [
                      _vm._v("Updates")
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "w-3/4 py-4" },
                    [
                      _c("p", { staticClass: "text-90" }),
                      _vm._l(_vm.response.updates, function(update) {
                        return _c(
                          "div",
                          { key: update._id, staticClass: "mb-2" },
                          [
                            _c("p", { staticClass: "text-90 mb-1" }, [
                              _vm._v(
                                "Channel: " + _vm._s(update.profile_service)
                              )
                            ]),
                            _vm._v(" "),
                            !update.shared_now
                              ? _c("div", [
                                  _c("p", { staticClass: "text-90 mb-1" }, [
                                    _vm._v("Day: " + _vm._s(update.day))
                                  ]),
                                  _vm._v(" "),
                                  update.due_time != "-"
                                    ? _c("p", { staticClass: "text-90" }, [
                                        _vm._v(
                                          "Due time: " + _vm._s(update.due_time)
                                        )
                                      ])
                                    : _vm._e()
                                ])
                              : _c("div", [
                                  _c("p", { staticClass: "text-90" }, [
                                    _vm._v("Shared now")
                                  ])
                                ])
                          ]
                        )
                      })
                    ],
                    2
                  )
                ])
              ])
            ])
          ])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-68ff5483", module.exports)
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(20)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/iconbuffer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-69e90e04", Component.options)
  } else {
    hotAPI.reload("data-v-69e90e04", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "inline-block mr-1", staticStyle: { width: "20px" } },
    [
      _c(
        "svg",
        {
          staticStyle: { "enable-background": "new 0 0 350.001 350.001" },
          attrs: {
            version: "1.1",
            id: "Layer_1",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            x: "0px",
            y: "0px",
            viewBox: "0 0 350.001 350.001",
            "xml:space": "preserve"
          }
        },
        [
          _c("g", [
            _c("path", {
              staticStyle: { fill: "#222A30" },
              attrs: {
                d:
                  "M14.092,88.769L172.1,164.826c1.833,0.882,3.969,0.882,5.802,0L335.91,88.768\n        c5.051-2.429,5.051-9.621,0-12.051L177.9,0.662c-1.832-0.882-3.968-0.882-5.801,0L14.092,76.718\n        C9.041,79.148,9.041,86.339,14.092,88.769z"
              }
            }),
            _vm._v(" "),
            _c("path", {
              staticStyle: { fill: "#222A30" },
              attrs: {
                d:
                  "M14.092,181.024L172.1,257.082c1.833,0.882,3.969,0.882,5.802,0l158.008-76.057\n        c5.051-2.429,5.051-9.621,0-12.053l-33.336-16.044l-105.881,50.962c-6.726,3.236-14.228,4.946-21.692,4.946\n        s-14.964-1.71-21.702-4.951L47.43,152.924l-33.339,16.047C9.041,171.404,9.041,178.595,14.092,181.024z"
              }
            }),
            _vm._v(" "),
            _c("path", {
              staticStyle: { fill: "#222A30" },
              attrs: {
                d:
                  "M335.91,261.229l-33.336-16.047l-105.881,50.965c-6.726,3.236-14.228,4.946-21.692,4.946\n        s-14.964-1.71-21.702-4.951L47.43,245.182L14.091,261.23c-5.051,2.432-5.051,9.621,0,12.053l158.008,76.057\n        c1.833,0.882,3.969,0.882,5.802,0l158.008-76.057C340.961,270.85,340.961,263.66,335.91,261.229z"
              }
            })
          ]),
          _vm._v(" "),
          _c("g"),
          _vm._v(" "),
          _c("g"),
          _vm._v(" "),
          _c("g"),
          _vm._v(" "),
          _c("g"),
          _vm._v(" "),
          _c("g"),
          _vm._v(" "),
          _c("g"),
          _vm._v(" "),
          _c("g"),
          _vm._v(" "),
          _c("g"),
          _vm._v(" "),
          _c("g"),
          _vm._v(" "),
          _c("g"),
          _vm._v(" "),
          _c("g"),
          _vm._v(" "),
          _c("g"),
          _vm._v(" "),
          _c("g"),
          _vm._v(" "),
          _c("g"),
          _vm._v(" "),
          _c("g")
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-69e90e04", module.exports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(22)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/iconexternal.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0addf5e2", Component.options)
  } else {
    hotAPI.reload("data-v-0addf5e2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "flex ml-2", staticStyle: { width: "18px" } },
    [
      _c(
        "svg",
        {
          staticStyle: { fill: "#000000" },
          attrs: {
            xmlns: "http://www.w3.org/2000/svg",
            x: "0px",
            y: "0px",
            width: "24",
            height: "24",
            viewBox: "0 0 172 172"
          }
        },
        [
          _c("g", { attrs: { transform: "" } }, [
            _c(
              "g",
              {
                staticStyle: { "mix-blend-mode": "normal" },
                attrs: {
                  fill: "none",
                  "fill-rule": "nonzero",
                  stroke: "none",
                  "stroke-width": "1",
                  "stroke-linecap": "butt",
                  "stroke-linejoin": "miter",
                  "stroke-miterlimit": "10",
                  "stroke-dasharray": "",
                  "stroke-dashoffset": "0",
                  "font-family": "none",
                  "font-weight": "none",
                  "font-size": "none",
                  "text-anchor": "none"
                }
              },
              [
                _c("path", {
                  attrs: { d: "M0,172v-172h172v172z", fill: "none" }
                }),
                _c("path", { attrs: { d: "", fill: "none" } }),
                _c("g", { attrs: { fill: "#666666" } }, [
                  _c("path", {
                    attrs: {
                      d:
                        "M143.19336,21.43001c-0.26705,0.00844 -0.53341,0.03181 -0.79785,0.06999h-34.89551c-2.58456,-0.03655 -4.98858,1.32136 -6.29153,3.55376c-1.30295,2.2324 -1.30295,4.99342 0,7.22582c1.30295,2.2324 3.70697,3.59031 6.29153,3.55376h18.53256l-66.59961,66.59961c-1.8722,1.79752 -2.62637,4.46674 -1.97164,6.97823c0.65473,2.51149 2.61604,4.4728 5.12753,5.12753c2.51149,0.65473 5.18071,-0.09944 6.97823,-1.97165l66.59961,-66.59961v18.53255c-0.03655,2.58456 1.32136,4.98858 3.55376,6.29153c2.2324,1.30295 4.99342,1.30295 7.22582,0c2.2324,-1.30295 3.59031,-3.70697 3.55376,-6.29153v-34.9235c0.28889,-2.08845 -0.35639,-4.19816 -1.76411,-5.76769c-1.40772,-1.56953 -3.43507,-2.43964 -5.54253,-2.3788zM35.83333,21.5c-7.83362,0 -14.33333,6.49972 -14.33333,14.33333v100.33333c0,7.83362 6.49972,14.33333 14.33333,14.33333h100.33333c7.83362,0 14.33333,-6.49972 14.33333,-14.33333v-43c0.03655,-2.58456 -1.32136,-4.98858 -3.55376,-6.29153c-2.2324,-1.30295 -4.99342,-1.30295 -7.22582,0c-2.2324,1.30295 -3.59031,3.70697 -3.55376,6.29153v43h-100.33333v-100.33333h43c2.58456,0.03655 4.98858,-1.32136 6.29153,-3.55376c1.30295,-2.2324 1.30295,-4.99342 0,-7.22582c-1.30295,-2.2324 -3.70697,-3.59031 -6.29153,-3.55376z"
                    }
                  })
                ])
              ]
            )
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0addf5e2", module.exports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(24)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/icondown.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-79fd0f34", Component.options)
  } else {
    hotAPI.reload("data-v-79fd0f34", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "svg",
      {
        staticClass: "ml-2",
        attrs: {
          width: "10px",
          height: "6px",
          viewBox: "0 0 10 6",
          version: "1.1",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink"
        }
      },
      [
        _c(
          "g",
          {
            attrs: {
              stroke: "none",
              "stroke-width": "1",
              fill: "none",
              "fill-rule": "evenodd"
            }
          },
          [
            _c(
              "g",
              {
                attrs: {
                  id: "04-user",
                  transform: "translate(-385.000000, -573.000000)",
                  fill: "#8c8c8c",
                  "fill-rule": "nonzero"
                }
              },
              [
                _c("path", {
                  attrs: {
                    d:
                      "M393.292893,573.292893 C393.683418,572.902369 394.316582,572.902369 394.707107,573.292893 C395.097631,573.683418 395.097631,574.316582 394.707107,574.707107 L390.707107,578.707107 C390.316582,579.097631 389.683418,579.097631 389.292893,578.707107 L385.292893,574.707107 C384.902369,574.316582 384.902369,573.683418 385.292893,573.292893 C385.683418,572.902369 386.316582,572.902369 386.707107,573.292893 L390,576.585786 L393.292893,573.292893 Z",
                    id: "Path-2-Copy"
                  }
                })
              ]
            )
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-79fd0f34", module.exports)
  }
}

/***/ })
/******/ ]);