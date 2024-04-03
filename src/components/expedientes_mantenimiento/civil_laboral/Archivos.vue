<template>
    <section class="pc-container pb-4">
        <div class="pcoded-content">
            <!-- <div class="page-header">
                <div class="page-block">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <div class="page-header-title">
                                <h5 class="m-b-10">Archivos</h5>
                            </div>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <router-link to="/sisge">Inicio</router-link>
                                </li>
                                <li class="breadcrumb-item">Expedientes</li>
                                <li class="breadcrumb-item">Añadir Archivos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="row mb-4">
                <h5 class="text-dark fw-bold">Añadir archivos al Expediente</h5>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card shadow">
                        <div class="card-header border-0 mb-0">
                            <div class="row tabs">
                                <div class="col-md-auto tabs-div">
                                    <a href="javascript:void(0)" class="btn btn-lg rounded tabs-link"
                                        @click="mostrarEscrito" :class="{ active: showEscrito === true }">Añadir Documento</a>
                                </div>
                                <div class="col-md-auto tabs-div">
                                    <a href="javascript:void(0)" class="btn btn-lg rounded tabs-link" @click="mostrarEje"
                                        :class="{ active: showEje === true }">Añadir Archivo EJE</a>
                                </div>
                            </div>
                        </div>
                        <div v-show="showEscrito === true">
                            <div class="card-body py-0 my-0">
                                <div class="row mb-3 mt-0">
                                    <div class="col-md-12">
                                        <div class="badge bg-light-primary w-100 rounded py-3 px-4 d-flex text-start"
                                            style="font-size: 12px;">
                                            Datos para añadir un nuevo escrito al Expediente
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <!-- Número de Expediente -->
                                    <div class="col-md-6">
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
                                    <!-- Demandante -->
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Demandante</label>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <input type="text" class="form-control border-0" v-model="demandante"
                                                        disabled>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Seleccionar Archivo -->
                                <div class="row mb-3">
                                    <div class="col-md-12">
                                        <div class="form-group mb-0">
                                            <label class="form-label" for="NumeroExpediente">Seleccionar Archivo</label>
                                            <input type="file" ref="fileInput" required class="form-control"
                                                @change="onFileChange" :class="{ 'has-error': errores.file_escrito }">
                                        </div>
                                        <span v-if="!errores.file_escrito" class="message">Archivos aceptados: word,
                                            pdf.</span>
                                        <span v-if="errores.file_escrito" class="error-message">Debe cargar un
                                            archivo.</span>
                                    </div>
                                </div>
                                <!-- Descripción o detalles sobre los escritos -->
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label" for="NumeroExpediente">Descripción o detalles sobre
                                                los
                                                escritos</label>
                                            <textarea class="form-control" id="Detalles"
                                                v-model="escrito.descripcion"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer border-0 pt-1">
                                <div class="row">
                                    <div class="d-flex justify-content-end">
                                        <!-- Botón para volver atrás -->
                                        <button @click="goBack" class="btn btn-lg mx-2 btn-secondary px-3">
                                            <i data-feather="arrow-left"></i> Volver atrás
                                        </button>
                                        <!-- Botón para guardar -->
                                        <button class="btn btn-lg btn-primary px-3" @click="guardarEscrito">
                                            Guardar Escrito
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-show="showEje === true">
                            <div class="card-body py-0 my-0" v-if="dataeje.length == 0">
                                <div class="row mb-3 mt-0">
                                    <div class="col-md-12">
                                        <div class="badge bg-light-primary w-100 rounded py-3 px-4 d-flex text-start"
                                            style="font-size: 12px;">
                                            Datos para modificar el archivo EJE del Expediente
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
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
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Demandante</label>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <input type="text" class="form-control border-0" v-model="demandante"
                                                        disabled>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-12">
                                        <div class="form-group mb-0">
                                            <label class="form-label" for="NumeroExpediente">Seleccionar Archivo</label>
                                            <input type="file" ref="fileInput" requeried class="form-control"
                                                @change="onFileChange" :class="{ 'has-error': errores.file_eje }">
                                        </div>
                                        <span v-if="!errores.file_eje" class="message">Archivos aceptados: word,
                                            pdf.</span>
                                        <span v-else="!errores.file_eje" class="error-message">Debe cargar un
                                            archivo.</span>
                                    </div>

                                </div>
                                <div class="row">
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
                            </div>
                            <div class="card-body py-0 my-0" v-else>
                                <div class="row mb-3 mt-0">
                                    <div class="col-md-12">
                                        <div class="badge bg-light-primary w-100 rounded py-3"
                                            style="font-size: 13px;">
                                            El expediente ya cuenta con un archivo EJE registrado. Puede visualizar o modificar esta información en el detalle del expediente.
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="row pt-2">
                                    <div class="d-flex justify-content-end">
                                        <button @click="goBack" class="btn btn-lg btn-secondary px-3 mx-2">
                                            <i data-feather="arrow-left"></i> Volver atras
                                        </button>

                                    </div>
                                </div> -->
                            </div>
                            <div class="card-footer border-0 pt-1">
                                <div class="row">
                                    <div class="d-flex justify-content-end">
                                        <button @click="goBack" class="btn btn-lg btn-secondary px-3 mx-2">
                                            <i data-feather="arrow-left"></i> Volver atras
                                        </button>
                                        <button v-if="dataeje.length == 0" class="btn btn-lg btn-primary px-3" @click="GuardarEJE()">Guardar archivo EJE</button>
                                        <router-link v-else class="btn btn-success btn-lg px-5"
                                            :to="{ name: 'expediente/detalle', params: { id: EJE.exp_id } }">
                                            Detalle
                                        </router-link>
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
import axios from 'axios';
import { mapActions } from "vuex";
import feather from 'feather-icons';
import Swal from 'sweetalert2';

