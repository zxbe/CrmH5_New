<template>
<div>
    <header class="mui-bar mui-bar-nav">
        <a @click="back" class="calcfont calc-fanhui left" id="back"></a>

        <h1 class="mui-title f18">{{title}}</h1>

        <!-- 新增状态头部icon显示   -->
        <div v-if="isAddNew" class="leftView right">
            <a v-if="!onlyView" @click="save" class="calcfont calc-gou right" id="save"></a>
            <!-- 针对用户详情做的只展示更新icon -->
            <!-- <a v-if="onlyView && operation" @click="moreClick" class="calcfont calc-gengduo right" id="gengduo"></a> -->
        </div>
        <!-- 编辑状态头部icon显示   -->
        <div v-else class="leftView right">

            <a v-if="!onlyView && operation" @click="moreClick" class="calcfont calc-gengduo right" id="gengduo"></a>
            <a v-if="!onlyView && !onlyMore" @click="save" class="calcfont calc-gou right" id="save"></a>
            <a v-if="!onlyView && !notDelete && !onlyMore" @click="delClick" class="calcfont calc-shanchu right" id="delete"></a>

        </div>

    </header>
</div>
</template>

<script>
export default {
    name: 'infoheader',
    data() {
        return {
            rightPanelFromTypeNew: "",
            rightPanelFromIDNew: "",
        }
    },
    props: {
        title: String,
        isAddNew: { //是否是新增状态, 父组件不传默认为false
            type: Boolean,
            default: function () {
                return false
            }
        },
        onlyMore: { //是否只有右侧滑可操作,父组件不传默认为false
            type: Boolean,
            default: function () {
                return false
            }
        },
        operation: { //侧滑是否可操作, 父组件不传默认为false
            type: Boolean,
            default: function () {
                return false
            }
        },
        onlyView: { //标志页面只能查看,父组件不传默认为false
            type: Boolean,
            default: function () {
                return false
            }
        },
        notDelete: { //控制删除按钮是否显示,父组件不传默认为false（显示）
            type: Boolean,
            default: function () {
                return false
            }
        },
        // onlyMore:Boolean,   //只有Opportunitiesinfo文件用到 不传默认为fase
        rightPanelFromType: String,
        rightPanelFromID: String
    },
    watch: {},
    created: function () {
        var _self = this;
    },
    mounted: function () {

    },
    activated: function () {},
    methods: {

        //保存动作
        save: function () {
            var _self = this;
            _self.$parent.savePageData();
        },
        delClick: function () {
            var _self = this;
            _self.$parent.deleteData();
        },
        moreClick: function () {
            let _self = this;
            //调用同级组件的方法
            _self.$parent.$refs.rightPanel.panelToggle();
        },
        back: function () {
            let _self = this;
            let parentName = _self.$parent.$options.name;
            _self.$store.commit('REMOVE_ITEM', parentName);
            _self.$router.back(-1);
        }
    }
}
</script>

<style scoped>
header {
    position: relative;
}

header.mui-bar {
    line-height: 0.2rem;
    background: #f8f2dc;
}

.leftView {
    position: absolute;
    height: 0.88rem;
    right: 0;
    top: 0;
}

.mui-title {

    display: inline-block;
    overflow: hidden;
    width: auto;
    max-width: 65%;
    font-size: .34rem;
    margin: 0 0 0 -10px;
    text-overflow: ellipsis;
    padding: 0;
    text-align: left;
    white-space: nowrap;
    line-height: .88rem;
}

.calcfont {
    font-size: 0.48rem;
    text-align: center;
    padding: .2rem 10px;
    position: relative;
    z-index: 20;
    display: inline-block;
    text-decoration: none;
    line-height: 1;
    margin-left: -10px;
}

.calc-fanhui {
    margin-left: 0;
}

#delete:after {
    clear: both;

}

header .mui-title,
header a {
    color: #333333;
    font-weight: 400;
}
</style>
