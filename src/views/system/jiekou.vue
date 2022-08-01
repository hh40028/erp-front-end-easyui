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