export default {
    props: ['id'],
    data() {
        return {
            selectedFile: null,
            escrito: {
                exp_id: "",
                doc_tipo: "ESCRITO",
                descripcion: ""
            },
            EJE: {
                exp_id: "",
                doc_tipo: "EJE",
                descripcion: ""
            },
            expediente: null,
            demandante: null,
            errores: {
                file_escrito: false,
                file_eje: false
            },
            showEscrito: false,
            showEje: false,
            archivoSeleccionado: false,
            dataeje: []
        }
    },
    created() {
        this.buscar();
        this.mostrarEscrito();
    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
    },

    methods: {
        ...mapActions(['get', 'post']),


        mostrarEscrito() {
            this.showEscrito = true;
            this.showEje = false;
        },

        mostrarEje() {
            this.showEscrito = false;
            this.showEje = true;
        },

        onFileChange(event) {
            this.selectedFile = event.target.files[0];
            const fileInput = event.target;
            this.archivoSeleccionado = fileInput.files.length > 0;
            this.errores.file_escrito = false;
            this.errores.file_eje = false;
        },

        validarFileEscrito() {
            if (this.archivoSeleccionado) {
                this.errores.file_escrito = true;
                return true;
            } else {
                this.errores.file_escrito = false;
                return false;
            }
        },

        validarFileEje() {
            const fileInput = this.$refs.fileInput;

            if (!fileInput.files || fileInput.files.length === 0) {
                this.errores.file_eje = true;
                return true;
            } else {
                this.errores.file_eje = false;
                return false;
            }
        },

        getNombreCompleto(procesal){
            return `${procesal.nombres} ${procesal.apellido_paterno} ${procesal.apellido_materno}`;
        },
        async buscar() {
            try {
                this.$showLoadingAlert();
                const params = {
                    "exp_id": this.$route.params.id
                }
                const response = await this.$postData('proceeding/buscarPorId', this, params);

                 this.expediente = response.data.numero;
                const procesal = response.data.procesal[0];
                if(procesal.tipo_persona === 'NATURAL'){
                    this.demandante = this.getNombreCompleto(procesal);
                }else{
                    this.demandante = this.procesal.jur_razon_social;
                }

                this.escrito.exp_id = response.data.exp_id;
                this.EJE.exp_id = response.data.exp_id;
                this.dataeje = response.eje;
                this.$closeLoadingAlert();
            } catch (error) {
                console.log(error);
            }
        },

        async guardarEscrito() {
            if (this.archivoSeleccionado) {
                console.info('Carga correcta del archivo escrito.');
                this.errores.file_escrito = false;
                const formData = new FormData();
                formData.append('file', this.selectedFile);

                try {
                    // Eliminar el código de SweetAlert para la carga
                    await axios.post(`${this.$store.getters.get__url}/cargar/archivo`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${this.$store.getters.get__token}`,
                        },
                        params: this.escrito,
                    });

                    // Eliminar el código de SweetAlert para la confirmación
                    // this.$refs.fileInput.value = null;
                    this.selectedFile = null;
                    this.$router.push({ path: '/expediente/busqueda' });

                } catch (error) {
                    // Eliminar el código de SweetAlert para el manejo de errores
                    console.error(error);
                }
            } else {
                console.log('Falta cargar un archivo.');
                this.errores.file_escrito = true;
            }
        },


        async guardarEJE() {
            if (this.archivoSeleccionado) {
                console.info('Carga correcta del archivo eje.');
                this.errores.file_eje = false;
                try {
                    const formData = new FormData();
                    formData.append('file', this.selectedFile);

                    // Eliminar el código de SweetAlert para la carga
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

                    // Eliminar el código de SweetAlert para la confirmación
                    // this.$refs.fileInput.value = null;
                    this.selectedFile = null;
                    this.$router.push({ path: '/expediente/busqueda' });
                } catch (error) {
                    // Eliminar el código de SweetAlert para el manejo de errores
                    console.error(error);
                }
            } else {
                console.log('Falta cargar un archivo.');
                this.errores.file_eje = true;
            }
        },


        goBack() {
            this.$router.go(-1);
        }
    },
}

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
    color: #EA4D4D;
    font-size: 12px;
}

.message {
    font-size: 12px;
    color: #6c757d;
}
</style>