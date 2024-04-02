<template>
    <section class="pc-container pb-4 px-4">
        <div class="pcoded-content">
            <div class="card">
                <div class="card-header py-3">
                    <div class="d-flex align-items-center">
                        <h5>Lista de Distritos Judiciales</h5>
                        <button class="btn btn-success btn-sm px-4 ml-auto rounded-1" @click="mostrarModal">
                            Nuevo
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table" id="table" ref="myDataTable">
                            <thead>
                                <tr>
                                    <th class="text-center pl-4 col-lg-2 col-sm-1">#</th>
                                    <th>Nombre</th>
                                    <th class="text-center pl-4 col-lg-3 col-sm-1">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(djudicial, index) in djudiciales" :key="djudicial.judis_id">
                                    <td class="text-center py-2 my-0">
                                        <input class="form-check-input me-1" type="checkbox" value="" />
                                    </td>
                                    <td>{{ djudicial.judis_nombre }}</td>
                                    <td class="text-center">
                                        <a href="javascript:void(0)" @click="editar(djudicial.judis_id)"
                                            class="text-primary px-2 py-1 btn-lg mx-1">
                                            <span class="">
                                                <i data-feather="edit"></i>
                                            </span>
                                        </a>
                                        <a href="javascript:void(0)" @click="borrar(djudicial.judis_id)"
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
                    <div class="card-header d-flex justify-content-center">
                        <h5 class="text-center mb-0">
                            {{ djudicial.judis_id ? 'Actualizar Distrito Judicial' : 'Registro de nuevo Distrito Judicial'
                            }}
                        </h5>
                    </div>
                    <div class="card-body mb-0 pb-0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Nombre</label>
                                    <input class="form-control" v-model="djudicial.judis_nombre" @input="validarCampos"
                                        @keyup.enter="guardar" :class="{ 'has-error': errores.judis_nombre }">
                                    <span class="error-message" v-if="errores.judis_nombre">Ingrese un nombre de
                                        distrito judicial.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer border-0 mt-0 pt-0">
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-secondary btn-lg  px-4 mx-2 rounded" @click="cerrarModal">Cerrar</button>
                            <button class="btn btn-primary btn-lg  px-4 rounded" @click="guardar">
                                <span v-if="!isLoading">{{ djudicial.judis_id ? 'Actualizar' : 'Guardar' }}</span>
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
    name: "distritosJudiciales",
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
            djudiciales: [],
            djudicial: {
                judis_id: "",
                judis_nombre: ""
            },
            errores: {
                judis_nombre: false,
                djudicial: false
            },
            isLoading: false,
            editingIndex: null,
        };
    },

    methods: {
        validarCampos() {
            const campos = ['judis_nombre'];
            campos.forEach(campo => this.errores[campo] = this.djudicial[campo] === "");
            return !Object.values(this.errores).some(error => error);
        },

        async leer() {
            try {
                this.$showLoadingAlert();
                const result = await this.$getData('judicialdistrict', this);
                this.djudiciales = result.data;
                // await this.$waitForDataTableDraw(this, 'myDataTable');
                this.initDataTable();
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar distritos judiciales');
            }
        },

        async actualizarTable() {
            try {
                const response = await this.$getData('judicialdistrict', this);
                this.djudiciales = response.data;
                this.initDataTable();
            } catch (error) {
                this.$handleApiError(error, 'cargar distritos judiciales');
            }
        },

        async crear() {
            if (!this.validarCampos()) {
                return;
            }
            try {
                this.isLoading = true;
                const formData = {
                    judis_nombre: this.djudicial.judis_nombre
                }
                const response = await this.$postData('judicialdistrict/store', this, formData);
                if (response.state === 'success') {
                    // this.djudiciales.push({ ...response.data })
                    await this.actualizarTable();
                    this.isLoading = false;
                    this.cerrarModal();
                }
            } catch (error) {
                this.$handleApiError(error, 'crear distrito judicial');
            }
        },

        async actualizar(id) {
            if (!this.validarCampos()) {
                return;
            }

            try {
                this.isLoading = true;
                const formData = {
                    judis_id: id,
                    judis_nombre: this.djudicial.judis_nombre
                }
                const response = await this.$putData('judicialdistrict/update', this, formData);
                const nuevosDatos = response.data;
                if (response.state === 'success') {
                    const index = this.djudiciales.findIndex((j) => j.judis_id === this.djudicial.judis_id);
                    if (index !== -1) {
                        this.$set(this.djudiciales, index, nuevosDatos);
                    }
                    this.isLoading = false;
                    this.cerrarModal();
                }
            } catch (error) {
                this.$handleApiError(error, 'actualizar distrito judicial');
            }
        },

        async borrar(id) {
            this.$warningAlertWithCancel('Confirmar Eliminación', '¿Estás seguro de que deseas eliminar este Distrito Judicial?', async () => {
                try {
                    this.$showLoadingAlert('Eliminando', '');
                    const formData = {
                        judis_id: id
                    }
                    const response = await this.$deleteData('judicialdistrict/destroy', this, formData);

                    if (response.state === 'success') {
                        await this.actualizarTable();
                        this.$closeLoadingAlert();
                        // const index = this.djudiciales.findIndex(djudicial => djudicial.judis_id === id);
                        // if (index !== -1) {
                        //     this.djudiciales.splice(index, 1);
                        // }
                    }
                } catch (error) {
                    this.$closeLoadingAlert();
                    this.$handleApiError(error, error.message);
                }
            }, () => {
                console.log('Eliminar abogado cancelado');
            });
        },

        editar(id) {
            const editJuzgado = this.djudiciales.find(djudicial => djudicial.judis_id === id);
            if (editJuzgado) {
                this.djudicial = { ...editJuzgado };
                this.showModal = true;
            } else {
                console.error("Juzgado no encontrado");
            }
        },

        guardar() {
            try {
                if (!this.djudicial.judis_id) {
                    this.crear();
                } else {
                    this.actualizar(this.djudicial.judis_id);
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
            this.errores.judis_nombre = false;
            this.djudicial.judis_id = "";
            this.djudicial.judis_nombre = "";
        }
    },
};
</script>

<style scoped>
td {
    white-space: normal !important;
    word-wrap: break-word;
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
    border-radius: 8px !important;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    position: relative !important;
}

@media (max-width: 768px) {
    .modal-content {
        width: 90%;
    }
}

.has-error {
    border: 1px solid #EA4D4D;
}

.error-message {
    color: #EA4D4D;
    font-size: 12px;
}
</style>
