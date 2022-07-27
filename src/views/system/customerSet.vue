<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px',lineHeight:'30px'}" :border="false">
                <LinkButton iconCls="icon-add" :plain="true" @click="add">新建</LinkButton>
                <LinkButton iconCls="icon-edit" :plain="true" @click="edit" :disabled="!obj.id">编辑</LinkButton>
                <div class="pull-right">
                    <filterList @filterLoad="filter"></filterList>
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
                      @pageChange="onPageChange($event)"
                      :pagination="true"
                      :pagePosition="'bottom'">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field="name" title="客户名称" align="center"></GridColumn>
                <GridColumn field="consigneeName" title="联系人" align="center"></GridColumn>
                <GridColumn field="phoneNumber" title="手机号码" align="center"></GridColumn>
                <GridColumn field="telephone" title="固定电话" align="center"></GridColumn>
                <GridColumn field="address" title="地址" align="left"></GridColumn>
            </DataGrid>
        </LayoutPanel>
        <Dialog ref="editDlg" closed
                :title="'编辑客户信息'"
                :dialogStyle="{width:'400px',height:'460px'}"
                bodyCls="f-column"
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
            this.loading = true;
            let vm = this;
            this.$root.getData("customer/getQueryList", {
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
                vm.obj={};
            })
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        selectItem(obj) {
            this.obj = this.clone(obj);
        },
        add() {
            this.obj = {};
            this.$refs.editDlg.open();
        },
        edit() {
            this.$refs.editDlg.open();
        },
        save() {
            let vm = this;
            this.getData("customer/save", this.obj, function (data) {
                vm.$refs.editDlg.close();
                vm.loadPage(vm.pageNumber, vm.pageSize);
            })
        },
        changeStatus(obj){
            let vm = this;
            this.getData("customer/save", obj, function (data) {
                vm.loadPage(vm.pageNumber, vm.pageSize);
            })
        }
    }
}
</script>

<style scoped>

</style>
