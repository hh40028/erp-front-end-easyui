<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="west" bodyCls="f-column" style="width: 20%">
            <Panel :bodyStyle="{padding:'3px'}" :border="false">
                <ButtonGroup selectionMode="single">
                    <LinkButton iconCls="icon-add" @click="addObj">新建</LinkButton>
                    <LinkButton iconCls="icon-add" @click="addSupplier=false">取消</LinkButton>
                </ButtonGroup>
                <div class="pull-right">
                    <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>
                </div>
            </Panel>
            <DataGrid :data="data" :border="false"
                      class="f-full"
                      :columnResizing="true"
                      :lazy="true"
                      :total="total"
                      selectionMode="single"
                      :loading="loading"
                      @selectionChange="selectObj($event)"
                      :pageNumber="pageNumber"
                      :pageSize="pageSize"
                      @pageChange="onPageChange($event)"
                      :pagination="true"
                      :pagePosition="'bottom'">
                <GridColumn field='name' title='供应商名称' width="40" align="left"></GridColumn>
            </DataGrid>
        </LayoutPanel>
        <LayoutPanel region="center" bodyCls="f-column" :border="false" style="height:100%">
            <Layout bodyCls="f-column" style="height:100%" :border="false">
                <LayoutPanel region="north" :border="false">
                    <Panel :bodyStyle="{padding:'8px'}" :border="false">
                        <LinkButton iconCls="icon-edit" @click="editObj" v-show="!obj.edit">编辑</LinkButton>
                        <LinkButton iconCls="icon-save" @click="save" v-show="obj.edit">保存</LinkButton>
                        <LinkButton iconCls="icon-cancel" style="margin-left: 10px" @click="cancelObj" v-show="obj.edit">取消</LinkButton>
                    </Panel>
                    <div style="margin-bottom: 30px">
                        <div class="col-4 p-t-15 p-l-15 p-r-15">
                            <label>供应商编号</label><br>
                            <input type="text" v-model="obj.number" class="form-control">
                        </div>
                        <div class="col-4 p-t-15 p-l-15 p-r-15">
                            <label>名称</label><br>
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
                <LayoutPanel region="center" style="height:100%;padding-top: 30px" :border="false">
                    <Panel v-show="obj.id>0" title="员工列表" :bodyStyle="{padding:'8px'}">
                        <LinkButton iconCls="icon-add" @click="addUser">新增</LinkButton>
                        <LinkButton iconCls="icon-edit" style="margin-left: 10px" :toggle="true" :disabled="!userObj.id" @click="editUser">编辑</LinkButton>
                    </Panel>
                    <DataGrid :data="users" :border="false"
                              selectionMode="single"
                              @selectionChange="selectUser($event)"
                              class="f-full">
                        <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                            <template slot="body" slot-scope="scope">
                                {{ scope.rowIndex + 1 }}
                            </template>
                        </GridColumn>
                        <GridColumn field='name' title='员工姓名' width="120" align="center"></GridColumn>
                        <GridColumn field='phoneNumber' title='手机号' width="220" align="center"></GridColumn>
                        <GridColumn field='password' title='登录密码' width="220" align="center"></GridColumn>
                        <GridColumn field='remark' title='备注信息' align="center"></GridColumn>
                    </DataGrid>
                </LayoutPanel>
            </Layout>
        </LayoutPanel>
        <Dialog ref="editUserDlg" closed
                :title="'编辑供应商员工信息'"
                :dialogStyle="{width:'400px',height:'400px'}"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <div class="col-12 p-t-15 p-l-15 p-r-15">
                    <label>员工姓名</label><br>
                    <input type="text" v-model="userObj.name" class="form-control">
                </div>
                <div class="col-12 p-t-15 p-l-15 p-r-15">
                    <label>手机号</label><br>
                    <input type="text" v-model="userObj.phoneNumber" class="form-control">
                </div>
                <div class="col-12 p-t-15 p-l-15 p-r-15">
                    <label>登录密码</label><br>
                    <input type="text" v-model="userObj.password" class="form-control">
                </div>
                <div class="col-12 p-t-15 p-l-15 p-r-15">
                    <label>备注信息</label><br>
                    <textarea style="height: 50px" v-model="userObj.remark" class="form-control"></textarea>
                </div>

            </div>
            <div class="dialog-button">
                <LinkButton style="width:80px" @click="saveUser">保存</LinkButton>
                <LinkButton style="width:80px" @click="$refs.editUserDlg.close()">关闭</LinkButton>
            </div>
        </Dialog>
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
            obj: {
                children: []
            },
            list: [],
            filterString: '',
            timeout: null,
            users: [],
            userObj: {}
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
            let url = 'supplier/getQueryList';
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
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        add() {
            this.obj = {};
            this.$refs.editSupplierDlg.open();
        },
        edit() {
            this.$refs.editSupplierDlg.open();
        },
        selectObj(obj) {
            this.obj = this.clone(obj);
            this.userObj = {};
            this.loadUserList();
        },
        loadUserList() {
            let vm = this;
            this.getData("supplierUser/getList", {supplierId: this.obj.id}, function (data) {
                vm.users = data;
            })
        },
        changeStatus(obj) {
            this.obj = this.clone(obj);
            this.save();
        },
        save() {
            let vm = this;
            this.getData("supplier/save", this.obj, function (data) {
                vm.obj.version = vm.obj.version + 1;
                vm.loadPage(vm.pageNumber, vm.pageSize);
                this.$set(obj, 'edit', false);
            })
        },
        editObj() {
            this.$set(this.obj, 'edit', true);
        },
        cancelObj() {
            this.$set(this.obj, 'edit', false);
        },
        addUser() {
            this.userObj = {};
            this.$refs.editUserDlg.open();
        },
        editUser() {
            this.$refs.editUserDlg.open();
        },
        saveUser() {
            let vm = this;
            this.userObj.supplierId = this.obj.id;
            this.getData("supplierUser/save", this.userObj, function (data) {
                vm.$refs.editUserDlg.close();
                vm.userObj = {};
                vm.loadUserList();
            })
        },
        selectUser(obj) {
            this.userObj = this.clone(obj);
        },
        addObj() {
            this.obj = {edit: true};
            this.users = [];
            this.userObj = {};
        }
    },
    watch: {
        filterString: {
            handler() {
                let vm = this;
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(function () {
                    vm.loadPage(vm.pageNumber, vm.pageSize);
                }, 500);
            }
        }
    },
}
</script>

<style scoped>
.th {
    border: 1px solid #ddd;
    width: 16.66666%;
    padding: 5px;
}

.td {
    border: 1px solid #ddd;
    width: 16.66666%;
    padding: 5px;
}
</style>
