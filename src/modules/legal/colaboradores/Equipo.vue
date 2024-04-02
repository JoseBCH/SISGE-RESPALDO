<template>
    <section class="pc-container pb-4">
        <div class="pcoded-content">
            <div class="row mb-4">
                <div class="d-flex">
                    <h5><span class="text-primary">Equipo UNPRG</span></h5>
                    <button @click="mostrarModal" class="btn btn-primary btn-sm ml-auto rounded ml-auto"
                        style="font-size: 12px;">
                        Registrar Nuevo Integrante
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table" id="table" ref="dataTable" aria-describedby="tabla-equipo">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Documento</th>
                                            <!-- <th>Rol</th> -->
                                            <th>Nombres</th>
                                            <th>Apellidos</th>
                                            <th>Telefono</th>
                                            <th>Email</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in personas" :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ item.nat_dni }}</td>
                                            <!-- <td>{{ rolUser(item) }}</td> -->
                                            <td>{{ item.nat_nombres }}</td>
                                            <td>{{ apellidos(item) }}</td>
                                            <td>{{ item.nat_telefono }}</td>
                                            <td>{{ item.nat_correo }}</td>
                                            <td >
                                                <div class="d-flex gap-2" v-if="item.abo_id!=11">
                                                    <a href="javascript:void(0)" @click="editar(item.abo_id)"
                                                        class="btn btn-sm btn-primary rounded">
                                                        <span style="font-size: 12px;"><i data-feather="edit"></i></span>
                                                    </a>
                                                    <a href="javascript:void(0)" @click="eliminar(item.abo_id)"
                                                        class="btn btn-sm btn-danger rounded">
                                                        <span style="font-size: 12px;"><i data-feather="trash"></i></span>
                                                    </a>
                                                </div>
                                                <div class="d-grid gap-2 d-md-block" v-else>
                                                    Abogado Temporal
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <b-modal v-model="mostrar" title="Nuevo Integrante del Equipo" hide-header-close centered size="md">

                <b-form>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">DNI</label>
                                <input v-model="equipo.nat_dni" class="form-control" @input="validarCampo('nat_dni')"
                                    maxlength="8" @keypress="validarNumeros" :class="{ 'has-error': errores.nat_dni }" />
                                <span class="error-message" v-if="errores.nat_dni">Complete este campo para
                                    continuar.</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Apellido Paterno</label>
                                <input v-model="equipo.nat_apellido_paterno" class="form-control"
                                    @input="validarCampo('nat_apellido_paterno')"
                                    :class="{ 'has-error': errores.nat_apellido_paterno }" />
                                <span class="error-message" v-if="errores.nat_apellido_paterno">Complete este campo
                                    para
                                    continuar.</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Apellido Materno</label>
                                <input v-model="equipo.nat_apellido_materno" class="form-control"
                                    @input="validarCampo('nat_apellido_materno')"
                                    :class="{ 'has-error': errores.nat_apellido_materno }" />
                                <span class="error-message" v-if="errores.nat_apellido_materno">Complete este campo
                                    para
                                    continuar.</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Nombres</label>
                                <input v-model="equipo.nat_nombres" class="form-control"
                                    @input="validarCampo('nat_nombres')" :class="{ 'has-error': errores.nat_nombres }" />
                                <span class="error-message" v-if="errores.nat_nombres">Complete este campo para
                                    continuar.</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Telefono</label>
                                <input v-model="equipo.nat_telefono" class="form-control" @keypress="validarNumeros" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Rol</label>
                                <select class="form-control" @change="validarCampo('rol_id')"
                                    v-model="equipo.per_condicion">
                                    <option value="">Seleccione...</option>
                                    <option v-for="(item, index) in roles" :key="index" :value="item.name">
                                        {{ item.name }}
                                    </option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Correo</label>
                                <input v-model="equipo.nat_correo" @input="validarCorreo" class="form-control" />
                                <span v-if="!correoValido" class="error-message">Correo electrónico no válido</span>
                            </div>
                        </div>
                    </div>
                </b-form>

                <template #modal-footer="{ cancel, ok }">
                    <b-button v-on:click="cancel" class="btn btn-lg btn-secondary">Cerrar</b-button>
                    <b-button @click="crear" class="btn btn-lg btn-success">Guardar </b-button>
                </template>
            </b-modal>
            <b-modal v-model="editarModal" title="Actualizar datos" hide-header-close centered size="md">

                <b-form>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">DNI</label>
                                <input v-model="equipo.nat_dni" class="form-control" @input="validarCampo('nat_dni')"
                                    maxlength="8" @keypress="validarNumeros" :class="{ 'has-error': errores.nat_dni }" />
                                <span class="error-message" v-if="errores.nat_dni">Complete este campo para
                                    continuar.</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Apellido Paterno</label>
                                <input v-model="equipo.nat_apellido_paterno" class="form-control"
                                    @input="validarCampo('nat_apellido_paterno')"
                                    :class="{ 'has-error': errores.nat_apellido_paterno }" />
                                <span class="error-message" v-if="errores.nat_apellido_paterno">Complete este campo
                                    para
                                    continuar.</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Apellido Materno</label>
                                <input v-model="equipo.nat_apellido_materno" class="form-control"
                                    @input="validarCampo('nat_apellido_materno')"
                                    :class="{ 'has-error': errores.nat_apellido_materno }" />
                                <span class="error-message" v-if="errores.nat_apellido_materno">Complete este campo
                                    para
                                    continuar.</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Nombres</label>
                                <input v-model="equipo.nat_nombres" class="form-control"
                                    @input="validarCampo('nat_nombres')" :class="{ 'has-error': errores.nat_nombres }" />
                                <span class="error-message" v-if="errores.nat_nombres">Complete este campo para
                                    continuar.</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Telefono</label>
                                <input v-model="equipo.nat_telefono" class="form-control" @keypress="validarNumeros" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Rol</label>
                                <select class="form-control" @change="validarCampo('rol_id')"
                                    v-model="equipo.per_condicion">
                                    <option value="">Seleccione...</option>
                                    <option v-for="(item, index) in roles" :key="index" :value="item.name">
                                        {{ item.name }}
                                    </option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Correo</label>
                                <input v-model="equipo.nat_correo" @input="validarCorreo" class="form-control" />
                                <span v-if="!correoValido" class="error-message">Correo electrónico no válido</span>
                            </div>
                        </div>
                    </div>
                </b-form>

                <template #modal-footer="{ cancel, ok }">
                    <b-button v-on:click="cancel" class="btn btn-lg btn-secondary">Cerrar</b-button>
                    <b-button @click="actualizar" class="btn btn-lg btn-success">Guardar </b-button>
                </template>
            </b-modal>
        </div>
    </section>
