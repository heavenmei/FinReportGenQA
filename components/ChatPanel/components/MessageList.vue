<template>
  <div
    style="width: 15%; min-width: 260px; margin-left: 1px"
    class="flex h-full flex-col chat-message-left relative"
    :class="!chat_open ? 'is_open' : ''"
  >
    <a-button
      size="mini"
      shape="circle"
      class="absolute aside-nav-btn"
      @click="chat_open = !chat_open"
    >
      <icon-left v-if="chat_open" />
      <icon-right v-else />
    </a-button>
    <a-space class="p-2 flex justify-between w-full">
      <h1 class="m-0 font-bold">Message</h1>
      <div class="message_action">
        <a-button class="rounded mr-2" type="primary" @click="add_new_chat()">
          <template #icon>
            <icon-plus />
          </template>
        </a-button>
        <a-popconfirm
          content="此操作将永久删除所有会话,确定要删除吗?"
          @ok="delete_all"
          type="warning"
        >
          <a-button class="rounded">
            <template #icon>
              <icon-delete />
            </template>
          </a-button>
        </a-popconfirm>
      </div>
    </a-space>
    <a-space class="w-full flex justify-between search_space" wrap>
      <a-input-search
        class="ml-2 mr-0 rounded"
        v-model="qs_input"
        @search="qs_search"
        @keydown.enter.native="qs_search"
        placeholder="搜索..."
      />
      <a-button class="rounded mr-2" @click="all_message()">
        <template #icon>
          <icon-loop />
        </template>
      </a-button>
    </a-space>

    <a-spin class="overflow-auto h-full" :loading="left_loding" tip="Loading..">
      <div v-if="messages?.length > 0" class="chat_list_message p-2">
        <ul class="chat-list mb-2">
          <div class="bot_info">
            <li
              class="online list-animation-bottomIn"
              :class="[
                ms_active == item[item.length - 1].session_id ? 'active' : '',
                'delay-' + index,
              ]"
              v-for="(item, index) in messages"
              :key="index"
            >
              <div class="hover_action">
                <a-space>
                  <icon-edit
                    @click="change_sname(item[item.length - 1].session_id)"
                  />
                  <a-popconfirm
                    content="此操作将永久删除当前会话,确定要删除吗?"
                    @ok="delete_msg(item[item.length - 1].session_id)"
                    type="warning"
                  >
                    <icon-delete />
                  </a-popconfirm>
                </a-space>
              </div>
              <div
                class="card bg-boli mb-2"
                @click="onClickMessage(item[item.length - 1].session_id)"
              >
                <div class="card-body">
                  <div class="media">
                    <div class="avatar me-3">
                      <a-avatar shape="square">
                        <img
                          :src="
                            item[item.length - 1].icon
                              ? item[item.length - 1].icon
                              : DefaultAvatar
                          "
                          alt=""
                        />
                      </a-avatar>
                    </div>
                    <div class="media-body overflow-hidden">
                      <div class="d-flex align-items-center mb-1">
                        <h6
                          class="text-truncate mb-0 me-auto"
                          v-if="item[item.length - 1].message_b"
                        >
                          {{ item[item.length - 1].message_b }}
                        </h6>
                        <h6 class="text-truncate mb-0 me-auto" v-else>
                          {{
                            item[item.length - 1].question
                              ? item[item.length - 1].question
                              : "新会话"
                          }}
                        </h6>
                      </div>
                      <div
                        class="text-truncate h-20"
                        v-html="
                          item[item.length - 1].message
                            ? item[item.length - 1].message.replace(
                                /\n/g,
                                '<br />'
                              )
                            : '暂无消息'
                        "
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </ul>
      </div>
      <a-empty class="message_empty" v-else />
    </a-spin>
    <a-pagination
      size="small"
      :total="ms_count"
      :current="page"
      :page-size="limit"
      class="justify-center mb-2"
      background
      simple
      @change="handleCurrentChange"
      :hide-on-single-page="true"
    />
    <a-modal v-model:visible="beizhu_info" title="修改备注" @ok="handle_send">
      <a-input v-model="beizhu" placeholder="修改备注名称" />
    </a-modal>

    <client-only>
      <div class="border-t dark:border-t-neutral-800">
        <div class="p-2 bg-n-6 rounded-xl">
          <a-trigger :trigger="['click', 'hover', 'focus']" v-if="token">
            <div class="flex items-center px-2.5 py-2.5 pb-4.5">
              <div class="relative w-10 h-10">
                <a-avatar
                  :imageUrl="user_info.avatar"
                  class="rounded-full w-10 h-10"
                >
                </a-avatar>
                <div
                  class="absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 rounded-full border-4 border-n-6 bg-green-300 top-1 border-green-300"
                ></div>
              </div>
              <div class="ml-1 mr-2">
                <div class="base2 font-semibold text-n-1 text-truncate">
                  {{ user_info.name ? user_info.name : "未登录" }}
                </div>
                <div class="caption1 font-semibold text-n-3/50 text-truncate">
                  额度:{{ user_info.money }}
                </div>
              </div>
              <div
                class="shrnik-0 ml-auto self-start px-2 bg-primary-2 rounded-lg caption1 font-bold text-n-7 pack_tag_vip"
              >
                {{ vip_level }}
              </div>
            </div>
            <template #content>
              <div class="nav-wraper">
                <div class="user-info-box">
                  <div class="user-dis">
                    <a-avatar>
                      <img
                        :src="user_info.avatar"
                        alt="avatar"
                        class="rounded-full w-10 h-10"
                      />
                    </a-avatar>
                    <span class="nickname flex-wrap ml-1">
                      <span>{{ user_info.name }}</span>
                      <div
                        class="shrnik-0 px-3 bg-primary-2 rounded-lg caption1 font-bold text-n-7 pack_tag_vip"
                      >
                        {{ vip_level }}
                      </div>
                    </span>
                  </div>
                  <div class="use-info user-type">
                    <span class="number">问答 </span
                    ><span>{{ last_msg }}/{{ total_msg }}次 </span>
                    <a-tag class="ml-1" color="#165dff" size="small">{{
                      check_vip_type(vip_type)
                    }}</a-tag>
                  </div>
                  <div class="use-info user-type">
                    <span class="number">绘画 </span
                    ><span>{{ last_draw }}/{{ total_draw }}次 </span>
                    <a-tag class="ml-1" color="#165dff" size="small">{{
                      check_vip_type(vip_type)
                    }}</a-tag>
                  </div>
                  <div class="use-info">
                    <span class="number">额度</span
                    ><span>{{ user_info.money }}</span>
                  </div>
                  <div class="quit" @click="quit_out()">
                    <div name="quit" class="i-svg quit-icon-blue">
                      <icon-export style="font-size: 24px" />
                    </div>
                    退出登录
                  </div>
                </div>
              </div>
            </template>
          </a-trigger>
          <div class="flex items-center px-2.5 py-2.5 pb-4.5" v-else>
            <div class="relative w-10 h-10">
              <a-avatar :style="{ backgroundColor: '#3370ff' }">
                <IconUser />
              </a-avatar>
              <div
                class="absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 rounded-full border-4 border-n-6 bg-green-300 top-1 border-green-300"
              ></div>
            </div>
            <div class="ml-1 mr-2">
              <div class="base2 font-semibold text-n-1 text-truncate">
                请先登录
              </div>
            </div>
            <div
              class="shrnik-0 ml-auto self-start px-3 bg-primary-2 rounded-lg caption1 font-bold text-n-7 pack_tag_vip"
            >
              {{ vip_level }}
            </div>
          </div>

          <a-button
            @click="
              () => {
                counter.login_dialog = true;
              }
            "
            class="w-full"
            v-if="!token"
          >
            用户登录
          </a-button>
          <a-button class="w-full" v-else @click="charge()">
            <div v-if="counter.setting.show_limit_front == '1'">
              VIP剩余
              <a-tag color="arcoblue" class="ml-1 mr-1"> {{ last_msg }}</a-tag
              >次问答
            </div>
            <div v-else>升级会员</div>
          </a-button>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from "~/store/counter";
