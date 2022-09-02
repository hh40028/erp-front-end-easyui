<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="west" :border="false" style="width:220px;">
            <Tree :data="tree" @selectionChange="selectOrg($event)"></Tree>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataList :border="false"
                      class="f-full"
                      :data="user"
                      selectionMode="single"
                      @selectionChange="selectUser($event)">
                <template slot-scope="scope">
                    <div class="product f-row">
                        <img src="../assets/images/icons8-user.png" style="height: 50px">
                        <div class="detail">
                            <p>{{ scope.row.username }}</p>
                        </div>
                    </div>
                </template>
            </DataList>
        </LayoutPanel>
    </Layout>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            tree: [],
            users: [],
            org: {},
            user: {}
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
        selectOrg(org) {
            this.org = org;
            let vm = this;
            this.getData("api/getListByOrganizationid", {organizationid: this.org.id}, function (data) {
                vm.user = data;
            })
        },
        selectUser(obj) {
            this.$emit('selectUser', obj);
        }
    }
}
</script>

<style scoped>

</style>
