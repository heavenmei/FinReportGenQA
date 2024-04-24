<template>
  <a-dropdown
    placement="bottom"
    trigger="click"
    class="tiptap-dropdown-popper"
    :popup-max-height="false"
  >
    <div @mousedown.prevent class="tiptap-dropdown-button" :class="class">
      {{ activeItem?.label }}
      <icon-down />
    </div>
    <template #content>
      <a-doption
        class="tiptap-dropdown-menu__item"
        v-for="opt in options"
        :value="opt.id"
        @click="opt.onClick"
      >
        <template #icon>
          <CreateIcon :name="opt.icon" v-if="opt.icon" />
        </template>
        <div
          class="flex justify-between items-center align-middle"
          :style="{
            width: '100px',
          }"
        >
          <div>{{ opt.label }}</div>
          <icon-check v-if="opt?.isActive?.()" />
        </div>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { IconCheck } from "@arco-design/web-vue/es/icon";
import type { DropDownOptionType } from "../../utils/type";
import CreateIcon from "~/components/CreateIcon.vue";

const props = defineProps({
  options: {
    type: Array<DropDownOptionType>,
    required: true,
  },
  class: {
    type: String,
  },
});

const activeItem = computed(
  () =>
    props.options.find(
      (option) => option.type === "option" && option.isActive?.()
    ) ?? props.options[0]
);
</script>
../../../../../utils/type
