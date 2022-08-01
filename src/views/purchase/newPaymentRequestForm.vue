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
                <GridColumn field='customOrderId' title='订单编号' width="160" align="center"></GridColumn>
                <GridColumn field='wareid' title='商品编号' width="120" align="center"></GridColumn>
                <GridColumn field='commodityName' title='商品名称' align="left"></GridColumn>
                <GridColumn field='wareNum' title='数量' width="100" align="center"></GridColumn>
                <GridColumn field="cost" title='单价' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.cost, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='合计金额' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.cost * scope.row.wareNum, '') }}
                    </template>
                </GridColumn>
                <GridColumn field='createTime' title='递交时间' width="200" align="center"></GridColumn>
                <GridColumn field='deliveryTime' title='发货时间' width="200" align="center"></GridColumn>
            </DataGrid>
        </LayoutPanel>

        <Dialog ref="selectSupplierDlg" closed
                :title="'选择往来单位'"
                :dialogStyle="{width:'60%',height:'50%'}"
                :modal="true"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true">
            <selectSupplier ref="selectSupplierCom" @selectSupplier="selectSupplier"></selectSupplier>
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
            let vm=this;
            this.confirm("确认吗?",function (){
                let arr=[];
                vm.data.forEach(function (e){
                    if(e.selected){
                        arr.push(e);
                    }
                })
                vm.getData("paymentRequestForm/save", {
                    obj:JSON.stringify(vm.obj),
                    rows:JSON.stringify(arr)
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
            this.getData("supplierPurchaseOrder/getListBySupplierId", {supplierId: unitId}, function (data) {
                vm.data = [];
                data.forEach(function (e){
                    vm.$set(e,'selected',false);
                    vm.data.push(e);
                })
                vm.allSelected=false;
                vm.$set(vm.obj,'paymentAmount',0);
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
        calcPaymentAmount(){
            this.$set(this.obj,'paymentAmount',0);
            let vm = this;
            this.data.forEach(function (e) {
                vm.$set(e,'settlement',0);
                if(e.selected){
                    vm.obj.paymentAmount+=e.wareNum*e.cost;
                    e.settlement=e.wareNum*e.cost;
                }
            })
        },
        changeCheck(row){
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
