<template>
<div>
    <div class="pageContent">
        <Infoheader class="sticky infoheader" :isAddNew="isAddNew" :onlyView="onlyView" :operation="operation" :title="ptitle"></Infoheader>
    </div>
    <InfoRightPanel ref="rightPanel" :isShowClose="isShowClose" :isShowSend="isShowSendBtn" :rightPanelFromType="rightPanelFromType" :rightPanelFromID="rightPanelFromID"></InfoRightPanel>
</div>
</template>

<script>
import Infoheader from '@/components/customPlugin/Infoheader'
import InfoRightPanel from '@/components/customPlugin/InfoRightPanel'
import Infofooter from '@/components/customPlugin/infoFooter'
export default {
    name: 'UserEventsInfo',
    components: {
        Infoheader,
        Infofooter,
        InfoRightPanel
    },
    data() {
        return {
            ptitle: lanTool.lanContent("1000205_用户详情"),
            isAddNew: true,
            onlyView: true,
            operation: true,
            isShowClose:false,
            isShowSendBtn:false,
            rightPanelFromType: "", //传给右侧菜单用的参数
            rightPanelFromID: "", //传给右侧菜单用的参数
        }
    },
    created: function () {
        var _self = this;
      _self.rightPanelFromType = "20";
    },
    mounted: function () {

    },
    methods: {

    }
}
</script>

<style scoped>

</style>
