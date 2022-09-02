<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <div class="pull-right">
                    <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>
                </div>
                <ButtonGroup selectionMode="single">
                    <LinkButton iconCls="icon-add" @click="add">建品</LinkButton>
                    <LinkButton iconCls="icon-edit" @click="editObj" :disabled="!obj.id">编辑</LinkButton>
                    <LinkButton iconCls="icon-remove" @click="deleteObj" :disabled="!obj.id || obj.wareId">删除</LinkButton>
                    <LinkButton @click="copyObj" :disabled="!obj.id">复制</LinkButton>
                </ButtonGroup>
                <ButtonGroup selectionMode="single" style="margin-left: 30px">
                    <LinkButton :selected="!notSupplier" @click="changeSupplierSelect(false)">全部</LinkButton>
                    <LinkButton :selected="notSupplier" @click="changeSupplierSelect(true)">无供应商</LinkButton>
                </ButtonGroup>

                <LinkButton iconCls="icon-add" style="margin-left: 30px" @click="assignStaff">分配员工</LinkButton>
                <TextBox placeholder="员工..." style="margin-left: 30px" v-model="userObj.username">
                    <Addon align="left">
                        <LinkButton :btnStyle="{borderRadius:0,borderWidth:'0 1px 0 0',width:'40px',height:'30px'}">隶属</LinkButton>
                    </Addon>
                    <Addon align="right">
                        <span class="textbox-icon icon-search" @click="$refs.selectUserDlg.open()"></span>
                        <span class="textbox-icon icon-clear" @click="clearUserObj"></span>
                    </Addon>
                </TextBox>
                <LinkButton style="margin-left: 30px" iconCls="icon-reload" @click="reload">重新拉取</LinkButton>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <Layout bodyCls="f-column" :border="false">
                <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
                    <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                              class="f-full"
                              :columnResizing="true"
                              :lazy="true"
                              :total="total"
                              @sortChange="sort($event)"
                              selectionMode="single"
                              :loading="loading"
                              @selectionChange="selectObj($event)"
                              :pageNumber="pageNumber"
                              :pageSize="pageSize"
                              @pageChange="onPageChange($event)"
                              :pagination="true"
                              :pagePosition="'bottom'">
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
                        <!--                        <GridColumn field='brandId' title='品牌id' width="120" align="center"></GridColumn>-->
                        <!--                        <GridColumn field='subCategories' title='三级分类' width="120" align="center"></GridColumn>-->
                        <GridColumn field='salerCode' title='销售员简码' width="120" align="center" :sortable="true"></GridColumn>
                        <GridColumn field='salerName' title='销售员名称' width="120" align="center"></GridColumn>
                        <GridColumn field='purchaserCode' title='采购员简码' width="120" align="center" :sortable="true"></GridColumn>
                        <GridColumn field='purchaserName' title='采购员名称' width="120" align="center"></GridColumn>
                        <GridColumn field='purchaserName' title='采购员名称' width="120" align="center"></GridColumn>
                        <GridColumn field='saleState' title='上下柜状态' width="120" align="center" :sortable="true"></GridColumn>
                        <!--                        <GridColumn field='vendorName' title='供应商名称' width="120" align="center"></GridColumn>-->
                        <!--                        <GridColumn field='fullCategoryName1' title='第一分类全路径名称' width="120" align="center"></GridColumn>-->
                        <GridColumn field='wreadme' title='规格参数' width="120" align="center"></GridColumn>
                        <!--                        <GridColumn field='propInfosList' title='规格参数' width="120" align="center"></GridColumn>-->
                        <!--                        <GridColumn field='extPropIInfosList' title='拓展属性' width="120" align="center"></GridColumn>-->
                        <!--                        <GridColumn field='introHtml' title='pc商品介绍html模式' width="120" align="center"></GridColumn>-->
                        <!--                        <GridColumn field='introMobile' title='移动端商品介绍html模式' width="120" align="center"></GridColumn>-->
                        <!--                        <GridColumn field='pcTemplateHtml' title='pc端模板转换的html' width="120" align="center"></GridColumn>-->
                        <!--                        <GridColumn field='pcDecorationHtml' title='pc端装吧转换的html' width="120" align="center"></GridColumn>-->
                        <!--                        <GridColumn field='mobileDecorationHtml' title='移动端装吧转换的html' width="120" align="center"></GridColumn>-->
                        <!--                        <GridColumn field='videoId' title='视频编号' width="120" align="center"></GridColumn>-->
                        <!--                        <GridColumn field='title' title='标题' width="120" align="center"></GridColumn>-->
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
                        <!--                        <GridColumn field='salerDeptId' title='采销岗id' width="120" align="center"></GridColumn>-->
                        <GridColumn field='salerDeptName' title='采销岗名称' width="120" align="center"></GridColumn>
                        <GridColumn field='stores' title='库房信息' width="120" align="center"></GridColumn>
                        <GridColumn field='itemNum' title='货号' width="120" align="center"></GridColumn>
                        <!--                        <GridColumn field='isFlashPurchase' title='闪购标志 1:是; 0 否' width="120" align="center"></GridColumn>-->
                        <!--                        <GridColumn field='flashProductor' title='闪购产品审核人员' width="120" align="center"></GridColumn>-->
                        <!--                        <GridColumn field='isJIT' title='是否JIT' width="120" align="center"></GridColumn>-->
                        <!--                        <GridColumn field='isOverseaPurchase' title='全球购标记:属性值为3标识全球购自营商品' width="120" align="center"></GridColumn>-->
                        <!--                        <GridColumn field='spwq' title='美妆物权标记:属性为1则为有美妆物权标识' width="120" align="center"></GridColumn>-->
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
                        <!--                        <GridColumn field='skuList' title='盖亚敏感特有属性' width="120" align="center"></GridColumn>-->
                        <GridColumn field='giftsGoods' title='赠品' width="120" align="center" :sortable="true">
                            <template slot="body" slot-scope="scope">
                                <span v-if="scope.row.giftsGoods===1">是,不可销售</span>
                                <span v-if="scope.row.giftsGoods===2">是,可销售</span>
                                <span v-if="scope.row.giftsGoods===0">否</span>
                            </template>
                        </GridColumn>
                    </DataGrid>
                </LayoutPanel>
                <LayoutPanel region="south" style="height:30%;" bodyCls="f-column" :border="false">
                    <LayoutPanel region="east" style="width:50%;height: 100%" bodyCls="f-column" :border="true">
                        <Panel :bodyStyle="{padding:'0'}" class="f-full" :border="false">
                            <img v-for="img in imgList" :src="'https://img11.360buyimg.com/n1/'+img.path" style="width:20%">
                        </Panel>
                    </LayoutPanel>
                    <LayoutPanel region="center" style="height:100%;width:50%" bodyCls="f-column" :border="true">
                        <Panel :bodyStyle="{padding:'0'}" class="f-full" :border="false">
                            <div class="f-row" style="padding: 5px">
                                <LinkButton iconCls="icon-add" :plain="true" :disabled="!obj.id" @click="linked">新增</LinkButton>
                                <LinkButton iconCls="icon-edit" :disabled="!csObj.id" :plain="true" @click="editCSObj">编辑</LinkButton>
                            </div>
                            <DataGrid :data="commoditySupplier"
                                      class="f-full"
                                      :border="false"
                                      :columnResizing="true"
                                      selectionMode="single"
                                      @selectionChange="selectCSObj($event)">
                                <GridColumn field='suppliername' title='供应商名称' width="200" align="left"></GridColumn>
                                <GridColumn field="lastPurchasePrice" title="采购价" width="120" align="right">
                                    <template slot="body" slot-scope="scope">
                                        <div class="item">
                                            {{ toMoney(scope.row.lastPurchasePrice, '') }}
                                        </div>
                                    </template>
                                </GridColumn>
                                <GridColumn field='remark' title='备注' align="left"></GridColumn>
                            </DataGrid>

                        </Panel>
                    </LayoutPanel>
                </LayoutPanel>

            </Layout>
        </LayoutPanel>

        <Dialog ref="selectUserDlg" closed
                :title="'选择员工'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'40%',height:'40%'}"
                :modal="true">
            <selectOrganizationUser ref="selectOrganizationUserCom" @selectUser="selectUser"></selectOrganizationUser>
        </Dialog>
        <Dialog ref="selectUser1Dlg" closed
                :title="'选择员工'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'40%',height:'40%'}"
                :modal="true">
            <selectOrganizationUser ref="selectOrganizationUserCom" @selectUser="selectAssignUser"></selectOrganizationUser>
        </Dialog>
        <Dialog ref="selectSupplierDlg" closed
                :title="'关联供应商'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'80%',height:'80%'}"
                :modal="true">
            <selectSupplier ref="selectSupplierCom" username="" @selectSupplier="selectSupplier"></selectSupplier>
        </Dialog>
        <Dialog ref="linkedDlg" closed
                :title="'关联供应商'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'300px',height:'400px'}"
                :modal="true">
            <div class="col-12 p-10">
                <label>供应商</label><br>
                <input type="text" v-model="csObj.suppliername" class="form-control" @click="openSupplier">
            </div>
            <div class="col-12 p-10">
                <label>采购价</label><br>
                <input type="text" v-model="csObj.lastPurchasePrice" class="form-control">
            </div>
            <div class="col-12 p-10">
                <label>备注</label><br>
                <textarea rows="5" v-model="csObj.remark" class="form-control" style="height: 80px"></textarea>
            </div>
            <template slot="footer">
                <div class="text-center p-5">
                    <LinkButton class="m-r-10" @click="saveCS">保存</LinkButton>
                    <LinkButton class="m-r-10" @click="removeCS">删除</LinkButton>
                    <LinkButton @click="$refs.linkedDlg.close()">关闭</LinkButton>
                </div>
            </template>
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
            order: 'desc',
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
        this.loadPage(this.pageNumber, this.pageSize);
    },
    components: {
        filterList, selectOrganizationUser, selectSupplier
    },
    methods: {
        sort(obj) {
            if (obj.length > 0) {
                this.field = obj[0].field;
                this.order = obj[0].order;
                this.loadPage(1, this.pageSize);
            }
        },
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
            this.loading = true;
            let vm = this;
            this.$root.getData("commoditynew/getQueryList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: this.field,
                direction: this.order,
                filterString: this.filterString,
                notSupplier: this.notSupplier,
                userid: this.userObj.id
            }, function (data) {
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.$set(e, 'selected', false);
                    vm.tssx.forEach(function (t) {
                        if (t.value === e.packType) {
                            vm.$set(e, 'packTypeName', t.title);
                        }
                    })
                    vm.data.push(e);
                })
                vm.obj = {};
                vm.loading = false;
            })
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
        editObj() {
            sessionStorage.commodityId = this.obj.id;
            sessionStorage.typeId = this.obj.cid1;
            this.$router.push('newCommodity');
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
        loadImgList() {
            let vm = this;
            this.getData("commoditynew/getMainImgList", {wareid: this.obj.wareId}, function (data) {
                vm.imgList = data;
            })
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
                    vm.loadPage(1, vm.pageSize);
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
            this.loadPage(1,this.pageSize);
        },
        selectUser(obj) {
            this.userObj = obj;
            this.$refs.selectUserDlg.close();
            this.loadPage(1, this.pageSize);
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(1, this.pageSize);
        },
        changePageSize(value){
            this.pageSize=value;
            this.loadPage(1, this.pageSize);
        },
        editCSObj() {
            this.$refs.linkedDlg.open();
        },
        selectCSObj(obj) {
            this.csObj = this.clone(obj);
            this.loadCommoditySupplier();
        },
        linked() {
            this.csObj = {
                commodityid: this.obj.id,
                sku: this.obj.wareid
            }
            this.$refs.linkedDlg.open();
        },
        loadCommoditySupplier() {
            let vm = this;
            this.getData("commoditySupplier/getList", {commodityId: this.obj.id}, function (data) {
                vm.commoditySupplier = data;
            })
        },
        openSupplier() {
            this.$refs.selectSupplierDlg.open();
        },
        selectSupplier(obj) {
            this.$set(this.csObj, 'supplierid', obj.id);
            this.$set(this.csObj, 'suppliername', obj.name);
            this.$refs.selectSupplierDlg.close();
        },
        saveCS() {
            let vm = this;
            this.getData("commoditySupplier/save", this.csObj, function (data) {
                vm.$refs.linkedDlg.close();
                vm.loadCommoditySupplier();
            })
        },
        removeCS() {
            let vm = this;
            this.$refs.linkedDlg.close();
            this.confirm("确认吗?", function () {
                vm.getData("commoditySupplier/delete", {id: vm.csObj.id}, function (data) {
                    vm.loadCommoditySupplier();
                })
            })
        },
        add() {
            sessionStorage.removeItem('commodityId');
            sessionStorage.removeItem('typeId');
            this.$router.push('newCommodity');
        },
        addSku() {
            let vm = this;
            this.getData("mainBody/getMainBodyList", {}, function (data) {
                vm.mainBodyList = [];
                data.forEach(function (e) {
                    vm.mainBodyList.push({id: e.id, text: e.name});
                })
                vm.$refs.selectMainBodyDlg.open();
            })
        },
        selectMainBody(obj) {
            this.submitObj.mainBodyId = obj.id;
            let vm = this;
            this.getData("commodityType/getList", {mainBodyId: obj.id}, function (data) {
                vm.typeList = [];
                data.forEach(function (e) {
                    vm.$set(e, 'text', e.name);
                    vm.typeList.push(e);
                })
            })
            this.getData("brand/getList", {mainBodyId: obj.id}, function (data) {
                vm.brandList = [];
                data.forEach(function (e) {
                    vm.$set(e, 'text', e.name);
                    vm.brandList.push(e);
                })
            })
        },
        selectType(obj) {
            this.submitObj.typeId = obj.id;
        },
        selectBrand(obj) {
            this.submitObj.brandId = obj.id;
        },
        changeSupplierSelect(flag) {
            this.total = 0;
            this.pageNumber = 1;
            this.notSupplier = flag;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        reload() {
            let vm = this;
            this.getData("commoditynew/loadSingleCommodity", {wareId: this.obj.wareId, mainBodyId: this.obj.mainBodyId}, function (data) {
                vm.msg(data);
                vm.loadPage(vm.pageNumber, vm.pageSize);
            })
        },
        getCellCss(row, value) {
            if (!value) {
                return {backgroundColor: "#f9d1d1"};
            }
            return null;
        },
        copyObj() {
            let vm = this;
            this.confirm("复制新商品,确认吗?", function () {
                vm.getData("commoditynew/copy", {id: vm.obj.id}, function (data) {
                    vm.loadPage(vm.pageNumber, vm.pageSize);
                })
            })
        },
        deleteObj(){
            let vm = this;
            this.confirm("删除商品,确认吗?", function () {
                vm.getData("commoditynew/delete", {id:vm.obj.id}, function (data) {
                    vm.loadPage(1, vm.pageSize);
                })
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
