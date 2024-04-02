<template>
  <section class="pc-container pb-4">
    <div class="pcoded-content">
      <div class="row">
        <div class="col-xl-12">
          <div class="card shadow">
            <div class="card-header">
              <h5 class="text-secondary">Expedientes administrativos asignados</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table" id="table" ref="myDataTable">
                  <thead>
                    <tr>
                      <th>N° de Oficio</th>
                      <th>Asunto</th>
                      <th>Fecha de llegada</th>
                      <th>Area</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="trade in trades" :key="trade.tra_id">
                      <td>
                        <router-link :to="{ name: 'oficio/detalle', params: { id: trade.tra_id } }">
                          {{ trade.tra_number }}
                        </router-link>
                      </td>
                      <td>{{ trade.tra_matter }}</td>
                      <td>{{ trade.tra_arrival_date }}</td>
                      <td>{{ trade.area.are_name }}</td>
                      <td v-if="trade.tra_state_law === 'P'" class="pr-5">
                        <span :class="badgeClassOficio(trade.tra_state_law)">
                          Pendiente
                        </span>
                      </td>
                      <td v-if="trade.tra_state_law === 'F'" class="pr-5">
                        <span :class="badgeClassOficio(trade.tra_state_law)">
                          Terminado
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
import { badgeClassOficio } from '@/utils/utils.js';
import feather from 'feather-icons';
import DataTable from '@/utils/dataTable';
import { badgeClass } from '@/utils/utils.js';
export default {
  name: 'AsignadosAbogado',
  mixins: [DataTable],
  mounted() {
    this.$nextTick(() => {
      feather.replace();
    });
    this.cargarTrades();
  },

  data() {
    return {
      trades: [],
      dataTable: null,
      exp: {},
      idTrade: null,
      showModal: ""
    };
  },

  methods: {
    async cargarTrades() {
      try {
        this.$showLoadingAlert();
        var result;
        var formData;
        if (this.$store.getters.get__user.usu_rol === 'ABOGADO') {
          formData = {
            abo_id: this.$store.getters.get__user.abo_id,
          }
          console.log('entro por abogado');
          result = await this.$postData('lawyer/listTrades', this, formData);
        }

        if (this.$store.getters.get__user.usu_rol === 'ASISTENTE') {
          formData = {
            ass_id: this.$store.getters.get__user.ass_id,
          }
          console.log('Usuario ASISTENTE:', this.$store.getters.get__user);
          console.log('entro por asistente');
          result = await this.$postData('assistant/listTrades', this, formData);
        }

        this.trades = result.data;
        await this.$waitForDataTableDraw(this, 'myDataTable');
        this.$closeLoadingAlert();
      } catch (error) {
        this.$handleApiError(error, 'cargar oficios asignados');
      }
    },
    badgeClassOficio,
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
  border: 1px solid #e3e1fc;
  margin: 2.5px !important;
}
</style>
  