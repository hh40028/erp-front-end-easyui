<template>
    <Dialog ref="selectCommodityDlg" closed :draggable="true" :resizable="true" bodyCls="f-column"
            :title="'选择商品'"
            :dialogStyle="{width:'60vW',height:'60vH'}"
            :modal="true">
        <Panel :bodyStyle="{padding:'8px'}" :border="false">
            <div class="pull-right">
                <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>
            </div>
        </Panel>

        <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                  class="f-full"
                  :columnResizing="true"
                  :lazy="true"
                  :total="total"
                  @sortChange="sort($event)"
                  selectionMode="single"
                  :loading="loading"
                  @selectionChange="selectItem($event)"
                  :pageNumber="pageNumber"
                  :pageSize="pageSize"
                  @pageChange="onPageChange($event)"
                  :pagination="true"
                  :pagePosition="'bottom'">
            <GridColumn align="center" cellCss="datagrid-td-rownumber" width="50">
                <template slot="body" slot-scope="scope">
                    {{ scope.rowIndex + 1 }}
                </template>
            </GridColumn>
            <GridColumn field="status" :width="50" align="center">
                <template slot="header" slot-scope="scope">
                    <input type="checkbox" v-model="allSelected"
                           @click="all">
                </template>
                <template slot="body" slot-scope="scope">
                    <input type="checkbox" v-model="scope.row.selected">
                </template>
            </GridColumn>
            <GridColumn field='username' title='负责人' width="80" align="center" :sortable="true"></GridColumn>
            <GridColumn field='wareId' title='SKU编号' width="120" align="center"></GridColumn>
            <GridColumn field='name' title='商品名称' width="420" align="left"></GridColumn>
            <GridColumn field='brandName' title='品牌名称' width="120" align="left" :sortable="true"></GridColumn>
            <GridColumn field='oneTypeName' title='一级分类' width="120" align="center" :sortable="true"></GridColumn>
            <GridColumn field='twoTypeName' title='二级分类' width="120" align="center" :sortable="true"></GridColumn>
            <GridColumn field='threeTypeName' title='三级分类' width="120" align="center" :sortable="true"></GridColumn>
            <GridColumn field='model' title='型号' width="120" align="left"></GridColumn>
            <GridColumn field='originalPlace' title='产地' width="120" align="center"></GridColumn>
            <GridColumn field='skuUnit' title='销售单位' width="80" align="center"></GridColumn>
            <GridColumn field='packType' title='特殊属性' width="120" align="center" :sortable="true">
                <template slot="body" slot-scope="scope">
                    {{ getPackTypeName(scope.row.packType) }}
                </template>
            </GridColumn>
            <GridColumn field='pkgInfo' title='包装清单' width="120" align="left"></GridColumn>
            <GridColumn field='warranty' title='质保' width="120" align="center" :sortable="true"></GridColumn>
            <GridColumn field='shelfLife' title='保质期(天)' width="120" align="center" :sortable="true"></GridColumn>
            <GridColumn field='zhBrand' title='中文品牌' width="120" align="center" :sortable="true"></GridColumn>
            <GridColumn field='enBrand' title='英文品牌' width="120" align="center" :sortable="true"></GridColumn>
            <GridColumn field='webSite' title='官网' width="120" align="center"></GridColumn>
            <GridColumn field='tel' title='服务电话' width="120" align="center"></GridColumn>
            <GridColumn field='length' title='长' width="120" align="center"></GridColumn>
            <GridColumn field='width' title='宽' width="120" align="center"></GridColumn>
            <GridColumn field='height' title='高' width="120" align="center"></GridColumn>
            <GridColumn field='weight' title='重量(kg)' width="120" align="center"></GridColumn>
            <GridColumn title='市场价' width="100" align="right">
                <template slot="body" slot-scope="scope">
                    {{ toMoney(scope.row.marketPrice, '') }}
                </template>
            </GridColumn>
            <GridColumn title='采购价' width="100" align="right">
                <template slot="body" slot-scope="scope">
                    {{ toMoney(scope.row.purchasePrice, '') }}
                </template>
            </GridColumn>
            <GridColumn title='京东价' width="100" align="right">
                <template slot="body" slot-scope="scope">
                    {{ toMoney(scope.row.memberPrice, '') }}
                </template>
            </GridColumn>
            <GridColumn field='salerCode' title='销售员简码' width="120" align="center" :sortable="true"></GridColumn>
            <GridColumn field='salerName' title='销售员名称' width="120" align="center"></GridColumn>
            <GridColumn field='purchaserCode' title='采购员简码' width="120" align="center" :sortable="true"></GridColumn>
            <GridColumn field='purchaserName' title='采购员名称' width="120" align="center"></GridColumn>
            <GridColumn field='vendorCode' title='供应商简码' width="120" align="center" :sortable="true"></GridColumn>
            <GridColumn field='vendorName' title='供应商名称' width="120" align="center"></GridColumn>
            <GridColumn field='fullCategoryName1' title='第一分类全路径名称' width="120" align="center"></GridColumn>
            <GridColumn field='wreadme' title='规格参数' width="120" align="center"></GridColumn>
            <GridColumn field='modifyTime' title='更改时间' width="120" align="center" :sortable="true"></GridColumn>
            <GridColumn field='issn' title='是否序列号管理' width="120" align="center" :sortable="true">
                <template slot="body" slot-scope="scope">
                    {{ scope.row.issn === 1 ? "是" : "否" }}
                </template>
            </GridColumn>
            <GridColumn field='service' title='服务' width="120" align="center"></GridColumn>
            <GridColumn field='salesRatio' title='销售比例' width="120" align="center"></GridColumn>
            <GridColumn field='aftersales' title='售后' width="120" align="center"></GridColumn>
            <GridColumn field='catalogerCode' title='上柜员简码' width="120" align="center"></GridColumn>
            <GridColumn field='catalogerName' title='上柜员姓名' width="120" align="center"></GridColumn>
            <GridColumn field='salerDeptName' title='采销岗名称' width="120" align="center"></GridColumn>
            <GridColumn field='stores' title='库房信息' width="120" align="center"></GridColumn>
            <GridColumn field='itemNum' title='货号' width="120" align="center"></GridColumn>
            <GridColumn field='dangerGoods' title='是否危险品' width="120" align="center" :sortable="true">
                <template slot="body" slot-scope="scope">
                    {{ scope.row.dangerGoods === 1 ? "是" : "否" }}
                </template>
            </GridColumn>
            <GridColumn field='afterSaleDesc' title='售后保障' width="120" align="center"></GridColumn>
            <GridColumn field='storeProperty' title='冷链标记' width="120" align="center" :sortable="true">
                <template slot="body" slot-scope="scope">
                    {{ getLlbz(scope.row.storeProperty) }}
                </template>
            </GridColumn>
            <GridColumn field='designConcept' title='设计理念' width="120" align="center"></GridColumn>
            <GridColumn field='sysp' title='试用品' width="80" align="center" :sortable="true">
                <template slot="body" slot-scope="scope">
                    {{ scope.row.sysp === 1 ? "是" : "否" }}
                </template>
            </GridColumn>
            <GridColumn field='giftsGoods' title='赠品' width="120" align="center" :sortable="true">
                <template slot="body" slot-scope="scope">
                    <span v-if="scope.row.giftsGoods===1">是,不可销售</span>
                    <span v-if="scope.row.giftsGoods===2">是,可销售</span>
                    <span v-if="scope.row.giftsGoods===0">否</span>
                </template>
            </GridColumn>
        </DataGrid>




