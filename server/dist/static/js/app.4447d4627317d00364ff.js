webpackJsonp([1],{

/***/ "/M+5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "EYRZ":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm.js
var vue_esm = __webpack_require__("7+uW");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/App.vue
//
//
//
//
//
//

/* harmony default export */ var App = ({
  name: 'App'
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-69b99eef","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/App.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('router-view')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_src_App = (esExports);
// CONCATENATED MODULE: ./src/App.vue
function injectStyle (ssrContext) {
  __webpack_require__("T7Rp")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  App,
  selectortype_template_index_0_src_App,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_App = (Component.exports);

// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__("/ocq");

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("mtWM");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./src/common/api.js

axios_default.a.defaults.timeout = 5000;
axios_default.a.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios_default.a.defaults.baseURL = 'http://localhost:8989';

function fetch(url, data) {
  return axios_default.a.post(url, data);
}

var indexApi = {
  login: function login(data) {
    return fetch('/user/login', data);
  },
  regist: function regist(data) {
    return fetch('/user/regist', data);
  }
};
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/Login.vue

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


/* harmony default export */ var Login = ({
    name: 'login',
    data: function data() {
        return {
            formInline: {
                username: '',
                pwd: '',
                phone: ''

            },
            autoLogin: false,
            type: true //type true为登录状态，false为注册状态
        };
    },

    methods: {
        handleType: function handleType() {
            this.type = !this.type;
        },
        handleSubmit: function handleSubmit() {
            var _this = this;

            console.log(this.type);
            var _formInline = this.formInline,
                username = _formInline.username,
                pwd = _formInline.pwd,
                phone = _formInline.phone;

            var phoneTest = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
            var pwdTest = /^[a-zA-Z0-9]{6,12}$/;
            if (!this.type) {
                if (username.length == 0) {
                    return this.$Message.error('请输入用户名！');
                }
            }
            if (!phoneTest.test(phone)) {
                return this.$Message.error('请输入正确的手机号码！');
            }
            if (!pwdTest.test(pwd)) {
                return this.$Message.error('密码为6到12位数组与字母！');
            }
            if (this.type) {
                indexApi.login({ username: username, pwd: pwd }).then(function (res) {
                    console.log(res);
                    res = res.data;
                    if (res.code) {
                        return _this.$Message.error(res.msg);
                    }
                    var _res = res,
                        username = _res.username,
                        id = _res.id;

                    var useMsg = { phone: phone, pwd: pwd, username: username, id: id };
                    localStorage.setItem("useMsg", stringify_default()(useMsg));
                    _this.$router.push({ path: '/room' });
                });
                return;
            }
            indexApi.regist({ username: username, pwd: pwd, phone: phone }).then(function (res) {
                console.log(res);
                res = res.data;
                if (res.code) {
                    return _this.$Message.error(res.msg);
                }
                _this.$Message.success(res.msg + '请登陆！');
                _this.type = true;
            });
        }
    },
    watch: {
        autoLogin: function autoLogin() {
            localStorage.setItem("autoLogin", this.autoLogin);
        }
    },
    beforeMount: function beforeMount() {
        var useMsg = JSON.parse(localStorage.getItem("useMsg"));
        var autoLogin = JSON.parse(localStorage.getItem("autoLogin"));

        this.autoLogin = autoLogin;
        if (useMsg != null) {
            console.log('....');
            this.formInline.phone = useMsg.phone;
            this.formInline.pwd = useMsg.pwd;
        }
        if (this.autoLogin) {
            this.handleSubmit();
        }
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6170bb22","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/Login.vue
var Login_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"container"}},[_c('div',{staticClass:"wrap"},[_c('div',{staticClass:"title"},[_c('Icon',{attrs:{"type":"android-contacts"}}),_vm._v(" 登录")],1),_vm._v(" "),_c('Form',{ref:"formInline",attrs:{"model":_vm.formInline}},[_c('FormItem',[_c('Input',{attrs:{"type":"text","maxlength":8,"placeholder":"用户名"},model:{value:(_vm.formInline.username),callback:function ($$v) {_vm.$set(_vm.formInline, "username", (typeof $$v === 'string'? $$v.trim(): $$v))},expression:"formInline.username"}},[_c('Icon',{attrs:{"slot":"prepend","type":"ios-person-outline"},slot:"prepend"})],1)],1),_vm._v(" "),_c('FormItem',[_c('Input',{directives:[{name:"show",rawName:"v-show",value:(!_vm.type),expression:"!type"}],attrs:{"type":"text","maxlength":11,"placeholder":"手机号"},model:{value:(_vm.formInline.phone),callback:function ($$v) {_vm.$set(_vm.formInline, "phone", (typeof $$v === 'string'? $$v.trim(): $$v))},expression:"formInline.phone"}},[_c('Icon',{attrs:{"slot":"prepend","type":"ios-person-outline"},slot:"prepend"})],1)],1),_vm._v(" "),_c('FormItem',[_c('Input',{attrs:{"type":"password","maxlength":12,"placeholder":"密码"},model:{value:(_vm.formInline.pwd),callback:function ($$v) {_vm.$set(_vm.formInline, "pwd", (typeof $$v === 'string'? $$v.trim(): $$v))},expression:"formInline.pwd"}},[_c('Icon',{attrs:{"slot":"prepend","type":"ios-locked-outline"},slot:"prepend"})],1)],1),_vm._v(" "),_c('FormItem',[_c('Input',{directives:[{name:"show",rawName:"v-show",value:(!_vm.type),expression:"!type"}],attrs:{"type":"password","maxlength":12,"placeholder":"确认密码"}},[_c('Icon',{attrs:{"slot":"prepend","type":"ios-locked-outline"},slot:"prepend"})],1)],1),_vm._v(" "),_c('FormItem',{directives:[{name:"show",rawName:"v-show",value:(_vm.type),expression:"type"}]},[_c('Checkbox',{model:{value:(_vm.autoLogin),callback:function ($$v) {_vm.autoLogin=$$v},expression:"autoLogin"}},[_vm._v("自动登录")])],1),_vm._v(" "),_c('FormItem',{directives:[{name:"show",rawName:"v-show",value:(_vm.type),expression:"type"}]},[_c('Button',{attrs:{"type":"primary","long":""},on:{"click":function($event){_vm.handleSubmit('formInline')}}},[_vm._v("登录")])],1),_vm._v(" "),_c('FormItem',{directives:[{name:"show",rawName:"v-show",value:(!_vm.type),expression:"!type"}]},[_c('Button',{attrs:{"type":"primary","long":""},on:{"click":function($event){_vm.handleSubmit('formInline')}}},[_vm._v("注册")])],1)],1),_vm._v(" "),_c('div',{staticClass:"type"},[_vm._v(_vm._s(_vm.type?'没有账号':'已有账号')+"？"),_c('a',{on:{"click":function($event){_vm.handleType()}}},[_vm._v(_vm._s(_vm.type ? '立即注册' : '立即登录'))])])],1)])}
var Login_staticRenderFns = []
var Login_esExports = { render: Login_render, staticRenderFns: Login_staticRenderFns }
/* harmony default export */ var pages_Login = (Login_esExports);
// CONCATENATED MODULE: ./src/pages/Login.vue
function Login_injectStyle (ssrContext) {
  __webpack_require__("Q0rp")
}
var Login_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Login___vue_template_functional__ = false
/* styles */
var Login___vue_styles__ = Login_injectStyle
/* scopeId */
var Login___vue_scopeId__ = "data-v-6170bb22"
/* moduleIdentifier (server only) */
var Login___vue_module_identifier__ = null
var Login_Component = Login_normalizeComponent(
  Login,
  pages_Login,
  Login___vue_template_functional__,
  Login___vue_styles__,
  Login___vue_scopeId__,
  Login___vue_module_identifier__
)

/* harmony default export */ var src_pages_Login = (Login_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/Home.vue
//
//
//
//
//
//
//
//
//


// import io from 'socket.io'
/* harmony default export */ var Home = ({
  name: 'login',
  data: function data() {
    return {
      socket: null
    };
  },

  methods: {},
  beforeMount: function beforeMount() {
    var useMsg = JSON.parse(localStorage.getItem('useMsg'));
    var id = useMsg.id,
        username = useMsg.username;

    var host = window.location.host;
    host = host.split(':');
    this.socket = io.connect('ws://' + host[0] + ':8888');
    this.socket.emit('into', { username: username, id: id });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-875900cc","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/Home.vue
var Home_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"Room"}},[_c('h2',[_vm._v("首页")]),_vm._v(" "),_c('router-view')],1)}
var Home_staticRenderFns = []
var Home_esExports = { render: Home_render, staticRenderFns: Home_staticRenderFns }
/* harmony default export */ var pages_Home = (Home_esExports);
// CONCATENATED MODULE: ./src/pages/Home.vue
function Home_injectStyle (ssrContext) {
  __webpack_require__("EYRZ")
}
var Home_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Home___vue_template_functional__ = false
/* styles */
var Home___vue_styles__ = Home_injectStyle
/* scopeId */
var Home___vue_scopeId__ = "data-v-875900cc"
/* moduleIdentifier (server only) */
var Home___vue_module_identifier__ = null
var Home_Component = Home_normalizeComponent(
  Home,
  pages_Home,
  Home___vue_template_functional__,
  Home___vue_styles__,
  Home___vue_scopeId__,
  Home___vue_module_identifier__
)

/* harmony default export */ var src_pages_Home = (Home_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/Search.vue
//
//
//
//
//
//

/* harmony default export */ var Search = ({
    name: "search"
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-59a3d1dc","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/Search.vue
var Search_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._v("\n  sousou\n")])}
var Search_staticRenderFns = []
var Search_esExports = { render: Search_render, staticRenderFns: Search_staticRenderFns }
/* harmony default export */ var pages_Search = (Search_esExports);
// CONCATENATED MODULE: ./src/pages/Search.vue
function Search_injectStyle (ssrContext) {
  __webpack_require__("W0ao")
}
var Search_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Search___vue_template_functional__ = false
/* styles */
var Search___vue_styles__ = Search_injectStyle
/* scopeId */
var Search___vue_scopeId__ = "data-v-59a3d1dc"
/* moduleIdentifier (server only) */
var Search___vue_module_identifier__ = null
var Search_Component = Search_normalizeComponent(
  Search,
  pages_Search,
  Search___vue_template_functional__,
  Search___vue_styles__,
  Search___vue_scopeId__,
  Search___vue_module_identifier__
)

/* harmony default export */ var src_pages_Search = (Search_Component.exports);

// CONCATENATED MODULE: ./src/router/index.js






//const Login =  r => require.ensure([],() => r(require('@/pages/Login.vue')),'login')
vue_esm["default"].use(vue_router_esm["a" /* default */]);

/* harmony default export */ var router = (new vue_router_esm["a" /* default */]({
  routes: [{
    path: '/',
    name: 'Login',
    component: src_pages_Login
  }, {
    path: '/home',
    name: 'homePage',
    component: src_pages_Home,
    beforeEnter: function beforeEnter(to, from, next) {
      if (from.name == null) {
        next({
          path: '/'
        });
      } else {
        next();
      }
    },
    children: [{
      path: 'search',
      name: 'searchPage',
      component: src_pages_Search
    }]
  }, {
    path: '*',
    redirect: '/'
  }]
}));
// EXTERNAL MODULE: ./node_modules/iview/dist/iview.js
var iview = __webpack_require__("BTaQ");
var iview_default = /*#__PURE__*/__webpack_require__.n(iview);

// EXTERNAL MODULE: ./src/my-theme/index.less
var my_theme = __webpack_require__("/M+5");
var my_theme_default = /*#__PURE__*/__webpack_require__.n(my_theme);

// CONCATENATED MODULE: ./src/main.js







vue_esm["default"].use(iview_default.a);
vue_esm["default"].config.productionTip = false;
new vue_esm["default"]({
  el: '#app',
  router: router,
  components: { App: src_App },
  template: '<App/>',
  beforeMount: function beforeMount() {
    this.$Message.config({
      top: 30,
      duration: 3
    });
  }
});

/***/ }),

/***/ "Q0rp":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "T7Rp":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "W0ao":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},["NHnr"]);
//# sourceMappingURL=app.4447d4627317d00364ff.js.map