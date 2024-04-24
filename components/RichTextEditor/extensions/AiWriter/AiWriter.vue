<template>
  <node-view-wrapper class="tiptap-p" contenteditable="false" data-drag-handle>
    <node-view-content class="hidden" />
    <!-- :popup-container="getPopContainer" -->
    <a-modal
      :ref="aiModal"
      v-model:visible="visibleModal"
      modal-class="tiptap-aiWriter-modal"
      body-class="tiptap-aiWriter-modal-body"
      :mask="false"
      size="small"
      :modal-style="{
        pointerEvents: 'auto',
        // transform: `translate(${modalPos.left}px, ${modalPos.top}px)`
        // top: `${modalPos.top}px`,
        // left: `${modalPos.left}px`,
      }"
      :closable="true"
      @cancel="handleCancel"
      @ok="handleOk"
      @before-close="handelBeforeClose"
      draggable
    >
      <template #title>AI {{ aiCurOption?.label }} </template>
      <div class="mx-4">
        <a-textarea
          v-model:model-value="selectionText"
          placeholder="Please enter something"
          allow-clear
          auto-size
          disabled
        />
      </div>

      <a-divider margin="1rem" />
      <div class="tiptap-aiWriter-modal-body__answer">
        {{ messageOutput }}
      </div>

      <!-- Footer -->
      <template #footer>
        <div v-if="chatVisible" class="flex gap-2 items-center">
          <a-button
            type="text"
            size="mini"
            @click="() => (chatVisible = false)"
          >
            <template #icon>
              <icon-left />
            </template>
          </a-button>
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
              <icon-send class="text-lg" @click="submitForm" />
            </template>
          </a-input-search>
        </div>
        <div v-else class="flex items-center">
          <a-button
            v-if="visibleChat"
            type="text"
            size="mini"
            @click="() => (chatVisible = true)"
            :style="{ color: 'rgb(168 85 247)' }"
          >
            继续优化
            <template #icon>
              <icon-edit />
            </template>
          </a-button>
          <!-- right buttons -->
          <div class="ml-auto flex gap-2 items-center">
            <div v-if="messageOutput" class="flex gap-2 items-center">
              <a-tooltip content="复制">
                <a-button type="text" size="mini" @click="handleCopy">
                  <template #icon>
                    <icon-copy />
                  </template>
                </a-button>
              </a-tooltip>
              <a-tooltip content="替换">
                <a-button
                  type="text"
                  size="mini"
                  status="success"
                  @click="handleReplace"
                >
                  <template #icon>
                    <icon-check />
                  </template>
                </a-button>
              </a-tooltip>
              <a-tooltip content="插入">
                <a-button type="text" size="mini" @click="handleInsert">
                  <template #icon>
                    <icon-to-left />
                  </template>
                </a-button>
              </a-tooltip>
            </div>
            <a-button size="small" type="primary" @click="submitForm">
              生成
            </a-button>
          </div>
        </div>
      </template>
    </a-modal>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from "@tiptap/vue-3";
import { IconCopy, IconCheck, IconToLeft } from "@arco-design/web-vue/es/icon";
import { get_stateless_chat } from "~/apis/api";
import { Message } from "@arco-design/web-vue";
import { useCounter } from "~/store/counter";
import { streamOutput } from "~/utils/util";
import { useAiType } from "../../hooks/useAiType";
import { AiModalTypeEnum, AiTypeEnum } from ".";
import { code_copy } from "~/utils/util";

const props = defineProps(nodeViewProps);
const editor = props.editor;

const token = useCookie("token");
const counter = useCounter();

const getPopContainer = computed(
  () => document.getElementById("tiptap-editor") ?? document.body
);
const aiStore = computed(() => editor.storage.aiWriter);
const editorState = computed(() => editor.state);
const visibleChat = computed(
  () => editor.storage.aiWriter.ai_type == AiTypeEnum.DocChat
);
// 判断modal是否显示
const visibleModal = computed(
  () => aiStore.value.ai_modal_visible == AiModalTypeEnum.PANEL
);
// 当前选项
const aiCurOption = computed(() => {
  const opts = useAiType(editor);
  const curItem = opts.find((item) => item.type === aiStore.value.ai_type);
  return curItem;
});

