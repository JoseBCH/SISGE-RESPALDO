<template>
  <section class="pc-container">
    <div class="pcoded-content">
      <div class="row mb-4">
        <h5>
          <button class="btn btn-sm mr-2 btn-light" @click="goBack">
            <i class="material-icons-two-tone text-dark">home</i>
          </button><span class="text-dark">{{ tipoOficio }}</span>
        </h5>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="card shadow">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table" id="tabla" ref="myDataTable">
                  <thead>
                    <tr>
                      <th>N° de Oficio</th>
                      <th>Asunto</th>
                      <th>Fecha de llegada</th>
                      <th>Responsable</th>
                      <th>Cargo</th>
                      <th>Area</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="trade in trades" :key="trade.tra_id">
                      <td class="pl-4">
                        <router-link :to="{ name: 'oficio/detalle', params: { id: trade.tra_id } }">
                          {{ trade.tra_number }}
                        </router-link>
                      </td>
                      <td>{{ trade.tra_matter }}</td>
                      <td>{{ trade.tra_arrival_date }}</td>
                      <td v-if="trade.assistant">{{ trade.assistant.persona.nat_nombres }}</td>
                      <td v-if="trade.lawyer">{{ trade.lawyer.persona.nat_nombres }} {{ trade.lawyer.persona.nat_apellido_paterno }} {{ trade.lawyer.persona.nat_apellido_materno }}</td>
                      <td>{{ trade.tra_type_person }}</td>
                      <td>{{ trade.area.are_name }}</td>
                      <td class="pr-5">
                        Hola
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
  props: ['tipo_tra'],
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
      tipoOficio: null,
    };
  },

  methods: {
    mostrarTipoTrade() {
      if (this.tipo_tra === 'pendAbogado') {
        this.tipoOficio = 'Lista de expedientes pendientes de los abogados';
      } else if (this.tipo_tra === 'pendAsistente') {
        this.tipoOficio = 'Lista de expedientes pendientes de los asistentes';
      } else if (this.tipo_tra === 'infoAdi') {
        this.tipoOficio = 'Lista de expedientes que requieren Información Adicional';
      } else if (this.tipo_tra === 'revInmediata') {
        this.tipoOficio = 'Lista de expedientes de revisión pendiente';
      } else if (this.tipo_tra === 'terminado') {
        this.tipoOficio = 'Lista de expedientes finalizados';
      }else {
        this.tipoOficio = 'Lista de expedientes totales';
      }
    },
    async cargarTrades() {
      try {
        this.$showLoadingAlert();
        this.mostrarTipoTrade();
        const result = await this.$getData('trade', this);

        this.trades = result.data;
        if (this.tipo_tra === 'pendAbogado') {
          this.trades = this.trades.filter(trade => trade.tra_state_law === 'P' && trade.tra_type_person === 'ABOGADO');
        } else if (this.tipo_tra === 'pendAsistente') {
          this.trades = this.trades.filter(trade => trade.tra_state_law === 'P' && trade.tra_type_person === 'ASISTENTE');
        } else if (this.tipo_tra === 'infoAdi') {
          this.trades = this.trades.filter(trade => trade.tra_state_mp === 'V');
        } else if (this.tipo_tra === 'terminado') {
          this.trades = this.trades.filter(trade => trade.tra_state_law === 'F');
        }else if (this.tipo_tra === 'revInmediata') {
          //Trades Tardes
          // Obtener la fecha actual
          const currentDate = new Date();

          // Filtrar trades que tienen una diferencia de más de 15 días
          this.trades = this.trades.filter(trade => {
            const arrivalDate = new Date(trade.tra_arrival_date);
            const differenceInDays = Math.floor((currentDate - arrivalDate) / (1000 * 60 * 60 * 24));
            return differenceInDays > 15;
          });
        }
        await this.$waitForDataTableDraw(this, 'myDataTable');

        this.$closeLoadingAlert();
      } catch (error) {
        this.$handleApiError(error, 'cargar oficios');
      }
    },

    goBack() {
      this.$router.go(-1); // Navega hacia atrás en el historial
    }
  },
  watch: {
    tipo_tra: 'cargarTrades',
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
