<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card shadow rounded">
        <div class="card-header">
          <h5>Historial de Interacciones</h5>
        </div>
        <p class="text-center text-secondary py-4" v-if="historiales.length === 0">Sin datos en el
          historial.</p>
        <div class="card-body px-5 py-2" v-else>
          <div class="row px-3">
            <ul class="sessions">
              <li v-for="historial in historiales" :key="historial.his_id">
                <div class="row">
                  <div class="left col-md-2">
                    <div class="time">{{ historial.his_fecha_hora }}</div>
                    <p>{{ historial.his_medio_comuniacion }}</p>
                  </div>
                  <p class="col-md-8">{{ historial.his_detalle }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'historial',
  created() {
    this.cargarHistorialDemandado();
  },
  data() {
    return {
      historiales: [],
      loading: true,
    };
  },
  computed: {
    doc() {
      return this.$route.params.doc;
    }
  },
  methods: {
    async cargarHistorialDemandado() {
      try {
        const response = await this.$axios.get(`${this.$store.getters.get__url}/demandado/historial/${this.doc}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.get__token}`,
          },
        });
        this.historiales = response.data.data;
      } catch (error) {
        this.$handleApiError(error, 'cargar hisorial del demandado');
      } 
    },

  }
}
</script>
<style scoped>
ul,
li {
  list-style: none;
  padding: 0;
}

.sessions {
  margin-top: 2rem;
  border-radius: 12px;
  position: relative;
}

li {
  padding-bottom: 1.5rem;
  border-left: 2px solid #4e5ed3;
  position: relative;
  padding-left: 20px;
  margin-left: 10px;

  &:last-child {
    border: 0px;
    padding-bottom: 0;
  }

  &:before {
    content: '';
    width: 24px;
    height: 24px;
    background: #4e5ed3;
    border: 2px solid #4e5ed3;
    border-radius: 50%;
    position: absolute;
    left: -13px;
    top: 0px;
  }

}

.time {
  color: #2a2839;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;

}
</style>