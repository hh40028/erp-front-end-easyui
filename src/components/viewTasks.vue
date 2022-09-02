<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="center" bodyCls="f-column" :border="false">
            <DataGrid :data="tasks" :border="false"
                      class="f-full"
                      :columnResizing="true">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="40">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field='taskstatus' title='状态' width="60" align="center"></GridColumn>
                <GridColumn field='nodename' title='节点名称' width="150" align="center"></GridColumn>
                <GridColumn field='sendusername' title='发送人员' width="120" align="center"></GridColumn>
                <GridColumn field='arrivaltime' title='到达时间' width="150" align="center"></GridColumn>
                <GridColumn field='processusername' title='办理人员' width="120" align="center"></GridColumn>
                <GridColumn field='processingtime' title='处理时间' width="150" align="center"></GridColumn>
                <GridColumn field='operationname' title='操作名称' width="150" align="center"></GridColumn>
                <GridColumn field='message' title='处理意见' align="center"></GridColumn>
            </DataGrid>
            <div v-show="!tasks.length" style="padding: 10px;font-size: 30px;text-align: center">无流程信息</div>
        </LayoutPanel>
    </Layout>
</template>

<script>
export default {
    props: {
        relationid: {
            type: Number,
            default: 0
        },
        instanceid: {
            type: Number,
            default: 0
        }
    },
    name: "app",
    data() {
        return {
            tasks: []
        }
    },
    created: function () {
        this.loadList();
    },
    methods: {
        loadList: function () {
            let vm = this;
            this.getData("sys/getListByRelationid", {
                instanceid: this.instanceid,
                relationid: this.relationid
            }, function (data) {
                vm.tasks = data;
            })
        }
    }
}
</script>

<style scoped>

</style>
