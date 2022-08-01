import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import index from '../views/index.vue'
import nav from '../views/nav.vue'
import emptyToNav from '../views/emptyToNav.vue'
import empty from '../views/empty.vue'
import selectCommodity from '../components/selectCommodity.vue'
import shangPinGuanLi from '../views/commodity/shangPinGuanLi.vue'
import warehouseSet from '../views/system/warehouseSet.vue'
import purchaseOrderList from '../views/purchase/purchaseOrderList.vue'
import orgSet from '../views/system/orgSet.vue'
import userSet from '../views/system/userSet.vue'
import userRoleSet from '../views/system/userRoleSet.vue'
import accountingsubjects from '../views/finance/accountingsubjects.vue'
import paymentOrder from '../views/finance/paymentOrder.vue'
import dictSet from '../views/system/dictSet.vue'
import calendarSet from '../views/system/calendarSet.vue'
import powerGroup from '../views/system/powerGroup.vue'
import roleSet from '../views/system/roleSet.vue'
import supplier from '../views/system/supplier.vue'
import shopSet from '../views/system/shopSet.vue'
import orderForm from '../views/sale/orderForm.vue'
import logisticsCompany from '../views/system/logisticsCompany.vue'
import logisticsType from '../views/system/logisticsType.vue'
import jiekou from '../views/system/jiekou.vue'
import orderFormReview from '../views/sale/orderFormReview.vue'
import offlineOrder from '../views/sale/offlineOrder.vue'
import customerSet from '../views/system/customerSet.vue'
import newPaymentRequestForm from '../views/purchase/newPaymentRequestForm.vue'
import finishOfflineOrder from '../views/sale/finishOfflineOrder.vue'
import paymentList from '../views/finance/paymentList.vue'
import newPayment from '../views/finance/newPayment.vue'
import stockTransferOrderList from '../views/stock/stockTransferOrderList.vue'
import receiptOrder from '../views/finance/receiptOrder.vue'
import newReceiptOrder from '../views/finance/newReceiptOrder.vue'
import rceceiptApplicationForm from '../views/finance/rceceiptApplicationForm.vue'
import newRceceiptApplicationForm from '../views/finance/newRceceiptApplicationForm.vue'
import stockQuery from '../views/stock/stockQuery.vue'
import directstorageList from '../views/stock/directstorageList.vue'
import newDirectstorage from '../views/stock/newDirectstorage.vue'
import newStockTransferOrder from '../views/stock/newStockTransferOrder.vue'
import paymentRequestForm from '../views/purchase/paymentRequestForm.vue'
import PaymentOrderSupervisorReview from '../views/process/payment/PaymentOrderSupervisorReview.vue'
import paymentStatementFinancialPayment from '../views/process/payment/paymentStatementFinancialPayment.vue'
import PaymentOrderSponsor from '../views/process/payment/PaymentOrderSponsor.vue'
import financeReceivePayment from '../views/process/receipt/financeReceivePayment.vue'
import receivePaymentInitiator from '../views/process/receipt/receivePaymentInitiator.vue'
import supervisorApproval from '../views/process/receipt/supervisorApproval.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'index', component: index},
  {path: '/index', name: 'index', component: index},
  {path: '/login', name: 'login', component: login},
  {path: '/emptyToNav', name: 'emptyToNav', component: emptyToNav},
  {path: '/empty', name: 'empty', component: empty},
  {path: '/nav', name: 'nav', component: nav},
  {path: '/selectCommodity', name: 'selectCommodity', component: selectCommodity},
  {path: '/shangPinGuanLi', name: 'shangPinGuanLi', component: shangPinGuanLi},
  {path: '/warehouseSet', name: 'warehouseSet', component: warehouseSet},
  {path: '/purchaseOrderList', name: 'purchaseOrderList', component: purchaseOrderList},
  {path: '/orgSet', name: 'orgSet', component: orgSet},
  {path: '/userSet', name: 'userSet', component: userSet},
  {path: '/userRoleSet', name: 'userRoleSet', component: userRoleSet},
  {path: '/accountingsubjects', name: 'accountingsubjects', component: accountingsubjects},
  {path: '/paymentOrder', name: 'paymentOrder', component: paymentOrder},
  {path: '/dictSet', name: 'dictSet', component: dictSet},
  {path: '/calendarSet', name: 'calendarSet', component: calendarSet},
  {path: '/powerGroup', name: 'powerGroup', component: powerGroup},
  {path: '/roleSet', name: 'roleSet', component: roleSet},
  {path: '/shopSet', name: 'shopSet', component: shopSet},
  {path: '/orderForm', name: 'orderForm', component: orderForm},
  {path: '/logisticsCompany', name: 'logisticsCompany', component: logisticsCompany},
  {path: '/logisticsType', name: 'logisticsType', component: logisticsType},
  {path: '/jiekou', name: 'jiekou', component: jiekou},
  {path: '/orderFormReview', name: 'orderFormReview', component: orderFormReview},
  {path: '/offlineOrder', name: 'offlineOrder', component: offlineOrder},
  {path: '/customerSet', name: 'customerSet', component: customerSet},
  {path: '/finishOfflineOrder', name: 'finishOfflineOrder', component: finishOfflineOrder},
  {path: '/paymentList', name: 'paymentList', component: paymentList},
  {path: '/newPayment', name: 'newPayment', component: newPayment},
  {path: '/paymentRequestForm', name: 'paymentRequestForm', component: paymentRequestForm},
  {path: '/PaymentOrderSupervisorReview', name: 'PaymentOrderSupervisorReview', component: PaymentOrderSupervisorReview},
  {path: '/paymentStatementFinancialPayment', name: 'paymentStatementFinancialPayment', component: paymentStatementFinancialPayment},
  {path: '/PaymentOrderSponsor', name: 'PaymentOrderSponsor', component: PaymentOrderSponsor},
  {path: '/supplier', name: 'supplier', component: supplier},
  {path: '/newPaymentRequestForm', name: 'newPaymentRequestForm', component: newPaymentRequestForm},
  {path: '/stockQuery', name: 'stockQuery', component: stockQuery},
  {path: '/receiptOrder', name: 'receiptOrder', component: receiptOrder},
  {path: '/newReceiptOrder', name: 'newReceiptOrder', component: newReceiptOrder},
  {path: '/newRceceiptApplicationForm', name: 'newRceceiptApplicationForm', component: newRceceiptApplicationForm},
  {path: '/rceceiptApplicationForm', name: 'rceceiptApplicationForm', component: rceceiptApplicationForm},
  {path: '/financeReceivePayment', name: 'financeReceivePayment', component: financeReceivePayment},
  {path: '/receivePaymentInitiator', name: 'receivePaymentInitiator', component: receivePaymentInitiator},
  {path: '/supervisorApproval', name: 'supervisorApproval', component: supervisorApproval},
  {path: '/stockTransferOrderList', name: 'stockTransferOrderList', component: stockTransferOrderList},
  {path: '/newStockTransferOrder', name: 'newStockTransferOrder', component: newStockTransferOrder},
  {path: '/directstorageList', name: 'directstorageList', component: directstorageList},
  {path: '/newDirectstorage', name: 'newDirectstorage', component: newDirectstorage},
]

const router = new VueRouter({
  routes
})

export default router
