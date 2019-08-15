<template>
<div>
    <header class="header">
        <a @click="back" class="mycalcfont calcfont calc-guanbi1 f16 left" id="back"></a>
        <h1 class="title-text f18">{{title}}</h1>
        <a @click="posting" class="posting-btn right f16 lanText" data-lanid="1000244_发帖"></a>
    </header>

    <div class="content">
        <div class="post-title-div">
            <input v-model="postTitle" class="lanInputPlaceHolder post-title f16" data-lanid="1000298_请输入标题" type="text" maxlength="100"/>
            <div class="word-number f12"><span>{{titleCount}}/100</span></div>
        </div>
        <div class="post-content-div">
            <!-- <textarea class="lanInputPlaceHolder post-content f14" data-lanid="1000368_请输入内容"></textarea> -->
            <div id="postContent" class="lanInputPlaceHolder post-content f14" contenteditable="true" data-lanid="1000368_请输入内容"></div>
        </div>

        <!-- @ -->
        <div class="function">
            <input class="btn-item f18" id="" @click="selectUser" type="button" value="@" />
        </div>

        <div class="post-tag f14">
            <span class="lable lanText" data-lanid="1000302_标签"></span>
            <div class="tag-list" @click="goToTage">
                  <div class="tag-list-div">
                    <span v-for="item in selectTags" :key="item.AutoID" class="tag-item">{{item.Name}}</span>
                  </div>
                  <i class="arrow calcfont calc-you"></i>
            </div>
        </div>
    </div>


    <!-- 选择@用户 -->
    <div v-show="showLayer" class="layer selectList">
        <header class="header sticky">
            <a @click="layerBack" class="calcfont calc-fanhui left"></a>
            <h1 class="mui-title">选择用户</h1>
            <a @click="layerSave" class="calc-gou  calcfont right" id="save"></a>
            <a @click="layerClear" class="calc-shanchu  calcfont right" id="clear"></a>
        </header>

        <div class="search">
            <div class="search-box">
                <span class="calcfont calc-sousuo input-search-icon"></span>
                <input
                  type="text"
                  id="searchInput"
                  class="search-input lanInputPlaceHolder" data-lanid="780_搜索" placeholder=""/>
            </div>
        </div>

        <div class="scroll-box">
              <vue-scroll
                v-show="!noData"
                :showToTop="false"
                :options="{ pullup: false, pulldown: false }"
                :scrollbar="false" ref="scroll">
                    <!-- 列表 -->
                    <div class="dataList checkboxList">
                        <div v-for="item in userList" :key="item.id" class="item-div">
                            <label class="checkbox-label">
                            <input type="checkbox" name="checkbox" :value="item.id" v-model="checkboxValue"/><i class="checkbox"></i><span class="radios f14">{{item.text}}</span>
                        </label>
                        </div>
                    </div>
              </vue-scroll>
              <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
        </div>

        <!-- 全选 -->
        <div class="selectAll">
            <div class="item-div">
                <label class="checkbox-label">
                    <input @click="layerSelectAll" type="checkbox" name="sex"/><i class="checkbox checkAll"></i>
                    <span>all</span>
                </label>
            </div>
        </div>

    </div>

</div>
</template>

