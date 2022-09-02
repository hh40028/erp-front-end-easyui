<template>
    <div>
        <span v-if="prop.required" class="c-red">*</span><label>{{ prop.name }}</label><span v-if="prop.valUnit">({{prop.valUnit}})</span>
        <span class="pull-right" v-if="prop.inputType===1">(单选)</span>
        <span class="pull-right" v-if="prop.inputType===2">(多选)</span>
        <span class="pull-right" v-if="prop.inputType===3">(文本)</span>
        <span class="pull-right" v-if="prop.inputType===4">(时间年)</span>
        <span class="pull-right" v-if="prop.inputType===5">(时间月)</span>
        <span class="pull-right" v-if="prop.inputType===6">(时间日)</span>
        <span class="pull-right" v-if="prop.inputType===7">(数值)</span>
        <span class="pull-right" v-if="prop.inputType===8">(jos自定义值)</span>
        <span class="pull-right" v-if="prop.inputType===10">(单选+文本)</span>
        <span class="pull-right" v-if="prop.inputType===11">(多输入)</span>
        <span class="pull-right" v-if="prop.inputType===100">(地域级联)</span>
        <span class="pull-right" v-if="prop.inputType===200">(百分比)</span>
        <br>
        <ComboBox v-if="prop.inputType===1" v-model="prop.selectValue" :data="prop.values" textField="name" valueField="id" style="width: 100%"></ComboBox>
        <ComboBox v-if="prop.inputType===2" style="width: 100%" v-model="prop.selectValue" :data="prop.values" :multiple="true" textField="name" valueField="id"></ComboBox>
<!--        <DateBox v-if="prop.inputType===6" style="width: 100%" v-model="prop.selectValue" format="yyyy-MM-dd"></DateBox>-->
        <TextBox v-if="prop.inputType===3" v-model="prop.selectValue" style="width: 100%"></TextBox>
        <NumberBox v-if="prop.inputType===7" v-model="prop.selectValue" style="width: 100%" :spinners="true"></NumberBox>
        <div v-if="prop.inputType===10" v-for="value in prop.values" :class="{'col-12':prop.values.length===1,'col-6':prop.values.length===2,'col-4':prop.values.length===3,'col-3':prop.values.length===4,'col-3':prop.values.length>4}">
            <TextBox v-model="value.selectValue" style="width: 100%">
                <Addon align="left">
                    <LinkButton :btnStyle="{borderRadius:0,borderWidth:'0 1px 0 0',width:'70px',height:'30px'}">{{value.vremark}}{{value.units[0][0]}}</LinkButton>
                </Addon>
            </TextBox>
        </div>
        <selectDate v-if="prop.inputType===6" :value="prop.selectValue" @selectDT="selectDT"></selectDate>
        <br>
    </div>
</template>

<script>
import selectDate from '@/components/selectDate.vue';

export default {
    props: ['prop'],
    name: "app",
    data() {
        return {}
    },
    components: {
        selectDate
    },
    created: function () {
        this.load();
    },
    methods: {
        load: function () {
        },
        selectDT(obj){
            this.prop.selectValue=obj;
        }
    }
}
</script>

<style scoped>

</style>
