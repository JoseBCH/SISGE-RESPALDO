<template>
    <section class="pc-container pb-4">
        <div class="pcoded-content">
            <div class="row mb-4">
                <h5 class="text-dark fw-bold">Registrar Historial</h5>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card shadow">
                        <div class="card-header">
                            <h5>Datos de registro</h5>
                        </div>
                        <div class="card-body pb-0">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="NumeroExpediente">N° Expediente</label>
                                        <select class="form-control" id="NumeroExpediente" v-model="historial.exp_id">
                                            <option value="" disabled selected>--Seleccionar</option>
                                            <option v-for="expediente in expedientes" :value="expediente.exp_id">
                                                {{ expediente.exp_numero }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Demandante</label>
                                        <input type="text" v-model="demandante" class="form-control border-0" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Fecha</label>
                                        <input v-model="historial.his_fecha_hora" type="date" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Medio de Contacto</label>
                                        <select class="form-control" v-model="historial.his_medio_comuniacion">
                                            <option value="" disabled selected>--Seleccionar</option>
                                            <option value="Visita Presencial">Presencial</option>
                                            <option value="Llamada Telefonica">Llamada telefonica</option>
                                            <option value="Correo Electronico">Correo Electronico</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group">
                                    <label class="form-label" for="Detalles">Detalles o Resumen de la Comunicacion</label>
                                    <textarea class="form-control" id="Detalles" v-model="historial.his_detalle"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer border-0">
                            <div class="row">
                                <div class="d-flex justify-content-end">
                                    <div v-if="mostrarMensajeError" class="text-danger mt-3">
                                        Complete todos los campos.
                                    </div>
                                    <button @click="goBack" class="btn btn-lg btn-secondary mx-2 px-3">
                                        <i data-feather="arrow-left"></i> Volver atras
                                    </button>
                                    <button @click="guardar" class="btn btn-lg btn-primary px-4">
                                        <span v-if="!isLoading">Guardar</span>
                                        <span v-else class="spinner-border spinner-border-sm" role="status"
                                            aria-hidden="true"></span>
                                    </button>
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
import { mapActions } from "vuex";
import feather from 'feather-icons';

export default {
    name: 'historial',
    props: ['doc'],
    data() {
        return {
            historial: {
                per_id: "",
                exp_id: "",
                his_fecha_hora: "",
                his_medio_comuniacion: "",
                his_detalle: "",
            },
            expedientes: [],
            demandante: null,
            mostrarError: false,
            mostrarMensajeError: false,
            isLoading: false
        };
    },
    created() {
        this.buscar();
    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
    },
    methods: {
        ...mapActions(['get', 'post']),
        async buscar() {
            try {
                this.$showLoadingAlert();
                const response = await this.$axios.post(
                    `${this.$store.getters.get__url}/demandante/expedientes`,
                    {
                        documento: this.$route.params.doc,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.get__token}`,
                        },
                    }
                );
                this.expedientes = response.data.expedientes;
                if (this.expedientes.length > 0) {
                    this.historial.exp_id = this.expedientes[0].exp_id;
                }
                if (response.data.tipo_persona === 'NATURAL') {
                    this.demandante = `${response.data.persona.nat_nombres} ${response.data.persona.nat_apellido_paterno} ${response.data.persona.nat_apellido_materno} `;
                } else {
                    this.demandante = response.data.persona.jur_razon_social;
                }
                this.historial.per_id = response.data.persona.per_id;
                this.$closeLoadingAlert();
            } catch (error) {
                console.error('Error al cargar los detalles del expediente:', error);
            }
        },
        validarCampos() {
            if (this.historial.his_fecha_hora === "" || this.historial.his_medio_comuniacion === "") {
                return false;
            } else {
                return true;
            }
        },
        async guardar() {
            this.isLoading = true;
            if (!this.validarCampos()) {
                this.isLoading = false;
                return console.log('complete los campos');
                
            }
            try {
                const response = await this.$axios.post(`${this.$store.getters.get__url}/history/store`, this.historial, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.get__token}`,
                    },
                });

                if (response.data.state === 0) {
                    this.$router.push({ path: '/sisge/demandantes' });
                }
            } catch (error) {
                console.error('Error al guardar datos:', error);
            }
            this.isLoading = false;
        },

        goBack() {
            this.$router.go(-1); // Navega hacia atrás en el historial
        }

    }
};
</script>
  
<style scoped>
.is-invalid {
    border-color: red;
}

.btn-success {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
}
</style>