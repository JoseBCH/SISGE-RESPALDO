<template>
    <div class="pc-container pb-4 ">
        <div class="pcoded-content">
          
            <div class="row">
                <div class="col-sm-12">
                    <div class="card shadow">
                        <div class="card-header">
                            <h6 class="text-secondary">ARCHIVO EJE DEL EXPEDIENTE</h6>
                        </div>
                        <div class="card-body">
                            <div v-if="ejes.length === 0">

                                <p class="text-muted">Actualmente no hay archivos disponibles para este expediente.</p>
                                <div class="col-sm-12">
                                    <div class="form-group d-grid">
                                        <label class="form-label"></label>
                                        <button @click="mostrarModalNew()" class="btn btn-success rounded btn-lg">Agregar Un
                                            Archivo EJE...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-for="eje in ejes" :key="eje.doc_id">
                                <div class="col-md-3">
                                    <div class="form-group d-grid">
                                        <label class="form-label">Ultima actualizacion</label>
                                        <input type="text" class="form-control" :value="formatFecha(eje.created_at)"
                                            disabled>

                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group d-grid">
                                        <label class="form-label">Descripcion o detalles</label>
                                        <input type="text" class="form-control" :value="eje.doc_desciprcion" disabled>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group d-grid">
                                        <label class="form-label">Archivo</label>
                                        <button @click="traerArchivo(eje.doc_ruta_archivo, eje.doc_nombre)"
                                            class="btn btn-primary rounded" :title="eje.doc_nombre">Descargar
                                            <!-- <i data-feather="download"></i> -->
                                        </button>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group d-grid">
                                        <label class="form-label">Actualizar archivo</label>
                                        <button @click="mostrarModal(eje.doc_ruta_archivo)"
                                            class="btn btn-success rounded btn-lg">Actualizar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="showModal" class="modal" @click="cerrarModal">
                        <div class="modal-content border-0" @click.stop style="border-radius:16px !important">
                            <div class="modal-header d-flex justify-content-center pb-2">
                                <p class="text-dark fw-bold text-center">ACTUALIZACION DEL ARCHIVO EJE</p>
                            </div>
                            <div class="modal-body px-4">
                                <div class="row mb-3">
                                    <div class="col-md-12">
                                        <div class="form-group mb-0">
                                            <label class="form-label" for="NumeroExpediente">Seleccionar Archivo</label>
                                            <input type="file" ref="fileInput" requeried class="form-control"
                                                @change="onFileChange">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label" for="NumeroExpediente">Descripción o detalles
                                                sobre el
                                                archivo EJE</label>
                                            <textarea class="form-control" id="Detalles"
                                                v-model="EJE.descripcion"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="d-flex justify-content-end">
                                        <button class="btn btn-secondary btn-lg mx-2 px-5 rounded"
                                            @click="cerrarModal">Cerrar</button>
                                        <button class="btn btn-primary btn-lg px-5 rounded" @click="editarEje()">
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="showNEW" class="modal" @click="cerrarModal">
                        <div class="modal-content border-0" @click.stop style="border-radius:16px !important">
                            <div class="modal-header d-flex justify-content-center pb-2">
                                <p class="text-dark fw-bold text-center">AGREGAR ARCHIVO EJE</p>
                            </div>
                            <div class="modal-body px-4">
                                <div class="row mb-3">
                                    <div class="col-md-12">
                                        <div class="form-group mb-0">
                                            <label class="form-label" for="NumeroExpediente">Seleccionar Archivo</label>
                                            <input type="file" ref="fileInput" requeried class="form-control"
                                                @change="onFileChange">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label" for="NumeroExpediente">Descripción o detalles
                                                sobre el
                                                archivo EJE</label>
                                            <textarea class="form-control" id="Detalles"
                                                v-model="EJE.descripcion"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="d-flex justify-content-end">
                                        <button class="btn btn-secondary btn-lg mx-2 px-5 rounded"
                                            @click="cerrarModal">Cerrar</button>
                                        <button class="btn btn-primary btn-lg px-5 rounded" @click="añadirEje()">
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="card shadow">
                            <div class="card-header">
                                <h5>Escritos presentados</h5>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table" id="table-escritos">
                                        <thead>
                                            <tr>
                                                <th>Fecha de presentacion</th>
                                                <th>Detalles</th>
                                                <th>Nombre de archivo</th>
                                                <th>Archivo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(escrito, index) in escritos" :key="index">
                                                <td>{{ formatFecha(escrito.created_at) }}</td>
                                                <td>{{ escrito.doc_desciprcion }}</td>
                                                <td>{{ escrito.doc_nombre }}</td>
                                                <td>
                                                    <button
                                                        @click="traerArchivo(escrito.doc_ruta_archivo, escrito.doc_nombre)"
                                                        class=" btn btn-success rounded btn-lg py-1"
                                                        style="font-size: 12px;">
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import feather from "feather-icons";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import moment from 'moment';

