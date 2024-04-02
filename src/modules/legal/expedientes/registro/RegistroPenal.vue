<template>
    <section class="mt-3">

        <!-- Parte 1: Datos Generales -->
        <RegistroGeneral v-if="currentPart === 1" :exp="exp" @siguienteParte="siguienteParte"
            @guardardatosgenerales="guardardatosgenerales" @guardarmultiple="guardarmultiple" :ismultiple="ismultiple" />

        <!-- Parte 2: Partes Procesales -->
        <!-- <RegistroProcesal v-if="currentPart === 2 && ismultiple == '0'" :pn="pn" :pj="pj" :dir="dir"
            :tipopersona="tipopersona" :condicion="condicion" :procesal="procesal" @guardarpn="guardarpn"
            @guardarpj="guardarpj" @guardardir="guardardir" @anteriorParte="anteriorParte" @siguienteParte="siguienteParte"
            @guardartipopersona="guardartipopersona" @guardarprocesal="guardarprocesal" @guardarcondicion="guardarcondicion"
            :ismultiple="ismultiple" /> -->
        <!-- Parte 2: Partes Procesales -->
        <RegistroProcesalMultiple v-if="currentPart === 2 && ismultiple == '1'" @anteriorParte="anteriorParte"
            @siguienteParte="siguienteParte" @guardarpersonas="guardarpersonas" :Personas="Personas" />

        <!-- Parte 3: Asignación de Abogado -->
        <RegistroAsignacion v-if="currentPart === 3" :abo_id="abo_id" :abo_name="abo_name" @guardaraboid="guardaraboid"
            @guardaraboname="guardaraboname" @InsertData="InsertData" @anteriorParte="anteriorParte" />
    </section>
</template>
  
<script>
import axios from 'axios';
import RegistroGeneral from '@/components/expedientes_registro/penal/General.vue';
import RegistroProcesal from '@/components/expedientes_registro/penal/ProcesalIndividual.vue';
import RegistroProcesalMultiple from '@/components/expedientes_registro/penal/ProcesalMultiple.vue';
import RegistroAsignacion from '@/components/expedientes_registro/penal/Asignacion.vue';

export default {
    name: 'Registro',
    components: {
        RegistroGeneral,
        RegistroProcesal,
        RegistroProcesalMultiple,
        RegistroAsignacion
    },
    data() {
        return {
            ismultiple: "1",
            currentPart: 1,
            exp: {
                carpetafiscal:"",
                exp_numero: "",
                exp_fecha_inicio: "",
                exp_pretencion: "",
                exp_materia: "",
                exp_distrito_judicial: "",
                exp_instancia: "",
                exp_especialidad: "",
                exp_monto_pretencion: "",
                exp_juzgado: "",
                exp_estado_proceso: "",
                exp_costos: "",
                exp_monto_ejecucion1: "",
                exp_monto_ejecucion2: "",
                exp_interes1: "",
                exp_interes2: "",
            },
            Personas: [],
            pn: {
                nat_dni: "",
                nat_apellido_paterno: "",
                nat_apellido_materno: "",
                nat_nombres: "",
                nat_telefono: "",
                nat_correo: ""
            },
            pj: {
                jur_ruc: "",
                jur_razon_social: "",
                jur_telefono: "",
                jur_correo: "",
                jur_rep_legal: ""
            },
            dir: {
                dir_calle_av: "",
                dis_id: "",
                pro_id: "",
                dep_id: ""
            },
            abo_id: "",
            abo_name: "",
            tipopersona: "",
            procesal: "",
            condicion: ""

        };
    },
    methods: {
        siguienteParte() {
            if (this.currentPart < 3) {
                this.currentPart++;
            }
        },
        anteriorParte() {
            if (this.currentPart > 1) {
                this.currentPart--;
            }
        },
        guardardatosgenerales(data) {
            this.exp = data;
        },
        guardarpersona(data) {
            this.personas = data;
        },
        guardarpn(data) {
            this.pn = data;
        },
        guardarpj(data) {
            this.pj = data;
        },
        guardardir(data) {
            this.dir = data;
        },
        guardartipopersona(datos) {
            this.tipopersona = datos;
        },
        guardarcondicion(datos) {
            this.condicion = datos;
        },
        guardarprocesal(datos) {
            this.procesal = datos;
        },
        guardaraboid(data) {
            this.abo_id = data;
        },
        guardaraboname(data) {
            this.abo_name = data;
        },
        guardarpersonas(data) {
            this.Personas = data;
        },
        guardarmultiple(data) {
            this.ismultiple = data;
        },

        async InsertData() {
            const url = this.$store.getters.get__url + '/proceeding/registrarcaso';
            const token = this.$store.getters.get__token;
            const dataToSend = {
                multiple: this.ismultiple,
                Personas: this.Personas,
                exp: this.exp,
                pj: this.pj,
                pn: this.pn,
                dir: this.dir,
                tipopersona: this.tipopersona,
                abo_id: this.abo_id,
                procesal: this.procesal,
                condicion: this.condicion,
                tipo: 2
            };
            axios.post(url, dataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    this.loader = false;
                    if (response.data.state == 0) {
                        this.loader = false;
                        this.limpiar();
                        this.$router.push({ path: '/expediente/busqueda' })
                    } else {
                        this.loader = false;
                        alert('Datos  no Registrados');
                    }

                })
                .catch((error) => {
                    this.loader = false;
                    console.error(error);
                });

        },
        limpiar: function () {
            this.exp.exp_numero == "";
            this.exp.exp_fecha_inicio == "";
            this.exp.exp_pretencion == "";
            this.exp.exp_materia == "";
            this.exp.exp_juzgado == "";
            this.exp.exp_monto_pretencion == "";
            this.pn.nat_dni == "";
            this.pn.nat_apellido_paterno == "";
            this.pn.nat_apellido_materno == "";
            this.pn.nat_nombres == "";
            this.pn.nat_telefono == "";
            this.pn.nat_correo == "";
            this.pj.jur_ruc == "";
            this.pj.jur_razon_social == "";
            this.pj.jur_telefono == "";
            this.pj.jur_correo == "";
            this.pj.jur_rep_legal == "";
            this.dir.dir_calle_av == "";
            this.dir.dis_id == "";
            this.dir.pro_id == "";
            this.dir.dep_id == "";
            localStorage.removeItem('formData');
            this.abo_id == "";
            this.abo_name == "";
            this.tipoPersona == "";
            this.tipoParte == "";
        }
    },
};
</script>