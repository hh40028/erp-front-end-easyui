<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'0'}" bodyCls="f-column" :border="false">
                <div class="row">
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
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :data="list" style="width:100%;height:250px" :border="false"
                      class="f-full"
                      :columnResizing="true">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field='customOrderId' title='订单编号' width="120" align="center"></GridColumn>
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
    </Layout>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            processObj:{},
            obj:{},
            list:[]
        }
    },
    created: function () {
        this.load();
    },
    methods: {
        load() {
            let vm = this;
            this.processObj=JSON.parse(sessionStorage.processObj);
            this.getData("paymentRequestForm/getViewObj", {id:this.processObj.relationid}, function (data) {
                vm.obj=data.obj;
                vm.$set(vm.obj,'paymentAmount',0);
                vm.list=[];
                data.list.forEach(function (e){
                    vm.obj.paymentAmount+=parseFloat(e.cost)*parseFloat(e.wareNum);
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
