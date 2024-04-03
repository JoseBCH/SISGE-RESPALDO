<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card shadow">
                <div class="card-header">
                    <h5 class="text-secondary">Partes Procesales</h5>
                </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Tipo de parte procesal</label>
                                <select class="form-control" v-model="tipo_procesal"
                                    @change="validarSelect('tipo_procesal')"
                                    :class="{ 'has-error': errores.tipo_procesal }">
                                    <option value="" disabled selected>-- Seleccione una opción</option>
                                    <option value="DENUNCIANTE">DENUNCIANTE</option>
                                    <option value="DENUNCIADO">DENUNCIADO</option>
                                </select>
                                <span class="text-danger" v-if="errores.tipo_procesal">Seleccione el Tipo de Parte
                                    Procesal.</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Tipo de persona</label>
                                <select class="form-control" v-model="tipo_persona" @change="validarSelect('tipo_persona')"
                                    :class="{ 'has-error': errores.tipo_persona }">
                                    <option value="" disabled selected>-- Seleccione una opción</option>
                                    <option value="NATURAL">Persona Natural</option>
                                    <option value="JURIDICA">Persona Juridica</option>
                                </select>
                                <span class="text-danger" v-if="errores.tipo_persona">Seleccione el Tipo de
                                    Persona.</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Condición de procesal</label>
                                <select class="form-control" v-model="condicion1" @change="validarSelect('condicion1')"
                                    :class="{ 'has-error': errores.condicion1 }">
                                    <option value="" disabled selected>-- Seleccione una opción</option>
                                    <option value="DOCENTE UNIVERSITARIO" selected>Docente Universitario</option>
                                    <option value="ESTUDIANTE">Estudiante</option>
                                    <option value="ADMINISTRATIVO">Administrativo</option>
                                    <option value="TERCERO">Tercero</option>
                                </select>
                                <span class="text-danger" v-if="errores.condicion1">Seleccione condicion del
                                    demandante.</span>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-12">
                            <div class="alert alert-primary text-primary" role="alert">
                                Informacion Personal
                            </div>
                        </div>
                    </div>
                    <div v-if="tipo_persona === 'NATURAL'">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label" for="dni">DNI</label>
                                    <input type="text" class="form-control" id="dni" placeholder="12345678"
                                        v-model="pnat.nat_dni" @keyup="filterpersona()" @input="validarCampo('nat_dni')"
                                        :class="{ 'has-error': errores.nat_dni }">
                                    <span class="text-danger" v-if="errores.nat_dni">Ingrese DNI.</span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label">Apellido
                                        Paterno</label>
                                    <input type="text" class="form-control" placeholder="Alarcon"
                                        v-model="pnat.nat_apellido_paterno" @input="validarCampo('nat_apellido_paterno')"
                                        :class="{ 'has-error': errores.nat_apellido_paterno }">
                                    <span class="text-danger" v-if="errores.nat_apellido_paterno">Ingrese Apellido
                                        Paterno</span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label">Apellido
                                        Materno</label>
                                    <input type="text" class="form-control" placeholder="Ramirez"
                                        v-model="pnat.nat_apellido_materno" @input="validarCampo('nat_apellido_materno')"
                                        :class="{ 'has-error': errores.nat_apellido_materno }">
                                    <span class="text-danger" v-if="errores.nat_apellido_materno">
                                        Ingrese Apellido Materno.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label">Nombres</label>
                                    <input type="text" class="form-control" placeholder="Jhon Doe"
                                        v-model="pnat.nat_nombres" @input="validarCampo('nat_nombres')"
                                        :class="{ 'has-error': errores.nat_nombres }">
                                    <span class="text-danger" v-if="errores.nat_nombres">
                                        Ingrese Nombre.
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label">Telefono</label>
                                    <input type="text" class="form-control" placeholder="980560345"
                                        v-model="pnat.nat_telefono">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label">Email
                                    </label>
                                    <input type="text" class="form-control" placeholder="example@gmail.com"
                                        v-model="pnat.nat_correo">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="tipo_persona === 'JURIDICA'">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label" for="ruc">RUC</label>
                                    <input type="text" class="form-control" id="ruc" @keyup="filterpersona()" placeholder=""
                                        v-model="pj.jur_ruc" @input="validarCampo('jur_ruc')"
                                        :class="{ 'has-error': errores.jur_ruc }">
                                    <span class="text-danger" v-if="errores.jur_ruc">
                                        Ingrese RUC.
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label" for="razonSocial">Nombre o Razon
                                        Social</label>
                                    <input type="text" class="form-control" id="razonSocial" placeholder=""
                                        v-model="pj.jur_razon_social" @input="validarCampo('jur_razon_social')"
                                        :class="{ 'has-error': errores.jur_razon_social }">
                                    <span class="text-danger" v-if="errores.jur_razon_social">
                                        Ingrese la Razon Social.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label" for="telefono">Telefono</label>
                                    <input type="text" class="form-control" id="telefono" placeholder=""
                                        v-model="pj.jur_telefono">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label" for="email">Email
                                    </label>
                                    <input type="text" class="form-control" id="email" placeholder=""
                                        v-model="pj.jur_correo">
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
                                <select class="form-control" id="departamento" v-model="direccion.dep_id"
                                    @change="cargarProvincias" :class="{ 'has-error': errores.dep_id }">
                                    <option value="" selected disabled>Seleccione una opción</option>
                                    <option v-for="departamento in departamentos" :value="departamento.dep_id">{{
                                        departamento.dep_nombre }}
                                    </option>
                                </select>
                                <span class="text-danger" v-if="errores.dep_id">
                                    Seleccione un Departamento.
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="provincia">Provincia</label>
                                <select class="form-control" id="provincia" v-model="direccion.pro_id"
                                    @change="cargarDistritos" :class="{ 'has-error': errores.pro_id }">
                                    <option value="" selected disabled>Seleccione una opción</option>
                                    <option v-for="provincia in provincias" :value="provincia.pro_id">{{
                                        provincia.pro_nombre }}</option>
                                </select>
                                <span class="text-danger" v-if="errores.pro_id">
                                    Seleccione una Provincia.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="distrito">Distrito</label>
                                <select class="form-control" id="distrito" v-model="direccion.dis_id"
                                    @change="validarCampo('dis_id')" :class="{ 'has-error': errores.dis_id }">
                                    <option value="" selected disabled>Seleccione una opción</option>
                                    <option v-for="distrito in distritos" :value="distrito.dis_id">{{ distrito.dis_nombre }}
                                    </option>
                                </select>
                                <span class="text-danger" v-if="errores.dis_id">
                                    Seleccione un Distrito.
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="calleAvenida">Calle, Avenida, Mz,
                                    S/N</label>
                                <input type="text" class="form-control" id="calleAvenida" placeholder="Av. Peru 2345"
                                    v-model="direccion.dir_calle_av" @input="validarCampo('dir_calle_av')"
                                    :class="{ 'has-error': errores.dir_calle_av }">
                                <span class="text-danger" v-if="errores.dir_calle_av">
                                    Ingrese una Calle, Avenida o S/N.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="d-flex">
                            <div class="ml-auto">
                                <button class="btn btn-secondary btn-lg rounded" type="button" @click="anteriorParte"><i
                                        data-feather="arrow-left"></i> Anterior</button>
                                <button class="btn btn-primary btn-lg rounded ml-2" type="button" @click="siguienteParte">
                                    Siguiente<i data-feather="arrow-right"></i>
                                </button>
                            </div>
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
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'RegistroProcesal',
    props: {
        pn: {},
        pj: {},
        dir: {},
        tipopersona: "",
        procesal: "",
        condicion: ""
    },
    data() {
        return {
            esPersonaNatural: true,
            departamentos: [],
            provincias: [],
            distritos: [],
            direccion: {
                dir_calle_av: "",
                dis_id: "",
                pro_id: "",
                dep_id: ""
            },
            pnat: {
                nat_dni: "",
                nat_apellido_paterno: "",
                nat_apellido_materno: "",
                nat_nombres: "",
                nat_telefono: "",
                nat_correo: ""
            },
            pjuc: {
                jur_ruc: "",
                jur_razon_social: "",
                jur_telefono: "",
                jur_correo: "",
                jur_rep_legal: ""
            },
            tipo_procesal: "",
            tipo_persona: "",
            condicion1: "",
            errores: {
                tipo_procesal: false,
                tipo_persona: false,
                condicion1: false,
                nat_dni: false,
                nat_apellido_paterno: false,
                nat_apellido_materno: false,
                nat_nombres: false,
                jur_ruc: false,
                jur_razon_social: false,
                dep_id: false,
                pro_id: false,
                dis_id: false,
                dir_calle_av: false

            }
        };
    },
    async created() {
        this.pnat = this.pn;
        this.pjuc = this.pj;
        this.direccion = this.dir;
        this.tipo_persona = this.tipopersona;
        this.condicion1 = this.condicion1;
        if (this.tipo_persona == '') {
            this.tipo_persona = "NATURAL";
        } {
            if (this.tipo_persona == 'NATURAL') {
                this.tipo_persona = "NATURAL";
            } else {
                this.tipo_persona = "JURIDICA";
            }
        }
        this.tipo_procesal = this.procesal;
        if (this.tipo_procesal == '') {
            this.tipo_procesal = "DEMANDANTE";
        } {
            if (this.tipo_procesal == 'DEMANDANTE') {
                this.tipo_procesal = "DEMANDANTE";
            } else {
                this.tipo_procesal = "DEMANDADO";
            }
        }
        await this.cargarDepartamentos();
        if (this.direccion.dep_id) {
            await this.cargarProvincias();
        }
        if (this.direccion.pro_id) {
            await this.cargarDistritos();
        }

    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
        this.formData = this.$store.getters.getFormData;
    },
    methods: {
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
            this.direccion.pro_id = "";
            this.direccion.dis_id = "";
            this.provincias = [];
            this.distritos = [];
            this.validarCampo('dep_id');
            if (this.direccion.dep_id) {
                try {
                    const params = { dep_id: this.direccion.dep_id };
                    const response = await postData('department/provincias', this, params);
                    this.provincias = response.data;
                } catch (error) {
                    this.$handleApiError(error, 'cargar provincias');
                }
            }
        },
        async cargarDistritos() {
            this.direccion.dis_id = "";
            this.distritos = [];
            this.validarCampo('pro_id');
            if (this.direccion.pro_id) {
                try {
                    const params = { pro_id: this.direccion.pro_id };
                    const response = await postData('department/distritos', this, params);
                    this.distritos = response.data;
                } catch (error) {
                    this.$handleApiError(error, 'cargar provincias');
                }
            }
        },
        validarSelect(campo) {
            this.errores[campo] = this[campo] === "";
        },
        validarSelects() {
            this.validarSelect('tipo_procesal');
            this.validarSelect('tipo_persona');
            this.validarSelect('condicion1');
            return !Object.values(this.errores).some(error => error);
        },
        validarCampo(campo) {
            if (this.tipo_persona === 'NATURAL') {
                this.errores[campo] = this.direccion[campo] === "" || this.pnat[campo] === "";
            }
            if (this.tipo_persona === 'JURIDICA') {
                this.errores[campo] = this.direccion[campo] === "" || this.pjuc[campo] === "";
            }
        },
        validarCampos() {
            Object.keys(this.errores).forEach(propiedadError => {
                this.validarCampo(propiedadError, propiedadError);
            });

            return !Object.values(this.errores).some(error => error);
        },

        emitirEventos() {
            this.$emit('guardarpn', this.pnat);
            this.$emit('guardarpj', this.pjuc);
            this.$emit('guardardir', this.direccion);
            this.$emit('guardartipopersona', this.tipo_persona);
            this.$emit('guardarprocesal', this.tipo_procesal);
            this.$emit('guardarcondicion', this.condicion1);
        },
        anteriorParte() {
            this.$emit('anteriorParte');
            this.emitirEventos();

        },
        siguienteParte() {
            if (this.validarCampos() && this.validarSelects()) {
                this.emitirEventos();
                this.$emit("siguienteParte");

            }
        },
        async filterpersona() {
            let loadingAlert;
            if (this.tipo_persona == 'NATURAL') {
                if (this.pnat.nat_dni.length === 8) {
                    loadingAlert = Swal.fire({
                        title: "Buscando",
                        text: "Por favor espera...",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        didOpen: () => Swal.showLoading()
                    });
                    try {
                        const response = await axios.post(`${this.$store.getters.get__url}/proceeding/filterprocesal`, {
                            doc: this.pnat.nat_dni,
                            tipo: this.tipo_persona,
                        }, {
                            headers: {
                                Authorization: `Bearer ${this.$store.getters.get__token}`,
                            },
                        });
                        if (loadingAlert) loadingAlert.close();
                        if (response.data.state == 0) {
                            Swal.fire('Datos Encontrados',
                                'Ok',
                                'success');
                            //this.pnat.nat_dni=response.data.data;
                            this.pnat.nat_apellido_paterno = response.data.data.nat_apellido_paterno;
                            this.pnat.nat_apellido_materno = response.data.data.nat_apellido_materno;
                            this.pnat.nat_nombres = response.data.data.nat_nombres;
                            this.pnat.nat_telefono = response.data.data.nat_telefono;
                            this.pnat.nat_correo = response.data.data.nat_correo;
                            this.direccion.dep_id = response.data.dir.dep_id;
                            this.cargarProvincias();
                            this.direccion.pro_id = response.data.dir.pro_id;
                            this.cargarDistritos();
                            this.direccion.dis_id = response.data.dir.dis_id;
                            this.direccion.dir_calle_av = response.data.dir.dir_calle_av;

                        }
                        else {
                            Swal.fire('Datos No encontrados',
                                'Registre',
                                'warning');
                            this.direccion = {
                                dir_calle_av: "",
                                dis_id: "",
                                pro_id: "",
                                dep_id: ""
                            };
                            this.pnat.nat_apellido_paterno="";
                            this.pnat.nat_apellido_materno="";
                            this.pnat.nat_nombres="";
                            this.pnat.nat_telefono="";
                            this.pnat.nat_correo="";
                        }
                    } catch (error) {
                        if (loadingAlert) loadingAlert.close();
                        Swal.fire('Datos No encontrados',
                            'Registre',
                            'warning');
                        this.direccion = {
                            dir_calle_av: "",
                            dis_id: "",
                            pro_id: "",
                            dep_id: ""
                        };
                        
                            this.pnat.nat_apellido_paterno="";
                            this.pnat.nat_apellido_materno="";
                            this.pnat.nat_nombres="";
                            this.pnat.nat_telefono="";
                            this.pnat.nat_correo="";
                      
                        this.handleError("Error al actualizar el expediente", error);
                    }
                }
            } else {
                if (this.pj.jur_ruc.length === 11) {
                    loadingAlert = Swal.fire({
                        title: "Buscando",
                        text: "Por favor espera...",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        didOpen: () => Swal.showLoading()
                    });
                    try {
                        const response = await axios.post(`${this.$store.getters.get__url}/proceeding/filterprocesal`, {
                            doc: this.pj.jur_ruc,
                            tipo: this.tipo_persona,
                        }, {
                            headers: {
                                Authorization: `Bearer ${this.$store.getters.get__token}`,
                            },
                        });
                        if (loadingAlert) loadingAlert.close();
                        if (response.data.state == 0) {
                            Swal.fire('Datos Encontrados',
                                'Ok',
                                'success');
                            //this.pnat.nat_dni=response.data.data;
                            this.pjuc.jur_razon_social = response.data.data.jur_razon_social;
                            this.pjuc.jur_telefono = response.data.data.jur_telefono;
                            this.pjuc.jur_correo = response.data.data.jur_correo;
                            this.pjuc.jur_rep_legal = response.data.data.jur_rep_legal;
                            this.direccion.dep_id = response.data.dir.dep_id;
                            this.cargarProvincias();
                            this.direccion.pro_id = response.data.dir.pro_id;
                            this.cargarDistritos();
                            this.direccion.dis_id = response.data.dir.dis_id;
                            this.direccion.dir_calle_av = response.data.dir.dir_calle_av;

                        }
                        else {
                            Swal.fire('Datos No encontrados',
                                'Registre',
                                'warning');
                            this.direccion = {
                                dir_calle_av: "",
                                dis_id: "",
                                pro_id: "",
                                dep_id: ""
                            };
                        
                                this.pjuc.jur_razon_social="";
                                this.pjuc.jur_telefono="";
                                this.pjuc.jur_correo="";
                                this.pjuc.jur_rep_legal="";
                            
                        }
                    } catch (error) {
                        if (loadingAlert) loadingAlert.close();
                        Swal.fire('Datos No encontrados',
                            'Registre',
                            'warning');
                        this.direccion = {
                            dir_calle_av: "",
                            dis_id: "",
                            pro_id: "",
                            dep_id: ""
                        };
                        this.pjuc.jur_razon_social="";
                                this.pjuc.jur_telefono="";
                                this.pjuc.jur_correo="";
                                this.pjuc.jur_rep_legal="";
                        this.handleError("Error al actualizar el expediente", error);
                    }
                }

            }
        }
    },
};
</script>
<style scoped>
.has-error {
    border: 1px solid #EA4D4D;
}

.text-danger {
    font-size: 12px;
}
</style>
  