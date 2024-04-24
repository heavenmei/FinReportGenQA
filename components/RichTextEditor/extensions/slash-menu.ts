import { Extension } from "@tiptap/vue-3";
import Suggestion from "@tiptap/suggestion";

export default Extension.create({
  name: "aiCommand",
  // @ts-ignore
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
        // render: () => {
        //   let element: HTMLDivElement;
        //   let popup: Instance[];
        //   let selectIndex: number = 0;
        //   let suggestionProps: SuggestionProps;
        //   const updateElement = () => {
        //     element.innerHTML = `
        //                     <div class="items">
        //                      ${suggestionProps.items
        //                        .map((item: AiCommand, index: number) => {
        //                          return `<button type="button" class="item ${
        //                            index === selectIndex ? "item-selected" : ""
        //                          }" data-index="${index}">${
        //                            item.name
        //                          }</button>`;
        //                        })
        //                        .join("")}
        //                     </div>
        //                     `;
        //     element.addEventListener("click", (e) => {
        //       const closest = (e.target as HTMLElement).closest(".item");
        //       if (closest) {
        //         const selectIndex = Number(closest.getAttribute("data-index"));
        //         const item = suggestionProps.items[selectIndex];
        //         if (item) suggestionProps.command(item);
        //       }
        //     });
        //   };

        //   return {
        //     onStart: (props: SuggestionProps) => {
        //       element = document.createElement("div") as HTMLDivElement;
        //       element.classList.add("suggestion");
        //       suggestionProps = props;

        //       if (!props.clientRect) {
        //         return;
        //       }

        //       updateElement();

        //       // @ts-ignore
        //       popup = tippy("body", {
        //         getReferenceClientRect: props.clientRect,
        //         appendTo: () => props.editor.view.dom.closest(".tiptap-editor"),
        //         content: element,
        //         showOnCreate: true,
        //         interactive: true,
        //         allowHTML: true,
        //         trigger: "manual",
        //         placement: "right-start",
        //         arrow: false,
        //       });
        //     },

        //     onUpdate(props) {
        //       suggestionProps = props;

        //       if (!props.clientRect) {
        //         return;
        //       }

        //       popup[0].setProps({
        //         getReferenceClientRect: props.clientRect as any,
        //       });
        //     },

        //     onKeyDown(props) {
        //       if (props.event.key === "Escape") {
        //         popup[0].hide();
        //         return true;
        //       } else if (props.event.key === "ArrowUp") {
        //         selectIndex =
        //           (selectIndex + suggestionProps.items.length - 1) %
        //           suggestionProps.items.length;
        //         updateElement();
        //         return true;
        //       } else if (props.event.key === "ArrowDown") {
        //         selectIndex = (selectIndex + 1) % suggestionProps.items.length;
        //         updateElement();
        //         return true;
        //       } else if (props.event.key === "Enter") {
        //         const item = suggestionProps.items[selectIndex];
        //         if (item) suggestionProps.command(item);
        //         return true;
        //       }
        //       return false;
        //     },

        //     onExit() {
        //       popup[0].destroy();
        //       element.remove();
        //     },
        //   };
        // },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
