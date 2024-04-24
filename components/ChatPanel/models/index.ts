import { defineStore } from "pinia";
import { c_message, get_scene_f } from "@/apis/api";

interface SendFormProps {
  message_input: string;
  quote: string;
}

interface SceneProps {
  p_scene_list: any[];
  scene_list: any[];
  count: number;
}
interface AiChatState {
  ms_active: number;
  me_message: any;
  loadins: boolean;
  is_done: boolean;
  ms_count: number;
  model_list: any[];
  model_is_select: string;
  send_loading: boolean;
  send_form: SendFormProps;
  controller: any; // 控制取消对话请求
  scene: SceneProps;
}

export const useAiChat = defineStore("aiChatStore", {
  state: (): AiChatState => ({
    ms_active: 0,
    me_message: {},
    loadins: false,
    ms_count: 0,
    model_list: [],
    model_is_select: "青创大模型",
    is_done: true,
    controller: new AbortController(),
    send_loading: false,
    send_form: { message_input: "", quote: "" },
    scene: {
      p_scene_list: [],
      scene_list: [],
      count: 0,
    },
  }),
  actions: {
    // api 单独请求聊天记录
    check_message(id: number) {
      return new Promise((resolve, reject) => {
        this.ms_active = id;
        this.loadins = true;
        c_message({
          session_id: id,
        })
          .then((res: any) => {
            this.me_message = res.data;
            this.loadins = false;
            down_message();
            resolve(null);
          })
          .catch((err: any) => {
            this.loadins = false;
            reject(err);
          });
      });
    },
    // api 请求场景/model
    async scene_all() {
      try {
        const res = await get_scene_f({});
        this.model_list = res.model;
        this.scene = {
          scene_list: res.data,
          p_scene_list: res.p_data,
          count: res.count,
        };
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    stop_stream() {
      this.is_done = true;
      this.send_loading = false;
      this.controller.abort(); // 取消请求
      this.controller = new AbortController();
      this.send_form = { message_input: "", quote: "" };
    },
  },
  getters: {},
});
