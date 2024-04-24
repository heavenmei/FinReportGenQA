import { mergeAttributes, Node } from "@tiptap/vue-3";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { v4 as uuid } from "uuid";
import type { Editor } from "@tiptap/vue-3";

import AiWriter from "./AiWriter.vue";

declare module "@tiptap/vue-3" {
  interface Commands<ReturnType> {
    aiWriter: {
      setAi: (
        type?: AiTypeEnum,
        modal?: AiModalTypeEnum,
        autoSubmit?: boolean,
        options?: Record<string, any>
      ) => ReturnType;
      unsetAi: () => ReturnType;
    };
  }
}
export enum AiModalTypeEnum {
  NONE = 0,
  CHAT = 1,
  PANEL = 2,
}

export enum AiTypeEnum {
  DocChat = "/doc_qa",
  DocExtend = "/doc_continuation",
  DocRewriter = "/doc_rewriter",
  DocTranslate_c2e = "/doc_translate_c2e",
  DocTranslate_e2c = "/doc_translate_e2c",
}

export default Node.create({
  name: "aiWriter",

  group: "block",

  draggable: true,

  onCreate() {
    this.editor
      .chain()
      .focus()
      .insertContent({
        type: this.name,
      })
      .run();
  },

  addStorage() {
    return {
      ai_modal_visible: AiModalTypeEnum.NONE, // 弹窗展现形式
      ai_type: AiTypeEnum.DocChat,
      ai_autoSubmit: false, //是否发送
      ai_options: {
        messageInput: undefined,
      },
    };
  },

  addOptions() {
    return {
      authorId: undefined,
      authorName: undefined,
      HTMLAttributes: {
        //无效
        class: `node-${this.name}`,
      },
    };
  },

  addAttributes() {
    return {
      nodeSide: 1,
      id: {
        default: undefined,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => ({
          "data-id": attributes.id,
        }),
      },
      authorId: {
        default: undefined,
        parseHTML: (element) => element.getAttribute("data-author-id"),
        renderHTML: (attributes) => ({
          "data-author-id": attributes.authorId,
        }),
      },
      authorName: {
        default: undefined,
        parseHTML: (element) => element.getAttribute("data-author-name"),
        renderHTML: (attributes) => ({
          "data-author-name": attributes.authorName,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `${this.name}`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setAi:
        (
          type = AiTypeEnum.DocExtend,
          modal = AiModalTypeEnum.PANEL,
          autoSubmit = false,
          options?: Record<string, any>
        ) =>
        ({ editor }: { editor: any }) => {
          editor.storage.aiWriter = {
            ai_modal_visible: modal,
            ai_autoSubmit: autoSubmit,
            ai_type: type,
            ai_options: options,
          };
          return true;
        },
      unsetAi:
        () =>
        ({ editor }) => {
          editor.storage.aiWriter.ai_modal_visible = AiModalTypeEnum.NONE;
          return true;
        },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(AiWriter);
  },
});
