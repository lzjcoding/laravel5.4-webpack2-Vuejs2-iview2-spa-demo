<template>
    <div>
        <i-table :columns="columns"
                 :data="tableData"
                 :size="size"
                 :width="width"
                 :height="height"
                 :stripe="stripe"
                 :border="border"
                 :show-header="showHeader"
                 :highlight-row="highlightRow"
                 :row-class-name="rowClassName"
                 :content="content"
                 :no-data-text="noDataText"
                 :no-filtered-data-text="noFilteredDataText"
                 @on-sort-change="sort"
                 ref="table"></i-table>
        <div class="layout-page">
            <Page :total="pageTotal" :current="page" :page-size="pageSize" @on-change="changePage" @on-page-size-change="changePageSize" size="small" show-elevator show-sizer show-total></Page>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                loading: false,
                tableData: [],
                pageTotal: 0,
                page: 1,
                pageSize: 10,
                sortBy: {}
            }
        },
        props: {
            dataUrl: {
                type: String
            },
            columns: {
                type: Array,
                default () {
                    return [];
                }
            },
            size: {
            },
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
        created () {
            this.fetchData();
        },
        methods: {
            fetchData (page, pageSize, sortBy, filter) {
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
            sort (column) {
                if (column.order === 'normal') {
                    this.sortBy = {};
                } else {
                    var field = column.key;
                    this.sortBy[field] =column.order;
                }
                this.fetchData();
            },
            changePage (page) {
                this.page = page;
                this.fetchData();
            },
            changePageSize (pageSize) {
                this.pageSize = pageSize;
                this.fetchData();
            },
            btnClick (operation, param1, param2) {
              this.$parent[operation](param1, param2);
            }
        }
    }
</script>