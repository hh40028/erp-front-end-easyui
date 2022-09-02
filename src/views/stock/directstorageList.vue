<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px',lineHeight:'30px'}" :border="false">
                <LinkButton iconCls="icon-add" :plain="true" @click="add">新建</LinkButton>
                <div class="pull-right">
                    <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :columnResizing="true" :bodyStyle="{padding:'5px',border:0}"
                      :border="false"
                      class="f-full"
                      :lazy="true"
                      :data="data"
                      :total="total"
                      selectionMode="single"
                      :loading="loading"
                      @selectionChange="selectItem($event)"
                      :pageNumber="pageNumber"
                      :pageSize="pageSize"
                      @rowExpand="loadItems($event)"
                      @pageChange="onPageChange($event)"
                      :pagination="true"
                      :pagePosition="'bottom'">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn :expander="true" width="30"></GridColumn>
                <GridColumn field="number" title="单据编号" align="center"></GridColumn>
                <GridColumn field="warehouseName" title="入货仓库" align="center"></GridColumn>
                <GridColumn field="entrydate" title="入库日期" align="center"></GridColumn>
                <GridColumn field="username" title="操作人" align="center"></GridColumn>
                <GridColumn field="remark" title="摘要说明" align="left"></GridColumn>
                <template slot="detail" slot-scope="scope" :border="false">
                    <div style="padding: 3px;background-color: #fef7ce">
                        <DataGrid :data="scope.row.items" :border="false"
                                  class="f-full"
                                  :columnResizing="true">
                            <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                                <template slot="body" slot-scope="scope">
                                    {{ scope.rowIndex + 1 }}
                                </template>
                            </GridColumn>
                            <GridColumn field='wareid' title='商品编号' width="160" align="center"></GridColumn>
                            <GridColumn field='commodityName' title='商品名称' align="left"></GridColumn>
                            <GridColumn field='zh_brand' title='品牌名称' align="center" width="100"></GridColumn>
                            <GridColumn field='model' title='规格型号' width="100" align="center"></GridColumn>
                            <GridColumn field="sku_unit" title='商品单位' width="80" align="center"></GridColumn>
                            <GridColumn field="incount" title='入库数量' width="150" align="center"></GridColumn>
                            <GridColumn field="inprice" title='入库单价' width="150" align="right">
                                <template slot="body" slot-scope="scope">
                                    {{ toMoney(scope.row.inprice, '') }}
                                </template>
                            </GridColumn>
                        </DataGrid>
                    </div>
                </template>
            </DataGrid>
        </LayoutPanel>
        <Dialog ref="editDlg" closed
                :title="'编辑客户信息'"
                :dialogStyle="{width:'400px',height:'460px'}"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <div class="col-12 p-t-15 p-l-15 p-r-15">
                    <label>客户名称</label><br>
                    <input type="text" v-model="obj.name" class="form-control">
                </div>
                <div class="col-12 p-t-15 p-l-15 p-r-15">
                    <label>联系人</label><br>
                    <input type="text" v-model="obj.consigneeName" class="form-control">
                </div>
                <div class="col-12 p-t-15 p-l-15 p-r-15">
                    <label>手机号码</label><br>
                    <input type="text" v-model="obj.phoneNumber" class="form-control">
                </div>
                <div class="col-12 p-t-15 p-l-15 p-r-15">
                    <label>固定电话</label><br>
                    <input type="text" v-model="obj.telephone" class="form-control">
                </div>
                <div class="col-12 p-t-15 p-l-15 p-r-15">
                    <label>地址</label><br>
                    <input type="text" v-model="obj.address" class="form-control">
                </div>
            </div>
            <div class="dialog-button">
                <LinkButton style="width:80px" @click="save">保存</LinkButton>
                <LinkButton style="width:80px" @click="$refs.editDlg.close()">关闭</LinkButton>
            </div>
        </Dialog>
    </Layout>
</template>

<script>
import filterList from "@/components/filterList";

export default {
    name: "app",
    data() {
        return {
            pageSize: 15,
            pageNumber: 1,
            filterString: '',
            loading: false,
            total: 0,
            data: [],
            obj: {}
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
            this.loading = true;
            let vm = this;
            this.$root.getData("directstorage/getQueryList", {
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
                vm.obj = {};
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
        selectItem(obj) {
            this.obj = this.clone(obj);
        },
        add() {
            this.$router.push('newDirectstorage');
        },
        edit() {
            this.$refs.editDlg.open();
        },
        loadItems(obj) {
            let vm = this;
            this.getData("directstoragechild/getMaps", {did: obj.id}, function (data) {
                vm.$set(obj, 'items', data);
                console.log(data);
            })
        },
    }
}
</script>

<style scoped>

</style>