const aiModal = ref();
const chatVisible = ref(false);
const dropPopVisible = ref();
const selectionText = ref();
const messageInput = ref();
const messageOutput = ref();
const send_loading = ref(false);
const is_done = ref(true);
// const modalPos = reactive({ top: 0, left: 0 });

watch(editorState, () => {
  // console.log("====watch", aiStore.value);
  const { ai_autoSubmit, ai_options } = aiStore.value;
  if (ai_options?.messageInput) {
    messageInput.value = aiStore.value.ai_options.messageInput;
  }
  if (ai_autoSubmit) {
    submitForm();
    aiStore.value.ai_autoSubmit = false;
  }

  const { selection, doc } = editorState.value;
  // const pos = editor.view.coordsAtPos(selection.$anchor.pos);
  // if (!extParams.value.visible) {
  //   modalPos.top = pos.top + 20;
  //   modalPos.left = pos.left;
  // }

  const text = doc.textBetween(selection.from, selection.to, "");
  selectionText.value = text;
});

// 恢复default
const handelBeforeClose = () => {
  messageOutput.value = undefined;
  messageInput.value = undefined;
  chatVisible.value = false;
};

const handleOk = () => {
  editor.chain().focus().unsetAi().run();
};
const handleCancel = () => {
  editor.chain().focus().unsetAi().run();
};

const handleCopy = () => {
  code_copy(messageOutput.value);
};

const handleReplace = () => {
  editor?.commands.insertContent(messageOutput.value);
};
const handleInsert = () => {
  // editor.chain().focus().deleteCurrentNode().run();
  // editor?.commands.insertContent({
  //   type: "paragraph",
  //   content: [
  //     {
  //       type: "text",
  //       // text: messageOutput.value,
  //       text: messageOutput.value,
  //     },
  //   ],
  editor?.commands.insertContent(selectionText.value + messageOutput.value);
};

let controller = new AbortController();

// api 发送消息
const submitForm = async () => {
  chatVisible.value = false;

  if (!token.value) {
    Message.warning("请先登录");
    counter.login_dialog = true;
    return false;
  }
  if (selectionText.value == "") {
    Message.warning("请输入内容");
    return false;
  }
  if (send_loading.value == true) {
    Message.warning("请等待上一条消息发送完成");
    return false;
  }

  send_loading.value = true;
  // // let controller = new AbortController();
  const res = await get_stateless_chat({
    content: selectionText.value,
    prompt: messageInput.value,
    type: editor.storage.aiWriter.ai_type,
  });

  // 取消请求
  controller?.signal.addEventListener("abort", () => {
    console.log("abort===");
  });

  if (res) {
    messageOutput.value = "";
  }

  const resErrCallback = () => {
    send_loading.value = false;
  };
  const mesErrCallback = (err: string) => {
    messageOutput.value = err;
    send_loading.value = false;
  };
  const resCallback = (content: string) => {
    is_done.value = false;
    send_loading.value = true;
    messageOutput.value += content;
  };
  const doneCallback = async () => {
    console.log("done===");
    is_done.value = true;
    send_loading.value = false;
  };

  streamOutput(res, resErrCallback, mesErrCallback, resCallback, doneCallback);
};
</script>

<style>
.tiptap-aiWriter-modal {
  border: 1px solid #e9e9ef;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px 0px;

  .arco-modal-header {
    margin: 0px;
  }

  &-body {
    display: flex;
    flex-direction: column;
    padding: 12px 0;

    &__answer {
      position: relative;
      margin: 0 1.5rem;
      padding: 0 1rem;
      border-left: 5px solid #efefef;
      max-height: 14rem;
      min-height: 22px;
      overflow-y: auto;
    }
  }
}
</style>
