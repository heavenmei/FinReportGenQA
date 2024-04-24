<template>
  <div class="main w-full h-screen flex">
    <Navigation />

    <div class="write_wrap flex-1">
      <RichTextEditor
        ref="editorRef"
        :content="defaultContent"
        :editorLoading="editorLoading"
      />
    </div>
    <div class="chat-wrap">
      <ChatPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RichTextEditor from "~/components/RichTextEditor/index.vue";
import ChatPanel from "~/components/ChatPanel/index.vue";
import { DefaultContent, DefaultMes } from "./constant";
import { useCounter } from "~/store/counter";
import { useAiChat } from "~/components/ChatPanel/models";

const counter = useCounter();
const aiChatStore = useAiChat();
const editorRef = ref();
const editorLoading = ref(false);
const defaultContent = ref();

watch(counter, () => {
  const key = Object.keys(DefaultContent).find(
    (item) => item === counter.active_comp
  );
  editorLoading.value = true;
  aiChatStore.loadins = true;
  setTimeout(() => {
    editorRef.value.setContent(key ? DefaultContent[key] : "");
    defaultContent.value = key ? DefaultContent[key] : "";
    editorLoading.value = false;
    aiChatStore.loadins = false;
    aiChatStore.me_message = DefaultMes;
  }, 1500);
});
</script>

<style>
.main {
  background-color: #f3f7fb;
}

.write_wrap {
  margin-bottom: 20px;
}

.chat-wrap {
  width: 35%;
  padding-left: 20px;
  /* background: radial-gradient(
      circle at 12% 55%,
      rgba(33, 150, 243, 0.15),
      hsla(0, 0%, 100%, 0) 25%
    ),
    radial-gradient(
      circle at 85% 33%,
      rgba(108, 99, 255, 0.175),
      hsla(0, 0%, 100%, 0) 25%
    ); */
}
</style>
