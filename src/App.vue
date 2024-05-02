<template>
<tableCom />
</template>

<script>
import tableCom from './components/tableCom.vue'

export default {
  name: 'App',
  components: {
    tableCom,

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background: #A6B6A9;
}
.center {
  max-width: 1200px; /* Устанавливаем максимальную ширину контейнера */
  width: 100%; /* Ширина контейнера занимает всю доступную ширину */
  margin: 0 auto; /* Автоматически центрируем контейнер по горизонтали */
}
</style>
