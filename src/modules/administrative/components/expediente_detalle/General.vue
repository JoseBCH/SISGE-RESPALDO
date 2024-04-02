<template>
    <div>
        <div class="row d-flex align-items-start">
            <div class="col-md-4">
                <div class="card support-bar overflow-hidden">
                    <div v-if="trade != null" class="card-body pb-0">
                        <label v-if="trade.tra_state_law === 'P'" class="badge bg-light-warning mb-2">PENDIENTE</label>
                        <label v-if="trade.tra_state_law === 'F'" class="badge bg-light-success mb-2">FINALIZADO</label>
                        <h2 class="m-0">{{ trade.tra_number }}</h2>
                        <span class="text-primary">{{ trade.tra_name }}</span>
                        <p class="mb-3 mt-3">{{ trade.tra_matter }}</p>
                        <p><i class="material-icons-two-tone text-primary">apartment</i> {{ trade.area.are_name }}</p>
                        <p v-if="trade.tra_number_ext != null"><i
                                class="material-icons-two-tone text-primary">description</i> Expediente: {{
                            trade.tra_number_ext }}</p>
                        <p v-if="trade.tra_doc_recep != null"><i
                                class="material-icons-two-tone text-primary">article</i> Oficio: {{ trade.tra_doc_recep
                            }}</p>
                    </div>
                    <div class="card-footer border-0">
                        <div class="row text-center">
                            <div class="col">
                                <h4 class="m-0">130</h4>
                                <span>May</span>
                            </div>
                            <div class="col">
                                <h4 class="m-0">251</h4>
                                <span>June</span>
                            </div>
                            <div class="col">
                                <h4 class="m-0 ">235</h4>
                                <span>July</span>
                            </div>
                        </div>
                    </div>
                    <div id="support-chart1" style="min-height: 85px;">
                        <div id="apexchartsys090bzig"
                            class="apexcharts-canvas apexchartsys090bzig apexcharts-theme-light"
                            style="width: 361.2px; height: 85px;"><svg id="SvgjsSvg1509" width="361.2" height="85"
                                xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"
                                class="apexcharts-svg" xmlns:data="ApexChartsNS" transform="translate(0, 0)"
                                style="background: transparent;">
                                <g id="SvgjsG1511" class="apexcharts-inner apexcharts-graphical"
                                    transform="translate(14.43741935483871, 0)">
                                    <defs id="SvgjsDefs1510">
                                        <linearGradient id="SvgjsLinearGradient1514" x1="0" y1="0" x2="0" y2="1">
                                            <stop id="SvgjsStop1515" stop-opacity="0.4"
                                                stop-color="rgba(216,227,240,0.4)" offset="0"></stop>
                                            <stop id="SvgjsStop1516" stop-opacity="0.5"
                                                stop-color="rgba(190,209,230,0.5)" offset="1"></stop>
                                            <stop id="SvgjsStop1517" stop-opacity="0.5"
                                                stop-color="rgba(190,209,230,0.5)" offset="1"></stop>
                                        </linearGradient>
                                        <clipPath id="gridRectMaskys090bzig">
                                            <rect id="SvgjsRect1520" width="365.2" height="85" x="-12.43741935483871"
                                                y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none"
                                                stroke-dasharray="0" fill="#fff"></rect>
                                        </clipPath>
                                        <clipPath id="gridRectMarkerMaskys090bzig">
                                            <rect id="SvgjsRect1521" width="344.32516129032257" height="89" x="-2"
                                                y="-2" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none"
                                                stroke-dasharray="0" fill="#fff"></rect>
                                        </clipPath>
                                    </defs>
                                    <line id="SvgjsLine1519" x1="0" y1="0" x2="0" y2="85" stroke-dasharray="3"
                                        class="apexcharts-xcrosshairs" x="0" y="0" width="1" height="85"
                                        fill="url(#SvgjsLinearGradient1514)" filter="none" fill-opacity="0.9"
                                        stroke-width="0"></line>
                                    <g id="SvgjsG1557" class="apexcharts-xaxis" transform="translate(0, 0)">
                                        <g id="SvgjsG1558" class="apexcharts-xaxis-texts-g"
                                            transform="translate(0, -4)"></g>
                                    </g>
                                    <g id="SvgjsG1566" class="apexcharts-grid">
                                        <g id="SvgjsG1567" class="apexcharts-gridlines-horizontal"
                                            style="display: none;">
                                            <line id="SvgjsLine1569" x1="-10.43741935483871" y1="0"
                                                x2="350.7625806451613" y2="0" stroke="#e0e0e0" stroke-dasharray="0"
                                                class="apexcharts-gridline"></line>
                                            <line id="SvgjsLine1570" x1="-10.43741935483871" y1="17"
                                                x2="350.7625806451613" y2="17" stroke="#e0e0e0" stroke-dasharray="0"
                                                class="apexcharts-gridline"></line>
                                            <line id="SvgjsLine1571" x1="-10.43741935483871" y1="34"
                                                x2="350.7625806451613" y2="34" stroke="#e0e0e0" stroke-dasharray="0"
                                                class="apexcharts-gridline"></line>
                                            <line id="SvgjsLine1572" x1="-10.43741935483871" y1="51"
                                                x2="350.7625806451613" y2="51" stroke="#e0e0e0" stroke-dasharray="0"
                                                class="apexcharts-gridline"></line>
                                            <line id="SvgjsLine1573" x1="-10.43741935483871" y1="68"
                                                x2="350.7625806451613" y2="68" stroke="#e0e0e0" stroke-dasharray="0"
                                                class="apexcharts-gridline"></line>
                                            <line id="SvgjsLine1574" x1="-10.43741935483871" y1="85"
                                                x2="350.7625806451613" y2="85" stroke="#e0e0e0" stroke-dasharray="0"
                                                class="apexcharts-gridline"></line>
                                        </g>
                                        <g id="SvgjsG1568" class="apexcharts-gridlines-vertical" style="display: none;">
                                        </g>
                                        <line id="SvgjsLine1576" x1="0" y1="85" x2="340.32516129032257" y2="85"
                                            stroke="transparent" stroke-dasharray="0"></line>
                                        <line id="SvgjsLine1575" x1="0" y1="1" x2="0" y2="85" stroke="transparent"
                                            stroke-dasharray="0"></line>
                                    </g>
                                    <g id="SvgjsG1522" class="apexcharts-bar-series apexcharts-plot-series">
                                        <g id="SvgjsG1523" class="apexcharts-series" rel="1" seriesName="seriesx1"
                                            data:realIndex="0">
                                            <path id="SvgjsPath1525"
                                                d="M -3.8423808532778354 85L -3.8423808532778354 63.75L 3.8423808532778354 63.75L 3.8423808532778354 63.75L 3.8423808532778354 85L 3.8423808532778354 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M -3.8423808532778354 85L -3.8423808532778354 63.75L 3.8423808532778354 63.75L 3.8423808532778354 63.75L 3.8423808532778354 85L 3.8423808532778354 85z"
                                                pathFrom="M -3.8423808532778354 85L -3.8423808532778354 85L 3.8423808532778354 85L 3.8423808532778354 85L 3.8423808532778354 85L -3.8423808532778354 85"
                                                cy="63.75" cx="3.8423808532778354" j="0" val="25" barHeight="21.25"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1526"
                                                d="M 7.135850156087408 85L 7.135850156087408 28.9L 14.82061186264308 28.9L 14.82061186264308 28.9L 14.82061186264308 85L 14.82061186264308 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 7.135850156087408 85L 7.135850156087408 28.9L 14.82061186264308 28.9L 14.82061186264308 28.9L 14.82061186264308 85L 14.82061186264308 85z"
                                                pathFrom="M 7.135850156087408 85L 7.135850156087408 85L 14.82061186264308 85L 14.82061186264308 85L 14.82061186264308 85L 7.135850156087408 85"
                                                cy="28.9" cx="14.82061186264308" j="1" val="66" barHeight="56.1"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1527"
                                                d="M 18.114081165452653 85L 18.114081165452653 50.15L 25.798842872008322 50.15L 25.798842872008322 50.15L 25.798842872008322 85L 25.798842872008322 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 18.114081165452653 85L 18.114081165452653 50.15L 25.798842872008322 50.15L 25.798842872008322 50.15L 25.798842872008322 85L 25.798842872008322 85z"
                                                pathFrom="M 18.114081165452653 85L 18.114081165452653 85L 25.798842872008322 85L 25.798842872008322 85L 25.798842872008322 85L 18.114081165452653 85"
                                                cy="50.15" cx="25.798842872008322" j="2" val="41" barHeight="34.85"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1528"
                                                d="M 29.092312174817902 85L 29.092312174817902 9.350000000000009L 36.777073881373575 9.350000000000009L 36.777073881373575 9.350000000000009L 36.777073881373575 85L 36.777073881373575 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 29.092312174817902 85L 29.092312174817902 9.350000000000009L 36.777073881373575 9.350000000000009L 36.777073881373575 9.350000000000009L 36.777073881373575 85L 36.777073881373575 85z"
                                                pathFrom="M 29.092312174817902 85L 29.092312174817902 85L 36.777073881373575 85L 36.777073881373575 85L 36.777073881373575 85L 29.092312174817902 85"
                                                cy="9.350000000000009" cx="36.777073881373575" j="3" val="89"
                                                barHeight="75.64999999999999" barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1529"
                                                d="M 40.07054318418314 85L 40.07054318418314 31.450000000000003L 47.755304890738806 31.450000000000003L 47.755304890738806 31.450000000000003L 47.755304890738806 85L 47.755304890738806 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 40.07054318418314 85L 40.07054318418314 31.450000000000003L 47.755304890738806 31.450000000000003L 47.755304890738806 31.450000000000003L 47.755304890738806 85L 47.755304890738806 85z"
                                                pathFrom="M 40.07054318418314 85L 40.07054318418314 85L 47.755304890738806 85L 47.755304890738806 85L 47.755304890738806 85L 40.07054318418314 85"
                                                cy="31.450000000000003" cx="47.755304890738806" j="4" val="63"
                                                barHeight="53.55" barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1530"
                                                d="M 51.04877419354838 85L 51.04877419354838 63.75L 58.73353590010405 63.75L 58.73353590010405 63.75L 58.73353590010405 85L 58.73353590010405 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 51.04877419354838 85L 51.04877419354838 63.75L 58.73353590010405 63.75L 58.73353590010405 63.75L 58.73353590010405 85L 58.73353590010405 85z"
                                                pathFrom="M 51.04877419354838 85L 51.04877419354838 85L 58.73353590010405 85L 58.73353590010405 85L 58.73353590010405 85L 51.04877419354838 85"
                                                cy="63.75" cx="58.73353590010405" j="5" val="25" barHeight="21.25"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1531"
                                                d="M 62.027005202913635 85L 62.027005202913635 47.6L 69.7117669094693 47.6L 69.7117669094693 47.6L 69.7117669094693 85L 69.7117669094693 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 62.027005202913635 85L 62.027005202913635 47.6L 69.7117669094693 47.6L 69.7117669094693 47.6L 69.7117669094693 85L 69.7117669094693 85z"
                                                pathFrom="M 62.027005202913635 85L 62.027005202913635 85L 69.7117669094693 85L 69.7117669094693 85L 69.7117669094693 85L 62.027005202913635 85"
                                                cy="47.6" cx="69.7117669094693" j="6" val="44" barHeight="37.4"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1532"
                                                d="M 73.00523621227887 85L 73.00523621227887 74.8L 80.68999791883455 74.8L 80.68999791883455 74.8L 80.68999791883455 85L 80.68999791883455 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 73.00523621227887 85L 73.00523621227887 74.8L 80.68999791883455 74.8L 80.68999791883455 74.8L 80.68999791883455 85L 80.68999791883455 85z"
                                                pathFrom="M 73.00523621227887 85L 73.00523621227887 85L 80.68999791883455 85L 80.68999791883455 85L 80.68999791883455 85L 73.00523621227887 85"
                                                cy="74.8" cx="80.68999791883455" j="7" val="12" barHeight="10.2"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1533"
                                                d="M 83.98346722164412 85L 83.98346722164412 54.400000000000006L 91.6682289281998 54.400000000000006L 91.6682289281998 54.400000000000006L 91.6682289281998 85L 91.6682289281998 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 83.98346722164412 85L 83.98346722164412 54.400000000000006L 91.6682289281998 54.400000000000006L 91.6682289281998 54.400000000000006L 91.6682289281998 85L 91.6682289281998 85z"
                                                pathFrom="M 83.98346722164412 85L 83.98346722164412 85L 91.6682289281998 85L 91.6682289281998 85L 91.6682289281998 85L 83.98346722164412 85"
                                                cy="54.400000000000006" cx="91.6682289281998" j="8" val="36"
                                                barHeight="30.599999999999998" barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1534"
                                                d="M 94.96169823100936 85L 94.96169823100936 77.35L 102.64645993756504 77.35L 102.64645993756504 77.35L 102.64645993756504 85L 102.64645993756504 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 94.96169823100936 85L 94.96169823100936 77.35L 102.64645993756504 77.35L 102.64645993756504 77.35L 102.64645993756504 85L 102.64645993756504 85z"
                                                pathFrom="M 94.96169823100936 85L 94.96169823100936 85L 102.64645993756504 85L 102.64645993756504 85L 102.64645993756504 85L 94.96169823100936 85"
                                                cy="77.35" cx="102.64645993756504" j="9" val="9"
                                                barHeight="7.6499999999999995" barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1535"
                                                d="M 105.93992924037461 85L 105.93992924037461 39.1L 113.62469094693029 39.1L 113.62469094693029 39.1L 113.62469094693029 85L 113.62469094693029 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 105.93992924037461 85L 105.93992924037461 39.1L 113.62469094693029 39.1L 113.62469094693029 39.1L 113.62469094693029 85L 113.62469094693029 85z"
                                                pathFrom="M 105.93992924037461 85L 105.93992924037461 85L 113.62469094693029 85L 113.62469094693029 85L 113.62469094693029 85L 105.93992924037461 85"
                                                cy="39.1" cx="113.62469094693029" j="10" val="54" barHeight="45.9"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1536"
                                                d="M 116.91816024973986 85L 116.91816024973986 47.6L 124.60292195629553 47.6L 124.60292195629553 47.6L 124.60292195629553 85L 124.60292195629553 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 116.91816024973986 85L 116.91816024973986 47.6L 124.60292195629553 47.6L 124.60292195629553 47.6L 124.60292195629553 85L 124.60292195629553 85z"
                                                pathFrom="M 116.91816024973986 85L 116.91816024973986 85L 124.60292195629553 85L 124.60292195629553 85L 124.60292195629553 85L 116.91816024973986 85"
                                                cy="47.6" cx="124.60292195629553" j="11" val="44" barHeight="37.4"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1537"
                                                d="M 127.89639125910512 85L 127.89639125910512 74.8L 135.58115296566078 74.8L 135.58115296566078 74.8L 135.58115296566078 85L 135.58115296566078 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 127.89639125910512 85L 127.89639125910512 74.8L 135.58115296566078 74.8L 135.58115296566078 74.8L 135.58115296566078 85L 135.58115296566078 85z"
                                                pathFrom="M 127.89639125910512 85L 127.89639125910512 85L 135.58115296566078 85L 135.58115296566078 85L 135.58115296566078 85L 127.89639125910512 85"
                                                cy="74.8" cx="135.58115296566078" j="12" val="12" barHeight="10.2"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1538"
                                                d="M 138.87462226847035 85L 138.87462226847035 54.400000000000006L 146.559383975026 54.400000000000006L 146.559383975026 54.400000000000006L 146.559383975026 85L 146.559383975026 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 138.87462226847035 85L 138.87462226847035 54.400000000000006L 146.559383975026 54.400000000000006L 146.559383975026 54.400000000000006L 146.559383975026 85L 146.559383975026 85z"
                                                pathFrom="M 138.87462226847035 85L 138.87462226847035 85L 146.559383975026 85L 146.559383975026 85L 146.559383975026 85L 138.87462226847035 85"
                                                cy="54.400000000000006" cx="146.559383975026" j="13" val="36"
                                                barHeight="30.599999999999998" barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1539"
                                                d="M 149.85285327783558 85L 149.85285327783558 77.35L 157.53761498439124 77.35L 157.53761498439124 77.35L 157.53761498439124 85L 157.53761498439124 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 149.85285327783558 85L 149.85285327783558 77.35L 157.53761498439124 77.35L 157.53761498439124 77.35L 157.53761498439124 85L 157.53761498439124 85z"
                                                pathFrom="M 149.85285327783558 85L 149.85285327783558 85L 157.53761498439124 85L 157.53761498439124 85L 157.53761498439124 85L 149.85285327783558 85"
                                                cy="77.35" cx="157.53761498439124" j="14" val="9"
                                                barHeight="7.6499999999999995" barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1540"
                                                d="M 160.83108428720084 85L 160.83108428720084 39.1L 168.5158459937565 39.1L 168.5158459937565 39.1L 168.5158459937565 85L 168.5158459937565 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 160.83108428720084 85L 160.83108428720084 39.1L 168.5158459937565 39.1L 168.5158459937565 39.1L 168.5158459937565 85L 168.5158459937565 85z"
                                                pathFrom="M 160.83108428720084 85L 160.83108428720084 85L 168.5158459937565 85L 168.5158459937565 85L 168.5158459937565 85L 160.83108428720084 85"
                                                cy="39.1" cx="168.5158459937565" j="15" val="54" barHeight="45.9"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1541"
                                                d="M 171.80931529656607 85L 171.80931529656607 63.75L 179.49407700312173 63.75L 179.49407700312173 63.75L 179.49407700312173 85L 179.49407700312173 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 171.80931529656607 85L 171.80931529656607 63.75L 179.49407700312173 63.75L 179.49407700312173 63.75L 179.49407700312173 85L 179.49407700312173 85z"
                                                pathFrom="M 171.80931529656607 85L 171.80931529656607 85L 179.49407700312173 85L 179.49407700312173 85L 179.49407700312173 85L 171.80931529656607 85"
                                                cy="63.75" cx="179.49407700312173" j="16" val="25" barHeight="21.25"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1542"
                                                d="M 182.78754630593133 85L 182.78754630593133 28.9L 190.472308012487 28.9L 190.472308012487 28.9L 190.472308012487 85L 190.472308012487 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 182.78754630593133 85L 182.78754630593133 28.9L 190.472308012487 28.9L 190.472308012487 28.9L 190.472308012487 85L 190.472308012487 85z"
                                                pathFrom="M 182.78754630593133 85L 182.78754630593133 85L 190.472308012487 85L 190.472308012487 85L 190.472308012487 85L 182.78754630593133 85"
                                                cy="28.9" cx="190.472308012487" j="17" val="66" barHeight="56.1"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1543"
                                                d="M 193.76577731529656 85L 193.76577731529656 50.15L 201.45053902185222 50.15L 201.45053902185222 50.15L 201.45053902185222 85L 201.45053902185222 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 193.76577731529656 85L 193.76577731529656 50.15L 201.45053902185222 50.15L 201.45053902185222 50.15L 201.45053902185222 85L 201.45053902185222 85z"
                                                pathFrom="M 193.76577731529656 85L 193.76577731529656 85L 201.45053902185222 85L 201.45053902185222 85L 201.45053902185222 85L 193.76577731529656 85"
                                                cy="50.15" cx="201.45053902185222" j="18" val="41" barHeight="34.85"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1544"
                                                d="M 204.74400832466182 85L 204.74400832466182 9.350000000000009L 212.42877003121748 9.350000000000009L 212.42877003121748 9.350000000000009L 212.42877003121748 85L 212.42877003121748 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 204.74400832466182 85L 204.74400832466182 9.350000000000009L 212.42877003121748 9.350000000000009L 212.42877003121748 9.350000000000009L 212.42877003121748 85L 212.42877003121748 85z"
                                                pathFrom="M 204.74400832466182 85L 204.74400832466182 85L 212.42877003121748 85L 212.42877003121748 85L 212.42877003121748 85L 204.74400832466182 85"
                                                cy="9.350000000000009" cx="212.42877003121748" j="19" val="89"
                                                barHeight="75.64999999999999" barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1545"
                                                d="M 215.72223933402705 85L 215.72223933402705 31.450000000000003L 223.4070010405827 31.450000000000003L 223.4070010405827 31.450000000000003L 223.4070010405827 85L 223.4070010405827 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 215.72223933402705 85L 215.72223933402705 31.450000000000003L 223.4070010405827 31.450000000000003L 223.4070010405827 31.450000000000003L 223.4070010405827 85L 223.4070010405827 85z"
                                                pathFrom="M 215.72223933402705 85L 215.72223933402705 85L 223.4070010405827 85L 223.4070010405827 85L 223.4070010405827 85L 215.72223933402705 85"
                                                cy="31.450000000000003" cx="223.4070010405827" j="20" val="63"
                                                barHeight="53.55" barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1546"
                                                d="M 226.7004703433923 85L 226.7004703433923 63.75L 234.38523204994797 63.75L 234.38523204994797 63.75L 234.38523204994797 85L 234.38523204994797 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 226.7004703433923 85L 226.7004703433923 63.75L 234.38523204994797 63.75L 234.38523204994797 63.75L 234.38523204994797 85L 234.38523204994797 85z"
                                                pathFrom="M 226.7004703433923 85L 226.7004703433923 85L 234.38523204994797 85L 234.38523204994797 85L 234.38523204994797 85L 226.7004703433923 85"
                                                cy="63.75" cx="234.38523204994797" j="21" val="25" barHeight="21.25"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1547"
                                                d="M 237.67870135275754 85L 237.67870135275754 47.6L 245.3634630593132 47.6L 245.3634630593132 47.6L 245.3634630593132 85L 245.3634630593132 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 237.67870135275754 85L 237.67870135275754 47.6L 245.3634630593132 47.6L 245.3634630593132 47.6L 245.3634630593132 85L 245.3634630593132 85z"
                                                pathFrom="M 237.67870135275754 85L 237.67870135275754 85L 245.3634630593132 85L 245.3634630593132 85L 245.3634630593132 85L 237.67870135275754 85"
                                                cy="47.6" cx="245.3634630593132" j="22" val="44" barHeight="37.4"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1548"
                                                d="M 248.6569323621228 85L 248.6569323621228 74.8L 256.34169406867846 74.8L 256.34169406867846 74.8L 256.34169406867846 85L 256.34169406867846 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 248.6569323621228 85L 248.6569323621228 74.8L 256.34169406867846 74.8L 256.34169406867846 74.8L 256.34169406867846 85L 256.34169406867846 85z"
                                                pathFrom="M 248.6569323621228 85L 248.6569323621228 85L 256.34169406867846 85L 256.34169406867846 85L 256.34169406867846 85L 248.6569323621228 85"
                                                cy="74.8" cx="256.34169406867846" j="23" val="12" barHeight="10.2"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1549"
                                                d="M 259.63516337148803 85L 259.63516337148803 54.400000000000006L 267.3199250780437 54.400000000000006L 267.3199250780437 54.400000000000006L 267.3199250780437 85L 267.3199250780437 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 259.63516337148803 85L 259.63516337148803 54.400000000000006L 267.3199250780437 54.400000000000006L 267.3199250780437 54.400000000000006L 267.3199250780437 85L 267.3199250780437 85z"
                                                pathFrom="M 259.63516337148803 85L 259.63516337148803 85L 267.3199250780437 85L 267.3199250780437 85L 267.3199250780437 85L 259.63516337148803 85"
                                                cy="54.400000000000006" cx="267.3199250780437" j="24" val="36"
                                                barHeight="30.599999999999998" barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1550"
                                                d="M 270.61339438085326 85L 270.61339438085326 77.35L 278.2981560874089 77.35L 278.2981560874089 77.35L 278.2981560874089 85L 278.2981560874089 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 270.61339438085326 85L 270.61339438085326 77.35L 278.2981560874089 77.35L 278.2981560874089 77.35L 278.2981560874089 85L 278.2981560874089 85z"
                                                pathFrom="M 270.61339438085326 85L 270.61339438085326 85L 278.2981560874089 85L 278.2981560874089 85L 278.2981560874089 85L 270.61339438085326 85"
                                                cy="77.35" cx="278.2981560874089" j="25" val="9"
                                                barHeight="7.6499999999999995" barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1551"
                                                d="M 281.5916253902185 85L 281.5916253902185 63.75L 289.27638709677416 63.75L 289.27638709677416 63.75L 289.27638709677416 85L 289.27638709677416 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 281.5916253902185 85L 281.5916253902185 63.75L 289.27638709677416 63.75L 289.27638709677416 63.75L 289.27638709677416 85L 289.27638709677416 85z"
                                                pathFrom="M 281.5916253902185 85L 281.5916253902185 85L 289.27638709677416 85L 289.27638709677416 85L 289.27638709677416 85L 281.5916253902185 85"
                                                cy="63.75" cx="289.27638709677416" j="26" val="25" barHeight="21.25"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1552"
                                                d="M 292.5698563995837 85L 292.5698563995837 47.6L 300.2546181061394 47.6L 300.2546181061394 47.6L 300.2546181061394 85L 300.2546181061394 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 292.5698563995837 85L 292.5698563995837 47.6L 300.2546181061394 47.6L 300.2546181061394 47.6L 300.2546181061394 85L 300.2546181061394 85z"
                                                pathFrom="M 292.5698563995837 85L 292.5698563995837 85L 300.2546181061394 85L 300.2546181061394 85L 300.2546181061394 85L 292.5698563995837 85"
                                                cy="47.6" cx="300.2546181061394" j="27" val="44" barHeight="37.4"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1553"
                                                d="M 303.54808740894896 85L 303.54808740894896 74.8L 311.2328491155046 74.8L 311.2328491155046 74.8L 311.2328491155046 85L 311.2328491155046 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 303.54808740894896 85L 303.54808740894896 74.8L 311.2328491155046 74.8L 311.2328491155046 74.8L 311.2328491155046 85L 311.2328491155046 85z"
                                                pathFrom="M 303.54808740894896 85L 303.54808740894896 85L 311.2328491155046 85L 311.2328491155046 85L 311.2328491155046 85L 303.54808740894896 85"
                                                cy="74.8" cx="311.2328491155046" j="28" val="12" barHeight="10.2"
                                                barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1554"
                                                d="M 314.52631841831425 85L 314.52631841831425 54.400000000000006L 322.2110801248699 54.400000000000006L 322.2110801248699 54.400000000000006L 322.2110801248699 85L 322.2110801248699 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 314.52631841831425 85L 314.52631841831425 54.400000000000006L 322.2110801248699 54.400000000000006L 322.2110801248699 54.400000000000006L 322.2110801248699 85L 322.2110801248699 85z"
                                                pathFrom="M 314.52631841831425 85L 314.52631841831425 85L 322.2110801248699 85L 322.2110801248699 85L 322.2110801248699 85L 314.52631841831425 85"
                                                cy="54.400000000000006" cx="322.2110801248699" j="29" val="36"
                                                barHeight="30.599999999999998" barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1555"
                                                d="M 325.5045494276795 85L 325.5045494276795 77.35L 333.18931113423514 77.35L 333.18931113423514 77.35L 333.18931113423514 85L 333.18931113423514 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 325.5045494276795 85L 325.5045494276795 77.35L 333.18931113423514 77.35L 333.18931113423514 77.35L 333.18931113423514 85L 333.18931113423514 85z"
                                                pathFrom="M 325.5045494276795 85L 325.5045494276795 85L 333.18931113423514 85L 333.18931113423514 85L 333.18931113423514 85L 325.5045494276795 85"
                                                cy="77.35" cx="333.18931113423514" j="30" val="9"
                                                barHeight="7.6499999999999995" barWidth="7.684761706555671"></path>
                                            <path id="SvgjsPath1556"
                                                d="M 336.4827804370447 85L 336.4827804370447 39.1L 344.1675421436004 39.1L 344.1675421436004 39.1L 344.1675421436004 85L 344.1675421436004 85z"
                                                fill="rgba(114,103,239,0.85)" fill-opacity="1" stroke-opacity="1"
                                                stroke-linecap="square" stroke-width="0" stroke-dasharray="0"
                                                class="apexcharts-bar-area" index="0"
                                                clip-path="url(#gridRectMaskys090bzig)"
                                                pathTo="M 336.4827804370447 85L 336.4827804370447 39.1L 344.1675421436004 39.1L 344.1675421436004 39.1L 344.1675421436004 85L 344.1675421436004 85z"
                                                pathFrom="M 336.4827804370447 85L 336.4827804370447 85L 344.1675421436004 85L 344.1675421436004 85L 344.1675421436004 85L 336.4827804370447 85"
                                                cy="39.1" cx="344.1675421436004" j="31" val="54" barHeight="45.9"
                                                barWidth="7.684761706555671"></path>
                                        </g>
                                        <g id="SvgjsG1524" class="apexcharts-datalabels" data:realIndex="0"></g>
                                    </g>
                                    <line id="SvgjsLine1577" x1="-10.43741935483871" y1="0" x2="350.7625806451613"
                                        y2="0" stroke="#b6b6b6" stroke-dasharray="0" stroke-width="1"
                                        class="apexcharts-ycrosshairs"></line>
                                    <line id="SvgjsLine1578" x1="-10.43741935483871" y1="0" x2="350.7625806451613"
                                        y2="0" stroke-dasharray="0" stroke-width="0"
                                        class="apexcharts-ycrosshairs-hidden"></line>
                                    <g id="SvgjsG1579" class="apexcharts-yaxis-annotations"></g>
                                    <g id="SvgjsG1580" class="apexcharts-xaxis-annotations"></g>
                                    <g id="SvgjsG1581" class="apexcharts-point-annotations"></g>
                                </g>
                                <rect id="SvgjsRect1518" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1"
                                    stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe"></rect>
                                <g id="SvgjsG1565" class="apexcharts-yaxis" rel="0" transform="translate(-18, 0)"></g>
                                <g id="SvgjsG1512" class="apexcharts-annotations"></g>
                            </svg>
                            <div class="apexcharts-legend" style="max-height: 42.5px;"></div>
                            <div class="apexcharts-tooltip apexcharts-theme-light">
                                <div class="apexcharts-tooltip-series-group" style="order: 1;"><span
                                        class="apexcharts-tooltip-marker"
                                        style="background-color: rgb(114, 103, 239);"></span>
                                    <div class="apexcharts-tooltip-text"
                                        style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
                                        <div class="apexcharts-tooltip-y-group"><span
                                                class="apexcharts-tooltip-text-label"></span><span
                                                class="apexcharts-tooltip-text-value"></span></div>
                                        <div class="apexcharts-tooltip-z-group"><span
                                                class="apexcharts-tooltip-text-z-label"></span><span
                                                class="apexcharts-tooltip-text-z-value"></span></div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                                <div class="apexcharts-yaxistooltip-text"></div>
                            </div>
                        </div>
                    </div>
                    <div class="resize-triggers">
                        <div class="expand-trigger">
                            <div style="width: 362px; height: 30px;"></div>
                        </div>
                        <div class="contract-trigger"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card feed-card">
                    <div class="card-header py-3">
                        <span class="fw-bold">RESPONSABLES</span>
                    </div>
                    <div class="card-body py-3" v-for="person in persons" :key="person.per_id">
                        <div class="row rounded" style="background-color: #F0F7FF;">
                            <span><i class="material-icons-two-tone text-primary">person</i>{{ person.nat_nombres }} {{
                            person.nat_apellido_paterno }} {{ person.nat_apellido_materno }}</span>
                            <br>
                            <span><i class="material-icons-two-tone text-primary">call</i> {{ person.nat_telefono
                                }}</span>
                            <br>
                            <span><i class="material-icons-two-tone text-primary">mail</i> {{ person.nat_correo
                                }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 ">
                <div class="card feed-card">
                    <div class="card-header py-3">
                        <span class="fw-bold">DOCUMENTOS - HISTORIAL</span>
                    </div>
                    <div class="card-body py-3">
                        <div class="mb-3"><i class="material-icons-two-tone text-primary"><span class="material-symbols-outlined">
                                    backup_table
                                </span></i> Contiene 5 archivos
                        </div>
                        <div class="mt-3"><i class="material-icons-two-tone text-primary"><span class="material-symbols-outlined">
                                    history
                                </span></i> Tienes {{ count_obs }} observaciones
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Datos Generales</h5>
                    </div>
                    <div v-if="trade && trade.tra_id">
                        <div class="card-body">
                            <div class="row py-2">
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-xl-5 col-sm-4 fw-bold">
                                            Expediente N°
                                        </div>
                                        <div class="col-xl-7 col-sm-8 fw-bold">
                                            : {{ trade.tra_number }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Nombre
                                        </div>
                                        <div class="col-xl-7 col-sm-8">
                                            : {{ trade.tra_name }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Asunto
                                        </div>
                                        <div class="col-xl-7 col-sm-8">
                                            : {{ trade.tra_matter }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Fecha de llegada
                                        </div>
                                        <div class="col-xl-7 col-sm-8">
                                            : {{ trade.tra_arrival_date }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Oficina de origen
                                        </div>
                                        <div class="col-xl-7 col-sm-8">
                                            : {{ trade.area.are_name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Estado
                                        </div>
                                        <div v-if="trade.tra_state_law === 'P'" class="col-xl-7 col-sm-8">
                                            : Pendiente
                                        </div>
                                        <div v-else class="col-xl-7 col-sm-8">
                                            : Finalizado
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Estado
                                        </div>
                                        <div class="col-xl-7 col-sm-8">
                                            : DATA
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Expediente de recepción
                                        </div>
                                        <div v-if="trade.tra_number_ext != null" class="col-xl-7 col-sm-8">
                                            : {{ trade.tra_number_ext }}
                                        </div>
                                        <div v-else class="col-xl-7 col-sm-8">
                                            : No se registro
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Oficio de recepción
                                        </div>
                                        <div v-if="trade.tra_doc_recep != null" class="col-xl-7 col-sm-8">
                                            : {{ trade.tra_doc_recep }}
                                        </div>
                                        <div v-else class="col-xl-7 col-sm-8">
                                            : No se registró
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Responsables</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover" id="table" ref="myDataTable">
                                <thead>
                                    <tr>
                                        <th>DNI</th>
                                        <th>Nombres</th>
                                        <th>Correo</th>
                                        <th>Teléfono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="person in persons" :key="person.per_id">
                                        <td>{{ person.nat_dni }}</td>
                                        <td>{{ person.nat_nombres }}</td>
                                        <td>{{ person.nat_correo || '---' }}</td>
                                        <td>{{ person.nat_telefono || '---' }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>-->
    </div>
</template>

<script>
import feather from "feather-icons";
import DataTable from '@/utils/dataTable';
import moment from 'moment';

export default {
    mixins: [DataTable],
    data() {
        return {
            dataTable: null,
            trade: null,
            count_obs: 0,
            persons: [],
            formattedDate: "",
            id: '',
        };
    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
        this.cargarDetallesOficio();
    },
    created() {
        this.sector = this.$store.getters.get__sector;
        this.id = this.$route.params.id;
    },
    methods: {
        async cargarDetallesOficio() {
            try {
                const response = await this.$getData(`trade/${this.id}`, this);
                this.trade = response.trade;
                this.persons = this.trade.persons;
                this.count_obs = this.trade.observations.length;
                await this.$waitForDataTableDraw(this, 'myDataTable');
                this.formatDate();
                this.initDataTable();
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar detalles del expediente administrativo ', this.id);
            }
        },
        formatDate() {
            this.formattedDate = moment(this.trade.tra_arrival_date).format('DD MMM YYYY');
        },

        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>