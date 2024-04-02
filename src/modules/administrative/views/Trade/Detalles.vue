<template>
    <div class="pc-container pb-4 ">
        <div class="page-header">
            <div class="page-block">
                <div class="row align-items-center">
                    <div class="col-md-12">
                        <div class="page-header-title">
                            <h5 class="m-b-10">
                                <button class="btn btn-sm mr-2 btn-primary" @click="goBack">
                                    <i data-feather="arrow-left"></i>
                                </button>
                                EXPEDIENTE ADMINISTRATIVO: {{
                                    trade ? trade.tra_number : '---' }}
                            </h5>
                        </div>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><button class="btn rounded border py-1 px-4 btn-outline-primary"
                                :class="{ 'btn-primary text-white': isVista === '1' }" @click="selectVista('1')">
                                DATOS</button>
                            </li>
                            <li class="breadcrumb-item"><button class="btn rounded border py-1 px-4 btn-outline-primary"
                                :class="{ 'btn-primary text-white': isVista === '2' }" @click="selectVista('2')">
                                ARCHIVOS</button>
                            </li>
                            <li v-if="showOption('ADMIN', 'SECRETARIA')" class="breadcrumb-item"><button class="btn rounded border py-1 px-4 btn-outline-primary"
                                :class="{ 'btn-primary text-white': isVista === '3' }" @click="selectVista('3')">
                                HISTORIAL</button>
                            </li>
                            <li v-if="showOption('ABOGADO', 'ASISTENTE')" class="breadcrumb-item"><button class="btn rounded border py-1 px-4 btn-outline-primary"
                                :class="{ 'btn-primary text-white': isVista === '3' }" @click="selectVista('3')">
                                SOLICITUDES</button>
                            </li>
                            <li class="breadcrumb-item"><button class="btn rounded border py-1 px-4 btn-outline-primary"
                                @click="redirectActualizar()">
                                ACTUALIZAR</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="pcoded-content">
            <div v-if="trade">
                <General :id="trade.tra_id" v-if="isVista === '1'" />
                <Archivos :id="trade.tra_id" v-else-if="isVista === '2'" />
                <Historial :id="trade.tra_id" v-else-if="isVista === '3' && showOption('ADMIN', 'SECRETARIA')" />
                <Solicitud :id="trade.tra_id" v-else-if="isVista === '3' && showOption('ABOGADO', 'ASISTENTE')" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import feather from "feather-icons";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import General from '@/modules/administrative/components/expediente_detalle/General.vue';
import Archivos from '@/modules/administrative/components/expediente_detalle/Archivos.vue';
import Historial from '@/modules/administrative/components/expediente_detalle/secretaria/Historial.vue';
import Solicitud from '@/modules/administrative/components/expediente_detalle/abogado/Solicitud.vue';
import moment from 'moment';

export default {
    name: 'DetallesOficio',
    props: ['id'],
    components: {
        General, Archivos, Historial, Solicitud
    },

    data() {
        return {
            isVista: '1',
            dataTable: null,
            trade: null,
        };
    },
    computed: {
        rol() {
            return this.$store.getters.get__user.usu_rol;
        },
    },
    mounted() {
        this.cargarDetallesOficio();
        this.$nextTick(() => {
            feather.replace();
        });
    },


    methods: {
        ...mapActions(['get', 'post']),
        selectVista(vista) {
            this.isVista = vista;
        },

        showOption(...allowedRoles) {
            return allowedRoles.includes(this.rol);
        },

        async cargarDetallesOficio() {
            try {
                this.$showLoadingAlert();
                const response = await axios.get(`${this.$store.getters.get__url}/trade/${this.id}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.get__token}`
                    }
                });
                this.trade = response.data.trade;
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar detalles del expediente administrativo', this.id);
            }
        },


        goBack() {
            if (this.$store.getters.get__user.usu_rol === 'ABOGADO') {
                this.$router.push({ path: '/oficio/asignados' });
            } else {
                this.$router.go(-1);
            }
        },

    }
};
</script>

<style scoped>
.ul2 {
    list-style: none;
    padding: 0;
}

.li2 {
    list-style: none;
    padding: 0;
}

.sessions1 {
    margin-top: 2rem;
    border-radius: 12px;
    position: relative;
}

.li1 {
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

.time1 {
    color: #2a2839;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;

}

.text-muted {
    color: #888;
}

/* .card {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 16px;
} */

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: #fff;
    width: 600px;
    height: auto !important;
    /* padding: 20px; */
    border-radius: 8px !important;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    position: relative !important;
}

.card-header {
    border-radius: 8px 8px 0px 0px !important;
}

/* Agrega esta clase CSS para el botón */
.archivo-button {
    white-space: nowrap;
    /* Evita el salto de línea */
    overflow: hidden;
    /* Oculta el contenido que sobresale */
    text-overflow: ellipsis;
    /* Añade puntos suspensivos (...) cuando el contenido se corta */
}

/* Al pasar el mouse, muestra el contenido completo */
/* .archivo-button:hover {
    white-space: nowrap;
    overflow: visible;
} */
</style>