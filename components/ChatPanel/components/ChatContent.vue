<template>
  <div class="chat-content mt-4">
    <ul class="list-unstyled flex flex-col gap-4">
      <!--qs-->
      <div
        class="message_s border-bottom pb-4"
        v-for="(item, index) in me_message"
        :key="index"
      >
        <li v-if="item" class="flex gap-2">
          <a-avatar :style="{ backgroundColor: '#5661F6' }" :size="24">
            <IconUser />
          </a-avatar>
          <div
            class="w-full flex flex-col flex-1 gap-2"
            style="font-size: 16px"
          >
            <div class="w-full">
              <div
                class="w-full font-bold"
                v-html="
                  item.question
                    ? renderMarkdown(item.question).replace(/\\n/g, '\n')
                    : ''
                "
              ></div>
              <div
                class="pl-2"
                style="
                  font-size: 12px;
                  width: 90%;
                  background-color: #e9e9e9;
                  color: #787878;
                  border-radius: 4px;
                "
                v-if="item.quote"
              >
                {{ item.quote }}
              </div>
            </div>

            <div :style="{ color: '#5661F6' }">
              CHAT AI FIN <icon-double-down />
            </div>
            <div
              v-if="item.message"
              class="message-content"
              :class="index == me_message.length - 1 && !is_done ? 'ms-up' : ''"
              v-html="
                item.message
                  ? renderMarkdown(item.message).replace(/\\n/g, '\n')
                  : ''
              "
            ></div>
            <div class="message_content_footer flex gap-1">
              <div
                class="btn z-10 new_ant_btn h-30"
                @click="refresh_answer(item.question)"
              >
                <icon-refresh />
                <span class="ant_hide">重新生成</span>
              </div>
              <div
                class="btn z-10 new_ant_btn h-30"
                @click="
                  code_copy(
                    item.message ? item.message.replace(/\\n/g, '\n') : ''
                  )
                "
              >
                <icon-copy />
                <span class="ant_hide">复制答案</span>
              </div>
              <div
                class="btn z-10 new_ant_btn h-30"
                @click="
                  exportPdf(
                    item.message
                      ? renderMarkdown(item.message).replace(/\\n/g, '\n')
                      : ''
                  )
                "
              >
                <icon-download />
                <span class="ant_hide">导出PDF</span>
              </div>
              <a-popconfirm
                content="此操作将永久删除当条消息,确定要删除吗?"
                @ok="delete_this(item.id)"
                type="warning"
              >
                <div class="btn z-10 new_ant_btn h-30">
                  <icon-delete />
                  <span class="ant_hide">删除</span>
                </div>
              </a-popconfirm>
            </div>
          </div>
        </li>
      </div>
      <!--qs end-->
    </ul>
  </div>
  <div class="res_stop text-center mb-2" :class="is_done ? 'd-none' : ''">
    <a-button @click="stop_stream()">
      <icon-record-stop class="font-22 mr-2" />
      停止运行
    </a-button>
  </div>
  <div class="message-list"><div>Message List</div></div>
</template>

<script setup lang="ts">
import { useAiChat } from "../models";
import hljs from "highlight.js";
import markdownIt from "markdown-it";
import markdownItKatex from "markdown-it-katex";
import mermaid from "mermaid";
import {
  IconDelete,
  IconCopy,
  IconRefresh,
  IconDownload,
  IconRecordStop,
} from "@arco-design/web-vue/es/icon";
import { Message } from "@arco-design/web-vue";
import { delete_message } from "@/apis/api";
import { code_copy, exportPdf } from "~/utils/util";
import { defineEmits } from "vue";

// const { ruleForm } = defineProps(["ruleForm"]);
const emit = defineEmits(["all_message", "submitForm"]);

const aiChatStore = useAiChat();
const { ms_active, me_message, is_done, send_form, scene } =
  storeToRefs(aiChatStore);
const { check_message, stop_stream } = aiChatStore;

const scene_p_model = ref(scene.value.p_scene_list ?? []);

watch(aiChatStore, () => {
  scene_p_model.value = scene.value.p_scene_list;
});

// * 渲染message
const renderMarkdown = (markdown: any) => {
  const md = markdownIt({
    linkify: true,
    highlight: (str: string, lang: string) => {
      if (lang === "mermaid") {
        return `<pre class="mermaid">${markdownIt().utils.escapeHtml(
          str
        )}</pre>`;
      }

      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><span ref="preCopy" class="pre_copy">Copy</span><code>${
            hljs.highlight(str, {
              language: lang,
              ignoreIllegals: true,
            }).value
          }</code></pre>`;
        } catch (__) {}
      }

      return `<pre class="hljs"><span ref="preCopy" class="pre_copy">Copy</span><code>${markdownIt().utils.escapeHtml(
        str
      )}</code></pre>`;
    },
    breaks: true,
  }).use(markdownItKatex);

  const renderedMarkdown = md.render(markdown);

  mermaid.initialize({ startOnLoad: true });
  // 判断是否有闭合</pre>

  if (is_done.value) {
    mermaid.initialize({ startOnLoad: true });
    mermaid.init(undefined, document.querySelectorAll(".mermaid"));
  }

  return renderedMarkdown;
};

const refresh_answer = (qs: any) => {
  emit("all_message");
  send_form.value.message_input = qs;
  emit("submitForm");
};

// api 删除message
const delete_this = (id: number) => {
  delete_message({
    id: id,
  })
    .then((res: any) => {
      Message.success("删除成功");
      if (me_message.value.length == 1) {
        ms_active.value = 0;
        check_message(ms_active.value);
        emit("all_message");
      } else {
        check_message(ms_active.value);
        emit("all_message");
      }
    })
    .catch((err: any) => {
      Message.error(err.message);
    });
};
</script>
