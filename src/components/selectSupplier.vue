<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <LinkButton v-if="!addSupplier && !hideAdd" iconCls="icon-add" @click="add">新增供应商</LinkButton>
                <ButtonGroup v-if="addSupplier" selectionMode="single">
                    <LinkButton iconCls="icon-save" @click="save">保存</LinkButton>
                    <LinkButton iconCls="icon-add" @click="addSupplier=false">取消</LinkButton>
                </ButtonGroup>
                <div class="pull-right">
                    <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid v-if="!addSupplier" :columnResizing="true" :bodyStyle="{padding:'5px',border:0}"
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
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="40">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field="name" title="名称" align="left" width="220"></GridColumn>
                <GridColumn field="contactperson" title="联系人" align="center" width="120"></GridColumn>
                <GridColumn field="contactnumber" title="联系电话" align="center" width="120"></GridColumn>
                <GridColumn field="address" title="地址" align="left"></GridColumn>
            </DataGrid>

            <div v-if="addSupplier" style="margin-bottom: 30px">
                <div class="col-4 p-t-15 p-l-15 p-r-15">
                    <label>供应商编号</label><br>
                    <input type="text" v-model="obj.number" readonly class="form-control">
                </div>
                <div class="col-4 p-t-15 p-l-15 p-r-15">
                    <span style="color: red">*</span><label>名称</label><br>
                    <input type="text" v-model="obj.name" class="form-control">
                </div>
                <div class="col-4 p-t-15 p-l-15 p-r-15">
                    <label>联系人</label><br>
                    <input type="text" v-model="obj.contactperson" class="form-control">
                </div>
                <div class="col-4 p-t-15 p-l-15 p-r-15">
                    <label>联系电话</label><br>
                    <input type="text" v-model="obj.contactnumber" class="form-control">
                </div>
                <div class="col-4 p-t-15 p-l-15 p-r-15">
                    <label>账期(天)</label><br>
                    <input type="text" v-model="obj.paymentdays" class="form-control">
                </div>
                <div class="col-4 p-t-15 p-l-15 p-r-15">
                    <label>省</label><br>
                    <input type="text" v-model="obj.province" class="form-control">
                </div>
                <div class="col-4 p-t-15 p-l-15 p-r-15">
                    <label>市</label><br>
                    <input type="text" v-model="obj.city" class="form-control">
                </div>
                <div class="col-4 p-t-15 p-l-15 p-r-15">
                    <label>区县</label><br>
                    <input type="text" v-model="obj.county" class="form-control">
                </div>
                <div class="col-4 p-t-15 p-l-15 p-r-15">
                    <label>地址</label><br>
                    <input type="text" v-model="obj.address" class="form-control">
                </div>
                <div class="col-4 p-t-15 p-l-15 p-r-15">
                    <label>收款银行</label><br>
                    <input type="text" v-model="obj.receivingBank" class="form-control">
                </div>
                <div class="col-4 p-t-15 p-l-15 p-r-15">
                    <label>收款账号</label><br>
                    <input type="text" v-model="obj.receivingAccount" class="form-control">
                </div>
                <div class="col-4 p-t-15 p-l-15 p-r-15">
                    <label>收款人</label><br>
                    <input type="text" v-model="obj.payee" class="form-control">
                </div>
            </div>
        </LayoutPanel>
    </Layout>
</template>

<script>
import filterList from '@/components/filterList.vue';

export default {
    props:['hideAdd'],
    name: "app",
    data() {
        return {
            pageSize: 15,
            pageNumber: 1,
            filterString: '',
            loading: false,
            data: [],
            total: 0,
            obj: {},
            addSupplier: false
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
            this.$root.getData("supplier/getQueryList", {
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
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        changePageSize(value){
            this.pageSize=value;
            this.loadPage(1, this.pageSize);
        },
        selectItem(obj) {
            this.$emit('selectSupplier', obj);
        },
        add() {
            this.addSupplier = true;
        },
        save() {
            let vm = this;
            this.getData("supplier/save", this.obj, function (data) {
                vm.addSupplier = false;
                vm.obj = {};
                vm.loadPage(1, vm.pageSize);
                vm.msg('保存成功');
            })
        },
    }
}
</script>

<style scoped>

</style>
