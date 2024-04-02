<template>
    <table class="table" aria-describedby="table-home">
        <thead>
            <tr>
                <th class="pl-4">N° de Expediente</th>
                <th>Asunto</th>
                <th>Fecha de llegada</th>
                <th>Responsable</th>
                <th>Cargo</th>
                <th>Area</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="trade in last5Trades" :key="trade.tra_id">
                <td class="pl-4">
                    <router-link :to="{ name: 'oficio/detalle', params: { id: trade.tra_id } }">
                        {{ trade.tra_number }}
                    </router-link>
                </td>
                <td>{{ trade.tra_matter }}</td>
                <td>{{ trade.tra_arrival_date }}</td>
                <td v-if="trade.assistant">{{ trade.assistant.persona.nat_nombres }}</td>
                <td v-if="trade.lawyer">{{ trade.lawyer.persona.nat_nombres }} {{ trade.lawyer.persona.nat_apellido_paterno }} {{ trade.lawyer.persona.nat_apellido_materno }}</td>
                <td>{{ trade.tra_type_person }}</td>
                <td>{{ trade.area.are_name }}</td>
                <td v-if="trade.tra_state_law === 'P'" class="pr-5">
                    <span :class="badgeClassOficio(trade.tra_state_law)">
                        Pendiente
                    </span>
                </td>
                <td v-if="trade.tra_state_law === 'F'" class="pr-5">
                    <span :class="badgeClassOficio(trade.tra_state_law)">
                        Terminado
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { badgeClassOficio } from '@/utils/utils.js';
import { getData, postData } from '@/utils/fetchData';
import '@/assets/css/fileStatus.css';
import feather from 'feather-icons';

export default {

    name: 'TablePanelAdmin',

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
                this.$showLoadingAlert();
                const result = await getData('trade', this);
                this.trades = result.data;
            } catch (error) {
                this.$handleApiError(error, 'listar trades');
            } finally {
                this.$closeLoadingAlert();
            }
        },
        badgeClassOficio,
    }
}
</script>

<style scoped></style>