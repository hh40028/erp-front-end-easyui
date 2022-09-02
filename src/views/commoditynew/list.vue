<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <div class="pull-right">
                    <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>
                </div>
                <!--                <ButtonGroup selectionMode="single" style="margin-right: 30px">-->
                <!--                    <LinkButton iconCls="icon-add" :toggle="true">新建</LinkButton>-->
                <!--                    <LinkButton iconCls="icon-edit" :disabled="!obj.id" :toggle="true">编辑</LinkButton>-->
                <!--                    <LinkButton iconCls="icon-redo" :toggle="true" @click="changeUser">转出</LinkButton>-->
                <!--                </ButtonGroup>-->
                <!--                <ButtonGroup selectionMode="single">-->
                <!--                    <LinkButton :selected="!notSupplier" @click="changeSupplierSelect(false)">全部</LinkButton>-->
                <!--                    <LinkButton :selected="notSupplier" @click="changeSupplierSelect(true)">无供应商</LinkButton>-->
                <!--                </ButtonGroup>-->
                <!--                <LinkButton style="margin-left: 30px" v-if="!notPage" @click="allShow(true)">全部显示</LinkButton>-->
                <!--                <LinkButton style="margin-left: 30px" v-if="notPage" @click="allShow(false)">分页显示</LinkButton>-->
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
                              :pageNumber="pageNumber"
                              :pageSize="pageSize"
                              :pagePosition="'bottom'">
                        <GridColumn align="center" cellCss="datagrid-td-rownumber" width="50">
                            <template slot="body" slot-scope="scope">
                                {{ scope.rowIndex + 1 }}
                            </template>
                        </GridColumn>
                        <GridColumn field='wareId' title='商品编号' width="120" align="center"></GridColumn>
                        <GridColumn field='name' title='商品名称' width="120" align="center"></GridColumn>
                        <GridColumn field='model' title='型号' width="120" align="center"></GridColumn>
                        <GridColumn field='originalPlace' title='产地' width="120" align="center"></GridColumn>
                        <GridColumn field='upc' title='upc编码' width="120" align="center"></GridColumn>
                        <GridColumn field='packing' title='包装规格([1×N]请填写N的值)' width="120" align="center"></GridColumn>
                        <GridColumn field='skuUnit' title='销售单位(箱、台、个、袋等)' width="120" align="center"></GridColumn>
                        <GridColumn field='packType' title='特殊属性(1:普遍商品,2:易碎品,3:裸装液体,4:带包装液体,5:按原包装出库)' width="120" align="center"></GridColumn>
                        <GridColumn field='pkgInfo' title='包装清单' width="120" align="center"></GridColumn>
                        <GridColumn field='warranty' title='质保' width="120" align="center"></GridColumn>
                        <GridColumn field='shelfLife' title='保质期' width="120" align="center"></GridColumn>
                        <GridColumn field='zhBrand' title='中文品牌' width="120" align="center"></GridColumn>
                        <GridColumn field='enBrand' title='英文品牌' width="120" align="center"></GridColumn>
                        <GridColumn field='webSite' title='官网' width="120" align="center"></GridColumn>
                        <GridColumn field='tel' title='服务电话' width="120" align="center"></GridColumn>
                        <GridColumn field='length' title='长' width="120" align="center"></GridColumn>
                        <GridColumn field='width' title='宽' width="120" align="center"></GridColumn>
                        <GridColumn field='height' title='高' width="120" align="center"></GridColumn>
                        <GridColumn field='weight' title='重量 (单位:kg(公斤)含包装)' width="120" align="center"></GridColumn>
                        <GridColumn field='marketPrice' title='市场价(小数点后保留2位)' width="120" align="center"></GridColumn>
                        <GridColumn field='purchasePrice' title='采购价(小数点后保留2位)' width="120" align="center"></GridColumn>
                        <GridColumn field='memberPrice' title='京东价(小数点后保留2位)' width="120" align="center"></GridColumn>
                        <GridColumn field='brandId' title='品牌id' width="120" align="center"></GridColumn>
                        <GridColumn field='brandName' title='品牌名称' width="120" align="center"></GridColumn>
                        <GridColumn field='cid1' title='三级分类(第一分类)id' width="120" align="center"></GridColumn>
                        <GridColumn field='cidName1' title='三级分类中文名' width="120" align="center"></GridColumn>
                        <GridColumn field='subCategories' title='三级分类' width="120" align="center"></GridColumn>
                        <GridColumn field='salerCode' title='销售员简码' width="120" align="center"></GridColumn>
                        <GridColumn field='salerName' title='销售员名称' width="120" align="center"></GridColumn>
                        <GridColumn field='purchaserCode' title='采购员简码' width="120" align="center"></GridColumn>
                        <GridColumn field='purchaserName' title='采购员名称' width="120" align="center"></GridColumn>
                        <GridColumn field='vendorCode' title='供应商简码' width="120" align="center"></GridColumn>
                        <GridColumn field='vendorName' title='供应商名称' width="120" align="center"></GridColumn>
                        <GridColumn field='fullCategoryName1' title='第一分类全路径名称' width="120" align="center"></GridColumn>
                        <GridColumn field='wreadme' title='规格参数(编辑器方式)' width="120" align="center"></GridColumn>
                        <GridColumn field='propInfosList' title='规格参数' width="120" align="center"></GridColumn>
                        <GridColumn field='extPropIInfosList' title='拓展属性' width="120" align="center"></GridColumn>
                        <GridColumn field='introHtml' title='pc商品介绍html模式' width="120" align="center"></GridColumn>
                        <GridColumn field='introMobile' title='移动端商品介绍html模式' width="120" align="center"></GridColumn>
                        <GridColumn field='pcTemplateHtml' title='pc端模板转换的html' width="120" align="center"></GridColumn>
                        <GridColumn field='pcDecorationHtml' title='pc端装吧转换的html' width="120" align="center"></GridColumn>
                        <GridColumn field='mobileDecorationHtml' title='移动端装吧转换的html' width="120" align="center"></GridColumn>
                        <GridColumn field='videoId' title='视频编号' width="120" align="center"></GridColumn>
                        <GridColumn field='title' title='标题' width="120" align="center"></GridColumn>
                        <GridColumn field='modifyTime' title='更改时间' width="120" align="center"></GridColumn>
                        <GridColumn field='issn' title='是否序列号管理' width="120" align="center"></GridColumn>
                        <GridColumn field='service' title='服务' width="120" align="center"></GridColumn>
                        <GridColumn field='salesRatio' title='销售比例' width="120" align="center"></GridColumn>
                        <GridColumn field='aftersales' title='售后' width="120" align="center"></GridColumn>
                        <GridColumn field='catalogerCode' title='上柜员简码' width="120" align="center"></GridColumn>
                        <GridColumn field='catalogerName' title='上柜员姓名' width="120" align="center"></GridColumn>
                        <GridColumn field='salerDeptId' title='采销岗id' width="120" align="center"></GridColumn>
                        <GridColumn field='salerDeptName' title='采销岗名称' width="120" align="center"></GridColumn>
                        <GridColumn field='stores' title='库房信息' width="120" align="center"></GridColumn>
                        <GridColumn field='itemNum' title='货号' width="120" align="center"></GridColumn>
                        <GridColumn field='isFlashPurchase' title='闪购标志 1:是; 0 否' width="120" align="center"></GridColumn>
                        <GridColumn field='flashProductor' title='闪购产品审核人员' width="120" align="center"></GridColumn>
                        <GridColumn field='isJIT' title='是否JIT' width="120" align="center"></GridColumn>
                        <GridColumn field='isOverseaPurchase' title='全球购标记:属性值为3标识全球购自营商品' width="120" align="center"></GridColumn>
                        <GridColumn field='spwq' title='美妆物权标记:属性为1则为有美妆物权标识' width="120" align="center"></GridColumn>
                        <GridColumn field='dangerGoods' title='是否危险品' width="120" align="center"></GridColumn>
                        <GridColumn field='afterSaleDesc' title='售后保障' width="120" align="center"></GridColumn>
                        <GridColumn field='storeProperty' title='冷链标记(1:控温(10 -18);2:冷藏(0-8);3:冷冻(零下12- 零下18);4:深冷(零下30);6:产地直送;7:鲜品(冷藏存常温配);0或null:未设置)' width="120" align="center"></GridColumn>
                        <GridColumn field='designConcept' title='设计理念' width="120" align="center"></GridColumn>
                        <GridColumn field='sysp' title='试用品标识[0:否 1:是]' width="120" align="center"></GridColumn>
                        <GridColumn field='skuList' title='盖亚敏感特有属性' width="120" align="center"></GridColumn>
                        <GridColumn field='giftsGoods' title='赠品标识[0:否 1:是不可销售 2:是可销售]' width="120" align="center"></GridColumn>
                        <GridColumn field='productOilInt' title='成品油容量(正数,如果填写小数,小数位数长度不能超过6位)' width="120" align="center"></GridColumn>
                        <GridColumn field='productOilUnit' title='成品油单位[大写的L(升)或者大写的T(吨)]' width="120" align="center"></GridColumn>
                        <GridColumn field='userid' title='负责人编号' width="120" align="center"></GridColumn>
                    </DataGrid>
                </LayoutPanel>
                <LayoutPanel region="south" style="height:30%;" bodyCls="f-column" :border="false">
                    <!--                    <Tabs :plain="false" :narrow="false" :justified="false" style="height:100%">-->
                    <!--                        <TabPanel :title="'供应商关联'">-->
                    <!--                            <Layout bodyCls="f-column" style="width:100%;height:100%;" :border="false">-->
                    <!--                                <LayoutPanel region="north" style="height:40px;" :border="false">-->
                    <!--                                    <div class="f-row" style="padding: 5px">-->
                    <!--                                        <LinkButton iconCls="icon-add" :plain="true" :disabled="!obj.id" @click="linked">新增</LinkButton>-->
                    <!--                                        <LinkButton iconCls="icon-edit" :disabled="!csObj.id" :plain="true" @click="editCSObj">编辑</LinkButton>-->
                    <!--                                    </div>-->
                    <!--                                </LayoutPanel>-->
                    <!--                                <LayoutPanel region="center" style="height:100%;" bodyCls="f-column" :border="false">-->
                    <!--                                    <DataGrid :data="commoditySupplier"-->
                    <!--                                              class="f-full"-->
                    <!--                                              :border="false"-->
                    <!--                                              :columnResizing="true"-->
                    <!--                                              selectionMode="single"-->
                    <!--                                              @selectionChange="selectCSObj($event)">-->
                    <!--                                        <GridColumn field='suppliername' title='供应商名称' width="320" align="left"></GridColumn>-->
                    <!--                                        &lt;!&ndash;                                <GridColumn field='wareid' title='商品编号' width="120" align="center"></GridColumn>&ndash;&gt;-->
                    <!--                                        &lt;!&ndash;                                <GridColumn field='commodityname' title='商品名称' align="center"></GridColumn>&ndash;&gt;-->
                    <!--                                        &lt;!&ndash;                                <GridColumn field='zh_brand' title='品牌' width="120" align="center"></GridColumn>&ndash;&gt;-->
                    <!--                                        <GridColumn field="lastPurchasePrice" title="采购价" width="120" align="right">-->
                    <!--                                            <template slot="body" slot-scope="scope">-->
                    <!--                                                <div class="item">-->
                    <!--                                                    {{ toMoney(scope.row.lastPurchasePrice, '') }}-->
                    <!--                                                </div>-->
                    <!--                                            </template>-->
                    <!--                                        </GridColumn>-->
                    <!--                                        <GridColumn field='remark' title='备注' align="left"></GridColumn>-->
                    <!--                                    </DataGrid>-->
                    <!--                                </LayoutPanel>-->
                    <!--                            </Layout>-->
                    <!--                        </TabPanel>-->
                    <!--                    </Tabs>-->
                </LayoutPanel>

            </Layout>
        </LayoutPanel>
    </Layout>
</template>

<script>
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
            obj: {},
            timeout: null,
            field: 'id',
            order: 'asc'
        }
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
    },
    methods: {
        sort(obj) {
            if (obj.length > 0) {
                this.field = obj[0].field;
                this.order = obj[0].order;
                this.loadPage(this.pageNumber, this.pageSize);
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
                filterString: this.filterString
            }, function (data) {
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.$set(e, 'selected', false);
                    vm.data.push(e);
                })
                vm.obj = {};
                vm.loading = false;
            })
        },
    }
}
</script>

<style scoped>

</style>
