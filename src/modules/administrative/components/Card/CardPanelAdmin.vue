<template>
    <section>
        <div class="row">
            <div class="col-xl-12 col-md-12">
                <span class="text-primary fw-bold d-flex align-items-center"><i class="material-icons-two-tone text-primary mb-1">menu</i>MENU</span>
                <div class="card flat-card">
                    <div class="row-table">
                        <div class="col-sm-6 py-2 card-body br">
                            <router-link to="oficio/registro" class="text-dark">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <i class="material-icons-two-tone text-primary mb-1">note_add</i>
                                    </div>
                                    <div class="col-sm-8">
                                        <span>REGISTRAR</span>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div class="col-sm-6 py-2 card-body br">
                            <router-link to="oficio/buscar" class="text-dark">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <i class="material-icons-two-tone text-primary mb-1">find_in_page</i>
                                    </div>
                                    <div class="col-sm-8">
                                        <span>BUSCAR</span>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div class="col-sm-6 py-2 card-body br">
                            <router-link to="#" class="text-dark">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <i class="material-icons-two-tone text-primary mb-1">gavel</i>
                                    </div>
                                    <div class="col-sm-8">
                                        <span>ABOGADOS</span>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div class="col-sm-6 py-2 card-body br">
                            <router-link to="#" class="text-dark">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <i class="material-icons-two-tone text-primary mb-1">person</i>
                                    </div>
                                    <div class="col-sm-8">
                                        <span>ASISTENTES</span>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-xl-12 col-md-12">
                <span class="text-primary fw-bold d-flex align-items-center"><i class="material-icons-two-tone text-primary mb-1">notifications</i>NOTIFICACIONES</span>
                <div class="card flat-card">
                    <div class="row-table">
                        <div class="col-sm-6 py-2 card-body br">
                            <a href="#" class="text-dark">
                                <span class="text-dark fw-bold"> 
                                    ABOGADOS
                                </span>
                                <p v-show="numbertradesObsAbo === 0" class="mb-3 mt-3 text-success"><i data-feather="check-circle"></i> No hay expedientes por atender</p>
                                <p v-show="numbertradesObsAbo !== 0" class="mb-3 mt-3 text-warning"><i data-feather="alert-circle"></i> Hay {{ numbertradesObsAbo }} expedientes por atender</p>
                            </a>
                        </div>
                        <div class="col-sm-6 py-2 card-body br">
                            <a href="#" class="text-dark">
                                <span class="text-dark fw-bold"> 
                                    ASISTENTES
                                </span>
                                <p v-show="numbertradesObsAss === 0" class="mb-3 mt-3 text-success"><i data-feather="check-circle"></i> No hay expedientes por atender</p>
                                <p v-show="numbertradesObsAss !== 0" class="mb-3 mt-3 text-warning"><i data-feather="alert-circle"></i> Hay {{ numbertradesObsAss }} expedientes por atender</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-xl-12 col-md-12">
                <span class="text-primary fw-bold d-flex align-items-center"><i class="material-icons-two-tone text-primary mb-1">folder</i>RESUMEN DE EXPEDIENTES</span>
                <div class="card flat-card">
                    <div class="row-table">
                        <div class="col-sm-6 card-body br">
                            <a href="javascript:void(0)" class="text-dark" @click="tradeTotal">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <i class="material-icons-two-tone text-primary mb-1">computer</i>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>{{ trades.length }}</h5>
                                        <span>DOCUMENTOS REGISTRADOS EN EL SISTEMA</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-sm-6 card-body br">
                            <a href="javascript:void(0)" class="text-dark" @click="tradePendienteAbogados">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <i class="material-icons-two-tone text-primary mb-1">assignment_ind</i>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>{{ numbertradesPendAbogados }}</h5>
                                        <span>DOCUMENTOS DERIVADOS A ABOGADOS</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-sm-6 card-body br">
                            <a href="javascript:void(0)" class="text-dark" @click="tradePendienteAsistentes">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <i class="material-icons-two-tone text-primary mb-1">contact_page</i>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>{{ numbertradesPendAsistentes }}</h5>
                                        <span>DOCUMENTOS DERIVADOS A ASISTENTES</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="row-table">
                        <div class="col-sm-6 card-body br">
                            <a href="javascript:void(0)" class="text-dark" @click="tradeInfAdi">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <i class="material-icons-two-tone text-primary mb-1">snippet_folder</i>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>{{ numbertradesInfAdi }}</h5>
                                        <span>DOCUMENTOS DERIVADOS A OTRA ÁREA PARA INFORMACIÓN</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-sm-6 card-body br">
                            <a href="javascript:void(0)" class="text-dark" @click="tradeTerminado">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <i class="material-icons-two-tone text-primary mb-1">text_snippet</i>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>{{ numbertradesFin }}</h5>
                                        <span>DOCUMENTOS ATENDIDOS (CON INFORME)</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-sm-6 card-body br">
                            <a href="javascript:void(0)" class="text-dark" @click="tradeRevInmediata">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <i class="material-icons-two-tone text-primary mb-1">watch_later</i>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>{{ numbertradesTradios }}</h5>
                                        <span>¡ DOCUMENTOS CON RETRASO DE ATENCIÓN !</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import feather from 'feather-icons';
