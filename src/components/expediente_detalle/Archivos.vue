<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h5>ARCHIVO EJE DEL EXPEDIENTE</h5>
                </div>
                <div class="card-body">
                    <div v-if="ejes.length === 0">
                        <p class="text-muted">Actualmente no hay un archivo para este expediente. <a
                                href="javascript:void(0)" class="text-primary" @click="abrirModal(1)">Haga click
                                para cargar el archivo.</a></p>
                    </div>
                    <div class="row" v-for="(eje, index) in ejes" :key="index">
                        <div class="col-md-3">
                            <label class="form-label">Ultima actualizacion</label>
                            <input type="text" class="form-control border-0" :value="formatFecha(eje.updated_at)" disabled>
                        </div>
                        <div class="col-md-5">
                            <label class="form-label">Descipcion</label>
                            <input type="text" class="form-control border-0" :value="eje.doc_desciprcion" disabled>
                        </div>
                        <div class="col-md-auto col-sm-6 d-flex">
                            <button @click="descargarArchivo(eje.doc_ruta_archivo, eje.doc_nombre)"
                                class="btn btn-primary border-0 mt-auto" :title="eje.doc_nombre">Descargar
                            </button>
                        </div>
                        <div class="col-md-auto col-sm-6 d-flex">
                            <button class="btn btn-success border-0 mt-auto"
                                @click="abrirModaledit(2, eje)">Actualizar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex align-items-center">
                        <h5>ESCRITOS PRESENTADOS</h5>
                        <button type="button" class="btn btn-sm btn-primary ml-auto px-4" @click="abrirModal(3)">
                            Nuevo
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover m-b-0" id="table" ref="dataTable" aria-describedby="tabla-escritos">
                            <thead>
                                <tr>
                                    <th>Fecha de presentacion</th>
                                    <th>Fecha de registro Local</th>
                                    <th>Detalles</th>
                                    <th>Nombre de archivo</th>
                                    <th>Archivo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(escrito, index) in escritos" :key="index">
                                    <td>{{ formatFecha(escrito.fecha) }}</td>
                                    <td>{{ formatFecha(escrito.created_at) }}</td>
                                    <td>{{ escrito.doc_desciprcion }}</td>
                                    <td class="col-md-3">{{ escrito.doc_nombre }}</td>
                                    <td>
                                        <button @click="descargarArchivo(escrito.doc_ruta_archivo, escrito.doc_nombre)"
                                            class=" btn btn-success rounded btn-lg py-1" style="font-size: 12px;">
                                            Descargar
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal Nuevo Eje-->
        <div v-if="showModal === 1" class="modal" @click="cerrarModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h5 class="modal-title">Nuevo Archivo EJE</h5>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label" for="NumeroExpediente">Seleccionar Archivo</label>
                        <input type="file" ref="fileInput" requeried class="form-control" @change="onFileChange">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="NumeroExpediente">Descripcion sobre el archivo</label>
                        <textarea class="form-control" id="Detalles" v-model="eje.descripcion"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="guardarEje()">Guardar</button>
                </div>
            </div>
        </div>
        <!-- Modal Actualizar Eje-->
        <div v-if="showModal === 2" class="modal" @click="cerrarModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h5 class="modal-title">Actualizar Archivo EJE</h5>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label" for="NumeroExpediente">Seleccionar Archivo</label>
                        <input type="file" ref="fileInput" requeried class="form-control" @change="onFileChange">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="NumeroExpediente">Descripcion sobre el archivo</label>
                        <textarea class="form-control" id="Detalles" v-model="eje.descripcion"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="actualizarEje()">Guardar</button>
                </div>
            </div>
        </div>
        <!-- Modal Nuevo Escrito-->
        <div v-if="showModal === 3" class="modal" @click="cerrarModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h5 class="modal-title">Nuevo Escrito</h5>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label" for="NumeroExpediente">Fecha  del escrito:</label>
                        <input type="date" class="form-control" id="Detalles" v-model="escrito.fecha"></input>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="NumeroExpediente">Seleccionar Archivo</label>
                        <input type="file" ref="fileInput" requeried class="form-control" @change="onFileChange">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="NumeroExpediente">Descripcion sobre el archivo</label>
                        <textarea class="form-control" id="Detalles" v-model="escrito.descripcion"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="nuevoEscrito()">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import feather from "feather-icons";
import DataTable from '@/utils/dataTable';
import moment from 'moment';

import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
// import 'datatables.net-bs5/js/dataTables.bootstrap5.min.js';
// import 'datatables.net-buttons-bs5';
// import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery'; // Importa jQuery


