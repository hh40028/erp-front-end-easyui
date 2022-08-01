<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'5px'}" bodyCls="f-column" :border="false">
                <template slot="header">
                    <div class="f-row">
                        <div class="f-full" style="line-height:30px">
                            <LinkButton iconCls="icon-save" :plain="true" @click="save">保存单据</LinkButton>
                            <LinkButton iconCls="icon-search" :plain="true" @click="openCommodity">选择商品</LinkButton>
                        </div>
                    </div>
                </template>
                <div class="row" style="padding-bottom: 20px">
                    <div class="col-3 p-t-15 p-l-15 p-r-15">
                        <label>入货仓库</label><br>
                        <input type="text" v-model="obj.warehouseName" class="form-control" readonly @click="openWarehouseDlg()">
                    </div>
                    <div class="col-9 p-t-15 p-l-15 p-r-15">
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
                <GridColumn field="incount" title='入库数量' width="150" align="center" :editable="true"></GridColumn>
                <GridColumn field="inprice" title='入库单价' width="150" align="center" :editable="true">
                </GridColumn>

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
        <selectCommodity ref="selectCommodityCom" @selectCommodity="selectCommodity"></selectCommodity>
    </Layout>
</template>

<script>
import selectWarehouse from '@/components/selectWarehouse.vue';
import selectCommodity from '@/components/selectCommodity.vue';

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
        selectWarehouse, selectCommodity
    },
    methods: {
        save() {
            let vm = this;
            this.confirm("商品直接入库,确认吗?", function () {
                vm.getData("directstorage/save", {
                    obj: JSON.stringify(vm.obj),
                    rows: JSON.stringify(vm.data)
                }, function (data) {
                    vm.msg('操作成功');
                    vm.$router.push('directstorageList');
                })
            })
        },
        openWarehouseDlg() {
            this.$refs.selectWarehouseDlg.open();
        },
        selectWarehouse(obj) {
            this.$set(this.obj, 'warehouseid', obj.id);
            this.$set(this.obj, 'warehouseName', obj.name);
            this.$refs.selectWarehouseDlg.close();
        },
        openCommodity() {
            this.$refs.selectCommodityCom.open();
        },
        selectCommodity(obj) {
            this.data.push({
                commodityid: obj.id,
                wareId: obj.wareid,
                count: 0,
                inprice: 0,
                name: obj.name,
                zh_brand: obj.zh_brand,
                model: obj.model,
                sku_unit: obj.sku_unit,
                incount: 0
            })
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
