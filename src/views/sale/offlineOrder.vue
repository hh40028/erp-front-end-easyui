<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <LinkButton iconCls="icon-add" :plain="true" @click="add">新建订单</LinkButton>
                <LinkButton iconCls="icon-edit" :plain="true" @click="edit" :disabled="!obj.id || obj.finish">编辑订单</LinkButton>
                <LinkButton iconCls="icon-ok" :plain="true" @click="finish" :disabled="!obj.id || obj.finish">完成订单</LinkButton>
                <div class="pull-right">
                    <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>
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
                <GridColumn field='customOrderId' title='订单编号' width="120" align="center" :frozen="true"></GridColumn>
                <GridColumn field='customerName' title='客户名称' width="220" align="left"></GridColumn>
                <GridColumn field='consigneeName' title='收货人' width="100" align="center"></GridColumn>
                <GridColumn field='telephone' title='固定电话' width="120" align="center"></GridColumn>
                <GridColumn field='phone' title='手机号码' width="120" align="center"></GridColumn>
                <GridColumn field='address' title='收货地址' width="320" align="left"></GridColumn>
                <GridColumn field='expectedDeliveryTime' title='期望送货时间' width="150" align="center"></GridColumn>
                <GridColumn field='pay' title='订货金额' align="right" width="100">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.pay, '') }}
                    </template>
                </GridColumn>
                <GridColumn field='orderRemark' title='备注' align="left"></GridColumn>
            </DataGrid>
        </LayoutPanel>
        <LayoutPanel region="south" style="height:30%;" bodyCls="f-column" :border="false">
            <Tabs :plain="false" :narrow="false" :justified="false" style="height:100%" bodyCls="f-column">
                <TabPanel :title="'货品列表'" bodyCls="f-column">
                    <Panel class="f-full" :border="false" bodyCls="f-column">
                        <DataGrid :data="items" :border="false"
                                  :columnResizing="true"
                                  :rowCss="getItemRowCss"
                                  class="f-full">
                            <GridColumn title="编辑" align="center" width="80">
                                <template slot="body" slot-scope="scope">
                                    <div>
                                        <a v-if="scope.row.sendSupplier" @click="editItem(scope.row)" style="color:red;margin-left: 10px">编辑</a>
                                    </div>
                                </template>
                            </GridColumn>
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
                            <GridColumn field='orderNumber' title='单据编号' width="120" align="center"></GridColumn>
                            <GridColumn field='sku' title='SKU编号' width="120" align="center"></GridColumn>
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
        <Dialog ref="editOrderFormDlg" closed
                :title="'编辑线下订单'"
                :dialogStyle="{width:'80%',height:'80%'}"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <Layout style="width:100%;height:100%" bodyCls="f-column" :border="false">
                    <LayoutPanel region="north" style="height:100px;" :border="true">
                        <div class="row">
                            <div class="col-4 p-t-15 p-l-15 p-r-15">
                                <label>客户名称 <span :class="{'c-red':!obj.customerId}">*</span></label><br>
                                <input type="text" v-model="obj.customerName" :class="{'b-red':!obj.customerId}" class="form-control" readonly @click="openSelectCustomer">
                            </div>
                            <div class="col-4 p-t-15 p-l-15 p-r-15">
                                <label>期望送货时间 <span :class="{'c-red':!obj.expectedDeliveryTime}">*</span></label><br>
                                <selectDateTime :value="obj.expectedDeliveryTime" @selectDT="selectDT"></selectDateTime>
                                <!--                                <input type="datetime-local" v-model="obj.expectedDeliveryTime" :class="{'b-red':!obj.expectedDeliveryTime}" class="form-control">-->
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
                                <GridColumn field='commodityName' title='商品名称' width="320" align="left"></GridColumn>
                                <GridColumn field='wareNum' title='商品数量' width="120" align="center" :editable="true" :cellCss="getCellCss"></GridColumn>
                                <GridColumn field='cost' title='销售价' width="120" align="center" :editable="true" :cellCss="getCellCss"></GridColumn>
                                <GridColumn field='purchasePrice' title='采购价' width="120" align="center" :editable="true" :cellCss="getCellCss"></GridColumn>
                                <GridColumn field='supplierName' title='供应商' width="120" align="center"></GridColumn>
                            </DataGrid>
                        </Panel>
                    </LayoutPanel>
                </Layout>
            </div>
            <div class="dialog-button">
                <LinkButton style="width:80px" @click="saveOrderForm">保存</LinkButton>
                <LinkButton style="width:80px" v-if="obj.id>0" @click="deleteOrderForm">删除</LinkButton>
                <LinkButton style="width:80px" @click="$refs.editOrderFormDlg.close()">关闭</LinkButton>
            </div>
        </Dialog>
        <Dialog bodyCls="f-column" ref="selectCommoditySupplierDlg" closed
                :title="'选择一个供应商'"
                :draggable="true"
                :resizable="true"
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
                    <GridColumn field='suppliername' title='供应商' width="320" align="center"></GridColumn>
                    <GridColumn field='lastPurchasePrice' title='采购价' width="120" align="center"></GridColumn>
                    <GridColumn field='remark' title='备注' align="center"></GridColumn>
                </DataGrid>
            </Layout>
        </Dialog>
        <Dialog bodyCls="f-column" ref="editDlg" closed
                :title="'编辑信息'"
                :dialogStyle="{width:'500px'}"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <table class="table" style="width: 100%">
                    <tbody>
                    <tr>
                        <th class="text-right th">商品名称</th>
                        <td class="text-left td" colspan="3">{{ editObj.commodityName }}</td>
                    </tr>
                    <tr>
                        <th class="text-right th">商品数量</th>
                        <td class="text-left td">{{ editObj.wareNum }}</td>
                    </tr>
                    <tr>
                        <th class="text-right th">供应商名称</th>
                        <td class="text-left td">{{ editObj.supplierName }}</td>
                    </tr>
                    <tr>
                        <th class="text-right th">销售价</th>
                        <td class="text-left td">{{ toMoney(editObj.cost,'') }} 元</td>
                    </tr>
                    <tr>
                        <th class="text-right th">进货价</th>
                        <td class="text-left td">
                            <NumberBox v-model="editObj.purchasePrice" :precision="2" :spinners="false">
                                <Addon align="right">
                                    <LinkButton :style="{borderRadius:0,borderWidth:'0 0 0 1px',width:'30px',height:'30px'}">元</LinkButton>
                                </Addon>
                            </NumberBox>
                        </td>
                    </tr>
                    <tr>
                        <th class="text-right th">送货方式</th>
                        <td class="text-left td">

                            <ButtonGroup selectionMode="single">
                                <LinkButton :toggle="true" :selected="editObj.sendType" @click="editObj.sendType=true">快递</LinkButton>
                                <LinkButton :toggle="true" :selected="!editObj.sendType" @click="editObj.sendType=false">送货</LinkButton>
                            </ButtonGroup>
                        </td>
                    </tr>
                    <tr v-if="editObj.sendType">
                        <th class="text-right th">物流公司</th>
                        <td class="text-left td">
                            <input type="text" class="form-control" readonly v-model="editObj.logisticsCompanyName" @click="openLogistics">
                        </td>
                    </tr>
                    <tr v-if="editObj.sendType">
                        <th class="text-right th">物流单号</th>
                        <td class="text-left td">
                            <input type="text" class="form-control" v-model="editObj.logisticsNumber">
                        </td>
                    </tr>
                    <tr v-if="!editObj.sendType">
                        <th class="text-right th">送货电话</th>
                        <td class="text-left td">
                            <input type="text" class="form-control" v-model="editObj.deliveryPhone">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-right th">发货时间</th>
                        <td class="text-left td">
                            <selectDateTime :value="editObj.shippingTime" @selectDT="selectDeliveryTime"></selectDateTime>
                        </td>
                    </tr>
                    <tr>
                        <th class="text-right th">预计到达日期</th>
                        <td class="text-left td">
                            <input type="date" v-model="editObj.estimatedArrivalDate" class="form-control">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="dialog-button">
                <LinkButton style="width:80px" @click="modifyDirectly">保存</LinkButton>
                <LinkButton style="width:80px" @click="$refs.editDlg.close()">关闭</LinkButton>
            </div>
        </Dialog>
        <Dialog bodyCls="f-column" ref="selectCustomerDlg" closed
                :title="'选择供应商'"
                :dialogStyle="{width:'60vW',height:'50vH'}"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <selectCustomer ref="selectCustomerCom" @selectCustomer="selectCustomer"></selectCustomer>
            </div>
        </Dialog>
        <Dialog ref="viewImgDlg" closed
                :title="'商品图片'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'60%',height:'90%'}"
                :modal="true">
            <viewImgs ref="viewImgs" :commodity-id="huoPinObj.commodityId" @getImgPath="getImgPath"></viewImgs>
        </Dialog>
        <Dialog ref="selectLogisticsTypeDlg" closed
                :title="'选择物流公司'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'300px',height:'60%'}"
                :modal="true">
            <selectLogisticsType ref="selectLogisticsTypeCom" tag="京东" @selectLogisticsType="selectLogisticsType"></selectLogisticsType>
        </Dialog>
        <selectCommodity ref="selectCommodityCom" @selectCommodity="selectCommodity"></selectCommodity>
    </Layout>
