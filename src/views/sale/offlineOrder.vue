<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <LinkButton iconCls="icon-add" :plain="true" @click="add">新建订单</LinkButton>
                <LinkButton iconCls="icon-edit" :plain="true" @click="edit" :disabled="!obj.id || obj.finish">编辑订单</LinkButton>
                <LinkButton iconCls="icon-ok" :plain="true" @click="finish" :disabled="!obj.id || obj.finish">完成订单</LinkButton>
                <div class="pull-right">
                    <filterList @filterLoad="filter"></filterList>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                      class="f-full"
                      :rowCss="getRowCss"
                      :columnResizing="true"
                      :lazy="true"
                      :total="total"
                      selectionMode="single"
                      :loading="loading"
                      @selectionChange="selectObj($event)"
                      :pageNumber="pageNumber"
                      :pageSize="pageSize"
                      @pageChange="onPageChange($event)"
                      :pagination="true"
                      :pagePosition="'bottom'">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30" :frozen="true">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field='id' title='订单编号' width="120" align="center" :frozen="true"></GridColumn>
                <GridColumn field='customerName' title='客户名称' width="120" align="center"></GridColumn>
<!--                <GridColumn field='commodityNum' title='数量' width="50" align="center"></GridColumn>-->
<!--                <GridColumn field='jdPrice' title='售价' width="90" align="right">-->
<!--                    <template slot="body" slot-scope="scope">-->
<!--                        {{toMoney(scope.row.jdPrice*scope.row.wareNum,'')}}-->
<!--                    </template>-->
<!--                </GridColumn>-->
<!--                <GridColumn title='合计金额' width="90" align="right">-->
<!--                    <template slot="body" slot-scope="scope">-->
<!--                        {{toMoney(scope.row.jdPrice*scope.row.wareNum,'')}}-->
<!--                    </template>-->
<!--                </GridColumn>-->
                <GridColumn field='consigneeName' title='收货人姓名' width="120" align="center"></GridColumn>
                <GridColumn field='expectedDeliveryTime' title='期望送货时间' width="140" align="center"></GridColumn>
                <GridColumn field='telephone' title='固定电话' width="120" align="center"></GridColumn>
                <GridColumn field='phone' title='手机号码' width="120" align="center"></GridColumn>
                <GridColumn field='address' title='收货地址' width="320" align="left"></GridColumn>
                <GridColumn field='orgName' title='负责机构' width="120" align="center"><></GridColumn>
                <GridColumn field='principalName' title='负责专员' width="120" align="center"></GridColumn>
                <GridColumn field='finish' title='完成状态' width="120" align="center"></GridColumn>
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
                                          :rowCss="getItemRowCss"
                                          class="f-full">
                                    <GridColumn title="操作" align="center" width="80">
                                        <template slot="body" slot-scope="scope">
                                            <div v-if="!scope.row.logisticsCompanyName || !scope.row.logisticsNumber || !scope.row.deliveryTime">
                                                <a v-if="!scope.row.sendSupplier" @click="testSend(scope.row)" style="color:green">发送供应商</a>
                                                <a v-if="scope.row.sendSupplier" @click="cancelProcess(scope.row)" style="color:red;margin-left: 10px">撤回</a>
                                            </div>
                                            <div v-if="scope.row.logisticsCompanyName && scope.row.logisticsNumber && scope.row.deliveryTime">
                                                <a style="color:green">已发货</a>
                                            </div>
                                        </template>
                                    </GridColumn>
                                    <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='upc' title='商品UPC编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='commodityName' title='商品名称' width="120" align="center"></GridColumn>
                                    <GridColumn field='wareNum' title='商品数量' width="60" align="center"></GridColumn>
                                    <GridColumn field='jdPrice' title='商品售价' width="100" align="right">
                                        <template slot="body" slot-scope="scope">
                                            {{ toMoney(scope.row.jdPrice, '') }}
                                        </template>
                                    </GridColumn>
                                   <GridColumn title='合计金额' width="100" align="right">
                                        <template slot="body" slot-scope="scope">
                                            {{ toMoney(scope.row.wareNum * scope.row.jdPrice, '') }}
                                        </template>
                                    </GridColumn>
                                    <GridColumn field='cost' title='采购价' width="100" align="right">
                                        <template slot="body" slot-scope="scope">
                                            {{ toMoney(scope.row.cost, '') }}
                                        </template>
                                    </GridColumn>
                                    <GridColumn field='supplierName' title='供应商' width="120" align="center"></GridColumn>
                                    <GridColumn field='logisticsCompanyName' title='物流公司' width="120" align="center"></GridColumn>
                                    <GridColumn field='logisticsNumber' title='物流单号' width="120" align="center"></GridColumn>
                                    <GridColumn field='deliveryTime' title='发货时间' width="120" align="center"></GridColumn>
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
                <!--                <LayoutPanel region="east" style="width:220px;" bodyCls="f-column" :border="true">-->
                <!--                    <div class="col-12 p-t-10 p-l-10 p-r-10">-->
                <!--                        <b>买家留言:</b>-->
                <!--                        <div>{{ obj.buyerMessage }}</div>-->
                <!--                    </div>-->
                <!--                    <div class="col-12 p-t-10 p-l-10 p-r-10">-->
                <!--                        <b>客服备注:</b>-->
                <!--                        <div>{{ obj.customerServiceRemarks }}</div>-->
                <!--                    </div>-->
                <!--                    <div class="col-12 p-t-10 p-l-10 p-r-10">-->
                <!--                        <b>打印备注:</b>-->
                <!--                        <div>{{ obj.printRemarks }}</div>-->
                <!--                    </div>-->
                <!--                    <div class="col-12 p-t-10 p-l-10 p-r-10">-->
                <!--                        <b>发票内容:</b>-->
                <!--                        <div>{{ obj.invoiceContent }}</div>-->
                <!--                    </div>-->
                <!--                </LayoutPanel>-->

            </Layout>


        </LayoutPanel>
        <Dialog ref="editOrderFormDlg" closed
                :title="'编辑线下订单'"
                :dialogStyle="{width:'80%',height:'80%'}"
                bodyCls="f-column"
                :modal="true">
            <div class="f-full">
                <Layout style="width:100%;height:100%" bodyCls="f-column" :border="false">
                    <LayoutPanel region="north" style="height:100px;" :border="true">
                        <div class="row">
                            <div class="col-4 p-t-15 p-l-15 p-r-15">
                                <label>客户名称</label><br>
                                <input type="text" v-model="obj.customerName" class="form-control" readonly @click="openSelectCustomer">
                            </div>
                            <div class="col-4 p-t-15 p-l-15 p-r-15">
                                <label>期望送货时间</label><br>
                                <input type="datetime-local" v-model="obj.expectedDeliveryTime" class="form-control">
                            </div>
                            <div class="col-4 p-t-15 p-l-15 p-r-15">
                                <label>订单备注</label><br>
                                <input type="text" v-model="obj.orderRemark" class="form-control">
                            </div>
                        </div>
                    </LayoutPanel>
                    <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">

                        <Panel title="货品表" bodyCls="f-column" :border="false">
                            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                                <LinkButton iconCls="icon-add" :plain="true" @click="addChangeCommodity">新增货品</LinkButton>
                            </Panel>
                            <DataGrid :data="changeItems" :border="false"
                                      class="f-full"
                                      :columnResizing="true"
                                      :clickToEdit="true"
                                      editMode="cell">
                                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                                    <template slot="body" slot-scope="scope">
                                        {{ scope.rowIndex + 1 }}
                                    </template>
                                </GridColumn>
                                <GridColumn title="删除" align="center" width="60">
                                    <template slot="body" slot-scope="scope">
                                        <a @click="removeChangeCommodity(scope.rowIndex)" style="color:red" v-if="!scope.row.sendSupplier">删除</a>
                                    </template>
                                </GridColumn>
                                <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                                <GridColumn field='upc' title='商品UPC编号' width="120" align="center"></GridColumn>
                                <GridColumn field='commodityName' title='商品名称' width="120" align="center"></GridColumn>
                                <GridColumn field='wareNum' title='商品数量' width="120" align="center" :editable="true"></GridColumn>
                                <GridColumn field='jdPrice' title='售价' width="120" align="center" :editable="true"></GridColumn>
                                <GridColumn field='cost' title='采购价' width="120" align="center" :editable="true"></GridColumn>
                                <GridColumn field='supplierName' title='供应商' width="120" align="center"></GridColumn>
                            </DataGrid>
                        </Panel>
                    </LayoutPanel>
                </Layout>
            </div>
            <div class="dialog-button">
                <LinkButton style="width:80px" @click="saveOrderForm">保存</LinkButton>
                <LinkButton style="width:80px" @click="$refs.editOrderFormDlg.close()">关闭</LinkButton>
            </div>
        </Dialog>

        <Dialog bodyCls="f-column" ref="selectCommoditySupplierDlg" closed
                :title="'选择一个供应商'"
                :dialogStyle="{width:'50vW',height:'50vH'}"
                :modal="true">
            <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="true">
                <DataGrid :data="commoditySupplierList" :border="false"
                          :columnResizing="true"
                          @selectionChange="selectSupplier($event)"
                          selectionMode="single"
                          class="f-full">
                    <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                        <template slot="body" slot-scope="scope">
                            {{ scope.rowIndex + 1 }}
                        </template>
                    </GridColumn>
                    <GridColumn field='suppliername' title='供应商' width="120" align="center"></GridColumn>
                    <GridColumn field='finalPurchasePrice' title='最后采购价' width="120" align="center"></GridColumn>
                    <GridColumn field='lastPurchasePrice' title='上次采购价' width="120" align="center"></GridColumn>
                    <GridColumn field='lowestPurchasePrice' title='最低采购价' width="120" align="center"></GridColumn>
                    <GridColumn field='retailPrice' title='零售价' width="120" align="center"></GridColumn>
                    <GridColumn field='remark' title='备注' width="120" align="center"></GridColumn>
                </DataGrid>
            </Layout>
        </Dialog>
        <selectCustomer ref="selectCustomerCom" @selectCustomer="selectCustomer"></selectCustomer>
        <selectCommodity ref="selectCommodityCom" @selectCommodity="selectCommodity"></selectCommodity>
    </Layout>
