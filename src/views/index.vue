<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="east" style="width:300px;" bodyCls="f-column" :border="true">
            <Panel title="通知" :collapsible="false" class="f-full" :border="false">
                <div v-if="incompleteCount>0" class="p-10">
                    <a class="c-blue" @click="$router.push('incompleteCommoditynewList')">现有{{incompleteCount}}条商品无负责人--点击处理</a>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" bodyCls="f-column" :border="false">
            <Panel title="待办任务" :collapsible="false" class="f-full" :border="false">
                <DataGrid style="height:calc(100vh - 84px)" :title="'待办任务'"
                          :border="false"
                          class="f-full"
                          :columnResizing="true"
                          :lazy="true"
                          :data="data"
                          :total="total"
                          selectionMode="single"
                          :loading="loading"
                          @rowDblClick="edit()"
                          @selectionChange="selectObj($event)"
                          :pageNumber="pageNumber"
                          :pageSize="pageSize"
                          @pageChange="onPageChange($event)"
                          :pagination="true"
                          :pagePosition="'bottom'">
                    <GridColumn field="pdname" title="流程名称" width="120" align="center"></GridColumn>
                    <GridColumn field="nodename" title="节点名称" width="120" align="center"></GridColumn>
                    <GridColumn field="sendusername" title="发送用户" width="120" align="center"></GridColumn>
                    <GridColumn field="arrivaltime" title="发送时间" width="150" align="center"></GridColumn>
                    <GridColumn field="message" title="处理意见" width="320" align="center"></GridColumn>
                </DataGrid>
            </Panel>
        </LayoutPanel>
    </Layout>
</template>


<script>
export default {
    name: "app",
    data() {
        return {
            total: 0,
            pageSize: 15,
            pageNumber: 1,
            data: [],
            loading: false,
            obj: {},
            incompleteCount:0
        }
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
        this.loadIncompleteCount();
    },
    methods: {
        loadIncompleteCount(){
            let vm = this;
            this.getData("commoditynew/getIncompleteCount", {}, function (data) {
                vm.incompleteCount=data;
            })
        },
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
            this.getData('api/getProcesstaskQueryList', {
                tablename: 'processtaskview',
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: "id",
                direction: "desc",
                filterString: this.filterString
            }, function (data) {
                console.log(data);
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.data.push(e);
                })
                vm.loading = false;
            })
        },
        selectObj(obj) {
            this.obj = obj;
            sessionStorage.processObj = JSON.stringify(this.obj);
        },
        edit() {
            this.$router.push(this.obj.form);
        }
    }
}
</script>

<style scoped>
</style>