<script>
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Nothing from "@/components/customPlugin/Nothing"
export default {
  name:'forumposting',
  components:{
      'vue-scroll':Scroll,
      'nothing': Nothing
  },
  data(){
    return{
        title:'发帖',
        postTitle:'',
        str:'',
        postId:-1, // 帖子id -1：新增；非-1:编辑
        selectTags:[], //用户选择的标签
        sel:{},
        range:{},

        showLayer:false, //是否显示弹出选择@用户
        noData: false, //没数据
        userList: [
          {
            "id": 52,
            "text": "abeyeung楊舒雅"
          }, {
            "id": 558,
            "text": "ada kwong"
          }, {
            "id": 398,
            "text": "Ada Wong"
          }, {
            "id": 410,
            "text": "Alan Foley"
          }, {
            "id": 11,
            "text": "alancheng鄭兆麟"
          }, {
            "id": 560,
            "text": "Alexandre Ly"
          }, {
            "id": 269,
            "text": "alfredho何漢麟"
          }, {
            "id": 32,
            "text": "alikaleung梁芷殷"
          }, {
            "id": 279,
            "text": "AlisaXiong熊嶺"
          }, {
            "id": 335,
            "text": "Alistair"
          }, {
            "id": 420,
            "text": "Amanda Ng"
          }, {
            "id": 40,
            "text": "amilia song"
          }, {
            "id": 19,
            "text": "amy kung"
          }, {
            "id": 229,
            "text": "amysong宋江南"
          }, {
            "id": 300,
            "text": "Andrew Pan"
          }, {
            "id": 110,
            "text": "andyfu付宇宸"
          }, {
            "id": 377,
            "text": "ani tang"
          }, {
            "id": 67,
            "text": "anita tian"
          }, {
            "id": 359,
            "text": "Anita Wong"
          }, {
            "id": 545,
            "text": "anna lu"
          }, {
            "id": 89,
            "text": "annalu盧鑫"
          }, {
            "id": 127,
            "text": "annazhang張爭娜"
          }, {
            "id": 281,
            "text": "AnnaZhao趙二娜"
          }, {
            "id": 228,
            "text": "anniezeng曾文芳"
          }, {
            "id": 78,
            "text": "annyliu劉靜"
          }, {
            "id": 139,
            "text": "aoniruan阮毅文"
          }, {
            "id": 185,
            "text": "aven yu"
          }, {
            "id": 3,
            "text": "barry mok"
          }, {
            "id": 183,
            "text": "belinda li"
          }, {
            "id": 276,
            "text": "BellaZhang張丹華"
          }, {
            "id": 339,
            "text": "BettyChu"
          }, {
            "id": 41,
            "text": "bill hui"
          }, {
            "id": 501,
            "text": "BK_BackAdmin测试"
          }, {
            "id": 440,
            "text": "bobby Nishi"
          }, {
            "id": 375,
            "text": "Brenda Mawson"
          }, {
            "id": 155,
            "text": "brendan hoare"
          }, {
            "id": 277,
            "text": "Brian Connolly"
          }, {
            "id": 373,
            "text": "Brian Tchang"
          }, {
            "id": 212,
            "text": "brightmu穆春光"
          }, {
            "id": 233,
            "text": "brucelee郦韦臻"
          }, {
            "id": 255,
            "text": "btchang"
          }, {
            "id": 342,
            "text": "CandyLeung"
          }, {
            "id": 191,
            "text": "carlostse謝嘉傑"
          }, {
            "id": 331,
            "text": "CarmenYau"
          }, {
            "id": 126,
            "text": "cassiewu吳琳芸"
          }, {
            "id": 267,
            "text": "cbrewer"
          }, {
            "id": 383,
            "text": "CCOtest"
          }, {
            "id": 329,
            "text": "CeciliaLau"
          }, {
            "id": 500,
            "text": "ceshi测试用"
          }, {
            "id": 219,
            "text": "championchang常平"
          }, {
            "id": 434,
            "text": "Chan Kam Lai"
          }, {
            "id": 435,
            "text": "Chan Man Ting"
          }, {
            "id": 451,
            "text": "Chan Mei Yuk"
          }, {
            "id": 409,
            "text": "Chan San Hei Alan"
          }, {
            "id": 419,
            "text": "Chan Wai Shan"
          }, {
            "id": 456,
            "text": "Chan Yick Huen"
          }, {
            "id": 90,
            "text": "charles zhou"
          }, {
            "id": 190,
            "text": "cheeseho何詠姿"
          }, {
            "id": 129,
            "text": "cheryl xiong"
          }, {
            "id": 21,
            "text": "chester wong"
          }, {
            "id": 436,
            "text": "Cheuk Shan Shan"
          }, {
            "id": 130,
            "text": "chirstang唐敏"
          }, {
            "id": 145,
            "text": "christian mccormick"
          }, {
            "id": 318,
            "text": "ChristianMcCormick"
          }, {
            "id": 143,
            "text": "christine koch"
          }, {
            "id": 38,
            "text": "christy wong"
          }, {
            "id": 26,
            "text": "colin tang"
          }, {
            "id": 382,
            "text": "COOTest"
          }, {
            "id": 161,
            "text": "Corley Matt"
          }, {
            "id": 149,
            "text": "craig steinberg"
          }, {
            "id": 316,
            "text": "CraigSteinberg"
          }, {
            "id": 282,
            "text": "crm admin"
          }, {
            "id": 258,
            "text": "cstotts"
          }, {
            "id": 387,
            "text": "Cyrus Wan"
          }, {
            "id": 461,
            "text": "darren lee"
          }, {
            "id": 86,
            "text": "davide li"
          }, {
            "id": 151,
            "text": "davidmorris"
          }, {
            "id": 244,
            "text": "DefmondLin"
          }, {
            "id": 234,
            "text": "deniselin林环丹"
          }, {
            "id": 152,
            "text": "dennis christopher"
          }, {
            "id": 380,
            "text": "Department01"
          }, {
            "id": 381,
            "text": "department02"
          }, {
            "id": 444,
            "text": "Derek Lam"
          }, {
            "id": 345,
            "text": "DerekChan"
          }, {
            "id": 226,
            "text": "dianachen陈旭"
          }, {
            "id": 80,
            "text": "dicyzhang張敏楠"
          }, {
            "id": 257,
            "text": "dlowry"
          }, {
            "id": 321,
            "text": "DoloresMalone"
          }, {
            "id": 273,
            "text": "DouglasTam譚志良"
          }, {
            "id": 70,
            "text": "du lea"
          }, {
            "id": 133,
            "text": "dylanxu許少峰"
          }, {
            "id": 336,
            "text": "EdmundLee"
          }, {
            "id": 222,
            "text": "emilyli李淑燕"
          }, {
            "id": 378,
            "text": "engineertest01"
          }, {
            "id": 379,
            "text": "engineertest02"
          }, {
            "id": 422,
            "text": "Enoch Ling"
          }, {
            "id": 271,
            "text": "eric kong"
          }, {
            "id": 338,
            "text": "EricNg"
          }, {
            "id": 66,
            "text": "ethel lu"
          }, {
            "id": 333,
            "text": "EvaTong"
          }, {
            "id": 220,
            "text": "fabioliang梁晓龙"
          }, {
            "id": 12,
            "text": "fanny kwok"
          }, {
            "id": 122,
            "text": "fionafei費雯麗"
          }, {
            "id": 136,
            "text": "fisherqu曲學洋"
          }, {
            "id": 134,
            "text": "flyliao廖久飛"
          }, {
            "id": 203,
            "text": "Frank huang"
          }, {
            "id": 218,
            "text": "frankli李国峰"
          }, {
            "id": 439,
            "text": "Franky Lai"
          }, {
            "id": 413,
            "text": "Fung Kai Chuen"
          }, {
            "id": 550,
            "text": "gabrielle du"
          }, {
            "id": 240,
            "text": "gangyu虞刚"
          }, {
            "id": 235,
            "text": "gavinwang王志刚"
          }, {
            "id": 453,
            "text": "Geoffrey Dillon Leetch"
          }, {
            "id": 259,
            "text": "ghill"
          }, {
            "id": 327,
            "text": "GinaLai"
          }, {
            "id": 280,
            "text": "GraceSun孫立媛"
          }, {
            "id": 108,
            "text": "gracezhang張旭"
          }, {
            "id": 266,
            "text": "gramdas"
          }, {
            "id": 56,
            "text": "hannahchan陳允祈"
          }, {
            "id": 401,
            "text": "hatty cheung"
          }, {
            "id": 201,
            "text": "helen zhang"
          }, {
            "id": 176,
            "text": "henrymok莫永佳"
          }, {
            "id": 170,
            "text": "hilary tang"
          }, {
            "id": 559,
            "text": "irene lo"
          }, {
            "id": 169,
            "text": "Irene Yeung 楊凱欣"
          }, {
            "id": 91,
            "text": "irene zhang"
          }, {
            "id": 205,
            "text": "irisyang杨帆"
          }, {
            "id": 561,
            "text": "ITAdmin"
          }, {
            "id": 274,
            "text": "IvanLui呂雲浩"
          }, {
            "id": 236,
            "text": "ivanyin尹元"
          }, {
            "id": 79,
            "text": "ivyliu劉會娟"
          }, {
            "id": 27,
            "text": "jack choi"
          }, {
            "id": 14,
            "text": "jackpan潘耀文"
          }, {
            "id": 117,
            "text": "james hou"
          }, {
            "id": 178,
            "text": "jameschan陳浚軒"
          }, {
            "id": 393,
            "text": "Janice Hui"
          }, {
            "id": 82,
            "text": "jasenzhang張傑"
          }, {
            "id": 340,
            "text": "JasmineTsang"
          }, {
            "id": 131,
            "text": "jasonlin林劍"
          }, {
            "id": 230,
            "text": "jasonxiao肖好锋"
          }, {
            "id": 346,
            "text": "JasonZeng"
          }, {
            "id": 365,
            "text": "Jeff Sabo"
          }, {
            "id": 358,
            "text": "Jenny Yip"
          }, {
            "id": 177,
            "text": "jennypow鮑玉珊"
          }, {
            "id": 162,
            "text": "Jens Dunker"
          }, {
            "id": 35,
            "text": "jessica lok"
          }, {
            "id": 81,
            "text": "jessicali李雅倩"
          }, {
            "id": 65,
            "text": "jessie zhao"
          }, {
            "id": 264,
            "text": "jgravois"
          }, {
            "id": 332,
            "text": "JimmyWoo"
          }, {
            "id": 251,
            "text": "john leech"
          }, {
            "id": 17,
            "text": "john wragg"
          }, {
            "id": 74,
            "text": "jose shan"
          }, {
            "id": 256,
            "text": "jsabo"
          }, {
            "id": 272,
            "text": "judy chan"
          }, {
            "id": 64,
            "text": "julia zhu"
          }, {
            "id": 73,
            "text": "julie qi"
          }, {
            "id": 10,
            "text": "kamen au"
          }, {
            "id": 442,
            "text": "Kan Ki Chun Kelvin"
          }, {
            "id": 403,
            "text": "Katherine Siu"
          }, {
            "id": 347,
            "text": "KathyTsang"
          }, {
            "id": 551,
            "text": "kelik wong"
          }, {
            "id": 242,
            "text": "kelvindavidson"
          }, {
            "id": 61,
            "text": "kelvinshing盛寶東"
          }, {
            "id": 59,
            "text": "kelvintsang tsang"
          }, {
            "id": 270,
            "text": "KennethLi李朝俊"
          }, {
            "id": 252,
            "text": "keri"
          }, {
            "id": 231,
            "text": "keriwright"
          }, {
            "id": 135,
            "text": "kikizhu朱瑛"
          }, {
            "id": 83,
            "text": "kittyyu於菁菁"
          }, {
            "id": 261,
            "text": "kwilliams"
          }, {
            "id": 428,
            "text": "Kwong Hei Man"
          }, {
            "id": 445,
            "text": "Law Ka Ho"
          }, {
            "id": 394,
            "text": "Lee Lai San"
          }, {
            "id": 447,
            "text": "Lee Whelan"
          }, {
            "id": 371,
            "text": "LegalteamTest"
          }, {
            "id": 71,
            "text": "leon shen"
          }, {
            "id": 216,
            "text": "leozhang張國明"
          }, {
            "id": 448,
            "text": "Leung Chun Yin"
          }, {
            "id": 446,
            "text": "lim adeline"
          }, {
            "id": 554,
            "text": "lina chang"
          }, {
            "id": 53,
            "text": "lindalam林嘉燕"
          }, {
            "id": 455,
            "text": "Ling Ngai"
          }, {
            "id": 417,
            "text": "Ling Siu Man Louise"
          }, {
            "id": 69,
            "text": "lisa jiang"
          }, {
            "id": 237,
            "text": "lisalai来依莎"
          }, {
            "id": 215,
            "text": "liuyu刘宇"
          }, {
            "id": 141,
            "text": "liying李營"
          }, {
            "id": 202,
            "text": "lizhimin李志敏"
          }, {
            "id": 418,
            "text": "Lo Chong Shing"
          }, {
            "id": 416,
            "text": "Lo Sze Wan"
          }, {
            "id": 159,
            "text": "lorrainemurphy"
          }, {
            "id": 137,
            "text": "luoqingteng羅慶騰"
          }, {
            "id": 248,
            "text": "Lvkun吕昆"
          }, {
            "id": 208,
            "text": "lynnsun孙成林"
          }, {
            "id": 363,
            "text": "Magdalena Szostok"
          }, {
            "id": 72,
            "text": "maggie ma"
          }, {
            "id": 262,
            "text": "mbrady"
          }, {
            "id": 87,
            "text": "melody zhang"
          }, {
            "id": 364,
            "text": "Michael Cairo"
          }, {
            "id": 227,
            "text": "michael zhou"
          }, {
            "id": 225,
            "text": "michaelzhao赵广毅"
          }, {
            "id": 144,
            "text": "michela cera"
          }, {
            "id": 366,
            "text": "Mike Kenney"
          }, {
            "id": 542,
            "text": "mike poon"
          }, {
            "id": 211,
            "text": "mikeli李春晖"
          }, {
            "id": 194,
            "text": "mingchow周丽明"
          }, {
            "id": 42,
            "text": "mirandawong王雅蘋"
          }, {
            "id": 263,
            "text": "mkenney"
          }, {
            "id": 223,
            "text": "nancybai白晓倩"
          }, {
            "id": 250,
            "text": "nancyzhuang莊林"
          }, {
            "id": 396,
            "text": "Nathan Chow"
          }, {
            "id": 441,
            "text": "Ng Mun Ling Olivia"
          }, {
            "id": 146,
            "text": "nicolas leopold"
          }, {
            "id": 148,
            "text": "nicolas metzger"
          }, {
            "id": 319,
            "text": "NicolasLeopold"
          }, {
            "id": 320,
            "text": "NicolasMetzger"
          }, {
            "id": 24,
            "text": "niel liebenberg"
          }, {
            "id": 88,
            "text": "nolan pan"
          }, {
            "id": 167,
            "text": "oscar qiu"
          }, {
            "id": 356,
            "text": "overseatest"
          }, {
            "id": 357,
            "text": "overseatest2"
          }, {
            "id": 140,
            "text": "owenye葉國棟"
          }, {
            "id": 23,
            "text": "patrick moh"
          }, {
            "id": 421,
            "text": "Patrick Neo-M"
          }, {
            "id": 154,
            "text": "patrick trant"
          }, {
            "id": 349,
            "text": "PatrickNeo"
          }, {
            "id": 60,
            "text": "patricksin冼子恩"
          }, {
            "id": 209,
            "text": "pearlli李惠萍"
          }, {
            "id": 438,
            "text": "peng thomas"
          }, {
            "id": 114,
            "text": "peter xiong"
          }, {
            "id": 351,
            "text": "petralai"
          }, {
            "id": 553,
            "text": "petrina lam"
          }, {
            "id": 174,
            "text": "ph chan"
          }, {
            "id": 13,
            "text": "phillip siu"
          }, {
            "id": 355,
            "text": "PhullaraWong"
          }, {
            "id": 221,
            "text": "piaolongjie朴龙杰"
          }, {
            "id": 5,
            "text": "pitney tang"
          }, {
            "id": 51,
            "text": "pollytang鄧寶莉"
          }, {
            "id": 370,
            "text": "PricingteamTest"
          }, {
            "id": 343,
            "text": "PrisinnaLok"
          }, {
            "id": 367,
            "text": "Projectpresenter"
          }, {
            "id": 557,
            "text": "qin martin"
          }, {
            "id": 111,
            "text": "qing fang"
          }, {
            "id": 147,
            "text": "reinhard brissier"
          }, {
            "id": 330,
            "text": "ReymondChung"
          }, {
            "id": 552,
            "text": "richard luo"
          }, {
            "id": 549,
            "text": "richard rong"
          }, {
            "id": 460,
            "text": "richard spaulding"
          }, {
            "id": 556,
            "text": "ridzuan ahmad"
          }, {
            "id": 171,
            "text": "ringoyip叶文达"
          }, {
            "id": 199,
            "text": "robertcai蔡逢春"
          }, {
            "id": 118,
            "text": "rush li"
          }, {
            "id": 543,
            "text": "Russell Hubbard"
          }, {
            "id": 341,
            "text": "RussellHubbard"
          }, {
            "id": 153,
            "text": "sally tang"
          }, {
            "id": 245,
            "text": "samuelchow"
          }, {
            "id": 175,
            "text": "samuelng吳大鵬"
          }, {
            "id": 360,
            "text": "samueltpng"
          }, {
            "id": 350,
            "text": "SarahYan"
          }, {
            "id": 449,
            "text": "satrina ip"
          }, {
            "id": 156,
            "text": "sean farnan"
          }, {
            "id": 306,
            "text": "secretary"
          }, {
            "id": 253,
            "text": "shawn"
          }, {
            "id": 232,
            "text": "shawnkling"
          }, {
            "id": 22,
            "text": "sherry han"
          }, {
            "id": 116,
            "text": "shining shen"
          }, {
            "id": 397,
            "text": "Shirley Yip"
          }, {
            "id": 15,
            "text": "shuman kong"
          }, {
            "id": 334,
            "text": "SimonLee"
          }, {
            "id": 210,
            "text": "simonzhao赵欣明"
          }, {
            "id": 268,
            "text": "sleathers"
          }, {
            "id": 132,
            "text": "smilezhou周龙矩"
          }, {
            "id": 317,
            "text": "StephaneDepeyre"
          }, {
            "id": 109,
            "text": "summerzhang張智慧"
          }, {
            "id": 429,
            "text": "Tan Wong"
          }, {
            "id": 369,
            "text": "TaxteamTest"
          }, {
            "id": 458,
            "text": "tba"
          }, {
            "id": 368,
            "text": "TechnicalteamTest"
          }, {
            "id": 180,
            "text": "tellywoo胡思穎"
          }, {
            "id": 544,
            "text": "teresa chan"
          }, {
            "id": 18,
            "text": "terry choi"
          }, {
            "id": 521,
            "text": "test123"
          }, {
            "id": 541,
            "text": "test123456"
          }, {
            "id": 173,
            "text": "thomas tang"
          }, {
            "id": 376,
            "text": "Tim Leo"
          }, {
            "id": 241,
            "text": "timzhang张铭"
          }, {
            "id": 25,
            "text": "tina zhang"
          }, {
            "id": 165,
            "text": "Tina 吴亦玲"
          }, {
            "id": 62,
            "text": "tkshing謝國成"
          }, {
            "id": 181,
            "text": "tomtsui崔文謙"
          }, {
            "id": 348,
            "text": "TomWong"
          }, {
            "id": 166,
            "text": "Tony LI"
          }, {
            "id": 112,
            "text": "tony yang"
          }, {
            "id": 57,
            "text": "tramylee李翠微"
          }, {
            "id": 450,
            "text": "Tse Chi Wai"
          }, {
            "id": 249,
            "text": "ulricasun孫偉"
          }, {
            "id": 8,
            "text": "vanessalau劉澧延"
          }, {
            "id": 9,
            "text": "vera leung"
          }, {
            "id": 459,
            "text": "victor chow"
          }, {
            "id": 326,
            "text": "vikkilaw"
          }, {
            "id": 123,
            "text": "vincent xu"
          }, {
            "id": 275,
            "text": "VivianLam林向欣"
          }, {
            "id": 207,
            "text": "vivianli李威"
          }, {
            "id": 213,
            "text": "vivienliu刘曦"
          }, {
            "id": 214,
            "text": "wangbinhong王滨洪"
          }, {
            "id": 84,
            "text": "wangfei王飛"
          }, {
            "id": 224,
            "text": "wangxin王鑫"
          }, {
            "id": 85,
            "text": "wangzheng王征"
          }, {
            "id": 254,
            "text": "wdavenport"
          }, {
            "id": 314,
            "text": "WendyJi"
          }, {
            "id": 20,
            "text": "william lim"
          }, {
            "id": 68,
            "text": "william qi"
          }, {
            "id": 204,
            "text": "williamli李育澤"
          }, {
            "id": 16,
            "text": "wilson lau"
          }, {
            "id": 278,
            "text": "WinkiLi李婉琦"
          }, {
            "id": 4,
            "text": "winnie liu"
          }, {
            "id": 36,
            "text": "winnie lo"
          }, {
            "id": 239,
            "text": "winniewhlo勞詠嫻"
          }, {
            "id": 430,
            "text": "Wong Wai Ying"
          }, {
            "id": 260,
            "text": "wsmith"
          }, {
            "id": 412,
            "text": "Wu Kun"
          }, {
            "id": 443,
            "text": "Wu Yuen Ying"
          }, {
            "id": 138,
            "text": "wubiao吳彪"
          }, {
            "id": 142,
            "text": "wxduan段文秀"
          }, {
            "id": 172,
            "text": "wyniesiu蕭詠茵"
          }, {
            "id": 457,
            "text": "Yeung Kwan Yee (Gladys)"
          }, {
            "id": 200,
            "text": "yu alvin"
          }, {
            "id": 374,
            "text": "Yu WANG"
          }, {
            "id": 555,
            "text": "yu wang"
          }, {
            "id": 247,
            "text": "Yuanzhao趙遠"
          }, {
            "id": 217,
            "text": "zanglihua臧丽华"
          }, {
            "id": 113,
            "text": "zhang eliza"
          }, {
            "id": 206,
            "text": "zhangyue"
          }, {
            "id": 385,
            "text": "Zhao Jin"
          }, {
            "id": 414,
            "text": "Zhu Haoyu"
          }, {
            "id": 128,
            "text": "zinan liu"
          }, {
            "id": 150,
            "text": "zoe lafforgue"
          }, {
            "id": 322,
            "text": "ZoeLafforgue"
          }, {
            "id": 115,
            "text": "zork zhu"
          }, {
            "id": 238,
            "text": "zzyhzcnc张志源"
          }, {
            "id": 425,
            "text": "白萌baimeng"
          }, {
            "id": 287,
            "text": "蔡达英jackychoi"
          }, {
            "id": 352,
            "text": "曹思平tonycao"
          }, {
            "id": 310,
            "text": "测试财务demo3"
          }, {
            "id": 311,
            "text": "测试出纳demo4"
          }, {
            "id": 308,
            "text": "测试账户demo"
          }, {
            "id": 309,
            "text": "测试主管demo2"
          }, {
            "id": 400,
            "text": "陈爱珠wendychan"
          }, {
            "id": 353,
            "text": "陈虹志chenhongzhi"
          }, {
            "id": 291,
            "text": "陈晶ailsachen"
          }, {
            "id": 454,
            "text": "陈茜子nancychan"
          }, {
            "id": 424,
            "text": "丁博识dingboshi"
          }, {
            "id": 423,
            "text": "丁之媛kellyding"
          }, {
            "id": 384,
            "text": "董欢echodong"
          }, {
            "id": 289,
            "text": "杜泳儀wingto"
          }, {
            "id": 354,
            "text": "段文秀wenxiuduan"
          }, {
            "id": 283,
            "text": "段晓革duanxg"
          }, {
            "id": 312,
            "text": "高佩珠graceko"
          }, {
            "id": 392,
            "text": "郭永红lisaguo"
          }, {
            "id": 399,
            "text": "韩娇jessiehan"
          }, {
            "id": 284,
            "text": "黄淑瑜joanwong"
          }, {
            "id": 452,
            "text": "黄文莉huangwenli"
          }, {
            "id": 315,
            "text": "黄晓鹏paihuang"
          }, {
            "id": 411,
            "text": "黄云lemonhuang"
          }, {
            "id": 388,
            "text": "黄振国calvinhuang"
          }, {
            "id": 433,
            "text": "姜惠君huijunjiang"
          }, {
            "id": 294,
            "text": "矫铭martinjiao"
          }, {
            "id": 415,
            "text": "金临丰linfengjin"
          }, {
            "id": 288,
            "text": "赖洋茵yanelai"
          }, {
            "id": 324,
            "text": "雷文娟lillianlei"
          }, {
            "id": 313,
            "text": "黎靖中brucelai"
          }, {
            "id": 325,
            "text": "李丽吟peggylee"
          }, {
            "id": 395,
            "text": "李平kingli"
          }, {
            "id": 305,
            "text": "李妍kellyli"
          }, {
            "id": 302,
            "text": "李子农zinongli"
          }, {
            "id": 303,
            "text": "梁婧如emilyliang"
          }, {
            "id": 344,
            "text": "梁穎lillianliang"
          }, {
            "id": 295,
            "text": "刘红liuhong"
          }, {
            "id": 307,
            "text": "刘洪朴liuhongpu"
          }, {
            "id": 292,
            "text": "刘慧tracyliu"
          }, {
            "id": 405,
            "text": "刘庆伟alexliu"
          }, {
            "id": 285,
            "text": "刘秀娟alicelau"
          }, {
            "id": 299,
            "text": "劉安麗liuanli"
          }, {
            "id": 408,
            "text": "罗辰angelaluo"
          }, {
            "id": 297,
            "text": "马宁maning"
          }, {
            "id": 301,
            "text": "馬鐘文albertma"
          }, {
            "id": 391,
            "text": "宁磊ninglei"
          }, {
            "id": 298,
            "text": "彭建梅skypeng"
          }, {
            "id": 243,
            "text": "裘 佳"
          }, {
            "id": 431,
            "text": "沈泉samshen"
          }, {
            "id": 426,
            "text": "孙江吉sunjiangji"
          }, {
            "id": 427,
            "text": "陶继苹taojiping"
          }, {
            "id": 328,
            "text": "田琳annatian"
          }, {
            "id": 337,
            "text": "田明jackytian"
          }, {
            "id": 407,
            "text": "王跃英kathywang"
          }, {
            "id": 286,
            "text": "吴家耀jerryng"
          }, {
            "id": 296,
            "text": "蕭志鵬paulsiu"
          }, {
            "id": 389,
            "text": "杨明youngyang"
          }, {
            "id": 323,
            "text": "杨笑梅helenyang"
          }, {
            "id": 402,
            "text": "杨悦yangyue"
          }, {
            "id": 304,
            "text": "袁媛verayuan"
          }, {
            "id": 290,
            "text": "曾桂芬natalietsang"
          }, {
            "id": 406,
            "text": "张琦qizhang"
          }, {
            "id": 432,
            "text": "张文宝wenbaozhang"
          }, {
            "id": 437,
            "text": "张旭densonzhang"
          }, {
            "id": 390,
            "text": "张贞brucezhang"
          }, {
            "id": 386,
            "text": "赵源edwardzhao"
          }, {
            "id": 246,
            "text": "正 王"
          }, {
            "id": 362,
            "text": "周朝芳elinazhou"
          }, {
            "id": 361,
            "text": "周紧zhoujin"
          }, {
            "id": 404,
            "text": "周祥静helenzhou"
          }, {
            "id": 293,
            "text": "朱瑾karenzhu"
          }
        ], //存放用户列表数据
        checkboxValue: [],//选择@的用户
    }
  },
  computed: {
      titleCount:function(){
          var _self = this;
          return _self.postTitle.length;
      }
  },
  created:function(){
      var _self = this;
      _self.$store.commit('SET_ITEM', 'forumposting');

      if(!tool.isNullOrEmptyObject(_self.$route.params.id)){
          _self.postId = _self.$route.params.id;
      }

      if( _self.postId != -1){
          _self.getPostData();
      }

  },
  mounted:function(){
    var _self = this;
    lanTool.updateLanVersion();
    //监听搜索
    _self.search();
  },
  activated:function(){
        var _self = this;

        //处理选择标签后返回来的逻辑
        _self.selectTags = _self.$store.state.selectTags || [];

        console.log(_self.selectTags);
        //清空store中 selectTags 变量
        // _self.$store.commit('SET_SELECT_TAGS');

  },
  methods:{
      //在光标处插入@用户
      insertHtmlAtCaret:function(html) {
          var _self = this;
          /*
          var sel, range;
          // document.getElementById('postContent').focus();
          if (window.getSelection) {
              // IE9 and non-IE
              sel = window.getSelection();
              if (sel.getRangeAt && sel.rangeCount) {
                  range = sel.getRangeAt(0);
                  */
                  _self.range.deleteContents();
                  // Range.createContextualFragment() would be useful here but is
                  // non-standard and not supported in all browsers (IE9, for one)
                  var el = document.createElement("div");
                  el.innerHTML = html;
                  var frag = document.createDocumentFragment(), node, lastNode;
                  while ((node = el.firstChild)) {
                      lastNode = frag.appendChild(node);
                  }
                  _self.range.insertNode(frag);
                  // Preserve the selection
                  if (lastNode) {
                      _self.range = _self.range.cloneRange();
                      _self.range.setStartAfter(lastNode);
                      _self.range.collapse(true);
                      _self.sel.removeAllRanges();
                      _self.sel.addRange(_self.range);
                  }
                  /*
              }
          } else if (document.selection && document.selection.type != "Control") {
              // IE < 9
              document.selection.createRange().pasteHTML(html);
          }
          */
      },

      //返回上一页
      back:function(){
          this.$router.back(-1);
      },
      //发帖
      posting:function(){
        var _self = this;
        //获取内容
        var content = $('#postContent').text();
        var htmlContent = $('#postContent').html();
        if(tool.isNullOrEmptyObject(content) || tool.isNullOrEmptyObject(htmlContent)){

            return;
        }


      },
      //@用户
      selectUser:function(){
          var _self = this;
          document.getElementById('postContent').focus();
          var sel, range;
          if (window.getSelection) {
              // IE9 and non-IE
              sel = window.getSelection();
              if (sel.getRangeAt && sel.rangeCount) {
                  range = sel.getRangeAt(0);
                  //保存到全局中
                  _self.range = range;
                  _self.sel = sel;

                 //显示弹出
                 _self.showLayer = true;
              }
          }else if (document.selection && document.selection.type != "Control") {
              // IE < 9
              document.selection.createRange().pasteHTML(html);
          }
      },

      //去选标签
      goToTage:function(){
          var _self = this;
          var parameter = {
                'selectTags': _self.selectTags
              };
          _self.$router.push({
            name:'selecttag',
            params:parameter
          });

      },

      //若是从修改进来，获取帖子数据
      getPostData:function(){

      },

      //弹层的返回按钮事件
      layerBack:function(){
          var _self = this;
          _self.showLayer = false;
          _self.checkboxValue = [];
      },
      //弹层的保存
      layerSave:function(){
          var _self = this;
          //组装插入编辑框的str
          var str = '';
          $.each(_self.userList, function (index, item) {
              if( _self.checkboxValue.indexOf(item.id) != -1){
                  str += '<a class="targetUserName" data-username="'+ item.text +'" contenteditable="false" style="color:#048ec6;">@'+ item.text +'</a>'
              }
          })
          _self.insertHtmlAtCaret(str);
          _self.showLayer = false;
          _self.checkboxValue = [];
      },
      //弹层的清楚动作
      layerClear:function(){
          var _self = this;
          _self.checkboxValue = [];
      },
      //弹层中的选择全部
      layerSelectAll:function(e){
          var self = this;
          var el = e.target,
              t = $(e.target).is(":checked");
          if (t) {
              $.each(self.userList, function (index, item) {
                  self.checkboxValue.push(item.id);
              })
          } else {
              self.checkboxValue = [];
          }
      },
      //弹层中的筛选
      search: function () {
          var _self = this;
          _self.$nextTick(function () {
              var listDom = $('.dataList');
              $('#searchInput').unbind().bind('input', function () {
                  var queryStr = $.trim($(this).val());
                  if (queryStr === '') {
                      listDom.find('div.item-div').show();
                  } else {
                      listDom.find('div.item-div').hide().filter(":lowerCaseContains('" + queryStr + "')").show();
                  }
              })
          });
      }

  },
  beforeRouteLeave:function(to, from, next){
    if(to.name == 'forumlist'){
        this.$store.commit('REMOVE_ITEM', 'forumposting');
    }
    next();
  }
}
</script>

