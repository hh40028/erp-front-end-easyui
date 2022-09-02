<template>
    <Tree :data="tree" @selectionChange="selectItem($event)"></Tree>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            tree: []
        }
    },
    created: function () {
        this.loadList();
    },
    methods: {
        loadList() {
            let vm = this;
            this.getData("api/getOrgTree", {}, function (data) {
                vm.tree = data;
            })
        },
        selectItem(obj) {
            this.$emit('selectOrganization', obj);
        },
    }
}
</script>

<style scoped>

</style>
