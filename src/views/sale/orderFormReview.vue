<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <div class="pull-right">
                    <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">

            <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                      class="f-full"
                      :rowCss="getRowCss"
                      :columnResizing="true"
                      :lazy="true"
                      :total="total"
                      selectionMode="single"
                      :loading="loading"
                      @selectionChange="selectObj($event)"
                      @sortChange="sort($event)"
                      :pageNumber="pageNumber"
                      :pageSize="pageSize"
                      @pageChange="onPageChange($event)"
                      :pagination="true"
                      :pagePosition="'bottom'">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30" :frozen="true">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field='customOrderId' title='订单编号' width="120" align="center" :frozen="true" :sortable="true"></GridColumn>
                <GridColumn field='operatorStateName' title='操作状态' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='orderStateName' title='订单状态' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='pin' title='下单账号' width="120" align="left"></GridColumn>
                <GridColumn title='支付金额' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.pay, '') }}
                    </template>
                </GridColumn>
                <GridColumn field='commodityNum' title='商品数量' width="120" align="center"></GridColumn>
                <GridColumn title='京东价' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.jdPrice, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='优惠价' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.discount, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='优惠金额' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.reduceCount, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='总运费' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.totalCarriage, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='采购价' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.cost, '') }}
                    </template>
                </GridColumn>
                <GridColumn field='consigneeName' title='收货人姓名' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='postcode' title='邮编' width="120" align="center"></GridColumn>
                <GridColumn field='expectedDeliveryTime' title='期望送货时间' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='telephone' title='固定电话' width="120" align="center"></GridColumn>
                <GridColumn field='phone' title='手机号码' width="120" align="center"></GridColumn>
                <GridColumn field='email' title='电子邮件' width="120" align="center"></GridColumn>
                <GridColumn field='address' title='收货地址' width="320" align="left"></GridColumn>
                <GridColumn field='orderRemark' title='订单备注' width="120" align="center"></GridColumn>
                <GridColumn field='orderCreateDate' title='订购日期/订单生成时间' width="160" align="center" :sortable="true"></GridColumn>
                <GridColumn field='sendPay' title='订单标识' width="120" align="center"></GridColumn>
                <GridColumn field='paymentCategoryDispName' title='支付分类名称' width="120" align="center"></GridColumn>
                <GridColumn field='createDate' title='创建时间' width="160" align="center" :sortable="true"></GridColumn>
                <GridColumn field='refundSourceFlag' title='退款标识' width="120" align="center"></GridColumn>
                <GridColumn field='provinceName' title='省份名称' width="120" align="center"></GridColumn>
                <GridColumn field='cityName' title='市名称' width="120" align="center"></GridColumn>
                <GridColumn field='countyName' title='县名称' width="120" align="center"></GridColumn>
                <GridColumn field='townName' title='镇名称' width="120" align="center"></GridColumn>
                <GridColumn field='vendorStoreName' title='商家仓名称' width="120" align="center"></GridColumn>
                <GridColumn field='updateDate' title='更新时间' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='open_id_buyer' title='下单账号' width="120" align="center"></GridColumn>
                <GridColumn field='xid_buyer' title='下单账号2' width="120" align="center"></GridColumn>
                <GridColumn field='allocateTime' title='分配时间' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='finish' title='完成状态' width="120" align="center"></GridColumn>
                <GridColumn field='finishTime' title='完成时间' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='orgName' title='负责机构' width="120" align="center"></GridColumn>
                <GridColumn field='principalName' title='负责专员' width="120" align="center"></GridColumn>
                <GridColumn field='memoByVendor' title='厂商备注' width="120" align="center"></GridColumn>
            </DataGrid>
        </LayoutPanel>
        <LayoutPanel region="south" style="height:30%;" bodyCls="f-column" :border="false">
            <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
                <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
                    <Tabs :plain="false" :narrow="false" :justified="false" style="height:100%" bodyCls="f-column">
                        <TabPanel :title="'货品列表'" bodyCls="f-column">
                            <Panel class="f-full" :border="false" bodyCls="f-column">
                                <DataGrid :data="items" :border="false"
                                          :columnResizing="true"
                                          class="f-full">
                                    <GridColumn title="图片" align="center" width="40">
                                        <template slot="body" slot-scope="scope">
                                            <div @click="viewImg(scope.row)">
                                                <img :src="'https://img11.360buyimg.com/n1/'+scope.row.imgPath" style="height: 24px;">
                                            </div>
                                        </template>
                                    </GridColumn>
                                    <GridColumn field='number' title='单据编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='upc' title='商品UPC编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='wareName' title='商品名称' width="120" align="left"></GridColumn>
                                    <GridColumn field='wareNum' title='商品数量' width="120" align="center"></GridColumn>
                                    <GridColumn title='京东价' width="100" align="right">
                                        <template slot="body" slot-scope="scope">
                                            {{ toMoney(scope.row.jdPrice, '') }}
                                        </template>
                                    </GridColumn>
                                    <GridColumn title='售价' width="100" align="right">
                                        <template slot="body" slot-scope="scope">
                                            {{ toMoney(scope.row.cost, '') }}
                                        </template>
                                    </GridColumn>
                                    <GridColumn field='purchasePrice' title='采购价' width="120" align="center" :editable="true"></GridColumn>
                                    <GridColumn field='supplierName' title='供应商' width="120" align="center"></GridColumn>
                                    <GridColumn field='logisticsCompanyName' title='物流公司' width="120" align="center"></GridColumn>
                                    <GridColumn field='logisticsNumber' title='物流单号' width="120" align="center"></GridColumn>
                                    <GridColumn field='deliveryTime' title='发货时间' width="120" align="center"></GridColumn>
                                    <GridColumn field='poId' title='采购单号' width="120" align="center"></GridColumn>
                                    <GridColumn field='roId' title='退货单号' width="120" align="center"></GridColumn>
                                </DataGrid>
                            </Panel>
                        </TabPanel>
                        <TabPanel :title="'原单货品列表'" bodyCls="f-column">
                            <Panel class="f-full" :border="false" bodyCls="f-column">
                                <DataGrid :data="items2" :border="false"
                                          :columnResizing="true"
                                          class="f-full">
                                    <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='upc' title='商品UPC编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='wareName' title='商品名称' width="120" align="center"></GridColumn>
                                    <GridColumn field='wareNum' title='商品数量' width="120" align="center"></GridColumn>
                                    <GridColumn field='jdPrice' title='京东价' width="120" align="center"></GridColumn>
                                    <GridColumn field='discount' title='优惠价' width="120" align="center"></GridColumn>
                                    <GridColumn field='cost' title='采购价' width="120" align="center"></GridColumn>
                                    <GridColumn field='pold' title='采购单号' width="120" align="center"></GridColumn>
                                    <GridColumn field='rold' title='退货单号' width="120" align="center"></GridColumn>
                                    <GridColumn field='supplierName' title='供应商' width="120" align="center"></GridColumn>
                                </DataGrid>
                            </Panel>
                        </TabPanel>
                        <TabPanel :title="'订单详情'">
                            <table style="width: 100%" class="table">
                                <tbody>
                                <tr>
                                    <th class="text-right th">订单编号</th>
                                    <td class="text-left td">{{ obj.customOrderId }}</td>
                                    <th class="text-right th">支付金额</th>
                                    <td class="text-left td">{{ obj.pay }}</td>
                                    <th class="text-right th">操作状态</th>
                                    <td class="text-left td">{{ obj.operatorState }}</td>
                                    <th class="text-right th">订单状态</th>
                                    <td class="text-left td">{{ obj.orderState }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">收货人姓名</th>
                                    <td class="text-left td">{{ obj.consigneeName }}</td>
                                    <th class="text-right th">邮编</th>
                                    <td class="text-left td">{{ obj.postcode }}</td>
                                    <th class="text-right th">期望送货时间</th>
                                    <td class="text-left td">{{ obj.expectedDeliveryTime }}</td>
                                    <th class="text-right th">固定电话</th>
                                    <td class="text-left td">{{ obj.telephone }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">手机号码</th>
                                    <td class="text-left td">{{ obj.phone }}</td>
                                    <th class="text-right th">电子邮件</th>
                                    <td class="text-left td">{{ obj.email }}</td>
                                    <th class="text-right th">收货地址</th>
                                    <td class="text-left td">{{ obj.address }}</td>
                                    <th class="text-right th">订单备注</th>
                                    <td class="text-left td">{{ obj.orderRemark }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">订购日期/订单生成时间</th>
                                    <td class="text-left td">{{ obj.orderCreateDate }}</td>
                                    <th class="text-right th">订单标识</th>
                                    <td class="text-left td">{{ obj.sendPay }}</td>
                                    <th class="text-right th">支付分类</th>
                                    <td class="text-left td">{{ obj.paymentCategory }}</td>
                                    <th class="text-right th">支付分类名称</th>
                                    <td class="text-left td">{{ obj.paymentCategoryDispName }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">创建日期</th>
                                    <td class="text-left td">{{ obj.createDate }}</td>
                                    <th class="text-right th">下单账号</th>
                                    <td class="text-left td">{{ obj.pin }}</td>
                                    <th class="text-right th">退款标识</th>
                                    <td class="text-left td">{{ obj.refundSourceFlag }}</td>
                                    <th class="text-right th">省份id</th>
                                    <td class="text-left td">{{ obj.provinceId }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">省份名称</th>
                                    <td class="text-left td">{{ obj.provinceName }}</td>
                                    <th class="text-right th">市id</th>
                                    <td class="text-left td">{{ obj.cityId }}</td>
                                    <th class="text-right th">市名称</th>
                                    <td class="text-left td">{{ obj.cityName }}</td>
                                    <th class="text-right th">县id</th>
                                    <td class="text-left td">{{ obj.countyId }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">县名称</th>
                                    <td class="text-left td">{{ obj.countyName }}</td>
                                    <th class="text-right th">镇id</th>
                                    <td class="text-left td">{{ obj.townId }}</td>
                                    <th class="text-right th">镇名称</th>
                                    <td class="text-left td">{{ obj.townName }}</td>
                                    <th class="text-right th">厂商备注</th>
                                    <td class="text-left td">{{ obj.memoByVendor }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">父单号</th>
                                    <td class="text-left td">{{ obj.parentOrderId }}</td>
                                    <th class="text-right th">商品数量</th>
                                    <td class="text-left td">{{ obj.commodityNum }}</td>
                                    <th class="text-right th">京东价</th>
                                    <td class="text-left td">{{ obj.jdPrice }}</td>
                                    <th class="text-right th">优惠价</th>
                                    <td class="text-left td">{{ obj.discount }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">优惠金额</th>
                                    <td class="text-left td">{{ obj.reduceCount }}</td>
                                    <th class="text-right th">总运费</th>
                                    <td class="text-left td">{{ obj.totalCarriage }}</td>
                                    <th class="text-right th">采购价</th>
                                    <td class="text-left td">{{ obj.cost }}</td>
                                    <th class="text-right th">商家仓id</th>
                                    <td class="text-left td">{{ obj.vendorStoreId }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">商家仓名称</th>
                                    <td class="text-left td">{{ obj.vendorStoreName }}</td>
                                    <th class="text-right th">更新时间</th>
                                    <td class="text-left td">{{ obj.updateDate }}</td>
                                    <th class="text-right th">下单账号</th>
                                    <td class="text-left td">{{ obj.open_id_buyer }}</td>
                                    <th class="text-right th">下单账号2</th>
                                    <td class="text-left td">{{ obj.xid_buyer }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">订单负责人</th>
                                    <td class="text-left td">{{ obj.principal }}</td>
                                    <th class="text-right th">分配时间</th>
                                    <td class="text-left td">{{ obj.allocateTime }}</td>
                                    <th class="text-right th">错误信息</th>
                                    <td class="text-left td">{{ obj.errorMessge }}</td>
                                    <th class="text-right th">换货状态</th>
                                    <td class="text-left td">{{ obj.changeCommodityStarus }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">完成状态</th>
                                    <td class="text-left td">{{ obj.finish }}</td>
                                    <th class="text-right th">完成时间</th>
                                    <td class="text-left td">{{ obj.finishTime }}</td>
                                    <th class="text-right th">完成用户编号</th>
                                    <td class="text-left td">{{ obj.finishUserid }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </TabPanel>
                        <TabPanel :title="'原始订单'">
                            <Panel class="f-full" :border="false">
                            </Panel>
                        </TabPanel>
                        <TabPanel :title="'订单日志'">
                            <Panel class="f-full" :border="false">
                                <DataGrid :data="logs" :border="false"
                                          :columnResizing="true"
                                          class="f-full">
                                    <GridColumn field='username' title='操作人' width="60" align="center"></GridColumn>
                                    <GridColumn field='operateTime' title='操作时间' :sortable="true" width="220" align="center"></GridColumn>
                                    <GridColumn field='operate' title='操作信息' align="left"></GridColumn>
                                </DataGrid>
                            </Panel>
                        </TabPanel>
                    </Tabs>
                </LayoutPanel>

            </Layout>


        </LayoutPanel>

        <Dialog ref="viewImgDlg" closed
                :title="'商品图片'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'60%',height:'90%'}"
                :modal="true">
            <viewImgs ref="viewImgs" :wareid="itemObj.sku"></viewImgs>
        </Dialog>
    </Layout>
</template>

<script>
import filterList from '@/components/filterList.vue';
import viewImgs from '@/components/viewImgs.vue';

export default {
    name: "app",
    data() {
        return {
            total: 0,
            pageSize: 15,
            pageNumber: 1,
            data: [],
            items: [],
            loading: false,
            obj: {},
            viewObj: [],
            suppliers: [],
            units: [],
            types: [],
            sources: [],
            timeout: null,
            commoditySupplier: [],
            csObj: {},
            allSelected: false,
            logs: [],
            itemObj: {},
            changeItems: [],
            commoditySupplierList: [],
            addCommodityObj: {},
            items2: [],
            field: 'id',
            order: 'desc'
        }
    },
    components: {
        filterList, viewImgs
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
        this.loadSuppliers();
    },
    methods: {
        sort(obj) {
            if (obj.length > 0) {
                this.field = obj[0].field;
                this.order = obj[0].order;
                this.loadPage(this.pageNumber, this.pageSize);
            }
        },
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
            this.loading = true;
            let vm = this;
            this.$root.getData("orderForm/getQueryFinishList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: this.field,
                direction: this.order,
                filterString: this.filterString
            }, function (data) {
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.data.push(e);
                    vm.$set(e, 'selected', false);
                })
                vm.loading = false;
            })
        },
        selectObj(obj) {
            console.log(obj);
            this.obj = this.clone(obj);
            this.items = [];
            this.loadItems();
            this.loadLogs();
        },
        loadLogs() {
            let vm = this;
            this.getData("orderLog/getList", {orderFormId: this.obj.id}, function (data) {
                vm.logs = data;
            })
        },
        loadItems() {
            let vm = this;
            this.getData("orderFormItem/getList", {orderFormId: this.obj.id}, function (data) {
                vm.items = data.items;
                vm.items2 = data.items2;
                console.log(data);
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
        getRowCss(row) {
            if (row.changeCommodityStarus) {
                return {background: "#fbfea2"};
            }
            return null;
        },
        viewImg(obj) {
            this.$refs.viewImgDlg.open();
        }
    }
}
</script>

<style scoped>
.b-red {
    border: 1px solid #F44336
    /*background-color: #ff9992*/
}

.b-m-1 {

    border-bottom: 1px solid #d2d2d2
}

.th {
    border: 1px solid #ddd;
    width: 12.5%;
    padding: 3px;
}

.td {
    border: 1px solid #ddd;
    width: 12.5%;
    padding: 3px;
}
</style>
