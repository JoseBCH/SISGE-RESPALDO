<template>
    <section class="pc-container">
        <div class="pcoded-content pb-4">
            <div class="row">
                <div class="col-md-4">
                    <div class="card shadow p-5 mx-auto text-center left">
                        <div class="avatar mx-auto">
                            <span class="avatar-title">foto</span>
                        </div>
                        <p class="fw-bold pt-4">Ana Maria</p>
                        <p>ana@gmail.com</p>
                        <p>+51 980404074</p>
                        <p>address</p>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card shadow info">
                        <div class="card-body">
                            <!-- <p class="fs-6 text-center" v-if="loading">Cargando...</p> -->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Nombres</label>
                                        <input class="form-control" value="usuario">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input class="form-control" value="correo@gmail.com">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Apellido paterno</label>
                                        <input class="form-control" value="apellido paterno">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Apellido materno</label>
                                        <input class="form-control" value="apellido materno">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Direccion</label>
                                        <input class="form-control" value="direccion">
                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Distrito</label>
                                        <input class="form-control" value="distrito">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Provincia</label>
                                        <input class="form-control" value="provincia">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Departamento</label>
                                        <input class="form-control" value="departamento">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card shadow rounded">
                        <div class="card-header pb-0 border-0">
                            <h5>Cambiar contraseña</h5>
                        </div>
                        <div class="card-body pb-0">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Contraseña actual</label>
                                        <input class="form-control" value="contraseña">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Nueva contraseña</label>
                                        <input class="form-control" value="contraseña">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Confirmar nueva contraseña</label>
                                        <input class="form-control" value="contraseña">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer border-0 d-flex">
                            <button class="btn btn-primary btn-lg px-3 ml-auto">Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>

import { mapActions } from 'vuex';
import feather from 'feather-icons';

export default {

    // props: ['doc'],
    name: 'expedienteAll',
    created() {
        // this.cargar();
    },
    data() {
        return {
            // informacion: [],
            nombreCompleto: "Ana Maria",
            provinciaDistrito: "Direccion",
            loading: true,
        };
    },
    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
    },
    methods: {
        ...mapActions(['get', 'post']),
        // cargar() {
        //     this.get({
        //         url: this.$store.getters.get__url + '/demandante/detalledemandante/' + this.doc,
        //         token: this.$store.getters.get__token,
        //     })
        //         .then((response) => {
        //             this.informacion = response.data;
        //             if (response.data.tipo_persona === 'natural') {
        //                 this.nombreCompleto = `${response.data.nat_apellido_paterno} ${response.data.nat_apellido_materno} ${response.data.nat_nombres}`;
        //                 this.provinciaDistrito = `${response.data.pro_nombre} / ${response.data.dis_nombre}`;

        //             } else {
        //                 this.nombreCompleto = response.data.jur_razon_social;
        //             }
        //             this.loading = false;
        //         })
        //         .catch((errors) => { });
        // },
    }
}
</script>
<style scoped>
.info {
    border-top: 7.5px solid #7267EF;
}

.left {
    height: 403px;
    border-top: 7.5px solid #7267EF;
}

.avatar {
    width: 150px;
    height: 150px;
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

/* .form-control {
    background: none !important;
    border: none !important;
    padding-top: 10px;
    padding-bottom: 5px;
} */

p {
    margin: 0;
    padding: 2.5px 0;
    font-size: 15px;
    line-height: 25px;
    color: black;
}
</style>