<!--        <DataGrid :data="data" style="width:100%;height:250px" :border="false"-->
<!--                  class="f-full"-->
<!--                  :columnResizing="true"-->
<!--                  :lazy="true"-->
<!--                  :total="total"-->
<!--                  selectionMode="single"-->
<!--                  :loading="loading"-->
<!--                  @selectionChange="selectItem($event)"-->
<!--                  :pageNumber="pageNumber"-->
<!--                  :pageSize="pageSize"-->
<!--                  @pageChange="onPageChange($event)"-->
<!--                  :pagination="true"-->
<!--                  :pagePosition="'bottom'">-->

<!--            <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30" :frozen="true">-->
<!--                <template slot="body" slot-scope="scope">-->
<!--                    {{ scope.rowIndex + 1 }}-->
<!--                </template>-->
<!--            </GridColumn>-->
<!--            <GridColumn field='wareid' title='商品编号' width="120" align="center" :frozen="true"></GridColumn>-->
<!--            <GridColumn field='name' title='商品名称' width="120" align="center"></GridColumn>-->
<!--&lt;!&ndash;            <GridColumn field='supplierWarehouseName' title='仓库名称' width="120" align="center"></GridColumn>&ndash;&gt;-->
<!--&lt;!&ndash;            <GridColumn field='logisticsTypeName' title='物流类型' width="120" align="center"></GridColumn>&ndash;&gt;-->
<!--            <GridColumn field='cid1' title='第一分类ID' width="120" align="center"></GridColumn>-->
<!--            <GridColumn field='brand_id' title='品牌ID' width="120" align="center"></GridColumn>-->
<!--            <GridColumn field='zh_brand' title='中文品牌' width="120" align="center"></GridColumn>-->
<!--            <GridColumn field='en_brand' title='英文品牌' width="120" align="center"></GridColumn>-->
<!--            <GridColumn field='model' title='商品型号' width="120" align="center"></GridColumn>-->
<!--            <GridColumn field='original_place' title='产地' width="120" align="center"></GridColumn>-->
<!--            <GridColumn field='warranty' title='质保' width="120" align="center"></GridColumn>-->
<!--            <GridColumn field='saler_code' title='销售员简码' width="120" align="center"></GridColumn>-->
<!--            <GridColumn field='purchaser_code' title='采购员简码' width="120" align="center"></GridColumn>-->
<!--            <GridColumn field='pack_type' title='特殊属性' width="120" align="center"></GridColumn>-->
<!--            <GridColumn field='sku_unit' title='销售单位' width="120" align="center"></GridColumn>-->
<!--            <GridColumn field='pkg_info' title='包装清单' width="120" align="center"></GridColumn>-->
<!--            <GridColumn field='market_price' title='市场价' width="120" align="right"></GridColumn>-->
<!--            <GridColumn field='purchase_price' title='采购价' width="120" align="right"></GridColumn>-->
<!--            <GridColumn field='member_price' title='京东价' width="120" align="right"></GridColumn>-->
<!--            <GridColumn field='sale_state_name' title='上柜' width="40" align="center"></GridColumn>-->
<!--        </DataGrid>-->

    </Dialog>
</template>

<script>
import filterList from "@/components/filterList";

export default {
    name: "app",
    data() {
        return {
            total: 0,
            pageSize: 15,
            pageNumber: 1,
            data: [],
            loading: false,
            timeout: null,
        }
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
    },
    components: {
        filterList
    },
    methods: {
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
            if (this.notWarehouse) {
                this.supplierWarehouseId = 0;
            }
            this.loading = true;
            let vm = this;
            this.$root.getData("commoditynew/getQueryList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: "id",
                direction: "asc",
                filterString: this.filterString,
                userid:0
            }, function (data) {
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.data.push(e);
                })
                vm.loading = false;
            })
        },
        selectItem(obj) {
            this.$emit('selectCommodity', obj);
        },
        open() {
            this.loadPage(this.pageNumber, this.pageSize);
            this.$refs.selectCommodityDlg.open();
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        changePageSize(value){
            this.pageSize=value;
            this.loadPage(1, this.pageSize);
        },
    }
}
</script>