import { ref } from "vue";
import {
  IconEdit,
  IconPlus,
  IconLeft,
  IconRight,
  IconDelete,
  IconLoop,
  IconUser,
  IconExport,
} from "@arco-design/web-vue/es/icon";
import {
  add_chat,
  c_session_name,
  del_all,
  del_msg,
  get_message,
  searchs,
} from "@/apis/api";
import { Message } from "@arco-design/web-vue";
import { check_vip_type } from "~/utils/util";
import { storeToRefs } from "pinia";
import { useAiChat } from "../models";
import DefaultAvatar from "~/assets/images/robot.png";

const router = useRouter();
const token = useCookie("token");
const counter = useCounter();
const aiChatStore = useAiChat();
const { ms_active, me_message, ms_count, send_loading } =
  storeToRefs(aiChatStore);
const { check_message, stop_stream } = aiChatStore;

const chat_open = ref(true);
const left_loding = ref(false);
const data_load = ref(false);
const page = ref(1);
const limit = ref(9);
// const ms_count = ref(0);
const messages = ref([]) as any;
const m_last = ref({}) as any;
// const ms_active = ref(0)
// const me_message = ref([]) as any
// const loadins = ref(false);
const qs_input = ref("");
const beizhu_info = ref(false);
const beizhu = ref("");
const user_info = ref({}) as any;
const total_msg = ref(0);
const total_draw = ref(0);
const vip_level = ref("free");
const vip_type = ref("free");
const last_msg = ref(0);
const last_draw = ref(0);

