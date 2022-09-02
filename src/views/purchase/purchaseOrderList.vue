<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <ButtonGroup selectionMode="single">
                    <LinkButton :selected="settlement===0" @click="changeSettlement(0)">全部</LinkButton>
                    <LinkButton :selected="settlement===1" @click="changeSettlement(1)">未结算</LinkButton>
                    <LinkButton :selected="settlement===2" @click="changeSettlement(2)">已结算</LinkButton>
                </ButtonGroup>
                <ButtonGroup selectionMode="single" style="margin-left: 20px">
                    <LinkButton :selected="deliveryStatus===0" @click="changeDeliveryStatus(0)">全部</LinkButton>
                    <LinkButton :selected="deliveryStatus===1" @click="changeDeliveryStatus(1)">未发货</LinkButton>
                    <LinkButton :selected="deliveryStatus===2" @click="changeDeliveryStatus(2)">已发货</LinkButton>
                </ButtonGroup>

                <TextBox placeholder="筛选供应商..." v-model="supplierName" style="width:350px;margin-left: 30px" @focus="openDlg">
                    <Addon align="left">
                        <LinkButton :btnStyle="{borderRadius:0,borderWidth:'0 1px 0 0',width:'60px',height:'30px'}">供应商</LinkButton>
                    </Addon>
                    <Addon>
                        <span class="textbox-icon icon-clear" v-if="supplierName" @click="clearSupplier"></span>
                    </Addon>
                </TextBox>
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
                      :loading="loading"
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
                <GridColumn title='结算' width="40" align="center">
                    <template slot="body" slot-scope="scope">
                        <span style="color: green" v-if="scope.row.settlementOrderId>0">已结</span>
                    </template>
                </GridColumn>
                <GridColumn title='发货' width="40" align="center">
                    <template slot="body" slot-scope="scope">
                        <span style="color: green" v-if="scope.row.deliveryTime">已发</span>
                    </template>
                </GridColumn>
                <GridColumn title='平台' width="40" align="center">
                    <template slot="body" slot-scope="scope">
                        <img v-if="!scope.row.offlineOrder" src="../../assets/images/jd.jpg" style="height: 16px;line-height: 32px;border-radius: 3px">
                    </template>
                </GridColumn>
                <GridColumn field='orderNumber' title='单据编号' width="140" align="center"></GridColumn>
                <GridColumn field='supplierName' title='供应商' width="120" align="left"></GridColumn>
                <GridColumn field='customOrderId' title='订单编号' width="150" align="center"></GridColumn>
                <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                <GridColumn field='commodityName' title='商品名称' width="120" align="left"></GridColumn>
                <GridColumn field='wareNum' title='数量' width="50" align="center"></GridColumn>
                <GridColumn field="cost" title='单价' width="80" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.cost, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='合计金额' width="80" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.cost * scope.row.wareNum, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='结算金额' width="80" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.settlement, '') }}
                    </template>
                </GridColumn>
                <GridColumn field='submitTime' title='递交时间' width="150" align="center"></GridColumn>
                <GridColumn field='consigneeName' title='收货人' width="120" align="center"></GridColumn>
                <GridColumn field='phone' title='手机号码' width="120" align="center"></GridColumn>
                <GridColumn field='address' title='收货地址' width="120" align="left"></GridColumn>
                <GridColumn field='logisticsCompanyName' title='物流公司' width="120" align="center"></GridColumn>
                <GridColumn field='logisticsNumber' title='物流单号' width="120" align="center"></GridColumn>
                <GridColumn field='shippingTime' title='发货时间' width="150" align="center"></GridColumn>
                <GridColumn field='estimatedArrivalDate' title='预计到达日期' width="120" align="center"></GridColumn>
            </DataGrid>
        </LayoutPanel>
        <Dialog ref="selectSupplierDlg" closed
                :title="'选择供应商'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'50%',height:'60%'}"
                :modal="true">
            <selectSupplier @selectSupplier="selectSupplier" :hide-add="true"></selectSupplier>
        </Dialog>
    </Layout>
</template>

<script>
import filterList from '@/components/filterList.vue';
import selectSupplier from '@/components/selectSupplier.vue';

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
            filterString: '',
            logisticsCompanyGroup: [],
            allSelected: false,
            deliveryStatus: 0,
            settlement: 0,
            supplierid: 0,
            supplierName: ''
        }
    },
    components: {
        filterList, selectSupplier
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
    },
    methods: {
        changeSettlement(s) {
            this.total = 0;
            this.pageNumber = 1;
            this.settlement = s;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        changeDeliveryStatus(s) {
            this.total = 0;
            this.pageNumber = 1;
            this.deliveryStatus = s;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
            this.loading = true;
            let vm = this;
            this.$root.getData("orderFormItem/getPurchaseList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: "id",
                direction: "desc",
                filterString: this.filterString,
                supplierid: this.supplierid,
                settlementStatus: this.settlement,
                deliveryStatus: this.deliveryStatus
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
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        changePageSize(value) {
            this.pageSize = value;
            this.loadPage(1, this.pageSize);
        },
        openDlg() {
            this.$refs.selectSupplierDlg.open();
        },
        selectSupplier(obj) {
            this.$refs.selectSupplierDlg.close();
            this.supplierid = obj.id;
            this.supplierName = obj.name;
            this.loadPage(1, this.pageSize);
        },
        clearSupplier() {
            this.supplierid = 0;
            this.supplierName = '';
            this.loadPage(1, this.pageSize);
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