<style scoped>
.mycalcfont {
  font-size: 0.48rem;
  text-align: center;
  padding: 0.2rem 10px;
  position: relative;
  z-index: 20;
  display: inline-block;
  text-decoration: none;
  line-height: 1;
  margin: 4px 0 0 4px;
}
.header{
  position: fixed;
  top:0;left:0;right:0;
  background: #fff;
}
.header .title-text{
    right: 40px;
    left: 40px;
    display: inline-block;
    overflow: hidden;
    width: auto;
    margin: 0;
    text-overflow: ellipsis;
    position: absolute;
    padding: 0;
    text-align: center;
    white-space: nowrap;
    font-weight: 400;
    line-height: 0.88rem;
}
.header .posting-btn{
  line-height:0.88rem;
  padding:0 10px;
  color:#7ebbff;
}

.content{
  padding:0.88rem 15px 0 15px;
}
.post-title-div{position: relative;}
.content .post-title{
  border:none;
  outline: none;
  line-height: 16px;
  padding:10px 50px 10px 0;
  width: 100%;
  box-sizing: border-box;
}
.content .post-title::-webkit-input-placeholder{
    color:lightgrey;
}
.content .word-number{
  display: inline-block;
  position: absolute;
  right:0;
  bottom:15px;
  color:#ccc;
  line-height: 14px;
  height: 14px;
  overflow: hidden;
}
.post-content-div{
  padding-top:5px;
}
.post-content{
  border:none;
  outline: none;
  line-height:1.4;
  width: 100%;
  height:4rem;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  /* word-break:break-all; */
  word-break: normal;
  word-wrap: break-word;
  /* word-break:break-all; */
}
.post-content:empty::before{ color:lightgrey; content:attr(placeholder); }
.content .function{
  padding-top:20px;
}
.content .function .btn-item{
  background:#fff;outline: none;border:none;color:#ccc;
}
.post-tag{
  padding:20px 0 10px;
  display: flex;
}
.post-tag .lable{
  line-height: 32px;
  width: 0.8rem;
}
.post-tag .tag-list{
  flex: 1;
  padding:0 0px 5px 5px;
  min-height: 22px;
  position: relative;
  border-bottom:1px solid #ccc;
  /* border-radius: 5px; */
  display: flex;
  align-items: center;
}
.post-tag .tag-list .tag-list-div{flex: 1;}
.post-tag .tag-list .arrow{
  color:#ccc;
}
.post-tag .tag-item{
  padding: 2px 5px;
  background: #7ebbff;
  border-radius: 3px;
  margin: 5px 5px 0 0;
  display: inline-block;
  color:#fff;

}

