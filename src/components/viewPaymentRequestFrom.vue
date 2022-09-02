<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" bodyCls="f-column" :border="false">
            <Panel :bodyStyle="{padding:'0'}" bodyCls="f-column" :border="false">
                    <table style="width: 100%">
                        <tbody>
                        <tr>
                            <th class="text-left" style="width: 33.333333%;padding: 8px">往来名称: {{ obj.unitName }}</th>
                            <th class="text-left" style="width: 33.333333%;padding: 8px">申请时间: {{ obj.applicationTime }}</th>
                            <th class="text-left" style="width: 33.333333%;padding: 8px">合计金额: {{ toMoney(obj.paymentAmount, '') }} 元</th>
                        </tr>
                        <tr>
                            <th class="text-left" style="width: 100%;padding: 8px" colspan="3">备注说明: {{ obj.remark }}</th>
                        </tr>
                        </tbody>
                    </table>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" bodyCls="f-column" :border="false">
            <DataGrid :data="list" :border="false"
                      class="f-full"
                      :columnResizing="true">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
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
                <GridColumn field='submitTime' title='递交时间' width="150" align="center"></GridColumn>
                <GridColumn field='sendType' title='送货方式' width="150" align="center">
                    <template slot="body" slot-scope="scope">
                        {{ scope.row.sendType ? "快递" : "送货" }}
                    </template>
                </GridColumn>
                <GridColumn field='logisticsCompanyName' title='物流公司' width="120" align="center"></GridColumn>
                <GridColumn field='logisticsNumber' title='物流单号' width="120" align="center"></GridColumn>
                <GridColumn field='deliveryPhone' title='送货电话' width="120" align="center"></GridColumn>
                <GridColumn field='shippingTime' title='发货时间' width="150" align="center"></GridColumn>
                <GridColumn field='estimatedArrivalDate' title='预计到达日期' width="120" align="center"></GridColumn>
            </DataGrid>
        </LayoutPanel>
    </Layout>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            processObj: {},
            obj: {},
            list: []
        }
    },
    created: function () {
        this.load();
    },
    methods: {
        load() {
            let vm = this;
            this.processObj = JSON.parse(sessionStorage.processObj);
            this.getData("paymentRequestForm/getViewObj", {id: this.processObj.relationid}, function (data) {
                vm.obj = data.obj;
                vm.$set(vm.obj, 'paymentAmount', 0);
                vm.list = [];
                data.list.forEach(function (e) {
                    vm.obj.paymentAmount += parseFloat(e.cost) * parseFloat(e.wareNum);
                    vm.list.push(e);
                })
            })
        }
    }
}
</script>

<style scoped>
.th {
    border: 1px solid #ddd;
    padding: 8px;
}

.td {
    border: 1px solid #ddd;
    padding: 8px;
}
</style>
