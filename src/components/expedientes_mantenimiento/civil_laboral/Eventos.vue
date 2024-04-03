<template>
    <section class="pc-container pb-4">
        <div class="pcoded-content">
            <!-- <div class="page-header">
                <div class="page-block">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <div class="page-header-title">
                                <h5 class="m-b-10">Alertas</h5>
                            </div>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <router-link to="/sisge">Inicio</router-link>
                                </li>
                                <li class="breadcrumb-item">Registrar nueva alerta</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="row mb-4">
                <h5 class="text-dark fw-bold">Registro de Eventos</h5>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card shadow">
                        <div class="card-header border-0 mb-0">
                            <div class="row tabs">
                                <div class="col-md-auto tabs-div">
                                    <a href="javascript:void(0)" class="btn btn-lg rounded tabs-link" @click="mostrarAlerta"
                                        :class="{ active: showalerta === true }">Agendar Alerta</a>
                                </div>
                                <div class="col-md-auto tabs-div">
                                    <a href="javascript:void(0)" class="btn btn-lg rounded tabs-link"
                                        @click="mostrarAudiencia" :class="{ active: showaudiencia === true }">Agendar
                                        Audiencia</a>
                                </div>
                            </div>
                        </div>
                        <div v-show="showalerta === true">
                            <div class="card-body py-0 my-0">
                                <div class="row mb-3 mt-0">
                                    <div class="col-md-12">
                                        <div class="badge bg-light-primary w-100 rounded py-3 px-4 d-flex text-start"
                                            style="font-size: 12px;">
                                            Datos para añadir una nueva alerta.
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-4 col-md-8 col-sm-12">
                                        <div class="form-group">
                                            <label class="form-label">N° Expediente</label>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <input type="text" class="form-control border-0" v-model="expediente"
                                                        disabled>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-md-8 col-sm-12">
                                        <div class="form-group">
                                            <label class="form-label">Demandande</label>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <input type="text" class="form-control border-0" v-model="demandante"
                                                        disabled>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-md-8 col-sm-12">
                                        <div class="form-group">
                                            <label class="form-label">Demandado</label>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <input type="text" class="form-control border-0"
                                                        placeholder="N° Expediente" v-model="demandado" disabled>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Fecha de vencimiento</label>
                                            <input v-model="alerta.ale_fecha_vencimiento" type="date" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label class="form-label" for="Detalles">Detalles o notas sobre la
                                                alerta</label>
                                            <input v-model="alerta.ale_descripcion" type="text" class="form-control">

                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="row">
                                    <div class="form-group">
                                        <label class="form-label" for="Detalles">Detalles o notas sobre la alerta</label>
                                        <textarea class="form-control" id="Detalles"
                                            v-model="alerta.ale_descripcion"></textarea>
                                    </div>
                                </div> -->
                            </div>
                            <div class="card-footer border-0 pt-1">
                                <div class="row">
                                    <div class="d-flex justify-content-end">
                                        <!-- <div  class="text-danger mt-3">
                                            Complete todos los campos.
                                        </div> -->
                                        <button @click="goBack" class="btn btn-lg btn-secondary px-3 mx-2">
                                            <i data-feather="arrow-left"></i> Volver atras
                                        </button>
                                        <button @click="guardarAlerta" class="btn btn-lg btn-primary  px-4">Guardar
                                            Alerta</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-show="showaudiencia === true">
                            <div class="card-body py-0 my-0">
                                <div class="row mb-3 mt-0">
                                    <div class="col-md-12">
                                        <div class="badge bg-light-primary w-100 rounded py-3 px-4 d-flex text-start"
                                            style="font-size: 12px;">
                                            Datos para añadir una nueva audiencia.
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">N° Expediente</label>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <input type="text" class="form-control border-0" v-model="expediente"
                                                        disabled>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Demandande</label>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <input type="text" class="form-control border-0" v-model="demandante"
                                                        disabled>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Demandado</label>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <input type="text" class="form-control border-0"
                                                        placeholder="N° Expediente" v-model="demandado" disabled>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Lugar</label>
                                            <input type="text" disabled v-model="audiencia.au_lugar"
                                                class="form-control border-0">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label" for="NumeroExpediente">Hora</label>
                                            <input type="time" v-model="audiencia.au_hora" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Fecha</label>
                                            <input v-model="audiencia.au_fecha" type="date" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group">
                                        <label class="form-label" for="Detalles">Detalles o notas a tomar en cuenta para la
                                            audiencia</label>
                                        <textarea class="form-control" id="Detalles"
                                            v-model="audiencia.au_detalles"></textarea>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="form-group text-secondary">
                                        <label class="form-label" for="Detalles">Enlace de reunión si la
                                            audiencia es Virtual</label>
                                        <input type="text" class="form-control" id="Detalles" v-model="audiencia.au_link">
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer border-0 pt-1">
                                <div class="row">
                                    <div class="d-flex justify-content-end">
                                        <!-- <div  class="text-danger mt-3">
                                            Complete todos los campos.
                                        </div> -->
                                        <button @click="goBack" class="btn btn-lg btn-secondary px-3 mx-2">
                                            <i data-feather="arrow-left"></i> Volver atras
                                        </button>
                                        <button @click="guardarAudiencia" class="btn btn-lg btn-primary px-4">Guardar
                                            Audiencia</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import feather from 'feather-icons';
