<template>
    <section class="pc-container pb-4 px-4">
        <div class="pcoded-content">
            <div class="card shadow">
                <div class="card-header py-3">
                    <div class="d-flex align-items-center">
                        <h5>Expedientes</h5>
                        
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table" id="table" ref="myDataTable">
                            <thead>
                                <tr>
                                    <th class="text-center pl-4 col-lg-2 col-sm-1">N°</th>
                                    <th>Número</th>
                                    <th class="text-center pl-4 col-lg-2 col-sm-1">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(exp, index) in expedientes" :key="index">
                                    <td class="text-center py-2">
                                        {{ index+1}}
                                    </td>
                                    <td>{{ exp.exp_numero}}</td>
                                    <td class="text-center">
                                       
                                        <a href="javascript:void(0)" @click="borrar(exp.exp_id)"
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
        </div>
       
    </section>
</template>
  
<script>
import feather from 'feather-icons';
import DataTable from '@/utils/dataTable';

export default {
    name: "eliminar-exp",
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
            expedientes: [
            ],
            isLoading: false,
        };
    },

    methods: {
        async leer() {
            try {
                this.$showLoadingAlert();
                const response = await this.$getData('proceeding/delete/list', this);
                this.expedientes = response.data;
                this.initDataTable();
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar exps');
            }
        },

        async actualizarTable() {
            try {
                const response = await this.$getData('proceeding/delete/list', this);
                this.materias = response.data;
                this.initDataTable();
            } catch (error) {
                this.$handleApiError(error, 'cargar exps');
            }
        },
        async borrar(id) {
            this.$warningAlertWithCancel('Confirmar Eliminación', '¿Estás seguro de que deseas eliminar este Expediente?', async () => {
                try {
                    this.$showLoadingAlert('Eliminando', '');
                    const formData = {
                        exp_id:id
                    }
                    const response = await this.$postData('proceeding/destroy', this, formData);
                    if (response.state === 0) {
                        await this.leer();
                        this.$closeLoadingAlert();
                    }
                } catch (error) {
                    this.$handleApiError(error, error.message);
                    this.$closeLoadingAlert();
                }
            }, 
            () => {
                console.info('Cancelado');
            });
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

  