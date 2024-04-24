import { Editor } from "@tiptap/vue-3";
import type { DropDownOptionType } from "../../../../utils/type";

export const useTextAlignTypes = (editor: Editor) => {
  const options: DropDownOptionType[] = [
    {
      id: "alignLeft",
      label: "左对齐",
      icon: "align-left",
      type: "option",
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: () => editor.isActive({ textAlign: "left" }),
    },
    {
      id: "alignCenter",
      label: "居中",
      icon: "align-center",
      type: "option",
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: () => editor.isActive({ textAlign: "center" }),
    },
    {
      id: "alignRight",
      label: "右对齐",
      icon: "align-right",
      type: "option",
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: () => editor.isActive({ textAlign: "right" }),
    },
    {
      id: "alignJustify",
      label: "两端对齐",
      icon: "align-justify",
      type: "option",
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      isActive: () => editor.isActive({ textAlign: "justify" }),
    },
  ];
  return options;
};
