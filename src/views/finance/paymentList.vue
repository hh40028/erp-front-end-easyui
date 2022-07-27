<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <LinkButton iconCls="icon-add" :plain="true" @click="newPayment">开单</LinkButton>
                <LinkButton :plain="true" @click="view">查看</LinkButton>
                <div class="pull-right">
                    <filterList @filterLoad="filter"></filterList>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                      class="f-full"
                      :columnResizing="true"
                      :lazy="true"
                      :total="total"
                      selectionMode="single"
                      :loading="loading"
                      @selectionChange="selectObj($event)"
                      :pageNumber="pageNumber"
                      :pageSize="pageSize"
                      @pageChange="onPageChange($event)"
                      :pagination="true"
                      :pagePosition="'bottom'">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field='unitName' title='单位名称' width="220" align="center"></GridColumn>
                <GridColumn field='accountName' title='付款账户' width="220" align="center"></GridColumn>
                <GridColumn title='付款金额' width="120" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.paymentAmount, '') }}
                    </template>
                </GridColumn>
                <GridColumn field='paymentDate' title='付款日期' width="180" align="center"></GridColumn>
                <GridColumn field='username' title='经办人' width="120" align="center"></GridColumn>
                <GridColumn field='remark' title='摘要' align="left"></GridColumn>
            </DataGrid>
        </LayoutPanel>
        <Dialog ref="viewDlg" closed
                :title="'查看付款单据信息'"
                :dialogStyle="{width:'80%',height:'80%'}"
                bodyCls="f-column"
                :modal="true">
            <div class="f-full">
                <viewPaymentOrder :obj="obj" :list="supplierPurchaseOrderList"></viewPaymentOrder>
            </div>
        </Dialog>
    </Layout>
</template>

<script>
import filterList from '@/components/filterList.vue';
import viewPaymentOrder from '@/components/viewPaymentOrder.vue';

export default {
    name: "app",
    data() {
        return {
            total: 0,
            pageSize: 15,
            pageNumber: 1,
            data: [],
            loading: false,
            obj: {},
            timeout: null,
            filterString: '',
            supplierPurchaseOrderList:[]
        }
    },
    components: {
        filterList,viewPaymentOrder
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
    },
    methods: {
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.loading = true;
            let vm = this;
            this.$root.getData("paymentOrder/getQueryList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: "id",
                direction: "desc",
                filterString: this.filterString,
                deliveryStatus: false
            }, function (data) {
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.$set(e, 'selected', false);
                    vm.data.push(e);
                })
                vm.allSelected = false;
                vm.loading = false;
            })
        },
        selectObj(obj) {
            this.obj = this.clone(obj);
            let vm = this;
            this.getData("supplierPurchaseOrder/getListBySettlement", {settlementOrderId: this.obj.id}, function (data) {
                vm.supplierPurchaseOrderList = data;
            })
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        newPayment() {
            this.$router.push('newPayment');
        },
        view(){
            this.$refs.viewDlg.open();
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
