<script setup lang="ts">
  // 需要手动导入样式
  import 'vant/es/toast/style';
  import 'vant/es/dialog/style';
  // notify 组件
  // import 'vant/es/notify/style';

  import { createTextVNode, defineComponent } from 'vue';
  import { ConfigProvider, type ConfigProviderThemeVars, showDialog, showToast } from 'vant';
  defineOptions({
    name: 'AppProvider'
  });

  const themeVars: ConfigProviderThemeVars = {
    primaryColor: '#0AD16D'
  };

  const ContextHolder = defineComponent({
    name: 'ContextHolder',
    setup() {
      function register() {
        window.$dialog = showDialog;
        window.$message = showToast;
      }

      register();

      return () => createTextVNode();
    }
  });
</script>

<template>
  <ConfigProvider :theme-vars="themeVars" theme-vars-scope="global">
    <ContextHolder />
    <slot></slot>
  </ConfigProvider>
</template>
