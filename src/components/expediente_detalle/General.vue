<template>
    <div class="">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Datos Generales</h5>
                    </div>
                    <div v-if="expediente && expediente.exp_id">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-12 col-md-12 mb-3">
                                    <label class="form-label font-bold">N° de Expediente</label>
                                    <input type="text" class="form-control border-0 bg-primary text-white font-bold" :value="expediente.exp_numero"
                                        disabled>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 col-md-6 mb-3">
                                    <label class="form-label">Organo Juridisccional</label>
                                    <input type="text" class="form-control border-0" :value="expediente.exp_juzgado"
                                        disabled>
                                    <!-- <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Organo Juridisccional
                                        </div>
                                        <div class="col-xl-7 col-sm-8">
                                            : {{ expediente.exp_juzgado }}
                                        </div>
                                    </div> -->
                                </div>
                                <div class="col-sm- 12 col-md-6 mb-3">
                                    <label class="form-label">Distrito Judicial</label>
                                    <input type="text" class="form-control border-0" :value="expediente.exp_distrito_judicial"
                                        disabled>
                                    <!-- <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Distrito Judicial
                                        </div>
                                        <div class="col-xl-7 col-sm-8">
                                            : {{ expediente.exp_distrito_judicial }}
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm- 12 col-md-6 mb-3">
                                    <label class="form-label">Fecha de Inicio</label>
                                    <input type="text" class="form-control border-0" :value="$formatDate(expediente.exp_fecha_inicio)"
                                        disabled>
                                    <!-- <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Fecha de Inicio
                                        </div>
                                        <div class="col-xl-7 col-sm-8">
                                            : {{ $formatDate(expediente.exp_fecha_inicio) }}
                                        </div>
                                    </div> -->
                                </div>
                                <div class="col-sm- 12 col-md-6 mb-3">
                                    <label class="form-label">Especialidad</label>
                                    <input type="text" class="form-control border-0" :value="expediente.exp_especialidad"
                                        disabled>
                                    <!-- <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Especialidad
                                        </div>
                                        <div class="col-xl-7 col-sm-8">
                                            : {{ expediente.exp_especialidad }}
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm- 12 col-md-6 mb-3">
                                    <label class="form-label">Pretension</label>
                                    <input type="text" class="form-control border-0" :value="expediente.exp_pretension"
                                        disabled>
                                    <!-- <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Pretension
                                        </div>
                                        <div class="col-xl-7 col-sm-8">
                                            : {{ expediente.exp_pretension }}
                                        </div>
                                    </div> -->
                                </div>
                                <div class="col-sm- 12 col-md-6 mb-3">
                                    <label class="form-label">Monto de Pretension</label>
                                    <input type="text" class="form-control border-0" :value="'S/ ' + expediente.exp_monto_pretension" disabled>

                                    <!-- <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Monto de Pretension
                                        </div>
                                        <div class="col-xl-7 col-sm-8">
                                            : {{ expediente.exp_monto_pretension }}
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm- 12 col-md-6 mb-3">
                                    <label class="form-label">Materia</label>
                                    <input type="text" class="form-control border-0" :value="expediente.exp_materia"
                                        disabled>
                                    <!-- <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Materia
                                        </div>
                                        <div class="col-xl-7 col-sm-8">
                                            : {{ expediente.exp_materia }}
                                        </div>
                                    </div> -->
                                </div>
                                <div class="col-sm- 12 col-md-6 mb-3">
                                    <label class="form-label">Estado</label>
                                    <input type="text" class="form-control border-0" :value="capitalizeFirstLetter(expediente.exp_estado)"
                                        disabled>
                                    <!-- <div class="row">
                                        <div class="col-xl-5 col-sm-4">
                                            Estado
                                        </div>
                                        <div class="col-xl-7 col-sm-8">
                                            : {{ capitalizeFirstLetter(expediente.exp_estado) }}
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Partes Procesales</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover" id="table" ref="myDataTable"
                                aria-describedby="table-procesales">
                                <thead>
                                    <tr>
                                        <th>Parte Procesal</th>
                                        <th>Tipo de Persona</th>
                                        <th>Apellido Paterno / Razon Social</th>
                                        <th>Apellido Materno</th>
                                        <th>Nombres</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="demandante in demandantes" :key="demandante.id">
                                        <td>Demandante</td>
                                        <td>{{ getPersonaTipo(demandante.tipo_persona) }}</td>
                                        <td>{{ getPersonaNombre(demandante) }}</td>
                                        <td>{{ demandante.apellido_materno || '--' }}</td>
                                        <td>{{ demandante.nombres || '--' }}</td>
                                    </tr>
                                    <tr v-for="demandado in demandados" :key="demandado.id">
                                        <td>Demandado</td>
                                        <td>{{ getPersonaTipo(demandado.tipo_persona) }}</td>
                                        <td>{{ getPersonaNombre(demandado) }}</td>
                                        <td>{{ demandado.apellido_materno || '--' }}</td>
                                        <td>{{ demandado.nombres || '--' }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import feather from "feather-icons";
import DataTable from '@/utils/dataTable';
import moment from 'moment';

export default {
    mixins: [DataTable],
    data() {
        return {
            dataTable: null,
            expediente: null,
            demandantes: [],
            demandados: [],
            formattedDate: "",
            id: '',
            procesales: null
        };
    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
        this.cargarDetallesExpediente();
    },
    created() {
        this.id = this.$route.params.id;
    },
    methods: {
        async cargarDetallesExpediente() {
            try {
                this.$showLoadingAlert();
                const response = await this.$getData(`proceeding/${this.id}`, this);
                this.expediente = response.expediente;
                // await this.$waitForDataTableDraw(this, 'myDataTable');
                this.formatDate();
                this.getProcesales(response.procesales);
                this.initDataTable();
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar detalles del expediente ', this.id);
            }
        },
        formatDate() {
            this.formattedDate = moment(this.expediente.exp_fecha_inicio).format('DD MMM YYYY');
        },
        getProcesales(procesales) {
            if (procesales[0].tipo_procesal === 'DEMANDANTE') {
                this.demandantes = procesales;
                this.tipo_procesal = 'DEMANDANTE';
                const newDemandante = {
                    'tipo_procesal': 'Demandado',
                    'tipo_persona': 'Juridica',
                    'razon_social': 'UNPRG',
                };
                this.demandados.push(newDemandante);
            } else {
                this.demandados = procesales;
                const newDamandado = {
                    'tipo_procesal': 'Demandado',
                    'tipo_persona': 'Juridica',
                    'razon_social': 'UNPRG',
                };
                this.demandantes.push(newDamandado);
            }
        },
        getPersonaTipo(tipo) {
            return tipo === 'NATURAL' ? 'Natural' : 'Jurídica';
        },
        getPersonaNombre(persona) {
            return persona.tipo_persona === 'NATURAL' ? persona.apellido_paterno : persona.razon_social || '--';
        },
        formatFecha(fechaISO) {
            const fecha = new Date(fechaISO);
            const opcionesFormato = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            };
            return fecha.toLocaleDateString('es-ES', opcionesFormato);
        },
        capitalizeFirstLetter(value) {
            if (!value) return '';
            return value.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
        },
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>