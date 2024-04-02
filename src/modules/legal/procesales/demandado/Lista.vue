<template>
  <section class="pc-container pb-4">
    <div class="pcoded-content">
      <div class="row mb-4">
        <h5 class="text-dark fw-bold">Partes Procesales</h5>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="card shadow">
            <div class="card-header">
              <h5 class="text-secondary">Lista de Demandados</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table" id="table" ref="myDataTable">
                  <thead>
                    <tr>
                      <th>DNI/RUC</th>
                      <th>Nombre / Razon Social</th>
                      <th>Telefono</th>
                      <th>Email</th>
                      <th class="text-center">Interacciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(persona, index) in personas" :key="index">
                      <td>{{ persona.documento }}</td>
                      <td>{{ persona.nombre }}</td>
                      <td>{{ persona.telefono }}</td>
                      <td>{{ persona.correo }}</td>
                      <td>
                        <div class="d-flex">
                          <div class="tooltip-container">
                            <router-link
                              :to="{ name: 'demandado/historial/nuevo', params: { doc: persona.documento } }"
                              class="tooltip-trigger">
                              <i data-feather="edit"></i>
                            </router-link>
                            <div class="custom-tooltip">Registrar historial</div>
                          </div>
                          <div class="tooltip-container">
                            <router-link :to="{ name: 'demandado/informacion', params: { doc:persona.id} }"
                              class="tooltip-trigger">
                              <i data-feather="file-text"></i>
                            </router-link>
                            <div class="custom-tooltip">Datos del demandado</div>
                          </div>
                        </div>
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

export default {
  name: 'demandados',
  mixins: [DataTable],
  mounted() {
    this.leer();
  },
  updated() {
    feather.replace();
  },
  data() {
    return {
      demandados: [],
      dataTable: null,
    };
  },
  computed: {
    personas() {
      const personasMap = new Map();

      this.demandados.forEach((demandado) => {
        const key = demandado.nat_dni==null
          ? 
           demandado.jur_ruc:
           demandado.nat_dni
           ;

        if (!personasMap.has(key)) {
          personasMap.set(key, {
            documento: key,
            id: demandado.per_id,
            nombre: demandado.jur_ruc === null
              ? `${demandado.nat_apellido_paterno} ${demandado.nat_apellido_materno} ${demandado.nat_nombres}`
              : demandado.jur_razon_social,
            telefono: demandado.jur_ruc === null
              ? demandado.nat_telefono
              : demandado.jur_telefono,
            correo: demandado.jur_ruc === null
              ? demandado.nat_correo
              : demandado.jur_correo,
          });
        }
      });

      return Array.from(personasMap.values());
    },
  },
  methods: {
    async leer() {
      try {
        this.$showLoadingAlert();
        const result = await this.$getData('personas', this);
        this.demandados = result.data;
        await this.$waitForDataTableDraw(this, 'myDataTable');
        this.$closeLoadingAlert();
      } catch (error) {
        this.$handleApiError(error, 'leer');
      }
    },
   
  },
  
};
</script>

<style scoped>
@import '@/assets/css/dataTable.css';
@media (min-width: 768px) {
  .table-responsive {
    overflow: hidden !important;
  }
}

.tooltip-container {
  position: relative;
}

.tooltip-trigger {
  cursor: pointer;
  padding: 7.5px;
  border: none;
  background-color: #7267EF;
  color: #fff;
  position: relative;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.55rem;
}

.custom-tooltip {
  width: 10rem;
  position: absolute;
  background-color: #6c757d;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s linear;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.tooltip-trigger:hover+.custom-tooltip {
  visibility: visible;
  opacity: 1;
  top: 50%;
  right: calc(100% - 5px);
  transform: translate(0, -50%);
}

.custom-tooltip::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent #6c757d;
}
</style>