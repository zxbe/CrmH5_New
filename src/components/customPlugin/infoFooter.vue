<template>
<!-- <div class="updateList HideWhenNew"> -->
<div class="updateList">
    <div class="DetailRow">
        <div class="DetailRowOn"><span class="calcfont calc-shijian ChangeIconColor"></span><span class="FileName lanText" data-lanid="801_更新时间"></span></div>
        <div class="DetailRowUp">
            <div data-field="LastUpdateTime" data-fieldControlType="divText" data-formatType="DateTime" data-format="dd/MM/yyyy HH:mm"></div>

        </div>
        </div>
        <div class="DetailRow">
            <div class="DetailRowOn"><span class="calcfont calc-chuangjianzhe ChangeIconColor"></span><span class="FileName lanText" data-lanid="802_更新者"></span></div>
            <div class="DetailRowUp">
                <div data-field="LastUpdateUserName" data-fieldControlType="divText"></div>

            </div>
        </div>

        <!-- <div class="ListCell">
        <div class="ListCellLeftIcon"><span class="mui-icon calcfont calc-shijian"></span></div>
        <div class="ListCellContent">
            <div class="ListCellContentLeft leftContent">
                <div class="ListCellContentLeftText lanText" data-lanid="801_更新时间"></div>
            </div>
            <div class="ListCellContentRight rightContent"> -->
        <!-- <div class="ListCellContentRightText">{{modifiedtime}}</div> -->
        <!-- <div data-field="LastUpdateTime" data-fieldControlType="divText" data-formatType="DateTime" data-format="dd/MM/yyyy HH:mm" class="ListCellContentRightText"></div>
            </div>
        </div>
    </div>
    <div class="ListCell">
        <div class="ListCellLeftIcon"><span class="mui-icon calcfont calc-chuangjianren"></span></div>
        <div class="ListCellContent">
            <div class="ListCellContentLeft leftContent">
                <div class="ListCellContentLeftText lanText" data-lanid="802_更新者"></div>
            </div>
            <div class="ListCellContentRight rightContent"> -->
        <!-- <div class="ListCellContentRightText">{{modifiedby}}</div> -->
        <!-- <div data-field="LastUpdateUserName" data-fieldControlType="divText" class="ListCellContentRightText"></div>
            </div>
        </div>
    </div> -->
    </div>
</template>

<script>
export default {
    mounted: function () {
        var _self = this;
        lanTool.updateLanVersion();
    },
    created: function () {}
}
</script>

<style scoped>
/* @import "../../assets/css/pages/commonInfo.css"; */
.DetailRow {
    position: relative;
    background-color: #ffffff;
    min-height: 1.28rem;
    padding-left: 0.16rem;
    padding-top: 0.2rem;
    padding-right: 0.18rem;
    /* padding-bottom: 0.2rem; */
    box-sizing: border-box;
}

.DetailRow:after {
    position: absolute;
    content: "";
    left: .6rem;
    right: 0.18rem;
    bottom: 0;
    height: 1px;
    background-color: beige;
}

.calcfont.ChangeIconColor {
    font-size: 0.32rem;
    color: #FF9900;
}

span.FileName {
    font-size: 0.24rem;
    padding-left: 0.12rem;
}
.DetailRowUp {
    position: relative;
    padding-left: 0.44rem;
    padding-bottom: 0.1rem;
    margin-top: 0.3rem;
}
</style>
