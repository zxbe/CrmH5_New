<template>
  <div class="search-rows f14">
    <div v-for="item in searchData" :key="item.queryfield" class="item-row">
      <!-- 手动输入 -->
        <div v-if="item.fieldControlType =='textareaInput'">
            <input v-if="(''+((item.isRange==undefined||item.isRange==null)?'false':item.isRange))=='false'" class="f14 search-input" type="text"
            :placeholder="item.text"
            :data-field="item.queryfield"
            :data-fieldControlType="item.fieldControlType"
            :data-queryType="item.queryType"
            :data-queryFormat="item.queryFormat"
            :data-queryRelation="item.queryRelation"
            :data-queryValue="item.queryValue"
            :data-queryComparison="item.queryComparison"
            />

            <div v-else-if="(''+((item.isRange==undefined||item.isRange==null)?'false':item.isRange))=='true'" class="boxFlex">
                <div class="leftText">{{item.text}}</div>
                <div class="startDate">
                    <input class="f14 search-input" type="text"
                    :placeholder="item.text"
                    :data-field="item.queryfield"
                    :data-fieldControlType="item.fieldControlType"
                    :data-queryType="item.queryType"
                    :data-queryFormat="item.queryFormat"
                    :data-queryRelation="item.queryRelation"
                    :data-queryValue="item.queryValue"
                    :data-queryComparison="item.queryComparison"
                    :data-queryIsChangeBetween="item.queryIsChangeBetween"
                    />
                </div>
                <div class="lianxian">~</div>
                <div class="endDate">
                    <input class="f14 search-input" type="text"
                    :placeholder="item.text"
                    :data-field="item.queryfield+'_0'"
                    :data-fieldControlType="item.fieldControlType"
                    :data-queryType="item.queryType"
                    :data-queryFormat="item.queryFormat"
                    :data-queryRelation="item.queryRelation"
                    :data-queryValue="item.queryValue"
                    :data-queryComparison="item.queryComparison"
                    :data-queryIsChangeBetween="item.queryIsChangeBetween"
                    />
                </div>
            </div>

        </div>
      <div v-else-if="item.fieldControlType =='dateTimePicker' && (''+((item.isRange==undefined||item.isRange==null)?'false':item.isRange))=='true'">
        <div class="boxFlex">
          <div class="leftText">{{item.text}}</div>
          <div class="startDate">
            <input
              class="dateTimePicker"
              :data-field="item.queryfield"
              :data-fieldControlType="item.fieldControlType"
              :data-fieldName="item.text"
              :data-TimeType="item.timeType"
              :TypeValue="item.TypeValue"
              :data-queryType="item.queryType"
              :data-format="item.queryFormat"
              :data-queryRelation="item.queryRelation"
              :data-queryValue="item.queryValue"
              :data-queryComparison="item.queryComparison"
              :data-queryIsChangeBetween="item.queryIsChangeBetween"
            >
          </div>

          <div class="lianxian">~</div>

          <div class="endDate">
            <input
              class="dateTimePicker"
              :data-field="item.queryfield+'_0'"
              :data-fieldControlType="item.fieldControlType"
              :data-fieldName="item.text"
              :data-TimeType="item.timeType"
              :TypeValue="item.TypeValue"
              :data-queryType="item.queryType"
              :data-format="item.queryFormat"
              :data-queryRelation="item.queryRelation"
              :data-queryValue="item.queryValue"
              :data-queryComparison="item.queryComparison"
              :data-queryIsChangeBetween="item.queryIsChangeBetween"
            >
          </div>
        </div>
      </div>
      <div v-else>
        <div class="item-row-flex">
          <span class="calcfont calc-you f18"></span>
          <div class="row-cell-bd">{{item.text}}</div>

          <div
            v-if="(item.fieldControlType=='selectList'||item.fieldControlType=='groupSelectList')&&item.resulteRow"
            :id="item.clickObj"
            class="selectList row-cell-ft f12"
          ></div>
          <div
            v-else-if="(item.fieldControlType=='selectList'||item.fieldControlType=='groupSelectList')&&!item.resulteRow"
            class="selectList row-cell-ft f12"
            :data-field="item.queryfield"
            :data-fieldControlType="item.fieldControlType"
            data-field-val
            :data-selectType="item.selectType"
            :Code="item.Code"
            :TypeValue="item.TypeValue"
            :data-queryType="item.queryType"
            :data-queryFormat="item.queryFormat"
            :data-queryRelation="item.queryRelation"
            :data-queryValue="item.queryValue"
            :data-queryComparison="item.queryComparison"
            :data-lanid="item.datalanid"
            :data-fromType="item.fromType"
          ></div>

          <!-- <div v-else-if="item.type==='picker'" class="picker row-cell-ft" :data-field="item.field" :data-val="item.value" :id="item.id">{{item.value}}</div> -->
          <input
            v-else-if="item.fieldControlType=='picker'"
            class="picker row-cell-ft f12"
            :data-field="item.queryfield"
            :data-fieldControlType="item.fieldControlType"
            data-field-val
            :Code="item.Code"
            :TypeValue="item.TypeValue"
            :data-queryType="item.queryType"
            :data-queryFormat="item.queryFormat"
            :data-queryRelation="item.queryRelation"
            :data-queryValue="item.queryValue"
            :data-queryComparison="item.queryComparison"
            :data-lanid="item.datalanid"
          >

          <!-- <div v-else-if="item.type==='datepicker'" class="datepicker row-cell-ft" :data-field="item.field" :data-val="item.value" :id="item.id" data-minute="true">{{item.value}}</div> -->
          <input
            v-else-if="item.fieldControlType=='dateTimePicker'"
            class="dateTimePicker row-cell-ft f12"
            :data-field="item.queryfield"
            :data-fieldControlType="item.fieldControlType"
            :data-TimeType="item.timeType"
            :TypeValue="item.TypeValue"
            :data-queryType="item.queryType"
            :data-format="item.queryFormat"
            :data-queryRelation="item.queryRelation"
            :data-queryValue="item.queryValue"
            :data-queryComparison="item.queryComparison"
          >
        </div>

        <div
          v-if="(item.fieldControlType=='selectList'||item.fieldControlType=='groupSelectList')&&item.resulteRow"
          class="resulte-row f12"
          :data-field="item.queryfield"
          :data-fieldControlType="item.fieldControlType"
          data-field-val
          :data-selectType="item.selectType"
          :Code="item.Code"
          :TypeValue="item.TypeValue"
          :data-queryType="item.queryType"
          :data-queryFormat="item.queryFormat"
          :data-queryRelation="item.queryRelation"
          :data-queryValue="item.queryValue"
          :data-queryComparison="item.queryComparison"
          :data-lanid="item.datalanid"
          :data-clickObj="item.clickObj"
        ></div>
        <div v-else class="resulte-row f12"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: ["searchData"],
  created: function() {
    // console.log("created");
  },
  mounted: function() {
    // console.log("mounted");
  },
  activated: function() {
    // console.log("activated");
  },
  methods: {}
};
</script>

