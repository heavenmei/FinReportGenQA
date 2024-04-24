<template>
  <a-tooltip :content="tooltip" :show-after="350" placement="top">
    <div :class="commandButtonClass" @mousedown.prevent @click="emit('click')">
      <slot></slot>
    </div>
  </a-tooltip>
</template>

<script lang="ts" setup>
const props = defineProps({
  tooltip: {
    type: String,
    required: true,
  },
  class: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
  click: {
    type: Function,
    default: () => {},
  },
});
const emit = defineEmits(["click"]);

const commandButtonClass = computed(() => {
  let cls = "tiptap-command-button";
  if (props.active) {
    cls += " tiptap-command-button--active";
  }
  if (props.class) {
    cls += ` ${props.class}`;
  }
  return cls;
});
</script>
