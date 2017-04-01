webpackJsonp([0,5],{

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(67)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(64),
  /* template */
  __webpack_require__(70),
  /* scopeId */
  "data-v-063bb984",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 62:
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

/* harmony default export */ __webpack_exports__["default"] = {
    data() {
        return {
            loading: false,
            tableData: [],
            pageTotal: 0,
            page: 1,
            pageSize: 10,
            sortBy: {}
        };
    },
    props: {
        dataUrl: {
            type: String
        },
        columns: {
            type: Array,
            default() {
                return [];
            }
        },
        size: {},
        width: {
            type: [Number, String]
        },
        height: {
            type: [Number, String]
        },
        stripe: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        highlightRow: {
            type: Boolean,
            default: false
        },
        rowClassName: {
            type: Function
        },
        content: {
            type: Object
        },
        noDataText: {
            type: String
        },
        filter: {
            type: Object
        },
        noFilteredDataText: {
            type: String
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData(page, pageSize, sortBy, filter) {
            page = page || this.page;
            pageSize = pageSize || this.pageSize;
            var sortByStr = JSON.stringify(sortBy || this.sortBy);
            var filterStr = JSON.stringify(filter || this.filter);
            var url = this.dataUrl + '?page=' + page + '&pageSize=' + pageSize + '&sort=' + sortByStr + '&filter=' + filterStr;
            url = encodeURI(url);
            this.$http.get(url).then(response => {
                var data = response.body.data;
                this.pageTotal = data.total;
                this.tableData = data.data;
            });
        },
        sort(column) {
            if (column.order === 'normal') {
                this.sortBy = {};
            } else {
                var field = column.key;
                this.sortBy[field] = column.order;
            }
            this.fetchData();
        },
        changePage(page) {
            this.page = page;
            this.fetchData();
        },
        changePageSize(pageSize) {
            this.pageSize = pageSize;
            this.fetchData();
        },
        btnClick(operation, param1, param2) {
            this.$parent[operation](param1, param2);
        }
    }
};

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_async_table_vue__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_async_table_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_async_table_vue__);
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
    components: { asyncTable: __WEBPACK_IMPORTED_MODULE_0__components_async_table_vue___default.a },
    data() {
        return {
            loading: false,
            dataUrl: config.getApi(config.api.post.list),
            columns: [{ title: "编号", key: "id", width: 80, sortable: true }, { title: "标题", key: "title", width: 200 }, { title: "点击数", key: "click_num", width: 120, sortable: true }, { title: "点赞数", key: "like_num", width: 120, sortable: true }, { title: "评论数", key: "comment_num", width: 120, sortable: true }, { title: "收藏数", key: "collect_num", width: 120, sortable: true }, { title: "分享数", key: "share_num", width: 120, sortable: true }, { title: "创建时间", key: "created_at", width: 150, sortable: true }, { title: "最近更新时间", key: "updated_at", width: 150, sortable: true }, { title: "是否显示", key: "is_show", width: 120, sortable: true, fixed: "right",
                render(row, column, index) {
                    if (row.is_show == 1) {
                        return '显示';
                    } else {
                        return '隐藏';
                    }
                } }, { title: "操作", key: "operations", width: 120, fixed: "right",
                render(row, column, index) {
                    var btns = '';
                    if (row.is_show == 1) {
                        btns += '<i-button type="warning" size="small" @click="btnClick(\'hideItem\', ' + row.id + ')">' + '<span v-if="!loading">隐藏</span><span v-else></span>' + '</i-button>';
                    } else {
                        btns += ' <i-button type="primary" size="small" @click="btnClick(\'showItem\', ' + row.id + ')">' + '<span v-if="!loading">显示</span><span v-else></span>' + '</i-button> ';
                    }
                    btns += ' <i-button type="error" size="small" @click="btnClick(\'delItem\', ' + row.id + ')">' + '<span v-if="!loading">删除</span><span v-else></span>' + '</i-button>';
                    return btns;
                } }],
            formSearch: {
                id: '',
                title: '',
                created_at: '',
                updated_at: ''
            },
            userList: {}
        };
    },
    created() {},
    methods: {
        refreshData() {
            this.$refs.asyncTable.fetchData();
        },
        handleSearch(name) {
            this.refreshData();
        },
        handleReset(name) {
            this.$refs[name].resetFields();
            this.refreshData();
        },
        showItem(id) {
            this.$Modal.confirm({
                title: '确认操作',
                content: '你确认要显示这条记录？',
                onOk: () => {
                    this.loading = true;
                    this.$http.post(config.getApi(config.api.post.show(id))).then(response => {
                        this.$Message.success('操作成功');
                        this.refreshData();
                        this.loading = false;
                    }, response => {
                        this.loading = false;
                    });
                }
            });
        },
        hideItem(id) {
            this.$Modal.confirm({
                title: '确认操作',
                content: '你确认要隐藏这条记录？',
                onOk: () => {
                    this.loading = true;
                    this.$http.post(config.getApi(config.api.post.hide(id))).then(response => {
                        this.$Message.success('操作成功');
                        this.refreshData();
                        this.loading = false;
                    }, response => {
                        this.loading = false;
                    });
                }
            });
        },
        delItem(id) {
            this.$Modal.confirm({
                title: '确认操作',
                content: '你确认要删除这条记录？',
                onOk: () => {
                    this.loading = true;
                    this.$http.delete(config.getApi(config.api.post.delete(id))).then(response => {
                        this.$Message.success('操作成功');
                        this.refreshData();
                        this.loading = false;
                    }, response => {
                        this.loading = false;
                    });
                }
            });
        }
    }
};

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(58)();
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(59)("5ef64b6f", content, true);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?{\"minimize\":true,\"sourceMap\":true}!../../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-063bb984\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?{\"minimize\":true,\"sourceMap\":true}!../../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-063bb984\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(62),
  /* template */
  __webpack_require__(72),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 70:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "layout-breadcrumb"
  }, [_c('Breadcrumb', [_c('Breadcrumb-item', [_vm._v("首页")]), _vm._v(" "), _c('Breadcrumb-item', [_vm._v("文章管理")])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "layout-btn-group"
  }, [_c('router-link', {
    attrs: {
      "to": "/post/create"
    }
  }, [_c('i-button', {
    attrs: {
      "type": "primary",
      "size": "small"
    }
  }, [_vm._v(" 添加文章 ")])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "layout-content"
  }, [_c('div', {
    staticClass: "layout-table"
  }, [_c('async-table', {
    ref: "asyncTable",
    attrs: {
      "columns": _vm.columns,
      "data-url": _vm.dataUrl,
      "filter": _vm.formSearch,
      "size": "small"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "layout-search"
  }, [_c('Card', {
    attrs: {
      "bordered": false,
      "dis-hover": ""
    }
  }, [_c('p', {
    slot: "title"
  }, [_vm._v(" 搜索条件 ")]), _vm._v(" "), _c('i-form', {
    ref: "formSearch",
    attrs: {
      "model": _vm.formSearch,
      "label-position": "top"
    }
  }, [_c('Form-item', {
    attrs: {
      "label": "编号",
      "prop": "id"
    }
  }, [_c('i-input', {
    model: {
      value: (_vm.formSearch.id),
      callback: function($$v) {
        _vm.formSearch.id = $$v
      },
      expression: "formSearch.id"
    }
  })], 1), _vm._v(" "), _c('Form-item', {
    attrs: {
      "label": "标题",
      "prop": "title"
    }
  }, [_c('i-input', {
    model: {
      value: (_vm.formSearch.title),
      callback: function($$v) {
        _vm.formSearch.title = $$v
      },
      expression: "formSearch.title"
    }
  })], 1), _vm._v(" "), _c('Form-item', {
    attrs: {
      "label": "创建时间",
      "prop": "created_at"
    }
  }, [_c('Date-picker', {
    attrs: {
      "type": "datetimerange",
      "placement": "left-start",
      "format": "yyyy-MM-dd HH:mm",
      "placeholder": "选择日期和时间"
    },
    model: {
      value: (_vm.formSearch.created_at),
      callback: function($$v) {
        _vm.formSearch.created_at = $$v
      },
      expression: "formSearch.created_at"
    }
  })], 1), _vm._v(" "), _c('Form-item', {
    attrs: {
      "label": "更新时间",
      "prop": "updated_at"
    }
  }, [_c('Date-picker', {
    attrs: {
      "type": "datetimerange",
      "placement": "left-start",
      "format": "yyyy-MM-dd HH:mm",
      "placeholder": "选择日期和时间"
    },
    model: {
      value: (_vm.formSearch.updated_at),
      callback: function($$v) {
        _vm.formSearch.updated_at = $$v
      },
      expression: "formSearch.updated_at"
    }
  })], 1), _vm._v(" "), _c('Form-item', {
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('i-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.handleSearch('formSearch')
      }
    }
  }, [_vm._v(" 搜索 ")]), _vm._v(" "), _c('i-button', {
    staticStyle: {
      "margin-left": "8px"
    },
    attrs: {
      "type": "ghost"
    },
    on: {
      "click": function($event) {
        _vm.handleReset('formSearch')
      }
    }
  }, [_vm._v(" 重置 ")])], 1)], 1)], 1)], 1)])])
},staticRenderFns: []}

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('i-table', {
    ref: "table",
    attrs: {
      "columns": _vm.columns,
      "data": _vm.tableData,
      "size": _vm.size,
      "width": _vm.width,
      "height": _vm.height,
      "stripe": _vm.stripe,
      "border": _vm.border,
      "show-header": _vm.showHeader,
      "highlight-row": _vm.highlightRow,
      "row-class-name": _vm.rowClassName,
      "content": _vm.content,
      "no-data-text": _vm.noDataText,
      "no-filtered-data-text": _vm.noFilteredDataText
    },
    on: {
      "on-sort-change": _vm.sort
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "layout-page"
  }, [_c('Page', {
    attrs: {
      "total": _vm.pageTotal,
      "current": _vm.page,
      "page-size": _vm.pageSize,
      "size": "small",
      "show-elevator": "",
      "show-sizer": "",
      "show-total": ""
    },
    on: {
      "on-change": _vm.changePage,
      "on-page-size-change": _vm.changePageSize
    }
  })], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=0.ecbe7c2a4aacea1e8201.js.map