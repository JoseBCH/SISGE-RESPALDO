<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card shadow rounded">
                <div class="card-header">
                    <h5 class="text-secondary">Asignacion de abogado</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="form-group">
                            <label for="abogado" class="form-label">Abogado asignado al expediente en registro</label>
                            <input type="text" name="abogado" id="abogado" class="form-control border-0"
                                :value="abogado_name" readonly @input="validarAsignacion">
                            <span class="error-message" v-if="errores.asignacionAbogado">Debe asignar un abogado para
                                Finalizar el registro del expediente.</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>DNI</th>
                                        <th>Apellidos</th>
                                        <th>Nombres</th>
                                        <th v-if="validarRolUser()" class="text-center">Expedientes Asignados</th>
                                        <th class="text-center">Asignar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="abogado in abogados" :key="abogado.nat_dni">
                                        <td>
                                            <div class="circle">{{ abogado.nat_nombres.charAt(0) }}</div>
                                        </td>
                                        <td>{{ abogado.nat_dni }}</td>
                                        <td>{{ abogado.nat_apellido_paterno + ' ' + abogado.nat_apellido_materno }}</td>
                                        <td>{{ abogado.nat_nombres }}</td>
                                        <td v-if="validarRolUser()" class="text-center">{{ abogado.abo_carga_laboral }} Expediente</td>
                                        <td class="text-center">
                                            <button type="button"
                                                :class="abogado_id === abogado.abo_id ? 'btn quitar py-1 rounded' : 'btn asignar py-1 rounded'"
                                                @click="toggleAsignar(abogado)">
                                                {{ abogado_id === abogado.abo_id ? 'Quitar' : 'Asignar' }}
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="d-flex">
                            <div class="ml-auto">
                                <button class="btn btn-secondary btn-lg rounded" type="button" @click="anteriorParte"><i
                                        data-feather="arrow-left"></i> Anterior</button>
                                <button class="btn btn-primary btn-lg rounded ml-2 px-4" type="button" @click="Finalizar">
                                    Finalizar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import feather from 'feather-icons';
import { getData, postData } from '../../../utils/fetchData';

export default {
    props: {
        abo_id: "",
        abo_name: ""
    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
    },
    data() {
        return {
            abogados: [],
            abogadoAsignado: null,
            abogado_id: "",
            abogado_name: "",
            errores: {
                asignacionAbogado: false
            },
            rol: null,
            viewData: false
        };
    },
    created() {
        this.abogado_id = this.abo_id;
        this.abogado_name = this.abo_name;
        this.rol = this.$store.getters.get__user.usu_rol
        this.cargarAbogados();
        this.validarRolUser();
    },
    methods: {
        ...mapActions(['get', 'post']),
        validarRolUser(){
            if(this.rol === "ADMIN"){
                return this.viewData = true
            }
        },

        toggleAsignar(abogado) {
            if (this.abogadoAsignado === abogado) {

                this.abogadoAsignado = null;
                this.abogado_id = null;
                this.abogado_name = null;
                this.validarAsignacion();
            } else {
                this.abogadoAsignado = abogado;
                this.abogado_id = abogado.abo_id;
                this.abogado_name = abogado.nat_apellido_paterno + ' ' + abogado.nat_apellido_materno + ' ' +
                    abogado.nat_nombres;
                this.validarAsignacion();
            }

        },
        async cargarAbogados() {
            try {
                const response = await getData('lawyer', this);
                this.abogados = response.data;
            } catch (error) {
                this.$handleApiError(error, 'cargar departamentos');
            }
        },
        validarAsignacion() {
            if (this.abogado_name === "") {
                this.errores.asignacionAbogado = true;
            } else {
                this.errores.asignacionAbogado = false;
            }

            return (
                !this.errores.asignacionAbogado
            )
        },
        anteriorParte () {
            this.$emit('anteriorParte');
            this.$emit('guardaraboid', this.abogado_id);
            this.$emit('guardaraboname', this.abogado_name);
        },
        Finalizar () {
            if (this.validarAsignacion()) {
                this.$emit('guardaraboid', this.abogado_id);
                this.$emit('guardaraboname', this.abogado_name);
                this.$emit('InsertData');
            }
        },
    },

};
</script>
<style scoped>
td {
    white-space: normal !important;
    word-wrap: break-word;
}

.circle {
    width: 30px;
    height: 30px;
    background-color: #7267EF;
    color: white;
    font-weight: 600;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
}

.quitar {
    background-color: #fef1f5;
    color: #DF8FA8;
    border: 1px solid #DF8FA8;
}

.asignar {
    background-color: #EAFEF3;
    color: #2ecc71;
    border: 1px solid #2ecc71;
}

.has-error {
    border: 1px solid #EA4D4D;
}

.valid-input {
    border: 1px solid #17C666;
}

.error-message {
    color: #EA4D4D;
    font-size: 12px;
}
</style>