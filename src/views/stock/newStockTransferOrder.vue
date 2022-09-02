<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'5px'}" bodyCls="f-column" :border="false">
                <template slot="header">
                    <div class="f-row">
                        <div class="f-full" style="line-height:30px">
                            <LinkButton iconCls="icon-save" :plain="true" @click="save">保存单据</LinkButton>
                            <LinkButton iconCls="icon-search" :plain="true" @click="openOutWarehouseCommodity">选择商品</LinkButton>
                        </div>
                    </div>
                </template>
                <div class="row" style="padding-bottom: 20px">
                    <div class="col-3 p-t-15 p-l-15 p-r-15">
                        <label>出货仓库</label><br>
                        <input type="text" v-model="obj.outWarehouseName" class="form-control" readonly @click="openWarehouseDlg('out')">
                    </div>
                    <div class="col-3 p-t-15 p-l-15 p-r-15">
                        <label>入货仓库</label><br>
                        <input type="text" v-model="obj.inWarehouseName" class="form-control" readonly @click="openWarehouseDlg('in')">
                    </div>
                    <div class="col-6 p-t-15 p-l-15 p-r-15">
                        <label>摘要说明</label><br>
                        <input type="text" v-model="obj.remark" class="form-control">
                    </div>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                      class="f-full"
                      :clickToEdit="true"
                      :rowCss="getRowCss"
                      editMode="cell"
                      :columnResizing="true">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn title='删除' width="60" align="center">
                    <template slot="body" slot-scope="scope">
                        <a style="color:red" @click="removeRow(scope.rowIndex)">删除</a>
                    </template>
                </GridColumn>
                <GridColumn field='wareId' title='商品编号' width="160" align="center"></GridColumn>
                <GridColumn field='name' title='商品名称' align="left"></GridColumn>
                <GridColumn field='zh_brand' title='品牌名称' align="center" width="100"></GridColumn>
                <GridColumn field='model' title='规格型号' width="100" align="center"></GridColumn>
                <GridColumn field="sku_unit" title='商品单位' width="80" align="center"></GridColumn>
                <GridColumn field="price" title='出库单价' width="150" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.price, '') }}
                    </template>
                </GridColumn>
                <GridColumn field="stockCount" title='库存数量' width="150" align="center"></GridColumn>
                <GridColumn field="count" title='调拨数量' width="150" align="center" :editable="true"></GridColumn>

            </DataGrid>
        </LayoutPanel>

        <Dialog ref="selectWarehouseDlg" closed
                :title="'选择仓库'"
                :dialogStyle="{width:'400px',height:'400px'}"
                :modal="true"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true">
            <selectWarehouse ref="selectWarehouse" @selectWarehouse="selectWarehouse"></selectWarehouse>
        </Dialog>
        <Dialog ref="selectStockCommodityDlg" closed
                :title="'选择库存商品'"
                :dialogStyle="{width:'60%',height:'60%'}"
                :modal="true"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true">
            <selectStockCommodity ref="selectStockCommodityCom" :warehouseid="obj.outWarehouseId" @selectStockCommodity="selectStockCommodity"></selectStockCommodity>
        </Dialog>
    </Layout>
</template>

<script>
import selectWarehouse from '@/components/selectWarehouse.vue';
import selectStockCommodity from '@/components/selectStockCommodity.vue';

export default {
    name: "app",
    data() {
        return {
            data: [],
            obj: {},
            tag: ''
        }
    },
    created: function () {
    },
    components: {
        selectWarehouse, selectStockCommodity
    },
    methods: {
        save() {
            let vm = this;
            let flag = false;
            this.data.forEach(function (e) {
                if (e.stockCount < e.count) {
                    flag = true;
                }
            })
            if (flag) {
                this.alert('调拨数量超出库存数量');
            } else {
                this.confirm("调拨库存商品,确认吗?", function () {
                    vm.getData("stockTransferOrder/save", {
                        obj: JSON.stringify(vm.obj),
                        rows: JSON.stringify(vm.data)
                    }, function (data) {
                        vm.msg('操作成功');
                        vm.$router.push('stockTransferOrderList');
                    })
                })
            }
        },
        openWarehouseDlg(v) {
            this.tag = v;
            this.$refs.selectWarehouseDlg.open();
        },
        selectWarehouse(obj) {
            this.$set(this.obj, this.tag + 'WarehouseId', obj.id);
            this.$set(this.obj, this.tag + 'WarehouseName', obj.name);
            this.$refs.selectWarehouseDlg.close();
            if (this.tag === 'out') {
                this.data = [];
            }
        },
        openOutWarehouseCommodity() {
            if (!this.obj.outWarehouseId) {
                this.msg('请选择出货仓库');
            } else {
                this.$refs.selectStockCommodityDlg.open();
            }
        },
        selectStockCommodity(obj) {
            let flag = false;
            this.data.forEach(function (e) {
                if (e.commodityId === obj.commodityid) {
                    flag = true
                }
            })
            if (flag) {
                this.msg('已选商品');
            } else {
                this.data.push({
                    commodityId: obj.commodityid,
                    wareId: obj.wareid,
                    count: 0,
                    price: obj.stockprice,
                    name: obj.name,
                    zh_brand: obj.zh_brand,
                    model: obj.model,
                    sku_unit: obj.sku_unit,
                    stockCount: obj.stockcount
                })
            }
        },
        removeRow(index) {
            let vm = this;
            this.confirm("删除当前行,确认吗?", function () {
                vm.data.splice(index, 1);
            })
        },
        getRowCss(row) {
            if (row.stockCount < row.count) {
                return {background: "#fec3c3"};
            }
            return null;
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
