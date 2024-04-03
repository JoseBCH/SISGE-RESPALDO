<template>
    <div class="login-container">
      <h2 class="text-center mb-4">Iniciar sesión</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Nombre de usuario:</label>
          <input type="text" id="username" v-model="username" class="form-control" />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Iniciar sesión</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        // Aquí implementa la lógica de autenticación, por ejemplo, haciendo una solicitud API
        // y actualizando el estado de Vuex si las credenciales son correctas.
        console.log('Implementa la lógica de autenticación aquí');
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 50px;
  }
  </style>
  