<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="west" style="width:25%;" :border="false" bodyCls="f-column" >
            <Panel title="角色列表" :bodyStyle="{padding:'0'}" class="f-full">
                <Panel :bodyStyle="{padding:'5px'}" :border="false">
                    <LinkButton iconCls="icon-add" :plain="true" @click="addRole">新增</LinkButton>
                    <LinkButton iconCls="icon-edit" :disabled="!role.id" :plain="true" @click="editRole">编辑</LinkButton>
                </Panel>
                <Tree ref="tree" :data="roles" @selectionChange="selectRole($event)"></Tree>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <Panel title="权限组列表" :bodyStyle="{padding:'0'}" class="f-full">
                <div class="col-3 p-10" v-for="pg in powerGroups" v-if="role.id>0">
                    <input type="checkbox" v-model="pg.checked" @change="savePowerGroups">
                    <label>{{pg.name}}</label>
                </div>
            </Panel>
            <Dialog ref="editRoleDlg" closed
                    :title="'编辑角色信息'"
                    :dialogStyle="{width:'200px',height:'160px'}"
                    bodyCls="f-column"
                    :draggable="true"
                    :resizable="true"
                    :modal="true">
                <div class="f-full">
                    <div class="col-12 p-10">
                        <label>角色名称</label>
                        <input type="text" v-model="role.text" class="form-control">
                    </div>
                </div>
                <div class="dialog-button text-center">
                    <LinkButton style="width:80px" @click="savePowerGroups">保存</LinkButton>
                    <LinkButton style="width:80px" @click="$refs.editRoleDlg.close()">关闭</LinkButton>
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
            roles: [],
            powerGroups: [],
            role: {}
        }
    },
    created: function () {
        this.loadPowerGroups();
        this.loadRoles();
    },
    methods: {
        loadPowerGroups: function () {
            let vm = this;
            this.getData("sys/getPowerGroupList", {}, function (data) {
                vm.powerGroups=[];
                data.forEach(function (e) {
                    vm.$set(e,'checked',false);
                    vm.powerGroups.push(e);
                })
                console.log(vm.powerGroups);
            })
        },
        loadRoles: function () {
            let vm = this;
            this.getData("sys/getRoleList", {}, function (data) {
                vm.roles = [];
                data.forEach(function (e) {
                    vm.$set(e,'text',e.name);
                    vm.roles.push(e);
                })
                console.log(vm.roles);
            })
        },
        addRole() {
            this.$refs.editRoleDlg.open();
            this.role = {};
            this.powerGroups.forEach(function (e){
                vm.$set(e,'checked',false);
            })
        },
        editRole() {
            this.$refs.editRoleDlg.open();
        },
        selectRole(obj) {
            this.role = obj;
            this.changeCheck();
            console.log(this.role);
        },
        saveRole() {

        },
        changeCheck(){
            let vm = this;
            let arr=this.role.groupids.split(",");
            this.powerGroups.forEach(function (e){
                vm.$set(e,'checked',false);
            })
            for (let i = 0; i < arr.length; i++) {
                this.powerGroups.forEach(function (e){
                    if(e.id===parseInt(arr[i])){
                        e.checked=true;
                    }
                })
            }
        },
        savePowerGroups(){
            let groupids='';
            this.powerGroups.forEach(function (e){
                if(e.checked){
                    groupids+=e.id+',';
                }
            })
            this.$set(this.role,'groupids',groupids);
            this.$set(this.role,'name',this.role.text);
            let vm = this;
            this.getData("sys/saveRole", this.role, function (data) {
                vm.$refs.editRoleDlg.close();
            })
        }
    }
}
</script>

<style scoped>

</style>
