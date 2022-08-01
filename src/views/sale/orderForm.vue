<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <LinkButton iconCls="icon-reload" :plain="true" @click="changeCommodity">换货</LinkButton>
                <LinkButton iconCls="icon-print" :plain="true" @click="print">打印单据</LinkButton>
                <LinkButton iconCls="icon-ok" :plain="true" @click="finish">完成订单</LinkButton>
                <div class="pull-right">
                    <filterList @filterLoad="filter"></filterList>
                </div>
            </Panel>
        </LayoutPanel>
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
                <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30" :frozen="true">
                    <template slot="body" slot-scope="scope">
                        {{ scope.rowIndex + 1 }}
                    </template>
                </GridColumn>
                <!--                <GridColumn field="status" :width="50" align="center" :frozen="true">-->
                <!--                    <template slot="header" slot-scope="scope">-->
                <!--                        <input type="checkbox" v-model="allSelected"-->
                <!--                               @click="all">-->
                <!--                    </template>-->
                <!--                    <template slot="body" slot-scope="scope">-->
                <!--                        <input type="checkbox" v-model="scope.row.selected"-->
                <!--                               @click="scope.row.selected=!scope.row.selected">-->
                <!--                    </template>-->
                <!--                </GridColumn>-->
                <GridColumn field='customOrderId' title='订单编号' width="120" align="center" :frozen="true"></GridColumn>
                <GridColumn field='pin' title='下单账号' width="120" align="center"></GridColumn>
                <GridColumn field='pay' title='支付金额' width="120" align="center"></GridColumn>
                <GridColumn field='commodityNum' title='商品数量' width="120" align="center"></GridColumn>
                <GridColumn field='jdPrice' title='京东价' width="120" align="center"></GridColumn>
                <GridColumn field='discount' title='优惠价' width="120" align="center"></GridColumn>
                <GridColumn field='reduceCount' title='优惠金额' width="120" align="center"></GridColumn>
                <GridColumn field='totalCarriage' title='总运费' width="120" align="center"></GridColumn>
                <GridColumn field='cost' title='采购价' width="120" align="center"></GridColumn>
                <GridColumn field='consigneeName' title='收货人姓名' width="120" align="center"></GridColumn>
                <GridColumn field='postcode' title='邮编' width="120" align="center"></GridColumn>
                <GridColumn field='expectedDeliveryTime' title='期望送货时间' width="120" align="center"></GridColumn>
                <GridColumn field='telephone' title='固定电话' width="120" align="center"></GridColumn>
                <GridColumn field='phone' title='手机号码' width="120" align="center"></GridColumn>
                <GridColumn field='email' title='电子邮件' width="120" align="center"></GridColumn>
                <GridColumn field='address' title='收货地址' width="120" align="center"></GridColumn>
                <GridColumn field='orderRemark' title='订单备注' width="120" align="center"></GridColumn>
                <GridColumn field='orderCreateDate' title='订购日期/订单生成时间' width="120" align="center"></GridColumn>
                <GridColumn field='sendPay' title='订单标识' width="120" align="center"></GridColumn>
                <GridColumn field='paymentCategoryDispName' title='支付分类名称' width="120" align="center"></GridColumn>
                <GridColumn field='createDate' title='创建日期' width="120" align="center"></GridColumn>
                <GridColumn field='refundSourceFlag' title='退款标识' width="120" align="center"></GridColumn>
                <GridColumn field='provinceName' title='省份名称' width="120" align="center"></GridColumn>
                <GridColumn field='cityName' title='市名称' width="120" align="center"></GridColumn>
                <GridColumn field='countyName' title='县名称' width="120" align="center"></GridColumn>
                <GridColumn field='townName' title='镇名称' width="120" align="center"></GridColumn>
                <GridColumn field='vendorStoreName' title='商家仓名称' width="120" align="center"></GridColumn>
                <GridColumn field='updateDate' title='更新时间' width="120" align="center"></GridColumn>
                <GridColumn field='open_id_buyer' title='下单账号' width="120" align="center"></GridColumn>
                <GridColumn field='xid_buyer' title='下单账号2' width="120" align="center"></GridColumn>
                <GridColumn field='allocateTime' title='分配时间' width="120" align="center"></GridColumn>
                <GridColumn field='finish' title='完成状态' width="120" align="center"></GridColumn>
                <GridColumn field='finishTime' title='完成时间' width="120" align="center"></GridColumn>
                <GridColumn field='orgName' title='负责机构' width="120" align="center"></GridColumn>
                <GridColumn field='principalName' title='负责专员' width="120" align="center"></GridColumn>
                <GridColumn field='operatorState' title='操作状态' width="120" align="center"></GridColumn>
                <GridColumn field='orderState' title='订单状态' width="120" align="center"></GridColumn>
                <GridColumn field='memoByVendor' title='厂商备注' width="120" align="center"></GridColumn>
            </DataGrid>
        </LayoutPanel>
        <LayoutPanel region="south" style="height:30%;" bodyCls="f-column" :border="false">
            <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
                <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">

                    <Tabs :plain="false" :narrow="false" :justified="false" style="height:100%" bodyCls="f-column">
                        <TabPanel :title="'货品列表'" bodyCls="f-column">
                            <Panel class="f-full" :border="false" bodyCls="f-column">
                                <DataGrid :data="items" :border="false"
                                          :columnResizing="true"
                                          :rowCss="getItemRowCss"
                                          class="f-full">

                                    <GridColumn title="编辑" align="center" width="80">
                                        <template slot="body" slot-scope="scope">
                                            <div>
                                                <a v-if="scope.row.sendSupplier" @click="edit(scope.row)" style="color:red;margin-left: 10px">编辑</a>
                                            </div>
                                        </template>
                                    </GridColumn>

                                    <GridColumn title="操作" align="center" width="80">
                                        <template slot="body" slot-scope="scope">
                                            <div v-if="!scope.row.logisticsCompanyName || !scope.row.logisticsNumber || !scope.row.deliveryTime">
                                                <a v-if="!scope.row.sendSupplier" @click="testSend(scope.row)" style="color:green">发送供应商</a>
                                                <a v-if="scope.row.sendSupplier" @click="cancelProcess(scope.row)" style="color:red;margin-left: 10px">撤回</a>
                                            </div>
                                            <div v-if="scope.row.logisticsCompanyName && scope.row.logisticsNumber && scope.row.deliveryTime">
                                                <a style="color:green">已发货</a>
                                            </div>
                                        </template>
                                    </GridColumn>
                                    <GridColumn field='number' title='单据编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='upc' title='商品UPC编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='commodityName' title='商品名称' width="120" align="left"></GridColumn>
                                    <GridColumn field='wareNum' title='商品数量' width="120" align="center"></GridColumn>
                                    <GridColumn field='jdPrice' title='京东价' width="120" align="center"></GridColumn>
                                    <GridColumn field='discount' title='优惠价' width="120" align="center"></GridColumn>
                                    <GridColumn field='cost' title='采购价' width="120" align="center"></GridColumn>
                                    <GridColumn field='supplierName' title='供应商' width="120" align="center"></GridColumn>
                                    <GridColumn field='logisticsCompanyName' title='物流公司' width="120" align="center"></GridColumn>
                                    <GridColumn field='logisticsNumber' title='物流单号' width="120" align="center"></GridColumn>
                                    <GridColumn field='deliveryTime' title='发货时间' width="120" align="center"></GridColumn>
                                </DataGrid>
                            </Panel>
                        </TabPanel>
                        <TabPanel :title="'原单货品列表'" bodyCls="f-column">
                            <Panel class="f-full" :border="false" bodyCls="f-column">
                                <DataGrid :data="items2" :border="false"
                                          :columnResizing="true"
                                          class="f-full">
                                    <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='upc' title='商品UPC编号' width="120" align="center"></GridColumn>
                                    <GridColumn field='commodityName' title='商品名称' width="120" align="center"></GridColumn>
                                    <GridColumn field='wareNum' title='商品数量' width="120" align="center"></GridColumn>
                                    <GridColumn field='jdPrice' title='京东价' width="120" align="center"></GridColumn>
                                    <GridColumn field='discount' title='优惠价' width="120" align="center"></GridColumn>
                                    <GridColumn field='cost' title='采购价' width="120" align="center"></GridColumn>
                                    <GridColumn field='pold' title='采购单号' width="120" align="center"></GridColumn>
                                    <GridColumn field='rold' title='退货单号' width="120" align="center"></GridColumn>
                                    <GridColumn field='supplierName' title='供应商' width="120" align="center"></GridColumn>
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
                                    <th class="text-right th">收货地址</th>
                                    <td class="text-left td">{{ obj.address }}</td>
                                    <th class="text-right th">订单备注</th>
                                    <td class="text-left td">{{ obj.orderRemark }}</td>
                                </tr>
                                <tr>
                                    <th class="text-right th">订购日期/订单生成时间</th>
                                    <td class="text-left td">{{ obj.orderCreateDate }}</td>
                                    <th class="text-right th">订单标识</th>
                                    <td class="text-left td">{{ obj.sendPay }}</td>
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
                                    <th class="text-right th">完成用户编号</th>
                                    <td class="text-left td">{{ obj.finishUserid }}</td>
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
                                    <GridColumn field='operateTime' title='操作时间' :sortable="true" width="220" align="center"></GridColumn>
                                    <GridColumn field='operate' title='操作信息' align="left"></GridColumn>
                                </DataGrid>
                            </Panel>
                        </TabPanel>
                    </Tabs>
                </LayoutPanel>
                <!--                <LayoutPanel region="east" style="width:220px;" bodyCls="f-column" :border="true">-->
                <!--                    <div class="col-12 p-t-10 p-l-10 p-r-10">-->
                <!--                        <b>买家留言:</b>-->
                <!--                        <div>{{ obj.buyerMessage }}</div>-->
                <!--                    </div>-->
                <!--                    <div class="col-12 p-t-10 p-l-10 p-r-10">-->
                <!--                        <b>客服备注:</b>-->
                <!--                        <div>{{ obj.customerServiceRemarks }}</div>-->
                <!--                    </div>-->
                <!--                    <div class="col-12 p-t-10 p-l-10 p-r-10">-->
                <!--                        <b>打印备注:</b>-->
                <!--                        <div>{{ obj.printRemarks }}</div>-->
                <!--                    </div>-->
                <!--                    <div class="col-12 p-t-10 p-l-10 p-r-10">-->
                <!--                        <b>发票内容:</b>-->
                <!--                        <div>{{ obj.invoiceContent }}</div>-->
                <!--                    </div>-->
                <!--                </LayoutPanel>-->

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
                            <GridColumn field='commodityName' title='商品名称' width="120" align="center"></GridColumn>
                            <GridColumn field='wareNum' title='商品数量' width="120" align="center"></GridColumn>
                            <GridColumn field='jdPrice' title='京东价' width="120" align="center"></GridColumn>
                            <GridColumn field='discount' title='优惠价' width="120" align="center"></GridColumn>
                            <GridColumn field='cost' title='采购价' width="120" align="center"></GridColumn>
                            <GridColumn field='supplierName' title='供应商' width="120" align="center"></GridColumn>
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
                            <GridColumn field='commodityName' title='商品名称' width="120" align="center"></GridColumn>
                            <GridColumn field='wareNum' title='商品数量' width="120" align="center" :editable="true"></GridColumn>
                            <GridColumn field='jdPrice' title='京东价' width="120" align="center" :editable="true"></GridColumn>
                            <GridColumn field='discount' title='优惠价' width="120" align="center" :editable="true"></GridColumn>
                            <GridColumn field='cost' title='采购价' width="120" align="center" :editable="true"></GridColumn>
                            <GridColumn field='supplierName' title='供应商' width="120" align="center"></GridColumn>
                        </DataGrid>
                    </Panel>
                </LayoutPanel>
            </Layout>
        </Dialog>
        <Dialog bodyCls="f-column" ref="selectCommoditySupplierDlg" closed
                :title="'选择一个供应商'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'50vW',height:'50vH'}"
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
                    <GridColumn field='lastPurchasePrice' title='上次采购价' width="120" align="center"></GridColumn>
                    <GridColumn field='lowestPurchasePrice' title='最低采购价' width="120" align="center"></GridColumn>
                    <GridColumn field='retailPrice' title='零售价' width="120" align="center"></GridColumn>
                    <GridColumn field='remark' title='备注' width="120" align="center"></GridColumn>
                </DataGrid>
            </Layout>
        </Dialog>
        <selectCommodity ref="selectCommodityCom" @selectCommodity="selectCommodity"></selectCommodity>

        <Dialog bodyCls="f-column" ref="editDlg" closed
                :title="'编辑信息'"
                :dialogStyle="{width:'50vW',height:'40vH'}"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <table class="table" style="width: 100%">
                    <tbody>
                    <tr>
                        <th class="text-right th">商品名称</th>
                        <td class="text-left td" colspan="3">{{ editObj.commodityName }}</td>
                    </tr>
                    <tr>
                        <th class="text-right th">商品编号</th>
                        <td class="text-left td">{{ editObj.sku }}</td>
                        <th class="text-right th">商品数量</th>
                        <td class="text-left td">{{ editObj.wareNum }}</td>
                    </tr>
                    <tr>
                        <th class="text-right th">供应商名称</th>
                        <td class="text-left td">{{ editObj.supplierName }}</td>
                        <th class="text-right th">京东价</th>
                        <td class="text-left td">{{ editObj.jdPrice }}</td>
                    </tr>
                    <tr>
                        <th class="text-right th">采购价</th>
                        <td class="text-left td">
                            <input type="text" class="form-control" v-model="editObj.cost">
                        </td>
                        <th class="text-right th">发货时间</th>
                        <td class="text-left td">
                            <input type="datetime-local" class="form-control" v-model="editObj.deliveryTime">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-right th">物流公司</th>
                        <td class="text-left td">
                            <input type="text" class="form-control" v-model="editObj.logisticsCompanyName">
                        </td>
                        <th class="text-right th">物流单号</th>
                        <td class="text-left td">
                            <input type="text" class="form-control" v-model="editObj.logisticsNumber">
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
    </Layout>
