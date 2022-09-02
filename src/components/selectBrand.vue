<template>
    <div>
        <TextBox v-if="input" type="text" v-model="name" :editable="false" @focus="openDlg" style="width:100%"></TextBox>
        <Dialog ref="selectBrandDlg" closed
                :title="'选择品牌'"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'550px',height:'700px'}"
                :modal="true">
            <div style="padding: 5px">
                <TextBox style="width:100%;height:30px" v-model="filterString" placeholder="过滤...">
                    <Addon align="right">
                        <span class="textbox-icon icon-clear" @click="filterString=''" v-if="filterString"></span>
                    </Addon>
                </TextBox>
            </div>
            <DataGrid :columnResizing="true" :bodyStyle="{padding:'5px',border:0}"
                      :border="false"
                      class="f-full"
                      :lazy="true"
                      :data="data"
                      :total="total"
                      selectionMode="single"
                      :loading="loading"
                      @selectionChange="selectItem($event)"
                      :pageNumber="pageNumber"
                      :pageSize="pageSize"
                      @pageChange="onPageChange($event)"
                      :pagination="true"
                      :pagePosition="'bottom'">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field="name" title="品牌名称" width="120" align="left"></GridColumn>
                <GridColumn field="mainBodyName" title="主体名称" width="220" align="left"></GridColumn>
            </DataGrid>

        </Dialog>
    </div>
</template>

<script>
export default {
    props: ['input', 'name', 'type'],
    name: "app",
    data() {
        return {
            pageSize: 15,
            pageNumber: 1,
            filterString: '',
            loading: false,
            data: [],
            total: 0
        }
    },
    created: function () {
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
            this.$root.getData("brand/getQueryList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: "name",
                direction: "asc",
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
        open() {
            this.$refs.selectBrandDlg.open();
            this.loadPage(this.pageNumber, this.pageSize);
        },
        selectItem(obj) {
            this.name = obj.name;
            this.$emit('selectBrand', obj);
            this.$refs.selectBrandDlg.close();
        },
        openDlg() {
            this.$refs.selectBrandDlg.open();
            this.loadPage(this.pageNumber, this.pageSize);
        },
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
    }
}
</script>

<style scoped>

</style>
