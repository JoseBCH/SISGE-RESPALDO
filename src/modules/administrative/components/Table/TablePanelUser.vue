<template>
    <div>
        <table class="table" aria-describedby="table-home">
            <thead>
                <tr>
                    <th class="pl-4">N° de Oficio</th>
                    <th>Asunto</th>
                    <th>Fecha de llegada</th>
                    <th>Area</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody v-if="trades.length != 0">
                <tr v-for="trade in last5Trades" :key="trade.tra_id">
                    <td class="pl-4">
                        <router-link to="#">
                            {{ trade.tra_number }}
                        </router-link>
                    </td>
                    <td>{{ trade.tra_matter }}</td>
                    <td>{{ trade.tra_arrival_date }}</td>
                    <td>{{ trade.area.are_name }}</td>
                    <td class="pr-5">
                        Hola
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="trades.length === 0">
            <p class="text-center">No se han asignado oficios por ahora</p>
        </div>
    </div>
</template>

<script>
import { badgeClass } from '@/utils/utils.js';
import { getData, postData } from '@/utils/fetchData';
import '@/assets/css/fileStatus.css';
import feather from 'feather-icons';

export default {

    name: 'TablePanelUser',

    created() {
        this.listTrades();
    },

    data() {
        return {
            trades: [],
        };
    },

    computed: {
        last5Trades() {
            return this.trades.slice(-5);
        },
    },

    mounted() {
        this.$nextTick(() => {
            feather.replace();
        });
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
            } finally{
                this.$closeLoadingAlert();
            }
        },
    }
}
</script>

<style scoped></style>