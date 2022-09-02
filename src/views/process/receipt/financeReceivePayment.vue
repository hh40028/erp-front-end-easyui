<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :title="processObj.pdname" bodyCls="f-column" :border="false">
                <div style="padding: 5px">
                    <table style="width:100%;border:0">
                        <tr>
                            <td style="width:33.33333%">发送人: {{ processObj.sendusername }}</td>
                            <td style="width:33.33333%">发送时间: {{ processObj.arrivaltime }}</td>
                            <td style="width:33.33333%">发送意见: {{ processObj.message }}</td>
                        </tr>
                        <tr>
                            <td style="width:100%;text-align: left" colspan="3">
                                <LinkButton style="margin-right: 20px" @click="openDlg">驳回申请</LinkButton>
                                <LinkButton style="margin-right: 20px" @click="submit">提交收款信息</LinkButton>
                            </td>
                        </tr>
                    </table>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" bodyCls="f-column" :border="true">
            <Panel title="收款信息" bodyCls="f-column" :border="false">
                <Layout bodyCls="f-column" :border="false">
                    <LayoutPanel region="north" :border="false">
                        <Panel :bodyStyle="{padding:'3px'}" bodyCls="f-column" :border="false">
                            <div class="row">
                                <div class="col-3 p-10">
                                    <TextBox v-model="obj.customername" style="width:100%;height:30px" readonly>
                                        <Addon align="left">
                                            <LinkButton :btnStyle="{borderRadius:0,borderWidth:'0 1px 0 0',width:'70px',height:'30px'}">往来单位:</LinkButton>
                                        </Addon>
                                    </TextBox>
                                </div>
                                <div class="col-3 p-10" @click="selAccount">
                                    <TextBox v-model="obj.accountname" style="width:100%;height:30px" readonly>
                                        <Addon align="left">
                                            <LinkButton :btnStyle="{borderRadius:0,borderWidth:'0 1px 0 0',width:'70px',height:'30px'}">收款账户:</LinkButton>
                                        </Addon>
                                    </TextBox>
                                </div>
                                <div class="col-3 p-10">
                                    <TextBox value="0" style="width:100%;height:30px" readonly>
                                        <Addon align="left">
                                            <LinkButton :btnStyle="{borderRadius:0,borderWidth:'0 1px 0 0',width:'70px',height:'30px'}">应收累计:</LinkButton>
                                        </Addon>
                                    </TextBox>
                                </div>
                                <div class="col-3 p-10">
                                    <NumberBox v-model="obj.amount" :precision="2" :spinners="false" style="width:100%;height:30px" @valueChange="calc">
                                        <Addon align="left">
                                            <LinkButton :btnStyle="{borderRadius:0,borderWidth:'0 1px 0 0',width:'70px',height:'30px'}">实收金额:</LinkButton>
                                        </Addon>
                                    </NumberBox>
                                </div>
                                <div class="col-12 p-10">
                                    <TextBox v-model="obj.remark" style="width:100%;height:30px">
                                        <Addon align="left">
                                            <LinkButton :btnStyle="{borderRadius:0,borderWidth:'0 1px 0 0',width:'70px',height:'30px'}">摘要说明:</LinkButton>
                                        </Addon>
                                    </TextBox>
                                </div>
                            </div>
                        </Panel>
                    </LayoutPanel>
                    <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">

                        <Panel bodyCls="f-column" :border="false" style="line-height: 35px">
                            <table style="width:100%">
                                <tr>
                                    <td style="width:50%">单据合计金额: <b>{{ toMoney(obj.totalAmount, '') }}元</b></td>
                                    <td style="width:50%;text-align: right;color:orangered">
                                        <div v-if="over>0">余额: {{ toMoney(over, '') }}元未分配订单,记入应收账款(贷)</div>
                                    </td>
                                </tr>
                            </table>
                        </Panel>
                        <DataGrid :data="list" :border="false"
                                  :rowCss="getRowCss"
                                  class="f-full"
                                  :columnResizing="true">
                            <GridColumn field='customOrderId' title='订单编号' width="150" align="center"></GridColumn>
                            <!--                            <GridColumn field='customerName' title='客户名称' width="220" align="left"></GridColumn>-->
<!--                            <GridColumn field='orgName' title='负责机构' width="120" align="center"><></GridColumn>-->
                            <GridColumn field='principalName' title='负责专员' width="120" align="center"></GridColumn>
                            <GridColumn field='finishTime' title='完成时间' width="150" align="center"></GridColumn>
