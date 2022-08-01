<template>
    <DataGrid :data="data" style="width:100%;height:250px" :border="false"
              class="f-full"
              :columnResizing="true"
              :lazy="true"
              :total="total"
              selectionMode="single"
              :loading="loading"
              @selectionChange="selectRow($event)"
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
        <GridColumn field='wareid' title='商品编号' width="140" align="center"></GridColumn>
        <GridColumn field='name' title='商品名称' width="220" align="center"></GridColumn>
        <GridColumn field='zh_brand' title='品牌名称' width="140" align="center"></GridColumn>
        <GridColumn field='model' title='规格型号' width="140" align="center"></GridColumn>
        <GridColumn field='unit' title='商品单位' width="100" align="center"></GridColumn>
        <GridColumn title='商品数量' width="100" align="right">
            <template slot="body" slot-scope="scope">
                {{ toMoney(scope.row.totalcount, '') }}
            </template>
        </GridColumn>
        <GridColumn title='商品单价' width="120" align="right">
            <template slot="body" slot-scope="scope">
                {{ toMoney(scope.row.totalAmount/scope.row.totalcount, '') }}
            </template>
        </GridColumn>
        <GridColumn field="totalAmount" title='合计金额' width="120" align="right">
            <template slot="body" slot-scope="scope">
                {{ toMoney(scope.row.totalAmount, '') }}
            </template>
        </GridColumn>
    </DataGrid>
</template>

<script>
export default {
    props:{
        warehouseid:{
            type:Number,
            default:0
        }
    },
    name: "app",
    data() {
        return {
            total: 0,
            pageSize: 15,
            pageNumber: 1,
            loading: false,
            timeout: null,
            filterString: '',
            data: []
        }
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
            this.$root.getData("stock/getQueryList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: "id",
                direction: "desc",
                filterString: this.filterString,
                warehouseId:this.warehouseid
            }, function (data) {
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.data.push(e);
                })
                vm.loading = false;
            })
        },
        selectRow(obj) {
            this.$emit('selectStockCommodity', obj);
        }
    }
}
</script>

<style scoped>

</style>
