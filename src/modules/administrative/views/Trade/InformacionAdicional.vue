<!-- InfoAdicional.vue -->

<template>
    <div>
      <h2>Información Adicional</h2>
      <!-- Agrega los campos y la lógica necesarios para la información adicional -->
      <div class="form-group">
        <label for="infoAdicionalInput">Información Adicional</label>
        <textarea
          id="infoAdicionalInput"
          class="form-control"
          v-model="informacionAdicional"
          placeholder="Ingrese información adicional"
        ></textarea>
      </div>
  
      <!-- Botón para enviar la información adicional -->
      <button class="btn btn-primary" @click="enviarInformacionAdicional">Enviar</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        informacionAdicional: "",
      };
    },
    methods: {
      enviarInformacionAdicional() {
        // Puedes emitir un evento para enviar la información adicional al componente padre (RegistroGeneral)
        this.$emit("recibirDatosInformacion", { informacionAdicional: this.informacionAdicional });
  
        // También puedes realizar otras acciones según tus necesidades
  
        // Por ejemplo, puedes cerrar la ventana de información adicional
        this.$emit("cerrarInfoAdicional");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Agrega estilos específicos según sea necesario */
  </style>
  