<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" bodyCls="f-column" :border="false">
                <ButtonGroup selectionMode="single">
                    <LinkButton iconCls="icon-add" :toggle="true" @click="add">新建</LinkButton>
                    <LinkButton iconCls="icon-edit" :toggle="true" @click="edit">编辑</LinkButton>
                    <LinkButton iconCls="icon-remove" :toggle="true" @click="deleteObj">删除</LinkButton>
                </ButtonGroup>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                      class="f-full"
                      :rowCss="getRowCss"
                      :columnResizing="true"
                      :lazy="true"
                      :total="total"
                      selectionMode="single"
                      @sortChange="sort($event)"
                      :loading="loading"
                      @selectionChange="selectObj($event)"
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
                <GridColumn title='提交' width="50" align="center">
                    <template slot="body" slot-scope="scope">
                        {{ scope.row.submit?"提交":"" }}
                    </template>
                </GridColumn>
                <GridColumn field='applyId' title='申请编号' width="150" align="center"></GridColumn>
                <GridColumn field='typeName' title='类别名称' width="100" align="center" :sortable="true"></GridColumn>
                <GridColumn field='name' title='商品名称' align="left"></GridColumn>
                <GridColumn field='createTime' title='创建时间' width="150" align="center" :sortable="true"></GridColumn>
                <GridColumn field='remark' title='备注' width="250" align="left"></GridColumn>
            </DataGrid>
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
            timeout: null,
            field: 'id',
            order: 'desc'
        }
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
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
            this.$root.getData("newCommodity/getQueryList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: this.field,
                direction: this.order,
                filterString: this.filterString
            }, function (data) {
                console.log(data);
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.data.push(e);
                })
                vm.loading = false;
                vm.obj = {};
            })
        },
        selectObj(obj) {
            this.obj = this.clone(obj);
        },
        getRowCss(row) {
            if (row.submit) {
                return {background: "#fbfea2"};
            }
            return null;
        },
        add(){
            sessionStorage.removeItem('newCommodityObj');
            this.$router.push('newCommodity');
        },
        edit(){
            sessionStorage.newCommodityObj=JSON.stringify(this.obj);
            this.$router.push('newCommodity');
        },
        deleteObj(){
            let vm = this;
            this.confirm("确认吗?", function () {
                vm.getData("newCommodity/delete", {id:vm.obj.id}, function (data) {
                    vm.loadPage(1,vm.pageSize);
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
