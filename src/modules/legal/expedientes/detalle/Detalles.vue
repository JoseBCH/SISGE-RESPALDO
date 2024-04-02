<template>
    <div class="pc-container pb-4 ">
        <div class="pcoded-content">
            <div class="row mb-4">
                <div class="">
                    <button class="btn btn-sm mr-2 btn-secondary" @click="goBack">
                        <i data-feather="arrow-left"></i>
                    </button><span class="text-primary h5">Expediente</span> | <span class="text-dark h5"> {{
                        numeroExpediente }}</span>  
                    <p class="float-right"><span class="text-primary h5">Abogado asignado</span> | <span class="text-dark h5 font-bold">{{ abogado }}</span></p>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-md-auto mb-2">
                    <button type="button" class="btn btn-outline-primary border-1 w-100"
                        :class="{ 'btn-primary text-white': isVista === '1' }" @click="selectVista('1')">
                        Datos
                    </button>
                </div>
                <div class="col-md-auto mb-2">
                    <button type="button" class="btn btn-outline-primary border-1 w-100"
                        :class="{ 'btn-primary text-white': isVista === '2' }" @click="selectVista('2')">
                        Archivos
                    </button>
                </div>
                <div class="col-md-auto mb-2">
                    <button type="button" class="btn btn-outline-primary border-1 w-100"
                        :class="{ 'btn-primary text-white': isVista === '3' }" @click="selectVista('3')">
                        Tareas
                    </button>
                </div>
                <div class="col-md-auto mb-2">
                    <button type="button" class="btn btn-outline-primary border-1 w-100" @click="redirectActualizar()">Actualizar</button>
                </div>
                <div class="col-md-auto mb-2">
                    <button type="button" class="btn btn-outline-primary border-1 w-100"
                        :class="{ 'btn-primary text-white': isVista === '3' }" @click="selectVista('4')">
                        Revisiones del Abogado
                    </button>
                </div>
            </div>
            <General :id="idExpediente" v-if="isVista === '1'" />
            <Archivos :id="idExpediente" v-else-if="isVista === '2'" />
            <Tareas :id="idExpediente" v-else-if="isVista === '3'" />
            <Audit :idex="idExpediente"  :idabo="aboid" v-else-if="isVista === '4'" />
        </div>
    </div>
</template>

<script>
import General from '@/components/expediente_detalle/General.vue';
import Archivos from '@/components/expediente_detalle/Archivos.vue';
import Tareas from '@/components/expediente_detalle/Tareas.vue';
import Audit from '@/components/expediente_detalle/Audit.vue';
import feather from "feather-icons";
export default {
    components: {
        General, Archivos, Tareas,Audit
    },
    data() {
        return {
            isVista: '1',
            numeroExpediente: '',
            idExpediente: '',
            abogado:'',
            aboid:'',
        };
    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
        this.cargarDetallesExpediente();
    },
    created() {
        this.idExpediente = this.$route.params.id;
    },
    methods: {
        selectVista(vista) {
            this.isVista = vista;
        },
        async cargarDetallesExpediente() {
            try {
                this.$showLoadingAlert();
                const response = await this.$getData(`proceeding/${this.idExpediente}`, this);
                this.numeroExpediente = response.expediente.exp_numero;
                this.abogado = response.expediente.abogado;
                this.aboid=response.expediente.abo_id
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar detalles del expediente ', this.idExpediente);
            }
        },

        redirectActualizar() {
            this.$router.push({
                name: 'expediente/actualizacion/civil-laboral',
                params: {
                    id: this.idExpediente
                }
            });
        },

        goBack() {
            this.$router.go(-1);
        }
    },
};
</script>