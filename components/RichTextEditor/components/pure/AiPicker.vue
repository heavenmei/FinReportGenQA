<template>
  <a-dropdown
    position="bl"
    trigger="click"
    class="tiptap-dropdown-popper"
    :popup-max-height="false"
  >
    <slot></slot>
    <template #content>
      <div v-for="opt in options">
        <a-dsubmenu v-if="opt.child" value="option-2-2" trigger="hover">
          <template #icon>
            <CreateIcon :name="opt.icon" v-if="opt.icon" />
          </template>
          <template #default>{{ opt.label }}</template>
          <template #content>
            <a-doption
              v-for="opt_c in opt.child"
              class="tiptap-dropdown-menu__item"
              @click="opt_c.onClick"
            >
              {{ opt_c.label }}
            </a-doption>
          </template>
        </a-dsubmenu>
        <a-doption
          v-else
          class="tiptap-dropdown-menu__item"
          :value="opt.id"
          @click="opt.onClick"
        >
          <template #icon>
            <CreateIcon :name="opt.icon" v-if="opt.icon" />
          </template>
          <div class="flex justify-between items-center align-middle">
            <div>{{ opt.label }}</div>
          </div>
        </a-doption>
      </div>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import CreateIcon from "@/components/CreateIcon.vue";

import type { DropDownOptionType } from "../../utils/type";

const props = defineProps({
  options: {
    type: Array<DropDownOptionType>,
    required: true,
  },
});
const emit = defineEmits(["click"]);
</script>
