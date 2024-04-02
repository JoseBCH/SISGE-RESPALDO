<template>
  <section class="pc-container pb-4">
    <div class="pcoded-content">
      <div class="row mb-4 d-flex align-items-center">
        <div class="col-sm-12 col-md-6 col-xl-9">
          <h5><span class="text-primary">Busque de Expedientes</span></h5>
        </div>
        <!-- <div class="col-sm-12 col-md-6 col-xl-3">
          <select class="form-control" v-model="tipoSeleccionado">
            <option value="" selected disabled>Seleccionar</option>
            <option v-for="tipo in tipos" :value="tipo">{{ tipo.name }}</option>
          </select>
        </div> -->

      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover m-b-0" id="dataTable" ref="dataTable" aria-describedby="table-expedientes">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>N° de Expediente</th>
                      <th>Fecha de Inicio</th>
                      <th>Parte Procesal</th>
                      <th>Materia/Delito</th>
                      <th>Pretensión</th>
                      <th>Fecha de Registro</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(expediente, index) in expedientes" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <a href="javascript:void(0)" class="btn-link" @click="redirectDetalle(expediente.exp_id)">
                          {{ expediente.numero }}
                        </a>
                      </td>
                      <td>{{ $formatDate(expediente.fecha_inicio) }}</td>
                      <td>{{ getNombreCompleto(expediente.procesal, expediente.multiple) }}</td>
                      <td>{{ expediente.materia }}</td>
                      <td>{{ expediente.pretencion }}</td>
                      <td>{{ $formatDate(expediente.creacion) }}</td>
                      <td>
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
  </section>
</template>

<script>
import feather from 'feather-icons';
import DataTable from '@/utils/dataTable';
import { badgeClass } from '@/utils/utils.js';

export default {
  name: 'Buscar',
  // mixins: [DataTable],
  data() {
    return {
      tipoSeleccionado: "",
      tipos: [],
      expedientes: [],
      dataTable: null,

    };
  },
  updated() {
    feather.replace();
  },
  mounted() {
    this.cargartiposExpedientes();
    this.cargarExpedientes();
  },
  // watch: {
  //   expedientesFiltrados: {
  //     handler: 'initDataTable',
  //     immediate: true,
  //   },
  // },
  computed: {
    expedientesFiltrados() {
      return this.tipoSeleccionado
        ? this.expedientes.filter(expediente => expediente.tipo_exp === parseInt(this.tipoSeleccionado.id))
        : this.expedientes;
    },
    id() {
      return this.$store.getters.get__user.abo_id;
    }
  },

  methods: {

    async cargartiposExpedientes() {
      try {
        const response = await this.$getData('proceedingTypes', this);
        this.tipos = response;
        this.tipoSeleccionado = response[0];
      } catch (error) {
        this.$handleApiError(error, 'cargar tipos de expedientes');
      }
    },

    async cargarExpedientes() {
      try {
        this.$showLoadingAlert();
        const formData = {
          'abo_id' : this.id
        }

        let response = null;
        if (this.id === null) {
          response = await this.$getData('proceeding', this);
        } else {
          response = await this.$postData('lawyer/expedientes', this, formData);
        }
        this.expedientes = response.data;
        this.initDataTable();
        this.$closeLoadingAlert();
      } catch (error) {
        this.$handleApiError(error, 'cargar expedientes');
      }
    },
    redirectDetalle(id) {
      this.$router.push({ name: 'expediente/detalle', params: { id } });
    },
    getNombreCompleto(procesal, multiple) {
      const tipoProcesal = procesal[0].tipo_procesal;
      return this.esDemandanteODemandado(tipoProcesal) ? this.obtenerNombreCompleto(procesal, multiple) : 'UNPRG';
    },
    esDemandanteODemandado(tipoProcesal) {
      return tipoProcesal === 'DEMANDANTE' || tipoProcesal === 'DEMANDADO';
    },
    obtenerNombreCompleto(procesal, multiple) {
      if (multiple === '1') {
        return 'Demanda Colectiva';
      }

      const { tipo_persona, apellido_paterno, apellido_materno, nombres, razon_social } = procesal[0];
      return tipo_persona === 'NATURAL' ? `${apellido_paterno} ${apellido_materno} ${nombres}` : razon_social;
    },
    badgeClass,
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
    },
    formatDate(fechaISO) {
      const fecha = new Date(fechaISO);
      const opcionesFormato = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      return fecha.toLocaleDateString('es-ES', opcionesFormato);
    },

    async initDataTable() {
      this.destroyDataTable();
      await this.$nextTick();
      this.dataTable = $(this.$refs.dataTable).DataTable({
        language: {
          url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
        },
      });
    },

    destroyDataTable() {
      this.dataTable && this.dataTable.destroy() && (this.dataTable = null);
    },

  },
};
</script>

<style scoped>
@import '@/assets/css/fileStatus.css';
@import '@/assets/css/dataTable.css';
</style>