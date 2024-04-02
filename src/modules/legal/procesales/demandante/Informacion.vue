<template>
    <section class="pc-container pb-4">
        <div class="pcoded-content pt-4">
            <div class="row mb-4">
                <h5 class="">
                    <button class="btn btn-sm mr-2 btn-secondary" @click="goBack">
                        <i data-feather="arrow-left"></i>
                    </button><span class="text-primary">Informacion</span> | <span class="text-secondary"> {{
                        personaNombreCompleto() }}</span>
                </h5>
            </div>
            <div class="row">
                <!-- <div class="col-sm-6 col-md-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="bg-primary rounded-pill d-flex justify-content-center align-items-center text-white"
                                style="height: 215px; font-size: 80px; font-weight: 600;">{{ avatar() }}</div>
                        </div>
                    </div>
                </div> -->
                <div class="col-sm-12 col-md-12">
                    <div class="card">
                        <div class="card-body px-5">
                            <div class="row py-2 border-bottom">
                                <div class="col-md-3 pl-1">
                                    <p class="text-dark">Nombre completo</p>
                                </div>
                                <div class="col-md-9">
                                    <p class="text-secondary">{{ personaNombreCompleto() }}</p>
                                </div>
                            </div>
                            <div class="row py-2 border-bottom">
                                <div class="col-md-3 pl-1">
                                    <p class="text-dark">Correo electronico</p>
                                </div>
                                <div class="col-md-9">
                                    <p class="text-secondary">{{ correo() }}</p>
                                </div>
                            </div>
                            <div class="row py-2 border-bottom">
                                <div class="col-md-3 pl-1">
                                    <p class="text-dark">Telefono</p>
                                </div>
                                <div class="col-md-9">
                                    <p class="text-secondary">{{ telefono() }}</p>
                                </div>
                            </div>
                            <div class="row py-2 border-bottom">
                                <div class="col-md-3 pl-1">
                                    <p class="text-dark">Direccion</p>
                                </div>
                                <div class="col-md-9">
                                    <p class="text-secondary">{{ direccionData() }}</p>
                                </div>
                            </div>
                            <div class="row py-2 border-bottom">
                                <div class="col-md-3 pl-1">
                                    <p class="text-dark">Tipo de Persona</p>
                                </div>
                                <div class="col-md-9">
                                    <p class="text-secondary">{{ persona.tipo_persona }}</p>
                                </div>
                            </div>
                            <div class="row py-2 border-bottom">
                                <div class="col-md-3 pl-1">
                                    <p class="text-dark">Tipo Procesal</p>
                                </div>
                                <div class="col-md-9">
                                    <p class="text-secondary">{{ persona.tipo_procesal }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-header">
                            <h5>Expedientes asociados</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover m-b-0" id="table" ref="dataTable"
                                    aria-describedby="table-expedientes">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>N° de Expediente</th>
                                            <th>Fecha de Inicio</th>
                                            <th>Tipo</th>
                                            <th>Materia/Delito</th>
                                            <th>Pretensión</th>
                                            <th>Fecha de Registro</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(expediente, index) in expedientes" :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td>
                                                <a href="javascript:void(0)" class="btn-link"
                                                    @click="redirectDetalle(expediente.exp_id)">
                                                    {{ expediente.exp_numero }}
                                                </a>
                                            </td>
                                            <td>{{ $formatDate(expediente.exp_fecha_inicio)}}</td>
                                            <td>{{ expediente.tipo}}</td>
                                            <td>{{ expediente.materia }}</td>
                                            <td>{{ expediente.pretension }}</td>
                                            <td>{{ formatFecha(expediente.creacion) }}</td>
                                            <td>
                                                <span :class="badgeClass(expediente.estado)">
                                                    {{ expediente.estado }}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        </div>
    </section>
</template>

<script>

import feather from 'feather-icons';
import { badgeClass } from '@/utils/utils.js';

export default {
    name: 'expedienteAll',
    created() {
        this.idPersona = this.$route.params.id;
    },
    data() {
        return {
            persona: {},
            direccion: {},
            idPersona: null,
            historiales: [],
            expedientes: []
        };
    },

    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
        this.cargarDetallesPersonas();
        this.cargarHistorial();
    },

    methods: {
        badgeClass,
        redirectDetalle(id) {
            this.$router.push({ name: 'expediente/detalle', params: { id } });
        },
        formatFecha(fechaISO) {
            const fecha = new Date(fechaISO);
            const opcionesFormato = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            return fecha.toLocaleDateString('es-ES', opcionesFormato);
        },
        async cargarDetallesPersonas() {
            try {
                this.$showLoadingAlert();
                const formData = {
                    per_id: this.idPersona
                }
                const response = await this.$postData('personas/detallePersona', this, formData);
                this.persona = response.data.persona;
                this.direccion = response.data.direccion;
                this.expedientes = response.data.expedientes
                this.$closeLoadingAlert();
            } catch (error) {
                this.$handleApiError(error, 'cargar detalles demandante');
            }
        },
        async cargarHistorial() {
            try {
                const formData = {
                    per_id: this.idPersona
                }
                const response = await this.$postData('history/showPerson', this, formData);
                this.historiales = response.data;
            } catch (error) {
                this.$handleApiError(error, 'cargar hisorial del demandante');
            }
        },

        personaNombreCompleto() {
            if (this.persona.tipo_persona === 'Natural') {
                return `${this.persona.nat_nombres} ${this.persona.nat_apellido_paterno} ${this.persona.nat_apellido_materno}`;
            } else {
                return this.persona.jur_razon_social;
            }

        },

        correo() {
            let correo;

            if (this.persona.tipo_persona === 'Natural') {
                correo = this.persona.nat_correo;
            } else {
                correo = this.persona.jur_correo;
            }

            // Expresión regular para validar el formato de correo electrónico
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (correo && regexCorreo.test(correo)) {
                return correo;
            } else {
                return '-----';
            }
        },

        telefono() {
            if (this.persona.tipo_persona === 'Natural') {
                return this.persona.nat_telefono === '0' || this.persona.nat_telefono === "" ? '-----' : this.persona.nat_telefono;
            } else {
                return this.persona.jur_telefono;
            }
        },

        direccionData() {
            return `${this.direccion.dep_nombre}, ${this.direccion.pro_nombre}, ${this.direccion.dis_nombre}, ${this.direccion.dir_calle_av}`;
        },

        avatar() {
            const nombres = this.persona.nat_nombres || '';
            const apellidoPaterno = this.persona.nat_apellido_paterno || '';

            const primeraLetraNombres = nombres.charAt(0);
            const primeraLetraApellidoPaterno = apellidoPaterno.charAt(0);

            return `${primeraLetraNombres}${primeraLetraApellidoPaterno}`;
        },


        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
@import '@/assets/css/fileStatus.css';
.info {
    border-left: 7.5px solid #7267EF;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #7267EF;
}

.avatar-title {
    justify-content: center;
    align-items: center;
    color: #f7f7f7;
    font-size: 48px;
    font-weight: 500;
}

.input-group-text {
    background: none !important;
    border: none !important;
    padding: 0px;
}

.form-control {
    background: none !important;
    border: none !important;
    padding-top: 10px;
    padding-bottom: 5px;
}

p {
    margin: 0;
    padding: 2.5px 0;
    font-size: 15px;
    line-height: 25px;
    color: black;
}

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
