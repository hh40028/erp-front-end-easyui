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
                                <LinkButton style="margin-right: 20px" @click="review()">审核通过</LinkButton>
                                <LinkButton style="margin-right: 20px" @click="bohui()">驳回申请</LinkButton>
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
        <Dialog ref="processDlg" closed
                :title="'驳回申请'"
                :dialogStyle="{width:'300px',height:'200px'}"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <div style="padding: 10px">
                    <div>
                        <textarea placeholder="请输入驳回意见" style="height: 70px" class="form-control" v-model="message"></textarea>
                    </div>
                </div>
            </div>
            <div class="dialog-button">
                <LinkButton style="width:80px" @click="pass">发送</LinkButton>
                <LinkButton style="width:80px" @click="$refs.processDlg.close()">关闭</LinkButton>
            </div>
        </Dialog>
        <Dialog ref="selectUserDlg" closed
                :title="'选择财务主管'"
                :dialogStyle="{width:'600px',height:'600px'}"
                bodyCls="f-column"
                :draggable="true"
                :resizable="true"
                :modal="true">
            <div class="f-full">
                <selectOrganizationUser ref="selectOrganizationUserCom" @selectUser="selectUser"></selectOrganizationUser>
            </div>
        </Dialog>
    </Layout>
</template>

<script>

import viewRceceiptApplicationForm from '@/components/viewRceceiptApplicationForm.vue';
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
        viewRceceiptApplicationForm, selectOrganizationUser
    },
    methods: {
        bohui() {
            this.$refs.processDlg.open();
        },
        review() {
            this.$refs.selectUserDlg.open();
        },
        pass() {
            let vm = this;
            this.$refs.processDlg.close();
            this.confirm('驳回申请,确认吗?', function () {
                vm.getData("sys/nextTask", {
                    taskid: vm.processObj.id,
                    operationname: '驳回',
                    message: vm.message,
                    processVariables: JSON.stringify({})
                }, function (data) {
                    vm.$router.push('index');
                })
            })
        },
        selectUser(obj) {
            let vm = this;
            this.$refs.selectUserDlg.close();
            this.confirm('审核通过,确认吗?', function () {
                vm.getData("sys/nextTask", {
                    taskid: vm.processObj.id,
                    operationname: '审核通过',
                    message: vm.message,
                    processVariables: JSON.stringify({financialDirector: obj.id})
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
