<template>
    <Dialog ref="selectCommodityDlg" closed :draggable="true" :resizable="true" bodyCls="f-column"
            :title="'选择商品'"
            :dialogStyle="{width:'60vW',height:'60vH'}"
            :modal="true">
        <Panel :bodyStyle="{padding:'8px'}" :border="false">
              <div class="pull-right">
                <filterList @filterLoad="filter"></filterList>
            </div>
        </Panel>
        <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                  class="f-full"
                  :columnResizing="true"
                  :lazy="true"
                  :total="total"
                  selectionMode="single"
                  :loading="loading"
                  @selectionChange="selectItem($event)"
                  :pageNumber="pageNumber"
                  :pageSize="pageSize"
                  @pageChange="onPageChange($event)"
                  :pagination="true"
                  :pagePosition="'bottom'">

            <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30" :frozen="true">
                <template slot="body" slot-scope="scope">
                    {{scope.rowIndex + 1}}
                </template>
            </GridColumn>
            <GridColumn field='wareid' title='商品编号' width="120" align="center" :frozen="true"></GridColumn>
            <GridColumn field='name' title='商品名称' width="120" align="center"></GridColumn>
            <GridColumn field='supplierWarehouseName' title='仓库名称' width="120" align="center"></GridColumn>
            <GridColumn field='logisticsTypeName' title='物流类型' width="120" align="center"></GridColumn>
            <GridColumn field='cid1' title='第一分类ID' width="120" align="center"></GridColumn>
            <GridColumn field='brand_id' title='品牌ID' width="120" align="center"></GridColumn>
            <GridColumn field='zh_brand' title='中文品牌' width="120" align="center"></GridColumn>
            <GridColumn field='en_brand' title='英文品牌' width="120" align="center"></GridColumn>
            <GridColumn field='model' title='商品型号' width="120" align="center"></GridColumn>
            <GridColumn field='original_place' title='产地' width="120" align="center"></GridColumn>
            <GridColumn field='warranty' title='质保' width="120" align="center"></GridColumn>
            <GridColumn field='saler_code' title='销售员简码' width="120" align="center"></GridColumn>
            <GridColumn field='purchaser_code' title='采购员简码' width="120" align="center"></GridColumn>
            <GridColumn field='pack_type' title='特殊属性' width="120" align="center"></GridColumn>
            <GridColumn field='sku_unit' title='销售单位' width="120" align="center"></GridColumn>
            <GridColumn field='pkg_info' title='包装清单' width="120" align="center"></GridColumn>
            <GridColumn field='market_price' title='市场价' width="120" align="right"></GridColumn>
            <GridColumn field='purchase_price' title='采购价' width="120" align="right"></GridColumn>
            <GridColumn field='member_price' title='京东价' width="120" align="right"></GridColumn>
            <GridColumn field='sale_state_name' title='上柜' width="40" align="center"></GridColumn>
        </DataGrid>

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
    },
    components: {
        filterList
    },
    methods: {
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            if (this.notWarehouse) {
                this.supplierWarehouseId = 0;
            }
            this.loading = true;
            let vm = this;
            this.$root.getData("commodity/getAllQueryList", {
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
    }
}
</script>
