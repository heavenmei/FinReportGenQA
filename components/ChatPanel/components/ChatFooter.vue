<template>
  <div class="chat-footer">
    <a-form :model="send_form" ref="formRef">
      <a-form-item
        :hide-label="true"
        :hide-asterisk="true"
        field="quote"
        validate-trigger="input"
        class="mb-0 relative"
      >
        <div class="pl-4 mb-1" style="color: #787878">
          {{ send_form.quote }}
        </div>
      </a-form-item>

      <a-form-item
        :hide-label="true"
        :hide-asterisk="true"
        field="message_input"
        validate-trigger="input"
        class="mb-0 relative"
      >
        <a-textarea
          placeholder="shift+enter换行"
          v-model="send_form.message_input"
          class="voice-c"
          allow-clear
          :auto-size="{
            minRows: 1,
            maxRows: 4,
          }"
          @keydown.enter.native.prevent="submitForm2()"
          show-word-limit
        />
        <a-button
          class="sendIcon"
          @click="submitForm()"
          type="primary"
          shape="circle"
          :loading="send_loading"
        >
          <template #icon> <icon-send /></template>
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { IconSend } from "@arco-design/web-vue/es/icon";
import { Message } from "@arco-design/web-vue";
import { useAiChat } from "../models";
import { send_bot } from "@/apis/api";
import { MockAnswer } from "~/pages/home/constant";

const emit = defineEmits(["all_message"]);
const aiChatStore = useAiChat();
const {
  ms_active,
  me_message,
  is_done,
  send_loading,
  ms_count,
  model_is_select,
  controller,
  send_form,
} = storeToRefs(aiChatStore);

const plugins_select = ref();
const tmpMessage = ref("");
const text_imageUrl = ref("");

let index = 0;

const submitForm2 = () => {
  send_loading.value = true;
  me_message.value.push({
    session_id: ms_active.value,
    question: send_form.value.message_input,
    quote: send_form.value.quote,
    message: "思考中...",
  });
  down_message();

  setTimeout(() => {
    const res = MockAnswer[index].message.split("");
    index++;
    me_message.value[me_message.value.length - 1].message = "";
    tmpMessage.value = "";
    is_done.value = false;
    send_loading.value = true;

    res.forEach((content, index) => {
      setTimeout(() => {
        tmpMessage.value += content;
        me_message.value[me_message.value.length - 1].message =
          tmpMessage.value;
        down_message();

        if (index === res.length - 1) {
          console.log("done");
          is_done.value = true;
          send_loading.value = false;
          send_form.value = { message_input: "", quote: "" };
        }
      }, index * 50);
    });
  }, 1500);
};

// api 发送消息
const submitForm = async () => {
  if (send_form.value.message_input == "") {
    Message.warning("请输入内容");
    return false;
  }
  if (send_loading.value == true) {
    Message.warning("请等待上一条消息发送完成");
    return false;
  }
  // @ts-ignore
  if (event.shiftKey) {
    // 按下shift键，插入换行符
    send_form.value.message_input += "\n";
    return false;
  }

  send_loading.value = true;
  me_message.value.push({
    session_id: ms_active.value,
    question: send_form.value.message_input,
    quote: send_form.value.quote,
    message: "思考中...",
  });
  down_message();
  const tmpSession =
    ms_active.value === 0 ? ms_count.value + 1 : ms_active.value;

  // let controller = new AbortController();
  const res = await send_bot(
    {
      info: send_form.value.message_input,
      session_id: tmpSession,
      online_search: plugins_select.value === "online_search",
      quote: send_form.value.quote,
      model_is_select: model_is_select.value,
      attachment: text_imageUrl.value,
    },
    { signal: controller.value?.signal }
  );
  // 取消请求
  controller.value?.signal.addEventListener("abort", () => {
    console.log("abort");
  });

  if (res) {
    me_message.value[me_message.value.length - 1].message = "";
    tmpMessage.value = "";
    // 创建新session
    if (ms_active.value === 0) {
      emit("all_message");
      ms_active.value = tmpSession;
    }
  }

  const resErrCallback = () => {
    send_loading.value = false;
  };
  const mesErrCallback = (err: string) => {
    me_message.value[me_message.value.length - 1].message = err;
  };
  const resCallback = (content: string) => {
    is_done.value = false;
    send_loading.value = true;
    tmpMessage.value += content;
    me_message.value[me_message.value.length - 1].message = tmpMessage.value;
    down_message();
  };
  const doneCallback = async () => {
    console.log("done");
    is_done.value = true;
    send_loading.value = false;
    // get_limit();
    send_form.value = { message_input: "", quote: "" };
    // await check_message(ms_active.value);
  };

  streamOutput(res, resErrCallback, mesErrCallback, resCallback, doneCallback);
};
defineExpose({
  submitForm,
});
</script>
