<template>
  <a-dropdown
    placement="bottom"
    trigger="click"
    class="tiptap-dropdown-popper"
    :popup-max-height="false"
    @select="selectFont"
  >
    <div @mousedown.prevent class="tiptap-dropdown-button" :class="class">
      {{ currentFontLabel }}
      <icon-down :size="8" />
    </div>
    <template #content>
      <a-doption
        class="tiptap-dropdown-menu__item"
        v-for="opt in FONT_FAMILIES"
        :value="opt.value"
      >
        <div
          class="flex justify-between items-center align-middle"
          :style="{
            width: '120px',
            fontFamily: opt.value,
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

const FONT_FAMILY_GROUPS = [
  {
    label: "Sans Serif",
    options: [
      { label: "Inter", value: "" },
      { label: "Arial", value: "Arial" },
      { label: "Helvetica", value: "Helvetica" },
    ],
  },
  {
    label: "Serif",
    options: [
      { label: "Times New Roman", value: "Times" },
      { label: "Garamond", value: "Garamond" },
      { label: "Georgia", value: "Georgia" },
    ],
  },
  {
    label: "Monospace",
    options: [
      { label: "Courier", value: "Courier" },
      { label: "Courier New", value: "Courier New" },
    ],
  },
];

const FONT_FAMILIES = FONT_FAMILY_GROUPS.flatMap((group) => [
  group.options,
]).flat();

const currentValue = computed(() =>
  FONT_FAMILIES.find((size) => size.value === props.value)
);
const currentFontLabel = computed(
  () => currentValue.value?.label?.split(" ")[0] || "Inter"
);

const selectFont = (value: any) => {
  emit("onChange", value);
};
</script>
