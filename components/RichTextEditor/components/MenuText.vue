<template>
  <div class="flex justify-between" style="height: 40px">
    <NuxtLink to="/ai_write">
      <a-button type="text" class="css-htwhyh" style="background-color: #fff">
        <template #icon>
          <icon-arrow-left class="cursor-pointer v-2 text-black-50" />
        </template>
      </a-button>
    </NuxtLink>
    <div class="tiptap-text-menu">
      <CmdButton tooltip="撤销" @click="commands.onUndo">
        <nuxt-icon name="undo" />
      </CmdButton>
      <CmdButton tooltip="重做" @click="commands.onRedo" :class="'mr-4'">
        <nuxt-icon name="redo" />
      </CmdButton>

      <HeadingPicker :options="blockOptions" />
      <FontFamilyPicker
        :value="states.currentFont || ''"
        @onChange="commands.onSetFont"
      />
      <FontSizePicker
        :class="'mr-4'"
        :value="states.currentSize || ''"
        @onChange="commands.onSetFontSize"
      />

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

      <TextAlignPicker :options="alignOptions" />
    </div>
    <div class="right_write_header flex gap-2">
      <a-tooltip content="下载Word文档" @click="export2Word">
        <a-button
          class="text-black-50 css-htwhyh"
          type="text"
          style="background-color: #fff"
        >
          <template #icon>
            <icon-download />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip content="删除当前文档">
        <a-popconfirm
          content="此操作将永久删除当前文档,确定要删除吗?"
          type="warning"
        >
          <a-button
            class="text-black-50 css-htwhyh"
            type="text"
            style="background-color: #fff"
          >
            <template #icon>
              <icon-delete />
            </template>
          </a-button>
        </a-popconfirm>
      </a-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";
import CmdButton from "./pure/CmdButton.vue";
import HeadingPicker from "./pure/HeadingPicker.vue";
import FontFamilyPicker from "./pure/FontFamilyPicker.vue";
import FontSizePicker from "./pure/FontSizePicker.vue";
import TextAlignPicker from "./pure/TextAlignPicker.vue";
import { useTextmenuCommands } from "../hooks/useTextmenuCommands";
import { useTextmenuStates } from "../hooks/useTextmenuStates";
import { useTextContentTypes } from "../hooks/useTextContentTypes";
import { useTextAlignTypes } from "../hooks/useTextAlignTypes";
import { exportWord } from "~/utils/util";

const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
});

const commands = computed(() => useTextmenuCommands(props.editor));
const states = computed(() => useTextmenuStates(props.editor));
const blockOptions = computed(() => useTextContentTypes(props.editor));
const alignOptions = computed(() => useTextAlignTypes(props.editor));

const export2Word = () => {
  exportWord(props.editor?.getHTML());
};
</script>