const quit_out = () => {
  token.value = "";
  router.go(0);
};
const dialogFormVisible = ref(false);
const charge = () => {
  dialogFormVisible.value = true;
};

const handle_send = () => {
  if (!beizhu.value) {
    Message.warning("请输入内容");
    return true;
  }
  change_session_name(ms_active.value, beizhu.value);
  beizhu.value = "";
};
const change_session_name = (session_id: any, name: any) => {
  c_session_name({
    session_id: session_id,
    session_name: name,
  })
    .then((res: any) => {
      Message.success(res.message);
      all_message();
    })
    .catch((err: any) => {
      Message.error(err.message);
    });
};

const qs_search = () => {
  if (!qs_input.value) {
    Message.warning("请输入内容");
    return;
  }
  searchs({
    search: qs_input.value,
    page: page.value,
    limit: limit.value,
  })
    .then((res: any) => {
      messages.value = res.data;
      ms_count.value = res.count;
      Message.success("搜索完成");
    })
    .catch((err: any) => {
      Message.error(err.message);
    });
};

// api 请求左侧列表
const all_message = () => {
  left_loding.value = true;
  data_load.value = true;
  get_message({
    page: page.value,
    limit: limit.value,
  })
    .then((res: any) => {
      messages.value = res.data;
      // m_last.value = res.m_last;
      ms_count.value = res.count;
      // max_session.value = res.max_session;
    })
    .catch((err: any) => {
      console.log(err);
    })
    .finally(() => {
      data_load.value = false;
      left_loding.value = false;
    });
};

const onClickMessage = (id: number) => {
  // 若有正在发送的请求则取消
  if (send_loading.value) {
    stop_stream();
    all_message();
  }
  check_message(id);
};

const add_new_chat = () => {
  add_chat()
    .then((res: any) => {
      all_message();
      check_message(res.data);
    })
    .catch((err: any) => {
      Message.error(err);
    });
};

const delete_msg = (id: number) => {
  del_msg({
    session_id: id,
  })
    .then((res: any) => {
      Message.success(res.message);
      all_message();
      ms_active.value = 0;
      me_message.value = [];
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const delete_all = () => {
  del_all()
    .then((res: any) => {
      Message.success(res.message);
      all_message();
      ms_active.value = 0;
      me_message.value = [];
    })
    .catch((err: any) => {
      console.log(err);
    });
  return true;
};

const handleCurrentChange = (val: number) => {
  left_loding.value = true;
  if (qs_input.value) {
    searchs({
      search: qs_input.value,
      page: val,
      limit: limit.value,
    })
      .then((res: any) => {
        page.value = val;
        messages.value = res.data;
        ms_count.value = res.count;
        left_loding.value = false;
        Message.success("搜索完成");
      })
      .catch((err: any) => {
        Message.error(err.message);
        left_loding.value = false;
      });
  } else {
    get_message({
      page: val,
      limit: limit,
    })
      .then((res: any) => {
        page.value = val;
        messages.value = res.data;
        ms_count.value = res.count;
        left_loding.value = false;
      })
      .catch((err: any) => {
        left_loding.value = false;
        console.log(err);
      });
  }
};

const change_sname = (id: number) => {
  beizhu_info.value = true;
  ms_active.value = id;
};

defineExpose({
  all_message,
});
</script>
