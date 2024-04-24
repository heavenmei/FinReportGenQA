import type { FieldRule } from "@arco-design/web-vue";

export const MenuList = [
  {
    key: "work",
    title: "工作台",
    icon: "IconCommon",
    link: "/work",
  },
  {
    key: "ai_chat",
    title: "AI问答",
    icon: "IconMessage",
    link: "/ai_chat",
  },
  {
    key: "ai_draw",
    title: "AI绘画",
    icon: "IconImage",
    link: "/ai_draw",
  },
  {
    key: "ai_draw_square",
    title: "AI绘画广场",
    icon: "IconRelation",
    link: "/ai_draw_square",
  },
  {
    key: "ai_write",
    title: "AI写作",
    icon: "IconEdit",
    link: "/ai_write",
  },
  {
    key: "mark_me",
    title: "思维导图",
    icon: "IconMindMapping",
    link: "/mark_me",
  },
];

export const RegisterFormRules: Record<
  string,
  FieldRule<any> | FieldRule<any>[]
> = {
  username: [
    { required: true, message: "请输入邮箱地址", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur" },
  ],
  email_code: [
    { required: true, message: "请输入邮箱验证码", trigger: "blur" },
  ],
};

// todo delete
export const defaultContent =  '<h2 style="text-align: center;">Welcome To Element Tiptap Editor Demo</h2><p>🔥 <strong>Element Tiptap Editor </strong>🔥is a WYSIWYG rich-text editor using&nbsp; <a href="https://github.com/scrumpy/tiptap" target="_blank" ref="nofollow noopener noreferrer">tiptap</a>&nbsp;and <a href="https://github.com/element-plus/element-plus" target="_blank" ref="nofollow noopener noreferrer">element-plus</a>&nbsp;for Vue3,<img src="https://i.ibb.co/nbRN3S2/undraw-upload-87y9.png" alt="" title="" height="200" data-display="right"> that\'s easy to use, friendly to developers, fully extensible and clean in design.</p><p></p><p style="text-align: right;">👉Click on the image to get started image features 👉</p><p></p><p>You can switch to <strong>Code View </strong>💻 mode and toggle <strong>Fullscreen</strong> 📺 in this demo.</p><p></p><p><strong>Got questions or need help or feature request?</strong></p><p>🚀 <strong>welcome to submit an <a href="https://github.com/Leecason/element-tiptap/issues" target="_blank" ref="nofollow noopener noreferrer">issue</a></strong> 😊</p><p>I\'m continuously working to add in new features.</p><p></p><blockquote><p>This demo is simple, switch tab for more features.</p><p>All demos source code: <a href="https://github.com/Leecason/element-tiptap/blob/master/demos/views/Index.vue" target="_blank" ref="nofollow noopener noreferrer">source code 🔗</a></p><title>sdsd</title></blockquote>'