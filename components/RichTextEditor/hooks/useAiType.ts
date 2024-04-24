import { Editor } from "@tiptap/core";
import type { DropDownOptionType } from "../utils/type";
import { AiModalTypeEnum, AiTypeEnum } from "../extensions/AiWriter";

export const useAiType = (editor: Editor) => {
  const options: DropDownOptionType[] = [
    {
      id: "aiQuestion",
      label: "提问",
      icon: "IconPenFill",
      type: AiTypeEnum.DocChat,
      onClick: () =>
        editor
          .chain()
          .focus()
          .setAi(AiTypeEnum.DocChat, AiModalTypeEnum.CHAT, false)
          .run(),
    },
    {
      id: "aiContinueWrite",
      label: "续写",
      icon: "IconPen",
      type: AiTypeEnum.DocExtend,
      onClick: () =>
        editor
          .chain()
          .focus()
          .setAi(AiTypeEnum.DocExtend, AiModalTypeEnum.PANEL, true)
          .run(),
    },
    {
      id: "translate",
      label: "翻译",
      icon: "IconLanguage",
      child: [
        {
          id: "English",
          label: "English",
          type: AiTypeEnum.DocTranslate_c2e,
          onClick: () =>
            editor
              .chain()
              .focus()
              .setAi(AiTypeEnum.DocTranslate_c2e, AiModalTypeEnum.PANEL, true)
              .run(),
        },
        {
          id: "Chinese",
          label: "中文",
          type: AiTypeEnum.DocTranslate_e2c,
          onClick: () =>
            editor
              .chain()
              .focus()
              .setAi(AiTypeEnum.DocTranslate_e2c, AiModalTypeEnum.PANEL, true)
              .run(),
        },
      ],
    },
  ];
  return options;
};
