<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header py-3">
                    <span class="card-title fw-bold text-dark"><i
                            class="material-icons-two-tone text-dark">dashboard</i> GESTION DE SOLICITUDES</span>
                </div>
                <div class="card-body" style="height: 490px;">
                    <div v-if="trade != null" class="row">
                        <div class="col-3" v-for="(observation, index) in trade.observations" :key="observation.obs_id">
                            <a href="" data-bs-toggle="modal" :data-bs-target="'#modal' + observation.obs_id" @click="textarea(observation.obs_id)">
                                <div class="shadow p-3 p-2 rounded-3 mb-2 bg-white ">
                                    <div class="row"><span class=" fw-bold mb-2 text-dark">{{ index + 1 }}. {{
                        observation.obs_title }}</span></div>

                                    <div><span class="badge fw-bold d-flex align-items-center text-secondary">
                                            -- {{ formatDate(observation.updated_at) }}
                                        </span>
                                    </div>

                                    <label v-if="observation.obs_derivative == null"
                                        class="badge bg-light-warning">PENDIENTE</label>
                                    <label v-if="observation.obs_derivative !== null && observation.obs_answer == null"
                                     class="badge bg-light-primary">DERIVADO</label>
                                    <label v-if="observation.obs_answer !== null"
                                     class="badge bg-light-success">ATENDIDO</label>
                                </div>
                            </a>
                            <!-- Modal -->
                            <div class="modal fade" :id="'modal' + observation.obs_id" tabindex="-1"
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title fw-bold" id="exampleModalLabel"><i
                                                    class="material-icons-two-tone text-dark">subtitles</i> {{
                        observation.obs_title }}
                                            </h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close" @click="limpiarDatos"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row mb-3">
                                                <span class="d-flex align-items-center fw-bold fs-6"><i
                                                        class="material-icons-two-tone text-dark">toc</i>
                                                    Descripción</span>
                                                <span class="text-dark ml-4 mt-2">{{ observation.obs_description
                                                    }}</span>
                                            </div>
                                            <div class="row mb-3">
                                                <span class="d-flex align-items-center fw-bold fs-6"><i
                                                        class="material-icons-two-tone text-dark">sort</i> Derivar
                                                    a:</span>
                                                <div class="col-11 mt-2">
                                                    <select class="form-select ml-4"
                                                        v-model="datos_form.obs_derivative">
                                                        <option v-if="observation.obs_derivative === null" value=""
                                                            disabled selected class="py-5">-- Seleccione
                                                            una
                                                            opción
                                                        </option>
                                                        <option v-if="observation.obs_derivative !== null" value=""
                                                            disabled selected class="py-5">
                                                            {{ observation.obs_derivative }}
                                                        </option>

                                                        <option v-for="(area) in areas" :key="area.are_id"
                                                            :value="area.are_id" class="py-3">
                                                            {{ area.are_name }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <span class="d-flex align-items-center fw-bold fs-6"><i
                                                        class="material-icons-two-tone text-dark">event_note</i>
                                                    Respuesta</span>
                                                <div class="form-floating col-11 mt-2">
                                                    <textarea v-model="datos_form.obs_answer" class="form-control  ml-4"
                                                        id="floatingTextarea"
                                                        :readonly="observation.obs_derivative === null"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                                @click="limpiarDatos">Cerrar</button>
                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                                @click="guardar(observation.obs_id)">Guardar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Observaciones</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover" id="table" ref="myDataTable">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Título</th>
                                    <th>Descripción</th>
                                    <th>Fecha</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(observation, index) in trade.observations" :key="observation.obs_id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ observation.obs_title }}</td>
                                    <td>{{ observation.obs_description }}</td>
                                    <td class="text-center">{{ formattedDate }}</td>
                                    <td>
                                        <div class="d-flex justify-content-center">
                                            <button type="button" class="btn btn-info btn-sm mr-1">Reenviar</button>
                                            <button type="button" class="btn btn-info btn-sm mr-1">Remitir</button>
                                            <button type="button" class="btn btn-success btn-sm">Ver</button>
                                        </div>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>-->
    </div>
</template>

<script>
import feather from "feather-icons";
import { getData, postData } from '@/utils/fetchData';
import DataTable from '@/utils/dataTable';
import moment from 'moment';

export default {
    mixins: [DataTable],
    data() {
        return {
            showModal: false,
            dataTable: null,
            trade: null,
            formattedDate: "",
            id: '',
            isLoading: false,
            areas: [],
            datos_form: {
                obs_derivative: "",
                obs_answer: ""
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
        this.listarAreas();
    },
    methods: {
        async listarAreas() {
            this.$showLoadingAlert();
            try {
                const result = await getData('area', this);
                this.areas = result.data;
            } catch (error) {
                this.$handleApiError(error, 'listar areas');
            }
        },

        async cargarDetallesOficio() {
            try {
                const response = await this.$getData(`trade/${this.id}`, this);
                this.trade = response.trade;
                //await this.$waitForDataTableDraw(this, 'myDataTable');
                this.formatDate();
                //this.initDataTable();
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar detalles del expediente administrativo ', this.id);
            }
        },

        async guardar(id) {
            const observation = this.trade.observations.find(observation => observation.obs_id === id);
            if (this.datos_form.obs_derivative !== "" || observation.obs_derivative !== null) {
                var area = "";
                if(this.datos_form.obs_derivative !== ""){
                    area = this.areas.find(area => area.are_id === this.datos_form.obs_derivative);
                }
                try {
                    var formData;
                    if (this.datos_form.obs_derivative !== "" || this.datos_form.obs_answer !== "") {
                        this.isLoading = true;
                        if (area && this.datos_form.obs_answer !== "") {
                            formData = {
                                obs_id: id,
                                obs_derivative: area.are_name,
                                obs_answer: this.datos_form.obs_answer
                            }
                        }else if(this.datos_form.obs_derivative !== ""){
                            formData = {
                                obs_id: id,
                                obs_derivative: area.are_name
                            }
                        }else{
                            formData = {
                                obs_id: id,
                                obs_answer: this.datos_form.obs_answer
                            }
                        }
                        const response = await this.$axios.put(
                            `${this.$store.getters.get__url}/observation/derivative`,
                            formData,
                            {
                                headers: {
                                    Authorization: `Bearer ${this.$store.getters.get__token}`,
                                },
                            }
                        );
                        //const response = await this.$postData('observation/derivative', this, formData);

                        if (response.data.state === 'success') {
                            this.cargarDetallesOficio();
                            this.isLoading = false;
                        } else if (response.state === 'error') {
                            this.isLoading = false;
                        }
                    } else {
                        this.isLoading = false;
                    }

                } catch (error) {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    this.isLoading = false;
                }
            } else {
                this.isLoading = false;
            }
        },

        formatDate(date) {
            return moment(date).format('DD MMM YYYY');
        },

        limpiarDatos() {
            console.log('Limpiar');
            this.datos_form.obs_derivative = "";
        },

        textarea(id){
            const observation = this.trade.observations.find(observation => observation.obs_id === id);
            if(observation.obs_answer !== null){
                this.datos_form.obs_answer = observation.obs_answer;
            }else{
                this.datos_form.obs_answer = "";
            }
        },

        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>
<style scoped></style>