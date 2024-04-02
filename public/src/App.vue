<template>
  <div id="app" class="hold-transition sidebar-mini layout-fixed ">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app',
  created() {
    const storedRoute = localStorage.getItem('currentRoute');
    if (storedRoute && this.$store.getters.get__token) {
      this.$router.push(storedRoute);
    } else {
      this.$router.push('/');
    }

  }
}
</script>

