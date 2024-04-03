<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex align-items-center">
                        <h5><a class="btn-link" href="#" @click.prevent="toggleCardAudiencias()">Lista de Audiencias</a>
                        </h5>
                        <button type="button" class="btn btn-sm btn-primary ml-auto px-4" @click="abrirModal(1)">Nueva
                            Audiencia</button>
                    </div>
                </div>
                <div class="card-body " v-if="cardAudiencias">
                    <div class="table-responsive">
                        <table class="table" id="table" ref="dataTable1" aria-describedby="table-audiencias">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Detalles</th>
                                    <th>Demandante</th>
                                    <th>Hora</th>
                                    <th>Fecha</th>
                                    <th>Lugar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(audiencia, index) in audiencias" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ audiencia.aud_detalles }}</td>
                                    <td>{{ obtenerDemandante(audiencia) }}</td>
                                    <td>{{ $formatHora(audiencia.aud_hora) }}</td>
                                    <td>{{ $formatFecha(audiencia.aud_fecha) }}</td>
                                    <td>{{ audiencia.aud_lugar }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex align-items-center">
                        <h5><a class="btn-link" href="#" @click.prevent="toggleCardAlertas()">Lista de Alertas</a>
                        </h5>
                        <button type="button" class="btn btn-sm btn-primary ml-auto px-4" @click="abrirModal(2)">Nueva
                            Alerta</button>
                    </div>
                </div>
                <div class="card-body " v-if="cardAlertas">
                    <div class="table-responsive">
                        <table class="table" id="table" ref="dataTable2" aria-describedby="table-Alertas">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Descripcion</th>
                                    <th>Fecha de Vencimiento</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(alerta, index) in alertas" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ alerta.ale_descripcion }}</td>
                                    <td>{{ $formatFecha(alerta.fecha) }}</td>
                                    <td>
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
        <!-- Modal Nueva Audiencia -->
        <div v-if="showModal === 1" class="modal" @click="cerrarModal">
            <div class="modal-content border-0" @click.stop>
                <div class="modal-header bg-primary border-0">
                    <h5 class="modal-title text-white">Registrar nueva Audiencia</h5>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Lugar</label>
                        <input type="text" disabled v-model="audiencia.au_lugar" class="form-control border-0">
                    </div>
                    <div class="mb-3">
                        <div class="row">
                            <div class="col-md-6">
                                <label class="form-label">Hora</label>
                                <input type="time" v-model="audiencia.au_hora" class="form-control">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Fecha</label>
                                <input type="date" v-model="audiencia.au_fecha" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="Detalles">Detalles o notas a tomar en cuenta para la
                            audiencia</label>
                        <textarea class="form-control" id="Detalles" v-model="audiencia.au_detalles"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="Detalles">Enlace de reunión si la
                            audiencia es Virtual</label>
                        <input type="text" class="form-control" id="Detalles" v-model="audiencia.au_link">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-lg btn-secondary" @click="cerrarModal()">Cerrar</button>
                    <button type="button" class="btn btn-lg btn-primary" @click="guardarAudiencia()">Guardar</button>
                </div>
            </div>
        </div>
        <!-- Modal Nueva Audiencia -->
        <div v-if="showModal === 2" class="modal" @click="cerrarModal">
            <div class="modal-content border-0" @click.stop>
                <div class="modal-header bg-primary border-0">
                    <h5 class="modal-title text-white">Registrar nueva Alerta</h5>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Fecha de vencimiento</label>
                        <input v-model="alerta.ale_fecha_vencimiento" type="date" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="Detalles">Detalles o notas a tomar en cuenta para la
                            audiencia</label>
                        <textarea class="form-control" id="Detalles" v-model="alerta.ale_descripcion"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-lg btn-secondary" @click="cerrarModal()">Cerrar</button>
                    <button type="button" class="btn btn-lg btn-primary" @click="guardarAlerta()">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import feather from 'feather-icons';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
// import DataTable from '@/utils/dataTable';
export default {
    // mixins: [DataTable],
    data() {
        return {
            dataTable1: null,
            dataTable2: null,
            audiencias: null,
            alertas: null,
            showModal: 0,
            cardAudiencias: true,
            cardAlertas: true,
            alerta: {
                exp_id: "",
                ale_fecha_vencimiento: "",
                ale_descripcion: ""
            },
            audiencia: {
                per_id: "",
                exp_id: "",
                au_fecha: "",
                au_hora: "",
                au_detalles: "",
                au_lugar: "",
                au_link: ""
            },
            expediente: null,
            demandante: null,
            demandado: null,
            pretencion: null,
            juzgado: null,
            showalerta: false,
            showaudiencia: false
        }
    },
    created() {
        // this.mostrarAlerta();
        this.audiencia.exp_id = this.$route.params.id;
        this.alerta.exp_id = this.$route.params.id;
    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
        this.cargarDetallesExpediente();
        this.listarAudiencias();
        this.listarAlertas();
    },
    methods: {

        abrirModal(num) {
            this.showModal = num;
        },

        cerrarModal() {
            this.showModal = 0;
        },
        toggleCardAudiencias() {
            this.cardAudiencias = !this.cardAudiencias;
        },

        toggleCardAlertas() {
            this.cardAlertas = !this.cardAlertas;
        },

        limpiarCampos(objeto) {
            if (objeto && typeof objeto === 'object') {
                Object.keys(objeto).forEach(key => {
                    objeto[key] = "";
                });
            } else {
                console.error("El argumento proporcionado no es un objeto válido.");
            }
        },
        async listarAudiencias() {
            try {
                const params = {
                    "exp_id": this.$route.params.id
                }
                const response = await this.$postData('proceeding/audiencias', this, params);
                if (response.data) {
                    this.audiencias = response.data;
                    this.initDataTable('dataTable1');
                    // await this.$waitForDataTableDraw(this, 'myDataTable');
                } else {
                    throw new Error('Error al obtener audiencias desde la API');
                }
            } catch (error) {
                this.$handleApiError(error, 'listar audiencias');
            }
        },

        async listarAlertas() {
            try {
                const params = {
                    "exp_id": this.$route.params.id
                }
                const response = await this.$postData('proceeding/alertas', this, params);
                console.log(response);
                if (response.data) {
                    this.alertas = response.data;
                    this.initDataTable('dataTable2');
                    // await this.$waitForDataTableDraw(this, 'myDataTable');
                } else {
                    throw new Error('Error al obtener audiencias desde la API');
                }
            } catch (error) {
                this.$handleApiError(error, 'listar alertas');
            }
        },

        getProcesal(audiencia) {
            return `${audiencia.nat_nombres} ${audiencia.nat_apellido_paterno} ${audiencia.nat_apellido_materno}`;
        },

        mostrarAlerta() {
            this.showalerta = true;
            this.showaudiencia = false;
        },

        mostrarAudiencia() {
            this.showaudiencia = true;
            this.showalerta = false;
        },

        obtenerDemandante(audiencia) {
            const demandantePredeterminado = 'UNPRG';

            const tipoDemanda = audiencia.multiple === '0' ? audiencia.nombre_completo : 'Demanda Colectiva';
            const tipoPersona = audiencia.tipo_persona === 'NATURAL' ? tipoDemanda : audiencia.jur_razon_social;
            const tipoProcesal = audiencia.tipo_procesal === 'DEMANDANTE' ? tipoPersona : demandantePredeterminado;

            return tipoProcesal;
        },

        obtenerDemandado(audiencia) {
            const demandantePredeterminado = 'UNPRG';

            const tipoDemanda = audiencia.multiple === '0' ? audiencia.nombre_completo : 'Demanda Colectiva';
            const tipoPersona = audiencia.tipo_persona === 'NATURAL' ? tipoDemanda : audiencia.jur_razon_social;
            const tipoProcesal = audiencia.tipo_procesal === 'DEMANDADO' ? tipoPersona : demandantePredeterminado;

            return tipoProcesal;
        },

        async cargarDetallesExpediente() {
            try {
                this.$showLoadingAlert();

                const params = { "exp_id": this.$route.params.id };
                const response = await this.$postData('proceeding/buscarPorId', this, params);

                this.audiencia.au_lugar = response.data.juzgado;
                this.audiencia.per_id = response.data.procesal[0].per_id;

                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar datos del expediente');
            }
        },

        async guardarAlerta() {
            try {
                this.$showLoadingAlert();
                const response = await this.$postData('alerta/store', this, this.alerta);
                if (response.state === 0) {
                    this.listarAlertas();
                    this.limpiarCampos(this.alerta);
                    this.cerrarModal();
                } else {
                    alert('Datos no Registrados');
                }
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar datos del expediente');
            }
        },
        async guardarAudiencia() {
            try {
                this.$showLoadingAlert();
                const response = await this.$postData('audiences/store', this, this.audiencia);
                if (response.state === 0) {
                    this.listarAudiencias();
                    this.limpiarCampos(this.audiencia);
                    this.cerrarModal();
                } else {
                    alert('Datos no Registrados');
                }
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar datos del expediente');
            }
        },
        goBack() {
            this.$router.go(-1);
        },
        async initDataTable(ref) {
            this.destroyDataTable(ref);
            await this.$nextTick();
            this[ref] = $(this.$refs[ref]).DataTable({
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
                },
                // Otras configuraciones específicas de la tabla
            });
        },

        destroyDataTable(ref) {
            if (this[ref]) {
                this[ref].destroy();
                this[ref] = null;
            }
        },
    },
    beforeDestroy() {
        this.destroyDataTable();
    },
};
</script>

<style scoped>
@import '@/assets/css/modal.css';
</style>