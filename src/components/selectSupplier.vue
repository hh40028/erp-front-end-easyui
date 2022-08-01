<template>
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
        <GridColumn field="name" title="名称" align="left" width="220"></GridColumn>
        <GridColumn field="contactperson" title="联系人" align="center" width="120"></GridColumn>
        <GridColumn field="contactnumber" title="联系电话" align="center" width="120"></GridColumn>
        <GridColumn field="address" title="地址" align="left"></GridColumn>
    </DataGrid>
</template>

<script>
import filterList from '@/components/filterList.vue';

export default {
    name: "app",
    data() {
        return {
            pageSize: 15,
            pageNumber: 1,
            filterString: '',
            loading: false,
            data: [],
            total: 0,
            obj: {}
        }
    },
    created: function () {
        if (!this.input) {
            this.loadPage(this.pageNumber, this.pageSize);
        }
    },
    components: {
        filterList
    },
    methods: {
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.loading = true;
            let vm = this;
            this.$root.getData("supplier/getQueryList", {
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
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        selectItem(obj) {
            this.$emit('selectSupplier', obj);
        }
    }
}
</script>

<style scoped>

</style>
