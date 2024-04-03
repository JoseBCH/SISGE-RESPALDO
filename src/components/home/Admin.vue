<template>
    <div class="pc-container pb-4">
        <div class="pcoded-content p-md-9">
            <div class="col-xl-9 col-md-12 col-sm-12">
                <div class="row">
                    <div class="col-xl-3 col-md-6 col-sm-12">
                        <div class="card bg-primary">
                            <div class="card-body">
                                <h6 class="m-b-5 text-white">Tareas {{ counts.alerts}}</h6>
                                <!-- <h3 class="m-b-0 text-white">10</h3> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6 col-sm-12">
                        <div class="card bg-primary">
                            <div class="card-body">
                                <h6 class="m-b-5 text-white">Audiencias {{ counts.audiences}}</h6>
                                <!-- <h3 class="m-b-0 text-white">15</h3> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6 col-sm-12">
                        <div class="card bg-primary">
                            <div class="card-body">
                                <h6 class="m-b-5 text-white">Calendario {{ counts.audiences+counts.alerts}}</h6>
                                <!-- <h3 class="m-b-0 text-white">234</h3> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6 col-sm-12">
                        <div class="card bg-primary">
                            <div class="card-body">
                                <h6 class="m-b-5 text-white">Expedientes {{ counts.expTotal}}</h6>
                                <!-- <h3 class="m-b-0 text-white">1234</h3> -->
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col-xl-12 col-md-12 col-sm-12">
                    <div class="card">
                        <div class="card-header  px-5">
                            <h5>Modificaciones en el sistema</h5>
                        </div>
                        <div class="card-body  px-5">
                            <div class="table-responsive">
                                <table class="table table-hover" id="table" ref="myDataTable" aria-describedby="tablaHomeAdmin">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Accion realizada</th>
                                            <th>Usuario</th>
                                            <th>Hora y fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in expedientes" :key="index">
                                            <td>{{ index+1 }}</td>
                                            <td>{{ accion(item) }}</td>
                                            <td>{{ item.user.name }}</td>
                                            <td>{{ formatFecha(item.created_at) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { badgeClass } from '@/utils/utils.js';
import '@/assets/css/fileStatus.css';
import feather from 'feather-icons';
import DataTable from '@/utils/dataTable';

export default {
    name: 'admin',
    mixins: [DataTable],
    data() {
        return {
            expedientes: [],
            counts:[]
        };
    },
    mounted() {
        this.cargarExpedientes();
        this.$nextTick(() => {
            feather.replace();
        });
    },
    methods: {
        async cargarExpedientes() {
            try {
                this.$showLoadingAlert();
                this.expedientes = (await this.$postData('reportes/inicioadmin', this)).data;
                this.counts= (await this.$postData('reportes/inicioadmin', this)).count;
                await this.$waitForDataTableDraw(this, 'myDataTable');
            } catch (error) {
                this.$handleApiError(error, 'leer');
            } finally {
                this.$closeLoadingAlert();
            }
        },
        accion(item){
            return item.accion == 'Revisó el Expediente' ? `${this.formatAccion(item.accion)} : ${item.exp.exp_numero}` : this.formatAccion(item.accion);
        },
        formatAccion(accion) {
            if (accion && typeof accion === 'string') {
                return accion.charAt(0).toUpperCase() + accion.slice(1).toLowerCase();
            } else {
                return accion;
            }
        }, 
        formatFecha(fechaISO) {
            const fecha = new Date(fechaISO);
            const opcionesFormato = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            return fecha.toLocaleDateString('es-ES', opcionesFormato);
        }
    },
};
</script>
  