<style scoped>
.search-rows {
  background: #fff;
  width: 100%;
  overflow: hidden;
}

.item-row {
  padding: 0px 15px;
  box-sizing: border-box;
  line-height: 20px;
  border-bottom: 1px solid beige;
}

.item-row .calcfont {
  color: #cdcdcd;
  position: absolute;
  top: 10px;
  right: -6px;
  z-index: 1;
}

.search-input {
  width: 100%;
  outline: 0 none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-color: transparent;
  display: block;
  margin: 0;
  overflow: hidden;
  position: relative;
  height: 40px;
  line-height: 20px;
  border: 0;
  padding: 10px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 0.25rem;
}

.item-row-flex {
  position: relative;
  align-items: center;
  display: flex;
}

.item-row-flex .row-cell-bd {
  width: 40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-top: 10px;
}

.item-row-flex .row-cell-ft {
  width: 60%;
  position: relative;
  z-index: 2;
  overflow: hidden;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  color: rgb(102, 102, 102);
  text-align: right;
  padding: 10px 10px 0 0;
  min-height: 30px;
}

.item-row-flex .dateTimePicker.row-cell-ft {
  background: none;
  border: none;
}

.item-row-flex input.row-cell-ft {
  height: 30px;
}

.resulte-row {
  word-wrap: break-word;
  padding-bottom: 10px;
  color: #666;
}

.select-list-value {
  color: rgb(102, 102, 102);
  text-align: left;
  line-height: 16px;
}

/* 时间区间选择的样式 */
.boxFlex {
  display: flex;
  padding: 10px 0;
}

.leftText {
  display: inline-block;
  flex: 3;
  margin: auto 0;
}

.startDate {
  flex: 4;
  display: inline-block;
  padding: 0 0.2rem;
  margin: auto 0;
}

.endDate {
  flex: 4;
  display: inline-block;
  padding: 0 0.2rem;
  margin: auto 0;
}

.lianxian {
  margin: auto 0;
}

.startDate input,
.endDate input {
  width: 95%;
  text-align: center;
  /* 去掉input top阴影 */
  outline-style: none;
  outline-width: 0px;
  text-shadow: none;
  -webkit-appearance: none;
  -webkit-user-select: text;
  outline-color: transparent;
  box-shadow: none;
  height: 0.48rem;
  line-height: 0.48rem;
  font-size: 0.24rem;
  text-align: center;
  box-sizing: border-box;
  border: solid 1px #999;
  border-radius: 4px;
}
</style>
