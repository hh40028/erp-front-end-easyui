<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <LinkButton iconCls="icon-add" :plain="true" @click="add">新增</LinkButton>
                <LinkButton iconCls="icon-edit" :plain="true" @click="edit">编辑</LinkButton>
<!--                <LinkButton iconCls="icon-reload" :plain="true" @click="reload">刷新</LinkButton>-->
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :columnResizing="true" :bodyStyle="{padding:'5px',border:0}"
                      :border="false"
                      class="f-full"
                      :rowCss="getRowCss"
                      selectionMode="single"
                      :data="data"
                      @selectionChange="selectItem($event)">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field="status" title="启用" :width="50" align="center">
                    <template slot="body" slot-scope="scope">
                        {{ scope.row.status ? "启用" : "" }}
                    </template>
                </GridColumn>
                <GridColumn field="name" title="名称" align="left" width="300"></GridColumn>
                <GridColumn field="accessToken" title="AccessToken" align="center" width="300"></GridColumn>
                <GridColumn field="appKey" title="AppKey" align="center" width="300"></GridColumn>
                <GridColumn field="appSecret" title="AppSecret" align="center" width="300"></GridColumn>
                <GridColumn field="refreshToken" title="RefreshToken" align="center" width="300"></GridColumn>
                <GridColumn field="queryTime" title="QueryTime" align="center" width="150"></GridColumn>
                <GridColumn field="serverUrl" title="接口地址" width="300" align="left"></GridColumn>
            </DataGrid>
        </LayoutPanel>
        <Dialog ref="editDlg" closed
                :title="'编辑主体信息'"
                :dialogStyle="{width:'600px',height:'500px'}"
                :modal="true"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true">
            <div class="f-full">
                <table style="width:100%">
                    <tbody>
                    <tr>
                        <th class="th">名称</th>
                        <td class="td">
                            <input type="text" v-model="obj.name" class="form-control">
                        </td>
                    </tr>
                    <tr>
                        <th class="th">AccessToken</th>
                        <td class="td">
                            <input type="text" v-model="obj.accessToken" class="form-control"></td>
                    </tr>
                    <tr>
                        <th class="th">AppKey</th>
                        <td class="td">
                            <input type="text" v-model="obj.appKey" class="form-control"></td>
                    </tr>
                    <tr>
                        <th class="th">AppSecret</th>
                        <td class="td">
                            <input type="text" v-model="obj.appSecret" class="form-control"></td>
                    </tr>
                    <tr>
                        <th class="th">RefreshToken</th>
                        <td class="td">
                            <input type="text" v-model="obj.refreshToken" class="form-control"></td>
                    </tr>
                    <tr>
                        <th class="th">QueryTime</th>
                        <td class="td">
                            <input type="text" v-model="obj.queryTime" class="form-control"></td>
                    </tr>
                    <tr>
                        <th class="th">接口地址</th>
                        <td class="td">
                            <input type="text" v-model="obj.serverUrl" class="form-control"></td>
                    </tr>
                    <tr>
                        <th class="th">状态</th>
                        <td class="td">
                            <input type="checkbox" v-model="obj.status" id="ck">
                            <label for="ck">{{ obj.status ? '启用' : '禁用' }}</label>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="dialog-button">
                <LinkButton style="width:80px" @click="save">保存</LinkButton>
                <LinkButton style="width:80px" @click="$refs.editDlg.close()">关闭</LinkButton>
            </div>
        </Dialog>
    </Layout>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            data: [],
            obj: {}
        }
    },
    created: function () {
        this.load();
    },
    methods: {
        load: function () {
            let vm = this;
            this.getData("mainBody/getListAll", {}, function (data) {
                vm.data = data;
            })
        },
        reload(){
            let vm = this;
            this.getData("mainBody/getMainBodyList", {}, function (data) {
                vm.load();
                vm.msg('刷新成功');
            })
        },
        selectItem(obj) {
            this.obj = this.clone(obj);
        },
        add() {
            this.$refs.editDlg.open();
            this.obj = {};
        },
        edit() {
            this.$refs.editDlg.open();
        },
        save() {
            this.$refs.editDlg.close();
            let vm = this;
            this.getData("mainBody/save", this.obj, function (data) {
                vm.load();
            })
        },
        getRowCss(row) {
            if (!row.status) {
                return {background: "#f8c0c0"};
            }
            return null;
        },
    }
}
</script>

<style scoped>

.th {
    border: 1px solid #ddd;
    padding: 5px;
    line-height: 35px;
    text-align: right;
    width: 30%;
}

.td {
    border: 1px solid #ddd;
    padding: 5px;
    line-height: 35px;
    text-align: left;
    width: 70%;
}
</style>
