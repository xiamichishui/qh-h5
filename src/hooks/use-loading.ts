import { ref } from 'vue';
/**
 * Loading
 */
export function useLoading(initValue = false) {
  const loading = ref(initValue);
  function startLoading() {
    loading.value = true;
  }
  function endLoading() {
    loading.value = false;
  }
  return {
    loading,
    startLoading,
    endLoading
  };
}

export const globalLoading = useLoading(false);
