import { Message } from "@arco-design/web-vue";
import { generatePdf } from "~/apis/api";
import { saveAs } from "file-saver";
import { asBlob } from "html-docx-js-typescript";
import dayjs from "dayjs";

export const dateFormatter = (
  date: string,
  pattern = "YYYY-MM-DD HH:mm:ss"
) => {
  return dayjs(date).format(pattern);
};

// navigator.clipboard requires a secure origin. So if your dev environment is being served over HTTP, then the clipboard method won't be available
const unsecuredCopyToClipboard = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  document.body.removeChild(textArea);
};
export const code_copy = async (msg: string) => {
  try {
    if (window.isSecureContext && navigator.clipboard) {
      await navigator.clipboard.writeText(msg);
    } else {
      unsecuredCopyToClipboard(msg);
    }
    Message.success("复制成功");
  } catch (e) {
    console.log(e);
    Message.error("复制失败");
  }
};

export const getTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export const check_vip_type = (type: string) => {
  if (type == "free") {
    return "免费版";
  } else if (type == "day") {
    return "每日";
  } else if (type == "month") {
    return "每月";
  } else if (type == "total") {
    return "有效期内";
  } else {
    return "免费版";
  }
};

export const down_message = () => {
  setTimeout(() => {
    let chat = document.getElementsByClassName(
      "chat-content"
    )[0] as HTMLElement;
    if (!chat) return;
    chat.style.transition = "500ms"; // 过渡时间为0.5秒
    chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
  }, 100);
};

// 流式输出格式：
// {"id":"","object":"","created":0,"model":"","choices":[{"delta":{"content":""},"index":0,"finish_reason":null}]}
export const streamOutput = async (
  res: any,
  resErrCallback?: () => void,
  mesErrCallback?: (err: string) => void,
  resCallback?: (content: string) => void,
  doneCallback?: Function
) => {
  if (res.status && res.status !== 200) {
    resErrCallback?.();
    return false;
  }

  let partialData = "";
  const stream = res.body?.getReader();

  const onData = ({ value }: { value: Uint8Array }) => {
    const chunk = new TextDecoder().decode(value);
    const lines = (partialData + chunk).split("\n");
    partialData = lines.pop() || "";
    // console.log("lines====", chunk, lines);

    for (const line of lines) {
      try {
        const trimmedLine = line.trim(); // 去除行首尾的空格
        const json = JSON.parse(trimmedLine);

        if (json.choices) {
          for (const choice of json.choices) {
            const content = choice.delta?.content;
            if (content) {
              resCallback?.(content);
              // console.log("resCallback====", content);
            }
            if (choice.finish_reason === "stop") {
              break;
            }
          }
        }
      } catch (e) {
        mesErrCallback?.(e as string);
        Message.error("解析错误");
        console.error("解析错误", e);
        return false; // 解析失败，错误的 JSON 数据
      }
    }
  };

  const read = async () => {
    const result = await stream?.read();
    if (result?.done) {
      doneCallback?.();
    } else {
      onData(result!);
      await read();
    }
  };
  await read();
};

// api 导出pdf
export const exportPdf = async (info: any) => {
  generatePdf({
    content: info,
  }).then((res: any) => {
    const blob = new Blob([res], { type: "application/pdf" });
    // 使用FileSaver.js保存文件并提供下载链接
    saveAs(blob, "example.pdf");
  });
};
// api 导出word
export const exportWord = (content: any, title = "未命名") => {
  if (content == null || content == "") {
    Message.error("内容为空");
    return;
  }
  asBlob(content).then((blob: any) => {
    saveAs(blob, title + ".docx");
  });
};

export const beforeUpload = (file: any) => {
  console.log("beforeUpload====");

  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 15;

  if (!isJPG && !isPNG) {
    Message.error("上传图片只能是 JPG/PNG 格式!");
    return false;
  }
  if (!isLt2M) {
    Message.error("上传图片大小不能超过 15MB!");
    return false;
  }
  return true;
};
