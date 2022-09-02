<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'5px'}" :border="false">
                <LinkButton iconCls="icon-add" :plain="true" @click="add">新建</LinkButton>
                <LinkButton iconCls="icon-edit" :disabled="!obj.id" :plain="true" @click="edit">编辑</LinkButton>
                <div class="pull-right">
                    <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <Panel :bodyStyle="{padding:'0'}" class="f-full" bodyCls="f-column" :border="false">
                <DataGrid :border="false"
                          class="f-full"
                          :columnResizing="true"
                          :lazy="true"
                          :data="data"
                          :total="total"
                          selectionMode="single"
                          :loading="loading"
                          @selectionChange="selectObj($event)"
                          :pageNumber="pageNumber"
                          :pageSize="pageSize"
                          @pageChange="onPageChange($event)"
                          :pagination="true"
                          :pagePosition="'bottom'">
                    <GridColumn title="序号" width="40" align="center">
                        <template slot="body" slot-scope="scope">
                            <div class="item">
                                {{ scope.rowIndex + 1 }}
                            </div>
                        </template>
                    </GridColumn>
                    <GridColumn field="keyname" title="编码" width="180" align="center"></GridColumn>
                    <GridColumn field="name" title="姓名" width="180" align="center"></GridColumn>
                    <GridColumn field="remark" title="产线" align="left"></GridColumn>
                </DataGrid>
                <Dialog ref="editDictDlg" closed
                        :title="'编辑采销员'"
                        :draggable="true"
                        :resizable="true"
                        :dialogStyle="{width:'400px'}"
                        bodyCls="f-column"
                        :modal="true">
                    <div class="f-full">
                        <div class="col-12 p-10">
                            <label>编码</label>
                            <input type="text" v-model="obj.keyname" class="form-control">
                        </div>
                        <div class="col-12 p-10">
                            <label>姓名</label>
                            <input type="text" v-model="obj.name" class="form-control">
                        </div>
                        <div class="col-12 p-10">
                            <label>产线</label>
                            <input type="text" v-model="obj.remark" class="form-control">
                        </div>
                    </div>
                    <div class="dialog-button">
                        <LinkButton style="width:80px" @click="save">保存</LinkButton>
                        <LinkButton style="width:80px" @click="$refs.editDictDlg.close()">关闭</LinkButton>
                    </div>
                </Dialog>
            </Panel>
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
            pageSize: 20,
            pageNumber: 1,
            data: [],
            loading: false,
            obj: {},
            filterString: '',
            timeout: null
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
            this.pageNumber = event.pageNumber;
            this.pageSize = event.pageSize;
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
            this.loading = true;
            let vm = this;
            let url = 'buyer/getQueryList';
            this.$root.getData(url, {
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
            this.obj = {};
            this.$refs.editDictDlg.open();
        },
        edit() {
            this.$refs.editDictDlg.open();
        },
        save() {
            let vm = this;
            this.getData("buyer/save", this.obj, function (data) {
                vm.$refs.editDictDlg.close();
                vm.loadPage(vm.pageNumber, vm.pageSize);
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
    }
}
</script>

<style scoped>

</style>
