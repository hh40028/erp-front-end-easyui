<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <LinkButton iconCls="icon-add" :plain="true" @click="add">新建</LinkButton>
                <LinkButton iconCls="icon-edit" :disabled="!obj.id" :plain="true" @click="edit">编辑</LinkButton>
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
                      selectionMode="single"
                      :loading="loading"
                      @rowDblClick="edit()"
                      @selectionChange="selectObj($event)"
                      :pageNumber="pageNumber"
                      :pageSize="pageSize"
                      @pageChange="onPageChange($event)"
                      :pagination="true"
                      :pagePosition="'bottom'">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="40">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field='carriers_id' title='编号' width="150" align="center"></GridColumn>
                <GridColumn field='carriers_name' title='名称' width="150" align="center"></GridColumn>
                <GridColumn field='carriers_type' title='分类' width="150" align="center"></GridColumn>
<!--                <GridColumn field='carriers_phone' title='电话' width="150" align="center"></GridColumn>-->
                <GridColumn field='kuaidi100' title='快递100编码' width="150" align="center"></GridColumn>
                <GridColumn field='tag' title='标注' align="left"></GridColumn>
            </DataGrid>
            <Dialog ref="d1" closed
                    :title="'编辑物流信息'"
                    :draggable="true"
                    :resizable="true"
                    :dialogStyle="{width:'500px'}"
                    :modal="true">
                <div class="col-12 p-t-15 p-l-15 p-r-15">
                    <label class="f-bold">编号</label><br>
                    <input type="text" v-model="obj.carriers_id" class="form-control">
                </div>
                <div class="col-12 p-t-15 p-l-15 p-r-15">
                    <label class="f-bold">名称</label><br>
                    <input type="text" v-model="obj.carriers_name" class="form-control">
                </div>
                <div class="col-12 p-t-15 p-l-15 p-r-15">
                    <label class="f-bold">分类</label><br>
                    <input type="text" v-model="obj.carriers_type" class="form-control">
                </div>
<!--                <div class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                    <label class="f-bold">电话</label><br>-->
<!--                    <input type="text" v-model="obj.carriers_phone" class="form-control">-->
<!--                </div>-->
                <div class="col-12 p-t-15 p-l-15 p-r-15">
                    <label class="f-bold">快递100物流公司编码</label><br>
                    <input type="text" v-model="obj.kuaidi100" class="form-control">
                </div>
                <div class="col-12 p-t-15 p-l-15 p-r-15" style="margin-bottom: 15px">
                    <label class="f-bold">标注</label><br>
                    <input type="text" v-model="obj.tag" class="form-control">
                </div>
                <template slot="footer">
                    <div class="text-center p-5">
                        <LinkButton class="m-r-10" iconCls="icon-save" @click="save">保存</LinkButton>
                        <LinkButton iconCls="icon-cancel" @click="$refs.d1.close()">关闭</LinkButton>
                    </div>
                </template>
            </Dialog>
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
            logisticsTypeList: []
        }
    },
    components: {
        filterList
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
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
            this.$root.getData("logisticsCompany/getQueryList", {
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
            this.getData("logisticsCompany/save", this.obj, function (data) {
                vm.$refs.d1.close();
                vm.loadPage(vm.pageNumber, vm.pageSize);
            })
        },
        onCheckedChange(obj) {
            this.obj = obj;
            let vm = this;
            this.getData("logisticsCompany/save", this.obj, function (data) {
                vm.$refs.d1.close();
                vm.loadPage(vm.pageNumber, vm.pageSize);
            })
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(1, this.pageSize);
        },
        changePageSize(value){
            this.pageSize=value;
            this.loadPage(1, this.pageSize);
        },
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
</style>
