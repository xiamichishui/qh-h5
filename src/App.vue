<template>
  <AppProvider>
    <GlobalLoading :show="loading"></GlobalLoading>
    <RouterView />
  </AppProvider>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AppProvider from './app-provider.vue';
  import GlobalLoading from '@/components/GlobalLoading.vue';
  import { globalLoading } from '@/hooks/use-loading';
  const { loading } = globalLoading;
</script>

<style scoped lang="less"></style>
