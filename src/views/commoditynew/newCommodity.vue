<template>
    <Layout bodyCls="f-column" :border="false">
        <LayoutPanel region="north" :border="true" :bodyStyle="{padding:'8px'}">
            <span style="font-size: 16px;line-height: 28px" v-if="!editabled">
            类别名称：{{ type.text ? type.text : '请选择分类' }}
            </span>
            <span style="font-size: 16px;line-height: 28px" v-if="editabled">
            类别名称：{{ obj.fullCategoryName1 }}
            </span>
            <div class="pull-right">
                <ButtonGroup selectionMode="single">
                    <LinkButton iconCls="icon-save" :toggle="true" @click="save">保存</LinkButton>
                    <LinkButton iconCls="icon-back" :toggle="true" @click="$router.push('commoditynewList')">返回</LinkButton>
                </ButtonGroup>
            </div>
        </LayoutPanel>
        <LayoutPanel region="west" style="width:220px" :bodyStyle="{padding:'8px'}" v-if="!editabled">
            <TextBox style="width:96%;margin: 2%"
                     iconCls="icon-search"
                     placeholder="过滤..."
                     @valueChange="$refs.tree.doFilter($event.currentValue)">
            </TextBox>
            <Tree ref="tree" :data="data" :cascadeCheck="false" @selectionChange="selectType($event)" @nodeExpand="onNodeExpand($event)"></Tree>
        </LayoutPanel>
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <Layout bodyCls="f-column" :border="false">
                <LayoutPanel region="center" style="height:100%;padding: 0" bodyCls="f-column" :border="false">
                    <div class="row">
                        <div class="title1" style="margin-top: 30px">
                            <div style="margin-left: 20px">主体名称：
                                <ComboBox v-model="mainBodyId" :editable="false" valueField="id" style="width:300px" textField="name" :data="mainBodyList"></ComboBox>
                            </div>
                            <div style="margin-left: 20px">负责人员：
                                <input type="text" class="form-control" v-model="obj.username" style="width:300px" @click="openSelectOrganizationUserDlg">
                            </div>
                            <div style="margin-left: 20px">风险等级：
                                <ComboBox v-model="obj.riskLevel" :data="riskLevels" style="width:300px" valueField="id" textField="title"></ComboBox>
                            </div>
                            <div style="margin-left: 20px">ＢＧ选择：
                                <input type="text" class="form-control" v-model="obj.bgName" style="width:300px" @click="openSelectOrganizationDlg">
                            </div>
                            <div style="margin-left: 20px">品类组别：
                                <ComboBox v-model="obj.categoryGroup" :data="categoryGroups" style="width:300px" valueField="id" textField="name"></ComboBox>
                            </div>
                            <div style="margin-left: 20px">是否作废：
                                <SwitchButton class="rounded" v-model="obj.invalid" :value="obj.invalid"></SwitchButton>
                            </div>
                            <div style="margin-left: 20px">是否销售：
                                <SwitchButton class="rounded" v-model="obj.sale" :value="obj.sale"></SwitchButton>
                            </div>
                        </div>
                    </div>
                    <div class="title1" style="margin-top: 30px">一、填写商品信息</div>
                    <div class="title">商品基本信息</div>
                    <div class="row" style="padding: 10px 10px 10px 50px">
                        <div class="col-12 p-10">
                            <label><span v-if="!obj.name" class="c-red">*</span>商品标题</label>
                            <TextBox v-model="obj.name" style="width:100%"></TextBox>
                        </div>
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.brandName" class="c-red">*</span>品牌</label>
                            <selectBrand input="true" :name="obj.brandName" @selectBrand="selectBrand"></selectBrand>
                        </div>
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.model" class="c-red">*</span>型号</label>
                            <TextBox v-model="obj.model" style="width:100%"></TextBox>
                        </div>
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.originalPlace" class="c-red">*</span>产地</label>
                            <TextBox v-model="obj.originalPlace" style="width:100%"></TextBox>
                        </div>
                        <div class="col-4 p-10">
                            <label>中文品牌</label>
                            <TextBox v-model="obj.zhBrand" style="width:100%"></TextBox>
                        </div>
                        <div class="col-4 p-10">
                            <label>英文品牌</label>
                            <TextBox v-model="obj.enBrand" style="width:100%"></TextBox>
                        </div>
                    </div>
                    <div class="title">商品销售信息</div>
                    <div class="row" style="padding: 10px 10px 10px 50px">
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.marketPrice" class="c-red">*</span>市场价</label>
                            <NumberBox style="width:100%" :spinners="false" :precision="2" v-model="obj.marketPrice"></NumberBox>
                        </div>
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.memberPrice" class="c-red">*</span>京东价</label>
                            <NumberBox style="width:100%" :spinners="false" :precision="2" v-model="obj.memberPrice"></NumberBox>
                        </div>
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.purchasePrice" class="c-red">*</span>采购价</label>
                            <NumberBox style="width:100%" :spinners="false" :precision="2" v-model="obj.purchasePrice"></NumberBox>
                        </div>
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.purchasePrice" class="c-red">*</span>协议价</label>
                            <NumberBox style="width:100%" :spinners="false" :precision="2" v-model="obj.agreementPrice"></NumberBox>
                        </div>
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.purchasePrice" class="c-red">*</span>成本价</label>
                            <NumberBox style="width:100%" :spinners="false" :precision="2" v-model="obj.costPrice"></NumberBox>
                        </div>
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.salerCode" class="c-red">*</span>销售员</label>
                            <input type="text" v-model="obj.salerName" class="form-control" @click="openSelectBuyerDlg('saler')">
                        </div>
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.purchaserCode" class="c-red">*</span>采购员</label>
                            <input type="text" v-model="obj.purchaserName" class="form-control" @click="openSelectBuyerDlg('purchaser')">
                        </div>
                    </div>
                    <div class="title">包装及物流信息</div>
                    <div class="row" style="padding: 10px 10px 10px 50px">
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.weight" class="c-red">*</span>商品重量</label>
                            <NumberBox style="width:100%" :spinners="false" :precision="2" v-model="obj.weight" placeholder=" （单位：kg 含包装）"></NumberBox>
                        </div>
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.length" class="c-red">*</span>长</label>
                            <NumberBox style="width:100%" :spinners="false" :precision="2" v-model="obj.length" placeholder=" （单位：毫米 含包装）"></NumberBox>
                        </div>
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.width" class="c-red">*</span>宽</label>
                            <NumberBox style="width:100%" :spinners="false" :precision="2" v-model="obj.width" placeholder=" （单位：毫米 含包装）"></NumberBox>
                        </div>
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.height" class="c-red">*</span>高</label>
                            <NumberBox style="width:100%" :spinners="false" :precision="2" v-model="obj.height" placeholder=" （单位：毫米 含包装）"></NumberBox>
                        </div>
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.skuUnit" class="c-red">*</span>销售单位</label>
                            <ComboBox style="width:100%" v-model="obj.skuUnit" :data="saleUnit" textField="title" valueField="title"></ComboBox>
                        </div>
                        <div class="col-4 p-10">

                            <label><span v-if="!obj.packing" class="c-red">*</span>包装规格</label>
                            <TextBox v-model="obj.packing" style="width:100%"></TextBox>
                        </div>
                        <div class="col-12 p-10">
                            <label><span v-if="!obj.pkgInfo" class="c-red">*</span>包装清单</label>
                            <TextBox :multiline="true" style="height:150px;width: 100%" v-model="obj.pkgInfo"></TextBox>
                            <!--                            <textarea style="height: 100px" class="form-control" v-model="obj.pkg_info"></textarea>-->
                        </div>
                    </div>
                    <div class="title">售后信息</div>
                    <div class="row" style="padding: 10px 10px 10px 50px">
                        <div class="col-6 p-10">
                            <label><span v-if="!obj.warranty" class="c-red">*</span>质保</label><br>
                            <ComboBox v-model="obj.warranty" :data="warrantys" textField="title" valueField="title" style="width: 100%"></ComboBox>
                        </div>
                        <div class="col-6 p-10">
                            <label><span class="c-red">*</span>有无保质期</label><br>
                            <ComboBox v-model="obj.bzq" :data="bzqs" textField="title" valueField="value" style="width: 50%"></ComboBox>
                            <TextBox v-if="obj.bzq" v-model="obj.shelfLife" style="width: 50%" placeholder="保质期天数"></TextBox>
                        </div>
                        <div class="col-12 p-10">
                            <label><span v-if="!obj.afterSaleDesc" class="c-red">*</span>售后保障</label>
                            <TextBox :multiline="true" style="height:150px;width: 100%" v-model="obj.afterSaleDesc"></TextBox>
                            <!--                            <textarea style="height: 100px" class="form-control" v-model="obj.after_sale_desc"></textarea>-->
                        </div>
                        <div class="col-6 p-10">
                            <label><span v-if="!obj.tel" class="c-red">*</span>服务电话</label>
                            <TextBox v-model="obj.tel" style="width:100%"></TextBox>
                        </div>
                        <div class="col-6 p-10">
                            <label><span v-if="!obj.webSite" class="c-red">*</span>官网地址</label>
                            <TextBox v-model="obj.webSite" style="width:100%"></TextBox>
                        </div>
                    </div>
                    <div class="title">其他信息</div>
                    <div class="row" style="padding: 10px 10px 10px 50px">
                        <div class="col-4 p-10">
                            <label><span v-if="!obj.packType" class="c-red">*</span>特殊属性</label>
                            <ComboBox v-model="obj.packType" :data="tssx" textField="title" valueField="id" style="width: 100%"></ComboBox>
                        </div>
                        <div class="col-4 p-10">
                            <label>是否危险品</label>
                            <ComboBox v-model="obj.dangerGoods" :data="sfwxp" textField="title" valueField="id" style="width: 100%"></ComboBox>
                        </div>
                        <div class="col-4 p-10">
                            <label>试用品</label>
                            <TextBox v-model="obj.sysp" style="width:100%"></TextBox>
                        </div>
                    </div>
                    <div class="title1">二、商品类目属性</div>
                    <div class="row" style="padding: 10px 10px 10px 50px">
                        <div class="col-12 p-10 text-left" v-for="prop in propGroup" :key="prop.attId" style="background-color: #f5f5f5">
                            <div class="col-12">
                                <label style="font-weight: bold">{{ prop.name }}</label>
                            </div>
                            <div class="col-4 p-10 text-left" v-for="p in prop.props" :key="p.id">
                                <propGroup :prop="p"></propGroup>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="padding: 10px 10px 10px 50px">
                        <div class="col-4 p-10 text-left" v-for="ext in extPropsList" :key="ext.attId">
                            <extProps :ext="ext"></extProps>
                        </div>
                    </div>
                    <div class="title1">三、商品介绍</div>
                    <div class="title">商品图片 (图片上传尺寸为800px*800px，仅支持jpg、jpeg格式)</div>
                    <div class="row" style="margin-left: 80px;margin-right: 10px">
                        <div style="font-weight: bold;font-size: 16px">主图 <a @click="up('main')" class="c-teal">上传图片</a></div>
                        <div v-for="(img,index) in imgPathList" class="col-2 p-10 text-center field-title" style="float: left;border: 1px solid gray;margin: 3px">
                            <img :src="'https://img11.360buyimg.com/n1/'+img.imgUrl" style="width: 100%">
                            <div class="col-12 text-center">
                                <a @click="removeImg(img,index)">移除</a>
                            </div>
                        </div>

                        <!--                        <div class="col-2 p-10 text-center field-title" style="float: left" @click="up('main')">-->
                        <!--                            <img src="../../assets/images/icons8-plus.png">-->
                        <!--                        </div>-->
                    </div>
                    <div class="row" style="margin-left: 80px;margin-right: 10px">
                        <div style="font-weight: bold;font-size: 16px">透图 <a v-if="!transparentImage.imgId" @click="up('transparent')" class="c-teal">上传图片</a></div>
                        <div v-if="transparentImage.imgId" class="col-2 p-10 text-center field-title" style="float: left;border: 1px solid gray;margin: 3px">
                            <img :src="'https://img11.360buyimg.com/n1/'+transparentImage.imgUrl" style="width: 100%">
                            <div class="col-12 text-center">
                                <a @click="removeTransparentImage()">移除</a>
                            </div>
                        </div>

                        <!--                        <div v-if="!transparentImage.imgId" class="col-2 p-10 text-center field-title" style="float: left" @click="up('transparent')">-->
                        <!--                            <img src="../../assets/images/icons8-plus.png">-->
                        <!--                        </div>-->
                    </div>

                    <div class="title">电脑版商品详情</div>
                    <div class="row" style="padding: 10px 10px 10px 50px">
                        <TextBox :multiline="true" style="height:200px;width: 100%" v-model="obj.introHtml"></TextBox>
                        <!--                        <textarea style="height:200px;width: 100%" v-model="obj.intro_html"></textarea>-->
                    </div>
                    <div class="title">手机版商品详情</div>
                    <div class="row" style="padding: 10px 10px 10px 50px">
                        <TextBox :multiline="true" style="height:200px;width: 100%" v-model="obj.introMobile"></TextBox>
                        <!--                        <textarea style="height:200px;width: 100%" v-model="obj.intro_mobile"></textarea>-->
                    </div>
                </LayoutPanel>
            </Layout>
        </LayoutPanel>

        <Dialog ref="selectBuyerDlg" closed
                :title="'选择采销员'"
                class="f-full"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'300px',height:'60%'}"
                :modal="true">
            <selectBuyer @selectBuyer="selectBuyer"></selectBuyer>
        </Dialog>

        <Dialog ref="selectOrganizationUserDlg" closed
                :title="'选择负责人'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'50%',height:'60%'}"
                :modal="true">
            <selectOrganizationUser ref="selectOrganizationUserCom" @selectUser="selectUser"></selectOrganizationUser>
        </Dialog>
        <Dialog ref="selectOrganizationDlg" closed
                :title="'选择BG'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'300px',height:'60%'}"
                :modal="true">
            <selectOrganization @selectOrganization="selectOrganization"></selectOrganization>
        </Dialog>
        <input type="file" id="fileCZ" style="display: none" @change="onUpload($event)">
    </Layout>