<!--                            <GridColumn field='commodityNum' title='总数量' width="60" align="center"></GridColumn>-->
                            <GridColumn title='订货金额' width="100" align="right">
                                <template slot="body" slot-scope="scope">
                                    {{ toMoney(scope.row.total, '') }}
                                </template>
                            </GridColumn>
                            <GridColumn field='consigneeName' title='收货人' width="120" align="center"></GridColumn>
<!--                            <GridColumn field='telephone' title='固定电话' width="120" align="center"></GridColumn>-->
                            <GridColumn field='phone' title='手机号码' width="120" align="center"></GridColumn>
                            <GridColumn field='address' title='收货地址' align="left"></GridColumn>
                            <GridColumn title='结算金额' width="100" align="right">
                                <template slot="body" slot-scope="scope">
                                    {{ toMoney(scope.row.settlement, '') }}
                                </template>
                            </GridColumn>
                        </DataGrid>
                    </LayoutPanel>
                </Layout>
            </Panel>
        </LayoutPanel>
        <Dialog ref="selectAccountDlg" closed
                :title="'选择资金账户'"
                :dialogStyle="{width:'300px',height:'500px'}"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <selectAccount ref="selectAccountCom" @selectAccount="selectAccount"></selectAccount>
            </div>
        </Dialog>
        <Dialog ref="processDlg" closed
                :title="'审核意见'"
                :dialogStyle="{width:'300px',height:'200px'}"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <div style="padding: 10px">
                    <div>
                        <textarea placeholder="请输入驳回理由" style="height: 70px" class="form-control" v-model="message"></textarea>
                    </div>
                </div>
            </div>
            <div class="dialog-button">
                <LinkButton style="width:80px" @click="reject">驳回</LinkButton>
                <LinkButton style="width:80px" @click="$refs.processDlg.close()">关闭</LinkButton>
            </div>
        </Dialog>
    </Layout>
</template>

<script>


import selectAccount from "@/components/selectAccount";

export default {
    name: "app",
    data() {
        return {
            processObj: {},
            taskName: '',
            message: '',
            obj: {},
            list: [],
            over: 0
        }
    },
    created: function () {
        this.processObj = JSON.parse(sessionStorage.processObj);
        this.load();
    },
    components: {
        selectAccount
    },
    methods: {
        load() {
            let vm = this;
            this.processObj = JSON.parse(sessionStorage.processObj);
            this.getData("receiptApplicationForm/getViewObj", {id: this.processObj.relationid}, function (data) {
                vm.obj = data.obj;
                vm.$set(vm.obj, 'totalAmount', 0);
                vm.list = [];
                data.list.forEach(function (e) {
                    vm.obj.totalAmount += parseFloat(e.total);
                    vm.list.push(e);
                })
            })
        },
        selectAccount(obj) {
            this.$set(this.obj, 'accountId', obj.id);
            this.$set(this.obj, 'accountname', obj.name);
            this.$refs.selectAccountDlg.close();
        },
        selAccount() {
            this.$refs.selectAccountDlg.open();
        },
        calc() {
            let vm = this;
            let total = parseFloat(this.obj.amount);
            this.list.forEach(function (e) {
                vm.$set(e, 'settlement', 0);
                let amount = parseFloat(e.total);
                if (total >= amount) {
                    e.settlement = amount;
                    total -= amount;
                }
            })
            this.over = total;
        },
        getRowCss(row) {
            if (parseFloat(row.total) === parseFloat(row.settlement)) {
                return {background: "#a8fea2"};
            }
            return null;
        },
        submit() {
            let vm = this;
            this.confirm('提交收款单,确认吗?', function () {
                vm.getData("receiptOrder/submitProcessReceipt", {
                    taskid: vm.processObj.id,
                    operationname: '收款完成',
                    message: '收款完成',
                    processVariables: JSON.stringify({}),
                    obj: JSON.stringify(vm.obj),
                    rows: JSON.stringify(vm.list),
                    over:vm.over
                }, function (data) {
                    vm.$router.push('index');
                })
            })
        },
        reject() {
            this.$refs.processDlg.close();
            let vm = this;
            this.confirm('驳回申请,确认吗?', function () {
                vm.getData("sys/nextTask", {
                    taskid: vm.processObj.id,
                    operationname: '驳回',
                    message: vm.message,
                    processVariables: JSON.stringify({}),
                }, function (data) {
                    vm.$router.push('index');
                })
            })
        },
        openDlg() {
            this.$refs.processDlg.open();
        }
    }
}
</script>

<style scoped>

</style>
