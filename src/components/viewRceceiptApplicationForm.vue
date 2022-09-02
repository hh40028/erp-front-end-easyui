<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'0'}" bodyCls="f-column" :border="false">
                <table style="width: 100%">
                    <tbody>
                    <tr>
                        <th class="text-left" style="width: 25%;padding: 8px">单据编号: {{ obj.number }}</th>
                        <th class="text-left" style="width: 25%;padding: 8px">往来名称: {{ obj.customername }}</th>
                        <th class="text-left" style="width: 25%;padding: 8px">申请时间: {{ obj.applicationTime }}</th>
                        <th class="text-left" style="width: 25%;padding: 8px">合计金额: {{ toMoney(obj.applicationAmount, '') }} 元</th>
                    </tr>
                    <tr>
                        <th class="text-left" style="width: 100%;padding: 8px" colspan="4">备注说明: {{ obj.remark }}</th>
                    </tr>
                    </tbody>
                </table>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :data="list"
                      :border="false"
                      class="f-full"
                      :columnResizing="true">
                <GridColumn field='customOrderId' title='订单编号' width="150" align="center"></GridColumn>
                <GridColumn field='customerName' title='客户名称' width="220" align="left"></GridColumn>
                <!--                <GridColumn field='orgName' title='负责机构' width="120" align="center"><></GridColumn>-->
                <GridColumn field='principalName' title='负责专员' width="120" align="center"></GridColumn>
                <GridColumn field='finishTime' title='完成时间' width="150" align="center"></GridColumn>
<!--                <GridColumn field='commodityNum' title='总数量' width="60" align="center"></GridColumn>-->
                <GridColumn title='订货金额' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.total, '') }}
                    </template>
                </GridColumn>
                <GridColumn field='consigneeName' title='收货人' width="120" align="center"></GridColumn>
                <!--                <GridColumn field='telephone' title='固定电话' width="120" align="center"></GridColumn>-->
                <GridColumn field='phone' title='手机号码' width="120" align="center"></GridColumn>
                <GridColumn field='address' title='收货地址' align="left"></GridColumn>
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
            this.getData("receiptApplicationForm/getViewObj", {id: this.processObj.relationid}, function (data) {
                vm.obj = data.obj;
                vm.list = [];
                data.list.forEach(function (e) {
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