export default {
    props: ['id'],
    data() {
        return {
            alerta: {
                exp_id: "",
                ale_fecha_vencimiento: "",
                ale_descripcion: ""
            },
            audiencia: {
                per_id: "",
                exp_id: "",
                au_fecha: "",
                au_hora: "",
                au_detalles: "",
                au_lugar: "",
                au_link: ""
            },
            expediente: null,
            demandante: null,
            demandado: null,
            pretencion: null,
            juzgado: null,
            showalerta: false,
            showaudiencia: false
        }
    },
    created() {
        // this.buscar();
        this.mostrarAlerta();
    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
        this.cagarDatosDelExpediente();
    },
    methods: {


        mostrarAlerta() {
            this.showalerta = true;
            this.showaudiencia = false;
            console.log(this.showalerta);
        },

        mostrarAudiencia() {
            this.showaudiencia = true;
            this.showalerta = false;
        },
        getNombreCompleto(procesal) {
            return `${procesal.nombres} ${procesal.apellido_paterno} ${procesal.apellido_materno}`;
        },
        async cagarDatosDelExpediente() {
            try {
                this.$showLoadingAlert();
                const params = {
                    "exp_id": this.$route.params.id
                }
                const response = await this.$postData('proceeding/buscarPorId', this, params);
                this.expediente = response.data.numero;
                const procesal = response.data.procesal[0];
                if (procesal.tipo_procesal === 'DEMANDANTE') {
                    this.demandado = 'UNPRG';
                    if (response.data.multiple == 0) {
                        if (procesal.tipo_persona == 'NATURAL') {
                            this.demandante = this.getNombreCompleto(procesal);
                        } else {
                            this.demandante = procesal.razon_social;
                        }
                    } else {
                        this.demandante = "Demanda Colectiva";
                    }

                } else {
                    if (response.data.multiple == 0) {
                        if (procesal.tipo_persona == 'NATURAL') {
                            this.demandado = this.getNombreCompleto(procesal);
                        } else {
                            this.demandado = procesal.razon_social;
                        }
                    } else {
                        this.demandado = "Demanda Colectiva";
                    }

                    this.demandante = 'UNPRG';
                }
                this.audiencia.exp_id = response.data.exp_id;
                this.audiencia.per_id = response.data.procesal[0].per_id;
                this.alerta.exp_id = response.data.exp_id;
                this.audiencia.au_lugar = response.data.juzgado;
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar datos del expediente');
            }
        },
        async guardarAlerta() {
            try {
                this.$showLoadingAlert();
                const response = await this.$postData('alerta/store', this, this.alerta);
                if (response.state === 0) {
                    console.log(response);
                    this.$router.push({ path: '/expediente/busqueda' });
                } else {
                    alert('Datos no Registrados');
                }
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar datos del expediente');
            }
        },
        async guardarAudiencia() {
            try {
                this.$showLoadingAlert();
                const response = await this.$postData('audiences/store', this, this.audiencia);
                if (response.state === 0) {
                    console.log(response);
                    this.$router.push({ path: '/expediente/busqueda' });
                } else {
                    alert('Datos no Registrados');
                }
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar datos del expediente');
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
@media(max-width: 768px) {
    .tabs {
        display: flex !important;
    }
}

.tabs-link {
    border: 2px solid;
    border-color: #F0F0F0;
    width: 12.5em;
    color: #6c757d;
    border-radius: 4px;
}

.tabs-div>.active {
    background-color: #7267EF;
    font-weight: 700;
    outline: none;
    color: white;
    border-color: #7267EF;
}

.has-error {
    border: 1px solid #EA4D4D;
}

.error-message {
    padding-left: 15px;
    color: #EA4D4D;
    font-size: 12px;
}
</style>