</template>

<script>
import filterList from '@/components/filterList.vue';
import selectBrand from '@/components/selectBrand.vue';
import extProps from '@/components/extProps.vue';
import propGroup from '@/components/propGroup.vue';
import selectOrganizationUser from '@/components/selectOrganizationUser.vue';
import selectOrganization from '@/components/selectOrganization.vue';
import selectBuyer from '@/components/selectBuyer.vue';

export default {
    name: "app",
    data() {
        return {
            filterString: '',
            data: [],
            showData: [],
            type: {},
            obj: {},
            extPropsList: [],
            newCommodityObj: {},
            saleUnit: [],
            tssx: [
                {id: 1, title: '普通商品'},
                {id: 2, title: '易碎品'},
                {id: 3, title: '裸装液体'},
                {id: 4, title: '带包装液体'},
                {id: 5, title: '按原包装出库'},
            ],
            sfwxp: [
                {id: 1, title: '是'},
                {id: 0, title: '否'}
            ],
            warrantys: [
                {title: '无质保'},
                {title: '15天质保'},
                {title: '1个月质保'},
                {title: '2个月质保'},
                {title: '3个月质保'},
                {title: '4个月质保'},
                {title: '6个月质保'},
                {title: '1年质保'},
                {title: '18个月质保'},
                {title: '2年质保'},
                {title: '3年质保'},
                {title: '4年质保'},
                {title: '5年质保'},
                {title: '6年质保'},
                {title: '7年质保'},
                {title: '8年质保'},
                {title: '10年质保'},
                {title: '12年质保'},
                {title: '15年质保'},
                {title: '20年质保'},
                {title: '终身质保'},
                {title: '其它'}
            ],
            bzqs: [
                {value: true, title: '是'},
                {value: false, title: '否'}
            ],
            propGroup: [],
            purchaserList: [],
            content: '',
            editabled: false,
            imgPathList: [],
            filetype: "",
            transparentImage: {},
            mainBodyList: [],
            mainBodyId: 1,
            riskLevels: [
                {id: 'A', title: 'A'},
                {id: 'B', title: 'B'},
                {id: 'C', title: 'C'},
            ],
            categoryGroups: [],
            buyers: [],
            buyerType:''
        }
    },
    created: function () {
        this.loadDictList();
        this.loadBuyerList();
        this.loadMainBodyList();
        if (sessionStorage.typeId) {
            this.editabled = true;
            this.loadObj();
            // this.loadType();
        } else {
            this.loadTree();
        }
        this.loadSaleUnit();
    },
    components: {
        filterList, selectBrand, extProps, propGroup, selectOrganizationUser, selectOrganization, selectBuyer
    },
    methods: {
        loadBuyerList() {
            let vm = this;
            this.getData("buyer/getList", {}, function (data) {
                vm.buyers = data;
            })
        },
        loadDictList() {
            let vm = this;
            this.getData("api/getDictListByKey", {key: 'categoryGroup'}, function (data) {
                vm.categoryGroups = data;
            })
        },
        loadMainBodyList() {
            let vm = this;
            this.getData("mainBody/getMainBodyList", {}, function (data) {
                vm.mainBodyList = data;
            })
        },
        loadObj() {
            let vm = this;
            this.getData("commoditynew/getObj", {id: sessionStorage.commodityId}, function (data) {
                vm.obj = data;
                vm.propGroup = vm.obj.propGroupArray;
                if (!vm.propGroup) {
                    vm.loadPropGroup(vm.obj.cid1);
                }
                vm.extPropsList = vm.obj.extPropsArray;
                if (!vm.extPropsList) {
                    vm.loadExtProps(vm.obj.cid1);
                }
                vm.imgPathList = JSON.parse(vm.obj.mainImgList);
                vm.transparentImage = JSON.parse(vm.obj.transparentImage);
                vm.loadPurchaserList(vm.mainBodyId);
            })
        },
        loadSaleUnit() {
            let vm = this;
            this.getData("newCommodity/pullSaleUnit", {mainBodyId: 1}, function (data) {
                vm.saleUnit = [];
                data.forEach(function (e) {
                    vm.saleUnit.push({title: e});
                })
            })
        },
        loadTree() {
            let vm = this;
            this.getData("commodityType/pullOneType", {}, function (data) {
                data.forEach(function (e) {
                    vm.$set(e, 'state', 'closed');
                })
                vm.data = data;
            })
        },
        onNodeExpand(node) {
            if (node.level === 1) {
                let vm = this;
                this.getData("commodityType/pullTwoType", {no: node.id}, function (data) {
                    vm.$set(node, 'children', data);
                })
            }
            if (node.level === 2) {
                let vm = this;
                this.getData("commodityType/pullThreeType", {no: node.id}, function (data) {
                    vm.$set(node, 'children', data);
                })
            }
            if (node.level === 3) {
                vm.$set(node, 'children', null);
            }
        },
        loadPurchaserList(mainBodyId) {
            // let vm = this;
            // this.getData("commodityType/pullPurchaserList", {mainBodyId: mainBodyId}, function (data) {
            //     vm.purchaserList = data;
            // })
        },
        filter(f) {

        },
        selectType(e) {
            if (e.level === 3) {
                this.type = e;
                this.loadExtProps(e.id);
                this.loadPropGroup(e.id);
                this.loadPurchaserList(this.mainBodyId);
            }
        },
        loadExtProps(typeid) {
            let vm = this;
            this.getData("commodityType/getExtProps", {typeId: typeid}, function (data) {
                vm.extPropsList = [];
                data.forEach(function (e) {
                    vm.$set(e, 'selectValue', null);
                    vm.extPropsList.push(e);
                })
                vm.jsonSort(vm.extPropsList, 'orderSort');
            })
        },
        loadPropGroup(typeid) {
            let vm = this;
            this.getData("commodityType/getPropGroup", {typeId: typeid}, function (data) {
                vm.propGroup = [];
                data.forEach(function (e) {
                    vm.$set(e, 'selectValue', null);
                    vm.propGroup.push(e);
                })
                vm.jsonSort(vm.propGroup, 'orderSort');
            })
        },
        selectBrand(obj) {
            this.$set(this.obj, 'brandName', obj.name);
            this.$set(this.obj, 'brandId', obj.brandId);
        },
        save() {
            let vm = this;
            this.obj.extProps = JSON.stringify(this.extPropsList);
            this.obj.propGroup = JSON.stringify(this.propGroup);
            this.obj.mainImgList = JSON.stringify(this.imgPathList);
            this.obj.transparentImage = JSON.stringify(this.transparentImage);
            this.getData("commoditynew/save", {obj: JSON.stringify(this.obj)}, function (data) {
                vm.msg('保存成功');
                vm.loadObj();
            })
        },
        submit() {
            // let vm = this;
            // this.confirm("提交京东审核,确认吗?", function () {
            //     vm.getData("commodity/push", {id: vm.newCommodityObj.id}, function (data) {
            //         vm.msg('提交成功');
            //     })
            // })
        },
        up(type) {
            this.filetype = type;
            $("#fileCZ").val("");
            $("#fileCZ").click();
        },
        onUpload(e) {
            let vm = this;
            let file = e.target.files[0];
            let filesize = file.size;
            let filename = file.name;
            if (filesize > 10485760) {
                alert("图片太大，无法上传");
            } else {
                let reader = new FileReader();
                // 将图片转为base64位
                reader.readAsDataURL(file);
                reader.onload = function (k) {
                    // 读取到的图片base64 数据编码
                    var imgcode = k.target.result;
                    let data = {
                        image: imgcode
                    };
                    let vm = this;
                    vm.getData("pic/uploadPic", {imgFile: JSON.stringify(data.image)}, function (data) {
                        console.log(data);
                        if (vm.filetype === 'main') {
                            vm.imgPathList.push(data);
                        }
                        if (vm.filetype === 'transparent') {
                            vm.transparentImage = data;
                        }
                    })
                }.bind(this);
            }
        },
        removeImg(img, index) {
            let vm = this;
            this.confirm("确认吗?", function () {
                vm.getData("pic/deletePic", {id: img.imgId}, function (data) {
                    vm.imgPathList.splice(index, 1);
                })
            })
        },
        removeTransparentImage() {
            let vm = this;
            this.getData("pic/deletePic", {id: this.transparentImage.imgId}, function (data) {
                vm.transparentImage = {};
            })
        },
        expand(obj) {
            this.$set(obj, 'expand', !obj.expand);
        },
        openSelectOrganizationUserDlg() {
            this.$refs.selectOrganizationUserDlg.open();
        },
        selectUser(obj) {
            this.$set(this.obj, 'userid', obj.id);
            this.$set(this.obj, 'username', obj.username);
            this.$refs.selectOrganizationUserDlg.close();
        },
        selectOrganization(obj) {
            this.$set(this.obj, 'bg', obj.id);
            this.$set(this.obj, 'bgName', obj.name);
            this.$refs.selectOrganizationDlg.close();
        },
        openSelectOrganizationDlg() {
            this.$refs.selectOrganizationDlg.open();
        },
        openSelectBuyerDlg(k){
            this.buyerType=k;
            this.$refs.selectBuyerDlg.open();
        },
        selectBuyer(obj){
            this.$set(this.obj,this.buyerType+'Code',obj.keyname);
            this.$set(this.obj,this.buyerType+'Name',obj.name);
            this.$refs.selectBuyerDlg.close();
        }
    },
    watch: {
        filterString: {
            handler() {
                let vm = this;
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(function () {
                    vm.loadTree();
                }, 500);
            }
        }
    },
}
</script>

<style scoped>

.field-title {
    line-height: 32px;
}

.title {
    text-align: left;
    font-weight: bold;
    font-size: 16px;
    margin-left: 30px;
}

.title1 {
    text-align: left;
    font-weight: bold;
    font-size: 25px;
    margin-left: 10px;
}

</style>
