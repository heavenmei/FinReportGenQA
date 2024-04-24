import { Editor } from "@tiptap/vue-3";
import type { DropDownOptionType } from "../../../../utils/type";

export const useTextContentTypes = (editor: Editor) => {
  const options: DropDownOptionType[] = [
    {
      id: "paragraph",
      label: "段落",
      type: "option",
      icon: "paragraph",
      disabled: () => !editor.can().setParagraph(),
      isActive: () =>
        editor.isActive("paragraph") &&
        !editor.isActive("orderedList") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("taskList"),
      onClick: () =>
        editor
          .chain()
          .focus()
          .lift("taskItem")
          .liftListItem("listItem")
          .setParagraph()
          .run(),
    },
    {
      id: "heading1",
      label: "一级标题",
      type: "option",
      icon: "IconH1",
      isActive: () => editor.isActive("heading", { level: 1 }),
      disabled: () => !editor.can().setHeading({ level: 1 }),
      onClick: () =>
        editor
          .chain()
          .focus()
          .lift("taskItem")
          .liftListItem("listItem")
          .setHeading({ level: 1 })
          .run(),
    },
    {
      id: "heading2",
      label: "二级标题",
      type: "option",
      icon: "IconH2",
      isActive: () => editor.isActive("heading", { level: 2 }),
      disabled: () => !editor.can().setHeading({ level: 2 }),
      onClick: () =>
        editor
          .chain()
          .focus()
          .lift("taskItem")
          .liftListItem("listItem")
          .setHeading({ level: 2 })
          .run(),
    },
    {
      id: "heading3",
      label: "三级标题",
      type: "option",
      icon: "IconH3",
      isActive: () => editor.isActive("heading", { level: 3 }),
      disabled: () => !editor.can().setHeading({ level: 3 }),
      onClick: () =>
        editor
          .chain()
          .focus()
          .lift("taskItem")
          .liftListItem("listItem")
          .setHeading({ level: 3 })
          .run(),
    },
  ];
  return options;
};
