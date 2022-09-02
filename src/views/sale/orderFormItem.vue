<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :bodyStyle="{padding:'8px'}" :border="false">
                <ButtonGroup selectionMode="single">
                    <LinkButton iconCls="icon-edit" :toggle="false" :plain="false" @click="edit" :disabled="!obj.sendSupplier">编辑</LinkButton>
                    <LinkButton iconCls="icon-search" :toggle="false" :plain="false" @click="selectOneSupplier" :disabled="obj.sendSupplier">选择</LinkButton>
                    <LinkButton iconCls="icon-clear" :toggle="false" :plain="false" @click="clearSupplier" :disabled="obj.sendSupplier">清除</LinkButton>
                    <LinkButton iconCls="icon-redo" :toggle="false" :plain="false" @click="selectItemObj" :disabled="obj.sendSupplier">发送</LinkButton>
                    <LinkButton iconCls="icon-undo" :toggle="false" :plain="false" @click="cancelProcess" :disabled="!obj.sendSupplier">撤回</LinkButton>
                    <LinkButton :toggle="false" :plain="false" @click="splitDrder" :disabled="obj.sendSupplier">拆单</LinkButton>
                    <LinkButton :toggle="false" :plain="false" @click="merge" :disabled="obj.sendSupplier">合单</LinkButton>
                </ButtonGroup>
                <ButtonGroup selectionMode="single" style="margin-left: 20px">
                    <LinkButton :selected="!sendSupplier" @click="changeShow(false)">未发送供应商</LinkButton>
                    <LinkButton :selected="sendSupplier" @click="changeShow(true)">已发送供应商</LinkButton>
                </ButtonGroup>

