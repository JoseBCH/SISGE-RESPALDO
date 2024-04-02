<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title">Realizar solicitudes</h5>
                    <button @click="mostrarModal" class="btn btn-primary btn-lg ml-auto rounded">
                        Registrar Solicitud
                    </button>
                </div>
                <!--Modal-->
                <div v-if="showModal" class="modal" @click="cerrarModal">
                    <div class="modal-content card border-0" @click.stop>
                        <div class="card-header pt-3 pb-4">
                            <h5 class="text-center fw-bold" style="margin-top: 10px !important;">
                                Complete los campos</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Asunto</label>
                                        <input class="form-control" maxlength="50" v-model="obsertation.obs_title"
                                            @input="validarCampo('obs_title')"
                                            :class="{ 'has-error': errores.obs_title }" />
                                        <span class="error-message" v-if="errores.obs_title">Complete este campo para
                                            continuar.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Mensaje</label>
                                        <textarea class="form-control" rows="4" v-model="obsertation.obs_description"
                                            @input="validarCampo('obs_description')"
                                            :class="{ 'has-error': errores.obs_description }"></textarea>
                                        <span class="error-message" v-if="errores.obs_description">Complete este campo
                                            para
                                            continuar.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="d-flex justify-content-end">
                                    <button class="btn btn-secondary btn-lg mx-2 px-4 rounded"
                                        @click="cerrarModal">Cerrar</button>
                                    <button class="btn btn-primary btn-lg rounded px-4" @click="guardar">
                                        <span v-if="!isLoading">{{ obsertation.obs_id ? 'Actualizar' : 'Guardar'
                                            }}</span>
                                        <span v-else class="spinner-border spinner-border-sm" role="status"
                                            aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover" id="table" ref="myDataTable">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th class="text-center">Título</th>
                                    <th class="text-center">Descripción</th>
                                    <th class="text-center">Fecha</th>
                                    <th class="text-center">Respuesta</th>
                                    <th class="text-center">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(observation, index) in observations" :key="observation.obs_id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ observation.obs_title }}</td>
                                    <td>{{ observation.obs_description }}</td>
                                    <td>{{ formattedDate }}</td>
                                    <td class="text-center" v-if="observation.obs_state === 'P'">
                                        ---
                                    </td>
                                    <td v-else>
                                        Con respuesta
                                    </td>
                                    <td>
                                        <div class="d-flex justify-content-center">
                                            <a href="javascript:void(0)" @click="editar(observation.obs_id)"
                                                class="text-info px-2 py-1 btn-lg mx-1">
                                                <i class="material-icons-two-tone text-warning mb-1">edit</i>
                                            </a>
                                            <a href="javascript:void(0)" @click="eliminar(observation.obs_id)"
                                                class="px-2 py-1 btn-lg text-danger">
                                                <i class="material-icons-two-tone text-danger mb-1">delete</i>
                                            </a>
                                        </div>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
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
            showModal: false,
            modalVisible: false,
            persons: [],
            formattedDate: "",
            id: '',
            isLoading: false,
            observations: [],
            obsertation: {
                obs_id: '',
                obs_title: '',
                obs_description: ''
            },

            errores: {
                obs_title: '',
                obs_description: ''
            }
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
                this.$showLoadingAlert();
                const response = await this.$getData(`trade/${this.id}`, this);
                this.trade = response.trade;
                this.observations = this.trade.observations;
                //await this.$waitForDataTableDraw(this, 'myDataTable');
                this.formatDate();
                this.initDataTable();
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar detalles del expediente administrativo ', this.id);
            }
        },

        async crear() {
            if (this.validarCampos()) {
                try {
                    this.isLoading = true;
                    const formData = {
                        obs_title: this.obsertation.obs_title,
                        obs_description: this.obsertation.obs_description,
                        obs_tra_id: this.trade.tra_id,
                    }

                    const response = await this.$postData('observation/create', this, formData);

                    if (response.state === 'success') {
                        //this.observations.push({ ...response.data });
                        //this.initDataTable();
                        this.showModal = false;
                        this.cargarDetallesOficio();
                        this.limpiarCampos();
                        this.isLoading = false;
                    } else if (response.state === 'error') {
                        this.isLoading = false;
                    }

                } catch (error) {
                    const errorMessage = error;
                    console.log(errorMessage);
                    this.isLoading = false;
                }
            } else {
                console.log('Error en la validación de campos');
                this.isLoading = false;
            }
        },

        async actualizar() {
            if (this.validarCampos()) {
                try {
                    this.isLoading = true;

                    const response = await this.$axios.put(
                        `${this.$store.getters.get__url}/observation/update`,
                        this.obsertation,
                        {
                            headers: {
                                Authorization: `Bearer ${this.$store.getters.get__token}`,
                            },
                        }
                    );

                    if (response.data.state === 'success') {
                        this.limpiarCampos();
                        this.cargarDetallesOficio();
                        this.showModal = false;
                    } else {
                        console.error("Error en la respuesta del servidor:", response.data);
                        this.isLoading = false;
                    }
                } catch (error) {
                    console.error("Error en la solicitud:", error.message);
                    this.isLoading = false;
                } finally {
                    this.isLoading = false;
                }
            } else {
                console.log('Error en la validación de campos');
            }
        },

        validarCampos() {
            Object.keys(this.errores).forEach(propiedadError => {
                this.validarCampo(propiedadError, propiedadError);
            });

            return !Object.values(this.errores).some(error => error);
        },


        async eliminar(id) {
            try {
                this.isLoading = true;

                const response = await this.$axios.delete(
                    `${this.$store.getters.get__url}/observation/destroy/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.get__token}`,
                        },
                    }
                );

                if (response.data.state === 'success') {
                    this.cargarDetallesOficio();
                } else {
                    console.error("Error en la respuesta del servidor:", response.data);
                    this.isLoading = false;
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
                console.error("AxiosError Details:", error.response);
                this.isLoading = false;
            } finally {
                this.isLoading = false;
            }
        },

        editar(id) {
            try {
                const observationEdit = this.observations.find(observation => observation.obs_id === id);
                if (observationEdit) {
                    this.obsertation = { ...observationEdit };
                    this.showModal = true;
                } else {
                    console.error("Observación no ENCONTRADO");
                }
            } catch (errores) {
                console.error(errores);
            }
        },

        guardar() {
            try {
                if (this.validarCampos() && this.obsertation.obs_id === '') {
                    this.crear();
                } else {
                    this.actualizar(this.obsertation.obs_id);
                }
            } catch (errores) {
                console.error(errores);
            }
        },

        formatDate() {
            this.formattedDate = moment(this.trade.observations.created_at).format('DD MMM YYYY');
        },


        validarCampo(campo) {
            this.errores[campo] = this.obsertation[campo] === "";
        },

        mostrarModal() {
            this.showModal = true;
        },

        limpiarCampos() {
            for (let key in this.obsertation) {
                if (this.obsertation.hasOwnProperty(key)) {
                    this.obsertation[key] = "";
                }
            }
        },

        limpiarErrores() {
            for (let key in this.errores) {
                if (this.errores.hasOwnProperty(key)) {
                    this.errores[key] = "";
                }
            }
        },

        cerrarModal() {
            this.showModal = false;
            this.limpiarCampos();
            this.limpiarErrores();
            this.isLoading = false;
        },

        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>

<style scoped>
.has-error {
    border: 1px solid #EA4D4D;
}

.error-message {
    color: #EA4D4D;
    font-size: 12px;
}

td {
    white-space: normal !important;
    word-wrap: break-word;
}

.circle {
    width: 30px;
    height: 30px;
    background-color: #7267EF;
    color: white;
    font-weight: 600;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: #fff;
    width: 600px;
    height: auto !important;
    /* padding: 20px; */
    border-radius: 8px !important;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    position: relative !important;
}

.card-header {
    border-radius: 8px 8px 0px 0px !important;
}
</style>