</template>

<script>
import selectCommodity from '@/components/selectCommodity.vue';
import selectCustomer from '@/components/selectCustomer.vue';
import filterList from '@/components/filterList.vue';
import viewImgs from '@/components/viewImgs.vue';
import selectDateTime from '@/components/selectDateTime.vue';
import selectLogisticsType from '@/components/selectLogisticsType.vue';

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
            editObj: {},
            huoPinObj: {}
        }
    },
    components: {
        filterList, selectCommodity, selectCustomer, viewImgs, selectDateTime, selectLogisticsType
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
                vm.obj = {};
                vm.items = [];
                vm.changeItems = [];
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
            this.getData("orderFormItem/getOfflineList", {orderFormId: this.obj.id}, function (data) {
                vm.items = data.items;
            })
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        changePageSize(value) {
            this.pageSize = value;
            this.loadPage(1, this.pageSize);
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
            this.$refs.selectCustomerDlg.open();
        },
        selectCustomer(obj) {
            this.$set(this.obj, 'customerId', obj.id);
            this.$set(this.obj, 'customerName', obj.name);
            this.$refs.selectCustomerDlg.close();
        },
        add() {
            this.obj = {};
            this.changeItems = [];
            this.$refs.editOrderFormDlg.open();
        },
        edit() {
            this.changeItems = this.clone(this.items);
            console.log(this.changeItems);
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
            this.getData("commoditySupplier/getList", {commodityId: obj.id}, function (data) {
                if (data.length === 0) {
                    vm.alert('商品没有配置供应商');
                } else {
                    vm.commoditySupplierList = [];
                    if (data.length === 1) {
                        vm.changeItems.push({
                            id: 0,
                            commodityId: obj.id,
                            sku: obj.wareId,
                            commodityName: obj.name,
                            wareNum: 0,
                            jdPrice: 0,
                            discount: 0,
                            cost: 0,
                            purchasePrice: data[0].lastPurchasePrice,
                            supplierid: data[0].supplierid,
                            supplierName: data[0].suppliername
                        })
                    } else {
                        vm.commoditySupplierList = data;
                        vm.addCommodityObj = {
                            id: 0,
                            commodityId: obj.id,
                            sku: obj.wareId,
                            commodityName: obj.name,
                            wareNum: 0,
                            jdPrice: 0,
                            discount: 0,
                            cost: 0,
                            purchasePrice: data[0].lastPurchasePrice,
                        }
                        vm.$refs.selectCommoditySupplierDlg.open();
                    }
                }
            })
        },
        selectSupplier(obj) {
            this.$set(this.addCommodityObj, 'supplierid', obj.supplierid);
            this.$set(this.addCommodityObj, 'supplierName', obj.suppliername);
            this.$set(this.addCommodityObj, 'purchasePrice', obj.lastPurchasePrice);
            this.changeItems.push(this.addCommodityObj);
            this.$refs.selectCommoditySupplierDlg.close();
        },
        testSend(obj) {
            let vm = this;
            if (parseFloat(obj.cost) < parseFloat(obj.purchasePrice)) {
                if (confirm('采购价大于销售价,确认啊?')) {
                    vm.sendSupplier(obj);
                }
            } else {
                vm.sendSupplier(obj);
            }
        },
        sendSupplier(obj) {
            let vm = this;
            this.confirm('递交供应商发货,确认吗?', function () {
                vm.getData("orderFormItem/sendSupplier", {obj: JSON.stringify(obj)}, function (data) {
                    vm.loadItems();
                })
            })
        },
        cancelProcess(obj) {
            let vm = this;
            this.confirm('撤回已发采购单,确认吗?', function () {
                vm.getData("orderFormItem/cancelProcess", {itemId: obj.id}, function (data) {
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
        },
        editItem(obj) {
            this.editObj = this.clone(obj);
            this.$refs.editDlg.open();
        },
        modifyDirectly() {
            let vm = this;
            this.$refs.editDlg.close();
            this.confirm('直接更改发货信息,确认吗?', function () {
                vm.getData("orderFormItem/modifyDirectly", {obj: JSON.stringify(vm.editObj)}, function (data) {
                    vm.editObj = {};
                    vm.loadItems();
                })
            })
        },
        viewImg(obj) {
            this.huoPinObj = obj;
            this.$refs.viewImgDlg.open();
        },
        getImgPath(path) {
            this.huoPinObj.imgPath = path;
        },
        getCellCss(row, value) {
            if (!value) {
                return {backgroundColor: "red"};
            }
            return null;
        },
        selectDT(obj) {
            this.$set(this.obj, 'expectedDeliveryTime', obj);
        },
        deleteOrderForm() {
            let vm = this;
            this.confirm("删除订单,确认吗?", function () {
                vm.getData("orderForm/delete", {id: vm.obj.id}, function (data) {
                    vm.$refs.editOrderFormDlg.close();
                    vm.loadPage(1, vm.pageSize);
                    vm.obj = {};
                    vm.items = [];
                    vm.changeItems = [];
                })
            })
        },
        selectLogisticsType(obj) {
            this.$set(this.editObj, 'logisticsId', obj.carriers_id);
            this.$set(this.editObj, 'logisticsCompanyName', obj.carriers_name);
            this.$refs.selectLogisticsTypeDlg.close();
        },
        openLogistics() {
            this.$refs.selectLogisticsTypeDlg.open();
        },
        selectDeliveryTime(obj) {
            this.$set(this.editObj, 'shippingTime', obj);
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
    width: 25%;
    line-height: 30px;
    padding: 5px;
}

.td {
    border: 1px solid #ddd;
    width: 75%;
    line-height: 30px;
    padding: 5px;
}
</style>
