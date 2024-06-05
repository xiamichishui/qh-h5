import '@/assets/main.less';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { httpSetup } from '@/util/http-interceptor';
import { formatDate } from '@/util/utils';
import { Notify } from 'vant';

const app = createApp(App);

app.use(router);
app.use(Notify);

// @ts-ignore
Date.prototype.toJSON = function () {
  return formatDate(this, 'yyyy-MM-dd HH:mm:ss');
};

httpSetup();

app.mount('#app');
