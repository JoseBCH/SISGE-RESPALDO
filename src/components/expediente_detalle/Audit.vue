<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header  px-5">
                    <h5>Revisiones del Expediente</h5>
                </div>
                <div class="card-body  px-5">
                    <div class="table-responsive">
                        <table class="table table-hover" id="table" ref="myDataTable" aria-describedby="tablaHomeAdmin">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Hora y fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in expedientes" v-if="idex == item.model_id && item.accion == 'Revisó el expediente'
                                    && item.exp.abo_id == idabo" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ formatFecha(item.created_at) }}</td>
                                </tr>
                            </tbody>
                        </table>
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
            expedientes: []
        };
    },
    mounted() {
        this.cargarExpedientes();
        this.$nextTick(() => {
            feather.replace();
        });
        console.log(this.idabo, "--", this.idex);
    },
    props: {
        idex: {
            type: String,
            required: true // Opcional, dependiendo de tus necesidades
        },
        idabo: {
            type: Number,
            required: true // Opcional, dependiendo de tus necesidades
        }
    },
    methods: {
        async cargarExpedientes() {
            try {
                this.$showLoadingAlert();
                this.expedientes = (await this.$postData('reportes/inicioadmin', this)).data;
                await this.$waitForDataTableDraw(this, 'myDataTable');
            } catch (error) {
                this.$handleApiError(error, 'leer');
            } finally {
                this.$closeLoadingAlert();
            }
        },
        accion(item) {
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