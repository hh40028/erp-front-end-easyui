<template>
    <Layout bodyCls="f-column" :border="false"  v-if="imgs.length">
        <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false">
            <img :src="'https://img11.360buyimg.com/n1/'+imgs[index].path" style="width: 100%">
        </LayoutPanel>
        <LayoutPanel region="west" style="width:300px;height:100%" bodyCls="f-column">
            <img v-if="imgs.length" @click="selectImg(index)" v-for="(img,index) in imgs" :src="'https://img11.360buyimg.com/n1/'+img.path" style="width: 100%">
        </LayoutPanel>
    </Layout>
    <div v-else style="text-align: center;font-size: 30px">没有找到图片</div>

</template>

<script>
export default {
    props: ['wareid'],
    name: "app",
    data() {
        return {
            imgs: [
                {'getImgPath':null}
            ],
            index: 0
        }
    },
    created: function () {
        this.load();
    },
    methods: {
        load() {
            let vm = this;
            this.getData("commoditynew/getMainImgList", {
                wareid: this.wareid
            }, function (data) {
                vm.imgs = data;
                if (vm.imgs.length > 0) {
                    vm.$emit('getImgPath', vm.imgs[0].path);
                }
            })
        },
        selectImg: function (index) {
            this.index = index;
        }
    }
}
</script>

<style scoped>

</style>