</template>

<script>
import selectCommodity from '@/components/selectCommodity.vue';
import filterList from '@/components/filterList.vue';

export default {
    name: "app",
    data() {
        return {
            total: 0,
            pageSize: 15,
            pageNumber: 1,
            data: [],
            items: [],
            loading: false,
            obj: {},
            viewObj: [],
            suppliers: [],
            units: [],
            types: [],
            sources: [],
            timeout: null,
            commoditySupplier: [],
            csObj: {},
            allSelected: false,
            logs: [],
            itemObj: {},
            changeItems: [],
            commoditySupplierList: [],
            addCommodityObj: {},
            items2: [],
            editObj: {}
        }
    },
    components: {
        filterList, selectCommodity
    },
    created: function () {
        this.loadPage(this.pageNumber, this.pageSize);
        this.loadSuppliers();
    },
    methods: {
        loadSuppliers: function () {
            let vm = this;
            this.getData("supplier/getList", {}, function (data) {
                vm.suppliers = data;
            })
            this.$root.getData("api/getDictList", {}, function (data) {
                data.forEach(function (e) {
                    if (e.key === 'jiliangdanwei') {
                        vm.units.push(e);
                    }
                    if (e.key === 'chanpinleibie') {
                        vm.types.push(e);
                    }
                    if (e.key === 'shangPinLeiYuan') {
                        vm.sources.push(e);
                    }
                })
            })
        },
        onPageChange(event) {
            this.loadPage(event.pageNumber, event.pageSize);
        },
        loadPage(pageNumber, pageSize) {
            this.loading = true;
            let vm = this;
            this.$root.getData("orderForm/getQueryList", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                sort: "id",
                direction: "desc",
                filterString: this.filterString
            }, function (data) {
                vm.total = data.total;
                vm.data = [];
                data.children.forEach(function (e) {
                    vm.data.push(e);
                    vm.$set(e, 'selected', false);
                })
                vm.loading = false;
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
                vm.items2 = data.items2;
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
        all() {
            let vm = this;
            this.allSelected = !this.allSelected;
            this.data.forEach(function (e) {
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
                    vm.loadPage(vm.pageNumber, vm.pageSize);
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
            let vm = this;
            this.getData("commoditySupplier/getList", {commodityid: obj.id}, function (data) {
                vm.commoditySupplierList = [];
                if (!data.length) {
                    vm.alert('商品没有设置供应商');
                } else {
                    if (data.length === 1) {
                        vm.changeItems.push({
                            id: 0,
                            commodityId: obj.id,
                            sku: obj.wareid,
                            commodityName: obj.name,
                            wareNum: 0,
                            jdPrice: 0,
                            discount: 0,
                            cost: data[0].lastPurchasePrice,
                            supplierid: data[0].supplierid,
                            supplierName: data[0].suppliername
                        })
                    } else {
                        vm.commoditySupplierList = data;
                        vm.addCommodityObj = {
                            id: 0,
                            commodityId: obj.id,
                            sku: obj.wareid,
                            commodityName: obj.name,
                            wareNum: 0,
                            jdPrice: 0,
                            discount: 0,
                            cost: 0
                        }
                        vm.$refs.selectCommoditySupplierDlg.open();
                    }
                }
            })
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
        testSend(obj) {
            let vm = this;
            if (parseFloat(obj.cost) > parseFloat(obj.jdPrice)) {
                if (confirm('采购价大于售价,确认啊?')) {
                    vm.sendSupplier(obj);
                }
            } else {
                vm.sendSupplier(obj);
            }
        },
        sendSupplier(obj) {
            let vm = this;
            this.confirm('递交供应商发货,确认吗?', function () {
                vm.getData("orderFormItem/sendSupplier", {id: obj.id}, function (data) {
                    vm.loadItems();
                })
            })
        },
        cancelProcess(obj) {
            let vm = this;
            this.confirm('撤回已发采购单,确认吗?', function () {
                vm.getData("supplierPurchaseOrder/cancelProcess", {itemId: obj.id}, function (data) {
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
                vm.getData("orderFormItem/modifyDirectly", {obj:JSON.stringify(vm.editObj)}, function (data) {
                    vm.editObj = {};
                    vm.loadItems();
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

.b-m-1 {

    border-bottom: 1px solid #d2d2d2
}

.th {
    border: 1px solid #ddd;
    padding: 3px;
    line-height: 35px;
}

.td {
    border: 1px solid #ddd;
    padding: 3px;
    line-height: 35px;
}
</style>
