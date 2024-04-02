<template>
    <section class="pc-container pb-4 px-4">
        <div class="pcoded-content">
            <div class="card">
                <div class="card-header py-3">
                    <div class="d-flex align-items-center">
                        <h5>Lista de Organos Jurisdiccionales</h5>
                        <button class="btn btn-success btn-sm px-4 ml-auto rounded-1" @click="mostrarModal">
                            Nuevo
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <label class="form-label">Seleccione un Distrito Judicial</label>
                    </div>
                    <div class="row mb-3">
                        <div class="col-xl-3 col-lg-5 col-md-6">
                            <select class="form-control" @change="leer()" v-model="distrito">
                                <option value="" disabled selected>-- Seleccionar</option>
                                <option v-for="distrito in distritos" :value="distrito.judis_id">
                                    {{ distrito.judis_nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="col-xl-3 col-lg-5 col-md-6">
                            <button class="btn btn-primary btn-lg w-100" @click="guardarfavorito()"
                                :disabled="favoritos.length == 0">
                                Guardar Concurrentes
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table" id="table" ref="myDataTable">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="col-lg-7">Nombre</th>
                                    <th class="text-center">Concurrente</th>
                                    <th class="text-center">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="distrito == ''" class="text-center">
                                    <td colspan="4" class="py-3 text-secondary">Seleccione un Distrito Judicial</td>
                                </tr>
                                <tr v-for="(juzgado, index) in juzgados" :key="index" v-if="juzgado.type_id==1">
                                    <td class="text-center py-2 my-0">
                                        {{ index + 1 }}
                                    </td>
                                    <td>{{ juzgado.co_nombre }}</td>
                                    <td class="text-center">
                                        <input type="checkbox" class="form-check-input" v-model="juzgado.co_isFavorite"
                                            @change="marcarFavorito(juzgado)">
                                    </td>
                                    <td class="text-center">
                                        <a href="javascript:void(0)" @click="editar(juzgado.co_id)"
                                            class="text-primary px-2">
                                            <span><i data-feather="edit"></i></span>
                                        </a>
                                        <a href="javascript:void(0)" @click="borrar(juzgado.co_id)"
                                            class="text-danger px-2">
                                            <span><i data-feather="trash"></i></span>
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
                            {{ juzgado.co_id ? 'Actualizar Organo Jurisdiccional' : 'Registro de nuevo Organo Jurisdiccional' }}
                        </h5>
                    </div>
                    <div class="card-body mb-0 pb-4">
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <label class="form-label">Distrito Judicial</label>
                                <select class="form-control" v-model="distrito" :class="{ 'has-error': errores.distrito }">
                                    <option value="" disabled selected>--Seleccionar</option>
                                    <option v-for="distrito in distritos" :value="distrito.judis_id">
                                        {{ distrito.judis_nombre }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group mb-0">
                                    <label class="form-label">Nombre</label>
                                    <input class="form-control" v-model="juzgado.co_nombre" @keyup.enter="guardar"
                                        @input="validarCampo('co_nombre')" :class="{ 'has-error': errores.co_nombre }">
                                </div>
                                <span class="error-message" v-if="errores.co_nombre">Ingrese un nombre de un Organo
                                    Jurisdiccional.</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer border-0 mt-0 pt-0">
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-secondary btn-lg  px-4 mx-2 rounded" @click="cerrarModal">Cerrar</button>
                            <button class="btn btn-primary btn-lg  px-4 rounded" @click="guardar">
                                <span v-if="!isLoading">{{ juzgado.co_id ? 'Actualizar' : 'Guardar' }}</span>
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
    name: "juzgados",
    mixins: [DataTable],
    mounted() {
        this.cargardistritos();
    },
    updated() {
        feather.replace();
    },
    data() {
        return {
            dataTable: null,
            showModal: false,
            distrito: "",
            distritos: [],
            juzgados: [],
            juzgado: {
                co_id: "",
                co_nombre: "",
                favorito: false,
                tipo:1
            },
            errores: {
                co_nombre: false,
                distrito: false
            },
            favoritos: [],
            isLoading: false,
        };
    },

    methods: {

        validarCampo(campo) {
            this.errores[campo] = this.juzgado[campo] === "";
        },

        validarCampos() {
            Object.keys(this.errores).forEach(propiedadError => {
                this.validarCampo(propiedadError, propiedadError);
            });

            return !Object.values(this.errores).some(error => error);
        },

        marcarFavorito(juzgado) {
            const existingIndex = this.favoritos.findIndex(item => item === juzgado.co_id);
            if (juzgado.co_isFavorite == 1) {
                if (existingIndex == -1) {
                    this.favoritos.push(juzgado.co_id);
                }
            } else {
                if (existingIndex != -1) {
                    this.favoritos.splice(existingIndex, 1);
                }
            }
        },

        async guardarfavorito() {
            try {
                const formData = {
                    favoritos: this.favitos
                };
                const response = await this.$postData('juzgado/favorite', this, formData);
                if (response.state === 0) {
                    this.favoritos = [];

                }
            } catch (error) {
                this.$handleApiError(error, 'guardar juzgados concurrentes');
            }
        },

        async cargardistritos() {
            try {
                this.$showLoadingAlert();
                const response = await this.$getData('judicialdistrict', this);
                this.distritos = response.data;
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar distritos judiciales');
            }
        },

        async leer() {
            try {
                this.$showLoadingAlert();
                const formData = {
                    judis_id: this.distrito
                }
                const response = await this.$postData('juzgado', this, formData);
                if (response.state === 0) {
                    this.juzgados = response.data;
                    this.favoritos = [];
                    let cont = response.data.length;
                    if (cont > 0) {
                        for (let i = 0; i < cont; i++) {
                            this.marcarFavorito(response.data[i]);
                        }
                    }
                    this.initDataTable();
                    this.$closeLoadingAlert();
                }
            } catch (error) {
                this.$handleApiError(error, 'cargar juzgados');
            }
        },

        async actualizarTable() {
            try {
                const formData = {
                    judis_id: this.distrito
                }
                const response = await this.$postData('juzgado', this, formData);
                if (response.state === 0) {
                    this.juzgados = response.data;
                    this.favoritos = [];
                    let cont = response.data.length;
                    if (cont > 0) {
                        for (let i = 0; i < cont; i++) {
                            this.marcarFavorito(response.data[i]);
                        }
                    }
                    this.initDataTable();
                }
            } catch (error) {
                this.$handleApiError(error, 'cargar juzgados');
            }
        },

        async crear() {
            if (!this.validarCampos() || this.distrito === "") {
                this.errores.distrito = true;
                return;
            }
            try {
                this.isLoading = true;
                const formData = {
                    judis_id: this.distrito,
                    co_nombre: this.juzgado.co_nombre,
                     tipo:this.juzgado.tipo
                }
                const response = await this.$postData('juzgado/store', this, formData);
                if (response.state === 0) {
                    await this.actualizarTable();
                    this.isLoading = false;
                    this.cerrarModal();
                }
            } catch (error) {
                this.$handleApiError(error, 'crear juzgado');
            }
        },

        async actualizar(id) {
            if (!this.validarCampos()) {
                return;
            }
            try {
                this.isLoading = true;
                const formData = {
                    judis_id: this.distrito,
                    co_id: id,
                    co_nombre: this.juzgado.co_nombre
                }
                const response = await this.$postData('juzgado/update', this, formData);
                if (response.state === 0) {
                    await this.actualizarTable();
                    this.isLoading = false;
                    this.cerrarModal();
                }
            } catch (error) {
                this.$handleApiError(error, 'actualizar juzgado');
            }
        },

        async borrar(id) {
            this.$warningAlertWithCancel('Confirmar Eliminación', '¿Estás seguro de que deseas eliminar este Organo Jurisdiccional?', async () => {
                try {
                    this.$showLoadingAlert('Eliminando', '');
                    const formData = {
                        co_id: id
                    }
                    const response = await this.$postData('juzgado/destroy', this, formData);
                    if (response.state === 0) {
                        await this.actualizarTable();
                        this.$closeLoadingAlert();
                        this.juzgado.co_id = "";
                        this.juzgado.co_nombre = "";
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
            try {
                const juzgadoEdit = this.juzgados.find(juzgado => juzgado.co_id === id);
                if (juzgadoEdit) {
                    this.juzgado = { ...juzgadoEdit };
                    this.showModal = true;
                } else {
                    console.error('Juzgado no encontrado');
                }
            } catch (error) {

            }
        },

        guardar() {
            try {
                if (!this.juzgado.co_id) {
                    this.crear();
                } else {
                    this.actualizar(this.juzgado.co_id);
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
            this.errores.co_nombre = false;
            this.errores.distrito = false;
            this.juzgado.co_id = "";
            this.juzgado.co_nombre = "";
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
  