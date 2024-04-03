<template>
  <div v-if="user">
    <LayoutNavMobile />
    <LayoutSidebar />
    <LayoutNavbar />
    <router-view></router-view>
  </div>
</template>
  
<script>
import LayoutNavMobile from '@/components/Layout/LayoutNavMobile.vue';
import LayoutNavbar from '@/components/Layout/LayoutNavbar.vue';
import LayoutSidebar from '@/components/Layout/LayoutSidebar.vue';
import NotificationAlertas from '@/components/Notifications/NotificationAlerts.vue';

export default {
  name: 'dashboard',
  components: {
    LayoutNavMobile,
    LayoutNavbar,
    LayoutSidebar,
    NotificationAlertas,
  },
  data() {
    return {
      user: null,
      rol: null,
    }
  },
  computed: {
    isAbogado() {
      return this.user?.usu_rol === 'ABOGADO';
    },
  },
  created() {
    const { name, usu_rol } = this.$store.getters.get__user;
    this.user = name;
    this.rol = usu_rol;

    if (!this.user) {
      this.$router.push({ path: '/' });
    }
  },
}
</script>
  
<style scoped>
.notification-alertas {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
}
</style>
  