<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <select v-model="warehouseId" style="width: 200px" class="form-control" @change="loadPage(pageNumber,pageSize)">
                    <option v-for="w in warehouseList" :key="w.id" :value="w.id">{{w.name}}</option>
                </select>
                <div class="pull-right">
                    <filterList @filterLoad="filter"></filterList>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="south">
            <div class="col-12 p-5 text-right">本页合计金额: {{toMoney(pageAmount,'')}}元，库存总计金额: {{toMoney(totalAmount,'')}}元</div>
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
                      @rowExpand="loadItem($event)"
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
                <GridColumn field='name' title='商品名称' width="220" align="left"></GridColumn>
                <GridColumn field='zh_brand' title='品牌名称' width="140" align="center"></GridColumn>
                <GridColumn field='model' title='规格型号' width="140" align="center"></GridColumn>
                <GridColumn field='unit' title='商品单位' width="100" align="center"></GridColumn>
                <GridColumn title='商品数量' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.stockcount, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='商品单价' width="120" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.stockprice, '') }}
                    </template>
                </GridColumn>
                <GridColumn field="totalAmount" title='合计金额' width="120" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.stockprice*scope.row.stockcount, '') }}
                    </template>
                </GridColumn>
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
            filterString: '',
            warehouseList: [],
            warehouseId:0,
            pageAmount:0,
            totalAmount:0
        }
    },
    components: {
        filterList
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
        this.loadWarehouseList();
    },
    methods: {
        loadWarehouseList() {
            let vm = this;
            this.getData("warehouse/getList", {}, function (data) {
                vm.warehouseList = [{id:0,name:'全部仓库'}];
                data.forEach(function (e){
                    if(e.status){
                        vm.warehouseList.push(e);
                    }
                })
            })
        },
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
                warehouseId:this.warehouseId
            }, function (data) {
                vm.total = data.total;
                vm.data = [];
                vm.pageAmount=0
                data.children.forEach(function (e) {
                    vm.pageAmount+=parseFloat(e.stockprice)*parseFloat(e.stockcount);
                    vm.data.push(e);
                })
                vm.totalAmount=data.totalAmount;
                vm.loading = false;
            })
        },
        selectObj(obj) {
            this.obj = this.clone(obj);
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
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
