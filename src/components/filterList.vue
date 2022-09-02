<template>
    <div>
        <TextBox placeholder="过滤..." style="width:300px" v-model="filterString">
            <Addon align="left">
                <LinkButton :btnStyle="{borderRadius:0,borderWidth:'0 1px 0 0',width:'80px',height:'30px'}" @click="openPageSizeDlg">每页{{ pageSize }}行</LinkButton>
            </Addon>
            <Addon>
                <span class="textbox-icon icon-clear" v-if="filterString" @click="filterString=''"></span>
            </Addon>
        </TextBox>

        <Dialog ref="changePageSizeDlg" closed
                :title="'改变行数'"
                :draggable="true"
                :resizable="true"
                :dialogStyle="{width:'40%'}"
                :modal="true">
            <div class="row">
                <LinkButton style="width:18%;float: left;margin: 1%" v-for="p in sizes" @click="changePageSize(p.value)">{{ p.value }}</LinkButton>
            </div>
        </Dialog>

        <!--        <div v-if="filterString" class="clear-icon sz" @click="filterString=''">×</div>-->
        <!--        <input type="text" v-model="filterString" :class="{'c-red':filterString}" onclick="select()"-->
        <!--               class="form-control p-r-20" :placeholder="placeholder">-->
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: '过滤...'
        },
        pageSize: {
            type: Number,
            default: 15
        }
    },
    name: "app",
    data() {
        return {
            filterString: '',
            sizes: [
                {value: 5},
                {value: 15},
                {value: 30},
                {value: 50},
                {value: 100}
            ]
        }
    },
    created: function () {
    },
    methods: {
        load: function () {
            this.$emit('filterLoad', this.filterString);
        },
        openPageSizeDlg() {
            this.$refs.changePageSizeDlg.open();
        },
        changePageSize(value){
            this.pageSize=value;
            this.$refs.changePageSizeDlg.close();
            this.$emit('changePageSize', value);
        }
    },
    watch: {
        filterString: {
            handler() {
                let vm = this;
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(function () {
                    vm.load();
                }, 500);
            }
        }
    },
}
</script>

<style scoped>
.clear-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 999999999;
    font-size: 16px;
    cursor: pointer
}
</style>