</template>
  
<script>
import { BButton, BModal, BForm, BFormGroup, BFormInput } from 'bootstrap-vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import feather from 'feather-icons';
import DataTable from '@/utils/dataTable';

export default {
    name: "abogado",
    components: {
        BButton,
        BModal,
        BForm,
        BFormGroup,
        BFormInput,
        ValidationObserver,
        ValidationProvider,
    },
    // mixins: [DataTable],
    mounted() {
        this.leer();
    },
    updated() {
        feather.replace();
    },
    data() {
        return {
            correo: '',
            mostrar: false,
            editarModal: false,
            personas: null,
            abogados: [],
            modalVisible: false,
            dataTable: null,
            showModal: false,
            equipo: {
                nat_dni: "",
                nat_apellido_paterno: "",
                nat_apellido_materno: "",
                nat_nombres: "",
                nat_telefono: "",
                nat_correo: "",
                per_condicion: "",
                abo_id: ""
            },
            errores: {
                nat_dni: false,
                nat_apellido_paterno: false,
                nat_apellido_materno: false,
                nat_nombres: false,
            },
            isLoading: false,
            correoValido: true,
            mensajedni: null,
            mensajecorreo: null,
            roles: [
                { id: 1, name: 'Abogado' },
                // { id: 2, name: 'Asistente' },
                // { id: 3, name: 'Secretaria' },
                // { id: 4, name: 'Bolsa' },
            ]
        };
    },
    // watch: {
    //     personas: {
    //         handler: 'initDataTable',
    //         immediate: true,
    //     },
    // },
    methods: {
        limpiarCampos() {
            for (let key in this.abogado) {
                if (this.abogado.hasOwnProperty(key)) {
                    this.abogado[key] = "";
                }
            }
        },

        limpiarErrores() {
            for (let key in this.errores) {
                if (this.errores.hasOwnProperty(key)) {
                    this.errores[key] = "";
                }
            }
        },
        validarNumeros(event) {
            const keyCode = event.which ? event.which : event.keyCode;

            if (keyCode < 48 || keyCode > 57) {
                event.preventDefault();
            }
        },

        validarCampo(campo) {
            this.errores[campo] = this.equipo[campo] === "";
        },

        validarCorreo() {
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            this.correoValido = regexCorreo.test(this.equipo.nat_correo);
        },

        validarCampos() {
            Object.keys(this.errores).forEach(propiedadError => {
                this.validarCampo(propiedadError, propiedadError);
            });

            return !Object.values(this.errores).some(error => error);
        },

        mostrarModal() {
            this.mostrar = true;
        },

        cerrarModal() {
            this.mostrar = false;
        },

        apellidos(item) {
            return `${item.nat_apellido_paterno} ${item.nat_apellido_materno}`;
        },

        rolUser(item) {
            return item.per_condicion === 'Bolsa' ? 'Bolsa de Trabajo' : item.per_condicion;
        },

        async crear() {
            if (this.validarCampos()) {
                try {
                    this.isLoading = true;
                    const response = await this.$postData('personas/crearIntegrante', this, this.equipo)
                    console.log(response.data);
                    this.initDataTable();
                    if (response.state === 0) {
                        // this.abogados.push({ ...response.data.data });
                        this.leer();
                        this.cerrarModal();
                        // this.limpiarCampos();
                        this.isLoading = false;
                    } else if (response.data.state === 1) {
                        this.isLoading = false;
                    }

                } catch (error) {
                    const errorMessage = error.response.data.message;
                    console.log(errorMessage);
                    this.isLoading = false;
                }
            } else {
                console.log('Error en la validación de campos');
                this.isLoading = false;
            }
        },
        async leer() {
            try {
                this.$showLoadingAlert();
                const result = await this.$postData('personas/equipo', this);
                console.log(result.data);
                this.personas = result.data;
                this.initDataTable();
                // this.abogados = result.data;
                // await this.$waitForDataTableDraw(this, 'myDataTable');
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'leer abogados');
            }
        },

        async actualizar() {
            if (this.validarCampos()) {
                try {
                    this.isLoading = true;

                    const response = await this.$axios.post(
                        `${this.$store.getters.get__url}/lawyer/update`,
                        this.equipo,
                        {
                            headers: {
                                Authorization: `Bearer ${this.$store.getters.get__token}`,
                            },
                        }
                    );

                    if (response.data.state === 0) {
                        this.limpiarCampos();
                        this.leer();
                        this.editarModal = false;
                    } else {
                        console.error("Error en la respuesta del servidor:", response.data);
                        this.isLoading = false;
                    }
                } catch (error) {
                    console.error("Error en la solicitud:", error.message);
                    this.isLoading = false;
                } finally {
                    this.isLoading = false;
                }
            } else {
                console.log('Error en la validación de campos');
            }
        },


        async eliminar(id) {
            this.$warningAlertWithCancel('Confirmar Eliminación', '¿Estás seguro de que deseas eliminar a este abogado?', async () => {
                try {
                    this.$showLoadingAlert('Eliminando', '');
                    const response = await this.$axios.post(
                        `${this.$store.getters.get__url}/lawyer/delete/${id}`,
                        this.abogado,
                        {
                            headers: {
                                Authorization: `Bearer ${this.$store.getters.get__token}`,
                            },
                        }
                    );

                    if (response.status === 204) {
                        this.$closeLoadingAlert();
                        this.leer();
                        // const index = this.abogados.findIndex(abogado => abogado.abo_id === id);
                        // if (index !== -1) {
                        //     this.abogados.splice(index, 1);
                        // }
                    } else {
                        this.$closeLoadingAlert();
                        this.$warnignAlert('', 'Error al eliminar el abogado: Respuesta inesperada del servidor.');
                    }
                } catch (error) {
                    this.$closeLoadingAlert();
                    this.$warnignAlert('', `Error al realizar la solicitud: ${error.message}`);
                }
            }, () => {
                console.log('Eliminar abogado cancelado');
            });
        },

        editar(id) {
            try {
                const abogadoEdit = this.personas.find(persona => persona.abo_id === id);
                if (abogadoEdit) {
                    this.equipo = { ...abogadoEdit };
                    this.editarModal = true;
                } else {
                    console.error("Abogado no ENCONTRADO");
                }
            } catch (errores) {
                console.error(errores);
            }
        },

        guardar() {
            this.cerrarModal();
            console.info('guardando datos...');
            try {
                if (!this.abogado.abo_id) {
                    this.crear();
                } else {
                    this.actualizar(this.abogado.abo_id);
                }
            } catch (errores) {
                console.error(errores);
            }
        },

        async initDataTable() {
            this.destroyDataTable();
            await this.$nextTick();
            this.dataTable = $(this.$refs.dataTable).DataTable({
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
                },
            });

            // Espera hasta que la tabla termine de dibujarse
            await new Promise((resolve) => {
                $(this.$refs.dataTable).on('draw.dt', () => {
                    resolve();
                });
            });
        },

        destroyDataTable() {
            this.dataTable && this.dataTable.destroy() && (this.dataTable = null);
        },

    },

};
</script>
  
<style scoped>
.has-error {
    border: 1px solid #EA4D4D;
}

.error-message {
    color: #EA4D4D;
    font-size: 12px;
}

td {
    white-space: normal !important;
    word-wrap: break-word;
}

.circle {
    width: 30px;
    height: 30px;
    background-color: #7267EF;
    color: white;
    font-weight: 600;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
}
</style>
  