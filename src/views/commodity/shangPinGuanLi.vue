<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <div class="pull-right">
                    <filterList @filterLoad="filter"></filterList>
                </div>

                <ButtonGroup selectionMode="single">
                    <LinkButton :selected="!notSupplier" @click="changeSupplierSelect(false)">全部</LinkButton>
                    <LinkButton :selected="notSupplier" @click="changeSupplierSelect(true)">无供应商</LinkButton>
                </ButtonGroup>

            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                      class="f-full"
                      :columnResizing="true"
                      :lazy="true"
                      :total="total"
                      selectionMode="single"
                      :loading="loading"
                      @selectionChange="selectObj($event)"
                      :pageNumber="pageNumber"
                      :pageSize="pageSize"
                      @pageChange="onPageChange($event)"
                      :pagination="true"
                      :pagePosition="'bottom'">
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30" :frozen="true">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <GridColumn field='wareid' title='商品编号' width="120" align="center" :frozen="true"></GridColumn>
                <GridColumn field='name' title='商品名称' width="220" align="left"></GridColumn>
                <!--                        <GridColumn field='supplierWarehouseName' title='仓库名称' width="120" align="center"></GridColumn>-->
                <!--                        <GridColumn field='logisticsTypeName' title='物流类型' width="120" align="center"></GridColumn>-->
                <GridColumn field='cid1' title='第一分类ID' width="120" align="center"></GridColumn>
                <GridColumn field='brand_id' title='品牌ID' width="120" align="center"></GridColumn>
                <GridColumn field='zh_brand' title='中文品牌' width="120" align="center"></GridColumn>
                <GridColumn field='en_brand' title='英文品牌' width="120" align="center"></GridColumn>
                <GridColumn field='model' title='商品型号' width="120" align="center"></GridColumn>
                <GridColumn field='original_place' title='产地' width="120" align="center"></GridColumn>
                <GridColumn field='warranty' title='质保' width="120" align="center"></GridColumn>
                <GridColumn field='saler_code' title='销售员简码' width="120" align="center"></GridColumn>
                <GridColumn field='purchaser_code' title='采购员简码' width="120" align="center"></GridColumn>
                <GridColumn field='pack_type' title='特殊属性' width="120" align="center"></GridColumn>
                <GridColumn field='sku_unit' title='销售单位' width="120" align="center"></GridColumn>
                <GridColumn field='pkg_info' title='包装清单' width="120" align="center"></GridColumn>
                <GridColumn field='market_price' title='市场价' width="120" align="right"></GridColumn>
                <GridColumn field='purchase_price' title='采购价' width="120" align="right"></GridColumn>
                <GridColumn field='member_price' title='京东价' width="120" align="right"></GridColumn>
                <GridColumn field='sale_state_name' title='上柜' width="40" align="center"></GridColumn>
            </DataGrid>
            <Dialog ref="d1" closed
                    :title="'编辑商品信息'"
                    :dialogStyle="{width:'80%',height:'80vh'}"
                    :modal="true">
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>商品编号</label><br>
                    <input type="text" v-model="obj.wareid" class="form-control" disabled>
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>商品名称</label><br>
                    <input type="text" v-model="obj.name" class="form-control" :class="{'b-red':!obj.name}">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>第一分类ID（三级分类）</label><br>
                    <input type="text" v-model="obj.cid1" class="form-control" :class="{'b-red':!obj.cid1}">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>末级分类</label><br>
                    <input type="text" v-model="obj.leaf_cid" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>品牌ID</label><br>
                    <input type="text" v-model="obj.brand_id" class="form-control" :class="{'b-red':!obj.brand_id}">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>中文品牌</label><br>
                    <input type="text" v-model="obj.zh_brand" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>英文品牌</label><br>
                    <input type="text" v-model="obj.en_brand" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>商品型号</label><br>
                    <input type="text" v-model="obj.model" class="form-control" :class="{'b-red':!obj.model}">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>服务电话</label><br>
                    <input type="text" v-model="obj.tel" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>官方网址</label><br>
                    <input type="text" v-model="obj.web_site" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>产地</label><br>
                    <input type="text" v-model="obj.original_place" class="form-control" :class="{'b-red':!obj.original_place}">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>质保（最多可输入6个汉字）</label><br>
                    <input type="text" v-model="obj.warranty" class="form-control" :class="{'b-red':!obj.warranty}">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>保质期(单位：天)</label><br>
                    <input type="text" v-model="obj.shelf_life" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>商品重量(单位：千克，含包装)</label><br>
                    <input type="text" v-model="obj.weight" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>长度(单位：毫米，含包装)</label><br>
                    <input type="text" v-model="obj.length" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>宽度(单位：毫米，含包装)</label><br>
                    <input type="text" v-model="obj.width" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>高度(单位：毫米，含包装)</label><br>
                    <input type="text" v-model="obj.height" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>市场价（小数点后保留2位）</label><br>
                    <input type="text" v-model="obj.market_price" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>采购价（小数点后保留2位）</label><br>
                    <input type="text" v-model="obj.purchase_price" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>京东价（小数点后保留2位）</label><br>
                    <input type="text" v-model="obj.member_price" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>销售员简码</label><br>
                    <input type="text" v-model="obj.saler_code" class="form-control" :class="{'b-red':!obj.saler_code}">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>采购员简码</label><br>
                    <input type="text" v-model="obj.purchaser_code" class="form-control" :class="{'b-red':!obj.purchaser_code}">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>UPC编码（只包含字母和数字）</label><br>
                    <input type="text" v-model="obj.upc" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>包装规格</label><br>
                    <input type="text" v-model="obj.packing" class="form-control" title="[1×N]请填写N的值">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>特殊属性</label><br>
                    <input type="text" v-model="obj.pack_type" class="form-control" :class="{'b-red':!obj.pack_type}" title="1:普通商品，2:易碎品，3:裸装液体，4:带包装液体，5:按原包装出库">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>销售单位</label><br>
                    <input type="text" v-model="obj.sku_unit" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>包装清单</label><br>
                    <input type="text" v-model="obj.pkg_info" class="form-control" :class="{'b-red':!obj.pkg_info}" title="格式：USB线 × 1、AV线 × 1、配带 × 1、说明书 × 1、保修卡 × 1 ，最多可录入20000个字符">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>货号</label><br>
                    <input type="text" v-model="obj.item_num" class="form-control" title="货号不能包括中文，只能为英文或数字">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>PC端代码录入的商品介绍</label><br>
                    <input type="text" v-model="obj.intro_html" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>Mobile端代码录入的商品介绍</label><br>
                    <input type="text" v-model="obj.intro_mobile" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>视频介绍编号</label><br>
                    <input type="text" v-model="obj.video_id" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>危险品的值</label><br>
                    <input type="text" v-model="obj.danger_value" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>试用品标识[0:否 1:是]</label><br>
                    <input type="text" v-model="obj.sysp" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>冷链标记</label><br>
                    <input type="text" v-model="obj.store_property" class="form-control" title="1：控温（10 -18℃）;2：冷藏（0-8 ℃）;3：冷冻（零下12- 零下18 ℃）;4：深冷（零下30 ℃ ）;6:产地直送;7：鲜品（冷藏存常温配）;0或null：未设置">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>成品油容量</label><br>
                    <input type="text" v-model="obj.product_oil_number" class="form-control" title="正数，如果填写小数，小数位数长度不能超过6位">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>成品油单位</label><br>
                    <input type="text" v-model="obj.product_oil_unit" class="form-control" title="大写的'L'(升)或者大写的'T'(吨)">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>赠品标识</label><br>
                    <input type="text" v-model="obj.gifts_goods" class="form-control" title="[0:否 1:是不可销售 2：是可销售]">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>设计理念</label><br>
                    <input type="text" v-model="obj.design_concept" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>是否需要电子监管码</label><br>
                    <input type="text" v-model="obj.has_transfer_elec_code" class="form-control" title="[0:不需要 1:需要]">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>售后保障</label><br>
                    <input type="text" v-model="obj.after_sale_desc" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>规格参数手工录入文本</label><br>
                    <input type="text" v-model="obj.wreadme" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>规格参数ID</label><br>
                    <input type="text" v-model="obj.prop_id" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>单选属性值ID</label><br>
                    <input type="text" v-model="obj.prop_vid" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>数值/文本内容/单选备注</label><br>
                    <input type="text" v-model="obj.prop_remark" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>单选别名</label><br>
                    <input type="text" v-model="obj.prop_alias" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>复选的属性值ID</label><br>
                    <input type="text" v-model="obj.prop_values" class="form-control" title="以英文分号分隔">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>扩展属性ID</label><br>
                    <input type="text" v-model="obj.ext_id" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>扩展属性单选或者复选的属性值ID</label><br>
                    <input type="text" v-model="obj.ext_values" class="form-control" title="以英文分号分隔">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>单选属性别名</label><br>
                    <input type="text" v-model="obj.ext_alias" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>数值</label><br>
                    <input type="text" v-model="obj.ext_remark" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>商品名称</label><br>
                    <input type="text" v-model="obj.sku_name_gaea" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>第一维度销售属性值 </label><br>
                    <input type="text" v-model="obj.dim1_val_gaea" class="form-control" title="属性名参见接口jingdong.vc.item.saleAttributeSettings.get">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>第一维度销售属顺序</label><br>
                    <input type="text" v-model="obj.dim1_sort_gaea" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>第二维度销售属性值 </label><br>
                    <input type="text" v-model="obj.dim2_val_gaea" class="form-control" title="属性名参见接口jingdong.vc.item.saleAttributeSettings.get">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>第二维度销售属性顺序</label><br>
                    <input type="text" v-model="obj.dim2_sort_gaea" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>高维销售属性</label><br>
                    <input type="text" v-model="obj.other_sale_attribute_gaea" class="form-control" title="格式:dim.value.sequence;dim.value.sequence 字段含义:dim-维度值整数 value-属性值 sequence-顺序 必须按照dim顺序填写 维度信息参见接口jingdong.vc.item.saleAttributeSettings.get">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>市场价</label><br>
                    <input type="text" v-model="obj.market_price_gaea" class="form-control" title="小数点后保留2位">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>采购价</label><br>
                    <input type="text" v-model="obj.purchase_price_gaea" class="form-control" title="小数点后保留2位">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>京东价</label><br>
                    <input type="text" v-model="obj.member_price_gaea" class="form-control" title="小数点后保留2位">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>单位:千克</label><br>
                    <input type="text" v-model="obj.weight_gaea" class="form-control" title="含包装 最多输入9位，保留小数点后三位数字">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>长度 单位:毫米</label><br>
                    <input type="text" v-model="obj.length_gaea" class="form-control" title="含包装 必须是正整数，最多输入9位">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>宽度 单位:毫米</label><br>
                    <input type="text" v-model="obj.width_gaea" class="form-control" title="含包装 必须是正整数，最多输入9位">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>高度 单位:毫米</label><br>
                    <input type="text" v-model="obj.height_gaea" class="form-control" title="含包装 必须是正整数，最多输入9位">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>upc编码</label><br>
                    <input type="text" v-model="obj.upc_gaea" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>货号</label><br>
                    <input type="text" v-model="obj.item_num_gaea" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>资质类型</label><br>
                    <input type="text" v-model="obj.type" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>3c证书委托人</label><br>
                    <input type="text" v-model="obj.applicant" class="form-control" title="跟entCode字段互斥">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>3c证书编号</label><br>
                    <input type="text" v-model="obj.qc_code" class="form-control">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>资质到期日期</label><br>
                    <DateBox inputId="d2" v-model="obj.end_dat" format="yyyy-MM-dd" style="width: 100%" :editable="false"></DateBox>
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>资质文件key列表</label><br>
                    <input type="text" v-model="obj.file_key_list" class="form-control" title="多个key中间用英文分号[;]进行分隔">
                </div>
                <div class="col-3 p-t-15 p-l-15 p-r-15">
                    <label>统一社会信用代码</label><br>
                    <input type="text" v-model="obj.ent_code" class="form-control" title="境内企业:统一社会信用代码 境外企业:使用固定特殊字符 000；前端填写校验规则：18位，由数字英文大小写组合（纯数字、纯大写英文、纯小写英文）； 国家查询网址： 国家企业信用信息公示系统 http://www.gsxt.gov.cn/index.html 信用中国 https://www.creditchina.gov.cn/">
                </div>
                <template slot="footer">
                    <div class="text-center p-5">
                        <LinkButton class="m-r-10" iconCls="icon-save" @click="save">保存</LinkButton>
                        <LinkButton iconCls="icon-cancel" @click="$refs.d1.close()">关闭</LinkButton>
                    </div>
                </template>
            </Dialog>
        </LayoutPanel>
        <LayoutPanel region="south" style="height:30%;" bodyCls="f-column" :border="false">
            <Tabs :plain="false" :narrow="false" :justified="false" style="height:100%">
                <TabPanel :title="'商品详细信息'">
                    <Panel class="f-full" :border="false">
                        <table style="width:100%">
                            <tbody>
                            <tr>
                                <th class="text-right th">商品编号</th>
                                <td class="text-left td">{{ obj.wareid }}</td>
                                <th class="text-right th">商品名称</th>
                                <td class="text-left td">{{ obj.name }}</td>
                                <th class="text-right th">供应仓库</th>
                                <td class="text-left td">{{ obj.supplierWarehouseName }}</td>
                                <th class="text-right th">物流类型</th>
                                <td class="text-left td">{{ obj.logisticsTypeName }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">第一分类</th>
                                <td class="text-left td">{{ obj.cid1 }}</td>
                                <th class="text-right th">末级分类</th>
                                <td class="text-left td">{{ obj.leaf_cid }}</td>
                                <th class="text-right th">品牌ID</th>
                                <td class="text-left td">{{ obj.brand_id }}</td>
                                <th class="text-right th">中文品牌</th>
                                <td class="text-left td">{{ obj.zh_brand }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">英文品牌</th>
                                <td class="text-left td">{{ obj.en_brand }}</td>
                                <th class="text-right th">商品型号</th>
                                <td class="text-left td">{{ obj.model }}</td>
                                <th class="text-right th">服务电话</th>
                                <td class="text-left td">{{ obj.tel }}</td>
                                <th class="text-right th">官方网址</th>
                                <td class="text-left td">{{ obj.web_site }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">产地</th>
                                <td class="text-left td">{{ obj.original_place }}</td>
                                <th class="text-right th">质保</th>
                                <td class="text-left td">{{ obj.warranty }}</td>
                                <th class="text-right th">保质期(单位：天)</th>
                                <td class="text-left td">{{ obj.shelf_life }}</td>
                                <th class="text-right th">商品重量</th>
                                <td class="text-left td">{{ obj.weight }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">长度</th>
                                <td class="text-left td">{{ obj.length }}</td>
                                <th class="text-right th">宽度</th>
                                <td class="text-left td">{{ obj.width }}</td>
                                <th class="text-right th">高度</th>
                                <td class="text-left td">{{ obj.height }}</td>
                                <th class="text-right th">市场价</th>
                                <td class="text-left td">{{ obj.market_price }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">采购价</th>
                                <td class="text-left td">{{ obj.purchase_price }}</td>
                                <th class="text-right th">京东价</th>
                                <td class="text-left td">{{ obj.member_price }}</td>
                                <th class="text-right th">销售员简码</th>
                                <td class="text-left td">{{ obj.saler_code }}</td>
                                <th class="text-right th">采购员简码</th>
                                <td class="text-left td">{{ obj.purchaser_code }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">UPC编码</th>
                                <td class="text-left td">{{ obj.upc }}</td>
                                <th class="text-right th">包装规格</th>
                                <td class="text-left td">{{ obj.packing }}</td>
                                <th class="text-right th">特殊属性</th>
                                <td class="text-left td">{{ obj.pack_type }}</td>
                                <th class="text-right th">销售单位</th>
                                <td class="text-left td">{{ obj.sku_unit }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">包装清单</th>
                                <td class="text-left td">{{ obj.pkg_info }}</td>
                                <th class="text-right th">货号</th>
                                <td class="text-left td">{{ obj.item_num }}</td>
                                <th class="text-right th">危险品的值</th>
                                <td class="text-left td">{{ obj.danger_value }}</td>
                                <th class="text-right th">试用品标识</th>
                                <td class="text-left td">{{ obj.sysp }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">冷链标记</th>
                                <td class="text-left td">{{ obj.store_property }}</td>
                                <th class="text-right th">成品油容量</th>
                                <td class="text-left td">{{ obj.product_oil_number }}</td>
                                <th class="text-right th">成品油单位</th>
                                <td class="text-left td">{{ obj.product_oil_unit }}</td>
                                <th class="text-right th">赠品标识</th>
                                <td class="text-left td">{{ obj.gifts_goods }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">设计理念</th>
                                <td class="text-left td">{{ obj.design_concept }}</td>
                                <th class="text-right th">是否需要电子监管码</th>
                                <td class="text-left td">{{ obj.has_transfer_elec_code }}</td>
                                <th class="text-right th">售后保障</th>
                                <td class="text-left td">{{ obj.after_sale_desc }}</td>
                                <th class="text-right th">规格参数手工录入文本</th>
                                <td class="text-left td">{{ obj.wreadme }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">规格参数ID</th>
                                <td class="text-left td">{{ obj.prop_id }}</td>
                                <th class="text-right th">单选属性值ID</th>
                                <td class="text-left td">{{ obj.prop_vid }}</td>
                                <th class="text-right th">数值/文本内容/单选备注</th>
                                <td class="text-left td">{{ obj.prop_remark }}</td>
                                <th class="text-right th">单选别名</th>
                                <td class="text-left td">{{ obj.prop_alias }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">复选的属性值</th>
                                <td class="text-left td">{{ obj.prop_values }}</td>
                                <th class="text-right th">扩展属性ID</th>
                                <td class="text-left td">{{ obj.ext_id }}</td>
                                <th class="text-right th">扩展属性单选</th>
                                <td class="text-left td">{{ obj.ext_values }}</td>
                                <th class="text-right th">单选属性别名</th>
                                <td class="text-left td">{{ obj.ext_alias }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">数值</th>
                                <td class="text-left td">{{ obj.ext_remark }}</td>
                                <th class="text-right th">商品名称</th>
                                <td class="text-left td">{{ obj.sku_name_gaea }}</td>
                                <th class="text-right th">第一维度销售属性值</th>
                                <td class="text-left td">{{ obj.dim1_val_gaea }}</td>
                                <th class="text-right th">第一维度销售属顺序</th>
                                <td class="text-left td">{{ obj.dim1_sort_gaea }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">第二维度销售属性值</th>
                                <td class="text-left td">{{ obj.dim2_val_gaea }}</td>
                                <th class="text-right th">第二维度销售属性顺序</th>
                                <td class="text-left td">{{ obj.dim2_sort_gaea }}</td>
                                <th class="text-right th">高维销售属性格式</th>
                                <td class="text-left td">{{ obj.other_sale_attribute_gaea }}</td>
                                <th class="text-right th">市场价</th>
                                <td class="text-left td">{{ obj.market_price_gaea }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">采购价</th>
                                <td class="text-left td">{{ obj.purchase_price_gaea }}</td>
                                <th class="text-right th">京东价</th>
                                <td class="text-left td">{{ obj.member_price_gaea }}</td>
                                <th class="text-right th">单位:千克</th>
                                <td class="text-left td">{{ obj.weight_gaea }}</td>
                                <th class="text-right th">长度 单位:毫米</th>
                                <td class="text-left td">{{ obj.length_gaea }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">宽度 单位:毫米</th>
                                <td class="text-left td">{{ obj.width_gaea }}</td>
                                <th class="text-right th">高度 单位:毫米</th>
                                <td class="text-left td">{{ obj.height_gaea }}</td>
                                <th class="text-right th">upc编码</th>
                                <td class="text-left td">{{ obj.upc_gaea }}</td>
                                <th class="text-right th">货号</th>
                                <td class="text-left td">{{ obj.item_num_gaea }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">资质类型</th>
                                <td class="text-left td">{{ obj.type }}</td>
                                <th class="text-right th">3c证书委托人</th>
                                <td class="text-left td">{{ obj.applicant }}</td>
                                <th class="text-right th">3c证书编号</th>
                                <td class="text-left td">{{ obj.qc_code }}</td>
                                <th class="text-right th">资质到期日期</th>
                                <td class="text-left td">{{ obj.end_date }}</td>
                            </tr>
                            <tr>
                                <th class="text-right th">资质文件key列表</th>
                                <td class="text-left td">{{ obj.file_key_list }}</td>
                                <th class="text-right th">统一社会信用代码</th>
                                <td class="text-left td">{{ obj.ent_code }}</td>
                                <th class="text-right th">上下柜状态</th>
                                <td class="text-left td">{{ obj.sale_state }}</td>
                                <th class="text-right th">修改时间</th>
                            </tr>
                            </tbody>
                        </table>
                        <!--                        <DataGrid :data="viewObj" :border="false"-->
                        <!--                                  :columnResizing="true"-->
                        <!--                                  class="f-full">-->
                        <!--                            <GridColumn field='sale_state_name' title='上柜状态' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='wareid' title='商品编号' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='name' title='商品名称' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='cid1' title='第一分类' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='leaf_cid' title='末级分类' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='zh_brand' title='中文品牌' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='en_brand' title='英文品牌' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='model' title='商品型号' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='tel' title='服务电话' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='web_site' title='官方网址' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='original_place' title='产地' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='warranty' title='质保' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='shelf_life' title='保质期' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='weight' title='商品重量(单位：千克，含包装)' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='length' title='长度(单位：毫米，含包装)' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='width' title='宽度(单位：毫米，含包装)' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='height' title='高度(单位：毫米，含包装)' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='market_price' title='市场价' width="120" align="right"></GridColumn>-->
                        <!--                            <GridColumn field='purchase_price' title='采购价' width="120" align="right"></GridColumn>-->
                        <!--                            <GridColumn field='member_price' title='京东价' width="120" align="right"></GridColumn>-->
                        <!--                            <GridColumn field='saler_code' title='销售员简码' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='purchaser_code' title='采购员简码' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='upc' title='UPC编码' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='packing' title='包装规格' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='pack_type' title='特殊属性' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='sku_unit' title='销售单位（必须为VC接口提供的销售单位）' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='pkg_info' title='包装清单' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='item_num' title='货号' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='intro_html' title='PC端代码录入的商品介绍' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='intro_mobile' title='Mobile端代码录入的商品介绍' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='video_id' title='视频介绍编号' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='danger_value' title='危险品的值' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='sysp' title='试用品标识' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='store_property' title='冷链标记' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='product_oil_number' title='成品油容量' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='product_oil_unit' title='成品油单位' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='gifts_goods' title='赠品标识' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='design_concept' title='设计理念' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='has_transfer_elec_code' title='是否需要电子监管码' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='after_sale_desc' title='售后保障' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='wreadme' title='规格参数手工录入文本' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='prop_id' title='规格参数ID' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='prop_vid' title='单选属性值ID' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='prop_remark' title='数值/文本内容/单选备注' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='prop_alias' title='单选别名' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='prop_values' title='复选的属性值ID,以英文分号分隔' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='ext_id' title='扩展属性ID' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='ext_values' title='扩展属性单选' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='ext_alias' title='单选属性别名' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='ext_remark' title='数值' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='sku_name_gaea' title='商品名称' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='dim1_val_gaea' title='第一维度销售属性值' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='dim1_sort_gaea' title='第一维度销售属顺序' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='dim2_val_gaea' title='第二维度销售属性值' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='dim2_sort_gaea' title='第二维度销售属性顺序' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='other_sale_attribute_gaea' title='高维销售属性格式' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='market_price_gaea' title='市场价' width="120" align="right"></GridColumn>-->
                        <!--                            <GridColumn field='purchase_price_gaea' title='采购价' width="120" align="right"></GridColumn>-->
                        <!--                            <GridColumn field='member_price_gaea' title='京东价' width="120" align="right"></GridColumn>-->
                        <!--                            <GridColumn field='weight_gaea' title='单位:千克,含包装' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='length_gaea' title='长度 单位:毫米,含包装' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='width_gaea' title='宽度 单位:毫米,含包装' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='height_gaea' title='高度 单位:毫米,含包装' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='upc_gaea' title='upc编码' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='item_num_gaea' title='货号' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='type' title='资质类型' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='applicant' title='3c证书委托人' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='qc_code' title='3c证书编号' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='end_date' title='资质到期日期' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='file_key_list' title='资质文件key列表' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='ent_code' title='统一社会信用代码' width="120" align="center"></GridColumn>-->
                        <!--                            <GridColumn field='modify_time' title='修改时间' width="120" align="center"></GridColumn>-->
                        <!--                        </DataGrid>-->
                    </Panel>
                </TabPanel>
                <TabPanel :title="'供应商关联'">
                    <Layout bodyCls="f-column" style="width:100%;height:100%;" :border="false">
                        <LayoutPanel region="north" style="height:40px;" :border="false">
                            <div class="f-row" style="line-height: 40px">
                                <LinkButton iconCls="icon-add" :plain="true" :disabled="!obj.id" @click="linked">新建</LinkButton>
                                <LinkButton iconCls="icon-edit" :disabled="!csObj.id" :plain="true" @click="editCSObj">编辑</LinkButton>
                            </div>
                        </LayoutPanel>
                        <LayoutPanel region="center" style="height:100%;" bodyCls="f-column" :border="false">
                            <DataGrid :data="commoditySupplier"
                                      class="f-full"
                                      :border="false"
                                      :columnResizing="true"
                                      selectionMode="single"
                                      @selectionChange="selectCSObj($event)">
                                <GridColumn field='suppliername' title='供应商名称' width="120" align="center"></GridColumn>
                                <GridColumn field='wareid' title='商品编号' width="120" align="center"></GridColumn>
                                <GridColumn field='commodityname' title='商品名称' align="center"></GridColumn>
                                <GridColumn field='zh_brand' title='品牌' width="120" align="center"></GridColumn>
                                <GridColumn field='supplierid' title='供应商编号' width="120" align="center"></GridColumn>

                                <GridColumn field="finalPurchasePrice" title="最后采购价" align="right">
                                    <template slot="body" slot-scope="scope">
                                        <div class="item">
                                            {{ toMoney(scope.row.finalPurchasePrice, '') }}
                                        </div>
                                    </template>
                                </GridColumn>
                                <GridColumn field="lastPurchasePrice" title="上次采购价" align="right">
                                    <template slot="body" slot-scope="scope">
                                        <div class="item">
                                            {{ toMoney(scope.row.lastPurchasePrice, '') }}
                                        </div>
                                    </template>
                                </GridColumn>
                                <GridColumn field="lowestPurchasePrice" title="最低采购价" align="right">
                                    <template slot="body" slot-scope="scope">
                                        <div class="item">
                                            {{ toMoney(scope.row.lowestPurchasePrice, '') }}
                                        </div>
                                    </template>
                                </GridColumn>
                                <GridColumn field="retailPrice" title="零售价" align="right">
                                    <template slot="body" slot-scope="scope">
                                        <div class="item">
                                            {{ toMoney(scope.row.retailPrice, '') }}
                                        </div>
                                    </template>
                                </GridColumn>
                                <GridColumn field='remark' title='备注' width="120" align="center"></GridColumn>
                            </DataGrid>
                        </LayoutPanel>
                    </Layout>
                </TabPanel>
            </Tabs>
        </LayoutPanel>

        <Dialog ref="linkedDlg" closed
                :title="'关联供应商'"
                :dialogStyle="{width:'60vW',height:'360px'}"
                :modal="true">
            <div class="col-4 p-t-15 p-l-15 p-r-15">
                <label>商品编号</label><br>
                <input type="text" v-model="csObj.wareid" readonly class="form-control">
            </div>
            <div class="col-4 p-t-15 p-l-15 p-r-15">
                <label>供应商</label><br>
                <input type="text" v-model="csObj.suppliername" class="form-control" @click="openSupplier">
            </div>
            <div class="col-4 p-t-15 p-l-15 p-r-15">
                <label>最后采购价</label><br>
                <input type="text" v-model="csObj.finalPurchasePrice" class="form-control">
            </div>
            <div class="col-4 p-t-15 p-l-15 p-r-15">
                <label>上次采购价</label><br>
                <input type="text" v-model="csObj.lastPurchasePrice" class="form-control">
            </div>
            <div class="col-4 p-t-15 p-l-15 p-r-15">
                <label>最低采购价</label><br>
                <input type="text" v-model="csObj.lowestPurchasePrice" class="form-control">
            </div>
            <div class="col-4 p-t-15 p-l-15 p-r-15">
                <label>零售价</label><br>
                <input type="text" v-model="csObj.retailPrice" class="form-control">
            </div>
            <div class="col-12 p-t-15 p-l-15 p-r-15">
                <label>备注</label><br>
                <textarea rows="5" v-model="csObj.remark" class="form-control" style="height: 80px"></textarea>
            </div>
            <template slot="footer">
                <div class="text-center p-5">
                    <LinkButton class="m-r-10" @click="saveCS">保存</LinkButton>
                    <LinkButton @click="$refs.linkedDlg.close()">关闭</LinkButton>
                </div>
            </template>
        </Dialog>
        <selectSupplier ref="selectSupplierCom" username="" @selectSupplier="selectSupplier"></selectSupplier>
        <!--        <selectLogistics ref="selectLogisticsCom" username="" @selectLogistics="selectLogistics"></selectLogistics>-->
    </Layout>
</template>

<script>
import selectSupplier from '@/components/selectSupplier.vue';
// import selectLogistics from '@/components/selectLogistics.vue';
import filterList from '@/components/filterList.vue';

export default {
    name: "app",
    data() {
        return {
            total: 0,
            pageSize: 15,
            pageNumber: 1,
            data: [],
            loading: false,
            obj: {},
            viewObj: [],
            units: [],
            types: [],
            sources: [],
            timeout: null,
            commoditySupplier: [],
            csObj: {},
            notSupplier: false,
            // notLogistics: false,
            allSelected: false,
            supplierWarehouseId: 0
        }
    },
    components: {
        selectSupplier, filterList,
        // selectLogistics
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
    },
    methods: {
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            if (this.notWarehouse) {
                this.supplierWarehouseId = 0;
            }
            this.loading = true;
            let vm = this;
            this.$root.getData("commodity/getQueryList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: "id",
                direction: "desc",
                filterString: this.filterString,
                supplierId: this.supplierWarehouseId,
                notSupplier: this.notSupplier
            }, function (data) {
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    if (e.sale_state === 1) {
                        vm.$set(e, 'sale_state_name', '✔️');
                    } else {
                        vm.$set(e, 'sale_state_name', '');
                    }
                    vm.$set(e, 'selected', false);
                    vm.data.push(e);
                    vm.commoditySupplier = [];
                    vm.csObj = {};
                    vm.obj = {};
                    vm.viewObj = {};
                })
                vm.loading = false;
            })
        },
        loadSupplierWarehouseList() {
            let vm = this;
            this.getData("supplier/getList", {}, function (data) {
                data.forEach(function (e) {
                    vm.supplierWarehouseList.push({id: e.id, name: e.name});
                })
            })
        },
        selectObj(obj) {
            this.obj = this.clone(obj);
            this.viewObj = [];
            this.viewObj.push(this.obj);
            this.loadCommoditySupplier();
        },
        loadCommoditySupplier() {
            let vm = this;
            this.getData("commoditySupplier/getList", {commodityid: this.obj.id}, function (data) {
                vm.commoditySupplier = [];
                data.forEach(function (e) {
                    if (e.sale_state === 1) {
                        vm.$set(e, 'sale_state_name', '✔️');
                    } else {
                        vm.$set(e, 'sale_state_name', '');
                    }
                    vm.commoditySupplier.push(e);
                })
            })
        },
        add() {
            this.$refs.dg.clearSelections();
            this.obj = {id: 0};
            this.viewObj = {id: 0};
            this.$refs.d1.open();
        },
        edit() {
            this.$refs.d1.open();
        },
        save() {
            let vm = this;
            this.getData("commodity/save", this.obj, function (data) {
                vm.$refs.d1.close();
                vm.data = [];
                vm.loadPage(vm.pageNumber, vm.pageSize);
            })
        },
        onCheckedChange(obj) {
            this.obj = obj;
            let vm = this;
            this.getData("commodity/save", this.obj, function (data) {
                vm.$refs.d1.close();
                vm.loadPage(vm.pageNumber, vm.pageSize);
            })
        },
        selectSupplier(obj) {
            this.$set(this.csObj, 'supplierid', obj.id);
            this.$set(this.csObj, 'suppliername', obj.name);
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(this.pageNumber, this.pageSize);
        },
        saveCS() {
            let vm = this;
            this.getData("commoditySupplier/save", this.csObj, function (data) {
                vm.$refs.linkedDlg.close();
                vm.loadCommoditySupplier();
            })
        },
        linked() {
            this.csObj = {
                commodityid: this.obj.id,
                wareid: this.obj.wareid
            }
            this.$refs.linkedDlg.open();
        },
        openSupplier() {
            this.$refs.selectSupplierCom.open();
        },
        editCSObj() {
            this.$refs.linkedDlg.open();
        },
        selectCSObj(obj) {
            this.csObj = this.clone(obj);
        },
        openWarehouse() {
            let count = 0;
            this.data.forEach(function (e) {
                if (e.selected) {
                    count++;
                }
            })
            if (count > 0) {
                // this.$refs.selectSupplierWarehouseCom.open();
            } else {
                this.msg("请选择商品");
            }
        },
        // openLogistics() {
        //     let count = 0;
        //     this.data.forEach(function (e) {
        //         if (e.selected) {
        //             count++;
        //         }
        //     })
        //     if (count > 0) {
        //         this.$refs.selectLogisticsCom.open();
        //     } else {
        //         this.msg("请选择商品");
        //     }
        // },
        all() {
            let vm = this;
            this.allSelected = !this.allSelected;
            this.data.forEach(function (e) {
                e.selected = vm.allSelected;
            })
        },
        selectWarehouse(obj) {
            // let vm = this;
            // this.confirm('指定-' + obj.name + ',确认吗?', function () {
            //     vm.$refs.selectSupplierWarehouseCom.close();
            //     let arr = [];
            //     vm.data.forEach(function (e) {
            //         if (e.selected) {
            //             arr.push({id: e.id, supplierWarehouseId: obj.id})
            //         }
            //     })
            //     vm.getData("commodity/allocatingWarehouse", {rows: JSON.stringify(arr)}, function (data) {
            //         vm.allSelected = false;
            //         vm.loadPage(vm.pageNumber, vm.pageSize);
            //     })
            // })
        },
        changeSupplierSelect(flag) {
            this.notSupplier = flag;
            this.loadPage(this.pageNumber, this.pageSize);
        }
    }
}
</script>

<style scoped>
.b-red {
    border: 1px solid #F44336
    /*background-color: #ff9992*/
}

.b-m-1 {

    border-bottom: 1px solid #d2d2d2
}

.th {
    border: 1px solid #ddd;
    width: 12.5%;
    padding: 3px;
}

.td {
    border: 1px solid #ddd;
    width: 12.5%;
    padding: 3px;
}
</style>
