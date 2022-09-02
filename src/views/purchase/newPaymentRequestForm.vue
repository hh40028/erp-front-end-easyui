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
                        <input type="text" v-model="obj.unitName" class="form-control" readonly @click="openSupplierDlg">
                    </div>
                    <div class="col-6 p-t-15 p-l-15 p-r-15">
                        <label>摘要说明</label><br>
                        <input type="text" v-model="obj.remark" class="form-control">
                    </div>
                    <div class="col-3 p-t-15 p-l-15 p-r-15">
                        <label>合计金额</label><br>
                        <input type="text" v-model="obj.paymentAmount" readonly class="form-control">
                    </div>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                      class="f-full"
                      :columnResizing="true">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
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
                <GridColumn title='结算金额' width="80" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.settlement, '') }}
                    </template>
                </GridColumn>
                <GridColumn field='submitTime' title='递交时间' width="150" align="center"></GridColumn>
                <GridColumn field='consigneeName' title='收货人' width="120" align="center"></GridColumn>
                <GridColumn field='phone' title='手机号码' width="120" align="center"></GridColumn>
                <GridColumn field='address' title='收货地址' width="120" align="left"></GridColumn>
                <GridColumn field='logisticsCompanyName' title='物流公司' width="120" align="center"></GridColumn>
                <GridColumn field='logisticsNumber' title='物流单号' width="120" align="center"></GridColumn>
                <GridColumn field='shippingTime' title='发货时间' width="150" align="center"></GridColumn>
                <GridColumn field='estimatedArrivalDate' title='预计到达日期' width="120" align="center"></GridColumn>
            </DataGrid>
        </LayoutPanel>

        <Dialog ref="selectSupplierDlg" closed
                :title="'选择往来单位'"
                :dialogStyle="{width:'60%',height:'50%'}"
                :modal="true"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true">
            <selectSupplier ref="selectSupplierCom" hide-add="true" @selectSupplier="selectSupplier"></selectSupplier>
        </Dialog>
    </Layout>
</template>

<script>
import selectSupplier from '@/components/selectSupplier.vue';
import selectAccount from '@/components/selectAccount.vue';

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
        selectSupplier, selectAccount
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
                vm.getData("paymentRequestForm/save", {
                    obj: JSON.stringify(vm.obj),
                    rows: JSON.stringify(arr)
                }, function (data) {
                    vm.msg('操作成功');
                    vm.$router.push('paymentRequestForm');
                })
            })
        },
        openSupplierDlg() {
            this.$refs.selectSupplierDlg.open();
        },
        selectSupplier(obj) {
            this.$refs.selectSupplierDlg.close();
            this.$set(this.obj, 'unitId', obj.id);
            this.$set(this.obj, 'unitName', obj.name);
            this.loadPurchaseOrderList(obj.id);
        },
        openAccountDlg() {
            this.$refs.selectAccountCom.open();
        },
        selectAccount(obj) {
            this.$set(this.obj, 'accountId', obj.id);
            this.$set(this.obj, 'accountName', obj.name);
        },
        loadPurchaseOrderList(unitId) {
            let vm = this;
            this.getData("orderFormItem/getSupplierDeliveryNotSettlementList", {supplierId: unitId}, function (data) {
                vm.data = [];
                console.log(data);
                data.forEach(function (e) {
                    vm.$set(e, 'selected', false);
                    vm.data.push(e);
                })
                vm.allSelected = false;
                vm.$set(vm.obj, 'paymentAmount', 0);
                console.log(vm.data);
            })
        },
        all() {
            this.allSelected = !this.allSelected;
            let vm = this;
            this.data.forEach(function (e) {
                e.selected = vm.allSelected;
            })
            this.calcPaymentAmount();
        },
        calcPaymentAmount() {
            this.$set(this.obj, 'paymentAmount', 0);
            let vm = this;
            this.data.forEach(function (e) {
                vm.$set(e, 'settlement', 0);
                if (e.selected) {
                    vm.obj.paymentAmount += e.wareNum * e.purchasePrice;
                    e.settlement = e.wareNum * e.purchasePrice;
                }
            })
        },
        changeCheck(row) {
            this.calcPaymentAmount();
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
