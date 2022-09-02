<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="true" :bodyStyle="{padding:'8px'}">
            <select v-model="mainBodyId" class="form-control" style="width: 200px" @change="reload">
                <option v-for="body in mainBodyList" :key="body.id" :value="body.id">{{ body.name }}</option>
            </select><div class="pull-right">
            <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>
        </div>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                      class="f-full"
                      :columnResizing="true"
                      :lazy="true"
                      :total="total"
                      selectionMode="single"
                      :loading="loading"
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
                <GridColumn field='id' title='编号' width="100" align="center"></GridColumn>
                <GridColumn field='name' title='三级分类名称' width="100" align="left"></GridColumn>
                <GridColumn field='depth' title='深度' width="100" align="center" :sortable="true"></GridColumn>
                <GridColumn field='cid3' title='三级分类编号' width="100" align="center"></GridColumn>
                <GridColumn title='' align="left"></GridColumn>
            </DataGrid>
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
            mainBodyId:0,
            mainBodyList:[],
            data: [],
            loading: false,
            filterString:''
        }
    },
    created: function () {
        this.loadMainBodyList();
    },
    components: {
        filterList
    },
    methods: {
        loadMainBodyList() {
            let vm = this;
            this.getData("mainBody/getList", {}, function (data) {
                vm.mainBodyList = data;
                vm.mainBodyId = data[0].id;
                vm.loadPage(vm.pageNumber, vm.pageSize);
            })
        },
        reload() {
            this.loadPage(1, this.pageSize);
        },
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
            this.loading = true;
            let vm = this;
            this.$root.getData("commodityType/getQueryList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: "id",
                direction: "desc",
                filterString: this.filterString,
                mainBodyId:this.mainBodyId
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
            this.loadPage(1, this.pageSize);
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
