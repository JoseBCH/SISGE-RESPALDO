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
                        <div class="card-body pt-5 px-5">
                            <div class="row mb-4">
                                <div class="col-md-3 d-flex align-items-center">
                                    <label class="form-label">Lista de abogados</label>
                                </div>
                                <div class="col-md-4">
                                    <select class="form-control fade-transition" v-model="abogado_asignado">
                                        <option value="" disabled selected>Seleccionar</option>
                                        <option v-for="lawyer in lawyers" :value="lawyer.abo_id">
                                            {{ completeNames(lawyer) }}
                                        </option>
                                    </select>
                                </div>

                            </div>
                            <div class="row mb-4">
                                <div class="col-md-3 d-flex align-items-center">
                                    <label for="letras" class="form-label mt-2">Escriba las letras a asignar</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" @input="validarYConvertirLetra" v-model="letraInput"
                                            @keydown.enter.prevent="agregarLetra" class="form-control"
                                            placeholder="Ingrese hasta dos letras" maxlength="2">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 mt-2">
                                    <label class="form-label">Letras a asignar al abogado: </label>
                                </div>
                                <div class="col-md-4 mt-2">
                                    <div v-if="letrasSeleccionadas.length > 0">
                                        <span v-for="(letra, index) in letrasSeleccionadas" :key="index"
                                            :class="{ 'letra-seleccionada': true, 'duplicada': letraEsDuplicada(letra) }"
                                            @click="quitarLetra(index)">
                                            {{ letra }}
                                        </span>
                                    </div>
                                    <div v-else>
                                        <span>No hay letras seleccionadas.</span>
                                    </div>
                                </div>
                                <!-- <div v-if="letrasSeleccionadas.length > 0" class="col-md-auto ml-auto">
                                    <p class="text-danger">{{ contadorExpedientesFiltrados }} expedientes encontrados</p>
                                </div> -->
                            </div>
                          
                            <!-- <div class="row border-top pt-4 pb-1" v-if="expedientes.length === 0 && !isLoading">
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
                            </div> -->
                            <!-- <div class="table-responsive">
                                <table class="table" id="table" ref="myDataTable">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>N° de Expediente</th>
                                            <th>Fecha de Inicio</th>
                                            <th>Parte procesal</th>
                                            <th>Materia/Delito</th>
                                            <th>Pretensión</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(expediente, index) in expedientesFiltrados" :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td>
                                                <router-link
                                                    :to="{ name: 'expediente/detalle', params: { id: expediente.exp_id } }">
                                                    {{ expediente.numero }}
                                                </router-link>
                                            </td>
                                            <td>{{ expediente.fecha_inicio }}</td>
                                            <td>{{ isDemandante(expediente.procesal, expediente.multiple) }}</td>
                                            <td>{{ expediente.materia }}</td>
                                            <td>{{ expediente.pretencion }}</td>
                                            <td>
                                                <span :class="badgeClass(expediente.estado_proceso)">
                                                    {{ expediente.estado_proceso }}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> -->
                        </div>
                        <div class="card-footer px-5">
                            <div class="d-flex">
                                <button class="btn btn-success px-5 rounded btn-lg ml-auto"
                                            @click="asignarExpedientes">Asignar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script>
import feather from 'feather-icons';
import DataTable from '@/utils/dataTable';
import { badgeClass } from '@/utils/utils.js'

