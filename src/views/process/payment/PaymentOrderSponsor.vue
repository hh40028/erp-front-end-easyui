<template>
    <Layout bodyCls="f-column" style="height: calc(100vh - 52px)" :border="false" >
        <LayoutPanel region="north" :border="true" style="padding: 3px">
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
                                <LinkButton style="margin-right: 20px" @click="send">撤销流程</LinkButton>
                            </td>
                        </tr>
                    </table>
                </div>
            </Panel>
        </LayoutPanel>
        <LayoutPanel region="center" bodyCls="f-column" :border="true" style="padding: 3px;height: 100%">
            <Panel title="单据信息" bodyCls="f-column" :border="false">
                <viewPaymentRequestFrom ref="viewPaymentRequestFromCom"></viewPaymentRequestFrom>
            </Panel>
        </LayoutPanel>
        <Dialog ref="processDlg" closed
                :title="'审核意见'"
                :dialogStyle="{width:'300px',height:'200px'}"
                bodyCls="f-column"
                :modal="true">
            <div class="f-full">
                <div style="padding: 10px">
                    <div>
                        <textarea placeholder="请输入驳回理由" style="height: 70px" class="form-control" v-model="message"></textarea>
                    </div>
                </div>
            </div>
            <div class="dialog-button">
                <LinkButton style="width:80px" @click="disallowance">发送</LinkButton>
                <LinkButton style="width:80px" @click="$refs.processDlg.close()">关闭</LinkButton>
            </div>
        </Dialog>
        <Dialog ref="selectUserDlg" closed
                :title="'选择财务主管'"
                :dialogStyle="{width:'600px',height:'600px'}"
                bodyCls="f-column"
                :modal="true">
            <div class="f-full">
                <selectOrganizationUser ref="selectOrganizationUserCom" @selectUser="selectUser"></selectOrganizationUser>
            </div>
        </Dialog>
    </Layout>
</template>

<script>

import viewPaymentRequestFrom from '@/components/viewPaymentRequestFrom.vue';
import selectOrganizationUser from '@/components/selectOrganizationUser.vue';

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
        viewPaymentRequestFrom, selectOrganizationUser
    },
    methods: {
        send(){
            let vm=this;
            this.$refs.processDlg.close();
            this.confirm('撤回申请,确认吗?',function (){
                vm.getData("sys/nextTask", {
                    taskid: vm.processObj.id,
                    operationname: '撤销流程',
                    message: '',
                    processVariables:JSON.stringify({})
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
