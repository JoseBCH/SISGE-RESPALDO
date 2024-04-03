<template>
    <div class="options-modal">
      <router-link :to="{ name: 'eventos', params: { id: idExpediente } }" class="btn btn-primary">
        Planificar eventos
      </router-link>
      <router-link :to="{ name: 'archivos', params: { id: idExpediente } }" class="btn btn-primary">
        Registrar archivos
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      idExpediente: {
        type: Number,
        required: true
      }
    },
    methods: {
        mostarModal(){
            console.log(expediente);
            console.log(showModal);
        }
    }
  };
  </script>
  
  <style scoped>
  .options-modal {
    display: grid;
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 100;
    right: 100px;
  }
  </style>
  