export default {
    props: ['id'],
    data() {
        return {
            vistaActual: 'detalle',
            showDetalle: true,
            showHistorial: false,
            numeroExpediente: '',
            dataTable: null,
            selectedFile: null,
            showModal: false,
            showNEW: false,
            expediente: null,
            demandantes: [],
            demandados: [],
            escritos: [],
            ejes: [],
            EJE: {
                name: "",
                exp_id: "",
                doc_tipo: "EJE",
                descripcion: ""
            },
            archivoSeleccionado: false,
            formattedDate: "",
        };
    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
        this.setVistaActual();
    },
    async created() {
        this.sector = this.$store.getters.get__sector;
        this.cargarDetallesExpediente();
        this.dataTable = null;
    },
    methods: {
        ...mapActions(['get', 'post']),

        setVistaActual(vista) {
            this.vistaActual = vista;
        },
        navigateToUpdate() {
            if (this.expediente && this.expediente.exp_id) {
                this.$router.push({
                    name: 'expediente/actualizacion/civil-laboral',
                    params: { id: this.expediente.exp_id },
                });
            }
        },
        mostrarModal(name) {
            this.EJE.name = name;
            this.showModal = true;
        },
        mostrarModalNew() {
            this.showNEW = true;
        },
        async navigateToPJ() {
            console.log('ok');
            // Abrir la página externa en una nueva pestaña
            const nuevaPestana = window.open('https://cej.pj.gob.pe/cej/forms/busquedaform.html', '_blank');
            // const enlaceExpediente = nuevaPestana.document.querySelector('a[title="Por Código de Expediente"]');
            // enlaceExpediente.click();

        },
        cerrarModal() {
            this.showModal = false;
            this.showNEW = false;
            this.EJE.descripcion = "";
        },

        async cargarDetallesExpediente() {
            try {
                this.$showLoadingAlert();
                const response = await axios.get(`${this.$store.getters.get__url}/proceeding/${this.id}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.get__token}`
                    }
                });
                this.expediente = response.data.expediente;
                this.numeroExpediente = response.data.expediente.exp_numero;
                this.escritos = response.data.escritos;
                this.ejes = response.data.eje;
                this.EJE.exp_id = response.data.expediente.exp_id;
                this.formatDate();
                this.getProcesales(response.data.procesales);
                this.initDataTable();
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar detalles del expediente ', this.id);
            }
        },
        formatDate() {
            this.formattedDate = moment(this.expediente.exp_fecha_inicio).format('DD/MM/YYYY');
        },

        getProcesales(procesales) {
            if (procesales[0].tipo_procesal === 'DEMANDANTE') {
                this.demandantes = procesales;
                this.tipo_procesal = 'DEMANDANTE';
                const newDemandante = {
                    'tipo_procesal': 'Demandado',
                    'tipo_persona': 'Juridica',
                    'razon_social': 'UNPRG'
                };
                this.demandados.push(newDemandante)
            } else {
                this.demandados = procesales;
                const newDamandado = {
                    'tipo_procesal': 'Demandado',
                    'tipo_persona': 'Juridica',
                    'razon_social': 'UNPRG'
                };
                this.demandantes.push(newDamandado);
            }
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
        async traerArchivo(name, doc) {
            try {
                this.$showLoadingAlert('Descargando...', 'Obteniendo archivo, espere por favor...');

                const response = await axios.get(this.$store.getters.get__url + '/traer/archivo', {
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
                // document.body.removeChild(link);
                // window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Error al abrir el archivo', error);
            }
        },

        goBack() {
            this.$router.go(-1);
        },
        async editarEje() {
            if (this.archivoSeleccionado) {
                try {
                    this.$showLoadingAlert();
                    const formData = new FormData();
                    formData.append('file', this.selectedFile);

                    await axios.post(
                        `${this.$store.getters.get__url}/cargar/archivo/eje`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + this.$store.getters.get__token,
                            },
                            params: this.EJE,
                        }
                    );
                    console.info('Carga correcta del archivo eje.');
                    this.selectedFile = null;
                    this.showModal = false;
                    this.cerrarModal;
                    this.$closeLoadingAlert();
                    this.cargarDetallesExpediente();
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.log('Falta cargar un archivo.');
            }
        },
        async añadirEje() {
            this.EJE.exp_id = this.id;
            this.EJE.doc_tipo = "EJE";
            if (this.archivoSeleccionado) {
                try {
                    this.$showLoadingAlert();
                    const formData = new FormData();
                    formData.append('file', this.selectedFile);

                    await axios.post(
                        `${this.$store.getters.get__url}/cargar/archivo`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + this.$store.getters.get__token,
                            },
                            params: this.EJE,
                        }
                    );
                    console.info('Carga correcta del archivo eje.');
                    this.selectedFile = null;
                    this.showNEW = false;
                    this.cerrarModal;
                    this.$closeLoadingAlert();
                    this.cargarDetallesExpediente();
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.log('Falta cargar un archivo.');
            }
        },
        onFileChange(event) {
            this.selectedFile = event.target.files[0];
            const fileInput = event.target;
            this.archivoSeleccionado = fileInput.files.length > 0;
        },

        initDataTable() {
            this.$nextTick(() => {
                if (this.dataTable) {
                    this.dataTable.destroy();
                }

                this.dataTable = $("#table-escritos").DataTable({
                    language: {
                        url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
                    },
                });

                feather.replace();
            });
        },

    },

    beforeDestroy() {
        if (this.dataTable) {
            this.dataTable.destroy();
        }
    },
};
</script>

