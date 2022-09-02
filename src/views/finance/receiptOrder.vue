<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <LinkButton iconCls="icon-add" :plain="true" @click="add">新建</LinkButton>
                <div class="pull-right">
                    <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>
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
                      @rowExpand="loadItems($event)"
                      @selectionChange="selectObj($event)"
                      :pageNumber="pageNumber"
                      :showFooter="true"
                      :pageSize="pageSize"
                      @pageChange="onPageChange($event)"
                      :pagination="true"
                      :pagePosition="'bottom'">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn :expander="true" width="30"></GridColumn>
                <GridColumn field='number' title='单据编号' width="140" align="center"></GridColumn>
                <GridColumn field='unitname' title='往来单位' width="220" align="center"></GridColumn>
                <GridColumn field='accountname' title='收款账户' width="180" align="center"></GridColumn>
                <GridColumn title='收款金额(元)' width="180" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.amount, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='优惠金额(元)' width="180" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.wipezero, '') }}
                    </template>
                </GridColumn>
                <GridColumn field='receiptdate' title='收款日期' width="180" align="center"></GridColumn>
                <GridColumn field='username' title='收款人' width="100" align="center"></GridColumn>
                <GridColumn field='remark' title='摘要说明' align="left"></GridColumn>
                <template slot="detail" slot-scope="scope" :border="false">
                    <div style="padding: 3px;background-color: #fef7ce">
                        <DataGrid :data="scope.row.items"
                                  :border="false"
                                  :rowCss="getItemRowCss"
                                  class="f-full"
                                  :columnResizing="true">
                            <GridColumn field='customOrderId' title='订单编号' width="140" align="center"></GridColumn>
                            <!--                            <GridColumn field='customerName' title='客户名称' width="220" align="left"></GridColumn>-->
                            <GridColumn field='orgName' title='负责机构' width="120" align="center"><></GridColumn>
                            <GridColumn field='principalName' title='负责专员' width="120" align="center"></GridColumn>
                            <GridColumn field='finishTime' title='完成时间' width="150" align="center"></GridColumn>
                            <GridColumn field='commodityNum' title='总数量' width="60" align="center"></GridColumn>
                            <GridColumn title='合计金额' width="100" align="right">
                                <template slot="body" slot-scope="scope">
                                    {{ toMoney(scope.row.jdPrice, '') }}
                                </template>
                            </GridColumn>
                            <GridColumn title='结算金额' width="100" align="right">
                                <template slot="body" slot-scope="scope">
                                    {{ toMoney(scope.row.settlement, '') }}
                                </template>
                            </GridColumn>
                            <GridColumn field='consigneeName' title='收货人' width="120" align="center"></GridColumn>
                            <GridColumn field='telephone' title='固定电话' width="120" align="center"></GridColumn>
                            <GridColumn field='phone' title='手机号码' width="120" align="center"></GridColumn>
                            <GridColumn field='address' title='收货地址' width="320" align="left"></GridColumn>
                        </DataGrid>
                        <div style="text-align: center;font-size: 20px;color:#000000;line-height: 30px" v-if="scope.row.items.length===0">无结算单据</div>
                    </div>
                </template>
            </DataGrid>
        </LayoutPanel>
    </Layout>
</template>

<script>
import filterList from '@/components/filterList.vue';

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
            filterString: ''
        }
    },
    components: {
        filterList
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
    },
    methods: {
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
            this.loading = true;
            let vm = this;
            this.$root.getData("receiptOrder/getQueryList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: "id",
                direction: "desc",
                filterString: this.filterString
            }, function (data) {
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.data.push(e);
                })
                vm.loading = false;
            })
        },
        selectObj(obj) {
            this.obj = this.clone(obj);
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        changePageSize(value){
            this.pageSize=value;
            this.loadPage(1, this.pageSize);
        },
        loadItems(obj) {
            let vm = this;
            this.getData("orderForm/getOrderFormByReceiptOrderId", {receiptOrderId: obj.id}, function (data) {
                vm.$set(obj, 'items', data);
            })
        },
        getItemRowCss(row) {
            if (parseFloat(row.settlement) === parseFloat(row.jdPrice)) {
                return {background: "#e1ffe0"};
            }
            return null;
        },
        add() {
            this.$router.push('newReceiptOrder');
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
