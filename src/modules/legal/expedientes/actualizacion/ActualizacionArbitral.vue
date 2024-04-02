<template>
    <section class="pc-container pb-4">
        <div class="pcoded-content">
            <div class="row mb-4">
                <h5 class="text-dark fw-bold">Actualizacion de los datos del Expediente</h5>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card shadow">
                        <div class="card-body pb-2">
                            <div class="row mb-2">
                                <div class="col-md-12">
                                    <div class="alert alert-primary text-primary" role="alert">
                                        Informacion general
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="NumeroExpediente">N° de Expediente</label>
                                        <input v-model="expediente.exp_numero" type="text" class="form-control"
                                            id="NumeroExpediente" placeholder="5670-2017-0-1708-JM-LA-01" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="FechaInicio">Fecha de Inicio</label>
                                        <input v-model="expediente.exp_fecha_inicio" type="date" class="form-control"
                                            id="FechaInicio" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="Pretencion">Pretensión</label>
                                        <select class="form-control" id="ControlSelectMateria"
                                            v-model="expediente.exp_pretencion">
                                            <option value="" disabled selected class="py-5">--SELECCIONAR</option>
                                            <option v-for="pretension in pretenciones" :value="pretension.pre_id"
                                                :key="pretension.pre_id">{{
                                                    pretension.pre_nombre }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="MontoPretencion">Monto de Pretensión</label>
                                        <input v-model="expediente.exp_monto_pretencion" type="number" class="form-control"
                                            id="MontoPretencion" placeholder="" />
                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="ControlSelectMateria">Materia</label>
                                        <select class="form-control" id="ControlSelectMateria"
                                            v-model="expediente.exp_materia">
                                            <option value="" disabled selected class="py-5">--SELECCIONAR</option>
                                            <option v-for="materia in materias" :value="materia.mat_id"
                                                :key="materia.mat_id">{{
                                                    materia.mat_nombre }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="ControlSelectDistritoJudicial">Distrito
                                            Judicial</label>
                                        <select class="form-control" id="ControlSelectDistritoJudicial"
                                            @change="cargarinstancias(); cargarjuzgados()"
                                            v-model="expediente.exp_dis_judicial">
                                            <option value="" disabled selected>--SELECCIONAR</option>
                                            <option v-for="distritos in distrito" :value="distritos.judis_id">
                                                {{ distritos.judis_nombre }}
                                            </option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="ControlSelectInstancia">Instancia</label>
                                        <select class="form-control" id="ControlSelectInstancia"
                                            v-model="expediente.exp_instancia" @change="cargarespecialidades">
                                            <option value="" disabled selected>--SELECCIONAR</option>
                                            <option v-for="instancias in instancia" :value="instancias.ins_id">
                                                {{ instancias.ins_nombre }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="ControlSelectEspecialidad">Especialidad</label>
                                        <select class="form-control" id="ControlSelectEspecialidad"
                                            v-model="expediente.exp_especialidad">
                                            <option value="" disabled selected>--SELECCIONAR</option>
                                            <option v-for="especialidades in especialidad" :value="especialidades.esp_id">
                                                {{ especialidades.esp_nombre }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Órgano Jurisdiccional</label>
                                        <select class="form-control" v-model="expediente.exp_juzgado">
                                            <option value="" disabled selected>--SELECCIONAR</option>
                                            <option v-for="juzgado in juzgados" :key="juzgado.co_id" :value="juzgado.co_id">
                                                {{ juzgado.co_nombre }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="departamento">Estado</label>
                                        <select v-model="expediente.exp_estado_proceso" class="form-control"
                                            id="departamento">
                                            <option value="" selected disabled>--Seleccionar</option>
                                            <option value="EN TRAMITE">En Trámite</option>
                                            <option value="EN EJECUCION">En Ejecución</option>
                                            <option value="ARCHIVADO">Archivado</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-if="expediente.exp_estado_proceso == 'EN EJECUCION'
                                || expediente.exp_estado_proceso == 'ARCHIVADO'">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="MontoPretencion">Monto de Ejecución 1</label>
                                        <input v-model="expediente.exp_monto_ejecucion1" type="number" class="form-control"
                                            id="MontoPretencion" placeholder="" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="MontoConsentido">Monto de Ejecución 2</label>
                                        <input v-model="expediente.exp_monto_ejecucion2" type="number" class="form-control"
                                            id="MontoConsentido" placeholder="" />
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-if="expediente.exp_estado_proceso == 'EN EJECUCION'
                                || expediente.exp_estado_proceso == 'ARCHIVADO'">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label" for="Costos">Interés 1</label>
                                        <input v-model="expediente.exp_interes1" type="number" class="form-control"
                                            id="int1" placeholder="" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label" for="MontoPretencion">Interés 2</label>
                                        <input v-model="expediente.exp_interes2" type="number" class="form-control"
                                            id="int2" placeholder="" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label" for="MontoPretencion">Costos</label>
                                        <input v-model="expediente.exp_costos" type="number" class="form-control"
                                            id="Costos" placeholder="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card shadow">
                        <div class="card-body">
                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <div class="alert alert-primary text-primary" role="alert">
                                        Informacion de Demandantes/Demandados
                                    </div>
                                </div>
                                <div class="col-md-12">
                                      <button  @click="añadirprocesal()" type="button" class="btn btn-success btn-sm rounded px-3 float-right">
                                            Agregar 
                                        </button>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="table-responsive">
                                    <table class="table" id="table" ref="myDataTable">
                                        <thead>
                                            <tr>
                                                <th>Tipo Procesal</th>
                                                <th>Tipo Persona</th>
                                                <th>Condicion</th>
                                                <th>Nombre</th>
                                                <th>Opciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(persona, index) in procesales" :key="index">
                                                <td>{{ persona.tipo_procesal }}</td>
                                                <td>{{ persona.tipo_persona }}</td>
                                                <td>{{ persona.per_condicion }}</td>
                                                <td>
                                                    {{ persona.tipo_persona === 'NATURAL' ? `${persona.nat_nombres}
                                                                                                        ${persona.nat_apellido_paterno} ${persona.nat_apellido_materno}` :
                                                        persona.jur_razon_social }}
                                                </td>
                                                <td>
                                                    <button href="javascript:void(0)" @click="editarProcesal(index)"
                                                        class="btn btn-warning btn-sm rounded px-3 mr-1">Editar
                                                    </button>
                                                    <button type="button" @click="eliminarProcesal(index)" class="btn btn-danger btn-sm rounded px-3">Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div v-if="showModal" class="modal" @click="cerrarModal">
                                <div class="modal-content card border-0" @click.stop>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Tipo de parte procesal</label>
                                                <select class="form-control" v-model="procesal.tipo_procesal">
                                                    <option value="" disabled selected>-- Seleccione una opción</option>
                                                    <option value="DEMANDANTE">Demandante</option>
                                                    <option value="DEMANDADO">Demandado</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Tipo de persona</label>
                                                <select class="form-control" v-model="procesal.tipo_persona">
                                                    <option value="" disabled selected>-- Seleccione una opción</option>
                                                    <option value="NATURAL">Persona Natural</option>
                                                    <option value="JURIDICA">Persona Juridica</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Condición de procesal</label>
                                                <select class="form-control" v-model="procesal.per_condicion">
                                                    <option value="" disabled selected>-- Seleccione una opción</option>
                                                    <option value="DOCENTE UNIVERSITARIO" selected>Docente Universitario
                                                    </option>
                                                    <option value="ESTUDIANTE">Estudiante</option>
                                                    <option value="ADMINISTRATIVO">Administrativo</option>
                                                    <option value="TERCERO">Tercero</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="procesal.tipo_persona === 'NATURAL'">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label" for="dni">DNI</label>
                                                    <input v-model="procesal.nat_dni" type="text" class="form-control"
                                                    @keyup="handleKeyUp()"   id="dni" placeholder="">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label" for="apellidoPaterno">Apellido
                                                        Paterno</label>
                                                    <input type="text" v-model="procesal.nat_apellido_paterno"
                                                        class="form-control" id="apellidoPaterno" placeholder="">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label" for="apellidoMaterno">Apellido
                                                        Materno</label>
                                                    <input type="text" v-model="procesal.nat_apellido_materno"
                                                        class="form-control" id="apellidoMaterno" placeholder="">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label" for="nombres">Nombres</label>
                                                    <input type="text" v-model="procesal.nat_nombres" class="form-control"
                                                        id="nombres" placeholder="">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label" for="telefono">Telefono</label>
                                                    <input type="text" v-model="procesal.nat_telefono" class="form-control"
                                                        id="telefono" placeholder="">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label" for="email">Email
                                                    </label>
                                                    <input type="text" v-model="procesal.nat_correo" class="form-control"
                                                        id="email" placeholder="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label" for="ruc">RUC</label>
                                                    <input type="text" class="form-control" id="ruc" placeholder=""
                                                    @keyup="handleKeyUp()" v-model="procesal.jur_ruc">
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

                                    <div class="row mt-3">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label" for="departamento">Departamento</label>
                                                <select class="form-control" id="departamento" v-model="procesal.dep_id"
                                                    @change="cargarProvincias">
                                                    <option value="" selected disabled>--Seleccionar</option>
                                                    <option v-for="departamento in departamentos"
                                                        :value="departamento.dep_id">{{
                                                            departamento.dep_nombre }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label" for="provincia">Provincia</label>
                                                <select class="form-control" id="provincia" v-model="procesal.pro_id"
                                                    @change="cargarDistritos">
                                                    <option value="" selected disabled>--Seleccionar</option>
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
                                                    <option value="" selected disabled>--Seleccionar</option>
                                                    <option v-for="distrito in distritos" :value="distrito.dis_id">{{
                                                        distrito.dis_nombre }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label" for="calleAvenida">Calle, Avenida, Mz,
                                                    S/N</label>
                                                <input type="text" class="form-control" id="calleAvenida" placeholder=""
                                                    v-model="procesal.dir_calle_av">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 d-flex justify-content-end">
                                            <button class="btn btn-secondary btn-lg mx-2 px-4 rounded"
                                                @click="cerrarModal">Cerrar</button>
                                            <button class="btn btn-primary btn-lg px-4 rounded"
                                                @click="guardarProcesal">Guardar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-2">
                                <div class="col-md-12">
                                    <div class="alert alert-primary text-primary" role="alert">
                                        Datos del abogado
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="form-group">
                                    <label for="abogado" class="form-label">Abogado asignado al expediente en
                                        registro</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <input type="text" disabled v-model="abogado" name="abogado" id="abogado"
                                                class="form-control">
                                        </div>
                                        <!-- <div class="col-md-3">
                                            <Button class="btn btn-primary btn-lg w-100" @click="update()" ><i data-feather="save"></i></Button>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="d-flex justify-content-end">
                                    <button @click="goBack" class="btn btn-lg btn-secondary px-3 mx-2 rounded">
                                        <i data-feather="arrow-left"></i> Volver atras
                                    </button>
                                    <Button class="btn btn-primary btn-lg px-4 rounded" @click="update()">Guardar</Button>
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
import { mapActions } from "vuex";
import feather from 'feather-icons';
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    name: 'RegistroProcesal',
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
    },
    props: ['id'],
    data() {

        return {
            esPersonaNatural: true,
            modalVisible: false,
            dataTable: null,
            showModal: false,
            expediente: {
                exp_id: "",
                exp_numero: "",
                exp_fecha_inicio: "",
                exp_monto_pretencion: "",
                exp_pretencion: "",
                exp_materia: "",
                exp_estado_proceso: "",
                exp_juzgado: "",
                exp_costos: "",
                exp_monto_ejecucion1: "",
                exp_monto_ejecucion2: "",
                exp_interes1: "",
                exp_interes2: "",
                exp_dis_judicial: "",
                exp_instancia: "",
                exp_especialidad: "",
                multiple:"0",
            },
            distrito: [],
            instancia: [],
            especialidad: [],
            departamentos: [],
            provincias: [],
            distritos: [],
            juzgados: [],
            abogado: "",
            materias: [],
            pretenciones: [],
            procesales: [],
            procesal: {
                proc_id: "",
                tipo_procesal: "",
                tipo_persona: "",
                condicion: "",
                per_id: "",
                exp_id: "",
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
                per_condicion: "",
                dir_id: "",
                dir_calle_av: "",
                dis_id: "",
                pro_id: "",
                dep_id: ""
            },
            editingIndex: null,
        };
    },
    created() {
        this.listarMaterias();
        this.listarPretensiones();
        this.cargarDistritosJudiciales();
        this.cargarDepartamentos();
        this.traerexpediente();
    },
    methods: {
        ...mapActions(['get', 'post']),
        handleKeyUp() {
         if (this.editingIndex === null) {
            this.filterpersona();
        }
        },
        handleError(message, error) {
            // Manejo de errores centralizado
            console.error(message, error);
        },
        cerrarModal() {
            this.showModal = false;
            this.procesal={
                proc_id: "",
                tipo_procesal: "",
                tipo_persona: "",
                condicion: "",
                per_id: "",
                exp_id: "",
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
                per_condicion: "",
                dir_id: "",
                dir_calle_av: "",
                dis_id: "",
                pro_id: "",
                dep_id: ""
            };
            this.editingIndex=null;
        
        },
        async traerexpediente() {
            try {
                this.$showLoadingAlert();
                const response = await axios.get(`${this.$store.getters.get__url}/proceeding/${this.id}/show`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.get__token}`,
                    },
                    params: {},
                });

                console.log(response);
                const proceeding = response.data.proceeding;
                const costos = response.data.costos;
                this.procesales = response.data.personData;

                Object.assign(this.expediente, {
                    exp_id: proceeding.exp_id,
                    exp_numero: proceeding.exp_numero,
                    exp_fecha_inicio: proceeding.exp_fecha_inicio,
                    exp_monto_pretencion: proceeding.exp_monto_pretencion,
                    exp_monto_ejecucion: proceeding.exp_monto_ejecucion,
                    exp_pretencion: proceeding.exp_pretencion,
                    exp_materia: proceeding.exp_materia,
                    exp_estado_proceso: proceeding.exp_estado_proceso,
                    exp_especialidad: proceeding.exp_especialidad,
                    exp_juzgado: proceeding.exp_juzgado,
                    exp_dis_judicial: proceeding.exp_dis_judicial,
                    exp_instancia: proceeding.exp_instancia,
                });

                this.cargarinstancias();
                this.cargarjuzgados();
                this.cargarespecialidades();

                const abogadoPersona = proceeding.abogado.persona;
                this.abogado = `${abogadoPersona.nat_apellido_paterno} ${abogadoPersona.nat_apellido_materno} ${abogadoPersona.nat_nombres}`;

                if (costos !== null) {
                    Object.assign(this.expediente, {
                        exp_monto_ejecucion1: costos.ex_ejecucion_1,
                        exp_monto_ejecucion2: costos.ex_ejecucion_2,
                        exp_interes1: costos.ex_interes_1,
                        exp_interes2: costos.ex_interes_2,
                        exp_costos: costos.ex_costos,
                    });
                }
                this.$closeLoadingAlert();
            } catch (error) {
                this.handleError("Error al cargar expediente:", error);
            }
        },
        async cargarDepartamentos() {
            try {
                const response = await axios.get(`${this.$store.getters.get__url}/department`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.get__token}`,
                    },
                    params: {},
                });

                this.departamentos = response.data.data;
                this.provincias = [];
                this.distritos = [];
            } catch (error) {
                this.handleError("Error al cargar departamentos:", error);
            }
        },

        async cargarProvincias() {
            if (this.procesal.dep_id) {
                try {
                    const response = await axios.post(`${this.$store.getters.get__url}/department/provincias`, {
                        dep_id: this.procesal.dep_id,
                    }, {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.get__token}`,
                        },
                    });

                    this.provincias = response.data.data;
                } catch (error) {
                    this.handleError("Error al cargar provincias:", error);
                }
            }
        },

        async cargarDistritos() {
            try {
                const response = await axios.post(`${this.$store.getters.get__url}/department/distritos`, {
                    pro_id: this.procesal.pro_id,
                }, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.get__token}`,
                    },
                });

                this.distritos = response.data.data;
            } catch (error) {
                this.handleError("Error al cargar distritos:", error);
            }
        },

        async cargarDistritosJudiciales() {
            try {
                const response = await axios.get(`${this.$store.getters.get__url}/judicialdistrict`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.get__token}`,
                    },
                    params: {},
                });

                this.distrito = response.data.data;
            } catch (error) {
                this.handleError("Error al cargar distritos", error);
            }
        },

        async cargarinstancias() {
            if (this.expediente.exp_dis_judicial) {
                try {
                    const response = await axios.get(`${this.$store.getters.get__url}/instance`, {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.get__token}`,
                        },
                        params: {},
                    });

                    this.instancia = response.data.data;
                } catch (error) {
                    this.handleError("Error al cargar instancias", error);
                }
            }
        },

        async cargarespecialidades() {
            if (this.expediente.exp_instancia) {
                try {
                    const response = await axios.get(`${this.$store.getters.get__url}/specialty`, {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.get__token}`,
                        },
                        params: {},
                    });

                    this.especialidad = response.data.data;
                } catch (error) {
                    this.handleError("Error al cargar especialidades", error);
                }
            }
        },

        async update() {
            // Verificar si hay al menos un registro antes de permitir la eliminación
            if (this.procesales.length === 0) {
                Swal.fire({
                    title: 'Error',
                    text: 'Debe haber al menos un registro  de Demandante  o Demandado.',
                    icon: 'error'
                });
            } else {

             if (this.procesales.length>=2) {
                this.expediente.multiple="1";
             }
            try {
                const response = await axios.post(`${this.$store.getters.get__url}/proceeding/update`, {
                    expediente: this.expediente,
                    Personas: this.procesales
                }, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.get__token}`,
                    },
                });
                if (response.data.state == 0) {
                    Swal.fire('Actualización Correcta',
                        'Datos Actulizados Correctamente',
                        'success');
                    this.$router.go(-1);
                }
                else {
                    Swal.fire('Falló la actualización',
                        'Verifique los datos o comuniquese con el administrador del sistema',
                        'error');
                }
            } catch (error) {
                this.handleError("Error al actualizar el expediente", error);
            }
        }
        },
        async cargarjuzgados() {
            try {
                const response = await axios.post(`${this.$store.getters.get__url}/juzgado`, {
                    judis_id: this.expediente.exp_dis_judicial,
                }, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.get__token}`,
                    },
                });

                this.juzgados = response.data.data;
            } catch (error) {
                this.handleError("Error al cargar los juzgados", error);
            }
        },

        async listarMaterias() {
            try {
                const response = await axios.get(`${this.$store.getters.get__url}/subject`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.get__token}`,
                    },
                });

                this.materias = response.data.data;
            } catch (error) {
                this.handleError("Error al obtener las materias", error);
            }
        },

        async listarPretensiones() {
            try {
                const response = await axios.get(`${this.$store.getters.get__url}/claim`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.get__token}`,
                    },
                });

                this.pretenciones = response.data.data;
            } catch (error) {
                this.handleError("Error al obtener las pretensiones", error);
            }
        },

        goBack() {
            this.$router.go(-1);
        },
        editprocesal(data
         ) {
            this.showModal = true;
        },
        añadirprocesal(data
         ) {
            this.showModal = true;
        },
        editarProcesal(index) {
            this.procesal = { ...this.procesales[index] };
            this.showModal = true;
            this.editingIndex = index;
            this.cargarProvincias();
            this.cargarDistritos();
        },
        guardarProcesal() {
            if (this.editingIndex !== null) {
                this.$set(this.procesales, this.editingIndex, { ...this.procesal });
            } else {
                this.procesales.push({ ...this.procesal });
            }
            this.editingIndex = null;
            this.showModal = false;
            this.procesal={
                proc_id: "",
                tipo_procesal: "",
                tipo_persona: "",
                condicion: "",
                per_id: "",
                exp_id: "",
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
                per_condicion: "",
                dir_id: "",
                dir_calle_av: "",
                dis_id: "",
                pro_id: "",
                dep_id: ""
            };
            this.editingIndex=null;
        },
        eliminarProcesal(index) {
            // Verificar si hay al menos un registro antes de permitir la eliminación
            // if (this.procesales.length === 1) {
            //     Swal.fire({
            //         title: 'Error',
            //         text: 'Debe haber al menos un registro.',
            //         icon: 'error'
            //     });
            // } else {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'No podrás revertir esto',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Sí, eliminarlo'
                })
                .then((result) => {     
                    if (result.isConfirmed) {
                        // Eliminar el elemento en el índice proporcionado
                        this.procesales.splice(index, 1);

                        Swal.fire(
                            'Eliminado',
                            'El elemento ha sido eliminado correctamente',
                            'success'
                        );
                    }
                });
        }
        // }
        ,
        async filterpersona() {
            let loadingAlert;
            if (this.procesal.tipo_persona=='NATURAL') {
                if (this.procesal.nat_dni.length===8) {
                this.showModal=false;
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
                            tipo:this.procesal.tipo_persona,
                        }, {
                            headers: {
                                Authorization: `Bearer ${this.$store.getters.get__token}`,
                            },
                        });
                        if (loadingAlert) loadingAlert.close();
                        if (response.data.state==0) {
                            Swal.fire({
                            title: 'Datos Encontrados',
                            text: 'OK',
                            icon: 'success',
                            showCancelButton:false,
                            confirmButtonColor: '#d33',
                        })
                        .then((result) => {     
                            if (result.isConfirmed) {
                                this.showModal=true;
                            // alert('Datos encontrados');
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
                        }); 
                         }
                        else {                          
                       Swal.fire({
                            title: 'Datos no  Encontrados',
                            text: 'Registre',
                            icon: 'warning',
                            showCancelButton:false,
                            confirmButtonColor: '#d33',
                        })
                        .then((result) => {     
                            if (result.isConfirmed) {
                                this.showModal=true;
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
                        });    
                        }
                        } catch (error) {
                            Swal.fire({
                            title: 'Datos no  Encontrados',
                            text: 'Registre',
                            icon: 'warning',
                            showCancelButton:false,
                            confirmButtonColor: '#d33',
                        })
                        .then((result) => {     
                            if (result.isConfirmed) {
                                this.showModal=true;
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
                        });         
                    }
                } 
            } else {
                if (this.procesal.jur_ruc.length===11) { 
                    this.showModal=false;
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
                            tipo:this.procesal.tipo_persona,
                        }, {
                            headers: {
                                Authorization: `Bearer ${this.$store.getters.get__token}`,
                            },
                        });
                        if (loadingAlert) loadingAlert.close();
                        if (response.data.state==0) {
                            Swal.fire({
                            title: 'Datos Encontrados',
                            text: 'OK',
                            icon: 'success',
                            showCancelButton:false,
                            confirmButtonColor: '#d33',
                        })
                        .then((result) => {     
                            if (result.isConfirmed) {
                                this.showModal=true;
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
                        }); 
                         }
                        else {
                            Swal.fire({
                            title: 'Datos no  Encontrados',
                            text: 'Registre',
                            icon: 'warning',
                            showCancelButton:false,
                            confirmButtonColor: '#d33',
                        })
                        .then((result) => {     
                            if (result.isConfirmed) {
                                this.showModal=true;
                                this.procesal.dir_calle_av= "";
                                    this.procesal.dis_id= "";
                                    this.procesal.pro_id= "";
                                    this.procesal.dep_id= "";
                                    this.procesal.jur_razon_social="";
                                    this.procesal.jur_telefono="";
                                    this.procesal.jur_correo="";
                                    this.procesal.jur_rep_legal="";
                            }
                        });                    
                        }
                        } catch (error) {
                            Swal.fire({
                            title: 'Datos no  Encontrados',
                            text: 'Registre',
                            icon: 'warning',
                            showCancelButton:false,
                            confirmButtonColor: '#d33',
                        })
                        .then((result) => {     
                            if (result.isConfirmed) {
                                this.showModal=true;
                                this.procesal.dir_calle_av= "";
                                    this.procesal.dis_id= "";
                                    this.procesal.pro_id= "";
                                    this.procesal.dep_id= "";
                                    this.procesal.jur_razon_social="";
                                    this.procesal.jur_telefono="";
                                    this.procesal.jur_correo="";
                                    this.procesal.jur_rep_legal="";
                            }
                        });      
                    }
                }
            
        }
        },
    }
};
</script>
<style scoped>
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
    width: 800px !important;
    height: auto !important;
    /* padding: 20px; */
    border-radius: 8px !important;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    position: relative !important;
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
    padding: 2rem;
    background: #fff;
    width: 600px;
    height: auto !important;
    /* padding: 20px; */
    border-radius: 8px !important;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    position: relative !important;
}
</style>