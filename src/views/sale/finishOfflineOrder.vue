<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
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
                      :rowCss="getRowCss"
                      selectionMode="single"
                      :loading="loading"
                      @selectionChange="selectObj($event)"
                      :pageNumber="pageNumber"
                      :pageSize="pageSize"
                      @pageChange="onPageChange($event)"
                      :pagination="true"
                      :pagePosition="'bottom'">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field='customOrderId' title='订单编号' width="150" align="center"></GridColumn>
                <GridColumn field='principalName' title='负责人' width="80" align="center"></GridColumn>
                <GridColumn field='customerName' title='客户名称' width="180" align="center"></GridColumn>
                <GridColumn field='consigneeName' title='收货人' width="80" align="center"></GridColumn>
                <GridColumn field='telephone' title='固定电话' width="120" align="center"></GridColumn>
                <GridColumn field='phone' title='手机号码' width="120" align="center"></GridColumn>
                <GridColumn field='address' title='收货地址' width="320" align="left"></GridColumn>
                <GridColumn field='expectedDeliveryTime' title='期望送货时间' width="140" align="center"></GridColumn>
                <GridColumn field='pay' title='订货金额' align="right" width="100">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.pay, '') }}
                    </template>
                </GridColumn>
                <GridColumn field='finish' title='状态' width="80" align="center">
                    <template slot="body" slot-scope="scope">
                        {{ scope.row.finish?"已完成":"" }}
                    </template>
                </GridColumn>
                <GridColumn field='finishTime' title='完成时间' width="120" align="center"></GridColumn>
            </DataGrid>
        </LayoutPanel>
        <LayoutPanel region="south" style="height:30%;" bodyCls="f-column" :border="false">
            <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
                <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
                    <Tabs :plain="false" :narrow="false" :justified="false" style="height:100%" bodyCls="f-column">
                        <TabPanel :title="'货品列表'" bodyCls="f-column">
                            <Panel class="f-full" :border="false" bodyCls="f-column">
                                <DataGrid :data="items" :border="false"
                                          :columnResizing="true"
                                          class="f-full">
                                    <GridColumn field='orderNumber' title='单据编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='commodityName' title='商品名称' width="320" align="left"></GridColumn>
                                    <GridColumn field='wareNum' title='商品数量' width="60" align="center"></GridColumn>
                                    <GridColumn field='cost' title='销售价' width="100" align="right">
                                        <template slot="body" slot-scope="scope">
                                            {{ toMoney(scope.row.cost, '') }}
                                        </template>
                                    </GridColumn>
                                    <GridColumn title='销售价合计' width="100" align="right">
                                        <template slot="body" slot-scope="scope">
                                            {{ toMoney(scope.row.wareNum * scope.row.cost, '') }}
                                        </template>
                                    </GridColumn>
                                    <GridColumn field='purchasePrice' title='进货价' width="100" align="right">
                                        <template slot="body" slot-scope="scope">
                                            {{ toMoney(scope.row.purchasePrice, '') }}
                                        </template>
                                    </GridColumn>
                                    <GridColumn title='进货价合计' width="100" align="right">
                                        <template slot="body" slot-scope="scope">
                                            {{ toMoney(scope.row.purchasePrice * scope.row.wareNum, '') }}
                                        </template>
                                    </GridColumn>
                                    <GridColumn field='supplierName' title='供应商' width="180" align="left"></GridColumn>
                                    <GridColumn field='sendType' title='送货方式' width="120" align="center">
                                        <template slot="body" slot-scope="scope">
                                            <span v-show="scope.row.deliveryPhone || scope.row.logisticsNumber">{{ scope.row.sendType ? "快递" : "送货" }}</span>
                                        </template>
                                    </GridColumn>
                                    <GridColumn field='deliveryPhone' title='送货电话' width="120" align="center"></GridColumn>
                                    <GridColumn field='logisticsCompanyName' title='物流公司' width="120" align="center"></GridColumn>
                                    <GridColumn field='logisticsNumber' title='物流单号' width="120" align="center"></GridColumn>
                                    <GridColumn field='shippingTime' title='发货时间' width="160" align="center"></GridColumn>
                                    <GridColumn field='estimatedArrivalDate' title='预计到达日期' width="120" align="center"></GridColumn>
                                </DataGrid>
                            </Panel>
                        </TabPanel>
                        <TabPanel :title="'订单日志'">
                            <Panel class="f-full" :border="false">
                                <DataGrid :data="logs" :border="false"
                                          :columnResizing="true"
                                          class="f-full">
                                    <GridColumn field='username' title='操作人' width="60" align="center"></GridColumn>
                                    <GridColumn field='operateTime' title='操作时间' :sortable="true" width="220" align="center"></GridColumn>
                                    <GridColumn field='operate' title='操作信息' align="left"></GridColumn>
                                </DataGrid>
                            </Panel>
                        </TabPanel>
                        <TabPanel :title="'错误信息'">
                            <Panel class="f-full" :border="false">
                            </Panel>
                        </TabPanel>
                    </Tabs>
                </LayoutPanel>
            </Layout>
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
            items: [],
            loading: false,
            obj: {},
            viewObj: [],
            suppliers: [],
            units: [],
            types: [],
            sources: [],
            timeout: null,
            logs: [],
            itemObj: {},
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
            this.$root.getData("orderForm/getFinishOfflineOrderQueryList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: "id",
                direction: "desc",
                filterString: this.filterString
            }, function (data) {
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.data.push(e);
                    vm.$set(e, 'selected', false);
                })
                vm.loading = false;
                console.log(data);
            })
        },
        selectObj(obj) {
            this.obj = this.clone(obj);
            this.items = [];
            this.loadItems();
            this.loadLogs();
        },
        loadLogs() {
            let vm = this;
            this.getData("orderLog/getList", {orderFormId: this.obj.id}, function (data) {
                vm.logs = data;
            })
        },
        loadItems() {
            let vm = this;
            this.getData("orderFormItem/getOfflineList", {orderFormId: this.obj.id}, function (data) {
                vm.items = data.items;
                console.log(vm.items);
            })
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        changePageSize(value){
            this.pageSize=value;
            this.loadPage(1, this.pageSize);
        },
        viewImg(obj) {
            this.$refs.viewImgDlg.open();
        },
        getRowCss(row) {
            if (row.finish) {
                return { background: "#b8eecf" };
            }
            return null;
        },
    }
}
</script>

<style scoped>
.b-red {
    border: 1px solid #F44336
    /*background-color: #ff9992*/
}

.b-m-1 {

    border-bottom: 1px solid #d2d2d2
}

.th {
    border: 1px solid #ddd;
    width: 12.5%;
    padding: 3px;
}

.td {
    border: 1px solid #ddd;
    width: 12.5%;
    padding: 3px;
}
</style>
