import {
  StarterKit,
  Document,
  AiWriter,
  CharacterCount,
  FontFamily,
  FontSize,
  SlashMenu,
  Heading,
  TextAlign,
  TextStyle,
  TaskItem,
  Underline,
  History,
} from ".";
import suggestion from "../utils/suggestion";

export const ExtensionKit = () => [
  Document,
  // Columns,
  // TaskList,
  TaskItem.configure({
    nested: true,
  }),
  AiWriter,
  // AiImage,
  // Column,
  // Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  History,
  // HorizontalRule,
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
  // CodeBlockLowlight.configure({
  //   lowlight,
  //   defaultLanguage: null,
  // }),
  TextStyle,
  FontSize,
  FontFamily,
  // Color,
  // TrailingNode,
  // Link.configure({
  //   openOnClick: false,
  // }),
  // Highlight.configure({ multicolor: true }),
  Underline,
  CharacterCount.configure({ limit: 50000 }),
  // TableOfContent,
  // TableOfContentNode,
  // ImageUpload.configure({
  //   clientId: provider?.document?.clientID,
  // }),
  // ImageBlock,
  // FileHandler.configure({
  //   allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
  //   onDrop: (currentEditor, files, pos) => {
  //     files.forEach(async () => {
  //       const url = await API.uploadImage();

  //       currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run();
  //     });
  //   },
  //   onPaste: (currentEditor, files) => {
  //     files.forEach(async () => {
  //       const url = await API.uploadImage();

  //       return currentEditor
  //         .chain()
  //         .setImageBlockAt({
  //           pos: currentEditor.state.selection.anchor,
  //           src: url,
  //         })
  //         .focus()
  //         .run();
  //     });
  //   },
  // }),
  // Emoji.configure({
  //   enableEmoticons: true,
  //   suggestion: emojiSuggestion,
  // }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {};
    },
  }).configure({
    types: ["heading", "paragraph"],
  }),
  // Subscript,
  // Superscript,
  // Table,
  // TableCell,
  // TableHeader,
  // TableRow,
  // Typography,
  // Placeholder.configure({
  //   includeChildren: true,
  //   showOnlyCurrent: false,
  //   placeholder: () => "",
  // }),
  // SlashCommand,
  SlashMenu,
  // Focus,
  // Figcaption,
  // BlockquoteFigure,
  // Dropcursor.configure({
  //   width: 2,
  //   class: "ProseMirror-dropcursor border-black",
  // }),
];

export default ExtensionKit;
