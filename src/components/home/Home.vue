<template>
    <div>
        <Admin v-if="user_rol==='ADMIN'"/>
        <Abogado v-else-if="user_rol==='ABOGADO'"/>
        <Secretaria v-else-if="user_rol==='SECRETARIA'"/>
        <Asistente v-else-if="user_rol==='ASISTENTE'"/>
    </div>
</template>
  
<script>
import Admin from '@/components/home/Admin.vue';
import Abogado from '@/components/home/Abogado.vue';
// import Secretaria from '@/components/home/Secretaria.vue';
import Secretaria from '@/modules/administrative/Panel.vue';
import Asistente from '@/components/home/Asistente.vue';

export default {
    name: 'dashboard',
    components: {
        Admin, Abogado, Secretaria, Asistente
    },
    data() {
        return {
            user_rol: ''
        };
    },
    computed: {
        rol() {
            return this.$store.getters.get__user.usu_rol;
        }
    },
    methods: {
        assignRolToUserRol() {
            this.user_rol = this.rol;
        }
    },
    created() {
        this.assignRolToUserRol();
    }
};
</script>