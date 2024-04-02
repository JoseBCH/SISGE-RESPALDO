<template>
    <section class="pc-container pb-4">
        <div class="pcoded-content">
            <div class="row mb-4">
                <h5 class="">
                    <span class="text-primary">Asignacion de abogados a expedientes</span>
                </h5>
            </div>
            <div class="row">
                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label class="form-label">Lista de abogados</label>
                                        <select class="form-control fade-transition" v-model="abogado_asignado">
                                            <option value="" disabled selected>Seleccionar</option>
                                            <option v-for="lawyer in lawyers" :value="lawyer.abo_id">
                                                {{ completeNames(lawyer) }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="letras" class="form-label">Seleccione las letras a asignar</label>
                                        <input type="text" @keydown="limitarUnaLetra" @input="validarYConvertirLetra"
                                            v-model="letraInput" @keydown.enter.prevent="agregarLetra"
                                            class="form-control mb-3" placeholder="Ingrese una letra">
                                    </div>
                                </div>
                                <!-- <div class="col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label class="form-label">Nuevo abogado a asignar a los expedientes</label>
                                        <select class="form-control fade-transition" v-model="newlawyer">
                                            <option value="" disabled selected>-- Seleccionar</option>
                                            <option v-for="lawyer in lawyers" :value="lawyer.abo_id">
                                                {{ completeNames(lawyer) }}
                                            </option>
                                        </select>
                                    </div>
                                </div> -->
                                <div class="col-md-4 col-sm-4" style="margin-top: 27.5px !important">
                                    <div class="d-flex justify-content-end">
                                        <button class="btn btn-success px-4 rounded btn-lg"
                                            @click="saveChanges">Asignar</button>

                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 col-md-12">
                                    <div v-if="letrasSeleccionadas.length > 0">
                                        <span v-for="(letra, index) in letrasSeleccionadas" :key="index"
                                            class="letra-seleccionada" @click="quitarLetra(index)">
                                            {{ letra }}
                                        </span>
                                    </div>
                                    <p v-else>No hay letras seleccionadas.</p>
                                </div>
                            </div>
                            <div class="row border-top pt-4 pb-1" v-if="expedientes.length === 0 && !isLoading">
                                <div class="col-md-12">
                                    <p class="text-center text-secondary">Seleccione un abogado para visualizar sus
                                        expedientes.</p>
                                </div>
                            </div>
                            <div class="row border-top pt-4 pb-1" v-else-if="expedientes.length === 0 && isLoading">
                                <div class="col-md-12 text-center">
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Obteniendo expedientes...
                                </div>
                            </div>
                            <div class="table-responsive" v-else>
                                <table class="table" id="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>N° de Expediente</th>
                                            <th>Fecha de Inicio</th>
                                            <th>Demandante</th>
                                            <th>Demandado</th>
                                            <th>Pretensión</th>
                                            <th>Materia</th>
                                            <th class="text-center">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(expediente, index) in expedientes" :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td class="col-md-2">{{ expediente.numero }}</td>
                                            <td>{{ expediente.fecha_inicio }}</td>
                                            <td>{{ isDemandante(expediente.procesal, expediente.multiple) }}</td>
                                            <td>{{ isDemandado(expediente.procesal, expediente.multiple) }}</td>
                                            <td>{{ expediente.pretencion }}</td>
                                            <td>{{ expediente.materia }}</td>
                                            <td class="text-center">
                                                <span :class="badgeClass(expediente.estado_proceso)">
                                                    {{ expediente.estado_proceso }}
                                                </span>
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
    </section>
</template>
  
<script>

import $ from 'jquery';
import feather from 'feather-icons';

export default {
    name: "abogado",
    created() {
        this.loadSelectedOptions();
        this.listLawyers();
        this.cargarExpedientes();
    },
    beforeDestroy() {
        this.saveSelectedOptions();
        this.clearLocalStorage();
    },

    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
    },
    data() {
        return {
            dataTable: null,
            abogado_asignado: '',
            assignedAttorney: "",
            newlawyer: "",
            lawyersWithFiles: null,
            lawyers: null,
            expedientes: [],
            isLoading: false,

            letraInput: '',
            letrasSeleccionadas: []
        };
    },
    computed: {
        letraInputMayuscula() {
            return this.letraInput.toUpperCase();
        }
    },

    methods: {

        limitarUnaLetra(event) {
            // Limita el input a una sola letra
            if (this.letraInput.length >= 1 && event.key !== 'Backspace') {
                event.preventDefault();
            }
        },
        validarYConvertirLetra() {
            // Validar y convertir la letra a mayúsculas
            const letra = this.letraInput.charAt(0).toUpperCase();
            // Si es una letra válida, asignarla al modelo
            if (/^[A-Z]$/.test(letra)) {
                this.letraInput = letra;
            } else {
                // Si no es una letra válida, limpiar el modelo
                this.letraInput = '';
            }
        },
        agregarLetra() {
            // Verifica que la entrada sea una letra del alfabeto en mayúsculas
            if (/^[A-Z]$/.test(this.letraInput)) {
                // Agrega la letra en mayúsculas al array de letras seleccionadas
                this.letrasSeleccionadas.push(this.letraInput);

                // Limpia el input
                this.letraInput = '';
            }
        },
        quitarLetra(index) {
            // Quita la letra del array de letras seleccionadas
            this.letrasSeleccionadas.splice(index, 1);
        },

        saveSelectedOptions() {
            localStorage.setItem('assignedAttorney', this.assignedAttorney);
            localStorage.setItem('newlawyer', this.newlawyer);
        },
        loadSelectedOptions() {
            const assignedAttorney = localStorage.getItem('assignedAttorney');
            const newlawyer = localStorage.getItem('newlawyer');

            if (assignedAttorney !== null && newlawyer !== null) {
                this.assignedAttorney = assignedAttorney;
                this.newlawyer = newlawyer;
            }
        },
        clearLocalStorage() {
            localStorage.removeItem('assignedAttorney');
            localStorage.removeItem('newlawyer');
        },

        completeNames(lawyer) {
            return `${lawyer.nat_nombres} ${lawyer.nat_apellido_paterno} ${lawyer.nat_apellido_materno}`;
        },

        badgeClass(estado) {
            return {
                'badge tramite p-2 rounded': estado === 'En Tramite',
                'badge ejecucion p-2 rounded': estado === 'En Ejecucion',
            };
        },

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        isValidSelection() {
            return this.assignedAttorney !== 'default_value' && this.newlawyer !== 'default_value';
        },

        async listLawyers() {
            try {
                this.$showLoadingAlert();
                const response = await this.$getData('lawyer', this);
                this.lawyers = response.data;
                this.lawyersWithFiles = response.data.filter(lawyerWith => lawyerWith.abo_carga_laboral > 0);
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar abogados');
            }
        },

        async cargarExpedientes() {
            try {
                this.isLoading = true;
                const formData = {
                    abo_id: this.assignedAttorney
                };
                const response = await this.$postData('lawyer/expedientes', this, formData);
                this.expedientes = response.data;
                this.initDataTable();
                this.saveSelectedOptions();
                this.isLoading = false;
                // await this.$waitForDataTableDraw(this, 'myDataTable');
            } catch (error) {
                this.$handleApiError(error, 'cargar expedientes');
            }
        },

        async saveChanges() {
            if (!this.isValidSelection()) {
                this.$warnignAlert('', 'Por favor, selecciona abogados válidos antes de guardar cambios.');
                return;
            }
            try {
                this.$showLoadingAlert('', 'Procesando cambios');
                const filesShown = this.expedientes.map(e => e.exp_id);
                const formData = {
                    expedientes: filesShown,
                    abogado_actual: this.assignedAttorney,
                    abogado_nuevo: this.newlawyer
                }
                const response = await this.$postData('lawyer/changeOfLawyer', this, formData);

                if (response.state == 0) {
                    await this.cargarExpedientes();
                    this.assignedAttorney = "";
                    this.newlawyer = "";
                    await this.delay(500);

                    await this.listLawyers();

                    this.$closeLoadingAlert();
                }
            } catch (error) {
                this.$handleApiError(error, error.message);
            }
        },

        isDemandante(procesal, multiple) {
            return procesal[0].tipo_procesal === 'DEMANDANTE'
                ? this.nombreCompleto(procesal, multiple)
                : 'UNPRG';
        },
        isDemandado(procesal, multiple) {
            return procesal[0].tipo_procesal === 'DEMANDADO'
                ? this.nombreCompleto(procesal, multiple)
                : 'UNPRG';
        },
        nombreCompleto(procesal, multiple) {
            if (multiple === '1') {
                return 'Demanda Colectiva';
            }

            const tipoPersona = procesal[0].tipo_persona;
            const { apellido_paterno, apellido_materno, nombres, razon_social } = procesal[0];

            return tipoPersona === 'NATURAL'
                ? `${apellido_paterno} ${apellido_materno} ${nombres}`
                : razon_social;
        },

        initDataTable() {
            if (this.dataTable) {
                this.dataTable.destroy();
            }

            this.$nextTick(() => {
                this.dataTable = $('#table').DataTable({
                    language: {
                        url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
                    },
                });
                feather.replace();
            });
        },
        isDemandante(procesal, multiple) {
            return procesal[0].tipo_procesal === 'DEMANDANTE'
                ? this.nombreCompleto(procesal, multiple)
                : 'UNPRG';
        },
        isDemandado(procesal, multiple) {
            return procesal[0].tipo_procesal === 'DEMANDADO'
                ? this.nombreCompleto(procesal, multiple)
                : 'UNPRG';
        },
        nombreCompleto(procesal, multiple) {
            if (multiple === '1') {
                return 'Demanda Colectiva';
            }

            const tipoPersona = procesal[0].tipo_persona;
            const { apellido_paterno, apellido_materno, nombres, razon_social } = procesal[0];

            return tipoPersona === 'NATURAL'
                ? `${apellido_paterno} ${apellido_materno} ${nombres}`
                : razon_social;
        },
    },

};
</script>
  
<style scoped>
@import '@/assets/css/fileStatus.css';
@import '@/assets/css/dataTable.css';

.letra-seleccionada {
    background-color: blue;
    padding: 5px;
    margin: 2px;
    color: white;
    cursor: pointer;
}
</style>
  