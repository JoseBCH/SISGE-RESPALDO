//index.js
import Vue from 'vue';
import $ from 'jquery';


Vue.prototype.$initDataTable = async function(ref) {
    if (!this.$refs[ref]) {
      console.error(`Ref ${ref} not found.`);
      return;
    }
  
    this.$destroyDataTable();
  
    await this.$nextTick();
  
    this.dataTable = $(this.$refs[ref]).DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
      },
    });
  };
  

  Vue.prototype.$destroyDataTable = function () {
    this.dataTable?.destroy();
    this.dataTable = null;
};
