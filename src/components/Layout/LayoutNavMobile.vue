<template>
    <div class="pc-mob-header pc-header">
        <div class="pcm-logo">
            <img src="@/assets/images/logo-unprg.png" alt="" class="img-fluid">
        </div>
        <div class="d-flex">
            <a class="btn btn-sm btn-outline-dark border-1 rounded mx-1" @click="toggleSidebar">
                <div class="hamburger hamburger--arrowturn">
                    <div class="hamburger-box">
                        <div class="hamburger-inner"></div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>
<script>
import feather from 'feather-icons';
export default {
    name: 'LayoutNavMobile',
    mounted(){
        this.$nextTick(() => {
            feather.replace();
        });
    },
    methods: {
    toggleSidebar() {
        console.log(this.$root.$emit);
        this.$root.$emit('toggle-sidebar');
    },
  },
}
</script>