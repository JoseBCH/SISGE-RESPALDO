<template>
    <div class="wrapper">
        <!-- Preloader -->
        <PreLoader />
        <!-- Navbar -->
        <Navbar />
        <!-- Main Sidebar Container -->
        <Sidebar />
        <!-- Content Wrapper. Contains page content -->
        <router-view></router-view>
        <!-- /.content-wrapper -->

        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
        </aside>
        <!-- /.control-sidebar -->

        <!-- Main Footer -->
        <footer class="main-footer">
            <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
            All rights reserved.
            <div class="float-right d-none d-sm-inline-block">
                <b>Version</b> 3.2.0
            </div>
        </footer>
    </div>
</template>
<script>
import PreLoader from './PreLoader.vue';
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';

export default {
    name: 'dashboard',
    components: {
        PreLoader, Navbar, Sidebar
    },
}
</script>