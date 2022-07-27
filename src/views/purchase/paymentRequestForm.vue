<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <ButtonGroup selectionMode="single">
                    <LinkButton iconCls="icon-add" :plain="true" @click="add">新建</LinkButton>
                    <LinkButton iconCls="icon-add" :plain="true" @click="send" :disabled="obj.processId">发送审核</LinkButton>
                </ButtonGroup>
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
                      :loading="loading"
                      :pageNumber="pageNumber"
                      :pageSize="pageSize"
                      selectionMode="single"
                      @selectionChange="selectObj($event)"
                      @pageChange="onPageChange($event)"
                      :pagination="true"
                      :pagePosition="'bottom'">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="40">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn :expander="true" width="30"></GridColumn>
                <GridColumn title='流程状态' width="80" align="center">
                    <template slot="body" slot-scope="scope">
                        <span v-if="!scope.row.processId && !scope.row.processStatus">未发送</span>
                        <span style="color: orange" v-if="scope.row.processId && !scope.row.processStatus">流程中</span>
                        <span style="color: green" v-if="scope.row.processId && scope.row.processStatus">已付款</span>
                    </template>
                </GridColumn>
                <GridColumn field='unitName' title='往来单位' width="260" align="left"></GridColumn>
                <GridColumn field='applicationTime' title='申请时间' width="220" align="center"></GridColumn>
                <GridColumn field='actualPaymentAmount' title='实付金额' width="220" align="center"></GridColumn>
                <GridColumn field='remark' title='备注' align="left"></GridColumn>
                <template slot="detail" slot-scope="scope" :border="false">
                    <div style="padding: 0">
                        <DataGrid :data="scope.row.items"
                                  :border="false"
                                  :rowCss="getRowCss"
                                  class="f-full"
                                  :columnResizing="true">
                            <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                                <template slot="body" slot-scope="scope">
                                    {{ scope.rowIndex + 1 }}
                                </template>
                            </GridColumn>
                            <GridColumn field='orderFormId' title='订单编号' width="120" align="center"></GridColumn>
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
                            <GridColumn field='logisticsCompanyName' title='物流公司' width="200" align="center"></GridColumn>
                            <GridColumn field='logisticsNumber' title='物流单号' width="200" align="center"></GridColumn>
                            <GridColumn field='createTime' title='递交时间' width="200" align="center"></GridColumn>
                            <GridColumn field='deliveryTime' title='发货时间' width="200" align="center"></GridColumn>
                            <GridColumn title='结算金额' width="100" align="right">
                                <template slot="body" slot-scope="scope">
                                    {{ toMoney(scope.row.settlement, '') }}
                                </template>
                            </GridColumn>
                        </DataGrid>
                    </div>
                </template>
            </DataGrid>
        </LayoutPanel>
        <Dialog ref="selectUserDlg" closed
                :title="'选择审核人'"
                :dialogStyle="{width:'600px',height:'600px'}"
                :modal="true">
            <selectOrganizationUser ref="selectOrganizationUserCom" @selectUser="selectUser"></selectOrganizationUser>
        </Dialog>
    </Layout>
</template>

<script>
import filterList from '@/components/filterList.vue';
import selectOrganizationUser from '@/components/selectOrganizationUser.vue';

export default {
    name: "app",
    data() {
        return {
            total: 0,
            pageSize: 20,
            pageNumber: 1,
            data: [],
            loading: false,
            obj: {},
            timeout: null,
            filterString: ''
        }
    },
    components: {
        filterList, selectOrganizationUser
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
            this.$root.getData("paymentRequestForm/getQueryList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: "id",
                direction: "desc",
                filterString: this.filterString,
                deliveryStatus: this.deliveryStatus,
                settlement: this.settlement
            }, function (data) {
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.data.push(e);
                    vm.loadItems(e);
                })
                vm.loading = false;
            })
        },
        loadItems(e) {
            let vm = this;
            this.getData("paymentRequestFormChild/getListByPid", {pid: e.id}, function (data) {
                vm.$set(e, 'items', data);
            })
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        add() {
            this.$router.push('newPayment');
        },
        send() {
            if (!this.obj.id) {
                this.alert('请选择一行');
            } else {
                this.$refs.selectUserDlg.open();
            }
        },
        selectObj(obj) {
            this.obj = obj;
        },
        selectUser(obj) {
            let vm = this;
            this.$refs.selectUserDlg.close();
            this.confirm('发送' + obj.username + '审核,确认吗?', function () {
                vm.getData("paymentRequestForm/startProcess", {id: vm.obj.id, sprid: obj.id}, function (data) {
                    vm.msg('发送成功');
                    vm.loadPage(vm.pageNumber, vm.pageSize);
                })
            })
        },
        getRowCss(row) {
            if (parseFloat(row.wareNum)*parseFloat(row.cost)===parseFloat(row.settlement)) {
                return {background: "#a8fea2"};
            }
            return null;
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
