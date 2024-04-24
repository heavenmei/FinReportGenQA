<template>
  <a-dropdown
    placement="bottom"
    trigger="click"
    class="tiptap-dropdown-popper"
    :popup-max-height="false"
    @select="selectSize"
  >
    <div @mousedown.prevent class="tiptap-dropdown-button" :class="class">
      {{ currentSizeLabel }}
      <icon-down />
    </div>
    <template #content>
      <a-doption
        class="tiptap-dropdown-menu__item"
        v-for="opt in FONT_SIZES"
        :value="opt.value"
      >
        <div
          class="flex justify-between items-center align-middle"
          :style="{
            width: '120px',
            fontSize: opt.value,
          }"
        >
          <div>{{ opt.label }}</div>
          <icon-check v-if="opt?.value === currentValue?.value" />
        </div>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { IconCheck } from "@arco-design/web-vue/es/icon";

const props = defineProps({
  value: { type: String },
  class: {
    type: String,
  },
});
const emit = defineEmits(["onChange"]);

const FONT_SIZES = [
  { label: "12pt", value: "12px" },
  { label: "14pt", value: "14px" },
  { label: "16pt", value: "" },
  { label: "18pt", value: "18px" },
  { label: "24pt", value: "24px" },
];

const currentValue = computed(() =>
  FONT_SIZES.find((size) => size.value === props.value)
);
const currentSizeLabel = computed(
  () => currentValue.value?.label?.split(" ")[0] || "Medium"
);

const selectSize = (value: any) => {
  emit("onChange", value);
};
</script>
