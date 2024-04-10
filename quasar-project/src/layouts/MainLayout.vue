<template>
  <q-layout view="lHh Lpr lFf">

    <HeaderComponent />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import HeaderComponent from 'src/components/HeaderComponent.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    HeaderComponent
  }

})
</script>
