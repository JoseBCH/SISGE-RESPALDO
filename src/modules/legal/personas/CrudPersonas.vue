<template>
  <section class="pc-container pb-4">
    <div class="pcoded-content">
      <div class="row mb-4 d-flex align-items-center">
        <div class="col-sm-12 col-md-6 col-xl-9">
          <h5><span class="text-primary">Personas</span> | <span class="text-secondary"> {{ tipoSeleccionado === '' ?
            'Lista' : tipoSeleccionado.name }}</span></h5>
        </div>
        <div class="col-sm-12 col-md-6 col-xl-3">
          <select class="form-control" v-model="tipoSeleccionado">
            <option value="" selected disabled>Parte procesal</option>
            <option v-for="item in tipos" :value="item">{{ item.name }}</option>
          </select>
        </div>

      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive" v-if="personasFiltradas.length > 0">
                <table class="table table-hover" id="table" ref="dataTable" aria-describedby="table-personas">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Documento</th>
                      <!-- <th>Tipo Procesal</th> -->
                      <th>Condicion</th>
                      <th>Apellido paterno /<br> Razon social</th>
                      <th>Apellido materno</th>
                      <th>Nombres</th>
                      <th>Interacciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(persona, index) in personasFiltradas" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ documento(persona) }}</td>
                      <!-- <td>{{ persona.tipo_procesal }}</td> -->
                      <td>{{ persona.per_condicion }}</td>
                      <td class="text-truncate" style="max-width: 100px;">{{ apellidoPaternoRazonSocial(persona) }}</td>
                      <td>{{ apellidoMaterno(persona) }}</td>
                      <td>{{ nombres(persona) }}</td>
                      <td>
                        <div class="d-flex gap-2">
                          <button @click="modalHistorial(persona)"
                            class="btn btn-sm btn-outline-success rounded border-1" style="font-size: 12px;">
                            Registrar Historial
                          </button>

                          <button @click="verDatos(persona.per_id)"
                            class="btn btn-sm btn-outline-primary rounded border-1" style="font-size: 12px;">
                            Ver datos
                          </button>
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
      <b-modal v-model="modalRegistroHistorial" title="Registrar historial" hide-header-close centered size="md"
        @hide="limpiarCampos" no-close-on-backdrop>
        <b-form>
          <div class="form-group">
            <label class="form-label" for="NumeroExpediente">N° Expediente</label>
            <select class="form-control" id="NumeroExpediente" v-model="historial.exp_id">
              <option :value="null" disabled selected>--Seleccionar</option>
              <option v-for="expediente in expedientes" :value="expediente.exp_id">{{ expediente.exp_numero }}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Fecha</label>
            <input v-model="historial.his_fecha_hora" type="date" class="form-control">
          </div>
          <div class="form-group">
            <label class="form-label">Medio de Contacto</label>
            <select class="form-control" v-model="historial.his_medio_comuniacion">
              <option :value="null" disabled selected>--Seleccionar</option>
              <option v-for="medio in medios" :value="medio.name">{{ medio.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="Detalles">Detalles o Resumen de la Comunicacion</label>
            <textarea class="form-control" id="Detalles" v-model="historial.his_detalle"></textarea>
          </div>
        </b-form>
        <template #modal-footer="{ cancel, ok }">
          <b-button v-on:click="cancel" class="btn btn-lg btn-secondary">Cerrar</b-button>
          <b-button @click="registrarHistorial" class="btn btn-lg btn-success">Guardar </b-button>
        </template>
      </b-modal>
    </div>
  </section>
</template>

<script>
import feather from 'feather-icons';
import { BButton, BModal, BForm, BFormGroup, BFormInput } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import DataTable from '@/utils/dataTable';

export default {
  name: 'demandados',
  // mixins: [DataTable],
  components: {
    BButton,
    BModal,
    BForm,
    BFormGroup,
    BFormInput
  },
  mounted() {
    this.leer();
  },
  updated() {
    feather.replace();
  },
  data() {
    return {
      modalRegistroHistorial: false,
      personas: [],
      dataTable: null,
      tipoSeleccionado: '',
      tipos: [
        { id: 1, name: 'Demandante' },
        { id: 2, name: 'Demandado' },
        { id: 3, name: 'Denunciante' },
        { id: 4, name: 'Denunciado' },
      ],
      historial: {
        per_id: null,
        exp_id: null,
        his_fecha_hora: null,
        his_medio_comuniacion: null,
        his_detalle: null
      },
      expedientes: null,
      medios: [
        { id: 1, name: 'Visita presencial' },
        { id: 2, name: 'Llamada telefonica' },
        { id: 3, name: 'Correo electronico' }
      ]
    };
  },
  watch: {
    personasFiltradas: {
      handler: 'initDataTable',
      immediate: true,
    },
  },
  computed: {
    personasFiltradas() {
      return this.tipoSeleccionado
        ? this.personas.filter(persona => persona.tipo_procesal === this.tipoSeleccionado.name)
        : this.personas;
    }
  },
  methods: {
    documento(persona) {
      return persona.nat_dni === null ? persona.jur_ruc : persona.nat_dni;
    },

    apellidoPaternoRazonSocial(persona) {
      return persona.nat_dni != null ? persona.nat_apellido_paterno : persona.jur_razon_social;
    },

    apellidoMaterno(persona) {
      return persona.nat_dni != null ? persona.nat_apellido_materno : '--';
    },

    nombres(persona) {
      return persona.nat_dni != null ? persona.nat_nombres : '--';
    },

    async modalHistorial(persona) {
      try {
        this.historial.per_id = persona.per_id;
        const formData = {
          "documento": this.documento(persona)
        }
        const response = await this.$postData('demandante/expedientes', this, formData)
        this.expedientes = response.expedientes;
        this.modalRegistroHistorial = true;
      } catch (error) {
        this.$handleApiError(error, 'cargar expedientes de la persona');
      }

    },

    async registrarHistorial() {
      try {
        this.modalRegistroHistorial = false;
        this.$showLoadingAlert('Guardando', 'Registrando historial, por favor espere...');
        const response = await this.$postData('history/store', this, this.historial);
        console.log(response);
        // Otras operaciones exitosas aquí si es necesario
      } catch (error) {
        this.$handleApiError(error, 'registrar historial');
      } finally {
        this.$closeLoadingAlert();
      }

    },

    verDatos(id) {
      this.$router.push({ name: 'demandante/informacion', params: { id: id } });
    },

    async leer() {
      try {
        this.$showLoadingAlert();
        const result = await this.$getData('personas', this);
        this.personas = result.data;
        // await this.waitForDataTableDraw(this, 'dataTable');
        this.$closeLoadingAlert();
      } catch (error) {
        this.$handleApiError(error, 'leer');
      }
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

    limpiarCampos() {
      for (let key in this.historial) {
        if (this.historial.hasOwnProperty(key)) {
          this.historial[key] = null;
        }
      }
    },


  },
};
</script>