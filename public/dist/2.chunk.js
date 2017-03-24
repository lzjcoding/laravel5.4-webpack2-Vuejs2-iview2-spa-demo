webpackJsonp([2],{

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(51)
	__vue_script__ = __webpack_require__(52)
	__vue_template__ = __webpack_require__(58)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/qt-dev/learn/php/laravel5.4-iview1.0-blog/build-src/views/admin/post/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 51:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _asyncTable = __webpack_require__(53);
	
	var _asyncTable2 = _interopRequireDefault(_asyncTable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    components: { asyncTable: _asyncTable2.default },
	    data: function data() {
	        return {
	            columns: [{ "title": "编号", "key": "id", "width": 100, "sortable": true }, { "title": "所属用户", "key": "user_id", "width": 150,
	                'render': function render(row, column, index) {
	                    return row.user.nickname;
	                }
	            }, { "title": "标题", "key": "title" }, { "title": "点击数", "key": "click_num", "width": 120, "sortable": true }, { "title": "是否显示", "key": "is_show", "width": 120, "sortable": true,
	                'render': function render(row, column, index) {
	                    if (row.is_show == 1) {
	                        return '显示';
	                    } else {
	                        return '隐藏';
	                    }
	                }
	            }, { "title": "创建时间", "key": "created_at", "width": 150, "sortable": true }, { "title": "最近更新时间", "key": "updated_at", "width": 150, "sortable": true }, { "title": "操作", "key": "operations", "width": 120, fixed: 'right',
	                "render": function render(row, column, index) {
	                    var btns = '';
	                    if (row.is_show == 1) {
	                        btns += '<i-button type="warning" size="small" @click="this.$parent.hideItem(' + row.id + ')">' + '<span v-if="!loading">隐藏</span><span v-else></span>' + '</i-button>';
	                    } else {
	                        btns += ' <i-button type="primary" size="small" @click="this.$parent.showItem(' + row.id + ')">' + '<span v-if="!loading">显示</span><span v-else></span>' + '</i-button> ';
	                    }
	                    btns += ' <i-button type="error" size="small" @click="this.$parent.delItem(' + row.id + ')">' + '<span v-if="!loading">删除</span><span v-else></span>' + '</i-button>';
	                    return btns;
	                }
	            }],
	            formSearch: {
	                id: '',
	                user_id: '',
	                title: '',
	                created_at: '',
	                updated_at: ''
	            },
	            userList: {}
	        };
	    },
	    created: function created() {
	        this.fetchUserData();
	    },
	
	    methods: {
	        refreshData: function refreshData() {
	            this.$refs.table.fetchData();
	        },
	        fetchUserData: function fetchUserData() {
	            var _this = this;
	
	            this.$http.get('/api/admin/user?pageSize=10000').then(function (response) {
	                _this.userList = response.body.data.data;
	            });
	        },
	        handleSearch: function handleSearch(name) {
	            this.refreshData();
	        },
	        handleReset: function handleReset(name) {
	            this.$refs[name].resetFields();
	            this.refreshData();
	        },
	        showItem: function showItem(id) {
	            var _this2 = this;
	
	            this.$Modal.confirm({
	                title: '确认操作',
	                content: '你确认要显示这条记录？',
	                onOk: function onOk() {
	                    _this2.loading = true;
	                    _this2.$http.post('/api/admin/post/' + id + '/show').then(function (response) {
	                        _this2.$Message.success('操作成功');
	                        _this2.refreshData();
	                        _this2.loading = false;
	                    }, function (response) {
	                        _this2.loading = false;
	                    });
	                }
	            });
	        },
	        hideItem: function hideItem(id) {
	            var _this3 = this;
	
	            this.$Modal.confirm({
	                title: '确认操作',
	                content: '你确认要隐藏这条记录？',
	                onOk: function onOk() {
	                    _this3.loading = true;
	                    _this3.$http.post('/api/admin/post/' + id + '/hide').then(function (response) {
	                        _this3.$Message.success('操作成功');
	                        _this3.refreshData();
	                        _this3.loading = false;
	                    }, function (response) {
	                        _this3.loading = false;
	                    });
	                }
	            });
	        },
	        delItem: function delItem(id) {
	            var _this4 = this;
	
	            this.$Modal.confirm({
	                title: '确认操作',
	                content: '你确认要删除这条记录？',
	                onOk: function onOk() {
	                    _this4.loading = true;
	                    _this4.$http.delete('/api/admin/post/' + id).then(function (response) {
	                        _this4.$Message.success('操作成功');
	                        _this4.refreshData();
	                        _this4.loading = false;
	                    }, function (response) {
	                        _this4.loading = false;
	                    });
	                }
	            });
	        }
	    }
	};
	// </script>
	//
	/* generated by vue-loader */
	// <style scoped>
	// </style>
	// <template>
	//     <div class="layout-breadcrumb">
	//         <Breadcrumb>
	//             <Breadcrumb-item v-link="{ path: '/' }">首页</Breadcrumb-item>
	//             <Breadcrumb-item v-link="{ name: 'post-index' }">文章管理</Breadcrumb-item>
	//         </Breadcrumb>
	//     </div>
	//     <!--<div class="layout-btn-group">-->
	//         <!--<i-button type="primary" v-link="{name: 'post-create'}"> 添加 </i-button>-->
	//     <!--</div>-->
	//     <div class="layout-content">
	//         <div class="layout-table">
	//             <async-table :columns="columns" data-url="/api/admin/post" :filter="formSearch" @on-sort-change="sort" size="small" v-ref:table></async-table>
	//         </div>
	//         <div class="layout-search">
	//             <Card :bordered="false" dis-hover>
	//                 <p slot="title"> 搜索条件 </p>
	//                 <i-form v-ref:form-search :model="formSearch" label-position="top">
	//                     <Form-item label="编号" prop="id">
	//                         <i-input :value.sync="formSearch.id"></i-input>
	//                     </Form-item>
	//                     <Form-item label="所属用户" prop="user_id">
	//                         <i-select :model.sync="formSearch.user_id" clearable filterable>
	//                             <i-option v-for="item in userList" :value="item.id">{{ item.nickname }}</i-option>
	//                         </i-select>
	//                     </Form-item>
	//                     <Form-item label="标题" prop="title">
	//                         <i-input :value.sync="formSearch.title"></i-input>
	//                     </Form-item>
	//                     <Form-item label="创建时间" prop="created_at">
	//                         <Date-picker type="datetimerange" placement="left-start" :value.sync="formSearch.created_at" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间"></Date-picker>
	//                     </Form-item>
	//                     <Form-item label="更新时间" prop="updated_at">
	//                         <Date-picker type="datetimerange" placement="left-start" :value.sync="formSearch.updated_at" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间"></Date-picker>
	//                     </Form-item>
	//                     <Form-item style="text-align: center">
	//                         <i-button type="primary" @click="handleSearch('formSearch')"> 搜索 </i-button>
	//                         <i-button type="ghost" @click="handleReset('formSearch')" style="margin-left: 8px"> 重置 </i-button>
	//                     </Form-item>
	//                 </i-form>
	//             </Card>
	//         </div>
	//     </div>
	// </template>
	// <script>

/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(54)
	__vue_template__ = __webpack_require__(57)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/qt-dev/learn/php/laravel5.4-iview1.0-blog/build-src/components/async-table.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _stringify = __webpack_require__(55);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//     <i-table :columns="columns"
	//              :data="tableData"
	//              :size="size"
	//              :width="width"
	//              :height="height"
	//              :stripe="stripe"
	//              :border="border"
	//              :show-header="showHeader"
	//              :highlight-row="highlightRow"
	//              :row-class-name="rowClassName"
	//              :content="content"
	//              :no-data-text="noDataText"
	//              :no-filtered-data-text="noFilteredDataText"
	//              @on-sort-change="sort"
	//              v-ref:table></i-table>
	//     <div class="layout-page">
	//         <Page :total="pageTotal" :current="page" :page-size="pageSize" @on-change="changePage" @on-page-size-change="changePageSize" size="small" show-elevator show-sizer show-total></Page>
	//     </div>
	// </template>
	//
	// <script>
	exports.default = {
	    data: function data() {
	        return {
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
	            default: function _default() {
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
	    created: function created() {
	        this.fetchData();
	    },
	
	    methods: {
	        fetchData: function fetchData(page, pageSize, sortBy, filter) {
	            var _this = this;
	
	            page = page || this.page;
	            pageSize = pageSize || this.pageSize;
	            var sortByStr = (0, _stringify2.default)(sortBy || this.sortBy);
	            var filterStr = (0, _stringify2.default)(filter || this.filter);
	            var url = this.dataUrl + '?page=' + page + '&pageSize=' + pageSize + '&sort=' + sortByStr + '&filter=' + filterStr;
	            url = encodeURI(url);
	            this.$http.get(url).then(function (response) {
	                var data = response.body.data;
	                _this.pageTotal = data.total;
	                _this.tableData = data.data;
	            });
	        },
	        sort: function sort(column) {
	            if (column.order === 'normal') {
	                this.sortBy = {};
	            } else {
	                var field = column.key;
	                this.sortBy[field] = column.order;
	            }
	            this.fetchData();
	        },
	        changePage: function changePage(page) {
	            this.page = page;
	            this.fetchData();
	        },
	        changePageSize: function changePageSize(pageSize) {
	            this.pageSize = pageSize;
	            this.fetchData();
	        }
	    }
	};
	// </script>
	/* generated by vue-loader */

/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(19);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },

/***/ 57:
/***/ function(module, exports) {

	module.exports = "\n    <i-table :columns=\"columns\"\n             :data=\"tableData\"\n             :size=\"size\"\n             :width=\"width\"\n             :height=\"height\"\n             :stripe=\"stripe\"\n             :border=\"border\"\n             :show-header=\"showHeader\"\n             :highlight-row=\"highlightRow\"\n             :row-class-name=\"rowClassName\"\n             :content=\"content\"\n             :no-data-text=\"noDataText\"\n             :no-filtered-data-text=\"noFilteredDataText\"\n             @on-sort-change=\"sort\"\n             v-ref:table></i-table>\n    <div class=\"layout-page\">\n        <Page :total=\"pageTotal\" :current=\"page\" :page-size=\"pageSize\" @on-change=\"changePage\" @on-page-size-change=\"changePageSize\" size=\"small\" show-elevator show-sizer show-total></Page>\n    </div>\n";

/***/ },

/***/ 58:
/***/ function(module, exports) {

	module.exports = "\n    <div class=\"layout-breadcrumb\" _v-2b6f5870=\"\">\n        <breadcrumb _v-2b6f5870=\"\">\n            <breadcrumb-item v-link=\"{ path: '/' }\" _v-2b6f5870=\"\">首页</breadcrumb-item>\n            <breadcrumb-item v-link=\"{ name: 'post-index' }\" _v-2b6f5870=\"\">文章管理</breadcrumb-item>\n        </breadcrumb>\n    </div>\n    <!--<div class=\"layout-btn-group\">-->\n        <!--<i-button type=\"primary\" v-link=\"{name: 'post-create'}\"> 添加 </i-button>-->\n    <!--</div>-->\n    <div class=\"layout-content\" _v-2b6f5870=\"\">\n        <div class=\"layout-table\" _v-2b6f5870=\"\">\n            <async-table :columns=\"columns\" data-url=\"/api/admin/post\" :filter=\"formSearch\" @on-sort-change=\"sort\" size=\"small\" v-ref:table=\"\" _v-2b6f5870=\"\"></async-table>\n        </div>\n        <div class=\"layout-search\" _v-2b6f5870=\"\">\n            <card :bordered=\"false\" dis-hover=\"\" _v-2b6f5870=\"\">\n                <p slot=\"title\" _v-2b6f5870=\"\"> 搜索条件 </p>\n                <i-form v-ref:form-search=\"\" :model=\"formSearch\" label-position=\"top\" _v-2b6f5870=\"\">\n                    <form-item label=\"编号\" prop=\"id\" _v-2b6f5870=\"\">\n                        <i-input :value.sync=\"formSearch.id\" _v-2b6f5870=\"\"></i-input>\n                    </form-item>\n                    <form-item label=\"所属用户\" prop=\"user_id\" _v-2b6f5870=\"\">\n                        <i-select :model.sync=\"formSearch.user_id\" clearable=\"\" filterable=\"\" _v-2b6f5870=\"\">\n                            <i-option v-for=\"item in userList\" :value=\"item.id\" _v-2b6f5870=\"\">{{ item.nickname }}</i-option>\n                        </i-select>\n                    </form-item>\n                    <form-item label=\"标题\" prop=\"title\" _v-2b6f5870=\"\">\n                        <i-input :value.sync=\"formSearch.title\" _v-2b6f5870=\"\"></i-input>\n                    </form-item>\n                    <form-item label=\"创建时间\" prop=\"created_at\" _v-2b6f5870=\"\">\n                        <date-picker type=\"datetimerange\" placement=\"left-start\" :value.sync=\"formSearch.created_at\" format=\"yyyy-MM-dd HH:mm\" placeholder=\"选择日期和时间\" _v-2b6f5870=\"\"></date-picker>\n                    </form-item>\n                    <form-item label=\"更新时间\" prop=\"updated_at\" _v-2b6f5870=\"\">\n                        <date-picker type=\"datetimerange\" placement=\"left-start\" :value.sync=\"formSearch.updated_at\" format=\"yyyy-MM-dd HH:mm\" placeholder=\"选择日期和时间\" _v-2b6f5870=\"\"></date-picker>\n                    </form-item>\n                    <form-item style=\"text-align: center\" _v-2b6f5870=\"\">\n                        <i-button type=\"primary\" @click=\"handleSearch('formSearch')\" _v-2b6f5870=\"\"> 搜索 </i-button>\n                        <i-button type=\"ghost\" @click=\"handleReset('formSearch')\" style=\"margin-left: 8px\" _v-2b6f5870=\"\"> 重置 </i-button>\n                    </form-item>\n                </i-form>\n            </card>\n        </div>\n    </div>\n";

/***/ }

});
//# sourceMappingURL=2.chunk.js.map