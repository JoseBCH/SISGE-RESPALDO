<template>
  <div id="loading-spinner" class="loading-spinner">
    <div class="spinner"></div>
    <!-- <div class="loading-message">Cargando...</div> -->
  </div>
</template>

<script>
export default {
  name: "c-loading-spinner"
};
</script>

<style>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  /* background-color: #fff; */
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.356);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

.loading-message {
  margin-top: 10px;
  font-size: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
