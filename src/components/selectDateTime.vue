<template>
    <div>
        <input type="text" v-model="value" readonly @click="openShowDateTimeDlg" class="form-control">
        <Dialog ref="showDateTimeDlg" closed
                :title="'日期时间'"
                :draggable="true"
                :dialogStyle="{width:'620px',height:'520px'}"
                :modal="true">
            <div class="f-full">
                <Layout bodyCls="f-column" :border="false">
                    <LayoutPanel region="north" :border="false">
                        <Panel :bodyStyle="{padding:'5px'}" :border="false">
                            <div class="col-12 p-10 text-center">
                                <ButtonGroup selectionMode="single">
                                    <LinkButton :toggle="false" class="f-18" @click="up">　<　</LinkButton>
                                    <LinkButton :toggle="false" class="f-18">　{{ year }}年{{ month }}月　</LinkButton>
                                    <LinkButton :toggle="false" class="f-18" @click="down">　>　</LinkButton>
                                </ButtonGroup>
                            </div>
                        </Panel>
                    </LayoutPanel>
                    <LayoutPanel region="center" style="height:100%" bodyCls="f-column" :border="false" class="p-5">
                        <Layout bodyCls="f-column" :border="false">
                            <LayoutPanel region="center" bodyCls="f-column" :border="false">
                                <div class="row">
                                    <div class="col-9">
                                        <div class="col7-title">周一</div>
                                        <div class="col7-title">周二</div>
                                        <div class="col7-title">周三</div>
                                        <div class="col7-title">周四</div>
                                        <div class="col7-title">周五</div>
                                        <div class="col7-title">周六</div>
                                        <div class="col7-title">周日</div>
                                        <div class="col7" v-for="d in weeks">

                                        </div>
                                        <div class="col7" v-for="d in data" :class="{'c-orange':d.selected}" @click="changeHolidays(d)">
                                            {{ d.ri }}
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="col-3 col1-title ">小时</div>
                                        <div class="col-3 col1-title ">分钟</div>
                                        <div class="row">
                                            <div class="col-6 text-center" style="height: 260px;overflow: scroll">
                                                <div v-for="h in hours" style="font-size: 30px" :class="{'c-orange':h===hour}" @click="selectHours(h)">{{ h }}</div>
                                            </div>
                                            <div class="col-6 text-center" style="height: 260px;overflow: scroll">
                                                <div v-for="m in minutes" style="font-size: 30px" :class="{'c-orange':m===minute}" @click="selectMinute(m)">{{ m }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 text-center">
                                    <LinkButton style="width:80px;margin-right: 10px" @click="ok">确定</LinkButton>
                                    <LinkButton style="width:80px" @click="$refs.showDateTimeDlg.close()">取消</LinkButton>
                                </div>
                            </LayoutPanel>
                        </Layout>
                    </LayoutPanel>
                </Layout>
            </div>
        </Dialog>
    </div>
</template>

<script>
export default {
    props: ['value'],
    name: "app",
    data() {
        return {
            year: 0,
            month: 0,
            weeks: 0,
            data: [],
            hours: [],
            minutes: [],
            datestr: '',
            hour: '',
            minute: ''
        }
    },
    created: function () {
        this.loadHours();
        let dt = new Date();
        this.year = dt.getFullYear();
        this.month = dt.getMonth() + 1;
        this.load();
    },
    methods: {
        loadHours() {
            for (let i = 0; i < 24; i++) {
                if (i < 10) {
                    this.hours.push('0' + i);
                } else {
                    this.hours.push(i);
                }
            }
            for (let i = 0; i < 60; i++) {
                if (i < 10) {
                    this.minutes.push('0' + i);
                } else {
                    this.minutes.push(i);
                }
            }
        },
        load: function () {
            let vm = this;
            this.getData("calendar/getList", {
                nian: this.year,
                yue: this.month
            }, function (data) {
                vm.data = data;
                vm.data.forEach(function (e) {
                    vm.$set(e, 'selected', false);
                })
                if (vm.data.length > 0) {
                    vm.weeks = vm.data[0].week - 1;
                }
            })
        },
        buildNew() {
            let vm = this;
            this.confirm('生成1000天日历，确认吗?', function () {
                vm.getData("calendar/buildCalender", {}, function (data) {
                    vm.load();
                })
            })
        },
        down() {
            let vm = this;
            this.getData("calendar/getDownYearMonth", {year: this.year, month: this.month}, function (data) {
                vm.year = data.year;
                vm.month = data.month;
                vm.load();
            })
        },
        up() {
            let vm = this;
            this.getData("calendar/getUpYearMonth", {year: this.year, month: this.month}, function (data) {
                vm.year = data.year;
                vm.month = data.month;
                vm.load();
            })
        },
        changeHolidays(obj) {
            this.data.forEach(function (e) {
                e.selected = false;
            })
            obj.selected = !obj.selected;
            this.datestr = obj.datestr;
        },
        openShowDateTimeDlg() {
            this.$refs.showDateTimeDlg.open();
            this.$refs.showDateTimeDlg.moveToTop();
        },
        selectHours(h) {
            this.hour = h;
        },
        selectMinute(m) {
            this.minute = m;
        },
        ok() {
            if (!this.datestr) {
                this.msg('请选择日期');
            } else if (!this.hour) {
                this.msg('请选择小时');
            } else if (!this.minute) {
                this.msg('请选择分钟');
            } else {
                this.$refs.showDateTimeDlg.close();
                this.$emit('selectDT', this.datestr + " " + this.hour + ":" + this.minute + ":00");
            }
        }
    }
}
</script>

<style scoped>

.c-orange {
    color: orange;
    font-weight: bold;
}

.col7 {
    margin: 2px;
    padding: 0px;
    float: left;
    width: calc(14.28571429% - 4px);
    /*height: 100px;*/
    line-height: 50px;
    font-size: 30px;
    /*border: 1px solid red;*/
    text-align: center;
    background-color: rgba(0, 0, 0, 0.05);
}

.col7-title {
    margin: 2px;
    padding: 0px;
    float: left;
    width: calc(14.28571429% - 4px);
    /*height: 50px;*/
    /*line-height: 50px;*/
    /*border: 1px solid red;*/
    text-align: center;
    background-color: rgba(0, 0, 0, 0.05);
}

.col1-title {
    margin: 2px;
    padding: 0px;
    float: left;
    width: 44%;
    /*height: 50px;*/
    /*line-height: 50px;*/
    /*border: 1px solid red;*/
    text-align: center;
    background-color: rgba(0, 0, 0, 0.05);
}

</style>
