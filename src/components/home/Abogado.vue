<template>
    <div class="pc-container pb-4">
        <div class="pcoded-content">
            <div class="row pt-2 pb-3">
                <div class="col-md-12">
                    <h5>Bienvenido! {{ name }}</h5>
                    <p>A continuacion se muestra un resumen de sus actividades.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body mr-4">
                            <div class="row">
                                <div class="d-flex">
                                    <span class="pc-micon text-primary px-2">
                                        <i data-feather="layers"></i>
                                    </span>
                                    <p class="text-dark">Tiene <span class="fw-bold">{{ cantidad }}</span>
                                        Expedientes asignados</p>
                                    <router-link to="/expediente/busqueda" class="px-2 ml-auto">
                                        Ver más detalles <i data-feather="arrow-right-circle" class="arrow-icon"></i>
                                    </router-link>

                                </div>
                            </div>
                            <!-- <div class="row">
                                <div class="d-flex">
                                    <span class="pc-micon text-primary px-2">
                                        <i data-feather="bell"></i>
                                    </span>
                                    <p class="text-dark">Tiene <span class="fw-bold">{{ numeroAlertas }}</span> Alertas
                                        pendientes.</p>
                                    <a href="#" class="px-2 ml-auto">
                                        Ver mas detalles <i data-feather="arrow-right-circle" class="arrow-icon"></i>
                                    </a>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-12 col-md-12">
                    <div class="card">
                        <div class="card-header border-0">
                            <h6 class="text-secondary p-0 m-0">Ultimos expedientes</h6>
                        </div>
                        <div class="card-body mx-0 px-0 mt-0 pt-0">
                            <div class="table-responsive">
                                <table class="table" aria-describedby="table-home">
                                    <thead>
                                        <tr>
                                            <th class="pl-4">N° de Expediente</th>
                                            <th>Fecha de Inicio</th>
                                            <th>Demandante</th>
                                            <th>Demandado</th>
                                            <th>Pretensión</th>
                                            <th>Materia</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="expediente in expedientes" :key="expediente.exp_id">
                                            <td class="pl-4">
                                                <router-link
                                                    :to="{ name: 'expediente/detalle', params: { id: expediente.exp_id } }">
                                                    {{ expediente.numero }}
                                                </router-link>
                                            </td>
                                            <td>{{ expediente.fecha_inicio }}</td>
                                            <td>{{ getPersona(expediente.procesal, 'DEMANDANTE', expediente.multiple) }}
                                            </td>
                                            <td>{{ getPersona(expediente.procesal, 'DEMANDADO', expediente.multiple) }}
                                            </td>
                                            <td>{{ expediente.pretencion }}</td>
                                            <td>{{ expediente.materia }}</td>
                                            <td class="pr-5">
                                                <span :class="badgeClass(expediente.estado_proceso)">
                                                    {{ expediente.estado_proceso }}
                                                </span>
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
    </div>
</template>

<script>
import { badgeClass } from '@/utils/utils.js';
import '@/assets/css/fileStatus.css';
import feather from 'feather-icons';

export default {
    name: 'admin',
    data() {
        return {
            cantidad: '',
            numeroAlertas: '',
            expedientes: []
        };
    },
    computed: {
        name() {
            const nombre = this.$store.getters.get__user.datos.nombres;
            const apellidoPaterno = this.$store.getters.get__user.datos.apellido_paterno;
            const apellidoMaterno = this.$store.getters.get__user.datos.apellido_materno;

            return `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
        },
        id() {
            return this.$store.getters.get__user.abo_id;
        }
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
                const formData = {
                    'abo_id': this.id
                }

                const response = await this.$postData('lawyer/expedientes', this, formData);
                this.expedientes = response.data.slice(0, 5);
                this.cantidad = response.total;

                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar expedientes');
            }
        },
        getPersona(procesal, tipo, multiple) {
            const isDemandante = procesal[0].tipo_procesal === tipo;
            return isDemandante ? this.nombreCompleto(procesal, multiple) : 'UNPRG';
        },
        nombreCompleto(procesal, multiple) {
            if (multiple === '1') {
                return 'Demanda Colectiva';
            }

            const tipoPersona = procesal[0].tipo_persona;
            const { apellido_paterno, apellido_materno, nombres, razon_social } = procesal[0];

            return tipoPersona === 'NATURAL'
                ? `${apellido_paterno} ${apellido_materno} ${nombres}`
                : razon_social;
        },
        badgeClass,
    },
};
</script>