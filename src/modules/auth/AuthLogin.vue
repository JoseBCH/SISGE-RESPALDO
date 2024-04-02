<template>
  <div class="auth-wrapper pb-0">
    <div class="auth-content">
      <div class="card rounded">
        <div class="row align-items-center">
          <div class="col-md-12">
            <div class="card-body">
              <div class="text-center">
                <img src="@/assets/images/logo-unprg.png" alt="Logo" class="img-fluid mb-4">
                <h6 class="pb-3 text-secondary">Sistema de Gestión de Expedientes</h6>
                <span class="text-danger" v-show="showUserError">{{ userErrorMessage }}</span>
              </div>
              <form @submit.prevent="authLogin">
                <div class="form-group mb-3">
                  <label class="form-label" for="email">Email</label>
                  <input ref="emailInput" type="text" id="email" class="form-control text-secondary"
                    v-model="credenciales.login" @input="validarCampo('login')" :class="{ 'has-error': errores.login }">
                  <span class="text-danger" v-if="errores.login">Ingrese un email.</span>
                </div>

                <div class="form-group mb-4">
                  <label class="form-label" for="password">Contraseña</label>
                  <input type="password" id="password" class="form-control text-secondary"
                    v-model="credenciales.password" @input="validarCampo('password')"
                    :class="{ 'has-error': errores.password }" @keyup.enter="authLogin">
                  <span class="text-danger" v-if="errores.password">Ingrese una contraseña.</span>
                </div>

                <div class="text-center">
                  <button class="btn btn-lg btn-primary w-100 fw-bold rounded" type="submit">
                    <span v-if="!isLoading">Iniciar Sesión</span>
                    <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      credenciales: { login: "", password: "" },
      errores: { login: false, password: false },
      showUserError: false,
      userErrorMessage: '',
      isLoading: false
    };
  },
  created() {
    this.url = this.$store.getters.get__url;
  },
  mounted() {
    this.$refs.emailInput.focus();
  },
  methods: {
    validarCampo(campo) {
      this.errores[campo] = this.credenciales[campo] === "";
    },

    validarCampos() {
      const camposAValidar = Object.keys(this.errores);

      camposAValidar.forEach(campo => {
        this.validarCampo(campo);
      });

      return camposAValidar.every(campo => !this.errores[campo]);
    },


    async authLogin() {
      this.isLoading = true;
      if (this.validarCampos()) {
        try {
          const response = await this.$postData('user/login', this, this.credenciales);

          if (response.state === 200) {
            this.$store.commit('mt_set_user', response.user);
            this.$router.push({ path: '/home' });
          } else {
            this.handleFailedLogin('Usuario o contraseña incorrectos.');
          }
        } catch (error) {
          this.handleFailedLogin(`Error al iniciar sesión: ${error.message}`);
        }
      }
      this.isLoading = false;
    },

    handleFailedLogin(errorMessage) {
      this.showUserError = true;
      this.userErrorMessage = errorMessage;
    },
  },
};
</script>

<style scoped>
.has-error {
  border: 1px solid #EA4D4D;
}

.text-danger {
  font-size: 12px;
}

.card{
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
</style>