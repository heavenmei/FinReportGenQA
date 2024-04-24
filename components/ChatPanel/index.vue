<template>
  <a-spin :loading="aiChatStore.loadins" tip="记录加载loading..">
    <div
      class="chat-body"
      :style="
        chat_bg_cookie
          ? {
              background: 'url(' + chat_bg_cookie + ') no-repeat',
              'background-size': 'cover',
            }
          : ''
      "
    >
      <ChatHeader />
      <ChatContent @all_message="handelAllMessage" @submitForm="handleSubmit" />
      <ChatFooter ref="chatFooterRef" @all_message="handelAllMessage" />
    </div>
  </a-spin>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MessageList from "./components/MessageList.vue";
import ChatHeader from "./components/ChatHeader.vue";
import ChatContent from "./components/ChatContent.vue";
import ChatFooter from "./components/ChatFooter.vue";
import { useAiChat } from "./models";
const aiChatStore = useAiChat();
const chat_bg_cookie = useCookie("chat_bg");

const chatFooterRef = ref();
const messageListRef = ref();

const handelAllMessage = () => {
  messageListRef?.value?.all_message();
};
const handleSubmit = () => {
  chatFooterRef?.value?.submitForm();
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
