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
                    <input type="text" v-model="obj.unitname" class="form-control" readonly @click="openCustomerDlg">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>应收余额(元)</label><br>
                    <input type="text" v-model="obj.over" class="form-control" readonly>
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>收款账户</label><br>
                    <input type="text" v-model="obj.accountname" class="form-control" readonly @click="openAccountDlg">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>收款金额(元)</label><br>
                    <NumberBox inputId="n2" v-model="obj.amount" :precision="2" :spinners="false" class="form-control"></NumberBox>
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>收款日期</label><br>
                    <input type="date" v-model="obj.receiptdate" class="form-control">
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
        selectCustomer, selectAccount
    },
    methods: {
        save() {
            let vm = this;
            this.confirm("确认吗?", function () {
                vm.getData("receiptOrder/save", vm.obj, function (data) {
                    vm.msg('操作成功');
                    vm.$router.push('receiptOrder');
                })
            })
        },
        openCustomerDlg() {
            this.$refs.selectCustomerDlg.open();
        },
        selectCustomer(obj) {
            let vm = this;
            this.$set(this.obj, 'unitid', obj.id);
            this.$set(this.obj, 'unitname', obj.name);
            this.$refs.selectCustomerDlg.close();
            this.getData("statement/getReceivableOverage", {unitid: obj.id}, function (data) {
                if (data) {
                    vm.$set(vm.obj, 'over', data.debit);
                } else {
                    vm.$set(vm.obj, 'over', 0);
                }
            })
        },
        openAccountDlg() {
            this.$refs.selectAccountDlg.open();
        },
        selectAccount(obj) {
            this.$set(this.obj, 'accountid', obj.id);
            this.$set(this.obj, 'accountname', obj.name);
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
