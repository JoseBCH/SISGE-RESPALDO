<template>
    <div>
        <div v-for="alerta in alertas" :key="alerta.id" class="ale" v-show="alerta.alertaVisible"
            :class="getColorClass(alerta.ale_porcentaje)">
            <span class="ale-icon">
                <img src="@/assets/images/alert-triangle-white-32.svg" alt="">
            </span>
            <div class="ale-body">
                <span class="ale-descripcion">{{ alerta.ale_descripcion }}</span>
                <span class="ale-fecha">{{ alerta.ale_fecha_vencimiento }}</span>
            </div>
        </div>
        <div v-for="audiencia in audiencias" :key="audiencia.id" class="aud">
            <span class="aud-icon">
                <img src="@/assets/images/alert-triangle-white-32.svg" alt="">
            </span>
            <div class="aud-body">
                <span class="aud-descripcion">{{ audiencia.au_detalles }}</span>
                <span class="aud-fecha">{{ audiencia.au_fecha }}</span>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';
import feather from 'feather-icons';

export default {
    name: 'notificationAlertas',
    data() {
        return {
            expedientesAsignados: [],
            alertas: [],
            audiencias: [],
            alertasMostradasHoy: 0,
        };
    },
    computed: {
        ...mapGetters(['get__user', 'get__aboid', 'get__url', 'get__token']),
        userRole() {
            return this.get__user.usu_rol;
        },
        userAbogado() {
            return this.get__aboid;
        },
    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
    },
    methods: {
        ...mapActions(['post']),

        async listExpedientes() {
            try {
                const response = await this.post({
                    url: `${this.get__url}/lawyer/expedientes`,
                    token: this.get__token,
                    params: { abo_id: this.userAbogado },
                });
                this.expedientesAsignados = response.data;
                console.log('expedientes_asignados', response);
            } catch (error) {
                console.error(error);
            }
        },

        mostrarSiguienteAlerta() {
            if (this.alertas.length > 0) {
                const primeraAlerta = this.alertas[0];
                const frecuenciaMostrar = this.getFrecuenciaMostrar(primeraAlerta.ale_porcentaje);

                if (frecuenciaMostrar > 0) {
                    this.$set(primeraAlerta, 'alertaVisible', true);

                    setTimeout(() => {
                        this.$set(primeraAlerta, 'alertaVisible', false);
                        this.alertas.shift();
                        this.alertasMostradasHoy++;

                        if (this.alertasMostradasHoy < frecuenciaMostrar) {
                            setTimeout(() => {
                                this.mostrarSiguienteAlerta();
                            }, 250);
                        } else {
                            this.alertasMostradasHoy = 0;
                            setTimeout(() => {
                                this.mostrarSiguienteAlerta();
                            }, 250);
                        }
                    }, 3000);
                } else {
                    this.alertas.shift();
                    this.mostrarSiguienteAlerta();
                }
            }
        },

        getFrecuenciaMostrar(alePorcentaje) {
            if (alePorcentaje >= 0.63 && alePorcentaje <= 1) {
                return 1;
            } else if (alePorcentaje >= 0.33 && alePorcentaje < 0.63) {
                return 3;
            } else if (alePorcentaje < 0.33) {
                return 5;
            } else {
                return 0;
            }
        },

        getColorClass(alePorcentaje) {
            if (alePorcentaje > 0.67 && alePorcentaje <= 1) {
                return 'color-azul';
            } else if (alePorcentaje > 0.33 && alePorcentaje <= 0.67) {
                return 'color-naranja';
            } else if (alePorcentaje <= 0.33) {
                return 'color-rojo';
            } else {
                return '';
            }
        },

        async listAlertas() {
            try {
                const response = await this.post({
                    url: `${this.get__url}/lawyer/alertas`,
                    token: this.get__token,
                    params: { abo_id: this.userAbogado },
                });

                if (response.state === 0 && response.data) {
                    this.alertas = response.data;
                    setTimeout(() => {
                        this.mostrarSiguienteAlerta();
                    }, 3000);
                    console.log('alertas', response);
                    console.log(this.userAbogado);
                } else {
                    console.error('Error en la respuesta del servidor:', response);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        },

        async listAudiencias() {
            try {
                const response = await this.post({
                    url: `${this.get__url}/lawyer/audiencias`,
                    token: this.get__token,
                    params: { abo_id: this.userAbogado },
                });
                this.audiencias = response.data;
                console.log('audiencias', response);
            } catch (error) {
                console.error(error);
            }
        },
    },

    created() {
        this.listExpedientes();
        this.listAlertas();
    },
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
    top: 5rem;
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
  