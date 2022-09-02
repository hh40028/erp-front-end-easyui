<template>

    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <ButtonGroup selectionMode="single">
                    <LinkButton v-for="os in operatorStates" :key="os.id" :toggle="true" :selected="operatorState===os.id" @click="selectState(os.id)">{{ os.title }}</LinkButton>
                </ButtonGroup>
                <LinkButton v-if="operatorState===5" style="margin-left: 20px" @click="openAddressInfoDlg">出库</LinkButton>
                <LinkButton v-if="operatorState===10" style="margin-left: 20px" @click="delivery">发货</LinkButton>
                <LinkButton :plain="false" @click="changeCommodity" iconCls="icon-reload" style="width:70px;margin-left: 30px">换货</LinkButton>

                <div class="pull-right">
                    <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>
                </div>
            </Panel>
        </LayoutPanel>
<!--        <LayoutPanel region="east" style="width:200px;">-->
<!--            <div v-if="obj.customOrderId" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">订单编号</label><br>-->
<!--                <div>{{ obj.customOrderId }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.operatorStateName" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">操作状态</label><br>-->
<!--                <div>{{ obj.operatorStateName }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.orderStateName" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">订单状态</label><br>-->
<!--                <div>{{ obj.orderStateName }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.pin" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">下单账号</label><br>-->
<!--                <div>{{ obj.pin }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.pay" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">支付金额</label><br>-->
<!--                <div>{{ toMoney(obj.pay, '') }} 元</div>-->
<!--            </div>-->
<!--            <div v-if="obj.consigneeName" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">收货人姓名</label><br>-->
<!--                <div>{{ obj.consigneeName }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.postcode" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">邮编</label><br>-->
<!--                <div>{{ obj.postcode }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.expectedDeliveryTime" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">期望送货时间</label><br>-->
<!--                <div>{{ obj.expectedDeliveryTime }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.telephone" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">固定电话</label><br>-->
<!--                <div>{{ obj.telephone }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.phone" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">手机号码</label><br>-->
<!--                <div>{{ obj.phone }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.email" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">电子邮件</label><br>-->
<!--                <div>{{ obj.email }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.address" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">收货地址</label><br>-->
<!--                <div>{{ obj.address }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.orderRemark" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">订单备注</label><br>-->
<!--                <div>{{ obj.orderRemark }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.orderCreateDate" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">订购日期/订单生成时间</label><br>-->
<!--                <div>{{ obj.orderCreateDate }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.paymentCategoryDispName" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">支付分类名称</label><br>-->
<!--                <div>{{ obj.paymentCategoryDispName }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.createDate" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">创建日期</label><br>-->
<!--                <div>{{ obj.createDate }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.refundSourceFlag" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">退款标识</label><br>-->
<!--                <div>{{ obj.refundSourceFlag }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.provinceName" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">省份名称</label><br>-->
<!--                <div>{{ obj.provinceName }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.cityName" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">市名称</label><br>-->
<!--                <div>{{ obj.cityName }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.countyName" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">县名称</label><br>-->
<!--                <div>{{ obj.countyName }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.townName" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">镇名称</label><br>-->
<!--                <div>{{ obj.townName }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.memoByVendor" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">厂商备注</label><br>-->
<!--                <div>{{ obj.memoByVendor }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.parentOrderId" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">父单号</label><br>-->
<!--                <div>{{ obj.parentOrderId }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.commodityNum" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">商品数量</label><br>-->
<!--                <div>{{ obj.commodityNum }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.jdPrice" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">京东价</label><br>-->
<!--                <div>{{ toMoney(obj.jdPrice, '') }} 元</div>-->
<!--            </div>-->
<!--            <div v-if="obj.discount" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">优惠价</label><br>-->
<!--                <div>{{ toMoney(obj.discount, '') }} 元</div>-->
<!--            </div>-->
<!--            <div v-if="obj.reduceCount" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">优惠金额</label><br>-->
<!--                <div>{{ toMoney(obj.reduceCount, '') }} 元</div>-->
<!--            </div>-->
<!--            <div v-if="obj.totalCarriage" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">总运费</label><br>-->
<!--                <div>{{ toMoney(obj.totalCarriage, '') }} 元</div>-->
<!--            </div>-->
<!--            <div v-if="obj.cost" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">采购价</label><br>-->
<!--                <div>{{ toMoney(obj.cost, '') }} 元</div>-->
<!--            </div>-->
<!--            <div v-if="obj.vendorStoreName" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">商家仓名称</label><br>-->
<!--                <div>{{ obj.vendorStoreName }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.updateDate" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">更新时间</label><br>-->
<!--                <div>{{ obj.updateDate }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.xid_buyer" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">下单账号2</label><br>-->
<!--                <div>{{ obj.xid_buyer }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.principal" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">订单负责人</label><br>-->
<!--                <div>{{ obj.principal }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.allocateTime" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">分配时间</label><br>-->
<!--                <div>{{ obj.allocateTime }}</div>-->
<!--            </div>-->
<!--            <div v-if="obj.errorMessge" class="col-12 p-t-15 p-l-15 p-r-15">-->
<!--                <label class="f-bold">错误信息</label><br>-->
<!--                <div>{{ obj.errorMessge }}</div>-->
<!--            </div>-->
<!--        </LayoutPanel>-->
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
                <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
                    <DataGrid :data="data" style="width:100%;height:250px" :border="false"
                              class="f-full"
                              :rowCss="getRowCss"
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
                        <GridColumn align="center" cellCss="datagrid-td-rownumber" width="40">
                            <template slot="body" slot-scope="scope">
                                {{ scope.rowIndex + 1 }}
                            </template>
                        </GridColumn>
                        <GridColumn field="status" :width="50" align="center">
                            <template slot="header" slot-scope="scope">
                                <input type="checkbox" v-model="allOrderSelected"
                                       @click="allOrder">
                            </template>
                            <template slot="body" slot-scope="scope">
                                <input type="checkbox" v-model="scope.row.selected">
                            </template>
                        </GridColumn>
                        <GridColumn field='customOrderId' title='订单编号' width="120" align="center"></GridColumn>
                        <GridColumn field='mainBodyName' title='主体名称' width="120" align="center"></GridColumn>
                        <GridColumn field='orderStateName' title='订单状态' width="120" align="center"></GridColumn>
                        <GridColumn field='operatorStateName' title='操作状态' width="120" align="center"></GridColumn>
                        <GridColumn field='refundSourceFlagName' title='退款标识' width="120" align="center"></GridColumn>
                        <GridColumn field='pin' title='下单账号' width="120" align="left"></GridColumn>
                        <GridColumn field='updateDate' title='递交时间' width="160" align="center"></GridColumn>
                        <GridColumn field='outStockTimeLeft' title='出库' width="100" align="center">
                            <template slot="body" slot-scope="scope">
                                <span v-if="scope.row.outStock">已出库</span>
                                <span v-if="!scope.row.outStock" :class="{'c-red':scope.row.outStockTimeLeft<0}">
                                    {{scope.row.outStockTimeLeft}}小时
                                </span>
                            </template>
                        </GridColumn>
                       <GridColumn field='deliveryTimeLeft' title='发货' width="100" align="center">
                            <template slot="body" slot-scope="scope">
                                <span v-if="scope.row.delivery">已发货</span>
                                <span v-if="!scope.row.delivery" :class="{'c-red':scope.row.deliveryTimeLeft<0}">
                                    {{scope.row.deliveryTimeLeft}}小时
                                </span>
                            </template>
                        </GridColumn>
                        <GridColumn title='支付金额' width="100" align="right">
                            <template slot="body" slot-scope="scope">
                                {{ toMoney(scope.row.pay, '') }}
                            </template>
                        </GridColumn>
                        <!--                <GridColumn field='commodityNum' title='商品数量' width="120" align="center"></GridColumn>-->
                        <GridColumn title='京东价' width="100" align="right">
                            <template slot="body" slot-scope="scope">
                                {{ toMoney(scope.row.jdPrice, '') }}
                            </template>
                        </GridColumn>
                        <GridColumn title='优惠价' width="100" align="right">
                            <template slot="body" slot-scope="scope">
                                {{ toMoney(scope.row.discount, '') }}
                            </template>
                        </GridColumn>
                        <GridColumn title='优惠金额' width="100" align="right">
                            <template slot="body" slot-scope="scope">
                                {{ toMoney(scope.row.reduceCount, '') }}
                            </template>
                        </GridColumn>
                        <GridColumn title='总运费' width="100" align="right">
                            <template slot="body" slot-scope="scope">
                                {{ toMoney(scope.row.totalCarriage, '') }}
                            </template>
                        </GridColumn>
                        <GridColumn title='采购价' width="100" align="right">
                            <template slot="body" slot-scope="scope">
                                {{ toMoney(scope.row.cost, '') }}
                            </template>
                        </GridColumn>
                        <GridColumn field='consigneeName' title='收货人姓名' width="120" align="center"></GridColumn>
                        <GridColumn field='expectedDeliveryTime' title='期望送货时间' width="120" align="center"></GridColumn>
                        <GridColumn field='telephone' title='固定电话' width="120" align="center"></GridColumn>
                        <GridColumn field='phone' title='手机号码' width="120" align="center"></GridColumn>
                        <GridColumn field='email' title='电子邮件' width="120" align="center"></GridColumn>
                        <GridColumn field='address' title='收货地址' width="320" align="left"></GridColumn>
                        <GridColumn field='orderRemark' title='订单备注' width="120" align="center"></GridColumn>
                        <GridColumn field='paymentCategoryDispName' title='支付分类名称' width="120" align="center"></GridColumn>
                        <GridColumn field='provinceName' title='省份名称' width="120" align="center"></GridColumn>
                        <GridColumn field='cityName' title='市名称' width="120" align="center"></GridColumn>
                        <GridColumn field='countyName' title='县名称' width="120" align="center"></GridColumn>
                        <GridColumn field='townName' title='镇名称' width="120" align="center"></GridColumn>
                        <GridColumn field='vendorStoreName' title='商家仓名称' width="120" align="center"></GridColumn>
                        <GridColumn field='orderCreateDate' title='订单时间' width="160" align="center"></GridColumn>
                        <GridColumn field='createDate' title='通知时间' width="160" align="center"></GridColumn>
                        <GridColumn field='memoByVendor' title='厂商备注' width="120" align="center"></GridColumn>
                    </DataGrid>
                </LayoutPanel>
                <LayoutPanel region="south" style="height:30%;" bodyCls="f-column" :border="false">

                    <Tabs :plain="false" :narrow="false" :justified="false" style="height:100%" bodyCls="f-column">
                        <TabPanel :title="'货品列表'" bodyCls="f-column">
                            <Panel class="f-full" :border="false" bodyCls="f-column">
                                <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
                                    <LayoutPanel region="north" :border="false">
                                        <Panel :bodyStyle="{padding:'8px'}" :border="false">
                                            <LinkButton :toggle="false" :plain="true" @click="splitDrder" :disabled="huoPinObj.sendSupplier">拆单</LinkButton>
                                            <LinkButton :toggle="false" :plain="true" @click="merge" :disabled="huoPinObj.sendSupplier">合单</LinkButton>
                                        </Panel>
                                    </LayoutPanel>
                                    <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
                                        <DataGrid :data="items" :border="false"
                                                  :columnResizing="true"
                                                  :rowCss="getItemRowCss"
                                                  selectionMode="single"
                                                  :clickToEdit="true"
                                                  editMode="cell"
                                                  @selectionChange="huoPinObj=$event"
                                                  @rowDblClick="selectItemObj($event)"
                                                  class="f-full">
                                            <GridColumn field="status" :width="50" align="center">
                                                <template slot="header" slot-scope="scope">
                                                    <input type="checkbox" v-model="allSelected"
                                                           @click="all">
                                                </template>
                                                <template slot="body" slot-scope="scope">
                                                    <input type="checkbox" v-model="scope.row.selected">
                                                </template>
                                            </GridColumn>
                                            <GridColumn title="图片" align="center" width="40">
                                                <template slot="body" slot-scope="scope">
                                                    <div @click="viewImg(scope.row)">
                                                        <img src="../../assets/images/icons8-picture.png" style="height: 24px;">
                                                    </div>
                                                </template>
                                            </GridColumn>
                                            <GridColumn title="编辑" align="center" width="80">
                                                <template slot="body" slot-scope="scope">
                                                    <div v-if="scope.row.orderState===7 ||scope.row.orderState===10 ||scope.row.orderState===16">
                                                        <a v-if="scope.row.supplierid && !scope.row.sendSupplier" @click="clearSupplier(scope.row)" style="color:red;">清除供应商</a>
                                                        <a v-if="scope.row.sendSupplier" @click="edit(scope.row)" style="color:red;">编辑</a>
                                                    </div>
                                                </template>
                                            </GridColumn>

                                            <GridColumn title="操作" align="center" width="80">
                                                <template slot="body" slot-scope="scope">
                                                    <div v-if="scope.row.orderState===7 ||scope.row.orderState===10 ||scope.row.orderState===16">
                                                        <div v-if="!scope.row.logisticsCompanyName || !scope.row.logisticsNumber || !scope.row.deliveryTime">
                                                            <a v-if="!scope.row.supplierid" @click="selectOneSupplier(scope.row)">选择供应商</a>
                                                            <a v-if="scope.row.supplierid && !scope.row.sendSupplier" @click="selectItemObj(scope.row)">发送供应商</a>
                                                            <a v-if="scope.row.sendSupplier" @click="cancelProcess(scope.row)" style="color:red;margin-left: 10px">撤回</a>
                                                        </div>
                                                        <div v-if="scope.row.logisticsCompanyName && scope.row.logisticsNumber && scope.row.deliveryTime">
                                                            <a>已发货</a>
                                                        </div>
                                                    </div>
                                                </template>
                                            </GridColumn>
                                            <GridColumn field='orderNumber' title='单据编号' width="120" align="center"></GridColumn>
                                            <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                                            <GridColumn field='upc' title='商品UPC编号' width="120" align="center"></GridColumn>
                                            <GridColumn field='wareName' title='商品名称' width="120" align="left"></GridColumn>
                                            <GridColumn field='oneTypeName' title='一级分类' width="80" align="center"></GridColumn>
                                            <GridColumn field='twoTypeName' title='二级分类' width="80" align="center"></GridColumn>
                                            <GridColumn field='threeTypeName' title='三级分类' width="80" align="center"></GridColumn>
                                            <GridColumn field="wareNum" title="商品数量" align="center" width="80">
                                                <template slot="body" slot-scope="scope">
                                                    {{ scope.row.wareNum }}{{ scope.row.sku_unit }}
                                                </template>
                                            </GridColumn>
                                            <GridColumn field="jdPrice" title='京东价' width="80" align="right">
                                                <template slot="body" slot-scope="scope">
                                                    {{ toMoney(scope.row.jdPrice, '') }}
                                                </template>
                                            </GridColumn>
                                            <GridColumn field="cost" title='售价' width="80" align="right">
                                                <template slot="body" slot-scope="scope">
                                                    {{ toMoney(scope.row.cost, '') }}
                                                </template>
                                            </GridColumn>
                                            <GridColumn field='purchasePrice' title='进货价' width="80" align="center" :editable="true" :cellCss="getCellCss">
                                                <template slot="body" slot-scope="scope">
                                                    {{ toMoney(scope.row.purchasePrice, '') }}
                                                </template>
                                                <template slot="edit" slot-scope="scope">
                                                    <NumberBox :disabled="scope.row.sendSupplier" v-model="scope.row.purchasePrice" :precision="2" :spinners="false"></NumberBox>
                                                </template>
                                            </GridColumn>
                                            <GridColumn field='supplierName' title='供应商' width="120" align="center" :cellCss="getCellCss"></GridColumn>
                                            <GridColumn title='送货方式' width="100" align="center">
                                                <template slot="body" slot-scope="scope">
                                                    {{ scope.row.sendType ? "快递" : "送货" }}
                                                </template>
                                            </GridColumn>
                                            <GridColumn field='logisticsCompanyName' title='物流公司' width="120" align="center"></GridColumn>
                                            <GridColumn field='logisticsNumber' title='物流单号' width="120" align="center"></GridColumn>
                                            <GridColumn field='deliveryPhone' title='送货电话' width="150" align="center"></GridColumn>
                                            <GridColumn field='shippingTime' title='发货时间' width="150" align="center"></GridColumn>
                                            <GridColumn field='estimatedArrivalDate' title='预计到达日期' width="120" align="center"></GridColumn>
                                            <GridColumn field='poId' title='采购单号' width="120" align="center"></GridColumn>
                                            <GridColumn field='roId' title='退货单号' width="120" align="center"></GridColumn>
                                        </DataGrid>
                                    </LayoutPanel>
                                </Layout>

                            </Panel>
                        </TabPanel>
                        <TabPanel :title="'原单货品列表'" bodyCls="f-column">
                            <Panel class="f-full" :border="false" bodyCls="f-column">
                                <DataGrid :data="items2" :border="false"
                                          :columnResizing="true"
                                          class="f-full">
                                    <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='upc' title='商品UPC编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='wareName' title='商品名称' width="120" align="center"></GridColumn>
                                    <GridColumn field='wareNum' title='商品数量' width="120" align="center"></GridColumn>
                                    <GridColumn field='jdPrice' title='京东价' width="120" align="center"></GridColumn>
                                    <GridColumn field='discount' title='优惠价' width="120" align="center"></GridColumn>
                                    <GridColumn field='cost' title='采购价' width="120" align="center"></GridColumn>
                                    <GridColumn field='pold' title='采购单号' width="120" align="center"></GridColumn>
                                    <GridColumn field='rold' title='退货单号' width="120" align="center"></GridColumn>
                                </DataGrid>
                            </Panel>
                        </TabPanel>
                        <TabPanel :title="'订单详情'">
                            <table style="width: 100%" class="table">
                                <tbody>
                                <tr>
                                    <th class="text-right th">订单编号</th>
                                    <td class="text-left td">{{ obj.customOrderId }}</td>
                                    <th class="text-right th">支付金额</th>
                                    <td class="text-left td">{{ obj.pay }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">操作状态</th>
                                    <td class="text-left td">{{ obj.operatorState }}</td>
                                    <th class="text-right th">订单状态</th>
                                    <td class="text-left td">{{ obj.orderState }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">收货人姓名</th>
                                    <td class="text-left td">{{ obj.consigneeName }}</td>
                                    <th class="text-right th">邮编</th>
                                    <td class="text-left td">{{ obj.postcode }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">期望送货时间</th>
                                    <td class="text-left td">{{ obj.expectedDeliveryTime }}</td>
                                    <th class="text-right th">固定电话</th>
                                    <td class="text-left td">{{ obj.telephone }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">手机号码</th>
                                    <td class="text-left td">{{ obj.phone }}</td>
                                    <th class="text-right th">电子邮件</th>
                                    <td class="text-left td">{{ obj.email }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">收货地址</th>
                                    <td class="text-left td">{{ obj.address }}</td>
                                    <th class="text-right th">订单备注</th>
                                    <td class="text-left td">{{ obj.orderRemark }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">订购日期/订单生成时间</th>
                                    <td class="text-left td">{{ obj.orderCreateDate }}</td>
                                    <th class="text-right th">订单标识</th>
                                    <td class="text-left td"></td>
                                </tr>
                                <tr>
                                    <th class="text-right th">支付分类</th>
                                    <td class="text-left td">{{ obj.paymentCategory }}</td>
                                    <th class="text-right th">支付分类名称</th>
                                    <td class="text-left td">{{ obj.paymentCategoryDispName }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">创建日期</th>
                                    <td class="text-left td">{{ obj.createDate }}</td>
                                    <th class="text-right th">下单账号</th>
                                    <td class="text-left td">{{ obj.pin }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">退款标识</th>
                                    <td class="text-left td">{{ obj.refundSourceFlag }}</td>
                                    <th class="text-right th">省份id</th>
                                    <td class="text-left td">{{ obj.provinceId }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">省份名称</th>
                                    <td class="text-left td">{{ obj.provinceName }}</td>
                                    <th class="text-right th">市id</th>
                                    <td class="text-left td">{{ obj.cityId }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">市名称</th>
                                    <td class="text-left td">{{ obj.cityName }}</td>
                                    <th class="text-right th">县id</th>
                                    <td class="text-left td">{{ obj.countyId }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">县名称</th>
                                    <td class="text-left td">{{ obj.countyName }}</td>
                                    <th class="text-right th">镇id</th>
                                    <td class="text-left td">{{ obj.townId }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">镇名称</th>
                                    <td class="text-left td">{{ obj.townName }}</td>
                                    <th class="text-right th">厂商备注</th>
                                    <td class="text-left td">{{ obj.memoByVendor }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">父单号</th>
                                    <td class="text-left td">{{ obj.parentOrderId }}</td>
                                    <th class="text-right th">商品数量</th>
                                    <td class="text-left td">{{ obj.commodityNum }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">京东价</th>
                                    <td class="text-left td">{{ obj.jdPrice }}</td>
                                    <th class="text-right th">优惠价</th>
                                    <td class="text-left td">{{ obj.discount }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">优惠金额</th>
                                    <td class="text-left td">{{ obj.reduceCount }}</td>
                                    <th class="text-right th">总运费</th>
                                    <td class="text-left td">{{ obj.totalCarriage }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">采购价</th>
                                    <td class="text-left td">{{ obj.cost }}</td>
                                    <th class="text-right th">商家仓id</th>
                                    <td class="text-left td">{{ obj.vendorStoreId }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">商家仓名称</th>
                                    <td class="text-left td">{{ obj.vendorStoreName }}</td>
                                    <th class="text-right th">更新时间</th>
                                    <td class="text-left td">{{ obj.updateDate }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">下单账号</th>
                                    <td class="text-left td">{{ obj.open_id_buyer }}</td>
                                    <th class="text-right th">下单账号2</th>
                                    <td class="text-left td">{{ obj.xid_buyer }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">订单负责人</th>
                                    <td class="text-left td">{{ obj.principal }}</td>
                                    <th class="text-right th">分配时间</th>
                                    <td class="text-left td">{{ obj.allocateTime }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">错误信息</th>
                                    <td class="text-left td">{{ obj.errorMessge }}</td>
                                    <th class="text-right th">换货状态</th>
                                    <td class="text-left td">{{ obj.changeCommodityStarus }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">完成状态</th>
                                    <td class="text-left td">{{ obj.finish }}</td>
                                    <th class="text-right th">完成时间</th>
                                    <td class="text-left td">{{ obj.finishTime }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </TabPanel>
                        <TabPanel :title="'订单日志'">
                            <Panel class="f-full" :border="false">
                                <DataGrid :data="logs" :border="false"
                                          :columnResizing="true"
                                          class="f-full">
                                    <GridColumn field='username' title='操作人' width="60" align="center"></GridColumn>
                                    <GridColumn field='operateTime' title='操作时间' width="220" align="center"></GridColumn>
                                    <GridColumn field='operate' title='操作信息' align="left"></GridColumn>
                                </DataGrid>
                            </Panel>
                        </TabPanel>
                    </Tabs>
                </LayoutPanel>

            </Layout>
        </LayoutPanel>
        <Dialog bodyCls="f-column" ref="changeCommodityDlg" closed
                :title="obj.customOrderId+'-换货操作'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'80%',height:'80%'}"
                :modal="true">
            <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="true">
                <LayoutPanel region="north" :border="false" style="height:45%" :collapsible="true" bodyCls="f-column">
                    <Panel title="原单货品表" bodyCls="f-column" :border="false">
                        <DataGrid :data="items2" :border="false"
                                  :columnResizing="true"
                                  class="f-full">
                            <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                                <template slot="body" slot-scope="scope">
                                    {{ scope.rowIndex + 1 }}
                                </template>
                            </GridColumn>
                            <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                            <GridColumn field='upc' title='商品UPC编号' width="120" align="center"></GridColumn>
                            <GridColumn field='wareName' title='商品名称' align="left"></GridColumn>
                            <GridColumn field='wareNum' title='商品数量' width="120" align="center"></GridColumn>
                            <GridColumn field='jdPrice' title='京东价' width="120" align="center"></GridColumn>
                            <GridColumn field='discount' title='优惠价' width="120" align="center"></GridColumn>
                            <GridColumn field='cost' title='售价' width="120" align="center"></GridColumn>
                            <!--                            <GridColumn field='supplierName' title='供应商' width="120" align="center"></GridColumn>-->
                        </DataGrid>
                    </Panel>
                </LayoutPanel>
                <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="true">

                    <Panel title="换货货品表" bodyCls="f-column" :border="false">
                        <Panel :bodyStyle="{padding:'8px'}" :border="false">
                            <LinkButton iconCls="icon-add" :plain="true" @click="addChangeCommodity">新增货品</LinkButton>
                            <LinkButton iconCls="icon-ok" :plain="true" @click="finishChangeCommodity">完成换货</LinkButton>
                        </Panel>
                        <DataGrid :data="changeItems" :border="false"
                                  class="f-full"
                                  :columnResizing="true"
                                  :clickToEdit="true"
                                  editMode="cell">
                            <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                                <template slot="body" slot-scope="scope">
                                    {{ scope.rowIndex + 1 }}
                                </template>
                            </GridColumn>
                            <GridColumn title="删除" align="center" width="60">
                                <template slot="body" slot-scope="scope">
                                    <a @click="removeChangeCommodity(scope.rowIndex)" style="color:red" v-if="!scope.row.sendSupplier">删除</a>
                                </template>
                            </GridColumn>
                            <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                            <GridColumn field='upc' title='商品UPC编号' width="120" align="center"></GridColumn>
                            <GridColumn field='wareName' title='商品名称' align="left"></GridColumn>
                            <GridColumn field='wareNum' title='商品数量' width="120" align="center" :editable="true" :cellCss="getCellCss"></GridColumn>
                            <GridColumn field='jdPrice' title='京东价' width="120" align="center" :editable="true" :cellCss="getCellCss"></GridColumn>
                            <GridColumn field='discount' title='优惠价' width="120" align="center" :editable="true"></GridColumn>
                            <GridColumn field='cost' title='售价' width="120" align="center" :editable="true" :cellCss="getCellCss"></GridColumn>
                            <!--                            <GridColumn field='supplierName' title='供应商' width="120" align="center"></GridColumn>-->
                        </DataGrid>
                    </Panel>
                </LayoutPanel>
            </Layout>
        </Dialog>
        <Dialog bodyCls="f-column" ref="selectCommoditySupplierDlg" closed
                :title="'选择一个供应商'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'50vH',height:'50vH'}"
                :modal="true">
            <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="true">
                <DataGrid :data="commoditySupplierList" :border="false"
                          :columnResizing="true"
                          @selectionChange="selectSupplier($event)"
                          selectionMode="single"
                          class="f-full">
                    <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                        <template slot="body" slot-scope="scope">
                            {{ scope.rowIndex + 1 }}
                        </template>
                    </GridColumn>
                    <GridColumn field='suppliername' title='供应商' width="120" align="center"></GridColumn>
                    <GridColumn field='finalPurchasePrice' title='最后采购价' width="120" align="center"></GridColumn>
                    <!--                    <GridColumn field='lastPurchasePrice' title='上次采购价' width="120" align="center"></GridColumn>-->

                    <GridColumn title='上次采购价' width="100" align="right">
                        <template slot="body" slot-scope="scope">
                            {{ toMoney(scope.row.lastPurchasePrice, '') }}
                        </template>
                    </GridColumn>
                    <GridColumn field='lowestPurchasePrice' title='最低采购价' width="120" align="center"></GridColumn>
                    <GridColumn field='retailPrice' title='零售价' width="120" align="center"></GridColumn>
                    <GridColumn field='remark' title='备注' width="120" align="center"></GridColumn>
                </DataGrid>
            </Layout>
        </Dialog>
        <selectCommodity ref="selectCommodityCom" @selectCommodity="selectCommodity"></selectCommodity>

        <Dialog bodyCls="f-column" ref="editDlg" closed
                :title="'编辑信息'"
                :dialogStyle="{width:'50%'}"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">

                <table style="width:100%">
                    <tbody>
                    <tr>
                        <th class="th">单据编号</th>
                        <td class="td">{{ editObj.number }}</td>
                    </tr>
                    <tr>
                        <th class="th">商品编号</th>
                        <td class="td">{{ editObj.sku }}</td>
                    </tr>
                    <tr>
                        <th class="th">商品UPC编号</th>
                        <td class="td">{{ editObj.upc }}</td>
                    </tr>
                    <tr>
                        <th class="th">商品名称</th>
                        <td colspan="5">{{ editObj.wareName }}</td>
                    </tr>
                    <tr>
                        <th class="th">商品数量</th>
                        <td class="td">{{ editObj.wareNum }}</td>
                    </tr>
                    <tr>
                        <th class="th">京东价</th>
                        <td class="td">{{ toMoney(editObj.jdPrice, '') }}</td>
                    </tr>
                    <tr>
                        <th class="th">售价</th>
                        <td class="td">{{ toMoney(editObj.cost, '') }}</td>
                    </tr>
                    <tr>
                        <th class="th">进货价</th>
                        <td class="td">
                            <input type="text" class="form-control" v-model="editObj.purchasePrice"></td>
                    </tr>
                    <tr>
                        <th class="th">送货方式</th>
                        <td class="td" colspan="5">
                            <ButtonGroup selectionMode="single">
                                <LinkButton :toggle="true" :selected="editObj.sendType" @click="editObj.sendType=true">快递</LinkButton>
                                <LinkButton :toggle="true" :selected="!editObj.sendType" @click="editObj.sendType=false">送货</LinkButton>
                            </ButtonGroup>
                        </td>
                    </tr>
                    <tr>
                        <th class="th">供应商</th>
                        <td class="td" colspan="5">{{ editObj.supplierName }}</td>
                    </tr>
                    <tr v-if="editObj.sendType">
                        <th class="th">物流公司</th>
                        <td class="td">
                            <input type="text" class="form-control" readonly @click="openSelectLogisticsTypeDlg" v-model="editObj.logisticsCompanyName"></td>
                    </tr>
                    <tr v-if="editObj.sendType">
                        <th class="th">物流单号</th>
                        <td class="td">
                            <input type="text" class="form-control" v-model="editObj.logisticsNumber"></td>
                    </tr>
                    <tr v-if="!editObj.sendType">
                        <th class="th">送货电话</th>
                        <td class="td">
                            <input type="text" class="form-control" v-model="editObj.deliveryPhone"></td>
                    </tr>
                    <tr>
                        <th class="th">发货时间</th>
                        <td class="td">
                            <selectDateTime ref="selectDateTimeCom" @selectDT="selectDeliveryTime" :value="editObj.deliveryTime"></selectDateTime>
                        </td>
                    </tr>
                    <tr style="margin-bottom: 30px">
                        <th class="th">预计到达日期</th>
                        <td class="td">
                            <input type="date" v-model="editObj.estimatedArrivalDate" class="form-control">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="dialog-button">
                <LinkButton style="width:80px" @click="modifyDirectly">保存</LinkButton>
                <LinkButton style="width:80px" @click="$refs.editDlg.close()">关闭</LinkButton>
            </div>
        </Dialog>
        <Dialog bodyCls="f-column" ref="selectSupplier2Dlg" closed
                :title="'商品供应商列表'"
                :dialogStyle="{width:'600px',height:'40vH'}"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <DataGrid :data="commoditySupplierList2" :border="false"
                          :columnResizing="true"
                          @selectionChange="selectSupplier2($event)"
                          selectionMode="single"
                          class="f-full">
                    <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                        <template slot="body" slot-scope="scope">
                            {{ scope.rowIndex + 1 }}
                        </template>
                    </GridColumn>
                    <GridColumn field='suppliername' title='供应商' align="left"></GridColumn>
                    <!--                    <GridColumn field='finalPurchasePrice' title='最后采购价' width="120" align="center"></GridColumn>-->
                    <!--                    <GridColumn field='lastPurchasePrice' title='上次采购价' width="120" align="center"></GridColumn>-->

                    <GridColumn title='上次进货价' width="100" align="right">
                        <template slot="body" slot-scope="scope">
                            {{ toMoney(scope.row.lastPurchasePrice, '') }}
                        </template>
                    </GridColumn>
                    <!--                    <GridColumn field='lowestPurchasePrice' title='最低采购价' width="120" align="center"></GridColumn>-->
                    <!--                    <GridColumn field='retailPrice' title='零售价' width="120" align="center"></GridColumn>-->
                    <!--                    <GridColumn field='remark' title='备注' width="120" align="center"></GridColumn>-->
                </DataGrid>
            </div>
            <div class="dialog-button">
                <LinkButton @click="selectOtherSupplier">选择其他供应商</LinkButton>
                <LinkButton style="width:80px" @click="$refs.selectSupplier2Dlg.close()">关闭</LinkButton>
            </div>
        </Dialog>
        <Dialog bodyCls="f-column" ref="selectOtherSupplierDlg" closed
                :title="'供应商列表'"
                :dialogStyle="{width:'60vW',height:'80vH'}"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <selectSupplier ref="selectSupplierCom" @selectSupplier="selectSupplierOther"></selectSupplier>
            </div>
        </Dialog>
        <Dialog bodyCls="f-column" ref="editHuoPinDlg" closed
                :title="'编辑货品信息'"
                :dialogStyle="{width:'60vW'}"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <table style="width:100%">
                    <tbody>
                    <tr>
                        <th class="th">商品编号</th>
                        <td class="td">{{ huoPinObj.sku }}</td>
                    </tr>
                    <tr>
                        <th class="th">商品UPC编号</th>
                        <td class="td">{{ huoPinObj.upc }}</td>
                    </tr>
                    <tr>
                        <th class="th">商品名称</th>
                        <td colspan="5" style="width:83.333333%">{{ huoPinObj.wareName }}</td>
                    </tr>
                    <tr>
                        <th class="th">商品数量</th>
                        <td class="td">{{ huoPinObj.wareNum }}{{ huoPinObj.sku_unit }}</td>
                    </tr>
                    <tr>
                        <th class="th">京东价</th>
                        <td class="td">{{ toMoney(huoPinObj.jdPrice, '') }}</td>
                    </tr>
                    <tr>
                        <th class="th">售价</th>
                        <td class="td">{{ toMoney(huoPinObj.cost, '') }}</td>
                    </tr>
                    <tr>
                        <th class="th">进货价</th>
                        <td class="td">{{ toMoney(huoPinObj.purchasePrice, '') }}</td>
                    </tr>
                    <tr>
                        <th class="th">供应商</th>
                        <td class="td" colspan="5">{{ huoPinObj.supplierName }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="dialog-button">
                <LinkButton style="width:80px" @click="testSend">递交供应商</LinkButton>
                <LinkButton style="width:80px" @click="$refs.editHuoPinDlg.close()">关闭</LinkButton>
            </div>
        </Dialog>

        <Dialog ref="viewImgDlg" closed
                :title="'商品图片'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'60%',height:'90%'}"
                :modal="true">
            <viewImgs ref="viewImgs" :wareid="itemObj.sku" :commodity-id="0" :mainbodyid="obj.mainBodyId" @getImgPath="getImgPath"></viewImgs>
        </Dialog>
        <Dialog ref="selectLogisticsTypeDlg" closed
                :title="'商品图片'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'300px',height:'60%'}"
                :modal="true">
            <selectLogisticsType ref="selectLogisticsType" @selectLogisticsType="selectLogisticsType"></selectLogisticsType>
        </Dialog>

        <Dialog ref="selectSplitDrderDlg" closed
                :title="'拆单'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'80%',height:'60%'}"
                :modal="true">
            <Layout bodyCls="f-column" :border="false">
                <LayoutPanel region="north" :border="false">
                    <Panel :bodyStyle="{padding:'8px'}" :border="false">
                        <label style="margin-right: 20px">商品总数：{{ obj.wareNum }}</label>
                        <label>拆单数量：</label>
                        <NumberBox inputId="n1" v-model="splitDrderCount" :value="splitDrderCount" :max="huoPinObj.wareNum" :min="1" :spinners="true"></NumberBox>
                        <LinkButton style="margin-left: 10px" @click="startSplitDrder">确定</LinkButton>

                        <div class="pull-right">
                            <LinkButton style="margin-left: 10px" :disabled="!splitDrderList.length" @click="submitSplitDrder">提交</LinkButton>
                        </div>
                    </Panel>
                </LayoutPanel>
                <LayoutPanel region="center" bodyCls="f-column" style="height: 100%" :border="false">
                    <DataGrid :data="splitDrderList" style="width:100%;height:250px" :border="false"
                              class="f-full"
                              :clickToEdit="true"
                              @editEnd="endCountInput($event)"
                              idField="id" editMode="cell"
                              :columnResizing="true">
                        <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30">
                            <template slot="body" slot-scope="scope">
                                {{ scope.rowIndex + 1 }}
                            </template>
                        </GridColumn>
                        <GridColumn field='customOrderId' title='订单编号' width="120" align="center"></GridColumn>
                        <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                        <GridColumn field='upc' title='商品UPC编号' width="120" align="center"></GridColumn>
                        <GridColumn field='wareName' title='商品名称' width="220" align="left"></GridColumn>
                        <GridColumn field='zh_brand' title='品牌名称' width="100" align="center"></GridColumn>
                        <GridColumn field='wareNum' title='商品数量' width="80" align="center" :cellCss="getCellCss" :editable="true"></GridColumn>
                        <GridColumn title='京东价' width="100" align="right">
                            <template slot="body" slot-scope="scope">
                                {{ toMoney(scope.row.jdPrice, '') }}
                            </template>
                        </GridColumn>
                        <GridColumn title='售价' width="100" align="right">
                            <template slot="body" slot-scope="scope">
                                {{ toMoney(scope.row.cost, '') }}
                            </template>
                        </GridColumn>
                    </DataGrid>
                </LayoutPanel>
            </Layout>
        </Dialog>
        <Dialog ref="selectAddressInfoDlg" closed
                :title="'选择发货地址'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'500px'}"
                :modal="true">
            <div class="f-full">
                <ComboBox v-model="addressId" :data="addressInfoList" valueField="addressId" textField="address" style="width:100%"></ComboBox>
            </div>
            <div class="dialog-button">
                <LinkButton style="width:80px" @click="submitOutStock">提交</LinkButton>
                <LinkButton style="width:80px" @click="$refs.selectAddressInfoDlg.close()">关闭</LinkButton>
            </div>
        </Dialog>
    </Layout>
</template>

<script>
import selectCommodity from '@/components/selectCommodity.vue';
import filterList from '@/components/filterList.vue';
import selectSupplier from '@/components/selectSupplier.vue';
import viewImgs from '@/components/viewImgs.vue';
import selectLogisticsType from '@/components/selectLogisticsType.vue';
import selectDateTime from '@/components/selectDateTime.vue';

export default {
    name: "app",
    data() {
        return {
            total: 0,
            pageSize: 15,
            pageNumber: 1,
            loading: false,
            timeout: null,
            addressId: 10024141,
            data: [],
            items: [],
            addressInfoList: [],
            obj: {},
            viewObj: [],
            suppliers: [],
            units: [],
            types: [],
            sources: [],
            filterString: '',
            commoditySupplier: [],
            commoditySupplierList2: [],
            csObj: {},
            allSelected: false,
            logs: [],
            allOrderSelected: false,
            splitDrderList: [],
            splitDrderCount: 1,
            itemObj: {},
            changeItems: [],
            commoditySupplierList: [],
            addCommodityObj: {},
            items2: [],
            editObj: {},
            selectCommodityObj: {},
            huoPinObj: {},
            field: 'id',
            order: 'desc',
            operatorState: 5,
            operatorStates: [
                {id: 5, title: '新订单'},
                {id: 9, title: '出库中'},
                {id: 10, title: '等待发货'}
            ],
        }
    },
    components: {
        filterList, selectCommodity, selectSupplier, viewImgs, selectLogisticsType, selectDateTime
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
        this.loadSuppliers();
    },
    methods: {
        selectState(id) {
            this.operatorState = id;
            this.loadPage(1, this.pageSize);
        },
        loadSuppliers: function () {
            let vm = this;
            this.getData("supplier/getList", {}, function (data) {
                vm.suppliers = data;
            })
        },
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
            this.loading = true;
            let vm = this;
            this.$root.getData("orderForm/getMyOrderForm", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                filterString: this.filterString,
                operatorState: this.operatorState,
            }, function (data) {
                console.log(data.children);
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.data.push(e);
                    vm.$set(e, 'selected', false);
                })
                vm.obj = {};
                vm.items = [];
                vm.changeItems = [];
                vm.loading = false;
                vm.allOrderSelected = false;
            })
        },
        selectObj(obj) {
            console.log(obj);
            this.obj = this.clone(obj);
            this.items = [];
            this.loadItems();
            this.loadLogs();
        },
        loadLogs() {
            let vm = this;
            this.getData("orderLog/getList", {orderFormId: this.obj.id}, function (data) {
                vm.logs = data;
            })
        },
        loadItems() {
            let vm = this;
            this.getData("orderFormItem/getList", {orderFormId: this.obj.id}, function (data) {
                vm.items = data.items;
                vm.items.forEach(function (e) {
                    vm.$set(e, 'selected', false);
                })
                vm.items2 = data.items2;
                vm.allSelected = false;
                console.log(data);
            })
        },
        add() {
            this.$refs.dg.clearSelections();
            this.obj = {id: 0};
            this.viewObj = {id: 0};
            this.$refs.d1.open();
        },
        save() {
            let vm = this;
            this.getData("commodity/save", this.obj, function (data) {
                vm.$refs.d1.close();
                vm.data = [];
                vm.loadPage();
            })
        },
        onCheckedChange(obj) {
            this.obj = obj;
            let vm = this;
            this.getData("commodity/save", this.obj, function (data) {
                vm.$refs.d1.close();
                vm.loadPage();
            })
        },
        filter(filterString) {
            this.filterString = filterString;
            this.loadPage(1, this.pageSize);
        },
        changePageSize(value){
            this.pageSize=value;
            this.loadPage(1, this.pageSize);
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
        allOrder() {
            let vm = this;
            this.allOrderSelected = !this.allOrderSelected;
            this.data.forEach(function (e) {
                e.selected = vm.allOrderSelected;
            })
        },
        all() {
            let vm = this;
            this.allSelected = !this.allSelected;
            this.items.forEach(function (e) {
                e.selected = vm.allSelected;
            })
        },
        finish() {
            // let count = 0;
            // this.data.forEach(function (e) {
            //     if (e.selected) {
            //         count++;
            //     }
            // })
            // if (!count) {
            //     this.msg('请选择订单');
            // } else {
            let vm = this;
            this.confirm("完成订单,确认吗?", function () {
                vm.getData("orderForm/finish", {orderFormId: vm.obj.id}, function (data) {
                    vm.loadPage();
                })
            })
            // }
        },
        changeCommodity() {
            if (!this.obj.id) {
                this.alert('请选择一行');
            } else {
                let flag = false;
                this.items.forEach(function (e) {
                    if (e.sendSupplier) {
                        flag = true;
                    }
                })
                if (flag) {
                    this.alert('已有货品发送供应商,请全部撤回再试');
                } else {
                    this.$refs.changeCommodityDlg.open();
                    this.changeItems = this.clone(this.items);
                }
            }
        },
        print() {

        },
        getRowCss(row) {
            if (row.changeCommodityStarus) {
                return {background: "#fbfea2"};
            }
            return null;
        },
        selectItem(obj) {
            this.itemObj = this.clone(obj);
        },
        addChangeCommodity() {
            this.$refs.selectCommodityCom.open();
        },
        removeChangeCommodity(index) {
            if (this.changeItems[index].sendSupplier) {
                this.alert('已递交供应商,请先撤回.');
            } else {
                let vm = this;
                this.confirm("确认吗?", function () {
                    vm.changeItems.splice(index, 1);
                })
            }
        },
        finishChangeCommodity() {
            let vm = this;
            let flag = false;
            this.changeItems.forEach(function (e) {
                if (!e.wareNum) {
                    flag = true;
                }
            })
            if (flag) {
                this.alert('商品数量不能为零');
            } else {
                this.confirm("确认吗?", function () {
                    vm.getData("orderFormItem/changeCommodity", {orderFormId: vm.obj.id, rows: JSON.stringify(vm.changeItems)}, function (data) {
                        vm.changeItems = [];
                        vm.$refs.changeCommodityDlg.close();
                        vm.loadItems();
                    })
                })
            }
        },
        selectRow(obj) {
            console.log(obj);
        },
        selectCommodity(obj) {

            this.changeItems.push({
                id: 0,
                commodityId: obj.id,
                sku: obj.wareid,
                wareName: obj.name,
                wareNum: 0,
                jdPrice: 0,
                discount: 0,
                // cost: data[0].lastPurchasePrice,
                // supplierid: data[0].supplierid,
                // supplierName: data[0].suppliername
            })
            // let vm = this;
            // this.getData("commoditySupplier/getList", {commodityid: obj.id}, function (data) {
            //     vm.commoditySupplierList = [];
            //     if (data.length === 1) {
            //         vm.changeItems.push({
            //             id: 0,
            //             commodityId: obj.id,
            //             sku: obj.wareid,
            //             commodityName: obj.name,
            //             wareNum: 0,
            //             jdPrice: 0,
            //             discount: 0,
            //             cost: data[0].lastPurchasePrice,
            //             supplierid: data[0].supplierid,
            //             supplierName: data[0].suppliername
            //         })
            //     } else {
            //         vm.commoditySupplierList = data;
            //         vm.addCommodityObj = {
            //             id: 0,
            //             commodityId: obj.id,
            //             sku: obj.wareid,
            //             commodityName: obj.name,
            //             wareNum: 0,
            //             jdPrice: 0,
            //             discount: 0,
            //             cost: 0
            //         }
            //         vm.$refs.selectCommoditySupplierDlg.open();
            //     }
            // })
        },
        getItemRowCss(row) {
            if (row.logisticsCompanyName && row.logisticsNumber && row.deliveryTime) {
                return {background: "#c0ffbe"};
            }
            return null;
        },
        selectSupplier(obj) {
            this.$set(this.addCommodityObj, 'supplierid', obj.supplierid);
            this.$set(this.addCommodityObj, 'supplierName', obj.suppliername);
            this.$set(this.addCommodityObj, 'cost', obj.lastPurchasePrice);
            this.changeItems.push(this.addCommodityObj);
            this.$refs.selectCommoditySupplierDlg.close();
        },
        selectSupplier2(obj) {
            this.$set(this.selectCommodityObj, 'supplierid', obj.supplierid);
            this.$set(this.selectCommodityObj, 'supplierName', obj.suppliername);
            this.$set(this.selectCommodityObj, 'purchasePrice', obj.lastPurchasePrice);
            // this.changeItems.push(this.addCommodityObj);
            // this.$refs.selectCommoditySupplierDlg.close();
        },
        testSend() {
            let vm = this;
            if (this.huoPinObj.purchasePrice > this.huoPinObj.cost) {
                if (confirm('进货价高于售价,确认吗?')) {
                    vm.sendSupplier(this.huoPinObj);
                }
            } else {
                vm.sendSupplier(this.huoPinObj);
            }
        },
        sendSupplier(obj) {
            let vm = this;
            this.$refs.editHuoPinDlg.close();
            this.confirm('递交供应商发货,确认吗?', function () {
                vm.getData("orderFormItem/sendSupplier", {obj: JSON.stringify(obj)}, function (data) {
                    vm.loadItems();
                })
            })
        },
        selectOneSupplier(obj) {
            this.selectCommodityObj = obj;
            this.$refs.selectSupplier2Dlg.open();
            this.selectCommodity2();
            this.splitDrderList = [];
        },
        selectCommodity2() {
            let vm = this;
            this.getData("commoditySupplier/getCommoditySupplierList", {commodityid: this.selectCommodityObj.commodityId}, function (data) {
                vm.commoditySupplierList2 = data;
            })
        },
        cancelProcess(obj) {
            let vm = this;
            this.confirm('撤回已发采购单,确认吗?', function () {
                vm.getData("orderFormItem/cancelProcess", {itemId: obj.id}, function (data) {
                    vm.loadItems();
                })
            })
        },
        edit(obj) {
            this.editObj = this.clone(obj);
            this.$refs.editDlg.open();
        },
        modifyDirectly() {
            let vm = this;
            this.$refs.editDlg.close();
            this.confirm('直接更改发货信息,确认吗?', function () {
                vm.getData("orderFormItem/modifyDirectly", {obj: JSON.stringify(vm.editObj)}, function (data) {
                    vm.editObj = {};
                    vm.loadItems();
                })
            })
        },
        selectOtherSupplier() {
            this.$refs.selectSupplier2Dlg.close();
            this.$refs.selectOtherSupplierDlg.open();
        },
        selectSupplierOther(obj) {
            this.$set(this.selectCommodityObj, 'supplierid', obj.id);
            this.$set(this.selectCommodityObj, 'supplierName', obj.name);
            this.$set(this.selectCommodityObj, 'purchasePrice', 0);
            this.$refs.selectOtherSupplierDlg.close();
        },
        selectItemObj(obj) {
            this.huoPinObj = obj;
            this.$refs.editHuoPinDlg.open();
        },
        clearSupplier(obj) {
            this.confirm("确认吗?", function () {
                obj.supplierid = null;
                obj.supplierName = null;
                obj.purchasePrice = 0;
            })
        },
        viewImg(obj) {
            this.itemObj = obj;
            this.$refs.viewImgDlg.open();
        },
        getImgPath(path) {
            this.itemObj.imgPath = path;
        },
        getCellCss(row, value) {
            if (!value) {
                return {backgroundColor: "red"};
            }
            return null;
        },
        selectLogisticsType(obj) {
            this.$set(this.editObj, 'logisticsCompany', obj.carriers_id);
            this.$set(this.editObj, 'logisticsCompanyName', obj.carriers_name);
            this.$refs.selectLogisticsTypeDlg.close();
        },
        openSelectLogisticsTypeDlg() {
            this.$refs.selectLogisticsTypeDlg.open();
        },
        selectDeliveryTime(datestr) {
            this.$set(this.editObj, 'deliveryTime', datestr);
        },
        splitDrder() {
            if (this.huoPinObj.wareNum <= 1) {
                this.msg("商品数量不可拆单");
            } else {
                this.$refs.selectSplitDrderDlg.open();
            }
        },
        startSplitDrder() {
            if (this.splitDrderCount <= 1 || this.splitDrderCount > this.huoPinObj.wareNum) {
                this.alert("拆单数量必须大于1并小于等于" + this.huoPinObj.wareNum);
            } else {
                this.splitDrderList = [];
                for (let i = 0; i < this.splitDrderCount; i++) {
                    let obj = this.clone(this.huoPinObj);
                    if (this.huoPinObj.wareNum % this.splitDrderCount === 0) {
                        obj.wareNum = this.huoPinObj.wareNum / this.splitDrderCount;
                    } else {
                        obj.wareNum = 0;
                    }
                    obj.id = i;
                    this.splitDrderList.push(obj);
                }
            }
        },
        endCountInput(obj) {
            let count = 0;
            this.splitDrderList.forEach(function (e) {
                count += parseFloat(e.wareNum);
            })
            if (count > this.huoPinObj.wareNum) {
                this.msg("超出商品总数");
                obj.row.wareNum = 0;
            }
        },
        submitSplitDrder() {
            let count = 0;
            this.splitDrderList.forEach(function (e) {
                count += parseFloat(e.wareNum);
            })
            if (count !== this.huoPinObj.wareNum) {
                this.alert("拆单合计数量与商品总数不符");
            } else {
                let vm = this;
                this.confirm("拆分商品记录,确认吗?", function () {
                    vm.getData("orderFormItem/splitDrder", {
                        id: vm.huoPinObj.id,
                        rows: JSON.stringify(vm.splitDrderList)
                    }, function (data) {
                        vm.splitDrderList = [];
                        vm.splitDrderCount = 0;
                        vm.$refs.selectSplitDrderDlg.close();
                        vm.loadItems();
                    })
                })
            }
        },
        merge() {
            let rows = [];
            this.items.forEach(function (e) {
                if (e.selected) {
                    rows.push(e);
                }
            })
            if (rows.length <= 1) {
                this.alert('至少选择两行记录');
            } else {
                let vm = this;
                this.confirm("确认吗?", function () {
                    vm.getData("orderFormItem/merge", {rows: JSON.stringify(rows)}, function (data) {
                        vm.msg('合单成功');
                        vm.loadItems();
                    })
                })
            }
        },
        openAddressInfoDlg() {
            let count = 0;
            this.data.forEach(function (e) {
                if (e.selected) {
                    count++;
                }
            })
            if (!count) {
                this.msg('没有选择行');
            } else {
                this.$refs.selectAddressInfoDlg.open();
                let vm = this;
                this.getData("addressinfo/getList", {}, function (data) {
                    vm.addressInfoList = data;
                })
            }
        },
        submitOutStock() {
            let vm = this;
            this.confirm("订单出库,确认吗?", function () {
                let arr = [];
                vm.data.forEach(function (e) {
                    if (e.selected) {
                        arr.push(e);
                    }
                })
                vm.getData("orderForm/submitOutStock", {rows: JSON.stringify(arr), addressId: vm.addressId}, function (data) {
                    vm.$refs.selectAddressInfoDlg.close();
                    vm.alert(data);
                    vm.loadPage(1, vm.pageSize);
                })
            })
        },
        delivery(){
            let vm = this;
            this.confirm("订单发货,确认吗?", function () {
                let arr = [];
                vm.data.forEach(function (e) {
                    if (e.selected) {
                        arr.push(e);
                    }
                })
                vm.getData("orderForm/submitDelivery", {rows: JSON.stringify(arr)}, function (data) {
                    vm.msg('发货成功');
                    vm.loadPage(1, vm.pageSize);
                })
            })

        }
    }
}
</script>
<style scoped>
.b-red {
    border: 1px solid #F44336
    /*background-color: #ff9992*/
}

.c-red{
    color:red;
}

.b-m-1 {

    border-bottom: 1px solid #d2d2d2
}

.th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: right;
    width: 20%;
}

.td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    width: 80%
}

.f-bold {
    font-weight: bold;
}
</style>
