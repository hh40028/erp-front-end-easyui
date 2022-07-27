<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="true" style="padding: 3px;">
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
                                <LinkButton style="margin-right: 20px" @click="submit">提交付款信息</LinkButton>
                            </td>
                        </tr>
                    </table>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" bodyCls="f-column" :border="true" style="padding: 3px;height: 100%">
            <Panel title="付款信息" bodyCls="f-column" :border="false">
                <Layout bodyCls="f-column" :border="false">
                    <LayoutPanel region="north" :border="false">
                        <Panel :bodyStyle="{padding:'3px'}" bodyCls="f-column" :border="false">
                            <div class="row">
                                <div class="col-3 p-10">
                                    <TextBox v-model="obj.unitName" style="width:100%;height:30px" readonly>
                                        <Addon align="left">
                                            <LinkButton :btnStyle="{borderRadius:0,borderWidth:'0 1px 0 0',width:'70px',height:'30px'}">往来单位:</LinkButton>
                                        </Addon>
                                    </TextBox>
                                </div>
                                <div class="col-3 p-10" @click="selAccount">
                                    <TextBox v-model="obj.accountName" style="width:100%;height:30px" readonly>
                                        <Addon align="left">
                                            <LinkButton :btnStyle="{borderRadius:0,borderWidth:'0 1px 0 0',width:'70px',height:'30px'}">付款账户:</LinkButton>
                                        </Addon>
                                    </TextBox>
                                </div>
                                <div class="col-3 p-10">
                                    <TextBox value="0" style="width:100%;height:30px" readonly>
                                        <Addon align="left">
                                            <LinkButton :btnStyle="{borderRadius:0,borderWidth:'0 1px 0 0',width:'70px',height:'30px'}">应付累计:</LinkButton>
                                        </Addon>
                                    </TextBox>
                                </div>
                                <div class="col-3 p-10">
<!--                                    <NumberBox inputId="n2" :value="234.56" :precision="2" :spinners="false"></NumberBox>-->
                                    <NumberBox v-model="obj.actualPaymentAmount" :precision="2" :spinners="false" style="width:100%;height:30px" @valueChange="calc">
                                        <Addon align="left">
                                            <LinkButton :btnStyle="{borderRadius:0,borderWidth:'0 1px 0 0',width:'70px',height:'30px'}">实付金额:</LinkButton>
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

                        <Panel bodyCls="f-column" :border="true" style="line-height: 35px">
                            <table style="width:100%">
                                <tr>
                                    <td style="width:50%">单据合计金额: <b>{{ toMoney(obj.totalAmount, '') }}元</b></td>
                                    <td style="width:50%;text-align: right;color:orangered"><div v-if="over>0">余额: {{toMoney(over,'')}}元,未分配采购单,记入应付账款(借)</div> </td>
                                </tr>
                            </table>
                        </Panel>
                        <DataGrid :data="list" :border="false"
                                  :clickToEdit="true"
                                  :rowCss="getRowCss"
                                  class="f-full"
                                  :columnResizing="true">
                            <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                                <template slot="body" slot-scope="scope">
                                    {{ scope.rowIndex + 1 }}
                                </template>
                            </GridColumn>
                            <GridColumn field='customOrderId' title='订单编号' width="120" align="center"></GridColumn>
                            <GridColumn field='wareid' title='商品编号' width="120" align="center"></GridColumn>
                            <GridColumn field='commodityName' title='商品名称' width="120" align="left"></GridColumn>
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
                            <GridColumn field='settlement' title='结算金额' width="100" align="center" :editable="true"></GridColumn>
                        </DataGrid>
                    </LayoutPanel>
                </Layout>
            </Panel>
        </LayoutPanel>
        <selectAccount ref="selectAccountCom" @selectAccount="selectAccount"></selectAccount>
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
            over:0
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
            this.getData("paymentRequestForm/getViewObj", {id: this.processObj.relationid}, function (data) {
                vm.obj = data.obj;
                vm.$set(vm.obj, 'totalAmount', 0);
                vm.list = [];
                data.list.forEach(function (e) {
                    vm.obj.totalAmount += parseFloat(e.cost) * parseFloat(e.wareNum);
                    vm.list.push(e);
                })
            })
        },
        selectAccount(obj) {
            this.$set(this.obj, 'accountid', obj.id);
            this.$set(this.obj, 'accountName', obj.name);
        },
        selAccount() {
            this.$refs.selectAccountCom.openDlg();
        },
        calc(){
            let vm=this;
            let total=parseFloat(this.obj.actualPaymentAmount);
            this.list.forEach(function (e){
                vm.$set(e,'settlement',0);
                let amount=parseFloat(e.wareNum)*parseFloat(e.cost);
                if(total>=amount){
                    e.settlement=amount;
                    total-=amount;
                }
            })
            this.over=total;
        },
        getRowCss(row) {
            if (parseFloat(row.wareNum)*parseFloat(row.cost)===parseFloat(row.settlement)) {
                return {background: "#a8fea2"};
            }
            return null;
        },
        submit(){
            let vm=this;
            this.confirm('提交付款单,确认吗?',function (){
                vm.getData("paymentOrder/submitProcessPayment", {
                    taskid: vm.processObj.id,
                    operationname: '付款完成',
                    message: '付款完成',
                    processVariables:JSON.stringify({}),
                    obj:JSON.stringify(vm.obj),
                    rows:JSON.stringify(vm.list)
                }, function (data) {
                    vm.$router.push('index');
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
