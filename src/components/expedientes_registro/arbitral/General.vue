<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card shadow rounded">
                <div class="card-header">
                    <div class="row d-flex align-items-center">
                        <div class="col-lg-6 col-md-auto col-sm-12">
                            <h5>Datos Generales</h5>
                            <div class="form-check form-switch py-2">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                                    :checked="isMultiple == '0' ? false : true" @change="mtdChangeMultiple" />
                                <label class="form-check-label" for="flexSwitchCheckChecked">{{ isMultiple == '1' ?
                                    "Multiple Demandantes" : "Un Solo Demandante" }}</label>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-auto col-sm-12">
                            <!-- <div class="d-flex excel-div">
                                <input type="file" ref="fileInput" @change="onFileChange" class="form-control excel-input"
                                    style="height: 100%; width:72.5% ; padding-top: 9px; padding-bottom: 9px;"
                                    accept=".xlsx, .xls" />
                                <button class="btn btn-success btn-lg btn-block ml-auto rounded excel-btn"
                                    @click="uploadFile()">Cargar
                                    Excel</button>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="card-body mb-0">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">N° de Proceso Arbitral</label>
                                <input type="text" class="form-control" placeholder="0134-2022-CCL"
                                    v-model="datosgenerales.exp_numero" @input="validarCampo('exp_numero')"
                                    :class="{ 'has-error': errores.exp_numero }" />
                                <span class="error-message" v-if="errores.exp_numero">Ingrese un numero de
                                    expediente.</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Fecha de Inicio</label>
                                <input class="form-control" type="date" v-model="datosgenerales.exp_fecha_inicio"
                                    @input="validarCampo('exp_fecha_inicio')"
                                    :class="{ 'has-error': errores.exp_fecha_inicio }" />
                                <span class="error-message" v-if="errores.exp_fecha_inicio">Ingrese una fecha de
                                    inicio.</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Pretensión</label>
                                <v-select 
                                :options="pretenciones.filter(pretension => pretension.type_id ===3)" 
                                class="form-control" 
                                :reduce="(pretension) => pretension.pre_id" 
                                label="pre_nombre"  
                                placeholder="-- Seleccione uno --"
                                v-model="datosgenerales.exp_pretencion" 
                                @input="validarCampo('exp_pretencion')"
                                :class="{ 'has-error': errores.exp_pretencion }"
                            />
                             <span class="error-message" v-if="errores.exp_pretencion">Seleccione una Pretension.</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Monto de Pretensión</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white border-1">S/.</span>
                                    </div>
                                    <input type="number" class="form-control" placeholder="5500.00"
                                        v-model="datosgenerales.exp_monto_pretencion"
                                        @input="validarCampo('exp_monto_pretencion')"
                                        :class="{ 'has-error': errores.exp_monto_pretencion }" />
                                </div>
                                <span class="error-message" v-if="errores.exp_monto_pretencion">Ingrese un monto de
                                    Cuantía del Arbitraje.</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Sede del Arbitraje</label>
                                <v-select 
                                        :options="distritos" 
                                        class="form-control" 
                                        :reduce="(distrito) => distrito.judis_id" 
                                        label="judis_nombre"  
                                        placeholder="-- Seleccione uno --"
                                        v-model="datosgenerales.exp_distrito_judicial" 
                                        @input="cargarinstancias"
                                        :class="{ 'has-error': errores.exp_distrito_judicial }"
                                    />
                                <span class="error-message" v-if="errores.exp_distrito_judicial">seleccione ...</span>
                            </div>
                        </div>
                    
                    
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label mb-1">Tribunal Arbitral</label>
                                <v-select 
                                    :options="juzgados.filter(juzgado =>juzgado.type_id === 3)" 
                                    class="form-control" 
                                    :reduce="(juzgado) => juzgado.co_id" 
                                    label="co_nombre"  
                                    placeholder="-- Seleccione una opción --"
                                    v-model="datosgenerales.exp_juzgado" 
                                    @input="validarCampo('exp_juzgado')"
                                    :class="{ 'has-error': errores.exp_juzgado }"
                                />
                                <span class="error-message" v-if="errores.exp_juzgado">Seleccione un Organo
                                    Jurisdiccional.</span>
                            </div>
                        </div> 
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label mb-1">Estado:</label>
                                <select class="form-control" v-model="datosgenerales.exp_estado_proceso"
                                    :class="{ 'has-error': errores.exp_estado_proceso }"
                                    @change="validarCampo('exp_estado_proceso')">
                                    <option value="" disabled selected class="py-5">-- Seleccione una opción</option>
                                    <option value="EN TRAMITE">En Trámite</option>
                                    <option value="EN EJECUCION">En Ejecución</option>
                                    <option value="CONCLUIDO">Concluido</option>
                                </select>
                                <span class="error-message" v-if="errores.exp_estado_proceso">Selecione un estado para el
                                    Expediente.</span>
                            </div>
                        </div>
                    </div>
                    <div class="row" v-if="datosgenerales.exp_estado_proceso == 'EN EJECUCION'
                        || datosgenerales.exp_estado_proceso == 'CONCLUIDO' || datosgenerales.exp_estado_proceso == 'EN TRAMITE'">
                        <div class="col-md-6">
                            <div class="form-group">
                            <label class="form-label" for="MontoPretencion">Gastos Administrativos</label>
                                <input v-model="datosgenerales.exp_monto_ejecucion1" type="number" class="form-control"
                                    id="MontoPretencion" placeholder="S/ 5500.00" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="MontoConsentido">Honorarios Arbitrales</label>
                                <input v-model="datosgenerales.exp_monto_ejecucion2" type="number" class="form-control"
                                    id="MontoConsentido" placeholder="S/ 5000.00" />
                            </div>
                        </div>
                    </div>
                    <div class="row" v-if="datosgenerales.exp_estado_proceso == 'EN EJECUCION'
                        || datosgenerales.exp_estado_proceso == 'CONCLUIDO'">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label" for="Costos">Costo Arbitral</label>
                                <input v-model="datosgenerales.exp_interes1" type="number" class="form-control" id="int1"
                                    placeholder="S/ 450.00" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label" for="MontoPretencion">Interés </label>
                                <input v-model="datosgenerales.exp_interes2" type="number" class="form-control" id="int2"
                                    placeholder="S/ 500.00" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label" for="MontoPretencion">Costos</label>
                                <input v-model="datosgenerales.exp_costos" type="number" class="form-control" id="Costos"
                                    placeholder="S/ 2500.00" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 d-flex justify-content-end">
                            <button class="btn btn-primary btn-lg rounded" type="button" @click="siguienteParte">
                                Siguiente <i data-feather="arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import feather from 'feather-icons';