<style scoped>
.ul2 {
    list-style: none;
    padding: 0;
}

.li2 {
    list-style: none;
    padding: 0;
}

.sessions1 {
    margin-top: 2rem;
    border-radius: 12px;
    position: relative;
}

.li1 {
    padding-bottom: 1.5rem;
    border-left: 2px solid #4e5ed3;
    position: relative;
    padding-left: 20px;
    margin-left: 10px;

    &:last-child {
        border: 0px;
        padding-bottom: 0;
    }

    &:before {
        content: '';
        width: 24px;
        height: 24px;
        background: #4e5ed3;
        border: 2px solid #4e5ed3;
        border-radius: 50%;
        position: absolute;
        left: -13px;
        top: 0px;
    }

}

.time1 {
    color: #2a2839;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;

}

.text-muted {
    color: #888;
}

/* .card {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 16px;
} */

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

/* Agrega esta clase CSS para el botón */
.archivo-button {
    white-space: nowrap;
    /* Evita el salto de línea */
    overflow: hidden;
    /* Oculta el contenido que sobresale */
    text-overflow: ellipsis;
    /* Añade puntos suspensivos (...) cuando el contenido se corta */
}

/* Al pasar el mouse, muestra el contenido completo */
/* .archivo-button:hover {
    white-space: nowrap;
    overflow: visible;
} */
</style>