/*弹出层 style*/
.layer{
  position:fixed;top:0;left:0;bottom:0;right:0;
  background: #fff;
  /* display: none; */
}
/*页面头部style*/
.layer header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  line-height: 0.2rem;
  background: #f8f2dc;
}
.layer .mui-title {
    display: inline-block;
    overflow: hidden;
    width: auto;
    max-width: 72%;
    font-size: 0.34rem;
    margin: 0 0 0 -10px;
    text-overflow: ellipsis;
    padding: 0;
    text-align: center;
    white-space: nowrap;
    line-height: 0.88rem;
}
.layer .calcfont {
    font-size: 0.48rem;
    text-align: center;
    padding: 0.2rem 10px;
    position: relative;
    z-index: 20;
    display: inline-block;
    text-decoration: none;
    line-height: 1;
    margin-left:-10px;
}
/* .selectList .header .calcfont{margin-left:-10px;} */
.layer .header .calc-fanhui {margin-left:0;}
.layer header .mui-title,.selectList header a {
    color: #333;font-weight: 400;
}
/*搜索框style*/
.layer .search {
    padding:10px 5px 5px;
    position: fixed;top:0.88rem;left:0;right:0;
}
.layer .search-box{
    line-height: 34px;
    position: relative;
    background: #f2f2f2;
}
.layer .search-input {
    padding: 10px 15px 10px 32px;
    box-sizing: border-box;
    height: 34px;
    border: 0;
    font-size: 16px;
    width: 100%;
    font-size: 14px;
    color: #999;
    line-height: 14px;
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    background: #f2f2f2;
    border-radius: 8px;
}
.layer .search .calc-sousuo {
    padding: 0;
    color: #333;
    position: absolute;
    left:5px;top:6px;
    width:23px;height: 23px;text-align: center;line-height: 23px;
    margin-left: 0;
}
/*滚动列表*/
.layer .scroll-box{
  position: fixed;
  left:0;right:0;bottom:50px;top:calc(0.88rem + 50px);
}
.scroll-box .item-div {
    padding: 10px;
    border-bottom: solid 1px beige;
}
.scroll-box .item-div label{display:block;line-height:40px;position: relative;margin:-10px 0;}
.scroll-box .item-div .checkbox-label .checkbox{position: absolute;left:0;top:12px;}
.scroll-box .item-div span {
    padding:10px 0  10px 26px;display: block;word-wrap : break-word;line-height: 20px;
}
/*全选*/
.layer .selectAll{
	position: fixed;
	left: 0;
	right: 0;
	height: 50px;
  line-height: 50px;
  padding-left:10px;
	bottom: 0;
  z-index: 2;
  background-color: rgb(245,245,245);
  color: gray;
}
.layer .selectAll .checkbox-label{position: relative;}
.layer .selectAll span{padding-left:26px;}
.layer .selectAll .item-div .checkbox-label .checkbox{
    top:2px;
    position: absolute;
    left: 0;
}

</style>
