<template>
    <div>
        <div class="row pt-2 pb-3">
            <div class="col-md-12">
                <h5 v-if="userRole === 'ASISTENTE'">Bienvenido! Asistente</h5>
                <h5 v-if="userRole === 'ABOGADO'">Bienvenido! Abogado</h5>
                <p>A continuacion se muestra un resumen de sus actividades.</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow">
                    <div class="card-body mr-4">
                        <div class="row">
                            <div class="d-flex">
                                <span class="pc-micon text-primary px-2">
                                    <i data-feather="layers"></i>
                                </span>
                                <p class="text-dark">Tiene <span class="fw-bold">{{ trades.length }}</span>
                                    oficios asignados</p>
                                <a href="#/oficio/asignados" class="px-2 ml-auto">
                                    Ver mas detalles <i data-feather="arrow-right-circle" class="arrow-icon"></i>
                                </a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="d-flex">
                                <span class="pc-micon text-primary px-2">
                                    <i data-feather="bell"></i>
                                </span>
                                <p class="text-dark">Tiene <span class="fw-bold">DATA</span> oficios
                                    con respuesta.</p>
                                <a href="#" class="px-2 ml-auto">
                                    Ver mas detalles <i data-feather="arrow-right-circle" class="arrow-icon"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import feather from 'feather-icons';

export default {
    name: 'CardPanelUser',

    created() {
        this.listTrades();
    },

    data() {
        return {
            trades: [],
        };
    },

    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
    },

    computed: {
        userName() {
            return this.$store.getters.get__user.name;
        },
        userRole() {
            return this.$store.getters.get__user.usu_rol;
        },
        userAbogado() {
            return this.$store.getters.get__aboid;
        }
    },

    methods: {

        async listTrades() {

            try {
                var result;
                var formData;
                if (this.$store.getters.get__user.usu_rol === 'ABOGADO') {
                    formData = {
                        abo_id: this.$store.getters.get__user.abo_id,
                    }
                    console.log('entro por abogado');
                    result = await this.$postData('lawyer/listTrades', this, formData);
                }

                if (this.$store.getters.get__user.usu_rol === 'ASISTENTE') {
                    formData = {
                        ass_id: this.$store.getters.get__user.ass_id,
                    }
                    console.log('Usuario ASISTENTE:', this.$store.getters.get__user);
                    console.log('entro por asistente');
                    result = await this.$postData('assistant/listTrades', this, formData);
                }

                this.trades = result.data;

            } catch (error) {
                this.$handleApiError(error, 'listar trades');
            }
        },
    }

};
</script>

<style scoped>
a {
    transition: margin-left 0.3s ease;
}

a:hover {
    color: #6610f2;
}

.ale,
.aud {
    position: absolute;
    top: 10px;
    right: 30px;
    width: 25em !important;
    word-wrap: break-word;
    background-color: #7267EF;
    color: #fff;
    display: flex;
    padding: 16px;
    border-radius: 8px;
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}


.ale-icon,
.aud-icon {
    margin-top: auto;
    margin-bottom: auto;
}

.ale-body,
.aud-body {
    display: flex;
    flex-direction: column;
    font-size: 12px;
}

.ale-descripcion,
.aud-descripcion {
    padding-bottom: 5px;
    margin-left: 10px;
    font-weight: 700;
}

.ale-fecha,
.aud-fecha {
    margin-left: 10px;
}

.color-azul {
    background-color: #17C666;
}

.color-naranja {
    background-color: #fd7e14;
}

.color-rojo {
    background-color: #EA4D4D;
}
</style>