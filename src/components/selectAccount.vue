<template>
    <DataGrid class="f-full" :border="false"
              selectionMode="single"
              style="height: 100%"
              :data="accounts"
              @selectionChange="selectRow($event)">
        <GridColumn field="name" title="名称"></GridColumn>
    </DataGrid>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            accounts: []
        }
    },
    created: function () {
        this.load();
    },
    methods: {
        load: function () {
            let vm = this;
            this.$root.getData("accountingsubjects/getFundingAccount", {}, function (data) {
                vm.accounts = data;
            })
        },
        selectRow(obj) {
            this.$emit('selectAccount', obj);
        }
    }
}
</script>

<style scoped>

</style>
