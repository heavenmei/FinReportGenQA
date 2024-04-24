import { Editor } from "@tiptap/vue-3";
import {
  isCustomNodeSelected,
  isTextSelected,
  type ShouldShowProps,
} from "../utils";
import { AiModalTypeEnum } from "../extensions/AiWriter";

export const useTextmenuStates = (editor: Editor) => {
  const shouldShowBubble = ({ view, from }: ShouldShowProps) => {
    if (!view) {
      return false;
    }

    const domAtPos = view.domAtPos(from || 0).node as HTMLElement;
    const nodeDOM = view.nodeDOM(from || 0) as HTMLElement;
    const node = nodeDOM || domAtPos;

    if (isCustomNodeSelected(editor, node)) {
      return false;
    }

    // 有ai面板就不显示
    if (editor.storage.aiWriter.ai_modal_visible !== AiModalTypeEnum.NONE) {
      return false;
    }

    return isTextSelected({ editor });
  };

  return {
    shouldShowBubble,
    isBold: editor.isActive("bold"),
    isItalic: editor.isActive("italic"),
    isStrike: editor.isActive("strike"),
    isUnderline: editor.isActive("underline"),
    isCode: editor.isActive("code"),
    isSubscript: editor.isActive("subscript"),
    isSuperscript: editor.isActive("superscript"),
    isBulletList: editor.isActive("bulletList"),
    isOrderList: editor.isActive("orderedList"),
    isTaskList: editor.isActive("taskList"),
    currentColor: editor.getAttributes("textStyle")?.color || undefined,
    currentHighlight: editor.getAttributes("highlight")?.color || undefined,
    currentFont: editor.getAttributes("textStyle")?.fontFamily || undefined,
    currentSize: editor.getAttributes("textStyle")?.fontSize || undefined,
  };
};
