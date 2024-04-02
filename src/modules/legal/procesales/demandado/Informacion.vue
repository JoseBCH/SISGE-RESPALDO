<template>
    <section class="pc-container pb-4">
        <div class="pcoded-content pt-4">
            <div class="row mb-3 pt-0">
                <div class="d-flex align-items-center">
                    <h5 class="text-dark fw-bold">Detalle del Demandado</h5>
                    <button @click="goBack" class="btn btn-lg btn-secondary px-3 ml-auto">
                        <i data-feather="arrow-left"></i> Volver atras
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card shadow ">
                        <div class="card-header py-3">
                            <div class="row">
                                <div class="col md-6">
                                    <h5 class="mt-2">Informacion Personal del demandado</h5>
                                </div>
                                <div class="col-md-6 d-flex">

                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row px-4">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-4 data">
                                            <div class="input-group">
                                                <span class="input-group-text">
                                                    DNI/RUC::
                                                </span>
                                                <input type="text" class="form-control" v-model="documento">
                                            </div>
                                        </div>
                                        <div class="col-md-4 data">
                                            <div class="input-group">
                                                <span class="input-group-text">
                                                    <img src="@/assets/images/user.svg" alt="">
                                                </span>
                                                <input type="text" class="form-control" v-model="nombreCompleto">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="input-group">
                                                <span class="input-group-text">
                                                    <img src="@/assets/images/mail.svg" alt="">
                                                </span>
                                                <input type="text" class="form-control" v-model="correo">
                                            </div>
                                        </div>
                                       
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-3 data">
                                            <div class="input-group">
                                                <span class="input-group-text">
                                                    <img src="@/assets/images/map.svg" alt="">
                                                </span>
                                                <input type="text" class="form-control" v-model="direccion.dep_nombre">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="input-group">
                                                <span class="input-group-text">
                                                    <img src="@/assets/images/map-pin.svg" alt="">
                                                </span>
                                                <input type="text" class="form-control" v-model="provinciaDistrito">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="input-group">
                                                <span class="input-group-text">
                                                    <img src="@/assets/images/home-24.svg" alt="">
                                                </span>
                                                <input type="text" class="form-control" v-model="direccion.dir_calle_av">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="input-group">
                                                <span class="input-group-text">
                                                    <img src="@/assets/images/phone-call.svg" alt="">
                                                </span>
                                                <input type="text" class="form-control" v-model="telefono">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Historial></Historial>
        </div>
    </section>
</template>
<script>

import feather from 'feather-icons';
import Historial from './Historial.vue'

export default {
    components: {
        Historial
    },
    props: ['doc'],
    name: 'expedienteAll',
    created() {
        this.cargarDetallesdemandado();
    },
    data() {
        return {
            persona: [],
            direccion: [],
            nombreCompleto: null,
            provinciaDistrito: null,
            correo: null,
            telefono: null,
            documento:null
        };
    },

    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
    },

    methods: {
        async cargarDetallesdemandado() {
            try {
                this.$showLoadingAlert();
                const response = await this.$axios.get(`${this.$store.getters.get__url}/demandante/detalledemandante/${this.doc}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.get__token}`,
                    },
                });
               
                this.persona = response.data.data.persona;
                this.direccion = response.data.data.direccion;
                if (this.persona.tipo_persona === 'NATURAL') {
                    this.nombreCompleto = `${this.persona.nat_nombres} ${this.persona.nat_apellido_paterno} ${this.persona.nat_apellido_materno}`;
                    this.provinciaDistrito = `${this.direccion.pro_nombre} / ${this.direccion.dis_nombre}`;
                    this.telefono = this.persona.nat_telefono;
                    this.correo = this.persona.nat_correo;
                    this.documento=this.persona.nat_dni;
                } else {
                    this.nombreCompleto = this.persona.jur_razon_social;
                    this.provinciaDistrito = `${this.direccion.pro_nombre} / ${this.direccion.dis_nombre}`;
                    this.telefono = this.persona.jur_telefono;
                    this.correo = this.persona.jur_correo;
                    this.documento=this.persona.jur_ruc;
                }
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar detalles demandado');
            }
        },

        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped>
.info {
    border-left: 7.5px solid #7267EF;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #7267EF;
}

.avatar-title {
    justify-content: center;
    align-items: center;
    color: #f7f7f7;
    font-size: 48px;
    font-weight: 500;
}

.input-group-text {
    background: none !important;
    border: none !important;
    padding: 0px;
}

.form-control {
    background: none !important;
    border: none !important;
    padding-top: 10px;
    padding-bottom: 5px;
}

p {
    margin: 0;
    padding: 2.5px 0;
    font-size: 15px;
    line-height: 25px;
    color: black;
}
</style>
