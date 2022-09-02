<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'5px'}" bodyCls="f-column" :border="false">
                <template slot="header">
                    <div class="f-row">
                        <div class="f-full" style="line-height:30px">
                            <LinkButton iconCls="icon-save" :plain="true" @click="save">保存单据</LinkButton>
                        </div>
                    </div>
                </template>
                <div class="row" style="padding-bottom: 20px">
                    <div class="col-3 p-t-15 p-l-15 p-r-15">
                        <label>往来单位</label><br>
                        <input type="text" v-model="obj.unitName" class="form-control" readonly @click="openCustomerDlg">
                    </div>
                    <div class="col-6 p-t-15 p-l-15 p-r-15">
                        <label>摘要说明</label><br>
                        <input type="text" v-model="obj.remark" class="form-control">
                    </div>
                    <div class="col-3 p-t-15 p-l-15 p-r-15">
                        <label>合计金额</label><br>
                        <input type="text" v-model="obj.applicationAmount" readonly class="form-control">
                    </div>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                      class="f-full"
                      :columnResizing="true"
                      @rowExpand="loadItems($event)">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn :expander="true" width="30"></GridColumn>
                <GridColumn field="status" :width="50" align="center">
                    <template slot="header" slot-scope="scope">
                        <input type="checkbox" v-model="allSelected"
                               @click="all">
                    </template>
                    <template slot="body" slot-scope="scope">
                        <input type="checkbox" v-model="scope.row.selected"
                               @change="changeCheck(scope.row)">
                    </template>
                </GridColumn>
                <GridColumn field='customOrderId' title='订单编号' width="120" align="center"></GridColumn>
                <GridColumn field='customerName' title='客户名称' width="120" align="center"></GridColumn>
                <GridColumn field='username' title='负责人' width="80" align="center"></GridColumn>
                <GridColumn field='commodityNum' title='总数量' width="60" align="center"></GridColumn>
                <GridColumn title='合计金额' width="80" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.total, '') }}
                    </template>
                </GridColumn>
                <GridColumn field='consigneeName' title='收货人' width="120" align="left"></GridColumn>
                <GridColumn field='phone' title='手机号码' width="120" align="center"></GridColumn>
                <GridColumn field='address' title='收货地址' align="left"></GridColumn>
                <GridColumn field='finishTime' title='完成时间' width="150" align="center"></GridColumn>
                <template slot="detail" slot-scope="scope" :border="false">
                    <div style="padding: 3px;background-color: #fcf3c4">
                        <DataGrid :data="scope.row.items" :border="false"
                                  :columnResizing="true"
                                  class="f-full">
                            <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                            <GridColumn field='commodityName' title='商品名称' align="left"></GridColumn>
                            <GridColumn field='wareNum' title='商品数量' width="120" align="center"></GridColumn>
                            <GridColumn title='京东价' width="100" align="right">
                                <template slot="body" slot-scope="scope">
                                    {{ toMoney(scope.row.jdPrice, '') }}
                                </template>
                            </GridColumn>
                           <GridColumn title='售价' width="100" align="right">
                                <template slot="body" slot-scope="scope">
                                    {{ toMoney(scope.row.cost, '') }}
                                </template>
                            </GridColumn>
                            <GridColumn title='合计金额' width="100" align="right">
                                <template slot="body" slot-scope="scope">
                                    {{ toMoney(scope.row.cost * scope.row.wareNum, '') }}
                                </template>
                            </GridColumn>
<!--                            <GridColumn field='supplierName' title='供应商' width="220" align="left"></GridColumn>-->
<!--                            <GridColumn field='logisticsCompanyName' title='物流公司' width="120" align="center"></GridColumn>-->
<!--                            <GridColumn field='logisticsNumber' title='物流单号' width="120" align="center"></GridColumn>-->
<!--                            <GridColumn field='deliveryTime' title='发货时间' width="150" align="center"></GridColumn>-->
                        </DataGrid>
                    </div>
                </template>
            </DataGrid>
        </LayoutPanel>

        <Dialog ref="selectCustomerDlg" closed
                :title="'选择往来单位'"
                :dialogStyle="{width:'60%',height:'50%'}"
                :modal="true"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true">
            <selectCustomer ref="selectCustomerCom" @selectCustomer="selectCustomer"></selectCustomer>
        </Dialog>
    </Layout>
</template>

<script>
import selectCustomer from '@/components/selectCustomer.vue';

export default {
    name: "app",
    data() {
        return {
            data: [],
            obj: {},
            allSelected: false
        }
    },
    created: function () {
    },
    components: {
        selectCustomer
    },
    methods: {
        save() {
            let vm = this;
            this.confirm("确认吗?", function () {
                let arr = [];
                vm.data.forEach(function (e) {
                    if (e.selected) {
                        arr.push(e);
                    }
                })
                vm.getData("receiptApplicationForm/save", {
                    obj: JSON.stringify(vm.obj),
                    rows: JSON.stringify(arr)
                }, function (data) {
                    vm.msg('操作成功');
                    vm.$router.push('rceceiptApplicationForm');
                })
            })
        },
        openCustomerDlg() {
            this.$refs.selectCustomerDlg.open();
        },
        selectCustomer(obj) {
            this.$refs.selectCustomerDlg.close();
            this.$set(this.obj, 'unitId', obj.id);
            this.$set(this.obj, 'unitName', obj.name);
            this.loadCustomerList(obj.id);
        },
        loadCustomerList(unitId) {
            let vm = this;
            this.getData("orderForm/getCustomerList", {customerId: unitId}, function (data) {
                vm.data = [];
                data.forEach(function (e) {
                    vm.$set(e, 'selected', false);
                    vm.data.push(e);
                })
                vm.allSelected = false;
                vm.$set(vm.obj, 'applicationAmount', 0);
            })
        },
        all() {
            this.allSelected = !this.allSelected;
            let vm = this;
            this.data.forEach(function (e) {
                e.selected = vm.allSelected;
            })
            this.calcApplicationAmount();
        },
        loadItems(obj) {
            let vm = this;
            this.getData("orderFormItem/getList", {orderFormId: obj.id}, function (data) {
                vm.$set(obj, 'items', data.items);
                console.log(data.itmes);
            })
        },
        calcApplicationAmount() {
            this.$set(this.obj, 'applicationAmount', 0);
            let vm = this;
            this.data.forEach(function (e) {
                vm.$set(e, 'settlement', 0);
                if (e.selected) {
                    vm.obj.applicationAmount += e.total;
                    e.settlement = e.total;
                }
            })
        },
        changeCheck(row) {
            this.calcApplicationAmount();
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
