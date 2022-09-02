<template>
    <div>
        <input v-if="input" type="text" v-model="getUsername" readonly @click="openDlg" class="form-control">

        <Dialog ref="selectUserDlg" closed bodyCls="f-column"
                :title="'选择'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'60vW',height:'60vh'}"
                :modal="true">
            <Panel :bodyStyle="{padding:'5px'}" :border="false">
                <div class="col-9 p-5">
                </div>
                <div class="col-3 p-5">
                    <TextBox style="width:100%;height:30px" v-model="filterString" placeholder="过滤...">
                        <Addon align="right">
                            <span class="textbox-icon icon-clear" @click="filterString=''" v-if="filterString"></span>
                        </Addon>
                    </TextBox>
                </div>
            </Panel>
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
                <GridColumn field="username" title="用户姓名" align="center"></GridColumn>
                <GridColumn field="loginname" title="登录名" align="center"></GridColumn>
                <GridColumn field="password" title="密码" align="center"></GridColumn>
            </DataGrid>
        </Dialog>
    </div>
</template>

<script>
export default {
    props: ['input', 'username', 'organizationid'],
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
        if (!this.input) {
            this.loadPage(this.pageNumber, this.pageSize);
        }
    },
    computed: {
        getUsername: function () {
            return this.username;
        }
    },
    methods: {
        load() {
            this.$refs.selectUserDlg.open();
            this.loadPage(this.pageNumber, this.pageSize);
        },
        open() {
            this.$refs.selectUserDlg.open();
        },
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
            this.loading = true;
            let vm = this;
            this.$root.getData("api/getUserinfoList", {
                tablename: 'userinfoview',
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: "id",
                direction: "desc",
                filterString: this.filterString,
                organizationid: this.organizationid > 0 ? this.organizationid : 0
            }, function (data) {
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.data.push(e);
                })
                vm.loading = false;
            })
        },
        selectItem(obj) {
            this.$emit('selectUser', obj);
            // this.$refs.selectUserDlg.close();
        },
        openDlg() {
            this.$refs.selectUserDlg.open();
            this.loadPage(this.pageNumber, this.pageSize);
        }
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
    },
}
</script>

<style scoped>

</style>
