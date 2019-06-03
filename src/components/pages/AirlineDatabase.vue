<template>
<div>

    <header class="mui-bar mui-bar-nav">
        <a @click="back" class="calcfont calc-fanhui left" id="back"></a>
        <h1 class="mui-title f18">{{title}}</h1>
        <div class="inputTime">
            <input id="selectYear" type="text" placeholder="select year" readonly>
        </div>
            <a @click="showMenu" class="calcfont calc-jiugongge right"></a>
    </header>

    <div class="segmentedControlContentsBox">
        <div class="segmentedControlContents mui-active" id="ID" data-TabID="7516">
            <div class="fenLeiList">
                <div class="fenLeiListCell">

                    <div class="headTitle">Basic Info</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">ICAO</div>
                            <div class="parameterValue">
                                {{detailEntity["7339"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">IATA</div>
                            <div class="parameterValue">
                                {{detailEntity["7340"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Operator(English)</div>
                            <div class="parameterValue">
                                {{detailEntity["7487"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Operator (Chinese)
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7509"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Country
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7486"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Region/Area
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7341"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">List Company
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7667"]||""}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Record CALC</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Existing Customer
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7347"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Payment record in CALC
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7349"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Outstangding amount</div>
                            <div class="parameterValue">
                                {{(detailEntity["7545"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Account Manager

                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7350"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Comments
                            </div>
                            <div class="parameterValue">
                                <p class="textareaP">
                                    <textarea readonly :value="(detailEntity['7546']||'')"></textarea>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="shouSuoList">
                <ul class="mui-table-view mui-table-view-chevron mui-collapse-content">
                    <li class="mui-table-view-cell mui-collapse">
                        <a class="mui-navigate-right">
                            <div class="listHead">Contacts</div>
                            <span class="calcfont calc-xia"></span>
                        </a>
                        <ul class="mui-table-view">

                            <!-- <li class="mui-table-view-cell">
                                <div class="flexBox">
                                    <div class="flexBoxKey">Name</div>
                                    <div class="flexBoxValue">mingzi</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Title</div>
                                    <div class="flexBoxValue">Chief Technical Officer(CTO)</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Work Number</div>
                                    <div class="flexBoxValue">1555121133</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Mobile Number</div>
                                    <div class="flexBoxValue">1555121133</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Email</div>
                                    <div class="flexBoxValue">12422@163.com</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Status</div>
                                    <div class="flexBoxValue">Active</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Comments</div>
                                    <div class="flexBoxValue">comments</div>
                                </div>
                            </li> -->

                            <li v-for="item in ContactsArray" class="mui-table-view-cell">
                                <div class="flexBox">
                                    <div class="flexBoxKey">Name</div>
                                    <div class="flexBoxValue">{{item["7533"]||""}}</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Title</div>
                                    <div class="flexBoxValue">{{item["7534"]||""}}</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Work Number</div>
                                    <div class="flexBoxValue">{{item["7535"]||""}}</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Mobile Number</div>
                                    <div class="flexBoxValue">{{item["7536"]||""}}</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Email</div>
                                    <div class="flexBoxValue">{{item["7537"]||""}}</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Status</div>
                                    <div class="flexBoxValue">{{item["7538"]||""}}</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Comments</div>
                                    <div class="flexBoxValue">{{item["7539"]||""}}</div>
                                </div>
                            </li>

                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="segmentedControlContents" id="country" data-TabID="7517">
            <div class="fenLeiList">
                <div class="fenLeiListCell">
                    <div class="headTitle">Info</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Report date
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7581"]||"") | abdDateFormat("yyyy/MM/dd")}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Country Rating</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Country Rating</div>
                            <div class="parameterValue">
                                {{detailEntity["7353"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Specifying rating agency</div>
                            <div class="parameterValue">
                                {{detailEntity["7544"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Blacklist Countries</div>
                            <div class="parameterValue">
                                {{detailEntity["7354"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">One belt one road country or not
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7355"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">GDP growth rate
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7356"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">GDP per capita
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7359"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">OECD Country Export Credit Risk
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7357"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">CALC current rating
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7358"]||""}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Currency risk</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Currency Performance
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7361"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Major income currency
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7362"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Major cost currency </div>
                            <div class="parameterValue">
                                {{detailEntity["7363"]||""}}
                            </div>
                        </li>

                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Legal & Repossession Risk</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Owner/Operator Register
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7365"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Cape Town Ratified or not?
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7366"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">IDERA
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7367"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">DPOA
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7368"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Self-help allowed
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7369"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Default record
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7370"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Repossession record
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7371"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Aircraft registration country
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7372"]||""}}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="segmentedControlContents" id="market" data-TabID="7518">
            <div class="fenLeiList">
                <div class="fenLeiListCell">
                    <div class="headTitle">Market Position</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Flag carrier or not, and alliance
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7374"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Business model
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7375"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Major competitiveness</div>
                            <div class="parameterValue">
                                {{detailEntity["7376"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Please specify
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7638"]||""}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">News about this airline</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">News link to website
                            </div>
                            <div class="parameterValue">
                                <p class="textareaP">
                                    <textarea readonly :value="(detailEntity['7378']||'')"></textarea>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- <div class="shouSuoList">
                <ul class="mui-table-view mui-table-view-chevron mui-collapse-content">
                    <li class="mui-table-view-cell mui-collapse">
                        <a class="mui-navigate-right">

                                  <div class="listHead">Market Growth Rate</div>
                                   <span class="calcfont calc-xia"></span>
                                </a>
                        <ul class="mui-table-view">
                            <li class="mui-table-view-cell">
                                <div class="flexBoxTwo">
                                    <div class="boxOne">Hubs/Bases1</div>
                                    <div class="boxTwo">Growth ratio</div>
                                </div>
                            </li>
                            <li class="mui-table-view-cell">
                                <div class="flexBoxTwo">
                                    <div class="boxOne">Hubs/Bases2</div>
                                    <div class="boxTwo">Growth ratio2</div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div> -->
            <div class="shouSuoList">
                <ul class="mui-table-view mui-table-view-chevron mui-collapse-content">
                    <li class="mui-table-view-cell mui-collapse">
                        <a class="mui-navigate-right">
                            <div class="listHead">Market Growth Rate</div>
                            <span class="calcfont calc-xia"></span>
                        </a>
                        <ul class="mui-table-view">
                            <li v-for="item in MarketMetricsArray" class="mui-table-view-cell">
                                <div class="flexBox">
                                    <div class="flexBoxKey">Hubs / Bases</div>
                                    <div class="flexBoxValue">{{item["7547"]||""}}</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Passenger growth ratio</div>
                                    <div class="flexBoxValue">{{(item["7548"]||"") | formatPercent("##.##")}}</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Year</div>
                                    <div class="flexBoxValue">{{item["7668"]||""}}</div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="segmentedControlContents" id="financing" data-TabID="7519">
            <div class="fenLeiList">
                <div class="fenLeiListCell">
                    <div class="headTitle">Associate with any other airlines / airline group</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Associate with any other airlines / airline group
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7541"]||""}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Public listing</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">with stock code and link to IR page
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7384"]||""}}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- <div class="shouSuoList">
                <ul class="mui-table-view mui-table-view-chevron mui-collapse-content">
                    <li class="mui-table-view-cell mui-collapse">
                        <a class="mui-navigate-right">
                                <div class="listHead">Detailed shareholding</div>
                                <span class="calcfont calc-xia"></span>
                                </a>
                        <ul class="mui-table-view">
                            <li class="mui-table-view-cell">
                                <div class="flexBoxTwo">
                                    <div class="boxOne">Shareholder1 Shareholder1 Shareholder1 Shareholder1 Shareholder1 Shareholder1 Shareholder1</div>
                                    <div class="boxTwo">Ownership Percentage1 Ownership Percentage1 Ownership Percentage1 Ownership Percentage1 Ownership Percentage1</div>
                                </div>
                            </li>
                            <li class="mui-table-view-cell">
                                <div class="flexBoxTwo">
                                    <div class="boxOne">Shareholder1</div>
                                    <div class="boxTwo">Ownership Percentage1</div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="mui-table-view mui-table-view-chevron mui-collapse-content">
                    <li class="mui-table-view-cell mui-collapse">
                        <a class="mui-navigate-right">
                                   <div class="listHead">Lessor participation</div>
                                   <span class="calcfont calc-xia"></span>
                                </a>
                        <ul class="mui-table-view">
                            <li class="mui-table-view-cell">
                                <div class="flexBoxTwo">
                                    <div class="boxOne">Lessor1</div>
                                    <div class="boxTwo">Comment1</div>
                                </div>
                            </li>
                            <li class="mui-table-view-cell">
                                <div class="flexBoxTwo">
                                    <div class="boxOne">Lessor2</div>
                                    <div class="boxTwo">Comment2</div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="mui-table-view mui-table-view-chevron mui-collapse-content">
                    <li class="mui-table-view-cell mui-collapse">
                        <a class="mui-navigate-right">
                                <div class="listHead">Bank participation</div>
                                <span class="calcfont calc-xia"></span>
                                </a>
                        <ul class="mui-table-view">
                            <li class="mui-table-view-cell">
                                <div class="flexBoxTwo">
                                    <div class="boxOne">Bank1</div>
                                    <div class="boxTwo">Comment1</div>
                                </div>
                            </li>
                            <li class="mui-table-view-cell">
                                <div class="flexBoxTwo">
                                    <div class="boxOne">Bank2</div>
                                    <div class="boxTwo">Comment2</div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div> -->
            <div class="shouSuoList">
                <ul class="mui-table-view mui-table-view-chevron mui-collapse-content">
                    <li class="mui-table-view-cell mui-collapse">
                        <a class="mui-navigate-right">

                                <div class="listHead">Detailed shareholding</div>
                                 <span class="calcfont calc-xia"></span>
                                </a>
                        <ul class="mui-table-view">
                            <li v-for="item in DetailedshareholdingArray" class="mui-table-view-cell">
                                <div class="flexBox">
                                    <div class="flexBoxKey">Shareholder</div>
                                    <div class="flexBoxValue">{{item["7540"]||""}}</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Ownership Percentage</div>
                                    <div class="flexBoxValue">{{(item["7577"]||"") | formatPercent("##.##")}}</div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="mui-table-view mui-table-view-chevron mui-collapse-content">
                    <li class="mui-table-view-cell mui-collapse">
                        <a class="mui-navigate-right">
                            <div class="listHead">Lessor participation</div>
                            <span class="calcfont calc-xia"></span>
                        </a>
                        <ul class="mui-table-view">
                            <li v-for="item in LessorparticipationArray" class="mui-table-view-cell">
                                <div class="flexBox">
                                    <div class="flexBoxKey">Lessor</div>
                                    <div class="flexBoxValue">{{item["7549"]||""}}</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Comment</div>
                                    <div class="flexBoxValue">{{item["7550"]||""}}</div>
                                </div>

                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="mui-table-view mui-table-view-chevron mui-collapse-content">
                    <li class="mui-table-view-cell mui-collapse">
                        <a class="mui-navigate-right">
                            <div class="listHead">Bank participation</div>
                            <span class="calcfont calc-xia"></span>
                        </a>
                        <ul class="mui-table-view">
                            <li v-for="item in BankparticipationArray" class="mui-table-view-cell">
                                <div class="flexBox">
                                    <div class="flexBoxKey">Bank</div>
                                    <div class="flexBoxValue">{{item["7551"]||""}}</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Comment</div>
                                    <div class="flexBoxValue">{{item["7552"]||""}}</div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="segmentedControlContents" id="fleet" data-TabID="7520">
            <div class="fenLeiList">
                <div class="fenLeiListCell">
                    <div class="headTitle">Info</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Report date
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7582"]||"") | abdDateFormat("yyyy/MM/dd")}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Fleet plan</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Number of fleet</div>
                            <div class="parameterValue">
                                {{(detailEntity["7390"]||"") | formatFigure("#,###")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Fleet Type
                            </div>
                            <div class="parameterValue">
                                <p class="textareaP">
                                    <textarea readonly :value="(detailEntity['7391']||'')"></textarea>
                                </p>
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Order book
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7392"]||"") | formatFigure("#,###")}}

                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Order book Type
                            </div>
                            <div class="parameterValue">
                                <p class="textareaP">
                                    <textarea readonly :value="(detailEntity['7393']||'')"></textarea>
                                </p>
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Average fleet age (Year)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7394"]||"") | formatFigure("#,###.##")}}

                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Retire old aircraft plan
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7395"]||""}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Seat Growth Rate</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Average available Seat Growth (YoY)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7343"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Fleet Financing Method </div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Top 3 financing tools/product to fleet
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7345"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Please specify
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7636"]||""}}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="fleetDetailBtn" @click.stop="gotoFleetDetailsList()">
                <div class="fleetDetailBtnContent">Fleet Details</div>
                <div class="fleetDetailBtnIcon"><span class="calcfont calc-you"></span></div>
            </div>
            <!-- <div class="shouSuoList">
                <ul class="mui-table-view mui-table-view-chevron mui-collapse-content">
                    <li class="mui-table-view-cell mui-collapse">
                        <a class="mui-navigate-right">
                                <div class="listHead">fleet Details</div>
                                <span class="calcfont calc-xia"></span>
                                </a>
                        <ul class="mui-table-view">
                            <li class="mui-table-view-cell">
                                <div class="flexBox">
                                    <div class="flexBoxKey">MSN</div>
                                    <div class="flexBoxValue">MSN1</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Aircraft model</div>
                                    <div class="flexBoxValue">Aircraft model1</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Engine type</div>
                                    <div class="flexBoxValue">Engine type1</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">YoM</div>
                                    <div class="flexBoxValue">2018-11-8</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Age</div>
                                    <div class="flexBoxValue">0年0月0天</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Own/Lease</div>
                                    <div class="flexBoxValue">Own/Lease1</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Remarks</div>
                                    <div class="flexBoxValue">Remarks1</div>
                                </div>
                            </li>
                            <li class="mui-table-view-cell">
                                <div class="flexBox">
                                    <div class="flexBoxKey">MSN</div>
                                    <div class="flexBoxValue">MSN2</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Aircraft model</div>
                                    <div class="flexBoxValue">Aircraft model2</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Engine type</div>
                                    <div class="flexBoxValue">Engine type2</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">YoM</div>
                                    <div class="flexBoxValue">2018-11-9</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Age</div>
                                    <div class="flexBoxValue">0年0月0天</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Own/Lease</div>
                                    <div class="flexBoxValue">Own/Lease2</div>
                                </div>
                                <div class="flexBox">
                                    <div class="flexBoxKey">Remarks</div>
                                    <div class="flexBoxValue">Remarks2</div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div> -->
        </div>
        <div class="segmentedControlContents" id="production" data-TabID="7521">
            <div class="fenLeiList">
                <div class="fenLeiListCell">
                    <div class="headTitle">Info</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Report date
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7583"]||"") | abdDateFormat("yyyy/MM/dd")}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Production</div>
                    <ul class="mui-table-view">
                        <!-- <li class="mui-table-view-cell">
                            <div class="parameterName">Production Date
                            </div>
                            <div class="parameterValue">
                                2018
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Report date
                            </div>
                            <div class="parameterValue">
                                2018/11/11
                            </div>
                        </li> -->
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Available Seat Kilometers (ASK)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7399"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Seat capacity provided
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7400"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Revenue Passenger Kilometers (RPK)
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7401"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Number of Passengers Carried within 12 months
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7402"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Load Factor(%)
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7403"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Number of Domestic Route
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7404"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Number of Internatioal Route
                            </div>
                            <div class="parameterValue">
                                 {{(detailEntity["7405"]||"") | formatFigure("#,###")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Daily utilization
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7589"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">No. of Landing

                            </div>
                            <div class="parameterValue">
                                 {{(detailEntity["7590"]||"") | formatFigure("#,###")}}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="segmentedControlContents" id="airline" data-TabID="7522">
            <div class="fenLeiList">
                <div class="fenLeiListCell">
                    <div class="headTitle">Info</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Report date
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7584"]||"") | abdDateFormat("yyyy/MM/dd")}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Resilient</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Bankruptcy before or not
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7407"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Established year
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7578"]||""}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Safety & Quality </div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Safety rating
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7409"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">IOSA certified
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7410"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Number of Accident (Total Loss) within 10 years
                            </div>
                            <div class="parameterValue">
                                 {{(detailEntity["7411"]||"") | formatFigure("#,###")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Number of Accident (Non total Loss) within 10 years
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7412"]||"") | formatFigure("#,###")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Number of Incident within 5 years
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7591"]||"") | formatFigure("#,###")}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Maintenance capability</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">A check, C check or D check?
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7414"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Who are main MRO for aircraft
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7415"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Who are main MRO for engine
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7416"]||""}}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="segmentedControlContents" id="financial" data-TabID="7523">
            <div class="fenLeiList">
                <div class="fenLeiListCell">
                    <div class="headTitle">Info</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Report date
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7585"]||"") | abdDateFormat("yyyy/MM/dd")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Exchange Rate (exchange to Standard)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7587"]||"") | formatFigure("#,###.####")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Local Currency
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7586"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Standard money
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7636"]||""}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Profitability</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Total Revenue
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7426"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Passenger revenue
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7427"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Passenger revenue / Total revenue(%)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7428"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Cargo revenue
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7429"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Cargo revenue / Total revenue(%)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7430"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Ancillary revenue
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7431"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Ancillary revenue / Total revenue(%)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7432"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Total Cost
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7433"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Direct cost (% of total cost)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7434"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Cost of maintenance (% of total cost)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7435"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Cost of spare parts (% of total cost)
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7436"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Cost of rental (% of total cost)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7437"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Indirect cost (% of total cost)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7438"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">EBITDAR
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7439"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">EBITDAR Margin (Compulsory)
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7440"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">EBITDA
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7441"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">EBITDA Margin
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7442"]||"") | formatPercent("##.##")}}
                                </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">EBIT
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7443"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">EBIT margin
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7444"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Net Profit
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7445"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Net profit margin(%)
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7446"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Unit Revenue (PRASK)
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7447"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Passenger yield (US cent/km)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7448"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Unit Cost (CASK)
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7449"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Liquidity</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Cash and Cash Equivalents
                            </div>
                            <div class="parameterValue">
                                 {{(detailEntity["7451"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Free Cash Flow
                            </div>
                            <div class="parameterValue">
                                 {{(detailEntity["7452"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Cash Flow from Operations
                            </div>
                            <div class="parameterValue">
                                 {{(detailEntity["7453"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Cash Flow from Investment
                            </div>
                            <div class="parameterValue">
                                 {{(detailEntity["7454"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Cash Flow from Financing
                            </div>
                            <div class="parameterValue">
                                 {{(detailEntity["7455"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Net Cash Flow
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7456"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Total Assets
                            </div>
                            <div class="parameterValue">
                                 {{(detailEntity["7457"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Total Liabilities
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7458"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Net Asset Value
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7459"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Leverage Ratio(%)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7460"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Current Ratio(%)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7461"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">EBITDAR-to-(interest + rent) coverage ratio
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7462"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>

                        <li class="mui-table-view-cell">
                            <div class="parameterName">EBITDA-to-interest coverage ratio(%)
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7463"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Net Debt-to-EBITDA (%) (Optional)
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7464"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Comments</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Audit report avaiable or not
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7543"]||""}}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="segmentedControlContents" id="listing" data-TabID="7524">
            <div class="fenLeiList">
                <div class="fenLeiListCell">
                    <div class="headTitle">Info</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Report date
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7588"]||"") | abdDateFormat("yyyy/MM/dd")}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Listing & Rating Information</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Stock Code
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7469"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">P/B
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7470"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">P/E
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7471"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Dividend yield
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7472"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Share Price Range within 12 months
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7473"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Earning per share
                            </div>
                            <div class="parameterValue">
                                {{(detailEntity["7474"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">NAV per share
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7475"]||"") | formatFigure("#,###.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">percentage of floating shares
                            </div>
                            <div class="parameterValue">
                               {{(detailEntity["7476"]||"") | formatPercent("##.##")}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Company Credit Rating
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7564"]||""}}
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Specifying rating agency
                            </div>
                            <div class="parameterValue">
                                {{detailEntity["7579"]||""}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fenLeiListCell">
                    <div class="headTitle">Business Opportunity</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div class="parameterName">Remarks
                            </div>
                            <div class="parameterValue">
                                <p class="textareaP">
                                    <textarea readonly :value="(detailEntity['7576']||'')"></textarea>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- 弹出层 -->
    <div class="itemZheZhao"></div>
    <div class="sucaihuo-container">
        <div class="cd-bouncy-nav-modal" @touchmove.stop.prevent>
            <nav>
                <ul class="cd-bouncy-nav">
                    <li data-category="#ID" class="active">
                        <a>ID</a>
                    </li>
                    <li data-category="#country" class="haveTime">
                        <a>Country Risk</a>
                    </li>
                    <li data-category="#market">
                        <a>Market Metrics</a>
                    </li>
                    <li data-category="#financing">
                        <a >Financing Power</a>
                    </li>
                    <li data-category="#fleet" class="haveTime">
                        <a >Fleet Profile Metrics</a>
                    </li>
                    <li data-category="#production" class="haveTime">
                        <a >Production</a>
                    </li>
                    <li data-category="#airline" class="haveTime">
                        <a >Airline Operation Metrics</a>
                    </li>
                    <li data-category="#financial" class="haveTime">
                        <a >Financial Metrics</a>
                    </li>
                    <li data-category="#listing" class="haveTime">
                        <a >Listing & Rating Information</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

</div>
</template>

<script>
export default {
     name:'airlineDatabase',
    data() {
        return {
            title: "Airline Database",
            is_bouncy_nav_animating: false,
            companyID: "", //公司ID
            tabID: "", //模块ID
            versionID: "", //当前选中的年
            detailEntity: {}, //明细实体
            ContactsArray:[],
            MarketMetricsArray:[],
            DetailedshareholdingArray:[],
            LessorparticipationArray:[],
            BankparticipationArray:[],
            FleetDatailsArray:[]
        }
    },
    created: function () {
        var _self = this;
        $(window).scrollTop(0);
        _self.$store.commit('SET_ITEM', 'airlineDatabase');
    },
    mounted: function () {
        this.getEvent();
        this.showList();
        this.initSelectYear();

        var _self = this;
        //公司ID
        _self.companyID = _self.$route.query.CompanyID;
        //公司名
        _self.title = _self.$route.query.CompanyName;
        //当前选择的时间
        _self.versionID = $("#selectYear").val() || "";
        //当前激活的模块
        var curTab = $(".segmentedControlContents.mui-active");
        if (tool.isNullOrEmptyObject(curTab)) {
            _self.tabID = "7516";
        } else {
            _self.tabID = curTab.attr("data-TabID") || "7516";
        }

        //挂载完后首次获取内容
        _self.getTabContent();
    },
    methods: {
        //跳转到fleet Details列表
        gotoFleetDetailsList: function () {
            var _self = this;
            var fleetDatailsArrayStr = JSON.stringify(_self.FleetDatailsArray);
            _self.$router.push({
                //path: "/fleetDetailsList",
                name:"fleetDetailsList",
                params:{
                    fleetDatailsArrayStr:fleetDatailsArrayStr
                }
            });
        },
        //列表收缩展示
        showList: function () {
            var _self = this;
            $("a.mui-navigate-right").off("click").on("click", function () {
                var target = $(this);
                if (tool.isNullOrEmptyObject(target)) {
                    return;
                }
                var parentTarget = target.parent();
                if (tool.isNullOrEmptyObject(parentTarget)) {
                    return;
                }
                if (!parentTarget.hasClass("mui-active")) {
                    parentTarget.addClass("mui-active");
                    parentTarget.find("span").removeClass("calc-xia").addClass("calc-shang");
                    parentTarget.find("ul").slideDown();
                } else {
                    parentTarget.removeClass("mui-active");
                    parentTarget.find("span").removeClass("calc-shang").addClass("calc-xia");
                    parentTarget.find("ul").slideUp();
                }
            })
        },
        //返回上一步
        back: function () {
            this.$router.back(-1);
        },
        //初始化年控件
        initSelectYear: function () {
            var _self = this;

            //构造可选年份数据
            //配置年数据
            var yearConfigArr = [];
            //默认前后50年可选
            var unitYear = 50;
            var currentYear = new Date().getFullYear();
            var starIndex = currentYear - unitYear;
            var endIndex = currentYear + unitYear;
            for (var i = starIndex; i <= endIndex; i++) {
                yearConfigArr.push(i);
            }
            var _curObj = $('#selectYear');
            _curObj.val(currentYear);
            if (tool.isNullOrEmptyObject(_curObj)) {
                return;
            }
            var selectYear = currentYear; //默认选择的年份
            _curObj.picker({
                title: lanTool.lanContent("1000002_请选择年") || "",
                cols: [{
                    textAlign: 'center',
                    values: yearConfigArr
                }],
                toolbarCloseText: lanTool.lanContent('569_确认'), //确认
                toolbarCancleText: lanTool.lanContent('570_取消'), //取消
                onOpen: function (data) {

                    //del by Dylan 这段代码貌似没什么意义
                    // var defaultValue = _curObj.val() || '';
                    // _curObj.picker("setValue", [defaultValue]);
                    // selectYear = defaultValue;
                    // $('.close-picker').off('click').on("click", function () {
                    //     if (tool.isNullOrEmptyObject(selectYear) || selectYear == defaultValue) {
                    //         return;
                    //     }
                    // });
                    //end del

                    $(".close-picker").off('click').on('click', function () {
                        console.log("confirm");
                        //_self.versionID = _curObj.val() || '';
                        //查询模块数据
                        _self.getTabContent();
                    });
                },
                onChange: function (data, valueTemp, displayTemp) {
                    selectYear = valueTemp[0];
                }
            });
        },
        //显示模块菜单
        showMenu: function () {
            var _self = this;
            // console.log("menu");
            if (!$('.cd-bouncy-nav-modal').hasClass("fade-in")) {
                $(".itemZheZhao").show();
                _self.triggerBouncyNav(true);
            } else {
                _self.triggerBouncyNav(false);
            }

        },
        //模块跳转
        getEvent: function () {
            var _self = this;
            $('.cd-bouncy-nav-modal li').off('click').on('click', function (event) {
                var category = $(this).attr("data-category");
                _self.triggerBouncyNav(false, category, $(this));
            });
        },
        //模块跳转
        triggerBouncyNav: function ($bool, $this, curObj) {
            var _self = this;
            if (!_self.is_bouncy_nav_animating) {
                _self.is_bouncy_nav_animating = true;
                //切换菜单动画   判断动画结束后才能调用 （webkitAnimationEnd oanimationend msAnimationEnd animationend）
                $('.cd-bouncy-nav-modal').toggleClass('fade-in', $bool).toggleClass('fade-out', !$bool).find('li:last-child').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                    $('.cd-bouncy-nav-modal').toggleClass('is-visible', $bool);
                    if (!$bool) {
                        $(".itemZheZhao").hide();
                    }

                    if (!tool.isNullOrEmptyObject($this)) {
                        $($this).addClass("mui-active");
                        $(window).scrollTop(0);
                        $($this).siblings().removeClass("mui-active");

                        //获取当前航空公司当前模块的内容
                        _self.getTabContent();
                    }
                    if (!tool.isNullOrEmptyObject(curObj)) {
                        //判断模块是否可以进行日期选择 没有的话隐藏时间控件
                        if (curObj.hasClass('haveTime')) {
                            $(".inputTime").show();
                        } else {
                            $(".inputTime").hide();
                        }
                        curObj.addClass("active")
                        curObj.siblings().removeClass("active");
                    }
                    $('.cd-bouncy-nav-modal').removeClass('fade-out');
                    _self.is_bouncy_nav_animating = false;
                });
                //判断css 动画是否开启..
                if ($('.cd-bouncy-nav-trigger').parents('.no-csstransitions').length > 0) {
                    $('.cd-bouncy-nav-modal').toggleClass('is-visible', $bool);
                    _self.is_bouncy_nav_animating = false;
                }
            }
        },
        //获取当前航空公司当前模块的内容
        getTabContent: function () {
            //api接口地址
            var _self = this;

            //获取当前激活的模块
            var curTab = $(".segmentedControlContents.mui-active");
            // console.log(curTab);
            if (tool.isNullOrEmptyObject(curTab)) {
                _self.tabID = "7516";
            } else {
                _self.tabID = curTab.attr("data-TabID") || "7516";
            }

            //获取当前年
            _self.versionID = $("#selectYear").val() || '';
            if (tool.isNullOrEmptyObject(_self.tabID) || tool.isNullOrEmptyObject(_self.companyID) || tool.isNullOrEmptyObject(_self.versionID)) {
                return;
            }

            var apiUrlTemp = tool.combineRequestUrl(tool.ADBAjaxUrl(), tool.getConfigValue(tool.ADBApi_AirlineDatabase_Query_InfoDetailByTab));
            // console.log("apiUrlTemp:" + apiUrlTemp);
            var jsonDatas = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                TabID: _self.tabID,
                CompanyID: _self.companyID,
                VersionID: _self.versionID
            };
            var loadingIndexClassName = tool.showLoading();
            $.ajax({
                async: true,
                type: "post",
                url: apiUrlTemp,
                data: {
                    jsonDatas: JSON.stringify(jsonDatas)
                },
                success: function (data) {
                    tool.hideLoading(loadingIndexClassName);
                    data = tool.jObject(data);
                    if (data.Result != 1) {
                        tool.showText(data.Msg);
                        console.log(tool.getMessage(data.Msg));
                        return true;
                    }

                    _self.detailEntity = data.Data;

                    //渲染textarea                    
                    _self.$nextTick(function () {
                        $("textarea").each(function (index, cur) {
                            tool.autoTextarea(cur);
                        });
                    });

                    //拥有列表的模块
                    var hasListTabIDArray = ["7516","7518","7519","7520"];
                    var tabIDTemp = _self.tabID.toString();
                    if(hasListTabIDArray.indexOf(tabIDTemp)>=0){
                        console.log(tabIDTemp);
                        //获取列表数据

                        apiUrlTemp = tool.combineRequestUrl(tool.ADBAjaxUrl(), tool.getConfigValue(tool.ADBApi_AirlineDatabase_Query_ListByTab));
                        $.ajax({
                            async: true,
                            type: "post",
                            url: apiUrlTemp,
                            data: {
                                jsonDatas: JSON.stringify(jsonDatas)
                            },
                            success: function (data) {
                                console.log(data);
                                data = tool.jObject(data);
                                if (data.Result != 1) {
                                    tool.showText(data.Msg);
                                    console.log(tool.getMessage(data.Msg));
                                    return true;
                                }
                                data = data.Data || {};

                                if(tabIDTemp == "7516"){
                                    _self.ContactsArray = data["ContactsArray"] || [];
                                }else if(tabIDTemp == "7518"){
                                    _self.MarketMetricsArray = data["MarketMetricsArray"] || [];
                                }else if(tabIDTemp == "7519"){
                                    _self.DetailedshareholdingArray = data["DetailedshareholdingArray"] || [];
                                    _self.LessorparticipationArray = data["LessorparticipationArray"] || [];
                                    _self.BankparticipationArray = data["BankparticipationArray"] || [];
                                }else if(tabIDTemp == "7520"){
                                    _self.FleetDatailsArray = data["FleetDatailsArray"] || [];
                                }else{

                                }
                            },
                            error: function (jqXHR, type, error) {
                                console.log(error);
                                return true;
                            },
                            complete: function () {
                                //隐藏虚拟键盘
                                document.activeElement.blur();
                            }
                        });

                        //渲染textarea                    
                        _self.$nextTick(function () {
                            $("textarea").each(function (index, cur) {
                                tool.autoTextarea(cur);
                            });
                        });
                    }
                },
                error: function (jqXHR, type, error) {
                    console.log(error);
                    tool.hideLoading(loadingIndexClassName);
                    return true;
                },
                complete: function () {
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                }
            });
        }
    },
     beforeRouteLeave:function(to, from, next){         
      if(to.name == 'organizationsinfo'){          
          this.$store.commit('REMOVE_ITEM', 'airlineDatabase');
      }
      next();
    }
}
</script>

<style scoped>
@import "../../assets/css/pages/AirlineDatabase.css";
</style>
