<template>
  <div class="pc-container pb-4">
    <div class="pcoded-content">
      <component :is="mostrarOpcionAdmin ? 'CardPanelAdmin' : 'CardPanelUser'" />
      <div v-if="user.usu_rol === 'ABOGADO'" class="row">
        <div class="col-xl-12 col-md-12">
          <div class="card shadow rounded">
            <div class="card-header border-0">
              <!--<h6 v-if="mostrarOpcionAdmin" class="text-secondary p-0 m-0">Últimos cinco expedientes registrados en el
                sistema
              </h6>-->
              <h6 v-if="!mostrarOpcionAdmin" class="text-secondary p-0 m-0">Últimos expedientes asignados</h6>
            </div>
            <div class="card-body mx-0 px-0 mt-0 pt-0">
              <div class="table-responsive">
                <!--<TablePanelAdmin v-if="user.usu_rol === 'ADMIN' || user.usu_rol === 'SECRETARIA'"></TablePanelAdmin>-->
                <TablePanelUser v-if="user.usu_rol === 'ABOGADO' || user.usu_rol === 'ASISTENTE'"></TablePanelUser>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardPanelUser from '@/modules/administrative/components/Card/CardPanelUser.vue';
import CardPanelAdmin from '@/modules/administrative/components/Card/CardPanelAdmin.vue';
import TablePanelAdmin from '@/modules/administrative/components/Table/TablePanelAdmin.vue';
import TablePanelUser from '@/modules/administrative/components/Table/TablePanelUser.vue';
import { badgeClass } from '@/utils/utils.js';
import { getData, postData } from '@/utils/fetchData';
import '@/assets/css/fileStatus.css';
import feather from 'feather-icons';

export default {
  name: 'Panel',
  components: {
    CardPanelUser,
    CardPanelAdmin,
    TablePanelAdmin,
    TablePanelUser,
  },

  created() {
    this.getUser();
  },

  data() {
    return {
      user: [],
    };
  },

  computed: {
    rol() {
      return this.$store.getters.get__user.usu_rol;
    },
    mostrarOpcionAdmin() {
      return this.rol === 'ADMIN' || this.rol === 'SECRETARIA';
    },
  },

  mounted() {
    this.$nextTick(() => {
      feather.replace();
    });
  },

  methods: {
    async getUser() {
      this.$showLoadingAlert();
      this.user = this.$store.getters.get__user;
    },
  }
};
</script>

<style scoped>
@import '../../assets/css/dataTable.css';
</style>