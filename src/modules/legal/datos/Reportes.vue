<template>
    <section class="pc-container pb-4">
        <div class="pcoded-content">
            <div class="row mb-4">
                <h5 class="text-dark fw-bold">Generacion de Reportes</h5>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card shadow">
                        <div class="card-header">
                            <h5>Reportes Automatizados</h5>
                        </div>
                        <div class="card-body">
                            <div class="row mb-3">
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <a href="javascript:void(0)" class="py-0 w-100 ">
                                        <div class="d-flex align-items-center p-2 bg-light rounded"
                                            @click="generarPDFexptra()">
                                            <div
                                                class="d-flex align-items-center justify-content-center bg-primary rounded-pill p-2 text-white">
                                                <i data-feather="file-text"></i>
                                            </div>
                                            <div class="px-2">Expedientes en Trámite</div>
                                            <i data-feather="download" class="ml-auto"></i>
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <a href="javascript:void(0)" class="py-0 w-100 ">
                                        <div class="d-flex align-items-center p-2 bg-light rounded"
                                            @click="generarPDFexpejec()">
                                            <div
                                                class="d-flex align-items-center justify-content-center bg-primary rounded-pill p-2 text-white">
                                                <i data-feather="file-text"></i>
                                            </div>
                                            <div class="px-2">Expedientes en Ejecución</div>
                                            <i data-feather="download" class="ml-auto"></i>
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <a href="javascript:void(0)" class="py-0 w-100 ">
                                        <div class="d-flex align-items-center p-2 bg-light rounded"
                                            @click="generarPDFexps()">
                                            <div
                                                class="d-flex align-items-center justify-content-center bg-primary rounded-pill p-2 text-white">
                                                <i data-feather="file-text"></i>
                                            </div>
                                            <div class="px-2">Total de Expedientes</div>
                                            <i data-feather="download" class="ml-auto"></i>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <a href="javascript:void(0)" class="py-0 w-100 ">
                                        <div class="d-flex align-items-center p-2 bg-light rounded"
                                            @click="generarPDFpretensiones()">
                                            <div
                                                class="d-flex align-items-center justify-content-center bg-primary rounded-pill p-2 text-white">
                                                <i data-feather="file-text"></i>
                                            </div>
                                            <div class="px-2">Total de Reclamación Monetaria</div>
                                            <i data-feather="download" class="ml-auto"></i>
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <a href="javascript:void(0)" class="py-0 w-100 ">
                                        <div class="d-flex align-items-center p-2 bg-light rounded"
                                            @click="generarPDFejecuciones()">
                                            <div
                                                class="d-flex align-items-center justify-content-center bg-primary rounded-pill p-2 text-white">
                                                <i data-feather="file-text"></i>
                                            </div>
                                            <div class="px-2">Total de Pretensión en Ejecución</div>
                                            <i data-feather="download" class="ml-auto"></i>
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <a href="javascript:void(0)" class="py-0 w-100 ">
                                        <div class="d-flex align-items-center p-2 bg-light rounded"
                                            @click="generarPDFbarras()">
                                            <div
                                                class="d-flex align-items-center justify-content-center bg-primary rounded-pill p-2 text-white">
                                                <i data-feather="file-text"></i>
                                            </div>
                                            <div class="px-2">Cantidad de Demandas por Año</div>
                                            <i data-feather="download" class="ml-auto"></i>
                                      </div>
                                    </a>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <a href="javascript:void(0)" class="py-0 w-100 ">
                                        <div class="d-flex align-items-center p-2 bg-light rounded"
                                            @click="generarPDFarchivados()">
                                            <div
                                                class="d-flex align-items-center justify-content-center bg-primary rounded-pill p-2 text-white">
                                                <i data-feather="file-text"></i>
                                            </div>
                                            <div class="px-2">Expedientes Archivados</div>
                                            <i data-feather="download" class="ml-auto"></i>
                                      </div>
                                    </a>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <a href="javascript:void(0)" class="py-0 w-100 ">
                                        <div class="d-flex align-items-center p-2 bg-light rounded"
                                            @click="generarPDFtypeabo()">
                                            <div
                                                class="d-flex align-items-center justify-content-center bg-primary rounded-pill p-2 text-white">
                                                <i data-feather="file-text"></i>
                                            </div>
                                            <div class="px-2">Cantidad de Expedientes por Abogado</div>
                                            <i data-feather="download" class="ml-auto"></i>
                                      </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row ">
                <div class="col-md-12">
                    <div class="card shadow">
                        <div class="card-header">
                            <h5>Reportes Personalizados</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="form-label">Reportes de expediente Desde-Hasta</label>
                                    <div class="row">
                                        <div class="col-md-5">
                                            <div class="form-group">
                                                <input type="date" class="form-control" v-model="fecha_desde">
                                            </div>
                                        </div>
                                        <div class="col-md-5">
                                            <div class="form-group">
                                                <input type="date" class="form-control" v-model="fecha_hasta"
                                                    :min="fecha_desde">
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <button class="btn btn-primary w-100 rounded" :disabled="fecha_hasta === ''"
                                                    @click="generarPDFintervalos()">Generar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <label class="form-label">Reportes de expedientes por Mes y Año</label>
                            <div class="row">
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <select class="form-control" v-model="selectedMonth">
                                            <option value="" disabled selected>--Mes</option>
                                            <option v-for="(month, index) in months" :value="index + 1">{{ month }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <select class="form-control" v-model="selectedYear">
                                            <option value="" disabled selected>--Año</option>
                                            <option v-for="year in years" :value="year">{{ year }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <button class="btn btn-primary w-100 rounded" :disabled="selectedMonth === ''"
                                            @click="generarPDFmesaño()">Generar</button>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Reporte de expedientes por Materia</label>
                                        <div class="row">
                                            <div class="col-md-10">
                                                <select class="form-control" v-model="rep_materia">
                                                    <option value="" disabled selected>--Seleccione una Materia
                                                    </option>
                                                    <option v-for="materia in materias" :value="materia.mat_id"
                                                        :key="materia.mat_id">{{
                                                            materia.mat_nombre }}</option>
                                                </select>
                                            </div>
                                            <div class="col-md-2">
                                                <button class="btn btn-success w-100 rounded" type="button"
                                                    @click="generarPDFmateria()" :disabled="rep_materia === ''">
                                                    <i data-feather="download"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Reporte de expedientes por Pretensión</label>
                                        <div class="row">
                                            <div class="col-md-10">
                                                <select class="form-control" v-model="rep_pretension">
                                                    <option value="" disabled selected>--Seleccione una Pretensión
                                                    </option>
                                                    <option v-for="pretension in pretensiones" :value="pretension.pre_id"
                                                        :key="pretension.pre_id">{{
                                                            pretension.pre_nombre }}</option>
                                                </select>
                                            </div>
                                            <div class="col-md-2">
                                                <button class="btn btn-success w-100 rounded" type="button"
                                                    @click="generarPDFpretension()" :disabled="rep_pretension === ''">
                                                    <i data-feather="download"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Reporte de expedientes asignados a un Abogado</label>
                                        <div class="row">
                                            <div class="col-md-10">
                                                <select class="form-control" v-model="rep_abogado">
                                                    <option value="" disabled selected>--Seleccione un Abogado
                                                    </option>
                                                    <option v-for="abogado in abogados" :value="abogado.abo_id"
                                                        :key="abogado.nat_dni">{{
                                                            nombreCompleto(abogado) }}</option>
                                                </select>
                                            </div>
                                            <div class="col-md-2">
                                                <button class="btn btn-success w-100 rounded" type="button"
                                                    :disabled="rep_abogado === ''" @click="generarPDFexpsAbogado()">
                                                    <i data-feather="download"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showModal" class="modal" @click="cerrarModal">
         <div class="modal-content card border-0" @click.stop>
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Seleccionar Rango de Fechas</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="fechaDesde">Fecha Desde</label>
                        <input type="date" class="form-control" v-model="fecha_desde_modal">
                    </div>
                    <div class="form-group">
                        <label for="fechaHasta">Fecha Hasta</label>
                        <input type="date" class="form-control" v-model="fecha_hasta_modal" :min="fecha_desde_modal">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>
</section>
</template>
<script>
import { mapActions } from "vuex";
import axios from 'axios';
import feather from 'feather-icons';
import Swal from 'sweetalert2';

export default {
    name: 'reporte',
    data() {
        
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = currentYear; year >= 2000; year--) {
            years.push(year);
        }
        return {
            modalVisible: false,
            showModal: false,
            fecha_desde_modal: "",
            fecha_hasta_modal: "",
            selectedYear: currentYear,
            years,
            selectedMonth: '',
            months: [
                'Enero', 'Febrero', 'Marzo', 'Abril',
                'Mayo', 'Junio', 'Julio', 'Agosto',
                'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            rep_materia: '',
            materias: [
            ],
            rep_especialidad: '',
            especialidades: [
            ],
            rep_pretension: '',
            pretensiones: [
            ],
            abogados: [],
            rep_abogado: "",
            fecha_desde: "",
            fecha_hasta: "",
            distritos: [],
            provincias: [],
            id_distrito: "",
            id_provincia: ""
        };
    },
    updated() {
        feather.replace();
    },
    mounted() {
        this.cargarDatos();
        const currentYear = new Date().getFullYear();
        for (let year = 2000; year <= 2030; year++) {
            this.years.push(year);
        }
    },
    computed: {
        isGenerarEnabled() {
            return this.rep_materia !== '';
            return this.rep_especialidad !== '';
            return this.rep_abogado !== '';
        }
    },
    methods: {
        ...mapActions(['get', 'post']),
        cerrarModal() {
            this.showModal = false;
        },
        generarPDFarchivados(){
            this.generatePDFWithAlert('/reportespfd/pdfexparchivados', {
            });
        },

        async listarMaterias() {
            try {
                this.$showLoadingAlert();
                const result = await this.$getData('subject', this);
                this.materias = result.data;
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'listar materias');
            }
        },
        async listarPretensiones() {
            try {
                const result = await this.$getData('claim', this);
                this.pretensiones = result.data;
            } catch (error) {
                this.$handleApiError(error, 'listar pretensiones');
            }
        },
        async listarAbogados() {
            try {
                const result = await this.$getData('lawyer', this);
                this.abogados = result.data;
            } catch (error) {
                this.$handleApiError(error, 'listar abogados');
            }
        },
        async listardistricts() {
            try {
                const result = await this.$postData('reportes/distritos', this);
                this.distritos = result.distritos;
                this.provincias = result.provincias;
            } catch (error) {
                this.$handleApiError(error, 'listar distritos');
            }
        },

        async cargarDatos() {
            try {
                await this.listarMaterias();
                setTimeout(async () => {
                    await this.listarPretensiones();
                    await this.listarAbogados();
                    // await this.listardistricts();
                    console.log('Todas las funciones cargadas exitosamente');
                }, 500); // Retraso de medio segundo

            } catch (error) {
                this.$handleApiError(error, 'cargar datos');
            }
        },

        nombreCompleto(abogado) {
            return `${abogado.nat_nombres} ${abogado.nat_apellido_paterno} ${abogado.nat_apellido_materno}`;
        },
        generarPDFexptra() {
            // this.showModal=true;
            this.generatePDFWithAlert('/reportespfd/pdfexptramite', {
            });
        },
        generarPDFexpsAbogado() {
            this.generatePDFWithAlert('/reportespfd/pdfexpsabogado', {
                abo_id: this.rep_abogado
            });
        },
        generarPDFexpejec() {
            this.generatePDFWithAlert('/reportespfd/pdfexpejecucion', {
            });
        },
        generarPDFexps() {
            this.generatePDFWithAlert('/reportespfd/pdfexps', {
            });
        },
        generarPDFmesaño() {
            this.generatePDFWithAlert('/reportespfd/pdffechaaño', {
                mes: this.selectedMonth,
                año: this.selectedYear,
            });
        },
        generarPDFmateria() {
            this.generatePDFWithAlert('/reportespfd/pdfmateria', {
                exp_materia: this.rep_materia
            });
        },
        generarPDFpretension() {
            this.generatePDFWithAlert('/reportespfd/pdfpretension', {
                exp_pretension: this.rep_pretension,
            });
        },
        generarPDFpretensiones() {
            this.generatePDFWithAlert('/reportespfd/pdfpretensiones', {
            });
        },
        generarPDFejecuciones() {

            this.generatePDFWithAlert('/reportespfd/pdfejecuciones', {
            });

        },
        generarPDFintervalos() {
            this.generatePDFWithAlert('/reportespfd/pdffechas', {
                fechaDesde: this.fecha_desde,
                fechaHasta: this.fecha_hasta
            });
        },
        generarPDFdistrito() {
            this.generatePDFWithAlert('/reportespfd/pdfdistrito', {
                distrito: this.id_distrito
            });
        },
        generarPDFbarras() {
            this.generatePDFWithAlert('/reportespfd/pdfbarras', { 
            });
        },
        generarPDFtypeabo(){
            this.generatePDFWithAlert('/reportespfd/abocantidad', { 
            });
        },
        async generatePDFWithAlert(ruta, param) {
            const url = this.$store.getters.get__url + ruta;
            const token = this.$store.getters.get__token;
            const usu_id = this.$store.getters.get__idusu;
            let loadingAlert;
            loadingAlert = Swal.fire({
                title: "Generando Reporte",
                text: "Por favor espera...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });
            axios.get(url, {
                responseType: 'blob',
                params: {
                    usu_id: usu_id,
                    ...param
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                if (loadingAlert) loadingAlert.close();
                Swal.fire({
                    title: 'Reporte generado',
                    text: 'Presiona OK para abrir el Reporte.',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        const blob = new Blob([response.data], {
                            type: response.headers['content-type'],
                        });
                        // const url = window.URL.createObjectURL(blob);
                        // window.open(url, '_blank');
                        // window.URL.revokeObjectURL(url);
                        let name='Reporte_sisge.pdf'
                        const cleanFileName = name.replace(/[^\w\s.]/gi, ''); 
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = cleanFileName;
                        link.click();
                    }
                });
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo generar el Reporte, Vuelve a Intentar.',
                });
                if (loadingAlert) loadingAlert.close();
                console.error(error);
            });
        }
    }
}


</script>

</script>
<style scoped>
/* .btn-success {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
} */

.tr-hover {
    border-bottom: 1px solid #f0f0f0;
    padding: 12px 20px;
}

.tr-hover:hover {
    padding-top: 10px;
    background-color: #f5f5f5;
    cursor: pointer;
}

.title-report {
    font-size: 12.5px;
    margin-top: 5px;
}

.circle-icon {
    background-color: #7267EF;
    color: #fff;
    padding: 8px;
    margin: 0px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
