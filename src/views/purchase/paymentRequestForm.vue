<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <LinkButton iconCls="icon-add" :plain="true" @click="add">新建</LinkButton>
                <LinkButton iconCls="icon-remove" :plain="true" @click="removeObj" :disabled="!obj.id || obj.processId">删除</LinkButton>
                <LinkButton iconCls="icon-ok" :plain="true" @click="send" :disabled="!obj.id || obj.processId">发送审核</LinkButton>
                <LinkButton iconCls="icon-search" :plain="true" :disabled="!obj.id" @click="view">流程表</LinkButton>
                <LinkButton iconCls="icon-undo" :plain="true" @click="cancel" :disabled="!(obj.id && obj.processId && !obj.processStatus)">撤回流程</LinkButton>
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
                      :rowCss="getRowCss"
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
                        <span v-if="scope.row.processId && !scope.row.processStatus">流程中</span>
                        <span v-if="scope.row.processId && scope.row.processStatus">已付款</span>
                    </template>
                </GridColumn>
                <GridColumn field='number' title='单据编号' width="160" align="center"></GridColumn>
                <GridColumn field='unitName' title='往来单位' width="260" align="left"></GridColumn>
                <GridColumn title='申请金额' width="150" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.applicationAmount, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='实付金额' width="150" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.actualPaymentAmount, '') }}
                    </template>
                </GridColumn>
                <GridColumn field='applicationTime' title='申请时间' width="220" align="center"></GridColumn>
                <GridColumn field='remark' title='备注' align="left"></GridColumn>
                <template slot="detail" slot-scope="scope" :border="false">
                    <div style="padding: 3px;background-color: #fff3b1">
                        <DataGrid :data="scope.row.items"
                                  :border="false"
                                  :rowCss="getItemRowCss"
                                  class="f-full"
                                  :columnResizing="true">

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
                            <GridColumn title='结算金额' width="80" align="right">
                                <template slot="body" slot-scope="scope">
                                    {{ toMoney(scope.row.settlement, '') }}
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
                    </div>
                </template>
            </DataGrid>
        </LayoutPanel>
        <Dialog ref="selectUserDlg" closed
                :title="'选择审核人'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'600px',height:'600px'}"
                :modal="true">
            <selectOrganizationUser ref="selectOrganizationUserCom" @selectUser="selectUser"></selectOrganizationUser>
        </Dialog>
        <Dialog ref="viewTasksDlg" closed
                :title="'流程信息'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'80%',height:'60%'}"
                :modal="true">
            <viewTasks ref="viewTasksCom" :instanceid="obj.processId" :relationid="obj.id"></viewTasks>
        </Dialog>
    </Layout>
</template>

<script>
import filterList from '@/components/filterList.vue';
import selectOrganizationUser from '@/components/selectOrganizationUser.vue';
import viewTasks from '@/components/viewTasks.vue';

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
        filterList, selectOrganizationUser, viewTasks
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
                })
                vm.loading = false;
            })
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        changePageSize(value){
            this.pageSize=value;
            this.loadPage(1, this.pageSize);
        },
        add() {
            this.$router.push('newPaymentRequestForm');
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
            if (row.processStatus) {
                return {background: "#e1ffe0"};
            }
            if (row.processId > 0 && !row.processStatus) {
                return {background: "#fcf5d1"};
            }
            return null;
        },
        getItemRowCss(row) {
            if (parseFloat(row.settlement) === parseFloat(row.cost) * parseFloat(row.wareNum)) {
                return {background: "#e1ffe0"};
            }
            return null;
        },
        removeObj() {
            let vm = this;
            this.confirm("删除申请单,确认吗?", function () {
                vm.getData("paymentRequestForm/delete", {id: vm.obj.id}, function (data) {
                    vm.obj = {};
                    vm.msg('操作成功');
                    vm.loadPage(vm.pageNumber, vm.pageSize);
                })
            })
        },
        view() {
            this.$refs.viewTasksDlg.open();
            this.$refs.viewTasksCom.loadList();
        },
        cancel() {
            let vm = this;
            this.confirm("撤销流程,确认吗?", function () {
                vm.getData("paymentRequestForm/cancelProcess", {id: vm.obj.id}, function (data) {
                    vm.msg('流程已撤销成功');
                    vm.obj = {};
                    vm.loadPage(vm.pageNumber, vm.pageSize);
                })
            })
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
