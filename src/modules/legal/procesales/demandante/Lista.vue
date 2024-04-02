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
              <h5 class="text-secondary">Lista de Demandantes</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table" id="table" ref="myDataTable">
                  <thead>
                    <tr>
                      <th>DNI/RUC</th>
                      <th>Nombre / Razon Social</th>
                      <!-- <th>Telefono</th> -->
                      <!-- <th>Email</th> -->
                      <th>Interacciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(persona, index) in personas" :key="index">
                      <td>{{ persona.documento }}</td>
                      <td>{{ persona.nombre }}</td>
                      <!-- <td>{{ persona.telefono }}</td> -->
                      <!-- <td>{{ persona.correo }}</td> -->
                      <td class="text-center py-2">
                        <div class="d-flex">
                          <div class="tooltip-container">
                            <router-link :to="{ name: 'demandante/historial/nuevo', params: { doc: persona.documento } }"
                              class="tooltip-trigger">
                              <i data-feather="edit"></i>
                            </router-link>
                            <div class="custom-tooltip">Registrar historial</div>
                          </div>
                          <div class="tooltip-container">
                            <router-link :to="{ name: 'demandante/informacion', params: { doc: persona.id } }"
                              class="tooltip-trigger">
                              <i data-feather="file-text"></i>
                            </router-link>
                            <div class="custom-tooltip">Datos del demandante</div>
                          </div>
                          <a href="javascript:void(0)" class="btn btn-danger py-1 px-2 mx-2"
                            @click="editarDni(persona.id)">
                            <i data-feather="credit-card"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div v-if="showModal" class="modal" @click="cerrarModal">
            <div class="modal-content card border-0" @click.stop>
              <div class="card-header">
                <h5 class="text-center">Editar DNI</h5>
              </div>
              <div class="card-body mb-0 pb-0">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="form-label">Dni</label>
                      <input class="form-control" v-model="demandante.nat_dni" @keyup.enter="actualizarDni(demandante.per_id)">
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer border-0 mt-0 pt-0">
                <div class="d-flex justify-content-end">
                  <button class="btn btn-secondary btn-lg  px-4 mx-2 rounded" @click="cerrarModal">Cancelar</button>
                  <button class="btn btn-primary btn-lg  px-4 rounded" @click="actualizarDni(demandante.per_id)">
                    <span v-if="!isLoading">Guardar</span>
                    <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  </button>
                </div>
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
  name: 'demandantes',
  mixins: [DataTable],
  mounted() {
    this.leer();
  },
  updated() {
    feather.replace();
  },
  data() {
    return {
      demandantes: [],
      demandante: {
        per_id: "",
        nat_dni: ""
      },
      dataTable: null,
      isLoading: false,
      editingIndex: null,
      showModal: false,
    };
  },
  computed: {
    personas() {
      const personasMap = new Map();

      this.demandantes.forEach((demandado) => {
        const key = demandado.nat_dni == null
          ?
          demandado.jur_ruc :
          demandado.nat_dni
          ;

        if (!personasMap.has(key)) {
          personasMap.set(key, {
            documento: key,
            id: demandado.per_id,
            nombre: demandado.jur_ruc === null
              ? `${demandado.nat_nombres} ${demandado.nat_apellido_paterno} ${demandado.nat_apellido_materno}`
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
        const result = await this.$postData('demandante', this, { tipo_procesal: 'DEMANDANTE' });
        this.demandantes = result.data;

        await this.$waitForDataTableDraw(this, 'myDataTable');
        this.$closeLoadingAlert();
      } catch (error) {
        this.$handleApiError(error, 'leer demandantes');
      }
    },

    editarDni(id) {
      const editDni = this.demandantes.find(demandante => demandante.per_id === id);
      if (editDni) {
        this.demandante = { ...editDni };
        this.showModal = true;
      } else {
        console.log("DNI no encontrada");
      }
    },

    async actualizarDni(id){
      try {
        this.isLoading = true;
        const formData = {
          per_id: id,
          newDni: this.demandante.nat_dni
        }
        const response = await this.$postData('demandante/updateDni', this, formData);
        if(response.state === 'success'){
          this.isLoading = false;
          this.cerrarModal();
          this.leer();
        }
      } catch (error) {
        this.$handleApiError(error, 'actualizar dni');
      }
    },

    mostrarModal() {
      this.showModal = true;
    },

    cerrarModal() {
      this.showModal = false;
      this.demandante.per_id = "";
      this.demandante.nat_id = "";
    }
  }
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

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: #fff;
    width: 500px;
    height: auto !important;
    /* padding: 20px; */
    border-radius: 8px !important;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    position: relative !important;
}

@media (max-width: 768px) {
    .modal-content {
        width: 90%;
    }
}
</style>
