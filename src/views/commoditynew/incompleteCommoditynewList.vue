<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <div class="pull-right">
                    <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>
                </div>
                <LinkButton iconCls="icon-add" @click="assignStaff">分配员工</LinkButton>
                <LinkButton style="margin-left: 30px" iconCls="icon-reload" @click="reload">重新拉取</LinkButton>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                      class="f-full"
                      :columnResizing="true"
                      selectionMode="single"
                      @selectionChange="selectObj($event)">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="50">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field="status" :width="50" align="center">
                    <template slot="header" slot-scope="scope">
                        <input type="checkbox" v-model="allSelected"
                               @click="all">
                    </template>
                    <template slot="body" slot-scope="scope">
                        <input type="checkbox" v-model="scope.row.selected">
                    </template>
                </GridColumn>
                <GridColumn field='builderName' title='建品人' width="80" align="center" :sortable="true"></GridColumn>
                <GridColumn field='buildDate' title='建品时间' width="80" align="center" :sortable="true"></GridColumn>
                <GridColumn field='username' title='负责人' width="80" align="center" :sortable="true" :cellCss="getCellCss"></GridColumn>
                <GridColumn title='是否作废' width="80" align="center" :sortable="true">
                    <template slot="body" slot-scope="scope">
                        {{ scope.row.invalid ? "是" : "" }}
                    </template>
                </GridColumn>
                <GridColumn title='是否销售' width="80" align="center" :sortable="true">
                    <template slot="body" slot-scope="scope">
                        {{ scope.row.sale ? "是" : "" }}
                    </template>
                </GridColumn>
                <GridColumn field='wareId' title='SKU编号' width="120" align="center"></GridColumn>
                <GridColumn field='name' title='商品名称' width="420" align="left"></GridColumn>
                <GridColumn field='brandName' title='品牌名称' width="120" align="left" :sortable="true"></GridColumn>
                <!--                        <GridColumn field='cid1' title='三级分类(第一分类)id' width="120" align="center"></GridColumn>-->
                <GridColumn field='oneTypeName' title='一级分类' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='twoTypeName' title='二级分类' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='threeTypeName' title='三级分类' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='model' title='型号' width="120" align="left"></GridColumn>
                <GridColumn field='originalPlace' title='产地' width="120" align="center"></GridColumn>
                <!--                        <GridColumn field='upc' title='upc编码' width="120" align="center"></GridColumn>-->
                <!--                        <GridColumn field='packing' title='包装规格([1×N]请填写N的值)' width="120" align="center"></GridColumn>-->
                <GridColumn field='skuUnit' title='销售单位' width="80" align="center"></GridColumn>
                <GridColumn field='packType' title='特殊属性' width="120" align="center" :sortable="true">
                    <template slot="body" slot-scope="scope">
                        {{ getPackTypeName(scope.row.packType) }}
                    </template>
                </GridColumn>
                <GridColumn field='pkgInfo' title='包装清单' width="120" align="left"></GridColumn>
                <GridColumn field='warranty' title='质保' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='shelfLife' title='保质期(天)' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='zhBrand' title='中文品牌' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='enBrand' title='英文品牌' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='webSite' title='官网' width="120" align="center"></GridColumn>
                <GridColumn field='tel' title='服务电话' width="120" align="center"></GridColumn>
                <GridColumn field='length' title='长' width="120" align="center"></GridColumn>
                <GridColumn field='width' title='宽' width="120" align="center"></GridColumn>
                <GridColumn field='height' title='高' width="120" align="center"></GridColumn>
                <GridColumn field='weight' title='重量(kg)' width="120" align="center"></GridColumn>
                <GridColumn title='市场价' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.marketPrice, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='采购价' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.purchasePrice, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='京东价' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.memberPrice, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='京东利润率' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.memberPrice, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='协议价' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.agreementPrice, '') }}
                    </template>
                </GridColumn>
                <GridColumn title='成本价' width="100" align="right">
                    <template slot="body" slot-scope="scope">
                        {{ toMoney(scope.row.costPrice, '') }}
                    </template>
                </GridColumn>
                <GridColumn field='salerCode' title='销售员简码' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='salerName' title='销售员名称' width="120" align="center"></GridColumn>
                <GridColumn field='purchaserCode' title='采购员简码' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='purchaserName' title='采购员名称' width="120" align="center"></GridColumn>
                <GridColumn field='bgName' title='BG' width="120" align="center" :cellCss="getCellCss"></GridColumn>
                <GridColumn field='categoryGroupName' title='品类组' width="120" align="center" :cellCss="getCellCss"></GridColumn>
                <GridColumn field='purchaserName' title='采购员名称' width="120" align="center"></GridColumn>
                <GridColumn field='saleState' title='上下柜状态' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='wreadme' title='规格参数' width="120" align="center"></GridColumn>
                <GridColumn field='modifyTime' title='更改时间' width="120" align="center" :sortable="true"></GridColumn>
                <GridColumn field='issn' title='是否序列号管理' width="120" align="center" :sortable="true">
                    <template slot="body" slot-scope="scope">
                        {{ scope.row.issn === 1 ? "是" : "否" }}
                    </template>
                </GridColumn>
                <GridColumn field='service' title='服务' width="120" align="center"></GridColumn>
                <GridColumn field='salesRatio' title='销售比例' width="120" align="center"></GridColumn>
                <GridColumn field='aftersales' title='售后' width="120" align="center"></GridColumn>
                <GridColumn field='catalogerCode' title='上柜员简码' width="120" align="center"></GridColumn>
                <GridColumn field='catalogerName' title='上柜员姓名' width="120" align="center"></GridColumn>
                <GridColumn field='salerDeptName' title='采销岗名称' width="120" align="center"></GridColumn>
                <GridColumn field='stores' title='库房信息' width="120" align="center"></GridColumn>
                <GridColumn field='itemNum' title='货号' width="120" align="center"></GridColumn>
                <GridColumn field='dangerGoods' title='是否危险品' width="120" align="center" :sortable="true">
                    <template slot="body" slot-scope="scope">
                        {{ scope.row.dangerGoods === 1 ? "是" : "否" }}
                    </template>
                </GridColumn>
                <GridColumn field='afterSaleDesc' title='售后保障' width="120" align="center"></GridColumn>
                <GridColumn field='storeProperty' title='冷链标记' width="120" align="center" :sortable="true">
                    <template slot="body" slot-scope="scope">
                        {{ getLlbz(scope.row.storeProperty) }}
                    </template>
                </GridColumn>
                <GridColumn field='designConcept' title='设计理念' width="120" align="center"></GridColumn>
                <GridColumn field='sysp' title='试用品' width="80" align="center" :sortable="true">
                    <template slot="body" slot-scope="scope">
                        {{ scope.row.sysp === 1 ? "是" : "否" }}
                    </template>
                </GridColumn>
                <GridColumn field='giftsGoods' title='赠品' width="120" align="center" :sortable="true">
                    <template slot="body" slot-scope="scope">
                        <span v-if="scope.row.giftsGoods===1">是,不可销售</span>
                        <span v-if="scope.row.giftsGoods===2">是,可销售</span>
                        <span v-if="scope.row.giftsGoods===0">否</span>
                    </template>
                </GridColumn>
            </DataGrid>
        </LayoutPanel>
        <Dialog ref="selectUser1Dlg" closed
                :title="'选择员工'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'40%',height:'40%'}"
                :modal="true">
            <selectOrganizationUser ref="selectOrganizationUserCom" @selectUser="selectAssignUser"></selectOrganizationUser>
        </Dialog>
    </Layout>
