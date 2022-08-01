<template>
    <DataGrid class="f-full"
              selectionMode="single"
              :data="warehouses"
              @selectionChange="selectRow($event)"
              style="width:100%;height:100%">
        <GridColumn field="name" title="仓库名称"></GridColumn>
        <GridColumn field="managername" title="负责人"></GridColumn>
    </DataGrid>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            warehouses: []
        }
    },
    created: function () {
        this.load();
    },
    methods: {
        load: function () {
            let vm = this;
            this.$root.getData("warehouse/getList", {}, function (data) {
                vm.warehouses = [];
                data.forEach(function (e) {
                    if (e.checking) {
                        e.checking = "盘点中...";
                    }
                    vm.warehouses.push(e);
                })
            })
        },
        selectRow(obj) {
            this.$emit('selectWarehouse', obj);
        }
    }
}
</script>

<style scoped>

</style>
