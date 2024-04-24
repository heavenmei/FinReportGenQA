<template>
  <div class="tiptap w-full h-full" id="tiptap-editor" v-if="editor">
    <MenuText :editor="editor" />
    <a-spin
      :loading="editorLoading"
      tip="This may take a while..."
      class="flex-1 overflow-y-auto w-full"
    >
      <editor-content
        v-if="content != null"
        :editor="editor"
        class="tiptap-content overflow-y-auto w-full h-full flex-1"
        style="scrollbar-width: none"
      />
      <a-empty
        v-else
        class="w-full h-full flex-1 flex flex-col justify-center items-center"
        style="background-color: #fff; border-radius: 20px"
        description="选择右侧产业生成报告"
      />
    </a-spin>

    <MenuBubble :editor="editor" />
    <AiChatBubble :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { EditorContent, Editor } from "@tiptap/vue-3";
import MenuText from "./components/MenuText.vue";
import MenuBubble from "./components/MenuBubble.vue";
import ExtensionKit from "./extensions/extension-kit";
import AiChatBubble from "./components/AiChatBubble.vue";

const { content, editorLoading } = defineProps(["content", "editorLoading"]);
const emits = defineEmits(["onUpdate", "onCreate"]);


const editor = new Editor({
  autofocus: true,
  content: content,
  extensions: [...ExtensionKit()],
  editorProps: {
    attributes: {
      autocomplete: "off",
      autocorrect: "off",
      autocapitalize: "off",
      class: "min-h-full",
    },
  },
  // editable: !props.readonly,
  onCreate: ({ editor }) => {
    emits("onCreate");
  },
  // onTransaction: (options) => {
  //   emit("onTransaction", options);
  // },
  onSelectionUpdate: ({ editor }) => {
    editor.chain().focus().unsetAi().run();
    const { selection, doc } = editor.state;
    const text = doc.textBetween(selection.from, selection.to, "");
    editor.storage.selectionDoc = text;
  },
  // onBlur: (options) => {
  //   emit("onBlur", options);
  // },
  // onDestroy: (options) => {
  //   emit("onDestroy", options);
  // },
  onUpdate: ({ editor }) => {
    const { selection, doc } = editor.state;
    emits("onUpdate");
  },
});

const getHTMLcontent = () => {
  const htmlDoc = editor.getHTML();
  return htmlDoc;
};

const setContent = (payload: string) => {
  editor.commands.setContent(payload);
};

defineExpose({ getHTMLcontent, setContent });
</script>

<style>
@import "./css/index.scss";
</style>
