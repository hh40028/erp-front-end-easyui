<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <div>
                    <input type="text" class="form-control" placeholder="过滤...">
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataList
                :data="data" class="f-full"
                selectionMode="single"
                @selectionChange="selectItem($event)">
                <template slot-scope="scope">
                    <div class="p-10">{{ scope.row.carriers_name }}</div>
                </template>
            </DataList>
        </LayoutPanel>
    </Layout>
</template>

<script>
export default {
    props:['tag'],
    name: "app",
    data() {
        return {
            data: []
        }
    },
    created: function () {
        this.loadList();
    },
    methods: {
        loadList() {
            let vm = this;
            this.getData("logisticsCompany/getList", {tag:this.tag}, function (data) {
                vm.data = data;
            })
        },
        selectItem(obj) {
            this.$emit('selectLogisticsType', obj);
        }
    }
}
</script>

<style scoped>

</style>
