export default {
    methods: {
        async initDataTable() {
            this.destroyDataTable();
            await this.$nextTick();
            this.dataTable = $(this.$refs.myDataTable).DataTable({
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
                },
            });
        },

        destroyDataTable() {
            this.dataTable && this.dataTable.destroy() && (this.dataTable = null);
        },
    },
    beforeDestroy() {
        this.destroyDataTable();
    },
};