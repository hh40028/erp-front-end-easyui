<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false">
        <LayoutPanel region="north" :border="false">
            <Panel :title="processObj.pdname" bodyCls="f-column" :border="false">
                <div style="padding: 5px">
                    <table style="width:100%;border:0">
                        <tr>
                            <td style="width:33.33333%">发送人:{{ processObj.sendusername }}</td>
                            <td style="width:33.33333%">发送时间: {{ processObj.arrivaltime }}</td>
                            <td style="width:33.33333%">发送意见: {{ processObj.message }}</td>
                        </tr>
                        <tr>
                            <td style="width:100%;text-align: left" colspan="3">
                                <LinkButton style="margin-right: 20px" @click="cancel">撤销申请</LinkButton>
                            </td>
                        </tr>
                    </table>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" bodyCls="f-column" :border="true" style="padding: 3px;height: 100%">
            <Panel title="单据信息" bodyCls="f-column" :border="false">
                <viewRceceiptApplicationForm ref="viewRceceiptApplicationFormCom"></viewRceceiptApplicationForm>
            </Panel>
        </LayoutPanel>
    </Layout>
</template>

<script>

import viewRceceiptApplicationForm from '@/components/viewRceceiptApplicationForm.vue';

export default {
    name: "app",
    data() {
        return {
            processObj: {},
            message: ''
        }
    },
    created: function () {
        this.processObj = JSON.parse(sessionStorage.processObj);
    },
    components: {
        viewRceceiptApplicationForm
    },
    methods: {
        cancel() {
            let vm = this;
            this.confirm('撤销申请,确认吗?', function () {
                vm.getData("sys/nextTask", {
                    taskid: vm.processObj.id,
                    operationname: '撤销流程',
                    message: '发起人撤销流程',
                    processVariables: JSON.stringify({})
                }, function (data) {
                    vm.$router.push('index');
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