import { getData, postData } from '@/utils/fetchData';
import axios from 'axios';
export default {
    name: 'CardPanelAdmin',

    created() {
        this.listTrades();
    },

    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
    },

    data() {
        return {
            trades: [],
            numbertradesPendAbogados: 0,
            numbertradesPendAsistentes: 0,
            numbertradesInfAdi: 0,
            numbertradesFin: 0,
            numbertradesTradios: 0,
            numbertradesObsAbo: 0,
            numbertradesObsAss: 0,
        }
    },

    methods: {
        async listTrades() {
            try {
                const result = await getData('trade', this);
                this.trades = result.data;
                const tradesPendAbogados = this.trades.filter(trade => trade.tra_state_law === 'P' && trade.tra_type_person === 'ABOGADO');
                const tradesPendAsistentes = this.trades.filter(trade => trade.tra_state_law === 'P' && trade.tra_type_person === 'ASISTENTE');
                this.numbertradesPendAbogados = tradesPendAbogados.length;
                this.numbertradesPendAsistentes = tradesPendAsistentes.length;
                const tradesFin = this.trades.filter(trade => trade.tra_state_law === 'F');
                this.numbertradesFin = tradesFin.length;
                const tradesInfAdi = this.trades.filter(trade => trade.tra_state_mp === 'V');
                this.numbertradesInfAdi = tradesInfAdi.length;
                const tradesObsAbo = this.trades.filter(trade => trade.tra_obs === 'V' && trade.tra_type_person === 'ABOGADO');
                this.numbertradesObsAbo = tradesObsAbo.length;
                const tradesObsAss = this.trades.filter(trade => trade.tra_obs === 'V' && trade.tra_type_person === 'ASISTENTE');
                this.numbertradesObsAss = tradesObsAss.length;
                //Trades Tardes
                // Obtener la fecha actual
                const currentDate = new Date();

                // Filtrar trades que tienen una diferencia de más de 15 días
                const tradesTardios = this.trades.filter(trade => {
                    const arrivalDate = new Date(trade.tra_arrival_date);
                    const differenceInDays = Math.floor((currentDate - arrivalDate) / (1000 * 60 * 60 * 24));
                    return differenceInDays > 15;
                });

                this.numbertradesTradios = tradesTardios.length;

            } catch (error) {
                this.$handleApiError(error, 'listar trades');
            } finally{
                this.$closeLoadingAlert();
            }
        },

        tradeTotal() {
            this.$router.push({ name: 'trade/lista', params: { tipo_tra: '' } });
        },
        tradePendienteAbogados() {
            this.$router.push({ name: 'trade/lista', params: { tipo_tra: 'pendAbogado' } });
        },
        tradePendienteAsistentes() {
            this.$router.push({ name: 'trade/lista', params: { tipo_tra: 'pendAsistente' } });
        },
        tradeInfAdi() {
            this.$router.push({ name: 'trade/lista', params: { tipo_tra: 'infoAdi' } });
        },
        tradeTerminado() {
            this.$router.push({ name: 'trade/lista', params: { tipo_tra: 'terminado' } });
        },
        tradeRevInmediata() {
            this.$router.push({ name: 'trade/lista', params: { tipo_tra: 'revInmediata' } });
        },
    }


}

</script>

<style scoped>
.tarjet {
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.card-body:hover {
    /* transform: scale(1.010); */
    background-color: #f7f7f8 !important;
    transition: 0.25s;
    /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
}

@media (min-width: 768px) {
    .tarjet {
        height: 100px !important;
    }

    .tarjeta-data {
        margin-top: -7.5px;
    }

    .tarjeta-data-4 {
        margin-top: 5px;
    }

    .row-link {
        border-right: 1px solid #e1e1e1;
    }
}

@media (max-width: 768px) {
    .row-link {
        border-bottom: 1px solid #e1e1e1;
    }
}
</style>