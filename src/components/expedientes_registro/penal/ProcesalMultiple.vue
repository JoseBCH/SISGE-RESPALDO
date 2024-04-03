<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card shadow rounded">
                <div class="card-header">
                    <div class="row d-flex align-items-center">
                        <div class="col-xl-6 col-sm-12">
                            <h5> Registrar Partes Procesales</h5>
                        </div>
                        <div class="col-xl-6 col-sm-12">
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-outline-primary btn-lg rounded px-5" type="button"
                                    @click="mostrarModal">
                                    Lista
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Tipo de parte procesal</label>
                                <select class="form-control" v-model="procesal.procesal">
                                    <option value="" disabled selected>-- Seleccione una opción</option>
                                    <option value="DENUNCIANTE">DENUNCIANTE</option>
                                    <option value="DENUNCIADO">DENUNCIADO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Tipo de persona</label>
                                <select class="form-control" v-model="procesal.tipo">
                                    <option value="" disabled selected>-- Seleccione una opción</option>
                                    <option value="NATURAL">Persona Natural</option>
                                    <option value="JURIDICA">Persona Juridica</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Condición de demandante</label>
                                <select class="form-control" v-model="procesal.condicion">
                                    <option value="" disabled selected>-- Seleccione una opción</option>
                                    <option value="DOCENTE UNIVERSITARIO">Docente Universitario</option>
                                    <option value="ESTUDIANTE">Estudiante</option>
                                    <option value="ADMINISTRATIVO">Administrativo</option>
                                    <option value="TERCERO">Tercero</option>
                                    <option value="FUNCIONARIO">Funcionario</option>
                                </select>

                            </div>
                        </div>
                    </div>
                    <div class="row mb-3" v-if="procesal.tipo != ''">
                        <div class="col-md-12">
                            <div class="alert alert-primary text-primary" role="alert">
                                Informacion Personal
                            </div>
                        </div>
                    </div>
                    <div v-if="procesal.tipo == 'NATURAL'">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label" for="dni">DNI</label>
                                    <input type="text" class="form-control" id="dni" placeholder="12345678"
                                        @keyup="filterpersona()" v-model="procesal.nat_dni" />

                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label">Apellido
                                        Paterno</label>
                                    <input type="text" class="form-control" placeholder="Alarcon"
                                        v-model="procesal.nat_apellido_paterno">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label">Apellido
                                        Materno</label>
                                    <input type="text" class="form-control" placeholder="Ramirez"
                                        v-model="procesal.nat_apellido_materno">

                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label">Nombres</label>
                                    <input type="text" class="form-control" placeholder="Jhon Doe"
                                        v-model="procesal.nat_nombres">

                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label">Telefono</label>
                                    <input type="text" class="form-control" placeholder="980560345"
                                        v-model="procesal.nat_telefono">

                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label">Email
                                    </label>
                                    <input type="text" class="form-control" placeholder="example@gmail.com"
                                        v-model="procesal.nat_correo">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="procesal.tipo == 'JURIDICA'">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label" for="ruc">RUC</label>
                                    <input type="text" class="form-control" id="ruc" placeholder=""
                                    @keyup="filterpersona()" v-model="procesal.jur_ruc">

                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label" for="razonSocial">Nombre o Razon
                                        Social</label>
                                    <input type="text" class="form-control" id="razonSocial" placeholder=""
                                        v-model="procesal.jur_razon_social">

                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label" for="telefono">Telefono</label>
                                    <input type="text" class="form-control" id="telefono" placeholder=""
                                        v-model="procesal.jur_telefono">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label" for="email">Email
                                    </label>
                                    <input type="text" class="form-control" id="email" placeholder=""
                                        v-model="procesal.jur_correo">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row my-2">
                        <div class="col-md-12">
                            <div class="alert alert-primary text-primary" role="alert">
                                Direccion
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="departamento">Departamento</label>
                                <select class="form-control" id="departamento" v-model="procesal.dep_id"
                                    @change="cargarProvinciasConRetraso">
                                    <option value="" selected disabled>Seleccione una opción</option>
                                    <option v-for="departamento in departamentos" :value="departamento.dep_id">{{
                                        departamento.dep_nombre }}
                                    </option>
                                </select>

                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="provincia">Provincia</label>
                                <select class="form-control" id="provincia" v-model="procesal.pro_id"
                                    @change="cargarDistritosConRetraso">
                                    <option value="" selected disabled>Seleccione una opción</option>
                                    <option v-for="provincia in provincias" :value="provincia.pro_id">{{
                                        provincia.pro_nombre }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="distrito">Distrito</label>
                                <select class="form-control" id="distrito" v-model="procesal.dis_id">
                                    <option value="" selected disabled>Seleccione una opción</option>
                                    <option v-for="distrito in distritos" :value="distrito.dis_id">{{ distrito.dis_nombre }}
                                    </option>
                                </select>

                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="calleAvenida">Calle, Avenida, Mz,
                                    S/N</label>
                                <input type="text" class="form-control" id="calleAvenida" placeholder="Av. Peru 2345"
                                    v-model="procesal.dir_calle_av">

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="d-flex">
                            <div class="ml-auto">
                                <button class="btn btn-success btn-lg rounded px-4" @click="addPart"> {{
                                    editingIndex === null ? 'Guardar' : 'Actualizar' }} </button>

                                <button class="btn btn-secondary btn-lg rounded mx-2" type="button"
                                    @click="anteriorParte"><i data-feather="arrow-left"></i> Anterior</button>
                                <button class="btn btn-primary btn-lg rounded" type="button" @click="siguienteParte">
                                    Siguiente<i data-feather="arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showModal" class="modal" @click="cerrarModal">
            <div class="modal-content card border-0" @click.stop>
                <div class="card-header">
                    <h5 class="text-center">Lista de Procesales</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table" id="table">
                            <thead>
                                <tr>
                                    <th class="pl-4">#</th>
                                    <th>Documento</th>
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>Email</th>
                                    <th>Procesal</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(persona, index) in personas" :key="index">
                                    <td class="pl-4">{{ index + 1 }}</td>

                                    <td>{{ persona.nat_dni || persona.jur_ruc }}</td>
                                    <td>{{ persona.nat_nombres || persona.jur_razon_social }}</td>
                                    <td>{{ persona.nat_telefono || persona.jur_telefono }}</td>
                                    <td>{{ persona.nat_correo || persona.jur_correo }}</td>
                                    <td>{{ persona.procesal}}</td>
                                    <td>
                                        <a href="javascript:void(0)" @click="editarPersona(index)">Editar</a>
                                        <a href="javascript:void(0)" @click="eliminarPersona(index)"
                                            class="ml-2 text-danger">
                                            Eliminar</a>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
                <div class="card-footer border-0 pt-2 pb-4">
                    <div class="d-flex">
                        <button class="btn btn-secondary btn-lg ml-auto px-5 rounded" @click="cerrarModal">Cerrar</button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapActions } from "vuex";