<!--                <div class="pull-right">-->
<!--                    <filterList @filterLoad="filter" :page-size="pageSize" @changePageSize="changePageSize"></filterList>-->
<!--                </div>-->
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="east" style="width:200px;" v-if="orders.length">
            <Panel title="订单信息" class="f-full" style="height:100%" :border="false" bodyCls="f-column">
                <div v-if="orders.length">
                    <div v-if="orders[0].customOrderId" class="col-12 p-10">
                        <label class="f-bold">订单编号</label><br>
                        <div>{{ orders[0].customOrderId }}</div>
                    </div>
                    <div v-if="orders[0].operatorStateName" class="col-12 p-10">
                        <label class="f-bold">操作状态</label><br>
                        <div>{{ orders[0].operatorStateName }}</div>
                    </div>
                    <div v-if="orders[0].orderStateName" class="col-12 p-10">
                        <label class="f-bold">订单状态</label><br>
                        <div>{{ orders[0].orderStateName }}</div>
                    </div>
                    <div v-if="orders[0].pin" class="col-12 p-10">
                        <label class="f-bold">下单账号</label><br>
                        <div>{{ orders[0].pin }}</div>
                    </div>
                    <div v-if="orders[0].pay" class="col-12 p-10">
                        <label class="f-bold">支付金额</label><br>
                        <div>{{ toMoney(orders[0].pay, '') }} 元</div>
                    </div>
                    <div v-if="orders[0].consigneeName" class="col-12 p-10">
                        <label class="f-bold">收货人姓名</label><br>
                        <div>{{ orders[0].consigneeName }}</div>
                    </div>
                    <div v-if="orders[0].postcode" class="col-12 p-10">
                        <label class="f-bold">邮编</label><br>
                        <div>{{ orders[0].postcode }}</div>
                    </div>
                    <div v-if="orders[0].telephone" class="col-12 p-10">
                        <label class="f-bold">固定电话</label><br>
                        <div>{{ orders[0].telephone }}</div>
                    </div>
                    <div v-if="orders[0].phone" class="col-12 p-10">
                        <label class="f-bold">手机号码</label><br>
                        <div>{{ orders[0].phone }}</div>
                    </div>
                    <div v-if="orders[0].address" class="col-12 p-10">
                        <label class="f-bold">收货地址</label><br>
                        <div>{{ orders[0].address }}</div>
                    </div>
                    <div v-if="orders[0].expectedDeliveryTime" class="col-12 p-10">
                        <label class="f-bold">期望送货时间</label><br>
                        <div>{{ orders[0].expectedDeliveryTime }}</div>
                    </div>
                    <div v-if="orders[0].orderRemark" class="col-12 p-10">
                        <label class="f-bold">订单备注</label><br>
                        <div>{{ orders[0].orderRemark }}</div>
                    </div>
                    <div v-if="orders[0].email" class="col-12 p-10">
                        <label class="f-bold">电子邮件</label><br>
                        <div>{{ orders[0].email }}</div>
                    </div>
                    <div v-if="orders[0].orderCreateDate" class="col-12 p-10">
                        <label class="f-bold">订购日期/订单生成时间</label><br>
                        <div>{{ orders[0].orderCreateDate }}</div>
                    </div>
                    <!--            <div v-if="orders[0].sendPay" class="col-12 p-10">-->
                    <!--                <label class="f-bold">订单标识</label><br>-->
                    <!--                <div>{{orders[0].sendPay}}</div>-->
                    <!--            </div>-->
                    <!--            <div v-if="orders[0].paymentCategory" class="col-12 p-10">-->
                    <!--                <label class="f-bold">支付分类: COD, NON_COD</label><br>-->
                    <!--                <div>{{orders[0].paymentCategory}}</div>-->
                    <!--            </div>-->
                    <div v-if="orders[0].paymentCategoryDispName" class="col-12 p-10">
                        <label class="f-bold">支付分类名称</label><br>
                        <div>{{ orders[0].paymentCategoryDispName }}</div>
                    </div>
                    <div v-if="orders[0].createDate" class="col-12 p-10">
                        <label class="f-bold">创建日期</label><br>
                        <div>{{ orders[0].createDate }}</div>
                    </div>
                    <div v-if="orders[0].refundSourceFlag" class="col-12 p-10">
                        <label class="f-bold">退款标识</label><br>
                        <div>{{ orders[0].refundSourceFlag }}</div>
                    </div>
                    <!--            <div v-if="orders[0].provinceId" class="col-12 p-10">-->
                    <!--                <label class="f-bold">省份id</label><br>-->
                    <!--                <div>{{orders[0].provinceId}}</div>-->
                    <!--            </div>-->
                    <div v-if="orders[0].provinceName" class="col-12 p-10">
                        <label class="f-bold">省份名称</label><br>
                        <div>{{ orders[0].provinceName }}</div>
                    </div>
                    <!--            <div v-if="orders[0].cityId" class="col-12 p-10">-->
                    <!--                <label class="f-bold">市id</label><br>-->
                    <!--                <div>{{orders[0].cityId}}</div>-->
                    <!--            </div>-->
                    <div v-if="orders[0].cityName" class="col-12 p-10">
                        <label class="f-bold">市名称</label><br>
                        <div>{{ orders[0].cityName }}</div>
                    </div>
                    <!--            <div v-if="orders[0].countyId" class="col-12 p-10">-->
                    <!--                <label class="f-bold">县id</label><br>-->
                    <!--                <div>{{orders[0].countyId}}</div>-->
                    <!--            </div>-->
                    <div v-if="orders[0].countyName" class="col-12 p-10">
                        <label class="f-bold">县名称</label><br>
                        <div>{{ orders[0].countyName }}</div>
                    </div>
                    <!--            <div v-if="orders[0].townId" class="col-12 p-10">-->
                    <!--                <label class="f-bold">镇id</label><br>-->
                    <!--                <div>{{orders[0].townId}}</div>-->
                    <!--            </div>-->
                    <div v-if="orders[0].townName" class="col-12 p-10">
                        <label class="f-bold">镇名称</label><br>
                        <div>{{ orders[0].townName }}</div>
                    </div>
                    <div v-if="orders[0].memoByVendor" class="col-12 p-10">
                        <label class="f-bold">厂商备注</label><br>
                        <div>{{ orders[0].memoByVendor }}</div>
                    </div>
                    <div v-if="orders[0].parentOrderId" class="col-12 p-10">
                        <label class="f-bold">父单号</label><br>
                        <div>{{ orders[0].parentOrderId }}</div>
                    </div>
                    <div v-if="orders[0].commodityNum" class="col-12 p-10">
                        <label class="f-bold">商品数量</label><br>
                        <div>{{ orders[0].commodityNum }}</div>
                    </div>
                    <div v-if="orders[0].jdPrice" class="col-12 p-10">
                        <label class="f-bold">京东价</label><br>
                        <div>{{ toMoney(orders[0].jdPrice, '') }} 元</div>
                    </div>
                    <div v-if="orders[0].discount" class="col-12 p-10">
                        <label class="f-bold">优惠价</label><br>
                        <div>{{ toMoney(orders[0].discount, '') }} 元</div>
                    </div>
                    <div v-if="orders[0].reduceCount" class="col-12 p-10">
                        <label class="f-bold">优惠金额</label><br>
                        <div>{{ toMoney(orders[0].reduceCount, '') }} 元</div>
                    </div>
                    <div v-if="orders[0].totalCarriage" class="col-12 p-10">
                        <label class="f-bold">总运费</label><br>
                        <div>{{ toMoney(orders[0].totalCarriage, '') }} 元</div>
                    </div>
                    <div v-if="orders[0].cost" class="col-12 p-10">
                        <label class="f-bold">采购价</label><br>
                        <div>{{ toMoney(orders[0].cost, '') }} 元</div>
                    </div>
                    <!--            <div v-if="orders[0].vendorStoreId" class="col-12 p-10">-->
                    <!--                <label class="f-bold">商家仓id</label><br>-->
                    <!--                <div>{{orders[0].vendorStoreId}}</div>-->
                    <!--            </div>-->
                    <div v-if="orders[0].vendorStoreName" class="col-12 p-10">
                        <label class="f-bold">商家仓名称</label><br>
                        <div>{{ orders[0].vendorStoreName }}</div>
                    </div>
                    <div v-if="orders[0].updateDate" class="col-12 p-10">
                        <label class="f-bold">更新时间</label><br>
                        <div>{{ orders[0].updateDate }}</div>
                    </div>
                    <div v-if="orders[0].xid_buyer" class="col-12 p-10">
                        <label class="f-bold">下单账号2</label><br>
                        <div>{{ orders[0].xid_buyer }}</div>
                    </div>
                    <div v-if="orders[0].principal" class="col-12 p-10">
                        <label class="f-bold">订单负责人</label><br>
                        <div>{{ orders[0].principal }}</div>
                    </div>
                    <div v-if="orders[0].allocateTime" class="col-12 p-10">
                        <label class="f-bold">分配时间</label><br>
                        <div>{{ orders[0].allocateTime }}</div>
                    </div>
                    <div v-if="orders[0].errorMessge" class="col-12 p-10">
                        <label class="f-bold">错误信息</label><br>
                        <div>{{ orders[0].errorMessge }}</div>
                    </div>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <Layout bodyCls="f-column" :border="false">
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
                        <GridColumn title="图片" align="center" width="40">
                            <template slot="body" slot-scope="scope">
                                <div @click="viewImg(scope.row)">
                                    <img :src="'https://img11.360buyimg.com/n1/'+scope.row.imgPath" style="height: 24px;">
                                </div>
                            </template>
                        </GridColumn>
                        <GridColumn field='customOrderId' title='订单编号' width="120" align="center" :sortable="true"></GridColumn>
                        <!--                <GridColumn field='number' title='单据编号' width="120" align="center"></GridColumn>-->
                        <GridColumn field='sku' title='商品编号' width="120" align="center" :sortable="true"></GridColumn>
                        <GridColumn field='upc' title='商品UPC编号' width="120" align="center"></GridColumn>
                        <GridColumn field='wareName' title='商品名称' width="220" align="left" :sortable="true"></GridColumn>
                        <GridColumn field='zh_brand' title='品牌名称' width="100" align="left" :sortable="true"></GridColumn>
                        <GridColumn title='商品数量' width="100" align="center">
                            <template slot="body" slot-scope="scope">
                                {{ scope.row.wareNum }} {{ scope.row.sku_unit }}
                            </template>
                        </GridColumn>
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
                        <GridColumn field='purchasePrice' title='采购价' width="120" align="center" :editable="true" :cellCss="getCellCss"></GridColumn>
                        <GridColumn field='supplierName' title='供应商' width="120" align="center" :cellCss="getCellCss" :sortable="true"></GridColumn>
                        <GridColumn field='sendType' title='送货方式' width="120" align="center" :cellCss="getCellCss" :sortable="true"></GridColumn>
                        <GridColumn field='logisticsCompanyName' title='物流公司' width="120" align="center"></GridColumn>
                        <GridColumn field='logisticsNumber' title='物流单号' width="120" align="center"></GridColumn>
                        <GridColumn field='deliveryTime' title='发货时间' width="120" align="center"></GridColumn>
                        <GridColumn field='poId' title='采购单号' width="120" align="center"></GridColumn>
                        <GridColumn field='roId' title='退货单号' width="120" align="center"></GridColumn>
                    </DataGrid>
                </LayoutPanel>
            </Layout>
        </LayoutPanel>
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
        <Dialog bodyCls="f-column" ref="editDlg" closed
                :title="'编辑信息'"
                :dialogStyle="{width:'600px',height:'620px'}"
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
                        <th class="th">采购单号</th>
                        <td class="td">{{ editObj.poId }}</td>
                    </tr>
                    <tr>
                        <th class="th">退货单号</th>
                        <td class="td">{{ editObj.roId }}</td>
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
                        <th class="th">采购价</th>
                        <td class="td">
                            <input type="text" class="form-control" v-model="editObj.purchasePrice"></td>
                    </tr>
                    <tr>
                        <th class="th">供应商</th>
                        <td class="td" colspan="5">{{ editObj.supplierName }}</td>
                    </tr>
                    <tr>
                        <th class="th">物流公司</th>
                        <td class="td">
                            <input type="text" class="form-control" readonly v-model="editObj.logisticsCompanyName" @click="openSelectLogisticsTypeDlg"></td>
                    </tr>
                    <tr>
                        <th class="th">物流单号</th>
                        <td class="td">
                            <input type="text" class="form-control" v-model="editObj.logisticsNumber"></td>
                    </tr>
                    <tr>
                        <th class="th">发货时间</th>
                        <td class="td">
                            <selectDateTime ref="selectDateTimeCom" @selectDT="selectDeliveryTime" :value="editObj.deliveryTime"></selectDateTime>
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
                :dialogStyle="{width:'600px',height:'600px'}"
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

                    <GridColumn title='上次采购价' width="100" align="right">
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
                :dialogStyle="{width:'80vW',height:'80vH'}"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <selectSupplier ref="selectSupplierCom" @selectSupplier="selectSupplierOther"></selectSupplier>
            </div>
        </Dialog>
        <Dialog bodyCls="f-column" ref="editHuoPinDlg" closed
                :title="'编辑货品信息'"
                :dialogStyle="{width:'80vW',height:'80vH'}"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <Layout bodyCls="f-column" :border="false">
                    <LayoutPanel region="center" bodyCls="f-column" style="height: 100%" :border="false">
                        <DataGrid :data="sendList" :border="false"
                                  class="f-full"
                                  :rowCss="getRowCss"
                                  :columnResizing="true">
                            <GridColumn align="center" cellCss="datagrid-td-rownumber" width="30" :frozen="true">
                                <template slot="body" slot-scope="scope">
                                    {{ scope.rowIndex + 1 }}
                                </template>
                            </GridColumn>

                            <GridColumn field='customOrderId' title='订单编号' width="120" align="center" :frozen="true"></GridColumn>
                            <GridColumn field='number' title='单据编号' width="120" align="center"></GridColumn>
                            <GridColumn field='sku' title='商品编号' width="120" align="center"></GridColumn>
                            <GridColumn field='upc' title='商品UPC编号' width="120" align="center"></GridColumn>
                            <GridColumn field='wareName' title='商品名称' width="220" align="left"></GridColumn>
                            <GridColumn field='wareNum' title='商品数量' width="80" align="center"></GridColumn>
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
                            <GridColumn field='purchasePrice' title='采购价' width="120" align="center" :editable="true"></GridColumn>
                            <GridColumn field='supplierName' title='供应商' width="120" align="center"></GridColumn>
                            <GridColumn field='logisticsCompanyName' title='物流公司' width="120" align="center"></GridColumn>
                            <GridColumn field='logisticsNumber' title='物流单号' width="120" align="center"></GridColumn>
                            <GridColumn field='deliveryTime' title='发货时间' width="120" align="center"></GridColumn>
                            <GridColumn field='poId' title='采购单号' width="120" align="center"></GridColumn>
                            <GridColumn field='roId' title='退货单号' width="120" align="center"></GridColumn>
                        </DataGrid>
                    </LayoutPanel>
                </Layout>
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

            <viewImgs ref="viewImgs" :wareid="obj.sku" :mainbodyid="obj.mainBodyId" @getImgPath="getImgPath"></viewImgs>
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
                        <NumberBox inputId="n1" v-model="splitDrderCount" :value="splitDrderCount" :max="obj.wareNum" :min="1" :spinners="true"></NumberBox>
                        <LinkButton style="margin-left: 10px" @click="startSplitDrder">确定</LinkButton>

                        <div class="pull-right">
                            <LinkButton style="margin-left: 10px" @click="submitSplitDrder">提交</LinkButton>
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
                        <GridColumn field='sku' title='商品编号' width="120" align="center" :sortable="true"></GridColumn>
                        <GridColumn field='upc' title='商品UPC编号' width="120" align="center"></GridColumn>
                        <GridColumn field='wareName' title='商品名称' width="220" align="left" :sortable="true"></GridColumn>
                        <GridColumn field='zh_brand' title='品牌名称' width="100" align="center" :sortable="true"></GridColumn>
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
            pageSize: 20,
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
            commoditySupplierList2: [],
            csObj: {},
            allSelected: false,
            logs: [],
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
            objOrder: {},
            orders: [],
            sendList: [],
            imgs: [],
            sendSupplier: false,
            orderState: 7,
            operatorState: -1,
            refundSourceFlag: -1,
            orderStates: [
                {id: -1, title: '全部订单状态'},
                {id: 7, title: '新订单'},
                {id: 10, title: '等待发货'},
                {id: 16, title: '等待确认收货'},
                {id: 19, title: '订单完成'},
                {id: 22, title: '发生退款'},
                {id: 29, title: '订单删除'}
            ],
            operatorStates: [
                {id: -1, title: '全部操作状态'},
                {id: 0, title: '初始状态'},
                {id: 5, title: '新订单'},
                {id: 9, title: '出库中'},
                {id: 10, title: '等待发货'},
                {id: 16, title: '发货完成'},
            ],
            refundSourceFlags: [
                {id: -1, title: '全部退款标识'},
                {id: 0, title: '无退款'},
                {id: 1, title: '售前取消'},
                {id: 2, title: '售后取消'},
            ],
            splitDrderList: [],
            splitDrderCount: 1,
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
        changeShow(t) {
            this.sendSupplier = t;
            this.loadPage(1,this.pageSize);
        },
        sort(obj) {
            if (obj.length > 0) {
                this.field = obj[0].field;
                this.order = obj[0].order;
                this.loadPage(1,this.pageSize);
            }
        },
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
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
            this.loading = true;
            let vm = this;
            this.$root.getData("orderFormItem/getMyItems", {
                limit: pageSize,
                offset: pageSize * (pageNumber - 1),
                filterString: this.filterString,
                sendSupplier: this.sendSupplier
            }, function (data) {
                vm.data = [];
                vm.allSelected = false;
                vm.total = data.total;
                data.children.forEach(function (e) {
                    vm.data.push(e);
                    vm.$set(e, 'selected', false);
                })
                vm.loading = false;
                vm.obj = {};
                vm.orders = [];
            })
        },
        selectObj(obj) {
            this.splitDrderList=[];
            this.splitDrderCount=1;
            this.obj = obj;
            let vm = this;
            this.getData("orderForm/getViewObj", {id: obj.orderFormId}, function (data) {
                vm.orders = [];
                vm.orders.push(data);
            })
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
            this.loadPage();
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
        },
        testSend() {
            let vm = this;
            this.$refs.editHuoPinDlg.close();
            this.confirm("发送供应商,确认吗?", function () {
                vm.getData("orderFormItem/sendMultipleSupplier", {rows: JSON.stringify(vm.sendList)}, function (data) {
                    vm.loadPage(vm.pageNumber, vm.pageSize);
                })
            })
        },
        selectOneSupplier() {
            this.selectCommodityObj = this.obj;
            this.$refs.selectSupplier2Dlg.open();
            this.selectCommodity2();
        },
        selectCommodity2() {
            let vm = this;
            this.getData("commoditySupplier/getList", {sku: this.selectCommodityObj.sku}, function (data) {
                vm.commoditySupplierList2 = data;
            })
        },
        cancelProcess() {
            let vm = this;
            this.confirm('撤回已发采购单,确认吗?', function () {
                vm.getData("supplierPurchaseOrder/cancelProcess", {itemId: vm.obj.id}, function (data) {
                    vm.loadItems();
                })
            })
        },
        edit() {
            this.editObj = this.clone(this.obj);
            this.$refs.editDlg.open();
        },
        modifyDirectly() {
            let vm = this;
            this.$refs.editDlg.close();
            this.confirm('直接更改发货信息,确认吗?', function () {
                vm.getData("orderFormItem/modifyDirectly", {obj: JSON.stringify(vm.editObj)}, function (data) {
                    vm.editObj = {};
                    vm.loadPage(1, vm.pageSize);
                })
            })
        },
        selectOtherSupplier() {
            this.$refs.selectSupplier2Dlg.close();
            this.$refs.selectOtherSupplierDlg.open();
        },
        selectSupplierOther(obj) {
            this.$set(this.obj, 'supplierid', obj.id);
            this.$set(this.obj, 'supplierName', obj.name);
            this.$set(this.obj, 'purchasePrice', 0);
            this.$refs.selectOtherSupplierDlg.close();
        },
        selectItemObj() {
            this.sendList = [];
            let vm = this;
            this.data.forEach(function (e) {
                if (e.selected) {
                    vm.sendList.push(e);
                }
            })
            if (!this.sendList.length) {
                this.msg('没有选择任何行');
            } else {
                this.$refs.editHuoPinDlg.open();
            }
        },
        clearSupplier() {
            let vm = this;
            this.confirm("清除已选供应商和采购价,确认吗?", function () {
                vm.$set(vm.obj, 'supplierid', null);
                vm.$set(vm.obj, 'supplierName', null);
                vm.$set(vm.obj, 'purchasePrice', null);
            })
        },
        viewImg(obj) {
            this.obj = obj;
            this.$refs.viewImgDlg.open();
        },
        getImgPath(path) {
            this.obj.imgPath = path;
        },
        getCellCss(row, value) {
            if (!value) {
                return {backgroundColor: "#ffe5e4"};
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
        splitDrder() {
            if(this.obj.wareNum<=1){
                this.msg("商品数量不可拆单");
            }else{
                this.$refs.selectSplitDrderDlg.open();
            }
        },
        startSplitDrder() {
            if (this.splitDrderCount <= 1 || this.splitDrderCount > this.obj.wareNum) {
                this.alert("拆单数量必须大于1并小于等于" + this.obj.wareNum);
            } else {
                this.splitDrderList = [];
                for (let i = 0; i < this.splitDrderCount; i++) {
                    let obj = this.clone(this.obj);
                    if (this.obj.wareNum % this.splitDrderCount === 0) {
                        obj.wareNum = this.obj.wareNum / this.splitDrderCount;
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
            if (count > this.obj.wareNum) {
                this.msg("超出商品总数");
                obj.row.wareNum = 0;
            }
        },
        submitSplitDrder() {
            let count = 0;
            this.splitDrderList.forEach(function (e) {
                count += parseFloat(e.wareNum);
            })
            if (count !== this.obj.wareNum) {
                this.alert("拆单合计数量与商品总数不符");
            } else {
                let vm = this;
                this.confirm("拆分商品记录,确认吗?", function () {
                    vm.getData("orderFormItem/splitDrder", {
                        id: vm.obj.id,
                        rows: JSON.stringify(vm.splitDrderList)
                    }, function (data) {
                        vm.splitDrderList = [];
                        vm.splitDrderCount = 0;
                        vm.$refs.selectSplitDrderDlg.close();
                        vm.loadPage(vm.pageNumber, vm.pageSize);
                    })
                })
            }
        },
        merge() {
            let rows = [];
            this.data.forEach(function (e) {
                if (e.selected) {
                    rows.push(e);
                }
            })
            if (rows.length < 1) {
                this.alert('至少选择两行记录');
            } else {
                let vm = this;
                this.confirm("确认吗?", function () {
                    vm.getData("orderFormItem/merge", {rows: JSON.stringify(rows)}, function (data) {
                        vm.msg('合单成功');
                        vm.loadPage(vm.pageNumber, vm.pageSize);
                    })
                })
            }
        },
        selectDeliveryTime(datestr) {
            this.$set(this.editObj, 'deliveryTime', datestr);
        }
    }
}
</script>
<style scoped>
.b-red {
    /*border: 1px solid #ffebeb*/
    border: 1px solid #ff0000
}

.b-m-1 {

    border-bottom: 1px solid #d2d2d2
}

.f-bold {
    font-weight: bold;
}

.th {
    border: 1px solid #ddd;
    padding: 5px;
    text-align: right;
    word-break: break-all;
    width: 20%
}

.td {
    border: 1px solid #ddd;
    padding: 5px;
    text-align: left;
    word-break: break-all;
    width: 80%
}
</style>
