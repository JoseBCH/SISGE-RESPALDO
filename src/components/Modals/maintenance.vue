<template>
    <div v-if="showModal" class="modal" @click="cerrarModal">
        <div class="modal-content card border-0" @click.stop>
            <div class="card-header">
                <h5 class="text-center">{{ titulo }}</h5>
            </div>
            <div class="card-body mb-0 pb-0">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">Nombre</label>
                            <input class="form-control" v-model="datos.nombre" @input="validarNombre"
                                :class="{ 'has-error': errores.nombre }">
                            <span class="error-message" v-if="errores.nombre">Ingrese un nombre de materia.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer border-0 mt-0 pt-0">
                <div class="d-flex justify-content-end">
                    <button class="btn btn-secondary btn-lg px-4 mx-2 rounded" @click="cerrarModal">Cerrar</button>
                    <button class="btn btn-primary btn-lg px-4 rounded" @click="guardar">
                        {{ accionBoton }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        showModal: Boolean,
        titulo: String,
        datos: Object,
        errores: Object,
        cerrarModal: Function,
        validarNombre: Function,
        guardar: Function,
        accionBoton: String,
    },
};
</script>
  
<style scoped>
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
    width: 500px;
    height: auto !important;
    border-radius: 8px !important;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    position: relative !important;
}
</style>
  