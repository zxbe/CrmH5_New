<template>
<div>
    <header class="mui-bar mui-bar-nav">
        <a @click="back" class="calcfont calc-fanhui left" id="back"></a>
        <div class="searchDiv"><input class="searchText" type="search" value=""></div>
        <div class="headLeftIconDiv"> 
            <a @click="selectDropDownType" class="dropDownBtn calcfont calc-xiala"></a>
            <a @click="search" class="searchBtn calcfont calc-shaixuan2"></a>
        </div>
          <div v-show="isShowdropDown" class="dropDownList">
                <a @click="selectTitleOrTag($event)" data-type="Other" class="selected lanText" data-lanid="1000303_标题和内容"></a>
                <a @click="selectTitleOrTag($event)" data-type="Tag" class="lanText" data-lanid="1000302_标签"></a>
            </div>
    </header>
   
    <div class="searchSelectDiv">
         
        <div class="selectFilter">
            <a @click="filterDropDown($event)" class="filterBlock">
                <span class="filterText lanText" data-lanid="1000213_所有问题">All Questions</span>
                <span class="zen-selectArrow"></span>
            </a>
            <ul v-show="isShowFilter" class="feedFilterby">
                <li ><span class="zen-visualization iconfont icon-dagou1"></span><a @click="selectFiltertype($event)" data-fieldval="AllQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT selected lanText" data-lanid="1000213_所有问题"></a></li>
                <li ><span class="zen-visualization iconfont icon-dagou1"></span><a @click="selectFiltertype($event)" data-fieldval="MineQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT lanText" data-lanid="1000214_我的问题"></a></li>
                <li ><span class="zen-visualization iconfont icon-dagou1"></span><a @click="selectFiltertype($event)" data-fieldval="UnansweredQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT lanText" data-lanid="1000215_未答复的问题"></a></li>
                <li ><span class="zen-visualization iconfont icon-dagou1"></span><a @click="selectFiltertype($event)" data-fieldval="UnsolvedQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT lanText" data-lanid="1000216_未解决的问题"></a></li>
                <li ><span class="zen-visualization iconfont icon-dagou1"></span><a @click="selectFiltertype($event)" data-fieldval="ResolvedQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT lanText" data-lanid="1000217_已解决的问题"></a></li>
                <li ><span class="zen-visualization iconfont icon-dagou1"></span><a @click="selectFiltertype($event)" data-fieldval="InProgressQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT lanText" data-lanid="1000218_正在处理的问题"></a></li>
                <li ><span class="zen-visualization iconfont icon-dagou1"></span><a @click="selectFiltertype($event)" data-fieldval="ClosedQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT lanText" data-lanid="1000219_已关闭的问题"></a></li>
            </ul>
        </div>
        <div class="selectSort">
            <a @click="sortDropDown($event)" class="sortBlock">
                <span class="sortText lanText" data-lanid="1000222_发布日期"></span>
                <span class="zen-selectArrow"></span>
            </a>
            <ul v-show="isShowSort" class="feedsortby">
                <li class="zen-checked"><span class="zen-visualization iconfont icon-dagou1"></span><a @click="selectSorttype($event)" data-fieldval="DatePosted" data-group="SortGroup" href="###" class="cxfeedtype cxRECENT selected lanText" data-lanid="1000222_发布日期"></a></li>
                <li><span class="zen-visualization iconfont icon-dagou1"></span><a @click="selectSorttype($event)" data-fieldval="RecentActivity" data-group="SortGroup" href="###" class="cxfeedtype cxRECENT lanText" data-lanid="1000223_近期活动"></a></li>
                <li><span class="zen-visualization iconfont icon-dagou1"></span><a @click="selectSorttype($event)" data-fieldval="MostPopular" data-group="SortGroup" href="###" class="cxfeedtype cxRECENT lanText" data-lanid="1000224_最受欢迎"></a></li>
            </ul>
        </div>
    </div>
    <div class="list">

        <vue-scroll v-show="!noData" :showToTop="true" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">

             <div v-for="item in listData" :key="item.AutoID" class="list-item">
                    <div @click="goToInfo(item.AutoID)" class="title f16">{{item.Theme}}</div>
                    <div @click="goToInfo(item.AutoID)" class="content f14">{{item.Content}}</div>
                    <div class="feeditemtag f12">
                        <span>web</span><span>JS</span><span>C#</span><span>Vue</span>
                    </div>
                    <div class="info f12">
                        <span class="info-state">Unresolved</span>
                        <span class="info-state">In Progress</span>
                    </div>
                    <div class="info f12">
                        <img class="img" src="../../assets/images/forum/default_user_img.png"/>
                        <span class="name">{{item.UserName}}</span>
                        <div class="hand">
                            <span class="calcfont calc-zan1"></span><span>{{item.LikeCount}}</span>
                        </div>
                        <div class="hand">
                            <span class="calcfont calc-cai"></span><span>{{item.DislikeCount}}</span>
                        </div>
                        <div class="replies">
                            <span class="lanText" data-lanid="1000350_答复"></span><span>2</span>
                        </div>
                        <span class="time">{{item.PostTime|MeetingTimeFormat}}</span>
                    </div>

                </div>
        </vue-scroll>
        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
    </div>
