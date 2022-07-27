<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <LinkButton iconCls="icon-add" :plain="true" @click="add">新建</LinkButton>
                <LinkButton iconCls="icon-edit" :disabled="!obj.id" :plain="true" @click="edit">编辑</LinkButton>
                <div class="pull-right">
                    <filterList @filterLoad="filter"></filterList>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                      class="f-full"
                      :columnResizing="true"
                      :lazy="true"
                      :total="total"
                      selectionMode="single"
                      :loading="loading"
                      @rowDblClick="edit()"
                      @selectionChange="selectObj($event)"
                      :pageNumber="pageNumber"
                      :pageSize="pageSize"
                      @pageChange="onPageChange($event)"
                      :pagination="true"
                      :pagePosition="'bottom'">
                <GridColumn field="status" :width="40" align="center">
                    <template slot="header" slot-scope="scope">
                        启用
                    </template>
                    <template slot="body" slot-scope="scope">
                        <input type="checkbox" v-model="scope.row.status"
                               @change="onCheckedChange(scope.row)">
                    </template>
                </GridColumn>
                <GridColumn field='number' title='仓库编码' width="120" align="center"></GridColumn>
                <GridColumn field='name' title='仓库名称' width="120" align="center"></GridColumn>
                <GridColumn field='type' title='仓库类别' width="120" align="center"></GridColumn>
                <GridColumn field='address' title='地址' width="120" align="center"></GridColumn>
                <GridColumn field='contacts' title='联系人' width="120" align="center"></GridColumn>
                <GridColumn field='phoneNumber' title='手机' width="120" align="center"></GridColumn>
                <GridColumn field='tel' title='固话' width="120" align="center"></GridColumn>
                <GridColumn field='createTime' title='创建时间' width="120" align="center"></GridColumn>
            </DataGrid>
            <Dialog ref="d1" closed
                    :title="'编辑商品信息'"
                    :dialogStyle="{width:'300px',height:'560px'}"
                    :modal="true">
                <div class="col-12 p-t-10 p-l-10 p-r-10">
                    <label>仓库编码</label><br>
                    <input type="text" v-model="obj.number" class="form-control">
                </div>
                <div class="col-12 p-t-10 p-l-10 p-r-10">
                    <label>仓库名称 <span v-if="!obj.name" class="c-red">*</span></label><br>
                    <input type="text" v-model="obj.name" class="form-control" :class="{'b-red':!obj.name}">
                </div>
                <div class="col-12 p-t-10 p-l-10 p-r-10">
                    <label>仓库类别</label><br>
                    <input type="text" v-model="obj.type" class="form-control">
                </div>
                <div class="col-12 p-t-10 p-l-10 p-r-10">
                    <label>地址</label><br>
                    <input type="text" v-model="obj.address" class="form-control">
                </div>
                <div class="col-12 p-t-10 p-l-10 p-r-10">
                    <label>联系人</label><br>
                    <input type="text" v-model="obj.contacts" class="form-control">
                </div>
                <div class="col-12 p-t-10 p-l-10 p-r-10">
                    <label>手机</label><br>
                    <input type="text" v-model="obj.phoneNumber" class="form-control">
                </div>
                <div class="col-12 p-t-10 p-l-10 p-r-10">
                    <label>固话</label><br>
                    <input type="text" v-model="obj.tel" class="form-control">
                </div>
                <template slot="footer">
                    <div class="text-center p-5">
                        <LinkButton class="m-r-10" iconCls="icon-save" @click="save">保存</LinkButton>
                        <LinkButton iconCls="icon-cancel" @click="$refs.d1.close()">关闭</LinkButton>
                    </div>
                </template>
            </Dialog>
        </LayoutPanel>
        <selectSupplier ref="selectSupplierCom" username="" @selectSupplier="selectSupplier"></selectSupplier>
    </Layout>
</template>

<script>
import selectSupplier from '@/components/selectSupplier.vue';
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
            filterString:''
        }
    },
    components: {
        selectSupplier, filterList
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
        this.loadSuppliers();
    },
    methods: {
        loadSuppliers: function () {
            let vm = this;
            this.getData("supplier/getList", {}, function (data) {
                vm.suppliers = data;
            })
            this.$root.getData("api/getDictList", {}, function (data) {
                data.forEach(function (e) {
                    if (e.key === 'jiliangdanwei') {
                        vm.units.push(e);
                    }
                    if (e.key === 'chanpinleibie') {
                        vm.types.push(e);
                    }
                    if (e.key === 'shangPinLeiYuan') {
                        vm.sources.push(e);
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
            this.$root.getData("supplierWarehouse/getQueryList", {
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
        selectObj(obj) {
            this.obj = this.clone(obj);
            this.viewObj = [];
            this.viewObj.push(this.obj);
            this.loadCommoditySupplier();
        },
        add() {
            this.obj = {id: 0};
            this.$refs.d1.open();
        },
        edit() {
            this.$refs.d1.open();
        },
        save() {
            let vm = this;
            this.getData("supplierWarehouse/save", this.obj, function (data) {
                vm.$refs.d1.close();
                vm.loadPage(vm.pageNumber, vm.pageSize);
            })
        },
        onCheckedChange(obj) {
            this.obj = obj;
            let vm = this;
            this.getData("supplierWarehouse/save", this.obj, function (data) {
                vm.$refs.d1.close();
                vm.loadPage(vm.pageNumber, vm.pageSize);
            })
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
    }
}
</script>

<style scoped>
.b-red {
    border: 1px solid #F44336
    /*background-color: #ff9992*/
}
.c-red{
    color: red;
}
</style>
