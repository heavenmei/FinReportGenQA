import { Editor } from "@tiptap/vue-3";

export const useTextmenuCommands = (editor: Editor) => {
  const onUndo = () => editor.chain().focus().undo().run();
  const onRedo = () => editor.chain().focus().redo().run();
  const onBold = () => editor.chain().focus().toggleBold().run();
  const onItalic = () => editor.chain().focus().toggleItalic().run();
  const onUnderline = () => editor.chain().focus().toggleUnderline().run();
  const onStrike = () => editor.chain().focus().toggleStrike().run();

  const onCode = () => editor.chain().focus().toggleCode().run();
  const onCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();

  // const onSubscript = useCallback(
  //   () => editor.chain().focus().toggleSubscript().run(),
  //   [editor]
  // );
  // const onSuperscript = useCallback(
  //   () => editor.chain().focus().toggleSuperscript().run(),
  //   [editor]
  // );

  const onBulletList = () => editor.chain().focus().toggleBulletList().run();
  const onOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  // const onTaskList = () => editor.chain().focus().toggleTaskList().run();

  // const onChangeColor = useCallback(
  //   (color: string) => editor.chain().setColor(color).run(),
  //   [editor]
  // );
  // const onClearColor = useCallback(
  //   () => editor.chain().focus().unsetColor().run(),
  //   [editor]
  // );

  // const onChangeHighlight = useCallback(
  //   (color: string) => editor.chain().setHighlight({ color }).run(),
  //   [editor]
  // );
  // const onClearHighlight = useCallback(
  //   () => editor.chain().focus().unsetHighlight().run(),
  //   [editor]
  // );

  // const onLink = useCallback(
  //   (url: string, inNewTab?: boolean) =>
  //     editor
  //       .chain()
  //       .focus()
  //       .setLink({ href: url, target: inNewTab ? "_blank" : "" })
  //       .run(),
  //   [editor]
  // );

  const onSetFont = (font: string) => {
    if (!font || font.length === 0) {
      return editor.chain().focus().unsetFontFamily().run();
    }
    return editor.chain().focus().setFontFamily(font).run();
  };

  const onSetFontSize = (fontSize: string) => {
    if (!fontSize || fontSize.length === 0) {
      return editor.chain().focus().unsetFontSize().run();
    }
    return editor.chain().focus().setFontSize(fontSize).run();
  };

  return {
    onUndo,
    onRedo,
    onBold,
    onItalic,
    onStrike,
    onUnderline,
    onCode,
    onCodeBlock,
    // onSubscript,
    // onSuperscript,
    onBulletList,
    onOrderedList,
    // onTaskList,
    // onChangeColor,
    // onClearColor,
    // onChangeHighlight,
    // onClearHighlight,
    onSetFont,
    onSetFontSize,
  };
};
