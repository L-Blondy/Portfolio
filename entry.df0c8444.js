parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"WPjX":[function(require,module,exports) {

},{"./..\\assets\\hex\\hex1-out.svg":[["hex1-out.426c20e0.svg","H1EX"],"H1EX"],"./..\\assets\\hex\\hex1-full.svg":[["hex1-full.c184188c.svg","WfA8"],"WfA8"],"./..\\assets\\hex\\hex2-out.svg":[["hex2-out.28086de3.svg","sGkr"],"sGkr"],"./..\\assets\\hex\\hex2-full.svg":[["hex2-full.0a8812a5.svg","X42n"],"X42n"],"./..\\assets\\icons\\javascript.svg":[["javascript.20bb65c7.svg","IAa0"],"IAa0"],"./..\\assets\\icons\\html5.svg":[["html5.9e0eb5f8.svg","GJ8x"],"GJ8x"],"./..\\assets\\icons\\css3.svg":[["css3.ecdb4b49.svg","LbUr"],"LbUr"],"./..\\assets\\icons\\react.svg":[["react.afb60cd2.svg","f5n4"],"f5n4"],"./..\\assets\\icons\\linkedin.svg":[["linkedin.d1d7c0f8.svg","XJy8"],"XJy8"],"./..\\assets\\icons\\github.svg":[["github.409e10ac.svg","YafB"],"YafB"],"./..\\assets\\icons\\npm.svg":[["npm.113029c2.svg","tMJc"],"tMJc"],"./..\\assets\\laurent_blondy\\laurent_blondy_desktop.svg":[["laurent_blondy_desktop.28afa769.svg","vZNk"],"vZNk"],"./..\\assets\\front-end-dev\\front-end-dev_desktop.svg":[["front-end-dev_desktop.4210c505.svg","Jmbp"],"Jmbp"],"./..\\assets\\laurent_blondy\\laurent_blondy_lg-tablet.svg":[["laurent_blondy_lg-tablet.43bf9eb6.svg","hyGl"],"hyGl"],"./..\\assets\\front-end-dev\\front-end-dev_tablet.svg":[["front-end-dev_tablet.27261161.svg","TtJq"],"TtJq"],"./..\\assets\\laurent_blondy\\laurent.svg":[["laurent.8341702e.svg","z1AS"],"z1AS"],"./..\\assets\\laurent_blondy\\blondy.svg":[["blondy.eb0a2721.svg","Gfd5"],"Gfd5"],"./..\\assets\\front-end-dev\\front-end-dev_phone.svg":[["front-end-dev_phone.977f4b9e.svg","KC8S"],"KC8S"]}],"EuNu":[function(require,module,exports) {
var s=document.querySelector(".burger"),e=document.querySelector(".navlinks"),c=function(c){e.classList.toggle("open"),s.classList.toggle("cross"),s.classList.toggle("close")},t=function(e){s.classList.contains("cross")&&c()};s.addEventListener("click",c),e.addEventListener("click",t);
},{}],"dmvZ":[function(require,module,exports) {

},{}],"lw2h":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.onVisible=t,require("./slideIn.css");var e=document.querySelectorAll("[data-onVisible]");function t(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},o=t.class,s=t.duration,n=t.delay,r=void 0===n?0:n,i=t.reverse,a=void 0!==i&&i;try{"string"==typeof e&&(e=document.querySelectorAll(e)),e.length||(e=[e]),a&&(e=[].slice.call(e).reverse());var c=new IntersectionObserver(function(e){e.forEach(function(e,t){0<e.intersectionRatio&&(setTimeout(function(){e.target.classList.remove("offScreen"),e.target.className+=" "+o+" "},r*t),c.unobserve(e.target))})},{});[].forEach.call(e,function(e){s&&(e.style.animationDuration=s+"ms"),e.classList.add("offScreen"),c.observe(e)})}catch(t){"string"==typeof e&&(e=document.querySelectorAll(e)),e.length||(e=[e]),e.forEach(function(e){e.classList.add(e.dataset.onvisible)}),console.log("No slide in animation, this browser might not support the IntersectionObsever API")}}[].forEach.call(e,function(e){t(e,{class:e.dataset.onvisible})});
},{"./slideIn.css":"dmvZ"}],"wkPL":[function(require,module,exports) {
"use strict";function e(){var e=Math.min(window.innerHeight,document.documentElement.clientHeight);document.documentElement.style.setProperty("--vh100","".concat(e,"px"))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"U2ji":[function(require,module,exports) {
"use strict";function e(){document.addEventListener("click",function(e){var t=e.target.getAttribute("href"),r=document.querySelector(t);t&&"#"===e.target.getAttribute("href")[0]&&(e.preventDefault(),r.scrollIntoView({behavior:"smooth"}))})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"iWjG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"handle_responsive_CSS_variables",{enumerable:!0,get:function(){return e.default}}),Object.defineProperty(exports,"fixHashNav",{enumerable:!0,get:function(){return r.default}});var e=t(require("./handle_responsive_CSS_variables.js")),r=t(require("./fixHashNav.js"));function t(e){return e&&e.__esModule?e:{default:e}}
},{"./handle_responsive_CSS_variables.js":"wkPL","./fixHashNav.js":"U2ji"}],"BZ3n":[function(require,module,exports) {
"use strict";require("./src/styles/common.scss"),require("./src/components/navbar.js"),require("lb-onvisible");var e=require("./src/utils");function s(){(0,e.handle_responsive_CSS_variables)()}(0,e.fixHashNav)(),(0,e.handle_responsive_CSS_variables)(),window.addEventListener("resize",s);
},{"./src/styles/common.scss":"WPjX","./src/components/navbar.js":"EuNu","lb-onvisible":"lw2h","./src/utils":"iWjG"}]},{},["BZ3n"], null)
//# sourceMappingURL=https://l-blondy.github.io/Portfolio/entry.df0c8444.js.map