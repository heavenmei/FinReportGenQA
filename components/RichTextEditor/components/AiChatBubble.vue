<template>
  <bubble-menu
    :editor="editor"
    :tippyOptions="{
      placement: 'bottom-start',
    }"
    pluginKey="ai-bubble"
    :shouldShow="() => visible"
  >
    <div class="tiptap-aibubble-panel">
      <a-textarea
        v-model:model-value="selectionText"
        placeholder="Please enter something"
        auto-size
        disabled
      />
      <div class="flex gap-2" style="height: 30px">
        <a-input-search
          size="mini"
          v-model="messageInput"
          placeholder="Please enter something"
          search-button
          :button-props="{ type: 'text' }"
          :loading="send_loading"
          @search="submitForm"
          @keydown.enter.native.prevent="submitForm()"
        >
          <template #button-icon>
            <icon-send class="text-lg" />
          </template>
        </a-input-search>
      </div>
    </div>
  </bubble-menu>
</template>

<script setup lang="ts">
import { Editor, BubbleMenu } from "@tiptap/vue-3";
import { AiModalTypeEnum, AiTypeEnum } from "../extensions/AiWriter";

const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
});
const messageInput = ref();
const send_loading = ref(false);
const visible = computed(
  () => props.editor.storage.aiWriter.ai_modal_visible === AiModalTypeEnum.CHAT
);
const selectionText = computed(() => props.editor.storage.selectionDoc);

// 关闭则清空输入
watch(visible, () => {
  if (!visible.value) messageInput.value = undefined;
});

// api 发送消息
const submitForm = async () => {
  props.editor
    .chain()
    .focus()
    .setAi(AiTypeEnum.DocChat, AiModalTypeEnum.PANEL, true, {
      messageInput: messageInput.value,
    })
    .run();
};
</script>
