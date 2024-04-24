<template>
  <CreateIconVNode v-if="name.match('^Icon')" :name="name" />
  <nuxt-icon v-else :name="name" />
</template>
<script setup lang="ts">
import * as icons from "@arco-design/web-vue/es/icon";
import { createVNode } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const CreateIconVNode = (params: any) => {
  const { name } = params;
  // @ts-ignore
  return createVNode(icons[name]);
};
</script>
