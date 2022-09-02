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
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <div class="row" style="padding-bottom: 20px">
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>往来单位</label><br>
                    <input type="text" v-model="obj.unitName" class="form-control" readonly @click="openSupplierDlg">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>应付余额(元)</label><br>
                    <input type="text" v-model="obj.over" class="form-control" readonly>
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>付款账户</label><br>
                    <input type="text" v-model="obj.accountName" class="form-control" readonly @click="openAccountDlg">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>付款金额(元)</label><br>
                    <NumberBox inputId="n2" v-model="obj.paymentAmount" :precision="2" :spinners="false" class="form-control"></NumberBox>
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>付款日期</label><br>
                    <input type="date" v-model="obj.paymentDate" class="form-control">
                </div>
                <div class="col-9 p-t-15 p-l-15 p-r-15">
                    <label>摘要说明</label><br>
                    <input type="text" v-model="obj.remark" class="form-control">
                </div>
            </div>
        </LayoutPanel>
        <Dialog ref="selectAccountDlg" closed
                :title="'选择资金账户'"
                :dialogStyle="{width:'300px',height:'500px'}"
                :modal="true"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true">
            <selectAccount ref="selectAccountCom" @selectAccount="selectAccount"></selectAccount>
        </Dialog>
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
            let vm = this;
            this.confirm("确认吗?", function () {
                vm.getData("paymentOrder/savePaymentOrder", vm.obj, function (data) {
                    vm.msg('操作成功');
                    vm.$router.push('paymentList');
                })
            })
        },
        openSupplierDlg() {
            this.$refs.selectSupplierDlg.open();
        },
        selectSupplier(obj) {
            let vm = this;
            this.$set(this.obj, 'unitId', obj.id);
            this.$set(this.obj, 'unitName', obj.name);
            this.$refs.selectSupplierDlg.close();
            this.getData("statement/getPayableOverage", {unitid: obj.id}, function (data) {
                if (data) {
                    vm.$set(vm.obj, 'over', data.credit);
                } else {
                    vm.$set(vm.obj, 'over', 0);
                }
            })
        },
        openAccountDlg() {
            this.$refs.selectAccountDlg.open();
        },
        selectAccount(obj) {
            this.$set(this.obj, 'accountId', obj.id);
            this.$set(this.obj, 'accountName', obj.name);
            this.$refs.selectAccountDlg.close();
        },
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
