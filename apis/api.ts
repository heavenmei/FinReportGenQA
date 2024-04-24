import Http from "@/apis/request";

// * AI Chat
export const get_message = (params: any) => {
  return Http.get("get_message", params);
};
export const c_message = (params: any) => {
  return Http.post("check_message", params);
};
export const add_chat = () => {
  return Http.post("add_chat");
};
// 原生请求
export const send_bot = (body: any, options?: any) => {
  return Http.postFetch("send_bot", body, options);
};
export const delete_message = (params: any) => {
  return Http.post("delete_message", params);
};

export const c_session_name = (params: any) => {
  return Http.post("c_session_name", params);
};

export const del_all = () => {
  return Http.post("del_all");
};

export const generatePdf = (params: any) => {
  return Http.post("generatePdf", params);
};

export const get_scene_f = (params: any) => {
  return Http.post("get_scene_f", params);
};

export const searchs = (params: any) => {
  return Http.post("searchs", params);
};

export const del_msg = (params: any) => {
  return Http.post("del_msg", params);
};

export const get_allContent = () => {
  return Http.post("get_allContent");
};
export const get_content = (params: any) => {
  return Http.post("get_content", params);
};

export const get_stateless_chat = (params: any) => {
  return Http.postFetch("general_stateless_chat", params);
};
export const delete_content = (params: any) => {
  return Http.post("delete_content", params);
};
export const save_content = (params: any) => {
  return Http.post("save_content", params);
};
export const get_nowContent = () => {
  return Http.post("get_nowContent");
};
export const rename_content = (params: any) => {
  return Http.post("rename_content", params);
};
