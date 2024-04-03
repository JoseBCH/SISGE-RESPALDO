<template>
  <header class="pc-header ">
    <div class="header-wrapper">
      <div class="ml-auto">
        <ul class="list-unstyled">
          <li class="dropdown pc-h-item">
            <a class="pc-head-link dropdown-toggle arrow-none mr-0" data-toggle="dropdown" href="#" role="button"
              aria-haspopup="false" aria-expanded="false">
              <div class="circle mr-2">
                {{ name.charAt(0) }}
              </div>
              <span>
                <span class="user-name">{{ name }}</span>
                <span class="user-desc">{{ role }}</span>
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right pc-h-dropdown">
              <button class="dropdown-item" @click.prevent="logout()">
                <i class="material-icons-two-tone">chrome_reader_mode</i>
                <span>Salir</span>
              </button>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </header>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'LayoutNavbar',
  computed: {
    name() {
      const nombre = this.$store.getters.get__user.datos.nombres;
      const apellidoPaterno = this.$store.getters.get__user.datos.apellido_paterno;

      return `${nombre} ${apellidoPaterno}`;
    },
    role() {
      return this.$store.getters.get__user.usu_rol;
    },
  },
  mounted() {
    this.$nextTick(() => {
      feather.replace();
    });
  },
  methods: {
    async logout() {
      try {
        this.$showLoadingAlert('', 'Cerrando Sesión...');
        const formData = {
          id: null
        };
        const response = await this.$postData('demandante/logout', this, formData);

        if (response.state === 0) {
          this.$store.commit('mt_logout_auth');
          this.$router.replace({ path: '/' });
        } else {
          this.$errorAlert('', 'Error en la respuesta del servidor');
        }
      } catch (error) {
        this.$closeLoadingAlert();
        this.$handleApiError(error, 'Error en la solicitud de cerrar sesión');
        this.$errorAlert('', error.message);
      } finally {
        this.$closeLoadingAlert();
      }
    }

  },
};
</script>
<style scoped>
.circle {
  width: 35px;
  height: 35px;
  background-color: #0d6efd;
  color: white;
  font-weight: 800;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}

.link-data {
  width: 87.5%;
}
</style>