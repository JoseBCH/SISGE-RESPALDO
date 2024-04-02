<template>
  <section class="pc-container pb-4">
    <div class="pcoded-content">
      <div class="row mb-4">
        <div class="col-md-auto">
          <button type="button" class="btn btn-outline-primary border-1"
            :class="{ 'btn-primary text-white': isCurrentRoute('/expediente/registro/civil-laboral') }"
            @click="registroCivilLaboral">
            Civil Laboral
          </button>
        </div>
        <div class="col-md-auto">
          <button type="button" class="btn btn-outline-primary border-1"
            :class="{ 'btn btn-primary text-white': isCurrentRoute('/expediente/registro/penal') }"
            @click="registroPenal">
            Penal
          </button>
        </div>
        <div class="col-md-auto">
          <button type="button" class="btn btn-outline-primary border-1"
            :class="{ 'btn btn-primary text-white': isCurrentRoute('/expediente/registro/arbitral') }"
            @click="registroArbitral">
            Arbitral
          </button>
        </div>
        <div class="col-md-auto">
          <button type="button" class="btn btn-outline-primary border-1"
            :class="{ 'btn btn-primary text-white': isCurrentRoute('/expediente/registro/indecopi') }"
            @click="registroIndecopi">
            Indecopi
          </button>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>
  
<script>
export default {
  methods: {
    registroCivilLaboral() {
      this.$router.push('/expediente/registro/civil-laboral');
    },
    registroPenal() {
      this.$router.push('/expediente/registro/penal');
    },
    registroArbitral() {
      this.$router.push('/expediente/registro/arbitral');
    },
    registroIndecopi() {
      this.$router.push('/expediente/registro/indecopi');
    },
    isCurrentRoute(route) {
      return this.$route.path === route;
    },
  },
};
</script>
  