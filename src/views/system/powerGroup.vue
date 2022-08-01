<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="west" style="width:25%;" :border="false">
            <Panel title="权限组列表" :bodyStyle="{padding:'0'}" class="f-full" :border="false">
                <Panel :bodyStyle="{padding:'5px'}" :border="false">
                    <LinkButton iconCls="icon-add" :plain="true" @click="addGroup">新增</LinkButton>
                    <LinkButton iconCls="icon-edit" :disabled="!group.id" :plain="true" @click="editGroup">编辑</LinkButton>
                </Panel>
                <Tree :data="powerGroups" @selectionChange="selectGroup($event)"></Tree>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :border="false"
                      class="f-full"
                      :columnResizing="true"
                      :lazy="true"
                      :data="data"
                      :total="total"
                      selectionMode="single"
                      :loading="loading"
                      @rowDblClick="editPower"
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
                <GridColumn field="groupname" title="组名称" width="120" align="center"></GridColumn>
                <GridColumn field="path" title="权限路径" align="left"></GridColumn>
                <GridColumn field="remark" title="权限说明" align="left"></GridColumn>
            </DataGrid>
            <Dialog ref="editDlg" closed
                    :title="'选择权限分组'"
                    :draggable="true"
                    :resizable="true"
                    :dialogStyle="{width:'400px',height:'400px'}"
                    bodyCls="f-column"
                    :modal="true">
                <div class="f-full">
                    <div class="col-12 p-10">
                        <label>权限组</label>
                        <input type="text" v-model="power.groupname" @click="$refs.selectGroupDlg.open()" class="form-control">
                    </div>
                    <div class="col-12 p-10">
                        <label>权限路径</label>
                        <input type="text" v-model="power.path" class="form-control">
                    </div>
                    <div class="col-12 p-10">
                        <label>权限说明</label>
                        <input type="text" v-model="power.remark" class="form-control">
                    </div>
                </div>
                <div class="dialog-button text-center">
                    <LinkButton style="width:80px" @click="savePower">保存</LinkButton>
                    <LinkButton style="width:80px" @click="$refs.editDlg.close()">关闭</LinkButton>
                </div>
            </Dialog>
            <Dialog ref="selectGroupDlg" closed
                    :title="'编辑权限信息'"
                    :dialogStyle="{width:'400px',height:'400px'}"
                    bodyCls="f-column"
                    :draggable="true"
                    :resizable="true"
                    :modal="true">
                <div class="f-full">
                    <Tree :data="powerGroups" @selectionChange="clickGroup($event)"></Tree>
                </div>
                <div class="dialog-button text-center">
                    <LinkButton style="width:80px" @click="$refs.selectGroupDlg.close()">关闭</LinkButton>
                </div>
            </Dialog>
            <Dialog ref="editGroupDlg" closed
                    :title="'编辑权限组'"
                    :dialogStyle="{width:'200px',height:'160px'}"
                    bodyCls="f-column"
                    :draggable="true"
                    :resizable="true"
                    :modal="true">
                <div class="f-full">
                    <div class="col-12 p-10">
                        <label>权限组名称</label>
                        <input type="text" v-model="group.text" class="form-control">
                    </div>
                </div>
                <div class="dialog-button text-center">
                    <LinkButton style="width:80px" @click="saveGroup">保存</LinkButton>
                    <LinkButton style="width:80px" @click="$refs.editGroupDlg.close()">关闭</LinkButton>
                </div>
            </Dialog>
<!--            <selectUser ref="selectUserCom" username="" @selectUser="selectUser"></selectUser>-->
        </LayoutPanel>
    </Layout>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            powerGroups:[],
            powers:[],
            group:{},
            power:{},
            total: 0,
            pageSize: 25,
            pageNumber: 1,
            data: [],
            loading: false,
            filterString: '',
            timeout: null
        }
    },
    created: function () {
        this.loadPowerGroups();
        this.loadPage(this.pageNumber, this.pageSize);
    },
    methods: {
        loadPowerGroups: function () {
            let vm = this;
            this.getData("sys/getPowerGroupList", {}, function (data) {
                vm.powerGroups=[];
                data.forEach(function (e) {
                    vm.powerGroups.push({id: e.id, text: e.name});
                })
                console.log(vm.powerGroups);
            })
        },

        onPageChange(event) {
            this.pageNumber = event.pageNumber;
            this.pageSize = event.pageSize;
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.loading = true;
            let vm = this;
            let url = 'sys/getPowers';
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
        selectObj(obj){
            this.power=this.clone(obj);
        },
        editPower(){
            this.$refs.editDlg.open();
        },
        savePower(){
            let vm = this;
            this.getData("sys/savePower", this.power, function (data) {
                vm.$refs.editDlg.close();
                vm.loadPage(vm.pageNumber, vm.pageSize);
            })
        },
        clickGroup(obj){
            this.$set(this.power,'groupname',obj.text);
            this.$set(this.power,'groupid',obj.id);
            console.log(this.power);
            this.$refs.selectGroupDlg.close();
        },
        addGroup(){
            this.group={};
            this.$refs.editGroupDlg.open();
        },
        editGroup(){
            this.$refs.editGroupDlg.open();
        },
        saveGroup(){
            let vm = this;
            this.getData("sys/savePowerGroup", {id:this.group.id,name:this.group.text}, function (data) {
                vm.$refs.editGroupDlg.close();
                vm.loadPowerGroups();
            })
        },
        selectGroup(obj){
            this.group=this.clone(obj);
        }
    }
}
</script>

<style scoped>

</style>
