<template>
    <section class="pc-container pb-4 px-4">
        <div class="pcoded-content">
            <div class="card">
                <div class="card-header py-3">
                    <div class="d-flex align-items-center">
                        <h5>Lista de Especialidades</h5>
                        <button class="btn btn-success btn-sm px-4 ml-auto rounded-1" @click="mostrarModal">
                            Nuevo
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="table" ref="myDataTable">
                            <thead>
                                <tr>
                                    <th class="text-center pl-4 col-lg-2 col-sm-1">#</th>
                                    <th>Nombre</th>
                                    <th class="text-center">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(especialidad, index) in especialidades" :key="index">
                                    <td class="text-center py-2 my-0">
                                        <input class="form-check-input me-1" type="checkbox" value="" />
                                    </td>
                                    <td>{{ especialidad.esp_nombre }}</td>
                                    <td class="text-center">
                                        <a href="javascript:void(0)" @click="editar(especialidad.esp_id)"
                                            class="text-primary px-2 py-1 btn-lg mx-1">
                                            <span class="">
                                                <i data-feather="edit"></i>
                                            </span>
                                        </a>
                                        <a href="javascript:void(0)" @click="borrar(especialidad.esp_id)"
                                            class="px-2 py-1 btn-lg text-danger">
                                            <span>
                                                <i data-feather="trash"></i>
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div v-if="showModal" class="modal" @click="cerrarModal">
                <div class="modal-content card border-0" @click.stop>
                    <div class="card-header">
                        <h5 class="text-center">
                            {{ especialidad.esp_id ? 'Actualizar especialidad' : 'Registar Nueva especialidad' }}
                        </h5>
                    </div>
                    <div class="card-body mb-0 pb-0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Nombre</label>
                                    <input class="form-control" v-model="especialidad.esp_nombre"
                                        @input="validarCampo('esp_nombre')" @keyup.enter="guardar"
                                        :class="{ 'has-error': errores.esp_nombre }">
                                    <span class="error-message" v-if="errores.esp_nombre">Ingrese un nombre de
                                        Especialidad.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer border-0 mt-0 pt-0">
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-secondary btn-lg  px-4 mx-2 rounded" @click="cerrarModal">Cerrar</button>
                            <button class="btn btn-primary btn-lg  px-4 rounded" @click="guardar">
                                <span v-if="!isLoading">{{ especialidad.esp_id ? 'Actualizar' : 'Guardar' }}</span>
                                <span v-else class="spinner-border spinner-border-sm" role="status"
                                    aria-hidden="true"></span>
                            </button>
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

export default {
    name: "djudiciales",
    mixins: [DataTable],
    mounted() {
        this.leer();
    },
    updated() {
        feather.replace();
    },
    data() {
        return {
            dataTable: null,
            showModal: false,
            especialidades: [],
            especialidad: {
                esp_id: "",
                esp_nombre: "",
            },
            errores: {
                esp_nombre: false
            },
            isLoading: false,
            editingIndex: null,
        };
    },

    methods: {

        validarCampo(campo) {
            this.errores[campo] = this.especialidad[campo] === "";
        },

        validarCampos() {
            Object.keys(this.errores).forEach(propiedadError => {
                this.validarCampo(propiedadError, propiedadError);
            });

            return !Object.values(this.errores).some(error => error);
        },

        async leer() {
            try {
                this.$showLoadingAlert();
                const response = await this.$getData('specialty', this);
                this.especialidades = response.data;
                this.initDataTable();
                // await this.$waitForDataTableDraw(this, 'myDataTable');
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar distritos judiciales');
            }
        },

        async actualizarTable() {
            try {
                const response = await this.$getData('specialty', this);
                this.especialidades = response.data;
                this.initDataTable();
            } catch (error) {
                this.$handleApiError(error, 'cargar especialidades');
            }
        },

        async crear() {
            if (!this.validarCampos()) {
                return;
            }
            this.isLoading = true;
            const formData = {
                esp_nombre: this.especialidad.esp_nombre
            }
            const response = await this.$postData('specialty/store', this, formData);
            if (response.state === 0) {
                await this.actualizarTable();
                this.isLoading = false;
                this.cerrarModal();
            }
        },

        async actualizar(id) {
            if (!this.validarCampos()) {
                return;
            }

            try {
                this.isLoading = true;
                const formData = {
                    esp_id: id,
                    esp_nombre: this.especialidad.esp_nombre
                }
                const response = await this.$postData('specialty/update', this, formData);

                if (response.state === 0) {
                    await this.actualizarTable();
                    this.isLoading = false;
                    this.cerrarModal();
                }
            } catch (error) {
                this.$handleApiError(error, 'actualizar especialidad');
            }
        },

        async borrar(id) {
            this.$warningAlertWithCancel('Confirmar Eliminación', '¿Estás seguro de que deseas eliminar esta Especialidad?', async () => {
                try {
                    this.$showLoadingAlert('Eliminando', '');
                    const formData = {
                        esp_id: id
                    }
                    const response = await this.$postData('specialty/destroy', this, formData);
                    if (response.state === 0) {
                        await this.actualizarTable();
                        this.$closeLoadingAlert();
                    }
                } catch (error) {
                    this.$handleApiError(error, error.message);
                    this.$closeLoadingAlert();
                }
            }, () => {
                console.info('Cancelado');
            });
        },

        editar(id) {
            const editespecialidad = this.especialidades.find(especialidad => especialidad.esp_id === id);
            if (editespecialidad) {
                this.especialidad = { ...editespecialidad };
                this.showModal = true;
            } else {
                console.error("especialidad no encontrada");
            }
        },

        guardar() {
            try {
                if (!this.especialidad.esp_id) {
                    this.crear();
                } else {
                    this.actualizar(this.especialidad.esp_id);
                }
            } catch (error) {
                console.error(error);
            }
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
        mostrarModal() {
            this.showModal = true;
        },

        cerrarModal() {
            this.showModal = false;
            this.errores.esp_nombre = false;
            this.especialidad.esp_id = "";
            this.especialidad.esp_nombre = "";
        }
    },
};
</script>

<style scoped>
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
    width: 500px;
    height: auto !important;
    /* padding: 20px; */
    border-radius: 8px !important;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    position: relative !important;
}

@media (max-width: 768px) {
    .modal-content {
        width: 90%;
    }
}

.card-header {
    border-radius: 8px 8px 0px 0px !important;
}

.has-error {
    border: 1px solid #EA4D4D;
}

.error-message {
    padding-left: 15px;
    color: #EA4D4D;
    font-size: 12px;
}
</style>
