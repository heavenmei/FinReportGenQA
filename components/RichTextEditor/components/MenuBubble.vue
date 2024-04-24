<template>
  <bubble-menu :editor="editor" :should-show="states.shouldShowBubble">
    <!-- v-show="visible" -->
    <div class="tiptap-bubble-menu">
      <div
        @click="onAiClick"
        class="tiptap-dropdown-button font-semibold"
        :style="{ color: 'rgb(168 85 247)' }"
      >
        <nuxt-icon name="robot" />
        AI 提问
      </div>

      <CmdButton
        tooltip="粗体"
        :active="states.isBold"
        @click="commands.onBold"
      >
        <nuxt-icon name="bold" />
      </CmdButton>
      <CmdButton
        tooltip="斜体"
        :active="states.isItalic"
        @click="commands.onItalic"
      >
        <nuxt-icon name="italic" />
      </CmdButton>
      <CmdButton
        tooltip="下划线"
        :active="states.isUnderline"
        @click="commands.onUnderline"
      >
        <nuxt-icon name="underline" />
      </CmdButton>
      <CmdButton
        tooltip="删除线"
        :active="states.isStrike"
        @click="commands.onStrike"
      >
        <nuxt-icon name="strike" />
      </CmdButton>
      <CmdButton
        tooltip="代码"
        :active="states.isCode"
        @click="commands.onCode"
      >
        <nuxt-icon name="code" />
      </CmdButton>

      <CmdButton
        tooltip="无序列表"
        :active="states.isBulletList"
        @click="commands.onBulletList"
      >
        <nuxt-icon name="list-ul" />
      </CmdButton>
      <CmdButton
        tooltip="有序列表"
        :active="states.isOrderList"
        @click="commands.onOrderedList"
      >
        <nuxt-icon name="list-ol" />
      </CmdButton>
    </div>
  </bubble-menu>
</template>

<script setup lang="ts">
import { Editor, BubbleMenu } from "@tiptap/vue-3";
import CmdButton from "./pure/CmdButton.vue";
import { useTextmenuCommands } from "../hooks/useTextmenuCommands";
import { useTextmenuStates } from "../hooks/useTextmenuStates";
import { useAiChat } from "../../ChatPanel/models";

const aiChatStore = useAiChat();
const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
});

const commands = computed(() => useTextmenuCommands(props.editor));
const states = computed(() => useTextmenuStates(props.editor));

const onAiClick = () => {
  const se = props.editor.storage.selectionDoc;
  aiChatStore.send_form.quote = se;
  console.log(se);
};
</script>
