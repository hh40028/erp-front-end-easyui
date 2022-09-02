<template>
    <div>
        <div id="summernote" class="m-b-0"></div>
    </div>
</template>

<script>
export default {
    props:['content'],
    name: "app",
    data() {
        return {}
    },
    created: function () {
        // $("#summernote").summernote(
        //     "code",this.content
        // );
    },
    mounted() {
        $("#summernote").summernote({
            height: 200,
            tabsize: 2,
            lang: "zh-CN"
        });
    },
    methods: {
    }
}
</script>

<style scoped>

</style>