export default {
    // mixins: [DataTable],
    data() {
        return {
            dataTable: null,
            showModal: 0,

            escritos: [],
            ejes: [],
            eje: {
                name: "",
                exp_id: "",
                doc_tipo: "EJE",
                descripcion: ""
            },
            escrito: {
                exp_id: "",
                doc_tipo: "ESCRITO",
                descripcion: "",
                fecha:""
            },
            formattedDate: "",
            id: '',
        };
    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
        this.cargarDetallesExpediente();
        // this.initDataTable();
    },
    async created() {
        this.id = this.$route.params.id;
        this.dataTable = null;
    },
    // updated() {
    //     this.destroyDataTable();
    //     this.initDataTable();
    // },
    methods: {
        async cargarDetallesExpediente() {
            try {
                this.$showLoadingAlert();
                const response = await this.$getData(`proceeding/${this.id}`, this);
                this.eje.exp_id = response.expediente.exp_id;
                this.escrito.exp_id = response.expediente.exp_id;

                this.escritos = response.escritos;
                this.ejes = response.eje;
                this.initDataTable();
                console.log(this.escritos);
                // await this.$waitForDataTableDraw(this, 'myDataTable');
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar detalles del expediente ', this.id);
            }
        },

        abrirModal(num) {
            this.showModal = num;
        },
        abrirModaledit(num, item) {
            this.eje.name = item.doc_ruta_archivo;
            this.showModal = num;
        },

        cerrarModal() {
            this.showModal = 0;
        },


        async navigateToPJ() {
            window.open('https://cej.pj.gob.pe/cej/forms/busquedaform.html', '_blank');
        },

        formatDate() {
            this.formattedDate = moment(this.expediente.exp_fecha_inicio).format('DD/MM/YYYY');
        },

        formatFecha(fechaISO) {
            const fecha = new Date(fechaISO);
            const opcionesFormato = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            return fecha.toLocaleDateString('es-ES', opcionesFormato);
        },

        async descargarArchivo(name, doc) {
            try {
                this.$showLoadingAlert('Descargando...', 'Obteniendo archivo, espere por favor...');

                const response = await axios.get(this.$store.getters.get__url + '/archivos/descargar', {
                    responseType: 'blob',
                    headers: {
                        Authorization: 'Bearer ' + this.$store.getters.get__token,
                    },
                    params: {
                        nombre: name,
                    },
                });

                const blob = new Blob([response.data], {
                    type: response.headers['content-type'],
                });
                this.$closeLoadingAlert();
                const cleanFileName = doc.replace(/[^\w\s.]/gi, '-');
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = cleanFileName;
                link.click();

            } catch (error) {
                this.$handleApiError(error, 'abrir el archivo ', this);
            }
        },

        goBack() {
            this.$router.go(-1);
        },
        //guardar eje

        async guardarEje() {
            if (this.archivoSeleccionado) {
                try {
                    this.$showLoadingAlert();
                    const formData = new FormData();
                    formData.append('file', this.selectedFile);

                    await axios.post(
                        `${this.$store.getters.get__url}/archivos/guardar`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + this.$store.getters.get__token,
                            },
                            params: this.eje,
                        }
                    );
                    this.selectedFile = null;
                    this.eje.descripcion = "";
                    this.showModal = 0;
                    this.$closeLoadingAlert();
                    this.cargarDetallesExpediente();
                } catch (error) {
                    console.error(error);
                }
            } else {
                this.$handleApiError(error, 'guardar eje');
            }
        },

        async actualizarEje() {
            if (this.archivoSeleccionado) {
                try {
                    this.$showLoadingAlert();
                    const formData = new FormData();
                    formData.append('file', this.selectedFile);

                    await axios.post(
                        `${this.$store.getters.get__url}/archivos/actualizar/eje`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + this.$store.getters.get__token,
                            },
                            params: this.eje,
                        }
                    );
                    this.selectedFile = null;
                    this.eje.descripcion = "";
                    this.showModal = 0;
                    this.$closeLoadingAlert();
                    this.cargarDetallesExpediente();
                } catch (error) {
                    console.error(error);
                }
            } else {
                this.$handleApiError(error, 'actualizar eje');
            }
        },

        async nuevoEscrito() {
            if (this.archivoSeleccionado) {
                const formData = new FormData();
                formData.append('file', this.selectedFile);

                try {
                    this.$showLoadingAlert();
                    const response = await axios.post(`${this.$store.getters.get__url}/archivos/guardar`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${this.$store.getters.get__token}`,
                        },
                        params: this.escrito,
                    });
                    const nuevoEscrito = response.data.data;
                    this.escritos.push(nuevoEscrito);
                    this.initDataTable();
                    // this.cargarDetallesExpediente();
                    this.selectedFile = null;
                    this.escrito.descripcion = "";
                    this.showModal = 0;
                    this.$closeLoadingAlert();
                } catch (error) {
                    console.error(error);
                }
            } else {
                this.$handleApiError(error, 'guardar escrito');
            }
        },

        onFileChange(event) {
            this.selectedFile = event.target.files[0];
            const fileInput = event.target;
            this.archivoSeleccionado = fileInput.files.length > 0;
        },

        async initDataTable() {
            this.destroyDataTable();
            await this.$nextTick();
            this.dataTable = $(this.$refs.dataTable).DataTable({
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
                },
            });
        },

        destroyDataTable() {
            this.dataTable && this.dataTable.destroy() && (this.dataTable = null);
        },

    },
    beforeDestroy() {
        this.destroyDataTable();
    },

};
</script>

<style scoped>
@import '@/assets/css/modal.css';
@import '@/assets/css/dataTable.css';
</style>

