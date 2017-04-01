webpackJsonp([1,5],{

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(68)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(63),
  /* template */
  __webpack_require__(71),
  /* scopeId */
  "data-v-7a6f5bf0",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 63:
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

/* harmony default export */ __webpack_exports__["default"] = {
    data() {
        return {
            uploadUrl: config.getApi(config.api.upload_pic),
            loading: false,
            formModel: {
                is_show: 1
            },
            defaultList: [],
            imgName: '',
            visible: false,
            uploadList: []
        };
    },
    created() {},
    methods: {
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {
            // 从 upload 实例删除数据
            const fileList = this.$refs.upload.fileList;
            console.log(fileList);
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
            // 因为上传过程为实例，这里模拟添加 url
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            this.fileList = [];
            this.fileList.push(file);
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        handleBeforeUpload() {
            return this.uploadList.length < 2;
        }
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
    }
};

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(58)();
// imports


// module
exports.push([module.i, ".form[data-v-7a6f5bf0]{padding:20px}.demo-upload-list[data-v-7a6f5bf0]{display:inline-block;height:150px;text-align:center;line-height:150px;border:1px solid transparent;border-radius:4px;overflow:hidden;background:#fff;position:relative;box-shadow:0 1px 1px rgba(0,0,0,.2);margin-right:4px}.demo-upload-list img[data-v-7a6f5bf0]{height:100%}.demo-upload-list-cover[data-v-7a6f5bf0]{display:none;position:absolute;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.6)}.demo-upload-list:hover .demo-upload-list-cover[data-v-7a6f5bf0]{display:block}.demo-upload-list-cover i[data-v-7a6f5bf0]{color:#fff;font-size:20px;cursor:pointer;margin:0 2px}", "", {"version":3,"sources":["/Users/qt-dev/work/qt-dev/blog-api/views/src/views/admin/post/form.vue"],"names":[],"mappings":"AACA,uBACI,YAAc,CACjB,AACD,mCACI,qBAAsB,AACtB,aAAc,AACd,kBAAmB,AACnB,kBAAmB,AACnB,6BAA8B,AAC9B,kBAAmB,AACnB,gBAAiB,AACjB,gBAAiB,AACjB,kBAAmB,AACnB,oCAAqC,AACrC,gBAAkB,CACrB,AACD,uCACI,WAAa,CAChB,AACD,yCACI,aAAc,AACd,kBAAmB,AACnB,MAAO,AACP,SAAU,AACV,OAAQ,AACR,QAAS,AACT,yBAA2B,CAC9B,AACD,iEACI,aAAe,CAClB,AACD,2CACI,WAAY,AACZ,eAAgB,AAChB,eAAgB,AAChB,YAAc,CACjB","file":"form.vue","sourcesContent":["\n.form[data-v-7a6f5bf0] {\n    padding: 20px;\n}\n.demo-upload-list[data-v-7a6f5bf0]{\n    display: inline-block;\n    height: 150px;\n    text-align: center;\n    line-height: 150px;\n    border: 1px solid transparent;\n    border-radius: 4px;\n    overflow: hidden;\n    background: #fff;\n    position: relative;\n    box-shadow: 0 1px 1px rgba(0,0,0,.2);\n    margin-right: 4px;\n}\n.demo-upload-list img[data-v-7a6f5bf0]{\n    height: 100%;\n}\n.demo-upload-list-cover[data-v-7a6f5bf0]{\n    display: none;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(0,0,0,.6);\n}\n.demo-upload-list:hover .demo-upload-list-cover[data-v-7a6f5bf0]{\n    display: block;\n}\n.demo-upload-list-cover i[data-v-7a6f5bf0]{\n    color: #fff;\n    font-size: 20px;\n    cursor: pointer;\n    margin: 0 2px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(59)("22159718", content, true);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?{\"minimize\":true,\"sourceMap\":true}!../../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7a6f5bf0\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?{\"minimize\":true,\"sourceMap\":true}!../../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7a6f5bf0\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 71:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "page"
  }, [_c('div', {
    staticClass: "layout-breadcrumb"
  }, [_c('Breadcrumb', [_c('Breadcrumb-item', [_vm._v("首页")]), _vm._v(" "), _c('Breadcrumb-item', [_vm._v("文章管理")]), _vm._v(" "), _c('Breadcrumb-item', [_vm._v("添加文章")])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "layout-content"
  }, [_c('i-form', {
    staticClass: "form",
    attrs: {
      "model": _vm.formModel,
      "label-width": 80,
      "label-position": "left"
    }
  }, [_c('Form-item', {
    attrs: {
      "label": "标题"
    }
  }, [_c('i-input', {
    attrs: {
      "placeholder": "必填"
    },
    model: {
      value: (_vm.formModel.title),
      callback: function($$v) {
        _vm.formModel.title = $$v
      },
      expression: "formModel.title"
    }
  })], 1), _vm._v(" "), _c('Form-item', {
    attrs: {
      "label": "banner"
    }
  }, [_vm._l((_vm.uploadList), function(item) {
    return _c('div', {
      staticClass: "demo-upload-list"
    }, [(item.status === 'finished') ? [_c('img', {
      attrs: {
        "src": item.url
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "demo-upload-list-cover"
    }, [_c('Icon', {
      attrs: {
        "type": "ios-eye-outline"
      },
      nativeOn: {
        "click": function($event) {
          _vm.handleView(item.name)
        }
      }
    }), _vm._v(" "), _c('Icon', {
      attrs: {
        "type": "ios-trash-outline"
      },
      nativeOn: {
        "click": function($event) {
          _vm.handleRemove(item)
        }
      }
    })], 1)] : [(item.showProgress) ? _c('Progress', {
      attrs: {
        "percent": item.percentage,
        "hide-info": ""
      }
    }) : _vm._e()]], 2)
  }), _vm._v(" "), _c('Upload', {
    ref: "upload",
    staticStyle: {
      "display": "inline-block",
      "width": "58px"
    },
    attrs: {
      "show-upload-list": false,
      "default-file-list": _vm.defaultList,
      "on-success": _vm.handleSuccess,
      "format": ['jpg', 'jpeg', 'png'],
      "max-size": 2048,
      "on-format-error": _vm.handleFormatError,
      "on-exceeded-size": _vm.handleMaxSize,
      "before-upload": _vm.handleBeforeUpload,
      "type": "drag",
      "action": _vm.uploadUrl
    }
  }, [_c('div', {
    staticStyle: {
      "width": "58px",
      "height": "58px",
      "line-height": "58px"
    }
  }, [_c('Icon', {
    attrs: {
      "type": "camera",
      "size": "20"
    }
  })], 1)]), _vm._v(" "), _c('Modal', {
    attrs: {
      "title": "查看图片"
    },
    model: {
      value: (_vm.visible),
      callback: function($$v) {
        _vm.visible = $$v
      },
      expression: "visible"
    }
  }, [(_vm.visible) ? _c('img', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "src": 'https://o5wwk8baw.qnssl.com/' + _vm.imgName + '/large'
    }
  }) : _vm._e()])], 2), _vm._v(" "), _c('Form-item', {
    attrs: {
      "label": "简介"
    }
  }, [_c('i-input', {
    attrs: {
      "type": "textarea",
      "autosize": {
        minRows: 3,
        maxRows: 6
      },
      "placeholder": "最多300字"
    },
    model: {
      value: (_vm.formModel.desc),
      callback: function($$v) {
        _vm.formModel.desc = $$v
      },
      expression: "formModel.desc"
    }
  })], 1), _vm._v(" "), _c('Form-item', {
    attrs: {
      "label": "内容"
    }
  }, [_c('i-input', {
    attrs: {
      "placeholder": "必填"
    },
    model: {
      value: (_vm.formModel.content),
      callback: function($$v) {
        _vm.formModel.content = $$v
      },
      expression: "formModel.content"
    }
  })], 1), _vm._v(" "), _c('Form-item', {
    attrs: {
      "label": "是否显示"
    }
  }, [_c('Radio-group', {
    model: {
      value: (_vm.formModel.is_show),
      callback: function($$v) {
        _vm.formModel.is_show = $$v
      },
      expression: "formModel.is_show"
    }
  }, [_c('Radio', {
    attrs: {
      "label": "1"
    }
  }, [_vm._v("显示")]), _vm._v(" "), _c('Radio', {
    attrs: {
      "label": "0"
    }
  }, [_vm._v("不显示")])], 1)], 1)], 1)], 1)])
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=1.40c1b9d76e285767bf79.js.map