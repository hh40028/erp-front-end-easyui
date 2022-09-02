<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="west" style="width:25%;" :border="false">
            <Panel title="角色列表" :bodyStyle="{padding:'0'}" class="f-full" :border="false">
                <Panel :bodyStyle="{padding:'5px'}" :border="false">
                    <LinkButton iconCls="icon-add" :plain="true" @click="add">新增</LinkButton>
                    <LinkButton iconCls="icon-remove" :disabled="!obj.id" :plain="true" @click="removeObj">删除</LinkButton>
                </Panel>
                <Tree ref="tree" :data="roles" @selectionChange="selection($event)"></Tree>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <Panel :bodyStyle="{padding:'5px'}" v-show="selectRole.id>0" :border="false">
                <LinkButton iconCls="icon-add" :plain="true" @click="add">新增</LinkButton>
                <LinkButton iconCls="icon-remove" :disabled="!obj.id" :plain="true" @click="removeObj">删除</LinkButton>
            </Panel>

            <DataGrid class="f-full" :border="false"
                      :data="userroles"
                      v-show="selectRole.id>0"
                      selectionMode="single"
                      @selectionChange="selectObj($event)">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field="orgname" title='隶属机构' width="150" align="center"></GridColumn>
                <GridColumn field="username" title='用户姓名' width="150" align="center"></GridColumn>
                <GridColumn field="loginname" title='登录名'></GridColumn>
            </DataGrid>
            <selectUser ref="selectUserCom" username="" @selectUser="selectUser"></selectUser>
        </LayoutPanel>
    </Layout>
</template>

<script>
import selectUser from '@/components/selectUser.vue';

export default {
    name: "app",
    data() {
        return {
            roles: [],
            userroles: [],
            selectRole: {},
            obj: {}
        }
    },
    created: function () {
        this.loadRoles();
    },
    components: {
        selectUser
    },
    methods: {
        loadRoles: function () {
            let vm = this;
            this.getData("sys/getRoleList", {}, function (data) {
                vm.roles = [];
                data.forEach(function (e) {
                    vm.roles.push({id: e.id, text: e.name});
                })
                vm.$refs.tree.selectNode(vm.roles[0]);
                vm.selection(vm.roles[0]);
            })
        },
        selection(role) {
            let vm = this;
            this.selectRole = role;
            this.getData("userrole/getViewList", {roleid: role.id}, function (data) {
                vm.userroles = data;
                console.log(vm.userroles);
            })
        },
        selectUser(obj) {
            let vm = this;
            this.getData("userrole/save", {roleid: this.selectRole.id, userid: obj.id}, function (data) {
                vm.selection(vm.selectRole);
            })
        },
        add() {
            this.$refs.selectUserCom.open();
        },
        selectObj(obj) {
            this.obj = obj;
        },
        removeObj() {
            let vm = this;
            this.confirm('确认吗?', function () {
                vm.getData("userrole/delete", {id: vm.obj.id}, function (data) {
                    vm.selection(vm.selectRole);
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
