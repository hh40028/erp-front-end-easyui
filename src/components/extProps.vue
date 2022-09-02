<template>
    <div>
        <span v-if="ext.isRequired===1" class="c-red">*</span><label>{{ ext.name }}</label>
        <span class="pull-right" v-if="ext.inputType===1 && ext.extPropValue">(单选)</span>
        <span class="pull-right" v-if="ext.inputType===1 && !ext.extPropValue">(级联属性)</span>
        <span class="pull-right" v-if="ext.inputType===2">(多选)</span>
        <span class="pull-right" v-if="ext.inputType===3">(文本)</span>
        <span class="pull-right" v-if="ext.inputType===4">(时间年)</span>
        <span class="pull-right" v-if="ext.inputType===5">(时间月)</span>
        <span class="pull-right" v-if="ext.inputType===6">(时间日)</span>
        <span class="pull-right" v-if="ext.inputType===7">(数值)</span>
        <span class="pull-right" v-if="ext.inputType===8">(jos自定义值)</span>
        <span class="pull-right" v-if="ext.inputType===10">(单选+文本)</span>
        <span class="pull-right" v-if="ext.inputType===11">(多输入)</span>
        <span class="pull-right" v-if="ext.inputType===100">(地域级联)</span>
        <span class="pull-right" v-if="ext.inputType===200">(百分比)</span>
        <br>
        <TextBox v-if="ext.inputType===1 && !ext.extPropValue" v-model="ext.selectValue" style="width:100%"></TextBox>
        <ComboBox v-if="ext.inputType===1 && ext.extPropValue" v-model="ext.selectValue" :data="ext.extPropValue" textField="valueName" valueField="valueId" style="width: 100%"></ComboBox>
        <ComboBox v-if="ext.inputType===2" style="width: 100%" v-model="ext.selectValue" :data="ext.extPropValue" :multiple="true" textField="valueName" valueField="valueId"></ComboBox>
        <ComboBox v-if="ext.inputType>2" style="width: 100%" v-model="ext.selectValue" :data="ext.extPropValue" :multiple="true" textField="valueName" valueField="valueId"></ComboBox>
        <br>
    </div>
</template>

<script>
export default {
    props: ['ext'],
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

</style>
