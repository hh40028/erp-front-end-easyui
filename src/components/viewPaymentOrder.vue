<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'0'}" bodyCls="f-column" :border="false">
                <div class="row">
                    <table style="width: 100%">
                        <tbody>

                        <tr>
                            <th class="text-right th">往来名称</th>
                            <td class="text-left td">{{ obj.unitName }}</td>
                            <th class="text-right th">付款账户</th>
                            <td class="text-left td">{{ obj.accountName }}</td>
                            <th class="text-right th">付款金额</th>
                            <td class="text-left td">{{ toMoney(obj.paymentAmount, '') }} 元</td>
                            <th class="text-right th">经办人</th>
                            <td class="text-left td">{{ obj.username }}</td>

                        </tr>
                        <tr>
                            <th class="text-right th">付款日期</th>
                            <td class="text-left td">{{ obj.paymentDate }}</td>
                            <th class="text-right th">摘要说明</th>
                            <td class="text-left td" colspan="5">{{ obj.remark }}</td>
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
                <GridColumn field='orderFormId' title='订单编号' width="120" align="center"></GridColumn>
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
                <GridColumn title='结算金额' align="right" width="120">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.settlement, '') }}
                    </template>
                </GridColumn>
            </DataGrid>
        </LayoutPanel>
    </Layout>
</template>

<script>
export default {
    props: {
        obj: {
            type: Object,
            default: {}
        },
        list: {
            type: Array,
            default: []
        }
    },
    name: "app",
    data() {
        return {}
    },
    created: function () {
        this.load();
    },
    methods: {
        load: function () {
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
