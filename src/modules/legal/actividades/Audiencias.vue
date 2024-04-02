<template>
    <section class="pc-container pb-4">
        <div class="pcoded-content">
            <div class="row mb-4">
                <h5 class="text-dark fw-bold">Agenda / Audiencias</h5>
            </div>
            <div class="row">
                <div class="col-xl-12">
                    <div class="card shadow">
                        <div class="card-header">
                            <h5 class="text-secondary">Lista de Audiencias</h5>
                        </div>
                        <div class="card-body ">
                            <div class="table-responsive">
                                <table class="table" id="table" ref="myDataTable" aria-describedby="table-audiencias">
                                    <thead>
                                        <tr>
                                            <th class="col-md-2">N° de Expediente</th>
                                            <th class="col-md-2">Demandante</th>
                                            <th class="col-md-1">Demandado</th>
                                            <th class="col-md-1">Hora</th>
                                            <th class="col-md-2">Fecha</th>
                                            <th>Lugar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(audiencia, index) in audiencias" :key="index">
                                            <td>
                                                <router-link
                                                    :to="{ name: 'expediente/detalle', params: { id: audiencia.exp_id } }">{{
                                                        audiencia.exp_numero }}</router-link>
                                            </td>
                                            <td v-if="audiencia.tipo_procesal === 'DEMANDANTE'">
                                                <router-link v-if="audiencia.tipo_persona === 'NATURAL'"
                                                    :to="{ name: 'demandante/informacion', params: { doc: audiencia.nat_dni } }">{{
                                                        getProcesal(audiencia) }}</router-link>
                                                <span v-else>{{ audiencia.jur_razon_social }}</span>
                                            </td>
                                            <td>UNPRG</td>
                                            <td v-if="audiencia.tipo_procesal === 'DEMANDADO'">
                                                <router-link v-if="audiencia.tipo_persona === 'NATURAL'"
                                                    :to="{ name: 'demandante/informacion', params: { doc: audiencia.nat_dni } }">{{
                                                        getProcesal(audiencia) }}</router-link>
                                                <span v-else>{{ audiencia.jur_razon_social }}</span>
                                            </td>

                                            <td>{{ audiencia.aud_hora }}</td>
                                            <td>{{ audiencia.aud_fecha }}</td>
                                            <td>{{ audiencia.aud_lugar }}</td>
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
    name: 'audiencias',
    mixins: [DataTable],
    data() {
        return {
            audiencias: [],
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
                this.$showLoadingAlert();
                const params = {
                    abo_id:'todos',
                }
                const response = await this.$getData('audiences', this, params);
                if (response.data) {
                    this.audiencias= response.data;
                    await this.$waitForDataTableDraw(this, 'myDataTable');
                } else {
                    throw new Error('Error al obtener alertas desde la API');
                }
                this.$closeLoadingAlert();
            } catch (error) {
                this.$closeLoadingAlert();
                this.$handleApiError(error, 'listaralerts');
            }

        }else{
            try {
                this.$showLoadingAlert();
                const params = {
                    abo_id:this.$store.getters.get__aboid,
                }
                const response = await this.$postData('lawyer/audiencias', this, params);
                if (response.data) {
                    this.audiencias= response.data;
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

        getProcesal(audiencia) {
            return `${audiencia.nat_nombres} ${audiencia.nat_apellido_paterno} ${audiencia.nat_apellido_materno}`;
        },
    },

};
</script>
  
<style scoped>
@import '@/assets/css/dataTable.css';
</style>