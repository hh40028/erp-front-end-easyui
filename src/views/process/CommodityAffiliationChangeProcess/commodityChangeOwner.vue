<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :title="processObj.pdname" bodyCls="f-column" :border="false">
                <div style="padding: 5px">
                    <table style="width:100%;border:0">
                        <tr>
                            <td style="width:33.33333%">发送人:{{ processObj.sendusername }}</td>
                            <td style="width:33.33333%">发送时间: {{ processObj.arrivaltime }}</td>
                            <td style="width:33.33333%">发送意见: {{ processObj.message }}</td>
                        </tr>
                        <tr>
                            <td style="width:100%;text-align: left" colspan="3">
                                <LinkButton style="margin-right: 20px" @click="cancel">撤销申请</LinkButton>
                            </td>
                        </tr>
                    </table>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" bodyCls="f-column" :border="true" style="padding: 3px;height: 100%">
            <Panel :title="'转出信息'" bodyCls="f-column" :border="false">
                <span class="p-5">
                    转出人: {{ obj.outUsername }}
                </span>
                <span class="p-5">
                    转入人: {{ obj.inUsername }}
                </span>
                <span class="p-5">
                    申请时间: {{ obj.createTime }}
                </span>
            </Panel>
            <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                      class="f-full"
                      :columnResizing="true">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="40">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field='bgName' title='BG' width="120" align="center" :sortable="true" :cellCss="getCellCss"></GridColumn>
                <GridColumn field='categoryGroupName' title='品类组' width="120" align="center" :sortable="true" :cellCss="getCellCss"></GridColumn>
                <GridColumn field="invalid" title='是否作废' width="80" align="center" :sortable="true">
                    <template slot="body" slot-scope="scope">
                        {{ scope.row.invalid ? "是" : "" }}
                    </template>
                </GridColumn>
                <GridColumn field="sale" title='是否销售' width="80" align="center" :sortable="true">
                    <template slot="body" slot-scope="scope">
                        {{ scope.row.sale ? "是" : "" }}
                    </template>
                </GridColumn>
                <GridColumn field='wareId' title='SKU编号' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='name' title='商品名称' width="420" align="left"></GridColumn>
                <GridColumn field='brandName' title='品牌名称' width="120" align="left" :sortable="true"></GridColumn>
                <!--                        <GridColumn field='cid1' title='三级分类(第一分类)id' width="120" align="center"></GridColumn>-->
                <GridColumn field='oneTypeName' title='一级分类' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='twoTypeName' title='二级分类' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='threeTypeName' title='三级分类' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='model' title='型号' width="120" align="left"></GridColumn>
                <GridColumn field='originalPlace' title='产地' width="120" align="center"></GridColumn>
                <GridColumn field='skuUnit' title='销售单位' width="80" align="center"></GridColumn>
                <GridColumn field='pkgInfo' title='包装清单' width="120" align="left"></GridColumn>
                <GridColumn field='warranty' title='质保' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='shelfLife' title='保质期(天)' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='zhBrand' title='中文品牌' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='enBrand' title='英文品牌' width="120" align="center" :sortable="true"></GridColumn>
            </DataGrid>
        </LayoutPanel>
        <Dialog ref="processDlg" closed
                :title="operationname+'意见'"
                :dialogStyle="{width:'300px',height:'200px'}"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <div style="padding: 10px">
                    <div>
                        <textarea :placeholder="'请输入'+operationname+'意见'" style="height: 70px" class="form-control" v-model="message"></textarea>
                    </div>
                </div>
            </div>
            <div class="dialog-button">
                <LinkButton style="width:80px" @click="send">发送</LinkButton>
                <LinkButton style="width:80px" @click="$refs.processDlg.close()">关闭</LinkButton>
            </div>
        </Dialog>
    </Layout>
</template>

<script>


export default {
    name: "app",
    data() {
        return {
            processObj: {},
            message: '',
            data: [],
            obj: {},
        }
    },
    created: function () {
        this.processObj = JSON.parse(sessionStorage.processObj);
        this.loadData();
    },
    methods: {
        loadData() {
            let vm = this;
            this.getData("commoditynew/getChangeUserCommodityList", {id: this.processObj.relationid}, function (data) {
                vm.obj = data.obj;
                vm.data = data.children;
            })
        },
        cancel() {
            let vm = this;
            this.$refs.processDlg.close();
            this.confirm('确认吗?', function () {
                vm.getData("sys/nextTask", {
                    taskid: vm.processObj.id,
                    operationname: "撤销申请",
                    message: '',
                    processVariables: JSON.stringify({})
                }, function (data) {
                    vm.$router.push('index');
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
