import { Editor as CoreEditor } from "@tiptap/core";
import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";

export type DropDownOptionType = {
  id: string;
  label: string;
  type?: string;
  icon?: string;
  child?: DropDownOptionType[];
  onClick?: () => void;
  isActive?: () => boolean;
  disabled?: () => boolean;
};

export interface ShouldShowProps {
  editor?: CoreEditor;
  view: EditorView;
  state?: EditorState;
  oldState?: EditorState;
  from?: number;
  to?: number;
}
