<template>
  <section class="pc-container pb-4">
    <div class="pcoded-content">
      <div class="row mb-4">
        <h5 class="text-dark fw-bold">Visualizacion de expedientes</h5>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="card shadow">
            <div class="card-header">
              <h5 class="text-secondary">Lista de expedientes archivados</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table" id="table" ref="myDataTable">
                  <thead>
                    <tr>
                      <th>N° de Expediente</th>
                      <th>Fecha de Inicio</th>
                      <th>Demandante</th>
                      <th>Demandado</th>
                      <th>Pretensión</th>
                      <th class="text-center">Estado</th>
                      <th class="text-center">Interacciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="expediente in expedientes" :key="expediente.exp_id">
                      <td class="col-md-2">
                        <router-link :to="{ name: 'expediente/detalle', params: { id: expediente.exp_id } }">
                          {{ expediente.numero }}
                        </router-link>
                      </td>
                      <td>{{ expediente.fecha_inicio }}</td>
                      <td>{{ isDemandante(expediente.procesal, expediente.multiple) }}</td>
                      <td>{{ isDemandado(expediente.procesal, expediente.multiple) }}</td>
                      <td>{{ expediente.pretencion }}</td>
                      <td class="text-center">
                        <span :class="badgeClass(expediente.estado_proceso)">
                          {{ expediente.estado_proceso }}
                        </span>
                      </td>
                      <td class="text-center m-0 p-0">
                      
                        <router-link :to="{ name: 'archivos', params: { id: expediente.exp_id } }"
                          class="badge p-2 bg-links">
                          Registrar archivos
                        </router-link>
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
  name: 'archivados',
  mixins: [DataTable],
  mounted() {
    this.$nextTick(() => {
      feather.replace();
    });
    this.cargarExpedientes();
  },

  data() {
    return {
      expedientes: [],
      dataTable: null,
      exp: {},
      idExpediente: null,
      showModal: ""
    };
  },

  methods: {
    async cargarExpedientes() {
      try {
        this.$showLoadingAlert();
        const result = await this.$postData('proceeding/archivados', this, {});
        this.expedientes = result.data;
        await this.$waitForDataTableDraw(this, 'myDataTable');
        this.$closeLoadingAlert();
      } catch (error) {
        this.$handleApiError(error, 'cargar expedientes');
      }
    },
    isDemandante(procesal, multiple) {
      return procesal[0].tipo_procesal === 'DEMANDANTE'
        ? this.nombreCompleto(procesal, multiple)
        : 'UNPRG';
    },
    isDemandado(procesal, multiple) {
      return procesal[0].tipo_procesal === 'DEMANDADO'
        ? this.nombreCompleto(procesal, multiple)
        : 'UNPRG';
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

<style scoped>
@import '@/assets/css/fileStatus.css';
@import '@/assets/css/dataTable.css';

.container-div {
  position: relative;
}

.content-events {
  position: absolute;
  bottom: 5em;
  right: 5em;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  z-index: 1;
}

.bg-links {
  background: #e3e1fc;
  color: #7267EF;
  border: 1px solid #7267EF;
  margin: 2.5px !important;
}
</style>
