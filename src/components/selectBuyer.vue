<template>
    <DataGrid class="f-full" :border="false"
              selectionMode="single"
              style="height: 100%"
              :data="data"
              @selectionChange="selectRow($event)">
        <GridColumn field="keyname" title="编码"></GridColumn>
        <GridColumn field="name" title="名称"></GridColumn>
    </DataGrid>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            data: []
        }
    },
    created: function () {
        this.load();
    },
    methods: {
        load: function () {
            let vm = this;
            this.$root.getData("buyer/getList", {}, function (data) {
                vm.data = data;
            })
        },
        selectRow(obj) {
            this.$emit('selectBuyer', obj);
        }
    }
}
</script>

<style scoped>

</style>