</div>
</template>

<script>
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Nothing from "@/components/customPlugin/Nothing"
export default {
    components: {
        'vue-scroll': Scroll,
        'nothing': Nothing
    },
    data() {
        return {
            noData: false, //没数据
            pageSize: 10, //一页显示多少记录
            pageNum: 1, //当前页码
            isShowdropDown:false,//隐藏内容和标签的下拉列表
            isShowFilter: false, //隐藏筛选的下拉列表
            isShowSort: false, //隐藏排序的下拉列表
            listData: [{
                    "AutoID": "3",
                    "TopicID": 10,
                    "TopicName": "NodeJS",
                    "TagName": "Web,JS,NodeJS",
                    "UserName": "aoniruan阮毅文",
                    "PostTime": "2019-08-01T17:16:00",
                    "Theme": "想学Node.js，stream先有必要搞清楚",
                    "Content": "什么是stream定义流的英文stream，流（Stream）是一个抽象的数据接口，Node.js中很多对象都实现了流，流是EventEmitter对象的一个实例，总之它是会冒数据（以 Buffer 为单位），或者能够吸收数据的东西，它的本质就是让数据流动起来。 可能看一张图会更直观：注意：stream不是node.js独有的概念，而是一个操作系统最基本的操作方式，只不过node.js有API支持这种操作方式。linux命令的|就是stream。为什么要学习stream视频播放例子@dylanxu 小伙伴们肯定都在线看过电影，对比定义中的图-水桶管道流转图，source就是服务器端的视频，dest就是你自己的播放器(或者浏览器中的flash和h5 video)。大家想一下，看电影的方式就如同上面的图管道换水一样，一点点从服务端将视频流动到本地播放器，一边流动一边播放，最后流动完了也就播放完了。说明：视频播放的这个例子，如果我们不使用管道和流动的方式，直接先从服务端加载完视频文件，然后再播放。会造成很多问题因内存占有太多而导致系统卡顿或者崩溃因为我们的网速 内存 cpu运算速度都是有限的，而且还要有多个程序共享使用，一个视频文件加载完可能有几个g那么大。读取大文件data的例子有一个这样的需求，想要读取大文件data的例子使用文件读取const http = require('http'); const fs = require('fs'); const path = require('path'); const server = http.createServer(function (req, res) {     const fileName = path.resolve(__dirname, 'data.txt');     fs.readFile(fileName, function (err, data) {         res.end(data);     }); }); server.listen(8000); 复制代码使用文件读取这段代码语法上并没有什么问题，但是如果data.txt文件非常大的话，到了几百M，在响应大量用户并发请求的时候，程序可能会消耗大量的内存，这样可能造成用户连接缓慢的问题。而且并发请求过大的话，服务器内存开销也会很大。这时候我们来看一下用stream实现。const http = require('http'); const fs = require('fs'); const path = require('path'); const server = http.createServer(function (req, res) {     const fileName = path.resolve(__dirname, 'data.txt');     let stream = fs.createReadStream(fileName);  // 这一行有改动     stream.pipe(res); // 这一行有改动 }); server.listen(8000); 复制代码使用stream就可以不需要把文件全部读取了再返回，而是一边读取一边返回，数据通过管道流动给客户端，真的减轻了服务器的压力。",
                    "Status": "In Progress",
                    "Status_ID": 70,
                    "Result": "Unresolved",
                    "Result_ID": 74,
                    "ReplyCount": 3,
                    "LikeCount": 1,
                    "IsCurrentUserLike": "0",
                    "DislikeCount": 0,
                    "IsCurrentUserDislike": "0"
                },
                {
                    "AutoID": "102",
                    "TopicID": 7,
                    "TopicName": "Web",
                    "TagName": "Web",
                    "UserName": "aoniruan阮毅文",
                    "PostTime": "2019-08-01T17:15:00",
                    "Theme": "【Vue原理】Computed - 源码版",
                    "Content": "如果你觉得排版难看，请点击 下面链接 或者 拉到 下面关注公众号也可以吧【Vue原理】Computed - 源码版@dylanxu今天要记录 computed 的源码，有时候想，理解不就好了吗，为什么要记录一遍源码。现在终于想通了过了一段时间之后，你就会忘记你的所谓理解是怎么来的“哎，为什么会这么做，关系为什么是这样，我c…”于是，记录并简化源码，就有助我们迅速找到根源，解决我们的疑惑，还能加强我们的理解@alancheng好吧嗯，这篇文章很长很详细哦，做好阅读的准备，唔该我们重点说明，几个问题的源码实现",
                    "Status": "In Progress",
                    "Status_ID": 70,
                    "Result": "Unresolved",
                    "Result_ID": 74,
                    "ReplyCount": 0,
                    "LikeCount": 0,
                    "IsCurrentUserLike": "0",
                    "DislikeCount": 0,
                    "IsCurrentUserDislike": "0"
                },
                {
                    "AutoID": "96",
                    "TopicID": 15,
                    "TopicName": "前端",
                    "TagName": "Web,JS,前端",
                    "UserName": "alancheng鄭兆麟",
                    "PostTime": "2019-07-30T16:01:00",
                    "Theme": "TypeScript凭什么成为前端圈新宠？",
                    "Content": "前端圈流行一句话：“任何能用 JavaScript 实现的应用，最终都会用 JavaScript 实现。” @aoniruan从移动终端到后端服务，从 IoT 到神经网络，JavaScript 几乎无处不在。如此广阔的应用领域，自然对语言的安全性、健壮性和可维护性有更高的要求。 尽管 ES 标准在近几年有了长足的进步，但在类型检查方面依然无所建树。大家可能常常会遇到这样到场景： 你调用一个别人写的函数，很不幸，这个家伙没有留下任何注释，为了搞清楚参数类型，你只能硬着头皮去看里面的逻辑。为了保证代码的健壮性，你很有责任心，对一个函数的输入参数进行各种假设，最终给老板盛上了一碗香喷喷的意大利面。领导看好你，让你维护一个重要的底层类库，你殚精竭虑，优化了一个参数类型，但不知道有多少处引用，在提交代码前，是否感到脊背发凉？明明定义好了接口，可一联调就报错了——“TypeError: Cannot read property 'length' of undefined”，于是你怒气冲冲地去找后端理论：“嘿，哥们儿！这个字段是数组！这个字段是数组！这个字段是数组！” 归根结底，是因为 JavaScript 是一门动态弱类型语言， 对变量的类型非常宽容，而且不会在这些变量和它们的调用者之间建立结构化的契约。如果你长期在没有类型约束的环境下开发，就会造成“类型思维”的缺失，养成不良的编程习惯，这也是做前端开发的短板之一，值得我们警醒。 幸运的是，TypeScript 的出现很好地弥补了 JavaScript 在静态类型检查方面的缺陷。它为 JavaScript 提供了良好的类型检查支持，而且能够编译成标准的 JavaScript。目前， Angular 已经使用 TypeScript 重构了代码，另一大前端框架 Vue 的新版本也将使用 TypeScript 进行重构。在可预见的未来，TypeScript 将成为前端开发者必须掌握的开发语言之一。 那么， TypeScript 究竟有哪些特性使得它成为大家的”刚需“？ 第一，类型检查。TypeScript 会在编译代码时进行严格的静态类型检查，这意味着你可以在编码阶段发现可能存在的隐患，而不必把它们带到线上。第二，语言扩展。TypeScript 会包括来自 ES 6 和未来提案中的特性，比如异步操作和装饰器；也会从其他语言借鉴某些特性，比如接口和抽象类。第三，工具属性。TypeScript 能够编译成标准的 JavaScript，可以在任何浏览器、操作系统上运行，无需任何运行时的额外开销。从这个角度上讲，TypeScript 更像是一个工具，而不是一门独立的语言。 除此之外，TypeScript 还可以帮助团队重塑“类型思维”，接口提供方将被迫去思考 API 的边界，他们将从代码的编写者蜕变为代码的设计者。 如何高效学习 TypeScript？TypeScript 如今已经是 3.0+ 的版本了，功能十分强大完善，但大家在学习实践时，有些问题依然容易出现，比如： 初次接触 TypeScript，很多概念和规则理解起来很难，比如接口、泛型、各种高级类型以及类型兼容性规则等等，到底怎么学才能快速上手？TypeScript 工程如何配置？尤其是 tsconfig.json 配置项很多，怎么才能梳理清楚？TypeScript 如何与现有开发生态如何结合？如何从 JavaScript 过渡到 TypeScript？与主流开发框架的结合实践有哪些？各类构建工具如何集成？怎么解决？在这里我发现了一个超全面的 TypeScript 核心知识框架图，内容涵盖 TypeScript 的语法基础、工程配置以及四大典型前端应用的开发实战，能帮助大家高效学习TypeScript。",
                    "Status": "In Progress",
                    "Status_ID": 70,
                    "Result": "Unresolved",
                    "Result_ID": 74,
                    "ReplyCount": 1,
                    "LikeCount": 1,
                    "IsCurrentUserLike": "1",
                    "DislikeCount": 0,
                    "IsCurrentUserDislike": "0"
                },
                {
                    "AutoID": "92",
                    "TopicID": 14,
                    "TopicName": "C#",
                    "TagName": "Boeing,C#",
                    "UserName": "alancheng鄭兆麟",
                    "PostTime": "2019-07-25T10:34:00",
                    "Theme": "千亿智慧照明市场背后，BLEMESH免开发方案成主流",
                    "Content": "随着智慧城市、智慧楼宇、智能家居等应用场景的落地，以及 LED 应用带来的变革，运用物联网、传感器、嵌入式等技术的智慧照明已成为当今主流智能解决方案之一。据前瞻产业研究院《智能照明行业分析报告》数据，2015年全球智能照明市场规模为78.3亿美元，预计2020年可达243.41亿美元，年复合增长率超过20%。在此趋势，如何更好地优化智能照明方案、提升用户体验成为开发者亟需完成的挑战。\r\n\r\n从技术角度来看，在当今的智慧照明领域，LED以低功耗、长寿命、无污染、无频闪等特性仍将是主导光源，而它的主流通讯协议则有BLE、Wi-Fi、ZigBee等多种。相较于在工业自动化领域应用广泛的 ZigBee 技术、高功耗的 Wi-Fi和适用于小范围内的 BLE而言，其实行业更需要一种传输速度快、多信道、低功耗的演进技术。而此时，基于网络泛洪协议的BleMesh 的到来，无疑解决了智慧照明现有的瓶颈。\r\n\r\n“BleMesh”是2017年蓝牙技术联盟（Bluetooth Special Interest Group，即Bluetooth SIG）推出的蓝牙技术标准，即采用特定拓扑结构组网的低功耗蓝牙技术，具备微安级别的低功耗、大规模集群式组网能力、抗干扰的联网稳定性。该技术一经推出，便重塑了人们对于蓝牙的理解。\r\n\r\n兼具低功耗、高承载量、稳定运行和灵活组网等优势，BleMesh正被应用于越来越多的生活场景中，其中最受关注的便是照明行业。雷士照明、佛山照明、阳光照明、得邦照明等照明龙头企业，均已引入 BleMesh 技术进行产品智能化升级。\r\n\r\n\r\n\r\n据Bluetooth SIG数据，采用BleMesh的照明产品已经占据了20%的市场份额，到2023年，出货量更将达到当前的4.5倍。 \r\n\r\n蓝牙技术联盟成员、全球化AI+IoT平台涂鸦智能的董事长兼总裁陈燎罕，曾在公开活动中表示，2019年，涂鸦智能将完成单一客户出货一千万台BleMesh的目标，以推动BleMesh在业内的商用普及。\r\n\r\n尽管BleMesh已经是智慧照明领域的当红炸子鸡，然而优势技术往往伴随着较高的应用门槛——对传统厂商而言，如何把握市场风向，一步到位地引入BleMesh技术，快速实现产品的智能化升级，是需要审慎思考的问题。\r\n\r\n在这一点上，和智能化平台合作或许是性价比最高的方式。\r\n\r\n涂鸦智能作为目前全球物联网市场上占据最大市场份额的AI+IoT平台，连接消费者、制造品牌、OEM厂商和零售连锁的智能化需求，为客户提供一站式人工智能物联网的解决方案。凭借IoT OS级别的技术实力与覆盖全球的云端服务，涂鸦智能正在打造堪比Android的物联网操作系统，以帮助合作伙伴快速实现产品智能化升级与全球部署。\r\n\r\n截至2018年10月底，涂鸦智能已经服务全球93000家客户，连接超过1亿台智能产品投放市场，累计赋能超3万款产品，尤其在照明及电工领域拥有成熟丰富的免开发解决方案。\r\n\r\n作为Bluetooth SIG成员之一，涂鸦智能一直在密切跟进BleMesh规范的制定和更新进展。早在相关标准协议出台时，涂鸦智能就研发了独创的BleMesh内部标准协议，在实际应用中获得了市场普遍认可。 \r\n\r\n涂鸦智能已全面覆盖BleMesh照明的完整生态，有完备的软硬件开发工具和开发文档，终端设备厂家可以通过与涂鸦智能合作，获取一站式的智能化解决方案。 \r\n\r\n\r\n\r\n目前，涂鸦智能向客户提供符合Bluetooth SIG国际标准协议的BleMesh方案，覆盖了照明、电工、传感器三大品类。尤其是BleMesh照明解决方案，支持全线上化接入，主要分为免开发照明方案与线上定制开发两种，大大提升研发与应用效率。 \r\n\r\n【免开发照明方案】 \r\n\r\n公版成熟方案直接复用，用户可以快速获得包含功能参数设置、App控制面板、适配模块、固件程序等一系列符合投产标准的方案内容，可选产品类型包括白光灯、冷暖光灯、 彩光灯、彩色冷光灯、彩色冷暖光灯五种，确保成品具备足够的市场竞争力。\r\n\r\n【线上化定制开发】\r\n\r\n若免开发方案未能满足需求，用户可以直接在涂鸦智能 IoT 平台上自助创建产品、定义功能、设置 App 界面等，开发流程简易透明，无需输入任何代码，只需简单点选即可，最快5分钟完成产品开发，8小时产出demo。 \r\n\r\n\r\n\r\n除了成熟而极具市场竞争力的BleMesh产品解决方案，涂鸦智能另一大优势在于研发技术获得了Bluetooth SIG的Mesh规范认证，可以与其他来自不同品牌、同样取得Mesh规范认证的产品相互联通与控制。\r\n\r\n此外，所有经由涂鸦赋能产品皆属于“Powered by Tuya（PBT）”智能设备。PBT是涂鸦智能对所赋能产品输出的技术赋能标识，拥有该标识的产品可连接至涂鸦云，实现跨品牌互联互通。换言之，采用涂鸦BleMesh方案的智能产品，甚至可与采用其他通讯协议的PBT产品互联互通。\r\n\r\n照明、电工、传感器作为当代生活和生产场景中最紧要的基础设施，稳定性和安全性最为重要，尤其脱离线控采取无线通讯协议之后，智能化方案是否足够成熟稳需要被优先考虑。 同时，大众化的智能照明市场趋向于采用开放的统一标准，以确保不同品牌的产品之间拥有良好的互操作性。涂鸦智能提供的BleMesh方案兼具了以上特点，在万亿量级的智能化金矿面前，为合作伙伴提供了趁手工具和稳定矿道。\r\n\r\n",
                    "Status": "In Progress",
                    "Status_ID": 70,
                    "Result": "Unresolved",
                    "Result_ID": 74,
                    "ReplyCount": 2,
                    "LikeCount": 1,
                    "IsCurrentUserLike": "0",
                    "DislikeCount": 0,
                    "IsCurrentUserDislike": "0"
                }
            ],
        }
    },
    beforeRouteEnter: function (to, from, next) {
        next();
    },
    created: function () {},
    mounted: function () {
        lanTool.updateLanVersion();
    },
    methods: {
        //选择标题或者标签
        selectTitleOrTag:function(e){
          var _self = this;
          var el = e.target;
          $(el).addClass("selected");
          $(el).siblings().removeClass("selected");
          var val = $(el).text();
          console.log("text:"+val);
          _self.isShowdropDown = false;
        },
        //筛选选择
        selectFiltertype: function (e) {
            var _self = this;
            var el = e.target;
            $(el).addClass("selected");
            var parent = $(el).parent("li");
            parent.siblings().find("a").removeClass("selected");
            var val = $(el).text();
            $(".filterText").eq(0).text(val);
            _self.isShowFilter = false;

        },
        //排序选择
        selectSorttype: function (e) {
            var _self = this;
            var el = e.target;
            $(el).addClass("selected");
            var parent = $(el).parent("li");
            parent.siblings().find("a").removeClass("selected");
            var val = $(el).text();
            $(".sortText").eq(0).text(val);
            _self.isShowSort = false;
        },
        //标题和标签下拉的展示和隐藏
         selectDropDownType:function(){
            var _self = this;
             _self.isShowSort = false;
             _self.isShowFilter = false;
            _self.isShowdropDown = !_self.isShowdropDown;
        },
        //筛选下拉展示隐藏
        filterDropDown: function (e) {
            var _self = this;
            _self.isShowSort = false;
            _self.isShowdropDown = false;
            _self.isShowFilter = !_self.isShowFilter;

        },
        //排序下拉列表展示和隐藏
        sortDropDown: function () {
            var _self = this;
            _self.isShowFilter = false;
            _self.isShowdropDown = false;
            _self.isShowSort = !_self.isShowSort;
        },
        goToInfo: function (num) {
            console.log("跳转到详情" + num);
            var _self = this;
            if (tool.isNullOrEmptyObject(num)) {
                return;
            }
            var url = '/foruminfo/' + num;
            _self.$router.push({
                path: url
            })
        },
        switchPage: function (num, e) {
            var _self = this;
            var el = e.target;
            if (num === undefined) return;
            $(el).addClass('active').siblings().removeClass('active');
        },
        //返回上一步
        back: function () {
            this.$router.back(-1);
        },
        //搜索
        search: function () {
            console.log("search");
            var text = $(".searchText").val();
            console.log(text);
        },
       
        //查询列表数据
        queryList: function (queryType, callback) {
            let _self = this;
            if (queryType == 'pushLoad') {
                //上拉请求
                _self.pageNum += 1;
            } else {
                //非上拉请求
                _self.pageNum = 1;
            }
            //api接口地址
            var apiUrlTemp = '';
            var jsonDatas = {
                // CurrentLanguageVersion: lanTool.currentLanguageVersion,
                // UserName: tool.UserName(),
                // TabID: _self.tabID,
                // CompanyID: _self.companyID,
                // VersionID: _self.versionID,
                // IsUsePager: true,
                // PageSize:_self.pageSize,
                // PageNum:_self.pageNum,
                // QueryCondiction: _self.queryCondictionData || []
            };

            if (tool.isNullOrEmptyObject(queryType)) {
                var loadingIndexClassName = tool.showLoading();
            }

            var responseData = [{
                    "AutoID": "4",
                    "TopicID": 10,
                    "TopicName": "NodeJS",
                    "TagName": "Web,JS,NodeJS",
                    "UserName": "aoniruan阮毅文",
                    "PostTime": "2019-08-01T17:16:00",
                    "Theme": "想学Node.js，stream先有必要搞清楚",
                    "Content": "什么是stream定义流的英文stream，流（Stream）是一个抽象的数据接口，Node.js中很多对象都实现了流，流是EventEmitter对象的一个实例，总之它是会冒数据（以 Buffer 为单位），或者能够吸收数据的东西，它的本质就是让数据流动起来。 可能看一张图会更直观：注意：stream不是node.js独有的概念，而是一个操作系统最基本的操作方式，只不过node.js有API支持这种操作方式。linux命令的|就是stream。为什么要学习stream视频播放例子@dylanxu 小伙伴们肯定都在线看过电影，对比定义中的图-水桶管道流转图，source就是服务器端的视频，dest就是你自己的播放器(或者浏览器中的flash和h5 video)。大家想一下，看电影的方式就如同上面的图管道换水一样，一点点从服务端将视频流动到本地播放器，一边流动一边播放，最后流动完了也就播放完了。说明：视频播放的这个例子，如果我们不使用管道和流动的方式，直接先从服务端加载完视频文件，然后再播放。会造成很多问题因内存占有太多而导致系统卡顿或者崩溃因为我们的网速 内存 cpu运算速度都是有限的，而且还要有多个程序共享使用，一个视频文件加载完可能有几个g那么大。读取大文件data的例子有一个这样的需求，想要读取大文件data的例子使用文件读取const http = require('http'); const fs = require('fs'); const path = require('path'); const server = http.createServer(function (req, res) {     const fileName = path.resolve(__dirname, 'data.txt');     fs.readFile(fileName, function (err, data) {         res.end(data);     }); }); server.listen(8000); 复制代码使用文件读取这段代码语法上并没有什么问题，但是如果data.txt文件非常大的话，到了几百M，在响应大量用户并发请求的时候，程序可能会消耗大量的内存，这样可能造成用户连接缓慢的问题。而且并发请求过大的话，服务器内存开销也会很大。这时候我们来看一下用stream实现。const http = require('http'); const fs = require('fs'); const path = require('path'); const server = http.createServer(function (req, res) {     const fileName = path.resolve(__dirname, 'data.txt');     let stream = fs.createReadStream(fileName);  // 这一行有改动     stream.pipe(res); // 这一行有改动 }); server.listen(8000); 复制代码使用stream就可以不需要把文件全部读取了再返回，而是一边读取一边返回，数据通过管道流动给客户端，真的减轻了服务器的压力。",
                    "Status": "In Progress",
                    "Status_ID": 70,
                    "Result": "Unresolved",
                    "Result_ID": 74,
                    "ReplyCount": 3,
                    "LikeCount": 1,
                    "IsCurrentUserLike": "0",
                    "DislikeCount": 0,
                    "IsCurrentUserDislike": "0"
                },
                {
                    "AutoID": "103",
                    "TopicID": 7,
                    "TopicName": "Web",
                    "TagName": "Web",
                    "UserName": "aoniruan阮毅文",
                    "PostTime": "2019-08-01T17:15:00",
                    "Theme": "【Vue原理】Computed - 源码版",
                    "Content": "如果你觉得排版难看，请点击 下面链接 或者 拉到 下面关注公众号也可以吧【Vue原理】Computed - 源码版@dylanxu今天要记录 computed 的源码，有时候想，理解不就好了吗，为什么要记录一遍源码。现在终于想通了过了一段时间之后，你就会忘记你的所谓理解是怎么来的“哎，为什么会这么做，关系为什么是这样，我c…”于是，记录并简化源码，就有助我们迅速找到根源，解决我们的疑惑，还能加强我们的理解@alancheng好吧嗯，这篇文章很长很详细哦，做好阅读的准备，唔该我们重点说明，几个问题的源码实现",
                    "Status": "In Progress",
                    "Status_ID": 70,
                    "Result": "Unresolved",
                    "Result_ID": 74,
                    "ReplyCount": 0,
                    "LikeCount": 0,
                    "IsCurrentUserLike": "0",
                    "DislikeCount": 0,
                    "IsCurrentUserDislike": "0"
                },
                {
                    "AutoID": "97",
                    "TopicID": 15,
                    "TopicName": "前端",
                    "TagName": "Web,JS,前端",
                    "UserName": "alancheng鄭兆麟",
                    "PostTime": "2019-07-30T16:01:00",
                    "Theme": "TypeScript凭什么成为前端圈新宠？",
                    "Content": "前端圈流行一句话：“任何能用 JavaScript 实现的应用，最终都会用 JavaScript 实现。” @aoniruan从移动终端到后端服务，从 IoT 到神经网络，JavaScript 几乎无处不在。如此广阔的应用领域，自然对语言的安全性、健壮性和可维护性有更高的要求。 尽管 ES 标准在近几年有了长足的进步，但在类型检查方面依然无所建树。大家可能常常会遇到这样到场景： 你调用一个别人写的函数，很不幸，这个家伙没有留下任何注释，为了搞清楚参数类型，你只能硬着头皮去看里面的逻辑。为了保证代码的健壮性，你很有责任心，对一个函数的输入参数进行各种假设，最终给老板盛上了一碗香喷喷的意大利面。领导看好你，让你维护一个重要的底层类库，你殚精竭虑，优化了一个参数类型，但不知道有多少处引用，在提交代码前，是否感到脊背发凉？明明定义好了接口，可一联调就报错了——“TypeError: Cannot read property 'length' of undefined”，于是你怒气冲冲地去找后端理论：“嘿，哥们儿！这个字段是数组！这个字段是数组！这个字段是数组！” 归根结底，是因为 JavaScript 是一门动态弱类型语言， 对变量的类型非常宽容，而且不会在这些变量和它们的调用者之间建立结构化的契约。如果你长期在没有类型约束的环境下开发，就会造成“类型思维”的缺失，养成不良的编程习惯，这也是做前端开发的短板之一，值得我们警醒。 幸运的是，TypeScript 的出现很好地弥补了 JavaScript 在静态类型检查方面的缺陷。它为 JavaScript 提供了良好的类型检查支持，而且能够编译成标准的 JavaScript。目前， Angular 已经使用 TypeScript 重构了代码，另一大前端框架 Vue 的新版本也将使用 TypeScript 进行重构。在可预见的未来，TypeScript 将成为前端开发者必须掌握的开发语言之一。 那么， TypeScript 究竟有哪些特性使得它成为大家的”刚需“？ 第一，类型检查。TypeScript 会在编译代码时进行严格的静态类型检查，这意味着你可以在编码阶段发现可能存在的隐患，而不必把它们带到线上。第二，语言扩展。TypeScript 会包括来自 ES 6 和未来提案中的特性，比如异步操作和装饰器；也会从其他语言借鉴某些特性，比如接口和抽象类。第三，工具属性。TypeScript 能够编译成标准的 JavaScript，可以在任何浏览器、操作系统上运行，无需任何运行时的额外开销。从这个角度上讲，TypeScript 更像是一个工具，而不是一门独立的语言。 除此之外，TypeScript 还可以帮助团队重塑“类型思维”，接口提供方将被迫去思考 API 的边界，他们将从代码的编写者蜕变为代码的设计者。 如何高效学习 TypeScript？TypeScript 如今已经是 3.0+ 的版本了，功能十分强大完善，但大家在学习实践时，有些问题依然容易出现，比如： 初次接触 TypeScript，很多概念和规则理解起来很难，比如接口、泛型、各种高级类型以及类型兼容性规则等等，到底怎么学才能快速上手？TypeScript 工程如何配置？尤其是 tsconfig.json 配置项很多，怎么才能梳理清楚？TypeScript 如何与现有开发生态如何结合？如何从 JavaScript 过渡到 TypeScript？与主流开发框架的结合实践有哪些？各类构建工具如何集成？怎么解决？在这里我发现了一个超全面的 TypeScript 核心知识框架图，内容涵盖 TypeScript 的语法基础、工程配置以及四大典型前端应用的开发实战，能帮助大家高效学习TypeScript。",
                    "Status": "In Progress",
                    "Status_ID": 70,
                    "Result": "Unresolved",
                    "Result_ID": 74,
                    "ReplyCount": 1,
                    "LikeCount": 1,
                    "IsCurrentUserLike": "1",
                    "DislikeCount": 0,
                    "IsCurrentUserDislike": "0"
                },
                {
                    "AutoID": "93",
                    "TopicID": 14,
                    "TopicName": "C#",
                    "TagName": "Boeing,C#",
                    "UserName": "alancheng鄭兆麟",
                    "PostTime": "2019-07-25T10:34:00",
                    "Theme": "千亿智慧照明市场背后，BLEMESH免开发方案成主流",
                    "Content": "随着智慧城市、智慧楼宇、智能家居等应用场景的落地，以及 LED 应用带来的变革，运用物联网、传感器、嵌入式等技术的智慧照明已成为当今主流智能解决方案之一。据前瞻产业研究院《智能照明行业分析报告》数据，2015年全球智能照明市场规模为78.3亿美元，预计2020年可达243.41亿美元，年复合增长率超过20%。在此趋势，如何更好地优化智能照明方案、提升用户体验成为开发者亟需完成的挑战。\r\n\r\n从技术角度来看，在当今的智慧照明领域，LED以低功耗、长寿命、无污染、无频闪等特性仍将是主导光源，而它的主流通讯协议则有BLE、Wi-Fi、ZigBee等多种。相较于在工业自动化领域应用广泛的 ZigBee 技术、高功耗的 Wi-Fi和适用于小范围内的 BLE而言，其实行业更需要一种传输速度快、多信道、低功耗的演进技术。而此时，基于网络泛洪协议的BleMesh 的到来，无疑解决了智慧照明现有的瓶颈。\r\n\r\n“BleMesh”是2017年蓝牙技术联盟（Bluetooth Special Interest Group，即Bluetooth SIG）推出的蓝牙技术标准，即采用特定拓扑结构组网的低功耗蓝牙技术，具备微安级别的低功耗、大规模集群式组网能力、抗干扰的联网稳定性。该技术一经推出，便重塑了人们对于蓝牙的理解。\r\n\r\n兼具低功耗、高承载量、稳定运行和灵活组网等优势，BleMesh正被应用于越来越多的生活场景中，其中最受关注的便是照明行业。雷士照明、佛山照明、阳光照明、得邦照明等照明龙头企业，均已引入 BleMesh 技术进行产品智能化升级。\r\n\r\n\r\n\r\n据Bluetooth SIG数据，采用BleMesh的照明产品已经占据了20%的市场份额，到2023年，出货量更将达到当前的4.5倍。 \r\n\r\n蓝牙技术联盟成员、全球化AI+IoT平台涂鸦智能的董事长兼总裁陈燎罕，曾在公开活动中表示，2019年，涂鸦智能将完成单一客户出货一千万台BleMesh的目标，以推动BleMesh在业内的商用普及。\r\n\r\n尽管BleMesh已经是智慧照明领域的当红炸子鸡，然而优势技术往往伴随着较高的应用门槛——对传统厂商而言，如何把握市场风向，一步到位地引入BleMesh技术，快速实现产品的智能化升级，是需要审慎思考的问题。\r\n\r\n在这一点上，和智能化平台合作或许是性价比最高的方式。\r\n\r\n涂鸦智能作为目前全球物联网市场上占据最大市场份额的AI+IoT平台，连接消费者、制造品牌、OEM厂商和零售连锁的智能化需求，为客户提供一站式人工智能物联网的解决方案。凭借IoT OS级别的技术实力与覆盖全球的云端服务，涂鸦智能正在打造堪比Android的物联网操作系统，以帮助合作伙伴快速实现产品智能化升级与全球部署。\r\n\r\n截至2018年10月底，涂鸦智能已经服务全球93000家客户，连接超过1亿台智能产品投放市场，累计赋能超3万款产品，尤其在照明及电工领域拥有成熟丰富的免开发解决方案。\r\n\r\n作为Bluetooth SIG成员之一，涂鸦智能一直在密切跟进BleMesh规范的制定和更新进展。早在相关标准协议出台时，涂鸦智能就研发了独创的BleMesh内部标准协议，在实际应用中获得了市场普遍认可。 \r\n\r\n涂鸦智能已全面覆盖BleMesh照明的完整生态，有完备的软硬件开发工具和开发文档，终端设备厂家可以通过与涂鸦智能合作，获取一站式的智能化解决方案。 \r\n\r\n\r\n\r\n目前，涂鸦智能向客户提供符合Bluetooth SIG国际标准协议的BleMesh方案，覆盖了照明、电工、传感器三大品类。尤其是BleMesh照明解决方案，支持全线上化接入，主要分为免开发照明方案与线上定制开发两种，大大提升研发与应用效率。 \r\n\r\n【免开发照明方案】 \r\n\r\n公版成熟方案直接复用，用户可以快速获得包含功能参数设置、App控制面板、适配模块、固件程序等一系列符合投产标准的方案内容，可选产品类型包括白光灯、冷暖光灯、 彩光灯、彩色冷光灯、彩色冷暖光灯五种，确保成品具备足够的市场竞争力。\r\n\r\n【线上化定制开发】\r\n\r\n若免开发方案未能满足需求，用户可以直接在涂鸦智能 IoT 平台上自助创建产品、定义功能、设置 App 界面等，开发流程简易透明，无需输入任何代码，只需简单点选即可，最快5分钟完成产品开发，8小时产出demo。 \r\n\r\n\r\n\r\n除了成熟而极具市场竞争力的BleMesh产品解决方案，涂鸦智能另一大优势在于研发技术获得了Bluetooth SIG的Mesh规范认证，可以与其他来自不同品牌、同样取得Mesh规范认证的产品相互联通与控制。\r\n\r\n此外，所有经由涂鸦赋能产品皆属于“Powered by Tuya（PBT）”智能设备。PBT是涂鸦智能对所赋能产品输出的技术赋能标识，拥有该标识的产品可连接至涂鸦云，实现跨品牌互联互通。换言之，采用涂鸦BleMesh方案的智能产品，甚至可与采用其他通讯协议的PBT产品互联互通。\r\n\r\n照明、电工、传感器作为当代生活和生产场景中最紧要的基础设施，稳定性和安全性最为重要，尤其脱离线控采取无线通讯协议之后，智能化方案是否足够成熟稳需要被优先考虑。 同时，大众化的智能照明市场趋向于采用开放的统一标准，以确保不同品牌的产品之间拥有良好的互操作性。涂鸦智能提供的BleMesh方案兼具了以上特点，在万亿量级的智能化金矿面前，为合作伙伴提供了趁手工具和稳定矿道。\r\n\r\n",
                    "Status": "In Progress",
                    "Status_ID": 70,
                    "Result": "Unresolved",
                    "Result_ID": 74,
                    "ReplyCount": 2,
                    "LikeCount": 1,
                    "IsCurrentUserLike": "0",
                    "DislikeCount": 0,
                    "IsCurrentUserDislike": "0"
                }
            ]

            if (queryType == 'pushLoad') {
                _self.listData = _self.listData.concat(responseData);
            } else {
                _self.listData = responseData || [];
            }

            setTimeout(() => {
                tool.hideLoading(loadingIndexClassName);
                _self.$refs.scroll.refresh();
            }, 500);
        },

        //下拉
        pulldown: function () {
            let _self = this;
            _self.queryList('pushRefresh', function () {
                // _self.$refs.scroll.refresh();
            })
        },

        //上拉
        pullup: function () {
            let _self = this;
            _self.queryList('pushLoad', function (data, pageSize) {

                if (data.length < pageSize) {
                    _self.$refs.scroll.pullupEnd();
                }
            })
        },
    }
}
</script>

<style scoped>
@import "../../assets/css/forum/ForumList.css";
@import "../../assets/css/forum/ForumSearch.css";
</style>
