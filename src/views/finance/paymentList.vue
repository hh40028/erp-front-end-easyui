<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <LinkButton iconCls="icon-add" :plain="true" @click="newPayment">开单</LinkButton>
                <div class="pull-right">
                    <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                      class="f-full"
                      :columnResizing="true"
                      :lazy="true"
                      :total="total"
                      selectionMode="single"
                      :loading="loading"
                      @selectionChange="selectObj($event)"
                      :pageNumber="pageNumber"
                      @rowExpand="loadItem($event)"
                      :pageSize="pageSize"
                      @pageChange="onPageChange($event)"
                      :pagination="true"
                      :pagePosition="'bottom'">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn :expander="true" width="30"></GridColumn>
                <GridColumn field='number' title='单据编号' width="140" align="center"></GridColumn>
                <GridColumn field='unitName' title='单位名称' width="220" align="center"></GridColumn>
                <GridColumn field='accountName' title='付款账户' width="220" align="center"></GridColumn>
                <GridColumn title='付款金额' width="120" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.paymentAmount, '') }}
                    </template>
                </GridColumn>
                <GridColumn field='paymentDate' title='付款日期' width="180" align="center"></GridColumn>
                <GridColumn field='username' title='经办人' width="120" align="center"></GridColumn>
                <GridColumn field='remark' title='摘要' align="left"></GridColumn>
                <template slot="detail" slot-scope="scope" :border="false">
                    <div style="padding: 3px;background-color: #fff3b1">
                        <DataGrid v-if="scope.row.list.length>0"
                                  :data="scope.row.list"
                                  :border="false"
                                  class="f-full"
                                  :rowCss="getItemRowCss"
                                  :columnResizing="true">
                            <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                                <template slot="body" slot-scope="scope">
                                    {{ scope.rowIndex + 1 }}
                                </template>
                            </GridColumn>
                            <GridColumn field='orderNumber' title='单据编号' width="140" align="center"></GridColumn>
                            <GridColumn field='customOrderId' title='订单编号' width="160" align="center"></GridColumn>
                            <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                            <GridColumn field='commodityName' title='商品名称' width="120" align="left"></GridColumn>
                            <GridColumn field='wareNum' title='数量' width="50" align="center"></GridColumn>
                            <GridColumn field="purchasePrice" title='单价' width="80" align="right">
                                <template slot="body" slot-scope="scope">
                                    {{ toMoney(scope.row.purchasePrice, '') }}
                                </template>
                            </GridColumn>
                            <GridColumn title='合计金额' width="80" align="right">
                                <template slot="body" slot-scope="scope">
                                    {{ toMoney(scope.row.purchasePrice * scope.row.wareNum, '') }}
                                </template>
                            </GridColumn>
                            <GridColumn title='结算金额' align="right" width="80">
                                <template slot="body" slot-scope="scope">
                                    {{ toMoney(scope.row.settlement, '') }}
                                </template>
                            </GridColumn>
                            <GridColumn field='submitTime' title='递交时间' width="150" align="center"></GridColumn>
                            <GridColumn field='sendType' title='送货方式' width="150" align="center">
                                <template slot="body" slot-scope="scope">
                                    {{ scope.row.sendType ? "快递" : "送货" }}
                                </template>
                            </GridColumn>
                            <GridColumn field='logisticsCompanyName' title='物流公司' width="120" align="center"></GridColumn>
                            <GridColumn field='logisticsNumber' title='物流单号' width="120" align="center"></GridColumn>
                            <GridColumn field='deliveryPhone' title='送货电话' width="120" align="center"></GridColumn>
                            <GridColumn field='shippingTime' title='发货时间' width="150" align="center"></GridColumn>
                            <GridColumn field='estimatedArrivalDate' title='预计到达日期' width="120" align="center"></GridColumn>
                        </DataGrid>
                        <div style="text-align: center;font-size: 20px;color:orange;line-height: 30px" v-if="scope.row.list.length===0">无结算单据</div>
                    </div>
                </template>
            </DataGrid>
        </LayoutPanel>
    </Layout>
</template>

<script>
import filterList from '@/components/filterList.vue';

export default {
    name: "app",
    data() {
        return {
            total: 0,
            pageSize: 15,
            pageNumber: 1,
            data: [],
            loading: false,
            obj: {},
            timeout: null,
            filterString: ''
        }
    },
    components: {
        filterList
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
    },
    methods: {
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
            this.loading = true;
            let vm = this;
            this.$root.getData("paymentOrder/getQueryList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: "id",
                direction: "desc",
                filterString: this.filterString,
                deliveryStatus: false
            }, function (data) {
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.$set(e, 'selected', false);
                    vm.data.push(e);
                })
                vm.allSelected = false;
                vm.loading = false;
            })
        },
        selectObj(obj) {
            this.obj = this.clone(obj);
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        changePageSize(value) {
            this.pageSize = value;
            this.loadPage(1, this.pageSize);
        },
        newPayment() {
            this.$router.push('newPayment');
        },
        view() {
            this.$refs.viewDlg.open();
        },
        getItemRowCss(row) {
            if (parseFloat(row.settlement) === parseFloat(row.cost) * parseFloat(row.wareNum)) {
                return {background: "#e1ffe0"};
            }
            return null;
        },
        loadItem(row) {
            let vm = this;
            this.getData("paymentOrder/getListBySettlement", {settlementOrderId: row.id}, function (data) {
                vm.$set(row, 'list', data);
            })
        }
    }
}
</script>

<style scoped>
.b-red {
    border: 1px solid #F44336
    /*background-color: #ff9992*/
}

.c-red {
    color: red;
}

.th {
    border: 1px solid #ddd;
    padding: 6px;
}

.td {
    border: 1px solid #ddd;
    padding: 6px;
}
</style>
