<template>
    <section class="pc-container pb-4">
        <div class="pcoded-content">
            <div class="row mb-4">
                <div class="col-xl-12">
                    <h5 class="text-dark fw-bold">
                        <button class="btn btn-sm mr-2 btn-primary" @click="goBack">
                                    <i data-feather="arrow-left"></i>
                                </button>Registro de Nuevo Expediente</h5>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card shadow rounded">
                        <div class="card-header">
                            <div class="row d-flex align-items-center">
                                <div class="col-lg-6 col-md-auto col-sm-12">
                                    <h5>Datos Generales</h5>
                                </div>
                            </div>
                        </div>
                        <div class="card-body mb-0">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">N° de Expediente</label>
                                        <input type="text" class="form-control" placeholder="01-2024-OAJ"
                                            v-model="datosgenerales.tra_number" @input="validarCampo('tra_number')"
                                            :class="{ 'has-error': errores.tra_number }" />
                                        <span class="error-message" v-if="errores.tra_number">Ingrese un numero de
                                            expediente.</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Nombre del Exp.</label>
                                        <input type="text" class="form-control" placeholder="Solicitud de bolsa de trabajo"
                                            v-model="datosgenerales.tra_name" @input="validarCampo('tra_name')"
                                            :class="{ 'has-error': errores.tra_name }" />
                                        <span class="error-message" v-if="errores.tra_name">Ingrese el nombre del
                                            expediente.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Asunto</label>
                                        <input type="text" class="form-control" placeholder="Escriba aquí ..."
                                            v-model="datosgenerales.tra_matter" @input="validarCampo('tra_matter')"
                                            :class="{ 'has-error': errores.tra_matter }" />
                                        <span class="error-message" v-if="errores.tra_matter">Ingrese un asunto de
                                            oficio</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Oficina de origen</label>
                                        <select class="form-control" v-model="datosgenerales.tra_area"
                                            :class="{ 'has-error': errores.tra_area }" @change="validarCampo('tra_area')">
                                            <option value="" disabled selected class="py-5">-- Seleccione una opción
                                            </option>
                                            <option v-for="(area) in areas" :key="area.are_id" :value="area.are_id"
                                                class="py-3">
                                                {{ area.are_name }}
                                            </option>
                                        </select>
                                        <span class="error-message" v-if="errores.tra_area">Seleccione una
                                            Ocifina de origen.</span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Fecha de llegada</label>
                                        <input class="form-control" type="date" v-model="datosgenerales.tra_arrival_date"
                                            @input="validarCampo('tra_arrival_date')"
                                            :class="{ 'has-error': errores.tra_arrival_date }" />
                                        <span class="error-message" v-if="errores.tra_arrival_date">Ingrese una fecha de
                                            llegada.</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="flexRadioDefault"
                                                    id="flexRadioDefault1" checked value="abogado"
                                                    v-model="datosgenerales.selectOption">
                                                <label class="form-check-label" for="flexRadioDefault1"> Abogado</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="flexRadioDefault"
                                                    id="flexRadioDefault2" value="asistente"
                                                    v-model="datosgenerales.selectOption">
                                                <label class="form-check-label" for="flexRadioDefault2">
                                                    Asistente
                                                </label>
                                            </div>
                                        </label>

                                        <select v-if="datosgenerales.selectOption === 'abogado'" class="form-control"
                                            v-model="datosgenerales.tra_abogado"
                                            :class="{ 'has-error': errores.tra_abogado }"
                                            @change="validarCampoAboAsi('tra_abogado')">
                                            <option value="" disabled selected class="py-5">-- Seleccione una opción
                                            </option>
                                            <option v-for="(abogado, index) in abogados" :key="index"
                                                :value="abogado.abo_id" class="py-3">
                                                {{ abogado.nat_nombres }} {{ abogado.nat_apellido_paterno }} {{
                                                    abogado.nat_apellido_materno }}
                                            </option>
                                        </select>
                                        <span class="error-message"
                                            v-if="errores.tra_abogado && datosgenerales.selectOption === 'abogado'">Asigne
                                            un abogado</span>
                                        <select v-if="datosgenerales.selectOption === 'asistente'" class="form-control"
                                            v-model="datosgenerales.tra_asistente"
                                            :class="{ 'has-error': errores.tra_asistente }"
                                            @change="validarCampoAboAsi('tra_asistente')">
                                            <option value="" disabled selected class="py-5">-- Seleccione una opción
                                            </option>
                                            <option v-for="(asistente, index) in asistentes" :key="index"
                                                :value="asistente.ass_id" class="py-3">
                                                {{ asistente.nat_nombres }} {{ asistente.nat_apellido_paterno }} {{
                                                    asistente.nat_apellido_materno }}
                                            </option>
                                        </select>
                                        <span class="error-message"
                                            v-if="errores.tra_asistente && datosgenerales.selectOption === 'asistente'">Asigne
                                            un asistente</span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Expediente de recepción (opcional)</label>
                                        <input type="text" class="form-control" placeholder="5670-2017-0-1708-JM-LA-01"
                                            v-model="datosgenerales.tra_number_ext" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Documento de recepción (opcional)</label>
                                        <input type="text" class="form-control" placeholder="01-2024-OAJ"
                                            v-model="datosgenerales.tra_doc_recep" />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div class="row">
                                <div class="col-md-12">
                                    <label for="exampleDataList" class="form-label"><i data-feather="user-plus"
                                            class="text-black"></i> Asignar Responsables</label>
                                    <div class="d-flex align-items-center">
                                        <input class="form-control" list="datalistOptions" id="exampleDataList"
                                            v-model="nuevoResponsable" placeholder="Buscar ..."
                                            :class="{ 'has-error': this.tra_person }"
                                            @change="validarCampoResponsable(nuevoResponsable)">
                                        <datalist id="datalistOptions">
                                            <option v-for="(person, index) in persons" :key="index"
                                                :data-id="person.nat_dni">
                                                {{ person.nat_dni }}: {{ person.nat_nombres }} {{
                                                    person.nat_apellido_paterno }}
                                                {{ person.nat_apellido_materno }}
                                            </option>
                                        </datalist>
                                        <button class="btn btn-outline-dark btn-xl rounded mx-4" type="button"
                                            @click="agregarResponsable()">
                                            Agregar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <span class="error-message" v-if="responsables.length === 0">Asigne al menos
                                un responsable</span>
                            <div class="row py-3">
                                <div class="col-md-12">
                                    <div v-if="responsables.length === 0" class="alert alert-light" role="alert">
                                        No se ha asignado ningún responsable
                                    </div>
                                    <div v-else>
                                        <ul class="list-group list-group-flush">
                                            <li v-for="(responsable, index) in responsables" :key="index"
                                                class="list-group-item">{{ responsable }}</li>
                                        </ul>
                                        <button class="btn btn-secondary btn-lg rounded mx-4" type="button"
                                            @click="limpiarResponsable()">
                                            Limpiar
                                        </button>
                                    </div>

                                </div>
                            </div>

                            <div class="row py-3">

                                <div class="col-md-12 d-flex justify-content-end">
                                    <button class="btn btn-primary btn-lg rounded" type="button" @click="guardar">
                                        Guardar <i data-feather="arrow-right"></i>
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
import feather from 'feather-icons';
import { getData, postData } from '@/utils/fetchData';
import { showLoadingAlert, closeLoadingAlert, warnignAlert, successAlert, errorAlert } from '@/utils/loader';
import Swal from 'sweetalert2';
export default {
    name: "RegistroGeneral",
    props: {
        exp: {},
    },
    data() {
        return {
            trade: null
        }
    },
    created() {
        this.listarAreas();
        this.listarAbogados();
        this.listarAsistentes();
        //Para oficio
        this.listarPersons();
    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
    },
    data() {
        return {
            areas: [],
            abogados: [],
            asistentes: [],
            persons: [],
            responsables: [],
            responsablesId: [],
            nuevoResponsable: '',  // Variable para almacenar el nuevo responsable
            persons: [],
            //error si no se asigna responsables
            tra_person: false,
            datosgenerales: {
                tra_number: "",
                tra_name: "",
                tra_number_ext: "",
                tra_doc_recep: "",
                //tra_are_id
                tra_area: "",
                tra_matter: "",
                tra_arrival_date: "",
                //Oficio en ejecucion
                tra_state_law: 'P',
                //tra_abo_id
                tra_abogado: "",
                //tra_ass_id
                tra_asistente: "",

                //select
                selectOption: "abogado",

            },

            selectedFile: null,
            fileError: "",

            errores: {
                file: false,
                tra_number: false,
                tra_name: false,
                tra_number_ext: false,
                tra_area: false,
                tra_matter: false,
                tra_arrival_date: false,
                tra_abogado: false,
                tra_asistente: false,
            },
        };
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

        async listarAbogados() {
            try {
                const result = await getData('lawyer', this);
                this.abogados = result.data;
            } catch (error) {
                this.$handleApiError(error, 'listar abogados');
            }
        },

        async listarAsistentes() {
            try {
                const result = await getData('assistant', this);
                this.asistentes = result.data;
            } catch (error) {
                this.$handleApiError(error, 'listar asistentes');
            }
        },

        async listarPersons() {
            try {
                const result = await getData('person', this);
                this.persons = result.data;
            } catch (error) {
                this.$handleApiError(error, 'listar personas');
            } finally{
                this.$closeLoadingAlert();
            }
        },

        async guardar() {
            if (this.validarCampos()) {
                const area = this.areas.find(area => area.are_id === this.datosgenerales.tra_area);
                try {

                    this.loader = true;
                    const formData = {
                        tra_number: this.datosgenerales.tra_number,
                        tra_name: this.datosgenerales.tra_name,
                        tra_number_ext: this.datosgenerales.tra_number_ext,
                        tra_matter: this.datosgenerales.tra_matter,
                        tra_arrival_date: this.datosgenerales.tra_arrival_date,
                        tra_state_mp: "F",
                        tra_obs: "F",
                        tra_state_law: this.datosgenerales.tra_state_law,
                        tra_ubication: area.are_name,
                        tra_are_id: this.datosgenerales.tra_area,
                        tra_abo_id: this.datosgenerales.tra_abogado,
                        tra_ass_id: this.datosgenerales.tra_asistente,
                        responsablesId: this.responsablesId,
                    }
                    const response = await this.$postData('trade/create', this, formData);
                    if (response.state === 'success') {
                        this.trade = response.data;
                        this.$router.push({
                            name: 'oficio/detalle',
                            params: { id: this.trade.tra_id}
                        });
                        this.loader = false;
                    }
                } catch (error) {
                    // Captura y maneja el error aquí
                    console.error('Error en la función guardar:', error);

                    // Puedes mostrar mensajes de error o realizar otras acciones según tus necesidades
                    if (error.response) {
                        console.error('Respuesta del servidor:', error.response.data);
                    } else if (error.message) {
                        console.error('Mensaje de error:', error.message);
                    }

                    this.$handleApiError(error, 'crear oficio');
                }
            } else {
                console.log('error');
            }
        },

        agregarResponsable() {
            // Verifica que el nuevo responsable no esté vacío antes de agregarlo
            this.tra_person = false;
            if (this.nuevoResponsable.trim() !== '') {
                // Busca la persona seleccionada en el array persons
                const selectedPerson = this.persons.find(person =>
                    this.nuevoResponsable.includes(person.nat_dni));

                // Verifica que la persona seleccionada existe y no está en la lista
                if (selectedPerson && !this.responsablesId.includes(selectedPerson.per_id)) {
                    this.responsablesId.push(selectedPerson.per_id);
                    this.responsables.push(this.nuevoResponsable);
                    this.nuevoResponsable = ''; // Limpiar el input después de agregar el responsable
                } else {
                    this.nuevoResponsable = '';
                }
            }
        },

        limpiarResponsable() {
            this.responsablesId = [];
            this.responsables = [];
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
            formData.append('pdf', this.selectedFile);

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
                    //console.log(response.data);
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

        validarCampoAboAsi(campo) {
            this.errores[campo] = this.datosgenerales[campo] === "";
            if (campo === 'tra_abogado') {
                this.errores['tra_asistente'] = false;
                this.datosgenerales['tra_asistente'] = "";
            } else {
                this.errores['tra_abogado'] = false;
                this.datosgenerales['tra_abogado'] = "";
            }
            console.log('Asistente: ' + this.errores['tra_asistente']);
            console.log('Abogado: ' + this.errores['tra_abogado']);
        },

        validarCampoResponsable(campo) {
            if (campo === "" && this.responsables.length === 0) {
                this.tra_person = true;
            } else {
                this.tra_person = false;
            }
        },

        validarCampos() {
            Object.keys(this.errores).forEach(propiedadError => {
                this.validarCampo(propiedadError, propiedadError);
            });
            if (!this.tra_person && this.responsables.length === 0) {
                this.tra_person = true;
            }
            if (!this.errores['tra_asistente']) {
                this.errores['tra_abogado'] = false;
            }
            if (!this.errores['tra_abogado']) {
                this.errores['tra_asistente'] = false;
            }

            return !Object.values(this.errores).some(error => error);
        },

        goBack() {
            if (this.$store.getters.get__user.usu_rol === 'ABOGADO') {
                this.$router.push({ path: '/oficio/asignados' });
            } else {
                this.$router.go(-1);
            }
        }

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
    .pdf-div {
        display: block !important;
    }

    .pdf-input {
        width: 100% !important;
        margin-top: 1em;
        margin-bottom: 1em;
    }

    .pdf-btn {
        width: 100%;
    }
}
</style>