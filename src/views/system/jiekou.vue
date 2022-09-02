<template>
    <div class="row">
        <div class="col-3">
            <button>测试</button>
        </div>
        <div class="col-md-12">
            <table style="width: 100%" class="table">
                <tbody>
                <tr>
                    <td class="td" style="text-align:right;width:30%">jingdong.dropship.dps.search</td>
                    <td class="td" style="text-align:left;width:70%">检索需要出库的客单（该接口不再更新，新接入请使用jingdong.dropship.dps.searchoutboundorder）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.searchsingle</td>
                    <td class="td" style="text-align:left">查询单条客单相关信息（该接口不再更新，新接入请使用jingdong.dropship.dps.searchsingleorder）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.searchpre</td>
                    <td class="td" style="text-align:left">检索售前退款的客单</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.prerefund</td>
                    <td class="td" style="text-align:left">售前退货审核</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.outbound</td>
                    <td class="td" style="text-align:left">厂商直送出库</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.delivery</td>
                    <td class="td" style="text-align:left">厂商直送发货</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.advertise.get</td>
                    <td class="td" style="text-align:left">根据商品编号查询商品广告词</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.purchasername.get</td>
                    <td class="td" style="text-align:left">根据采购员简码获取采购员姓名</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.attr.get</td>
                    <td class="td" style="text-align:left">根据分组编号查询颜色尺码的信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.attr.applies.find</td>
                    <td class="td" style="text-align:left">查询申请列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.attr.apply.get</td>
                    <td class="td" style="text-align:left">根据申请编号查询申请详细信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.salername.get</td>
                    <td class="td" style="text-align:left">根据销售员简码获取销售员姓名</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.advertise.applies.find</td>
                    <td class="td" style="text-align:left">根据动态条件查询广告词申请列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.advertise.apply.get</td>
                    <td class="td" style="text-align:left">根据申请编号查询广告词申请详情</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.primaryPic.applies.find</td>
                    <td class="td" style="text-align:left">获取商品主图申请列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.primaryPic.apply.get</td>
                    <td class="td" style="text-align:left">根据申请编号查询商品主图</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.primaryPic.get</td>
                    <td class="td" style="text-align:left">通过商品编号查找主图信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.props.find</td>
                    <td class="td" style="text-align:left">根据3级分类获取规格参数</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.categories.find</td>
                    <td class="td" style="text-align:left">根据登录账号获取用户绑定的返回最细粒度级别的类目</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.brands.find</td>
                    <td class="td" style="text-align:left">根据登录账号获取用户绑定的品牌</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.getpurchaseorderlist</td>
                    <td class="td" style="text-align:left">分页查询采购订单列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.getdetailbyorderid</td>
                    <td class="td" style="text-align:left">根据订单号获取采购订单明细</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.createpurchaseorder</td>
                    <td class="td" style="text-align:left">创建采购订单</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.confirmpurchaseorder</td>
                    <td class="td" style="text-align:left">单个订单回告</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.getcomponentlist</td>
                    <td class="td" style="text-align:left">获取下拉宽选项</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.getpurchaserlistbypin</td>
                    <td class="td" style="text-align:left">获取用户绑定的采购员列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.getwaredeliverdistinctlist</td>
                    <td class="td" style="text-align:left">获取配送中心列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.getrequisitiondetailbywareid</td>
                    <td class="td" style="text-align:left">根据商品编号获取商品信息包括采购价、建议采购数量、可采购的配送中心列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.queryExpressInfo</td>
                    <td class="td" style="text-align:left">查询运单信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.apls.stock.batchGetProdStockInfo</td>
                    <td class="td" style="text-align:left">厂直商家查询库存信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.apls.stock.updateProdStockInfo</td>
                    <td class="td" style="text-align:left">修改库存信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.library.getUploadToken</td>
                    <td class="td" style="text-align:left">获取VC图片上传token和url.获取url后用户可以向该url上传图片(支持 jpg/png/gif/bmp格式),上传字段名为: file</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.warehouse.inbound.order.query.list</td>
                    <td class="td" style="text-align:left">据条件获取入库单列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.warehouse.outbound.order.query.detail.ware</td>
                    <td class="td" style="text-align:left">据条件获取出库单明细列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.warehouse.outbound.order.query.list</td>
                    <td class="td" style="text-align:left">据条件获取出库单列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.batchOutBound</td>
                    <td class="td" style="text-align:left">厂家直送业务下批量出库功能API（建议使用单条出库接口）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.qualification.by.sku.get</td>
                    <td class="td" style="text-align:left">根据商品编号获取商品资质信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.advertise.apply.update</td>
                    <td class="td" style="text-align:left">更新驳回的广告词申请</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.advertise.apply.create</td>
                    <td class="td" style="text-align:left">添加新的广告词申请</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.dangergoods.get</td>
                    <td class="td" style="text-align:left">获取危险品列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.saleunits.find</td>
                    <td class="td" style="text-align:left">查询销售单位</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.qualification.list.find</td>
                    <td class="td" style="text-align:left">查询商品的资质列表，根据查询条件</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.attr.apply.update</td>
                    <td class="td" style="text-align:left">更新驳回的颜色尺码申请</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.attr.apply.create</td>
                    <td class="td" style="text-align:left">信息列表关联的商品编号：必须具有相同的销售员；不能与其它审核过程中的（待审或者驳回）申请关联；颜色尺码至少填写一组</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.model.find</td>
                    <td class="td" style="text-align:left">根据根据三级分类和品牌id查询型号填写规则</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.feature.find</td>
                    <td class="td" style="text-align:left">根据三级分类查询特殊业务类型</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.product.get</td>
                    <td class="td" style="text-align:left">根据商品编号获取商品信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.product.applies.find</td>
                    <td class="td" style="text-align:left">查询商品申请列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.product.apply.get</td>
                    <td class="td" style="text-align:left">根据申请编号查找审核记录</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.product.apply.delete</td>
                    <td class="td" style="text-align:left">删除申请记录</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.extProps.find</td>
                    <td class="td" style="text-align:left">根据3级分类获取拓展属性</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.primaryPic.create</td>
                    <td class="td" style="text-align:left">添加更新主图信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.oldProduct.update</td>
                    <td class="td" style="text-align:left">修改商品信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.primaryPic.update</td>
                    <td class="td" style="text-align:left">更新被驳回的主图申请</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.newProduct.create</td>
                    <td class="td" style="text-align:left">新增商品信息 当前接口正在升级中，如需要使用接口请在新接口开放后接入；已使用的老接口辛苦尽快按照新接口进行升级改造，需要在待新接口开放时间确认后同步上线，否则将会导致资质部分信息异常。 详细业务咨询请联系范志强</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.products.find</td>
                    <td class="td" style="text-align:left">获取我的商品列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.searchAllOrders</td>
                    <td class="td" style="text-align:left">查询所有状态订单的全量信息,供应商维度数据（非店铺维度）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sc.detail.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.poa.send</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.po.detail.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.po.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.warehouse.outbound.order.query.condition</td>
                    <td class="td" style="text-align:left">查询出库单</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vss.promotion.getunitpromodetail</td>
                    <td class="td" style="text-align:left">获取单品促销详情信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vss.promotion.queryunitpromopagelist</td>
                    <td class="td" style="text-align:left">查询单品促销列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.electronic.policy.search</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.electronic.policy.number.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.sales.forecast.number.search</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.sales.forecast.number.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.customer.order.number.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.saleAttributeSettings.get</td>
                    <td class="td" style="text-align:left">获取销售属性配置</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.dynamicFieldGaea.get</td>
                    <td class="td" style="text-align:left">获取商品信息动态字段</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.forecastpo.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.forecastpo.detail.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.replenishmentplan.confirm</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.replenishmentplan.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.ro.detail.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.ro.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.book.saveAndGetTime</td>
                    <td class="td" style="text-align:left">采购单状态查询；凡是接口名中包含edi的接口，都需要采销通过cssc.jd.com提交EDI工单进行申请；其中接口字段涉及自营用户订单或用户信息等内容，都需要采销提供法务、信息安全部审批材料后提交EDI工单进行申请。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.salesinfo.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.ro.detail.batch.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.scheduleplan.send</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.inventory.send</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.book.submit</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.book.cancel</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.book.query</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.customer.order.search</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.stockinfo.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.splitOrder</td>
                    <td class="td" style="text-align:left">一单多品厂家直送订单供应商需要进行二次拆分</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.searchsingleorder</td>
                    <td class="td" style="text-align:left">查询单条客单相关信息查询，供应商维度数据（非店铺维度）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.searchoutboundorder</td>
                    <td class="td" style="text-align:left">检索需要出库的客单，供应商维度数据（非店铺维度）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vss.report.jos.searchBrandPerformanceInfo</td>
                    <td class="td" style="text-align:left">品牌业绩数据报表接口</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.modifyStockInfo</td>
                    <td class="td" style="text-align:left">修改厂家直送商品库存</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.queryStockInfo</td>
                    <td class="td" style="text-align:left">查询厂家直送商品库存信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.po.status.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.po.detail.pro.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.po.pro.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.statement.queryApproveStatus</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.statement.queryStatement</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.statement.queryInvoice</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.partitionStock.maintain</td>
                    <td class="td" style="text-align:left">厂直分区库存全量维护</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.partitionStock.store.query</td>
                    <td class="td" style="text-align:left">厂直分区库存商家仓信息查询</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.partitionStock.incrementmaintain</td>
                    <td class="td" style="text-align:left">厂直分区库存增量维护</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropshipept.stock.maintain</td>
                    <td class="td" style="text-align:left">海外厂直库存维护接口</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.logisticsstatus.send</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.asn.send</td>
                    <td class="td" style="text-align:left">发送供应商预先发货清单</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.ss.send</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.partitionStockInfo.query</td>
                    <td class="td" style="text-align:left">根据当前登录账号和sku及仓库编号查询厂直分区库存信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropshipept.ordercancel.review</td>
                    <td class="td" style="text-align:left">海外厂直订单退款审核</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropshipept.order.query</td>
                    <td class="td" style="text-align:left">获取厂直海外订单</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropshipept.order.delivery</td>
                    <td class="td" style="text-align:left">海外厂直订单发货接口</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.ware.performancedata.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.brand.orderinfo.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.deliveryAddressService</td>
                    <td class="td" style="text-align:left">查询厂家直送供应商发货地址接口</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.library.getResouceUploadToken</td>
                    <td class="td" style="text-align:left">获取VC资源上传token和url.获取url后用户可以向该url上传资源文件,上传字段名为: file,上传前header中需设置storeId=VC_ITEM</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.realtimeinventory.query</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.statement.queryStatemetLines</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.statementrespond.send</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.arc.send</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.va.send</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.statement.queryStatemets</td>
                    <td class="td" style="text-align:left">查询京东结算单主目数据</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.ar.getAccountReconciliation</td>
                    <td class="td" style="text-align:left">查询京东对账申请数据</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.yip.order.getOrderCustomeInfos</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.vendor.comment.reply.save</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.vendor.comment.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.svc.settlement.confirm</td>
                    <td class="td" style="text-align:left">结算单号确认</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.svc.settlement.detail.info</td>
                    <td class="td" style="text-align:left">结算单据信息查询</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.svc.settlement.info</td>
                    <td class="td" style="text-align:left">结算单号信息查询</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.com.jd.paas.finance.rpc.jsf.InvoiceApplyForSupplierRpcJsf</td>
                    <td class="td" style="text-align:left">供应商申请开票（增值服务）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.getThirdPdfByOrderIdForVender</td>
                    <td class="td" style="text-align:left">厂直POP供应商获取配送清单</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.order.axe.bind</td>
                    <td class="td" style="text-align:left">厂直订单二次绑定虚拟号，针对虚拟号已过期的场景，才可以调用该接口，请勿并行调用！请勿频繁调用！</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.order.axe.get</td>
                    <td class="td" style="text-align:left">厂直单个订单虚拟号信息查询，包括订单中用户真实手机号对应的虚拟号以及虚拟号的有效期；该接口返回的虚拟号是最近一次绑定的虚拟号，如果查询订单信息中虚拟号与该接口返回的不一致，则以该接口为准；</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dropship.dps.currenttime</td>
                    <td class="td" style="text-align:left">时间同步</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.userCategory3.info.get</td>
                    <td class="td" style="text-align:left">根据pin返回供应商简码和三级分类列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.po.detail.page.get</td>
                    <td class="td" style="text-align:left">根据采购单单号获取采购单明细列表（分页查询且至多支持100条）[此接口近期将要下线，不再维护请切换至jingdong.vc.getdetailbyorderid]</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.po.list.page.get</td>
                    <td class="td" style="text-align:left">根据条件分页查询采购单列表（至多支持100条）[此接口近期将要下线，不再维护请切换至jingdong.vc.getpurchaseorderlist]</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.get.return.order.detail</td>
                    <td class="td" style="text-align:left">根据退货单号取得退货单明细</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.return.order.list.page.get</td>
                    <td class="td" style="text-align:left">分页查询退货单列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.salesreturn.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.salesserialpay.get</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align: right">jingdong.vc.item.spuTemplate.get</td>
                    <td class="td" style="text-align:left">根据三级分类品牌和型号获取标品模板</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.customer.evaluation.search</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.library.getLimitPictureUploadToken</td>
                    <td class="td" style="text-align:left">上传方图、长图、透明图时获取图片上传token和url.获取url后用户可以向该url上传图片(支持 jpg/png格式),上传字段名为: file</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.queryshippackagepagelist</td>
                    <td class="td" style="text-align:left">包裹列表接口</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.activitymode.add</td>
                    <td class="td" style="text-align:left">添加活动规则，限单品、赠品促销调用此接口，且赠品促销时只支持per_min_num参数设置，（多次调用时，最后一次规则有效)</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.imgzone.picture.update</td>
                    <td class="td" style="text-align:left">更新图片分类ID</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.resume</td>
                    <td class="td" style="text-align:left">重启促销，使暂停的促销重新生效，只能对暂停的促销进行重启操作。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.imgzone.picture.isreferenced</td>
                    <td class="td" style="text-align:left">查询图片是否被引用</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.list</td>
                    <td class="td" style="text-align:left">分页查询促销列表，目前可以根据类型、状态进行查询，也支持组合查询</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.area.province.get</td>
                    <td class="td" style="text-align:left">获取省级列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.order.venderRemark.queryByOrderId</td>
                    <td class="td" style="text-align:left">查询商家备注</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.afs.soa.refundapply.queryById</td>
                    <td class="td" style="text-align:left">根据Id查询退款审核单</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.isv.addisvlog</td>
                    <td class="td" style="text-align:left">用来存储分析记录ISV操作日志</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.new.ware.AttributeGroups.query</td>
                    <td class="td" style="text-align:left">根据分类id 获取属性组id,属性组名</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.new.ware.baseproduct.get</td>
                    <td class="td" style="text-align:left">获取商品基本信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.primaryPic.get</td>
                    <td class="td" style="text-align:left">通过商品编号查找主图信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.categories.find</td>
                    <td class="td" style="text-align:left">根据登录账号获取用户绑定的返回最细粒度级别的类目</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.sku.read.searchSkuList</td>
                    <td class="td" style="text-align:left">SKU搜索服务</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.stock.read.findSkuStock</td>
                    <td class="td" style="text-align:left">获取sku库存信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ware.read.findWareById</td>
                    <td class="td" style="text-align:left">获取单个商品</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ware.write.updateWareTitle</td>
                    <td class="td" style="text-align:left">修改商品名称 商品标题的字数统一50个字符</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ware.write.upOrDown</td>
                    <td class="td" style="text-align:left">设置商品的状态：包含上架，自主下架。 1表示上架 2表示自主下架</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.image.write.update</td>
                    <td class="td" style="text-align:left">新增和修改商品图片的接口，支持批量。colorId使用颜色销售属性(dim为1的属性)的销售属性值。如果商品没有颜色值，则商品下的sku都使用默认颜色的图片，即10个0；更新图片的时候也需要注意更新的是默认颜色的图片还是sku对应颜色的图片。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.category.write.saveVenderAttrValue</td>
                    <td class="td" style="text-align:left">设置商家级别的类目销售属性值</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.category.read.findAttrById</td>
                    <td class="td" style="text-align:left">获取类目属性（ps:1.属性中的features包含key为 “brand”，value 为“1”的，不可设置；2.若为销售属性，需要判断features中是否包含key为dim，不包含的销售属性为无效）(已废弃，请使用jingdong.category.read.findAttrByIdUnlimitCate)</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dsp.kuaichearea.querycity</td>
                    <td class="td" style="text-align:left">查询.通用.所有地域及ID映射关系,即将下线，替换接口:jingdong.ads.dsp.rtb.area.query</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.library.getUploadToken</td>
                    <td class="td" style="text-align:left">获取VC图片上传token和url.获取url后用户可以向该url上传图片(支持 jpg/png/gif/bmp格式),上传字段名为: file</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.crm.member.scan</td>
                    <td class="td" style="text-align:left">逐页查询会员信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.alpha.provider.stock.query</td>
                    <td class="td" style="text-align:left">提供给承运商调用，用于查询各个商家在各个网点的单号库存情况</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.alpha.waybill.unbind</td>
                    <td class="td" style="text-align:left">提供给商家解绑订运关系</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.imgzone.image.queryAll</td>
                    <td class="td" style="text-align:left">查询全量图片</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.JdAddressFromAddress.get</td>
                    <td class="td" style="text-align:left">根据GD三级地址及详细地址获取JD四级地址</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.image.write.updateRectangle</td>
                    <td class="td" style="text-align:left">修改商品图片长图的接口，不支持批量</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.dangergoods.get</td>
                    <td class="td" style="text-align:left">获取危险品列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.alpha.waybill.query</td>
                    <td class="td" style="text-align:left">查询运单基本信息接口</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.coupon.read.getCouponList</td>
                    <td class="td" style="text-align:left">根据指定条件(分页)查询商家创建的优惠券，只适用于 pop 店铺</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.v2.remove</td>
                    <td class="td" style="text-align:left">删除促销</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.v2.sku.count</td>
                    <td class="td" style="text-align:left">根据查询条件查询促销SKU个数</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.v2.list</td>
                    <td class="td" style="text-align:left">根据查询条件查询促销列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dsp.kc.htcampain.list</td>
                    <td class="td" style="text-align:left">查询.海投.计划信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.alpha.vendor.stock.queryByProviderCode</td>
                    <td class="td" style="text-align:left">ISV查询商家库存接口</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.saleAttributeSettings.get</td>
                    <td class="td" style="text-align:left">获取销售属性配置</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.edi.sdv.customer.evaluation.search</td>
                    <td class="td" style="text-align:left">凡是接口名中包含edi字样的接口，都需要供应商通过cssc.jd.com提交EDI工单进行申请白名单；其中接口字段涉及自营用户订单信息或其他敏感数据等内容，都需要协同采销先报批法务和信息安全部，然后拿审批结果申请白名单。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.stock.write.increaseSkuStock</td>
                    <td class="td" style="text-align:left">增量更新库存接口(不要和全量更新库存并发调用)</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.v2.sku.list</td>
                    <td class="td" style="text-align:left">根据查询条件查询促销SKU列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.middle.waybill.Waybill2CTraceApi</td>
                    <td class="td" style="text-align:left">2C全程物流跟踪接口</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.video.skus.relative.insert</td>
                    <td class="td" style="text-align:left">批量插入视频sku关联关系</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.video.skus.relative.delete</td>
                    <td class="td" style="text-align:left">批量取消视频sku关联关系</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.transparentImage.read.findByWareIdAndColorId</td>
                    <td class="td" style="text-align:left">根据商品id和colorId查询透图,只返回已审核通过的</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.transparentImage.write.add</td>
                    <td class="td" style="text-align:left">商品透图追加</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.market.dbp.cart.CartDataReadService.getCarSkuCount</td>
                    <td class="td" style="text-align:left">获取商家下SKU数量</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.market.bdp.saleVenderSkuRank.query</td>
                    <td class="td" style="text-align:left">商品一定时间内销售排行</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.order.fbp.get</td>
                    <td class="td" style="text-align:left">检索单个fbp订单信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.shopcategory.getShopCategorysByVenderId</td>
                    <td class="td" style="text-align:left">根据商家编号获取店内分类</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.category.read.findAttrByIdUnlimitCate</td>
                    <td class="td" style="text-align:left">通过属性ID，获取类目的新属性，可以查询销售属性（ps:1.属性中的features包含key为 “brand”，value 为“1”的，不可设置；2.若为销售属性，需要判断features中是否包含key为dim，不包含的销售属性为无效）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ware.write.transferMultiCategory</td>
                    <td class="td" style="text-align:left">1.赋值的末级类目ID必须为当前三级类目的子类目 2.三级类目的类目属性信息，将匹配新属性ID值ID后赋值到属性新字段 3.SKU下沉的属性将匹配新属性ID值ID后赋值到下沉属性新字段</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.market.bdp.cart.getPinsBySkuId</td>
                    <td class="td" style="text-align:left">查询单个sku最近三天内加购的用户PIN列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.createSkuSymbolBind</td>
                    <td class="td" style="text-align:left">SKU标签绑定</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.getCommentSummarys</td>
                    <td class="td" style="text-align:left">批量查询商品的SPU/SKU好评率，每次查询最多100个sku</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ads.dsp.rtb.kuaiche.group.list</td>
                    <td class="td" style="text-align:left">获取快车单元管理列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.config.findPayTimeLimitRulsByVenderId</td>
                    <td class="td" style="text-align:left">根据商家id获取支付时效规则</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.com.jd.rule.manage.api.service.checkcode</td>
                    <td class="td" style="text-align:left">新品准确性校验</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.add</td>
                    <td class="td" style="text-align:left">
                        创建促销，支持单品促销（商品价格直降优惠）、套装促销（商品组合优惠）、赠品促销（买商品送赠品）、总价促销（订单满足一定条件时，支持多种优惠方式，如：直减、送赠品、折扣等），添加促销信息如名称、时间、类型等。建促销接口调用顺序为：1、添加促销信息，2、添加活动规则（适用于单品促销或者赠品促销且可选）或总价规则（适用于总价促销），3、添加道具（只适用于单品促销且可选）、4、分批次添加SKU，5、提交保存促销命令。注意，只有提交保存命令后促销才可查询。建议在30分钟内完成促销创建，否则数据有可能丢失
                    </td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.vender.cener.venderBrand.query</td>
                    <td class="td" style="text-align:left">查询商家已授权的品牌</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.imgzone.category.update</td>
                    <td class="td" style="text-align:left">更新分类名称、分类的父分类。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.delete</td>
                    <td class="td" style="text-align:left">删除促销，只能删除未审核、已驳回、已生效、已暂停等状态的促销</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.get</td>
                    <td class="td" style="text-align:left">根据促销编号获取促销详细信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.imgzone.userinfo.query</td>
                    <td class="td" style="text-align:left">查询图片空间名称、容量使用情况、创建用户时间等信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.crm.grade.update</td>
                    <td class="td" style="text-align:left">修改会员等级规则信息，等级，订单数量和订单金额为必填项</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.afsservice.refundinfo.get</td>
                    <td class="td" style="text-align:left">获取退款信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.afsservice.servicelog.get</td>
                    <td class="td" style="text-align:left">获取服务单日志</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.crm.model.get</td>
                    <td class="td" style="text-align:left">获取动态查询模型列表：卖家查询已经建立的动态查询模型，接口返回所有的动态查询模型，不分页，最多50个</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.im.pop.sessionlist.get</td>
                    <td class="td" style="text-align:left">获取会话列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.im.pop.unreplystat.get</td>
                    <td class="td" style="text-align:left">客服日未回复量统计</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.vender.info.get</td>
                    <td class="td" style="text-align:left">查询商家基本信息，包括商家编号,商家类型,店铺编号,店铺名称,主营类目编号</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.returnaddress.query</td>
                    <td class="td" style="text-align:left">根据退货地址类型，查询有效的(备件库和自主售后)退货地址</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.childaccount.role.query</td>
                    <td class="td" style="text-align:left">根据员工账号查询员工对应的角色信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.childAccount.query</td>
                    <td class="td" style="text-align:left">分页查询员工信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dsp.consume.get</td>
                    <td class="td" style="text-align:left">查询.通用.消费记录-即将下线，替换接口：jingdong.dsp.platform.finance.openapi.querycostdetails</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.areas.city.get</td>
                    <td class="td" style="text-align:left">获取市级信息列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.new.ware.AttributeValues.query</td>
                    <td class="td" style="text-align:left">根据属性id 获取属性值id,属性值名</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.new.ware.Attributes.query</td>
                    <td class="td" style="text-align:left">根据组id 获取属性id,属性名</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.new.ware.mobilebigfield.get</td>
                    <td class="td" style="text-align:left">移动商品介绍查询接口</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.brands.find</td>
                    <td class="td" style="text-align:left">根据登录账号获取用户绑定的品牌</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ware.read.findOpReason</td>
                    <td class="td" style="text-align:left">获取商品下架原因</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.template.write.update</td>
                    <td class="td" style="text-align:left">修改关联板式信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.adwords.write.updateWareAdWords</td>
                    <td class="td" style="text-align:left">商品广告词</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.template.read.findTemplateById</td>
                    <td class="td" style="text-align:left">查询关联版式内容</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.agingtempl.get</td>
                    <td class="td" style="text-align:left">根据商家ID查询商家配置的时效模板</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.alpha.vendor.bigshot.query</td>
                    <td class="td" style="text-align:left">提供给商家查询大头笔信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.alpha.provider.query</td>
                    <td class="td" style="text-align:left">获得在京东Alpha平台签约并且状态正常的所有承运商列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ware.read.searchWare4Valid</td>
                    <td class="td" style="text-align:left">搜索有效商品，最多查询10万条商品信息，请合理设置页数！</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.model.find</td>
                    <td class="td" style="text-align:left">根据根据三级分类和品牌id查询型号填写规则</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.product.get</td>
                    <td class="td" style="text-align:left">根据商品编号获取商品信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.extProps.find</td>
                    <td class="td" style="text-align:left">根据3级分类获取拓展属性</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.oldProduct.update</td>
                    <td class="td" style="text-align:left">修改商品信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.order.notPayOrderInfo</td>
                    <td class="td" style="text-align:left">批量查询未付款订单</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.coupon.write.close</td>
                    <td class="td" style="text-align:left">关闭优惠券</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.v2.count</td>
                    <td class="td" style="text-align:left">根据查询条件查询促销个数</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dsp.material.queryCreativeByParam</td>
                    <td class="td" style="text-align:left">查询.通用.全部商家资质</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.alpha.provider.sign.success</td>
                    <td class="td" style="text-align:left">根据商家编码查询商家所有审核成功的签约信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.alpha.provider.sign.success.info.get</td>
                    <td class="td" style="text-align:left">根据商家编码查询商家所有审核成功的签约信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.asc.query.list</td>
                    <td class="td" style="text-align:left">根据条件查询服务单</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.order.fbp.search</td>
                    <td class="td" style="text-align:left">新接口fbp查询订单</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.info.queryByPin</td>
                    <td class="td" style="text-align:left">根据登录pin查询商家基本信息，包括商家编号,商家类型,店铺编号,店铺名称,公司编号,公司名称,商家状态,主营类目编号,主营类目名称,扩展字段（json格式）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.sku.list</td>
                    <td class="td" style="text-align:left">分页查询指定促销下符合条件的促销SKU，最多返回10个</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.order.enGet</td>
                    <td class="td" style="text-align:left">输入单个订单id，得到所有相关订单信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.waybill.generalQuery</td>
                    <td class="td" style="text-align:left">查询运单预计送达时间和扩展信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.video.reapply</td>
                    <td class="td" style="text-align:left">用于申述驳回的视频，将驳回状态的视频、视频的关联关系，改为待审核状态</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.video.infos.delete</td>
                    <td class="td" style="text-align:left">删除视频信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.transparentImage.read.findByWareId</td>
                    <td class="td" style="text-align:left">根据商品id(wareId)获取透图,只返回已审核通过的</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.transparentImage.write.save</td>
                    <td class="td" style="text-align:left">将已有透图全部替换成当前传入的</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.transparentImage.read.findAllByWareId</td>
                    <td class="td" style="text-align:left">根据商品id(wareId)获取所有透图,包含待审核的 增加审核状态</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.shopcategory.findShopCategoriesByVenderId</td>
                    <td class="td" style="text-align:left">获取商家所有的店内分类</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.category.getFullValidCategoryResultByVenderId</td>
                    <td class="td" style="text-align:left">方法描述</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.order.get</td>
                    <td class="td" style="text-align:left">输入单个SOP订单id，得到所有相关订单信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.updateSkuSymbolBind</td>
                    <td class="td" style="text-align:left">1、48小时内没有审批的标签和驳回的标签可以调用该接口重新发起绑定。 2、重新绑定标签需要传递relationId，同一个SKU下的所有标签会共用一个relationId。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.PopCommentJsfService.getUserCommentVoucher</td>
                    <td class="td" style="text-align:left">获取用户待评价，给jos开放平台提供</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.querySymbolApprovalList</td>
                    <td class="td" style="text-align:left">查看SPU/SKU绑定的标签审批状态</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.isExistWhiteList</td>
                    <td class="td" style="text-align:left">判断当前商家是否在白名单中</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ruleManage.newwareservice.submitMaterial</td>
                    <td class="td" style="text-align:left">准确性校验失败后上传证明材料</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.image.read.findTerminalImages</td>
                    <td class="td" style="text-align:left">获取多站点图片</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.im.pop.groupinfo.get</td>
                    <td class="td" style="text-align:left">查询客服组信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.imgzone.picture.upload</td>
                    <td class="td" style="text-align:left">上传单张图片</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.imgzone.picture.delete</td>
                    <td class="td" style="text-align:left">删除图片</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.sku.add</td>
                    <td class="td" style="text-align:left">添加参加促销的sku，单次最多添加100个SKU，一个促销最多支持1000个SKU，当基于套装促销添加SKU时，最多可设置3个商品的SKU，并且相同商品的次序要一致；当基于赠品促销添加SKU时，赠品SKU只能是1-5个，每个赠品只能赠送1-3个，赠品的总价应低于主商品中的最小京东价。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.check</td>
                    <td class="td" style="text-align:left">促销审核，只能对人工审状态的促销进行审核</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.suspend</td>
                    <td class="td" style="text-align:left">暂停促销，使促销暂不生效，只能对已生效的促销进行暂停</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.imgzone.category.query</td>
                    <td class="td" style="text-align:left">查询图片分类</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.ordermode.list</td>
                    <td class="td" style="text-align:left">根据促销编号获取促销的订单规则</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.crm.member.search</td>
                    <td class="td" style="text-align:left">查询店铺会员列表及信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.im.pop.evaluationstat.get</td>
                    <td class="td" style="text-align:left">客服日评价统计</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.im.pop.waiter.onlinetime.stat.get</td>
                    <td class="td" style="text-align:left">日累计在线时长</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vas.subscribe.get</td>
                    <td class="td" style="text-align:left">订购关系查询（根据购买用户名和收费项目代码获取订购关系时长）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.userCategory3.info.get</td>
                    <td class="td" style="text-align:left">根据pin返回供应商简码和三级分类列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.childaccount.privilege.query</td>
                    <td class="td" style="text-align:left">根据员工账号查询员工的权限信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.store.queryStockOutBill</td>
                    <td class="td" style="text-align:left">仓储 检索退库单</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.order.getRemarkByCreateTime</td>
                    <td class="td" style="text-align:left">根据创建时间获取订单备注</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ept.warecenter.ware.get</td>
                    <td class="td" style="text-align:left">获取商品明细</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ept.vender.brand.get</td>
                    <td class="td" style="text-align:left">获取商家授权品牌</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.afs.soa.refundapply.getWaitRefundNum</td>
                    <td class="td" style="text-align:left">待处理退款单数查询</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.afs.soa.refundapply.queryPageList</td>
                    <td class="td" style="text-align:left">商家通过查询条件查询退款审核单列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.areas.province.get</td>
                    <td class="td" style="text-align:left">获取省级地址列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.areas.county.get</td>
                    <td class="td" style="text-align:left">获取区县级信息列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.new.ware.productsortatt.get</td>
                    <td class="td" style="text-align:left">根据商品id获取 规格参数，属性id 属性值 属性值id</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ServiceDetailProvider.findServiceDetail</td>
                    <td class="td" style="text-align:left">根据服务单号查询服务单明细信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.TempCompleteProvider.findTempCompletePage</td>
                    <td class="td" style="text-align:left">暂完结列表查询</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ServiceInfoProvider.queryServicePage</td>
                    <td class="td" style="text-align:left">服务单列表查询</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.primaryPic.applies.find</td>
                    <td class="td" style="text-align:left">获取商品主图申请列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.image.read.findImagesByColor</td>
                    <td class="td" style="text-align:left">通过颜色获取商品图片列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.image.read.findFirstImage</td>
                    <td class="td" style="text-align:left">获取商品或者颜色主图</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.template.write.add</td>
                    <td class="td" style="text-align:left">新增关联板式信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.template.write.bindWare</td>
                    <td class="td" style="text-align:left">商品上绑定关联版式</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ware.read.searchWare4Recycled</td>
                    <td class="td" style="text-align:left">搜索回收站商品</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.arealimit.write.updateWareAreaLimits</td>
                    <td class="td" style="text-align:left">设置商品限购/可购区域</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.price.write.updateWareMarketPrice</td>
                    <td class="td" style="text-align:left">更新商品市场价</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ware.write.delete</td>
                    <td class="td" style="text-align:left">删除商品</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ware.write.recoverWare</td>
                    <td class="td" style="text-align:left">恢复删除商品</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.arealimit.read.findAreaLimitsByWareId</td>
                    <td class="td" style="text-align:left">获取商品限购/可购</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.sku.write.mergeSkuFeatures</td>
                    <td class="td" style="text-align:left">sku打标；先款后货&nbsp;key:&nbsp;isPayFirst&nbsp;value:&nbsp;1/0 只能京东白条&nbsp;key:&nbsp;isOnlyIOUsPay&nbsp;value:&nbsp;1/0 增值税发票&nbsp;key:&nbsp;isvat&nbsp;value:&nbsp;1/0 下单验证码&nbsp;key:&nbsp;isCheckCode&nbsp;value:&nbsp;1/0 屏蔽购物车&nbsp;key:&nbsp;isCartshield&nbsp;value:&nbsp;每位上1代表屏蔽,&nbsp;0不屏蔽&nbsp;第一位代表是否全球购促销屏蔽购物车&nbsp;第二位代表是否SOP汽车服务商品屏蔽购物车,&nbsp;位运算
                        商场同款&nbsp;key:&nbsp;isZgtk,&nbsp;value:&nbsp;1/0 鉴定证书&nbsp;key:&nbsp;isCertificate,&nbsp;value:&nbsp;1/0 购买数&nbsp;key:&nbsp;maxBuyTimes 无理由退货&nbsp;key:&nbsp;is7ToReturn,&nbsp;value:&nbsp;0&nbsp;不支持&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;or&nbsp;null&nbsp;支持7天&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;支持90天
                        危险品&nbsp;key:&nbsp;isdangergoods,&nbsp;value:&nbsp;1、易燃易爆品;&nbsp;2、压缩液化气体;3、氧化物质（强氧化剂）;&nbsp;4、有毒和感染性物质;&nbsp;5、腐蚀性物质&nbsp;；0或null：否； 平台专享&nbsp;key:&nbsp;isWeChatStock,&nbsp;value:&nbsp;微店专享：倒数第1位&nbsp;&nbsp;00001&nbsp;,&nbsp;APP端专享:倒数第2位&nbsp;&nbsp;00010&nbsp;,&nbsp;M端专享：倒数第3位&nbsp;&nbsp;00100&nbsp;,&nbsp;PC端专享：倒数第4位&nbsp;&nbsp;01000&nbsp;,&nbsp;手Q专享&nbsp;：倒数第5位&nbsp;10000,&nbsp;&nbsp;&nbsp;京致衣橱：倒数第6位&nbsp;&nbsp;100000&nbsp;按位计算
                        售卖区域&nbsp;key:&nbsp;SoldOversea,&nbsp;value:&nbsp;0代表不支持,&nbsp;1代表支持香港、澳门；2代表支持台湾；3代表：支持香港、澳门、台湾；4代表海外；5代表支持香港、澳门、海外；6代表支持台湾、海外；7代表全部都支持
                    </td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ware.write.updateWareStatusByTimer</td>
                    <td class="td" style="text-align:left">业务规则:1. 定时上架不能等于定时下架 2. 删除商品不能设置定时上架,定时下架 3. 定时上架最晚当前时间推迟10天,定时下架最晚当前时间推迟15天。实际上架时间会有误差！不保证实时上架！不保证上架延迟时间！不保证成功率！</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.acty.queryRegistrationDataCount</td>
                    <td class="td" style="text-align:left">根据venderId等条件查询订单总数</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.category.read.findAttrsByCategoryIdJos</td>
                    <td class="td" style="text-align:left">获取类目属性列表（ps:1.属性中的features包含key为 “brand”，value 为“1”的，不可设置；2.若为销售属性，需要判断features中是否包含key为dim，不包含的销售属性为无效）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.receive.trace.get</td>
                    <td class="td" style="text-align:left">查询物流跟踪消息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.feature.find</td>
                    <td class="td" style="text-align:left">根据三级分类查询特殊业务类型</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.products.find</td>
                    <td class="td" style="text-align:left">获取我的商品列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.eclp.rtw.rejectorderinfo</td>
                    <td class="td" style="text-align:left">拒收订单入库信息接口</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.coupon.read.getCouponCount</td>
                    <td class="td" style="text-align:left">统计满足条件的优惠券个数</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.v2.unit.beanrequired.create</td>
                    <td class="td" style="text-align:left">创建京豆优惠购促销</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.alpha.waybill.receive</td>
                    <td class="td" style="text-align:left">ISV、POP后台推送运单接口，接口不支持sdk方式调用，需用https方式，具体可参考https://jos.jd.com/commondoc?listId=33</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.order.shipment</td>
                    <td class="td" style="text-align:left">sop出库发货接口</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.spuTemplate.get</td>
                    <td class="td" style="text-align:left">根据三级分类品牌和型号获取标品模板</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.order.print.data.get</td>
                    <td class="td" style="text-align:left">获取面单打印数据</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.new.ware.vender.skus.query</td>
                    <td class="td" style="text-align:left">根据venderId查询sku列表（自营/pop通用）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.etms.waybill.send</td>
                    <td class="td" style="text-align:left">青龙接单接口。此接口为京东物流接单使用，通过获取运单号接口获取运单号后，下单支持产品类型返回，调用此接口给京东物流下单。该接口需要配合“是否可以京配”、“获取青龙运单号”接口一起使用，才可以完成京东快递下单业务。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.etms.waybillcode.get</td>
                    <td class="td" style="text-align:left">获取京东运单号接口（默认JD开头）。通过该接口可以一次性获取100个京东运单号。该接口需要配合“是否可以京配接口”、“青龙接单接口”一起使用，才可以完成京东快递下单业务，每单分配一个运单号使用。发货后可使用京东运单号查询物流轨迹。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.order.enSearch</td>
                    <td class="td" style="text-align:left">根据条件检索订单信息 （仅适用于SOP、LBP，SOPL类型，FBP类型请调取FBP订单检索 ）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.order.modifyVenderRemark</td>
                    <td class="td" style="text-align:left">添加/修改商家备注，可修改付款后的订单（如果存在则修改，不存在则新增，如果提交空值则尝试删除存在的商家备注）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.video.sku.relative.by.sku.ids.query</td>
                    <td class="td" style="text-align:left">根据skuId集合查询关联关系</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.video.sku.relative.query</td>
                    <td class="td" style="text-align:left">分页查询视频sku关联关系</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.video.info.update</td>
                    <td class="td" style="text-align:left">更新视频信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.transparentImage.write.update</td>
                    <td class="td" style="text-align:left">商品透图修改</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.fce.alpha.getVenderCarrier</td>
                    <td class="td" style="text-align:left">获取商家已签约承运商</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.areas.overseasProvince.get</td>
                    <td class="td" style="text-align:left">查询国内海外一级地址</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.areas.overseasCity.get</td>
                    <td class="td" style="text-align:left">查询国内海外二级地址</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.category.getValidCategoryResultByVenderId</td>
                    <td class="td" style="text-align:left">获取商家可用的经营分类列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.market.bdp.OLShopSum.query</td>
                    <td class="td" style="text-align:left">商家分平台流量日表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.shopcategory.findSubShopCategoriesByParentCid</td>
                    <td class="td" style="text-align:left">获取指定分类的子分类列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.shopcategory.getShopCategoryByCid</td>
                    <td class="td" style="text-align:left">获取指定的店内分类</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.category.read.findValuesByAttrIdUnlimit</td>
                    <td class="td" style="text-align:left">获取新属性的可选值列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.order.search</td>
                    <td class="td" style="text-align:left">根据条件检索订单信息 （仅适用于SOP类型,且只能查出达到生产条件的订单，FBP类型请调取FBP订单检索 ）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ware.write.mergeWareFeatures</td>
                    <td class="td" style="text-align:left">商品打标；先款后货&nbsp;key:&nbsp;isPayFirst&nbsp;value:&nbsp;1/0 只能京东白条&nbsp;key:&nbsp;isOnlyIOUsPay&nbsp;value:&nbsp;1/0 增值税发票&nbsp;key:&nbsp;isvat&nbsp;value:&nbsp;1/0 下单验证码&nbsp;key:&nbsp;isCheckCode&nbsp;value:&nbsp;1/0 屏蔽购物车&nbsp;key:&nbsp;isCartshield&nbsp;value:&nbsp;每位上1代表屏蔽,&nbsp;0不屏蔽&nbsp;第一位代表是否全球购促销屏蔽购物车&nbsp;第二位代表是否SOP汽车服务商品屏蔽购物车,&nbsp;位运算
                        商场同款&nbsp;key:&nbsp;isZgtk,&nbsp;value:&nbsp;1/0 鉴定证书&nbsp;key:&nbsp;isCertificate,&nbsp;value:&nbsp;1/0 购买数&nbsp;key:&nbsp;maxBuyTimes 无理由退货&nbsp;key:&nbsp;is7ToReturn,&nbsp;value:&nbsp;0&nbsp;不支持&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;or&nbsp;null&nbsp;支持7天&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;支持90天
                        危险品&nbsp;key:&nbsp;isdangergoods,&nbsp;value:&nbsp;1、易燃易爆品;&nbsp;2、压缩液化气体;3、氧化物质（强氧化剂）;&nbsp;4、有毒和感染性物质;&nbsp;5、腐蚀性物质&nbsp;；0或null：否； 平台专享&nbsp;key:&nbsp;isWeChatStock,&nbsp;value:&nbsp;微店专享：倒数第1位&nbsp;&nbsp;00001&nbsp;,&nbsp;APP端专享:倒数第2位&nbsp;&nbsp;00010&nbsp;,&nbsp;M端专享：倒数第3位&nbsp;&nbsp;00100&nbsp;,&nbsp;PC端专享：倒数第4位&nbsp;&nbsp;01000&nbsp;,&nbsp;手Q专享&nbsp;：倒数第5位&nbsp;10000,&nbsp;&nbsp;&nbsp;京致衣橱：倒数第6位&nbsp;&nbsp;100000&nbsp;按位计算
                        售卖区域&nbsp;key:&nbsp;SoldOversea,&nbsp;value:&nbsp;0代表不支持,&nbsp;1代表支持香港、澳门；2代表支持台湾；3代表：支持香港、澳门、台湾；4代表海外；5代表支持香港、澳门、海外；6代表支持台湾、海外；7代表全部都支持
                    </td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.updateSpuSymbolBind</td>
                    <td class="td" style="text-align:left">1、48小时内没有审批的标签和驳回的标签可以调用该接口重新发起绑定。 2、重新绑定标签需要传递relationId</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.querySymbolList</td>
                    <td class="td" style="text-align:left">根据VENDERID/SPU/SKU查询绑定的标签列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.queryClassifyByCate</td>
                    <td class="td" style="text-align:left">根据末级类目获取标签一级、二级分类</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.com.jd.rule.manage.api.service.read.NewWareReadService</td>
                    <td class="td" style="text-align:left">新品提报根据商家id和类目id读取规则</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.logistics.carriers.list</td>
                    <td class="td" style="text-align:left">获取承运商信息列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.imgzone.category.add</td>
                    <td class="td" style="text-align:left">添加图片分类</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.commit</td>
                    <td class="td" style="text-align:left">促销创建完毕，提交保存促销命令。完成创建促销，必须调用该接口，否则相关数据将会被清除</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.imgzone.picture.query</td>
                    <td class="td" style="text-align:left">查询图片</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.activitymode.get</td>
                    <td class="td" style="text-align:left">根据促销编号获取促销的活动规则</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.ordermode.add</td>
                    <td class="td" style="text-align:left">添加订单规则，支持以下几种总价促销优惠方式：满M件减N件(如：满5件减1件，M的值为3至20之间的整数，N为正整数，值最小为1，最大为M的三分之一），M元任选N件（如：99元任选3件,N的值为2-5之间的整数)，M件N折（如：2件8折，M的值为1-8之间的整数，N的值大于等于5，小于10，支持一位小数），满减送（如：满100减10元、满100赠商品、
                        满100加10赠商品、满100减10赠商品、满100减10加5赠商品，此类促销应满足以下规则：1、送赠品或者减价格必须有一个；2、设置加价金额后必须设置赠品；3、如果设置赠品，赠品京东价必须大于加价金额，小于满金额；4、减金额必须小于等于订单额度的百分之八十；相关字段暂不支持设置多个值。）
                    </td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.crm.grade.get</td>
                    <td class="td" style="text-align:left">查询会员等级规则信息：卖家查询等级规则，等级包括一星会员，二星会员，三星会员，四星会员，五星会员</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.afsservice.servicedetail.list</td>
                    <td class="td" style="text-align:left">获取服务单详情</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.im.pop.chatlog.get</td>
                    <td class="td" style="text-align:left">聊天记录查询</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.shop.query</td>
                    <td class="td" style="text-align:left">查询商家基本店铺信息，包括商家编号,店铺编号,店铺名称,开店时间,logoUrl,店铺简介,主营类目编号,主营类目名称</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.shipaddress.query</td>
                    <td class="td" style="text-align:left">查询商家发货地址</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.club.pop.commentreply.save</td>
                    <td class="td" style="text-align:left">回复商品评价</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.order.getRemarkByModifyTime</td>
                    <td class="td" style="text-align:left">根据修改时间段获取订单备注</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.store.findPartitionWhByIdAndStatus</td>
                    <td class="td" style="text-align:left">查询仓库信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.store.countPartitionWhByIdAndStatus</td>
                    <td class="td" style="text-align:left">查询仓库数量</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.dsp.balance.get</td>
                    <td class="td" style="text-align:left">查询.通用.京准通账号余额</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ept.warecenter.recommendtemp.get</td>
                    <td class="td" style="text-align:left">获取商家推荐模板</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.afs.soa.refundapply.replyRefund</td>
                    <td class="td" style="text-align:left">商家审核退款单</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.areas.town.get</td>
                    <td class="td" style="text-align:left">获取乡镇级信息列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.SkuFareTemplateService.getTemplates</td>
                    <td class="td" style="text-align:left">根据venderId获取单品模板</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.etms.range.check</td>
                    <td class="td" style="text-align:left">是否可以京配（京配范围会返回自营、星配站、校园派类型的站点）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.new.ware.sameproductskuids.query</td>
                    <td class="td" style="text-align:left">查询同类产品ids</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.props.find</td>
                    <td class="td" style="text-align:left">根据3级分类获取规格参数</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.sku.read.findSkuById</td>
                    <td class="td" style="text-align:left">获取单个SKU</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.stock.write.updateSkuStock</td>
                    <td class="td" style="text-align:left">设置sku库存</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.image.read.findImagesByWareId</td>
                    <td class="td" style="text-align:left">获取商品上的所有图片列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.shopcategories.read.findShopCategoriesByWareId</td>
                    <td class="td" style="text-align:left">查询商品店内分类列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.template.write.delete</td>
                    <td class="td" style="text-align:left">删除关联板式</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.template.read.findTemplatesByVenderId</td>
                    <td class="td" style="text-align:left">获取商家关联版式</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.adwords.read.findAdWordsByWareId</td>
                    <td class="td" style="text-align:left">获取商品广告词</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.price.write.updateWareCostPrice</td>
                    <td class="td" style="text-align:left">更新商品成本价</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.price.write.updateSkuJdPrice</td>
                    <td class="td" style="text-align:left">修改SKU京东价</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.transport.write.updateWareTransportId</td>
                    <td class="td" style="text-align:left">保存商品运费模板</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.shopcategories.write.saveWareShopCategories</td>
                    <td class="td" style="text-align:left">保存商品店内分类</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.image.write.delete</td>
                    <td class="td" style="text-align:left">删除商品图片的接口，支持批量 颜色和排序的数组长度要一致 删除时按数组对应的坐标删除</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.category.read.findById</td>
                    <td class="td" style="text-align:left">获取单个类目信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.category.read.findByPId</td>
                    <td class="td" style="text-align:left">查找子类目列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.sku.write.deleteSku</td>
                    <td class="td" style="text-align:left">Sku删除</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ware.write.add</td>
                    <td class="td" style="text-align:left">仅发布POP商品 获取有经营权限的品牌[jingdong.pop.vender.cener.venderBrand.query] 获取有经营权限类目接口[jingdong.vender.category.getFullValidCategoryResultByVenderId] 获取属性接口[jingdong.category.read.findAttrByIdUnlimitCate]
                        获取属性值接口[jingdong.category.read.findValuesByAttrIdUnlimit] 关于成本价[FBP商品成本价必填，字段key为 costPrice，传参方式参考 jdPrice] 商品发布示例：https://jos.jd.com/commondoc?listId=435
                    </td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ware.write.updateWare</td>
                    <td class="td" style="text-align:left">修改商品</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ware.write.updateWareSaleAttrvalueAlias</td>
                    <td class="td" style="text-align:left">更新商品维度的销售属性值别名</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.sku.write.saveWareSkus</td>
                    <td class="td" style="text-align:left">全量保存SKU。注意：SKU是由销售属性值来确定是否与库中数据匹配，不是根据skuId。若要新增SKU，需要传入新的SKU销售属性值组合，同理，修改时，也需要传入对应的SKU的销售属性值组合。另外，同商品下有效的sku的销售属性值维度必须统一。 注意！！！！销售属性组合变动 会引起sku删除、新增</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.sku.write.updateSkus</td>
                    <td class="td" style="text-align:left">增量保存SKU，注意：SKU是由销售属性值来确定是否与库中数据匹配，不是根据skuId。若要新增SKU，需要传入新的SKU销售属性值组合，同理，修改时，也需要传入对应的SKU的销售属性值组合。另外，同商品下有效的sku的销售属性值维度必须统一。 注意！！！！销售属性组合变动 会引起sku删除、新增</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.category.read.findAttrByIdJos</td>
                    <td class="td" style="text-align:left">获取属性的可选值列表(过滤重复字段名)（ps:1.属性中的features包含key为 “brand”，value 为“1”的，不可设置；2.若为销售属性，需要判断features中是否包含key为dim，不包含的销售属性为无效）(已废弃，请使用jingdong.category.read.findAttrByIdUnlimitCate)</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.alpha.vendor.stock.query</td>
                    <td class="td" style="text-align:left">提供给POP查询单号库存</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.qualification.list.find</td>
                    <td class="td" style="text-align:left">查询商品的资质列表，根据查询条件</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vc.item.product.applies.find</td>
                    <td class="td" style="text-align:left">查询商品申请列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.order.notPayOrderById</td>
                    <td class="td" style="text-align:left">通过订单号查询该商家未付款订单</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.coupon.write.create</td>
                    <td class="td" style="text-align:left">新建优惠券(不支持自营)</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.v2.suspend</td>
                    <td class="td" style="text-align:left">暂停促销</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.v2.resume</td>
                    <td class="td" style="text-align:left">重启促销</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.v2.unit.limit.create</td>
                    <td class="td" style="text-align:left">创建限购促销</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.v2.get</td>
                    <td class="td" style="text-align:left">根据促销编号获取促销详情</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.asc.complete.list</td>
                    <td class="td" style="text-align:left">查询暂完结售后服务单列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.waybill.receive</td>
                    <td class="td" style="text-align:left">京东物流快递业务下单接口。该接口适用于京东快递业务B2C，支持冷链业务。通过该接口的调用可以获取京东热敏单号、判断是否符合京东配范围，是否支持商家下发的京东快递产品类型，同时可以获取到京东面单打印信息。</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ldop.alpha.waybill.api.unbind</td>
                    <td class="td" style="text-align:left">运单解绑接口</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.seller.promotion.v2.unit.full.create</td>
                    <td class="td" style="text-align:left">创建单品促销（包含全量参数）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.acty.enqueryRegistrationDataCount</td>
                    <td class="td" style="text-align:left">根据venderId等条件加密查询订单总数</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.PopCommentJsfService.getVenderCommentsForJos</td>
                    <td class="td" style="text-align:left">获取评价接口</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.video.info.query</td>
                    <td class="td" style="text-align:left">查询视频信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.video.info.get</td>
                    <td class="td" style="text-align:left">根据视频id查询商家视频信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.transparentImage.write.delete</td>
                    <td class="td" style="text-align:left">商品透图删除</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.vbinfo.getBasicVenderInfoByVenderId</td>
                    <td class="td" style="text-align:left">根据商家编号获取商家基本信息（根据venderType 可区分自营/pop）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.category.read.findAttrsByCategoryIdUnlimitCate</td>
                    <td class="td" style="text-align:left">通过类目和属性类型，获取类目的属性列表，类目ID只能为末级！(可以查询销售属性，但需要类目为三级类目)（ps:1.属性中的features包含key为 “brand”，value 为“1”的，不可设置；2.若为销售属性，需要判断features中是否包含key为dim，不包含的销售属性为无效）（features中:attrLevel,属性下沉等级 1:下沉SKU ）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.category.read.findValuesByIdUnlimit</td>
                    <td class="td" style="text-align:left">通过id获取新属性属性值</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.stock.write.updateSkuSiteStock</td>
                    <td class="td" style="text-align:left">设置门店库存</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.stock.read.findSkuSiteStock</td>
                    <td class="td" style="text-align:left">查询门店库存信息</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.com.jd.rule.manage.api.service.NewWareService</td>
                    <td class="td" style="text-align:left">新品提交</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.market.bdp.userBehavior.getUserClickSku</td>
                    <td class="td" style="text-align:left">获取用户浏览点击sku,按最近浏览排序,最多只有近200条记录</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.pop.PopCommentJsfService.saveCommentVote</td>
                    <td class="td" style="text-align:left">保存用户点赞，给jos开放平台提供</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.search.ware</td>
                    <td class="td" style="text-align:left">商品搜索（平搜）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.queryGoodsList</td>
                    <td class="td" style="text-align:left">支持skuId,symbolName检索</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.createSpuSymbolBind</td>
                    <td class="td" style="text-align:left">SPU标签绑定，spuId不能为空</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.shorturl.generateURLFastest</td>
                    <td class="td" style="text-align:left">生成短域新的api接口</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.querySymbolByClassify</td>
                    <td class="td" style="text-align:left">根据标签二级分类获取标签列表</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ads.dsp.rtb.kuaiche.campaign.list</td>
                    <td class="td" style="text-align:left">查询.京东快车.计划列表信息和数据</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.ads.dsp.rtb.keyword.price.update</td>
                    <td class="td" style="text-align:left">操作.京东快车.修改关键词出价（支持同单元下关键词批量设置）</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.imgzone.ic.image.deleteByQuery</td>
                    <td class="td" style="text-align:left">按查询条件删除图片</td>
                </tr>
                <tr>
                    <td class="td" style="text-align:right">jingdong.vender.brand.serachVenderAvailableBrandByCondition</td>
                    <td class="td" style="text-align:left">商家授权品牌检索接口</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {}
    },
    created: function () {
        this.load();
    },
    methods: {
        load: function () {
        }
    }
}
</script>

<style scoped>

.th {
    border: 1px solid #ddd;
    width: 12.5%;
    padding: 3px;
}

.td {
    border: 1px solid #ddd;
    padding: 5px;
}
</style>
