<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'5px'}" :border="false">
                <LinkButton iconCls="icon-add" :plain="true" class="m-r-5" @click="add">新建</LinkButton>
                <LinkButton iconCls="icon-edit" :disabled="!shop.id" :plain="true" @click="edit">编辑</LinkButton>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" :border="false">
            <DataGrid :data="shops"
                      class="f-full"
                      :border="false"
                      selectionMode="single"
                      @selectionChange="selectObj($event)">
                <GridColumn field="status" :width="50" align="center">
                    <template slot="header" slot-scope="scope">
                        启用
                    </template>
                    <template slot="body" slot-scope="scope">
                        <input type="checkbox" v-model="scope.row.status"
                               @change="onCheckedChange(scope.row)">
                    </template>
                </GridColumn>
                <GridColumn field="name" width="200" title="店铺名称" align="left"></GridColumn>
                <GridColumn field="principalname" title="店铺负责人" align="left"></GridColumn>
            </DataGrid>
            <Dialog ref="editShopDlg" closed
                    :title="'编辑店铺'"
                    :dialogStyle="{width:'400px',height:'240px'}"
                    bodyCls="f-column"
                    :draggable="true"
                    :resizable="true"
                    :modal="true">
                <div class="f-full">
                    <div class="col-12 p-10">
                        <label>店铺名称</label>
                        <input type="text" v-model="shop.name" class="form-control">
                    </div>
                    <div class="col-12 p-10">
                        <label>店铺负责人</label>
                        <select v-model="shop.principal" class="form-control">
                            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.username }}</option>
                        </select>

                    </div>
                </div>
                <div class="dialog-button">
                    <LinkButton style="width:80px" @click="save">保存</LinkButton>
                    <LinkButton style="width:80px" @click="$refs.editShopDlg.close()">关闭</LinkButton>
                </div>
            </Dialog>
        </LayoutPanel>
    </Layout>
</template>

<script>

export default {
    name: "app",
    data() {
        return {
            shop: {},
            shops: [],
            users: [],
        }
    },
    created: function () {
        this.loadUsers();
        this.load();
    },
    methods: {
        loadUsers() {
            let vm = this;
            this.$root.getData("api/getUserList", {}, function (data) {
                vm.users = data;
            })
        },
        load: function () {
            let vm = this;
            this.$root.getData("shop/getList", {}, function (data) {
                vm.shops = [];
                data.forEach(function (e) {
                    vm.shops.push(e);
                })
                console.log(vm.shops);
            })
        },
        add() {
            this.shop = {};
            this.$refs.editShopDlg.open();
        },
        openUserDlg() {
            this.$refs.selectUser.open();
        },
        selectObj(obj) {
            this.shop = this.clone(obj);
        },
        onCheckedChange(obj) {
            let vm = this;
            this.getData("shop/save", obj, function (data) {
                vm.load();
            })
        },
        edit() {
            this.$refs.editShopDlg.open();
        },
        save() {
            let vm = this;
            this.getData("shop/save", this.shop, function (data) {
                vm.$refs.editShopDlg.close();
                vm.load();
            })
        },
        selectUser() {

        }
    }
}
</script>

<style scoped>

</style>