export default {
    name: "abogado",
    mixins: [DataTable],
    created() {
        this.loadSelectedOptions();
        // this.cargarExpedientes();
        this.listLawyers();
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
            letrasSeleccionadas: [],
            letraDuplicada: null,
            parpadeoInterval: null,
            nombreAbogado: '',
            name: '',
            alfabeto: "A,B,C,CH,D,E,F,G,H,I,J,K,L,LL,M,N,Ñ,O,P,Q,R,S,T,U,V,W,X,Y,Z"
        };
    },
    computed: {
      
    },

    methods: {

        validarYConvertirLetra() {
            const letrasPermitidas = ["A", "B", "C", "CH", "D", "E", "F", "G", "H", "I", "J", "K", "L", "LL", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

            // Convertir a mayúsculas y verificar si la entrada está en la lista permitida
            this.letraInput = this.letraInput.toUpperCase();
            if (!letrasPermitidas.includes(this.letraInput)) {
                this.letraInput = ''; // Limpiar la entrada si no es válida
            }
        },
       
        agregarLetra() {
            const letrasIngresadas = this.letraInput.toUpperCase();

            if (letrasIngresadas.length > 0 && this.alfabeto.includes(letrasIngresadas)) {
                if (!this.letrasSeleccionadas.includes(letrasIngresadas)) {
                    this.letrasSeleccionadas.push(letrasIngresadas);
                    console.log(this.letrasSeleccionadas);
                    this.letraInput = '';
                } else {
                    this.letraDuplicada = letrasIngresadas;
                    this.letraInput = '';
                    this.iniciarParpadeo();

                    setTimeout(() => {
                        this.letraDuplicada = null;
                        this.detenerParpadeo();
                    }, 2000);
                }
            }
        },
        quitarLetra(index) {
            this.letrasSeleccionadas.splice(index, 1);
        },
        letraEsDuplicada(letra) {
            return this.letraDuplicada === letra;
        },
        iniciarParpadeo() {
            let tonoAzul = '#7267EF';
            let tonoRojoOriginal = '#EA4D4D';
            let tonoRojoIntenso = '#FF0000';
            let usandoRojoOriginal = true;

            this.parpadeoInterval = setInterval(() => {
                usandoRojoOriginal = !usandoRojoOriginal;
                document.querySelectorAll('.letra-seleccionada.duplicada').forEach(element => {
                    element.style.backgroundColor = usandoRojoOriginal ? tonoRojoOriginal : tonoRojoIntenso;
                });
            }, 500);
        },
        detenerParpadeo() {
            clearInterval(this.parpadeoInterval);
            document.querySelectorAll('.letra-seleccionada.duplicada').forEach(element => {
                element.style.backgroundColor = '#7267EF';
            });
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
            this.nombreAbogado = `${lawyer.nat_nombres} ${lawyer.nat_apellido_paterno} ${lawyer.nat_apellido_materno}`;
            return `${lawyer.nat_nombres} ${lawyer.nat_apellido_paterno} ${lawyer.nat_apellido_materno}`;
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
                console.log(response);
                this.lawyers = response.data;
                this.lawyersWithFiles = response.data.filter(lawyerWith => lawyerWith.abo_carga_laboral > 0);
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar abogados');
            }
        },

        async namea(id) {
            const selectedLawyer = this.lawyers.find(lawyer => lawyer.abo_id === id);
            if (selectedLawyer) {
                this.name = `${selectedLawyer.nat_nombres} ${selectedLawyer.nat_apellido_paterno} ${selectedLawyer.nat_apellido_materno}`;
            } else {
                this.name = ''; // O algún valor predeterminado si el abogado no se encuentra
            }
        },
        asignarExpedientes() {
            if (this.abogado_asignado === '' || this.letrasSeleccionadas.length === 0) {
                this.$warnignAlert('', 'Seleccione un abogado y las letras a asignar.');
                return;
            }
            try {
                this.namea(this.abogado_asignado);
                this.$warningAlertWithCancel(
                    'Asignación de abogado',
                    `Confirmar asignación de expedientes al abogado ${this.name}?`,
                    this.confirmarAsignacion,
                );
            } catch (error) {
                this.$handleApiError(error, error.message);
            }
        },

        async confirmarAsignacion() {
            try {
                this.$showLoadingAlert('', 'Asignando expedientes...');
                const formData = {
                    abogado_asignado: this.abogado_asignado,
                    letras_selecionadas: this.letrasSeleccionadas
                }
                console.log(formData);
                const response = await this.$postData('lawyer/changeOfLawyer', this, formData);
                console.log(response);
                if (response.state === 0) {
                    this.abogado_asignado = '';
                    this.letrasSeleccionadas = [];
                this.$closeLoadingAlert();
                this.$successAlert('Asignación Correcta!','Se han asignado' +response.cantidad+"expediente(s).");
                }
            } catch (error) {
                this.$handleApiError(error, error.message);
                this.$errorAlert('', error);
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

        async cargarExpedientes() {
            try {
                // this.$showLoadingAlert();
                const result = await this.$getData('proceeding', this);
                this.expedientes = result.data;
                console.log(result);
                await this.$waitForDataTableDraw(this, 'myDataTable');
                // this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar expedientes');
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

       
        badgeClass,
    },

};
</script>
  
<style scoped>
@import '@/assets/css/fileStatus.css';
@import '@/assets/css/dataTable.css';

.letra-seleccionada {
    display: inline-block;
    background-color: #7267EF;
    /*width: 1.5rem;*/
    text-align: center;
    padding: 5px;
    margin: 2px;
    color: white;
    cursor: pointer;
    border-radius: 2px;
    transition: background-color 0.5s;
}

.letra-seleccionada.duplicada {
    background-color: #EA4D4D;
}
</style>
  