import { getData, postData } from '../../../utils/fetchData';
import { showLoadingAlert, closeLoadingAlert, warnignAlert, successAlert, errorAlert } from '../../../utils/loader';
import Swal from 'sweetalert2';
export default {
    name: "RegistroGeneral",
    props: {
        exp: {},
        ismultiple: '',
    },
    created() {
        this.isMultiple = this.ismultiple;
        this.listarMaterias();
        this.listarPretensiones();
        this.datosgenerales = this.exp;
        this.cargarinstancias();
        this.cargarespecialidades();
        this.cargarjuzgados();
        this.cargardistritos();
    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
    },
    data() {
        return {
            isMultiple: "",
            distritos: [],
            instancia: [],
            especialidad: [],
            materias: [],
            pretenciones: [],
            distritos: [],
            juzgados: [],
            datosgenerales: {
                exp_numero: "",
                exp_fecha_inicio: "",
                exp_pretencion: "",
                exp_materia: "",
                exp_distrito_judicial: "",
                exp_instancia: "",
                exp_especialidad: "",
                exp_monto_pretencion: "",
                exp_juzgado: "",
                exp_estado_proceso: "",
                exp_costos: "",
                exp_monto_ejecucion1: "",
                exp_monto_ejecucion2: "",
                exp_interes1: "",
                exp_interes2: "",

            },

            selectedFile: null,
            fileError: "",

            errores: {
                file: false,
                exp_numero: false,
                exp_fecha_inicio: false,
                exp_pretencion: false,
                exp_monto_pretencion: false,
                exp_materia: false,
                exp_distrito_judicial: false,
                exp_instancia: false,
                exp_especialidad: false,
                exp_juzgado: false,
                exp_estado_proceso: false
            },
        };
    },
    methods: {

        async listarMaterias() {
            try {
                const result = await getData('subject', this);
                this.materias = result.data;
            } catch (error) {
                this.$handleApiError(error, 'listar materias');
            }
        },
        async listarPretensiones() {
            try {
                const result = await getData('claim', this);
                this.pretenciones = result.data;
            } catch (error) {
                this.$handleApiError(error, 'listar pretensiones');
            }
        },
        async cargardistritos() {
            try {
                const result = await getData('judicialdistrict', this);
                this.distritos = result.data;
            } catch (error) {
                this.$handleApiError(error, 'listar distritos judiciales');
            }
        },
        async cargarjuzgados() {
            if (this.datosgenerales.exp_distrito_judicial) {
                try {
                    const params = {
                        judis_id: this.datosgenerales.exp_distrito_judicial
                    }
                    const result = await postData('juzgado', this, params);
                    this.juzgados = result.data;
                } catch (error) {
                    this.$handleApiError(error, 'listar organos jurisdiccionales');
                }
            }
        },
        async cargarinstancias() {
            if (this.datosgenerales.exp_distrito_judicial) {
                try {
                    const result = await getData('instance', this);
                    this.instancia = result.data;
                    this.cargarjuzgados();
                } catch (error) {
                    this.$handleApiError(error, 'listar instancias');
                }
            }
        },

        async cargarespecialidades() {
            if (this.datosgenerales.exp_distrito_judicial) {
                try {
                    const result = await getData('specialty', this);
                    this.especialidad = result.data;
                } catch (error) {
                    this.$handleApiError(error, 'listar especialidades');
                }
            }
        },

        getJuzgadoNombre(juzgado) {
            return juzgado.co_nombre ? juzgado.co_nombre.toUpperCase() : '';
        },

        onFileChange(event) {
            this.selectedFile = event.target.files[0];
        },

    uploadFile() {
        if (!this.selectedFile) {
        Swal.fire({
            icon: 'warning',
            title: '',
            text: 'Tiene que seleccionar un archivo para cargar datos.',
        });
        return;
    }
        let loadingAlert;
            loadingAlert = Swal.fire({
                title: " Cargando Datos",
                text: "Por favor espera...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

    const formData = new FormData();
    formData.append('excel', this.selectedFile);

    this.$axios.post(
        `${this.$store.getters.get__url}/excel/cargar`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${this.$store.getters.get__token}`
            },
            params: this.archivo
        }
    )
    .then(response => {
        console.log(response.data);
        if (loadingAlert) loadingAlert.close();
                Swal.fire({
                    title: 'Datos Cargados Correctamente',
                    text: `Las filas que tuvieron error  son: ${response.data.data.join(', ')}`,
                    icon: 'success',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$refs.fileInput.value = null;
                        this.selectedFile = null;
                         this.$router.push({ path: '/sisge/expediente/busqueda' });  
                    }
                });
             })
    .catch(error => {
        Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar datos',
                    text: `Ha ocurrido un error al cargar el archivo:${error.response.data.message}`,
                });
                if (loadingAlert) loadingAlert.close();
                console.error(error);
    });
},
 validarCampo(campo) {
            this.errores[campo] = this.datosgenerales[campo] === "";
        },

        validarCampos() {
            Object.keys(this.errores).forEach(propiedadError => {
                this.validarCampo(propiedadError, propiedadError);
            });

            return !Object.values(this.errores).some(error => error);
        },
        siguienteParte() {
            // if (this.validarCampos()) {
                this.$emit("guardardatosgenerales", this.datosgenerales);
                this.$emit("guardarmultiple", this.isMultiple);
                this.$emit("siguienteParte");
            // } else {
            //     console.log('error');
            // }
        },
        mtdChangeMultiple() {
            this.isMultiple = this.isMultiple == "1" ? "0" : "1";
        },
    }
};
</script>

<style scoped>
.currency-symbol {
    position: absolute;
    padding: 10px 20px;
    background-color: transparent;
}

.has-error {
    border: 1px solid #EA4D4D;
}

.error-message {
    /* padding-left: 15px; */
    color: #EA4D4D;
    font-size: 12px;
}

@media only screen and (max-width: 600px) {
    .excel-div {
        display: block !important;
    }

    .excel-input {
        width: 100% !important;
        margin-top: 1em;
        margin-bottom: 1em;
    }

    .excel-btn {
        width: 100%;
    }
}
</style>