import feather from 'feather-icons';
import { getData, postData } from '../../../utils/fetchData';
import "datatables.net-bs5";
export default {
    name: 'RegistroProcesal',
    mounted() {
        this.$nextTick(() => {
            feather.replace();
            this.initDataTable();
            // this.listDemandantes();
        });
    },
    props: {
        Personas: [],
    },
    data() {
        return {
            dataTable: null,
            editingIndex: null,
            departamentos: [],
            provincias: [],
            distritos: [],
            procesal: {
                dir_calle_av: "",
                dis_id: "",
                pro_id: "",
                dep_id: "",
                nat_dni: "",
                nat_apellido_paterno: "",
                nat_apellido_materno: "",
                nat_nombres: "",
                nat_telefono: "",
                nat_correo: "",
                jur_ruc: "",
                jur_razon_social: "",
                jur_telefono: "",
                jur_correo: "",
                jur_rep_legal: "",
                tipo: "",
                procesal: "",
                condicion: "",
            },
            personas: [],
            errores: {
                tipo_procesal: false,
                tipo_persona: false,
                condicion1: false,
                nat_dni: false,
                nat_apellido_materno: false,
                nat_apellido_materno: false,
                nat_nombres: false,
                jur_ruc: false,
                jur_razon_social: false,
                dep_id: false,
                pro_id: false,
                dis_id: false,
                dir_calle_av: false
            },
            modalVisible: false,
            showModal: false,
        };
    },
    async created() {
        this.personas = this.Personas;
        await this.cargarDepartamentos();
    },
    methods: {
        ...mapActions(['get', 'post']),
        editarPersona(index) {
            this.procesal = { ...this.personas[index] };
            this.editingIndex = index;
        },
        eliminarPersona(index) {
            this.personas.splice(index, 1);
        },
        addPart() {
            if (this.editingIndex !== null) {
                this.personas.splice(this.editingIndex, 1, { ...this.procesal });
                this.editingIndex = null;
                this.procesal = {
                    dir_calle_av: "",
                    dis_id: "",
                    pro_id: "",
                    dep_id: "",
                    nat_dni: "",
                    nat_apellido_paterno: "",
                    nat_apellido_materno: "",
                    nat_nombres: "",
                    nat_telefono: "",
                    nat_correo: "",
                    jur_ruc: "",
                    jur_razon_social: "",
                    jur_telefono: "",
                    jur_correo: "",
                    jur_rep_legal: "",
                    tipo: "",
                    procesal: "",
                    condicion: "",
                };
            } else {
                this.personas.push({ ...this.procesal });
                this.procesal = {
                    dir_calle_av: "",
                    dis_id: "",
                    pro_id: "",
                    dep_id: "",
                    nat_dni: "",
                    nat_apellido_paterno: "",
                    nat_apellido_materno: "",
                    nat_nombres: "",
                    nat_telefono: "",
                    nat_correo: "",
                    jur_ruc: "",
                    jur_razon_social: "",
                    jur_telefono: "",
                    jur_correo: "",
                    jur_rep_legal: "",
                    tipo: "",
                    procesal: "",
                    condicion: "",
                };
            }
        },
        async cargarDepartamentos() {
            try {
                const response = await getData('department', this);
                this.departamentos = response.data;
                this.provincias = [];
                this.distritos = [];
            } catch (error) {
                this.$handleApiError(error, 'cargar departamentos');
            }
        },
        async cargarProvincias() {
            if (this.procesal.dep_id) {
                try {
                    const params = { dep_id: this.procesal.dep_id };
                    const response = await postData('department/provincias', this, params);
                    this.provincias = response.data;
                } catch (error) {
                    this.$handleApiError(error, 'cargar provincias');
                }
            }
        },
        async cargarDistritos() {
            if (this.procesal.pro_id) {
                try {
                    const params = { pro_id: this.procesal.pro_id };
                    const response = await postData('department/distritos', this, params);
                    this.distritos = response.data;
                } catch (error) {
                    this.$handleApiError(error, 'cargar provincias');
                }
            }
        },
        cargarProvinciasConRetraso() {
            setTimeout(() => {
                this.cargarProvincias();
            }, 500);
        },

        cargarDistritosConRetraso() {
            setTimeout(() => {
                this.cargarDistritos();
            }, 1000);
        },
        anteriorParte: function () {
            this.$emit('anteriorParte');
            this.$emit('guardarPersona', this.personas);
        },
        siguienteParte: function () {
            if (this.personas.length === 0) {
                return console.info('debe registrar por lo menos una persona');
            }
            this.$emit('siguienteParte');
            this.$emit('guardarPersona', this.personas);
        },
        mostrarModal() {
            this.initDataTable();
            this.showModal = true;
        },
        cerrarModal() {
            this.showModal = false;
        },
        async filterpersona() {
            let loadingAlert;
            if (this.procesal.tipo=='NATURAL') {
                if (this.procesal.nat_dni.length===8) {
                loadingAlert = Swal.fire({
                  title: "Buscando",
                 text: "Por favor espera...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
                   });
                    try {
                        const response = await axios.post(`${this.$store.getters.get__url}/proceeding/filterprocesal`, {
                            doc:this.procesal.nat_dni,
                            tipo:this.procesal.tipo,
                        }, {
                            headers: {
                                Authorization: `Bearer ${this.$store.getters.get__token}`,
                            },
                        });
                        if (loadingAlert) loadingAlert.close();
                        if (response.data.state==0) {
                            Swal.fire('Datos Encontrados',
                                'Ok',
                                'success');
                                //this.pnat.nat_dni=response.data.data;
                                this.procesal.nat_apellido_paterno=response.data.data.nat_apellido_paterno;
                                this.procesal.nat_apellido_materno=response.data.data.nat_apellido_materno;
                                this.procesal.nat_nombres=response.data.data.nat_nombres;
                                this.procesal.nat_telefono=response.data.data.nat_telefono;
                                this.procesal.nat_correo=response.data.data.nat_correo;
                                this.procesal.dep_id=response.data.dir.dep_id;
                                this.cargarProvincias();
                                this.procesal.pro_id=response.data.dir.pro_id;
                                this.cargarDistritos();
                                this.procesal.dis_id=response.data.dir.dis_id;
                                this.procesal.dir_calle_av=response.data.dir.dir_calle_av;
                         }
                        else {
                            Swal.fire('Datos No encontrados',
                                'Registre',
                                'warning');
                                this.procesal.dir_calle_av = "";
                                this.procesal.dis_id= "";
                                this.procesal.pro_id= "";
                                this.procesal.dep_id= "";
                                this.procesal.nat_apellido_paterno= "";
                                this.procesal.nat_apellido_materno= "";
                                this.procesal.nat_nombres= "";
                                this.procesal.nat_telefono= "";
                                this.procesal.nat_correo= "";
                        }
                        } catch (error) {
                        if (loadingAlert) loadingAlert.close();
                        Swal.fire('Datos No encontrados',
                        'Registre',
                                'warning');
                                
                                    this.procesal.dir_calle_av = "";
                                    this.procesal.dis_id= "";
                                    this.procesal.pro_id= "";
                                    this.procesal.dep_id= "";
                                    this.procesal.nat_apellido_paterno= "";
                                    this.procesal.nat_apellido_materno= "";
                                    this.procesal.nat_nombres= "";
                                    this.procesal.nat_telefono= "";
                                    this.procesal.nat_correo= "";
                              
                    }
                } 
            } else {
                if (this.procesal.jur_ruc.length===11) {  
                loadingAlert = Swal.fire({
                  title: "Buscando",
                 text: "Por favor espera...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
                   });
                    try {
                        const response = await axios.post(`${this.$store.getters.get__url}/proceeding/filterprocesal`, {
                            doc:this.procesal.jur_ruc,
                            tipo:this.procesal.tipo,
                        }, {
                            headers: {
                                Authorization: `Bearer ${this.$store.getters.get__token}`,
                            },
                        });
                        if (loadingAlert) loadingAlert.close();
                        if (response.data.state==0) {
                            Swal.fire('Datos Encontrados',
                                'Ok',
                                'success');
                                //this.pnat.nat_dni=response.data.data;
                                this.procesal.jur_razon_social=response.data.data.jur_razon_social;
                                this.procesal.jur_telefono=response.data.data.jur_telefono;
                                this.procesal.jur_correo=response.data.data.jur_correo;
                                this.procesal.jur_rep_legal=response.data.data.jur_rep_legal;
                                this.procesal.dep_id=response.data.dir.dep_id;
                                this.cargarProvincias();
                                this.procesal.pro_id=response.data.dir.pro_id;
                                this.cargarDistritos();
                                this.procesal.dis_id=response.data.dir.dis_id;
                                this.procesal.dir_calle_av=response.data.dir.dir_calle_av;

                         }
                        else {
                            Swal.fire('Datos No encontrados',
                                'Registre',
                                'warning');
                               
                                    this.procesal.dir_calle_av= "";
                                    this.procesal.dis_id= "";
                                    this.procesal.pro_id= "";
                                    this.procesal.dep_id= "";
                                    this.procesal.jur_razon_social="";
                                    this.procesal.jur_telefono="";
                                    this.procesal.jur_correo="";
                                    this.procesal.jur_rep_legal="";
                               
                        }
                        } catch (error) {
                        if (loadingAlert) loadingAlert.close();
                        Swal.fire('Datos No encontrados',
                        'Registre',
                                'warning');
                                this.procesal.dir_calle_av= "";
                                    this.procesal.dis_id= "";
                                    this.procesal.pro_id= "";
                                    this.procesal.dep_id= "";
                                    this.procesal.jur_razon_social="";
                                    this.procesal.jur_telefono="";
                                    this.procesal.jur_correo="";
                                    this.procesal.jur_rep_legal="";
                        // this.handleError("Error al actualizar el expediente", error);
                    }
                }
            
        }
        },
        initDataTable() {
            this.$nextTick(() => {
                this.dataTable = $("#table").DataTable({
                    language: {
                        url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
                    },
                });
                feather.replace();
            });
        },
    },
};
</script>
<style scoped>
.has-error {
    border: 1px solid #EA4D4D;
}

.valid-input {
    border: 1px solid #17C666;
}

.error-message {
    color: #EA4D4D;
    font-size: 12px;
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
    width: 800px;
    height: auto !important;
    /* padding: 20px; */
    border-radius: 8px !important;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    position: relative !important;
}
</style>
  