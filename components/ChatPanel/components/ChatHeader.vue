<template>
  <div class="chat-header flex justify-between px-4">
    <div class="d-flex align-items-center mb-1 gap-1">
      <a-tag v-if="counter.active_comp" color="#5661F6">{{
        counter.active_comp
      }}</a-tag>
      <h6
        class="mobile_width_5rem text-truncate mb-0 me-auto w-40"
        v-if="me_message.length > 0"
      >
        {{ me_message[0].question ? me_message[0].question : "新会话" }}
      </h6>
    </div>
    <div class="nav-item flex gap-2 items-center">
      <a-tooltip
        class="box-item"
        effect="dark"
        content="刷新当前聊天"
        placement="bottom"
      >
        <a
          @click="check_message(ms_active)"
          data-toggle="pill"
          href="javascript:;"
        >
          <icon-refresh class="fs-6 align-text-bottom" />
        </a>
      </a-tooltip>
      <a-tooltip
        class="box-item"
        effect="dark"
        content="刷新当前聊天"
        placement="bottom"
      >
        <a
          @click="check_message(ms_active)"
          data-toggle="pill"
          href="javascript:;"
        >
          <icon-plus class="fs-6 align-text-bottom" />
        </a>
      </a-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconRefresh } from "@arco-design/web-vue/es/icon";
import { useAiChat } from "../models";
import { useCounter } from "~/store/counter";

const counter = useCounter();
const aiChatStore = useAiChat();
const { ms_active, me_message } = storeToRefs(aiChatStore);
const { check_message } = aiChatStore;
</script>
