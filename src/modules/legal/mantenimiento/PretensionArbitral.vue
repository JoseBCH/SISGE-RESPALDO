<template>
    <section class="pc-container pb-4 px-4">
        <div class="pcoded-content">
            <div class="card">
                <div class="card-header py-3">
                    <div class="d-flex align-items-center">
                        <h5>Lista de Pretensiones Arbitrales</h5>
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
                                <tr v-for="(pretension, index) in pretensiones" :key="index" v-if="pretension.type_id==3">
                                    <td class="text-center py-2 my-0">
                                        <input class="form-check-input me-1" type="checkbox" value="" />
                                    </td>
                                    <td>{{ pretension.pre_nombre }}</td>
                                    <td class="text-center">
                                        <a href="javascript:void(0)" @click="editar(pretension.pre_id)"
                                            class="text-primary px-2 py-1 btn-lg mx-1">
                                            <span class="">
                                                <i data-feather="edit"></i>
                                            </span>
                                        </a>
                                        <a href="javascript:void(0)" @click="borrar(pretension.pre_id)"
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
            <div v-if="modalVisible" class="modal" @click="cerrarModal">
                <div class="modal-content card border-0" @click.stop>
                    <div class="card-header">
                        <h5 class="text-center">
                            {{ pretension.pre_id ? 'Actualizar Pretensión' : 'Registro de nueva Pretensión ' }}
                        </h5>
                    </div>
                    <div class="card-body mb-0 pb-0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Nombre</label>
                                    <input class="form-control" v-model="pretension.pre_nombre"
                                        @input="validarCampo('pre_nombre')" :class="{ 'has-error': errores.pre_nombre }"
                                        @keyup.enter="guardar">
                                    <span class="error-message" v-if="errores.pre_nombre">Ingrese un nombre de
                                        Pretensión.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer border-0 mt-0 pt-0">
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-secondary btn-lg  px-4 mx-2 rounded" @click="cerrarModal">Cerrar</button>
                            <button class="btn btn-primary btn-lg  px-4 rounded" @click="guardar">
                                <span v-if="!isLoading">{{ pretension.pre_id ? 'Actualizar' : 'Guardar' }}</span>
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
    name: "pretensiones",
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
            modalVisible: false,
            pretensiones: [],
            pretension: {
                pre_id: "",
                pre_nombre: ""
            },
            errores: {
                pre_nombre: false
            },
            isLoading: false,
        };
    },

    methods: {
        validarCampo(campo) {
            this.errores[campo] = this.pretension[campo] === "";
        },

        validarCampos() {
            Object.keys(this.errores).forEach(propiedadError => {
                this.validarCampo(propiedadError, propiedadError);
            });

            return !Object.values(this.errores).some(error => error);
        },

        editar(id) {
            try {
                const pretensionEdit = this.pretensiones.find(pretension => pretension.pre_id === id);
                if (pretensionEdit) {
                    this.pretension = { ...pretensionEdit };
                    this.modalVisible = true;
                } else {
                    console.log("Pretension no encontrada");
                }
            } catch (errors) {
                console.error(errors);
            }
        },

        async leer() {
            try {
                this.$showLoadingAlert();
                const response = await this.$getData('claim', this);
                this.pretensiones = response.data;
                this.initDataTable();
                // await this.$waitForDataTableDraw(this, 'myDataTable');
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar pretensiones');
            }
        },

        async actualizarTable() {
            try {
                const response = await this.$getData('claim', this);
                this.pretensiones = response.data;
                this.initDataTable();
            } catch (error) {
                this.$handleApiError(error, 'cargar pretensiones');
            }
        },

        async crear() {
            if (!this.validarCampos()) {
                return;
            }
            this.isLoading = true;
            const formData = {
                pre_nombre: this.pretension.pre_nombre,
                 tipo:3

            }
            const response = await this.$postData('claim/store', this, formData);
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
                    pre_id: id,
                    pre_nombre: this.pretension.pre_nombre
                }
                const response = await this.$postData('claim/update', this, formData);

                if (response.state === 0) {
                    await this.actualizarTable();
                    this.isLoading = false;
                    this.cerrarModal();
                }
            } catch (error) {
                this.$handleApiError(error, 'actualizar pretension');
            }
        },
        
        async borrar(id) {
            this.$warningAlertWithCancel('Confirmar Eliminación', '¿Estás seguro de que deseas eliminar esta Pretension?', async () => {
                try {
                    this.$showLoadingAlert('Eliminando', '');
                    const formData = {
                        pre_id: id
                    }
                    const response = await this.$postData('claim/destroy', this, formData);
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
        
        guardar() {
            try {
                if (!this.pretension.pre_id) {
                    this.crear();
                } else {
                    this.actualizar(this.pretension.pre_id);
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
            this.modalVisible = true;
        },

        cerrarModal() {
            this.modalVisible = false;
            this.errores.pre_nombre = false;
            this.pretension.pre_id = "";
            this.pretension.pre_nombre = "";
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
    color: #EA4D4D;
    font-size: 12px;
}
</style>
  