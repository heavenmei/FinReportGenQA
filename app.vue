<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator
        :throttle="0"
        :color="'radial-gradient(300px at 27.7% -15.7%, rgb(18, 246, 246) 0%, rgb(7, 103,233) 73.9 %) '"
      />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
</script>
