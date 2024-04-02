<template>
    <section class="pc-container pb-4">
        <div class="pcoded-content">
            <div class="row mb-4">
                <h5 class="text-dark fw-bold">Agenda /Tareas</h5>
            </div>
            <div class="row">
                <div class="col-xl-12">
                    <div class="card shadow">
                        <div class="card-header">
                            <h5 class="text-secondary">Lista de Tareas</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table" id="table" ref="myDataTable" aria-describedby="table-alertas">
                                    <thead>
                                        <tr>
                                            <th >N° de Expediente</th>
                                            <th >Fecha de Vencimiento</th>
                                            <th >Descripcion</th>
                                            <th >Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(alerta, index) in alertas" :key="index">
                                            <td class="col-md-2">
                                                <a href="javascript:void(0)" @click="navegarAExpediente(alerta.ale_exp_id)">
                                                    {{ alerta.ale_expediente }}
                                                </a>
                                            </td>
                                            <td class="col-md-2">{{ alerta.fecha }}</td>
                                            <td class="col-md-5">{{ alerta.ale_descripcion }}</td>
                                            <td class="col-md-3">
                                        <button type="button" class="btn btn-sm btn-primary mx-2">Editar</button>
                                        <button type="button" class="btn btn-sm btn-danger mx-2">Eliminar</button>
                                    </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script>
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import feather from 'feather-icons';
import axios from 'axios';
import { showLoadingAlert, closeLoadingAlert } from '@/utils/loader';
import { handleApiError, waitForDataTableDraw } from '@/utils/utils';
import DataTable from '@/utils/dataTable';

export default {
    name: 'alertas',
    mixins: [DataTable],
    data() {
        return {
            alertas: [],
            dataTable: null,
        };
    },
    mounted() {
        this.leer();
    },
    updated() {
        feather.replace();
    },
    methods: {
        async leer() {
        if(this.$store.getters.get__user.usu_rol=='ADMIN') {
            try {
                showLoadingAlert();
                const headers = {
                    Authorization: `Bearer ${this.$store.getters.get__token}`,
                };
                const response = await axios.get(`${this.$store.getters.get__url}/alerta`, { headers });
                console.log(response);
                if (response.data) {
                    this.alertas = response.data.data;
                    await waitForDataTableDraw(this, 'myDataTable');
                    closeLoadingAlert();
                } else {
                    closeLoadingAlert();
                    throw new Error('Error al obtener alertas desde la API');
                }
            } catch (error) {
                handleApiError(error, 'leer');
            }
        }else{
            try {
                this.$showLoadingAlert();
                const params = {
                    abo_id:this.$store.getters.get__aboid,
                }
                console.log(params);
                const response = await this.$postData('lawyer/alertas', this, params);
                console.log(response.data);
                if (response.data) {
                    this.alertas= response.data;
                    await this.$waitForDataTableDraw(this, 'myDataTable');
                } else {
                    throw new Error('Error al obtener alertas desde la API');
                }
                this.$closeLoadingAlert();
            } catch (error) {
                this.$closeLoadingAlert();
                this.$handleApiError(error, 'listaralerts');
            }
        }
    },
        navegarAExpediente(expedienteId) {
            this.$router.push({ name: 'expediente/detalle', params: { id: expedienteId } });
        }
    },
};
</script>
  
<style scoped>
@import '@/assets/css/dataTable.css';
</style>