</template>

<script>

import selectSupplier from '@/components/selectSupplier.vue';
import filterList from '@/components/filterList.vue';
import selectOrganizationUser from "@/components/selectOrganizationUser";

export default {
    name: "app",
    data() {
        return {
            notPage: false,
            total: 0,
            pageSize: 15,
            pageNumber: 1,
            data: [],
            loading: false,
            allSelected: false,
            obj: {},
            timeout: null,
            field: 'id',
            order: 'asc',
            userObj: {id: 0},
            notSupplier: false,
            commoditySupplier: [],
            csObj: {},
            mainBodyList: [],
            tssx: [
                {value: 1, title: '普遍商品'},
                {value: 2, title: '易碎品'},
                {value: 3, title: '裸装液体'},
                {value: 4, title: '带包装液体'},
                {value: 5, title: '按原包装出库'}
            ],
            llbj: [
                {value: 1, title: '控温(10 -18)'},
                {value: 2, title: '冷藏(0-8)'},
                {value: 3, title: '冷冻(零下12- 零下18)'},
                {value: 4, title: '深冷(零下30)'},
                {value: 6, title: '产地直送'},
                {value: 7, title: '鲜品(冷藏存常温配)'}
            ],
            submitMainBodyId: 0,
            submitCid1: 0,
            typeList: [],
            brandList: [],
            submitObj: {
                mainBodyId: 0,
                typeId: 0,
                brandId: 0
            },
            imgList: []
        }
    },
    created: function () {
        this.loadPage();
    },
    components: {
        filterList, selectOrganizationUser, selectSupplier
    },
    methods: {
        loadPage() {
            let vm = this;
            this.$root.getData("commoditynew/getIncompleteList", {}, function (data) {
                vm.data = [];
                data.forEach(function (e) {
                    vm.$set(e, 'selected', false);
                    vm.data.push(e);
                })
                vm.obj = {};
            })
        },
        getCellCss(row, value) {
            if (!value) {
                return {backgroundColor: "#f9d1d1"};
            }
            return null;
        },
        getPackTypeName(i) {
            let name = '';
            this.tssx.forEach(function (a) {
                if (a.value === i) {
                    name = a.title;
                }
            })
            return name;
        },
        getLlbz(i) {
            let name = '未设置';
            this.llbj.forEach(function (e) {
                if (e.value === i) {
                    name = e.title;
                }
            })
            return name;
        },
        all() {
            let vm = this;
            this.allSelected = !this.allSelected;
            this.data.forEach(function (e) {
                e.selected = vm.allSelected;
            })
        },
        selectObj(obj) {
            this.obj = this.clone(obj);
            this.loadCommoditySupplier();
            this.loadImgList();
        },
        selectAssignUser(obj) {
            let arr = [];
            this.data.forEach(function (e) {
                if (e.selected) {
                    e.userid = obj.id;
                    arr.push(e);
                }
            })
            let vm = this;
            this.confirm("分配" + obj.username + ",确认吗?", function () {
                vm.getData("commoditynew/assignStaff", {rows: JSON.stringify(arr), userid: obj.id}, function (data) {
                    vm.$refs.selectUser1Dlg.close();
                    vm.allSelected = false;
                    vm.loadPage();
                })
            })
        },
        assignStaff() {
            let flag = false;
            this.data.forEach(function (e) {
                if (e.selected) {
                    flag = true;
                }
            })
            if (!flag) {
                this.msg('请勾选复选框');
            } else {
                this.$refs.selectUser1Dlg.open();
            }
        },
        clearUserObj() {
            this.userObj = {id: 0};
        },
        selectUser(obj) {
            this.userObj = obj;
            this.$refs.selectUserDlg.close();
            this.loadPage();
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage();
        },
        changePageSize(value){
            this.pageSize=value;
            this.loadPage(1, this.pageSize);
        },
        reload() {
            let vm = this;
            this.getData("commoditynew/loadSingleCommodity", {wareId: this.obj.wareId, mainBodyId: this.obj.mainBodyId}, function (data) {
                vm.loadPage();
            })
        }
    }
}
</script>

<style scoped>
.f-bold {
    font-weight: bold;
}
</style>