</template>

<script>
import selectCommodity from '@/components/selectCommodity.vue';
import selectCustomer from '@/components/selectCustomer.vue';
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
            commoditySupplier: [],
            csObj: {},
            logs: [],
            itemObj: {},
            changeItems: [],
            commoditySupplierList: [],
            addCommodityObj: {},
            items2: []
        }
    },
    components: {
        filterList, selectCommodity, selectCustomer
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
    },
    methods: {
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.loading = true;
            let vm = this;
            this.$root.getData("orderForm/getOfflineOrderQueryList", {
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
                vm.obj={};
                vm.items=[];
                vm.changeItems=[];
                vm.loading = false;
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
            this.getData("orderFormItem/getList", {orderFormId: this.obj.id}, function (data) {
                vm.items = data.items;
            })
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        getRowCss(row) {
            if (row.changeCommodityStarus) {
                return {background: "#fbfea2"};
            }
            return null;
        },
        getItemRowCss(row) {
            if (row.logisticsCompanyName && row.logisticsNumber && row.deliveryTime) {
                return {background: "#c0ffbe"};
            }
            return null;
        },
        openSelectCustomer() {
            this.$refs.selectCustomerCom.openDlg();
        },
        selectCustomer(obj) {
            this.$set(this.obj, 'customerId', obj.id);
            this.$set(this.obj, 'customerName', obj.name);
        },
        add() {
            this.obj = {};
            this.$refs.editOrderFormDlg.open();
        },
        edit() {
            this.changeItems = this.clone(this.items);
            let flag = false;
            this.changeItems.forEach(function (e) {
                if (e.sendSupplier) {
                    flag = true;
                }
            })
            if (flag) {
                this.alert('已发送供应商,请撤回再试');
            } else {
                this.$refs.editOrderFormDlg.open();
            }
        },
        saveOrderForm() {
            let vm = this;
            this.getData("orderForm/saveOfflineOrder", {
                obj: JSON.stringify(vm.obj),
                items: JSON.stringify(vm.changeItems)
            }, function (data) {
                vm.$refs.editOrderFormDlg.close();
                vm.loadPage(vm.pageNumber, vm.pageSize);
            })
        },
        addChangeCommodity() {
            this.$refs.selectCommodityCom.open();
        },
        removeChangeCommodity(index) {
            if (this.changeItems[index].sendSupplier) {
                this.alert('已递交供应商,请先撤回.');
            } else {
                let vm = this;
                this.confirm("确认吗?", function () {
                    vm.changeItems.splice(index, 1);
                })
            }
        },
        selectCommodity(obj) {
            let vm = this;
            this.getData("commoditySupplier/getList", {commodityid: obj.id}, function (data) {
                vm.commoditySupplierList = [];
                if (!data.length) {
                    vm.alert('商品没有设置供应商');
                } else {
                    if (data.length === 1) {
                        vm.changeItems.push({
                            id: 0,
                            commodityId: obj.id,
                            sku: obj.wareid,
                            commodityName: obj.name,
                            wareNum: 0,
                            jdPrice: 0,
                            discount: 0,
                            cost: data[0].lastPurchasePrice,
                            supplierid: data[0].supplierid,
                            supplierName: data[0].suppliername
                        })
                    } else {
                        vm.commoditySupplierList = data;
                        vm.addCommodityObj = {
                            id: 0,
                            commodityId: obj.id,
                            sku: obj.wareid,
                            commodityName: obj.name,
                            wareNum: 0,
                            jdPrice: 0,
                            discount: 0,
                            cost: 0
                        }
                        vm.$refs.selectCommoditySupplierDlg.open();
                    }
                }
            })
        },
        selectSupplier(obj) {
            this.$set(this.addCommodityObj, 'supplierid', obj.supplierid);
            this.$set(this.addCommodityObj, 'supplierName', obj.suppliername);
            this.$set(this.addCommodityObj, 'cost', obj.lastPurchasePrice);
            this.changeItems.push(this.addCommodityObj);
            this.$refs.selectCommoditySupplierDlg.close();
        },
        testSend(obj) {
            let vm = this;
            if (parseFloat(obj.cost) > parseFloat(obj.jdPrice)) {
                if (confirm('采购价大于售价,确认啊?')) {
                    vm.sendSupplier(obj);
                }
            } else {
                vm.sendSupplier(obj);
            }
        },
        sendSupplier(obj) {
            let vm = this;
            this.confirm('递交供应商发货,确认吗?', function () {
                vm.getData("orderFormItem/sendSupplier", {id: obj.id}, function (data) {
                    vm.loadItems();
                })
            })
        },
        cancelProcess(obj) {
            let vm = this;
            this.confirm('撤回已发采购单,确认吗?', function () {
                vm.getData("supplierPurchaseOrder/cancelProcess", {itemId: obj.id}, function (data) {
                    vm.loadItems();
                })
            })
        },
        finish() {
            let vm = this;
            this.confirm("完成订单,确认吗?", function () {
                vm.getData("orderForm/finish", {orderFormId: vm.obj.id}, function (data) {
                    vm.loadPage(vm.pageNumber, vm.pageSize);
                    vm.items = [];
                    vm.changeItems = [];
                })
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
