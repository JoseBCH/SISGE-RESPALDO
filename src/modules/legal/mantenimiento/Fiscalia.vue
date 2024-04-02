<template>
    <section class="pc-container pb-4 px-4">
        <div class="pcoded-content">

            <div class="card">
                <div class="card-header py-3">
                    <div class="d-flex align-items-center">
                        <h5>Lista de Fiscalias</h5>
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
                            <select class="form-control" @change="leer()" v-model="instancia.judis_id">
                                <option value="" disabled selected>-- Seleccionar</option>
                                <option v-for="distrito in distritos" :value="distrito.judis_id">
                                    {{ distrito.judis_nombre }}
                                </option>
                            </select>
                        </div>
                        
                    </div>
                    <div class="table-responsive">
                        <table class="table" id="table" ref="myDataTable">
                            <thead>
                                <tr>
                                    <th class="text-center pl-4 col-lg-2 col-sm-1">#</th>
                                    <th>Nombre</th>
                                    <th class="text-center">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(instancia, index) in instancias" :key="index" v-if="instancia.type_id==2">
                                    <td class="text-center py-2 my-0">
                                        <input class="form-check-input me-1" type="checkbox" value="" />
                                    </td>
                                    <td>{{ instancia.ins_nombre }}</td>
                                    <td class="text-center">
                                        <a href="javascript:void(0)" @click="editar(instancia.ins_id)"
                                            class="text-primary px-2 py-1 btn-lg mx-1">
                                            <span class="">
                                                <i data-feather="edit"></i>
                                            </span>
                                        </a>
                                        <a href="javascript:void(0)" @click="borrar(instancia.ins_id)"
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
                            {{ instancia.ins_id ? 'Actualizar Fiscalia' : 'Registar Nueva Fiscalia' }}
                        </h5>
                    </div>
                    <div class="card-body mb-0 pb-0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Distrito Judicial</label>
                                    <select class="form-control" v-model="instancia.judis_id">
                                        <option value="" disabled selected>-- Seleccionar</option>
                                        <option v-for="distrito in distritos" :value="distrito.judis_id">
                                            {{ distrito.judis_nombre }}
                                        </option>
                                    </select>
                                    <label class="form-label">Nombre</label>
                                    <input class="form-control" v-model="instancia.ins_nombre"
                                        @input="validarCampo('ins_nombre')" @keyup.enter="guardar"
                                        :class="{ 'has-error': errores.ins_nombre }">
                                    <span class="error-message" v-if="errores.ins_nombre">Ingrese el nombre de la
                                        Fiscalia.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer border-0 mt-0 pt-0">
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-secondary btn-lg  px-4 mx-2 rounded" @click="cerrarModal">Cerrar</button>
                            <button class="btn btn-primary btn-lg  px-4 rounded" @click="guardar">
                                <span v-if="!isLoading">{{ instancia.ins_id ? 'Actualizar' : 'Guardar' }}</span>
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
    name: "instancias",
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
            instancias: [],
            instancia: {
                ins_id: "",
                ins_nombre: "",
                judis_id:""
            },
            errores: {
                ins_nombre: false
            },
            isLoading: false,
            editingIndex: null,
            distritos:[]
        };
    },

    methods: {

        validarCampo(campo) {
            this.errores[campo] = this.instancia[campo] === "";
        },

        validarCampos() {
            Object.keys(this.errores).forEach(propiedadError => {
                this.validarCampo(propiedadError, propiedadError);
            });

            return !Object.values(this.errores).some(error => error);
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
                    judis_id: this.instancia.judis_id
                };
                const response = await this.$postData('fiscalia', this,formData);
                this.instancias = response.data;
                this.initDataTable();
                // await this.$waitForDataTableDraw(this, 'myDataTable');
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar distritos judiciales');
            }
        },

        async actualizarTable() {
            try {
                const response = await this.$getData('instance', this);
                this.instancias = response.data;
                this.initDataTable();
            } catch (error) {
                this.$handleApiError(error, 'cargar instancias');
            }
        },

        async crear() {
            if (!this.validarCampos()) {
                return;
            }

            try {
                this.isLoading = true;
                const formData = {
                    judis_id:this.instancia.judis_id,
                    ins_nombre: this.instancia.ins_nombre,
                    tipo:2
                };

                const response = await this.$postData('fiscalia/store', this, formData);

                if (response.state === 'success') {
                    await this.actualizarTable();
                    // this.instancias.push({ ...response.data });
                    // console.log(this.instancias.length);
                    // this.aumentarContador();
                    // this.leer();

                    // Acceder directamente a la instancia DataTable y llamar a draw
                    // const dataTableInstance = $(this.$refs.myDataTable).DataTable();

                    // if (dataTableInstance && typeof dataTableInstance.draw === 'function') {
                    //     dataTableInstance.draw();
                    // }

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
                    ins_id: id,
                    ins_nombre: this.instancia.ins_nombre,
                    judis_id:this.instancia.judis_id
                }
                const response = await this.$putData('fiscalia/update', this, formData);
                const nuevosDatos = response.data;
                if (response.state === 'success') {
                    const index = this.instancias.findIndex((j) => j.ins_id === this.instancia.ins_id);
                    if (index !== -1) {
                        this.$set(this.instancias, index, nuevosDatos);
                    }
                    this.isLoading = false;
                    this.cerrarModal();
                }
            } catch (error) {
                this.$handleApiError(error, 'actualizar distrito judicial');
            }
        },

        async borrar(id) {
            this.$warningAlertWithCancel('Confirmar Eliminación', '¿Estás seguro de que deseas eliminar esta Instancia?', async () => {
                try {
                    this.$showLoadingAlert('Eliminando', '');
                    const formData = {
                        ins_id: id
                    }
                    const response = await this.$deleteData('fiscalia/destroy', this, formData);

                    if (response.state === 'success') {
                        await this.actualizarTable();
                        this.$closeLoadingAlert();

                        // const index = this.instancias.findIndex(instancia => instancia.ins_id === id);
                        // if (index !== -1) {
                        //     this.instancias.splice(index, 1);

                        //     // Esperar a la siguiente actualización del DOM antes de llamar a draw
                        //     this.$nextTick(() => {
                        //         // Asegurarse de que myDataTable sea la referencia correcta
                        //         if (this.$refs.myDataTable && typeof this.$refs.myDataTable.draw === 'function') {
                        //             this.$refs.myDataTable.draw();
                        //         }
                        //     });
                        // }
                    }
                } catch (error) {
                    this.$closeLoadingAlert();
                    this.$handleApiError(error, error.message);
                }
            }, () => {
                console.log('Eliminar instancia cancelado');
            });
        },

        editar(id) {
            const editInstancia = this.instancias.find(instancia => instancia.ins_id === id);
            if (editInstancia) {
                this.instancia = { ...editInstancia };
                this.showModal = true;
            } else {
                console.error("Instancia no encontrado");
            }
        },

        guardar() {
            try {
                if (!this.instancia.ins_id) {
                    this.crear();
                } else {
                    this.actualizar(this.instancia.ins_id);
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
            this.errores.ins_nombre = false;
            this.instancia.ins_id = "";
            this.instancia.ins_nombre = "";
            this.instancia.judis_id="";
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
