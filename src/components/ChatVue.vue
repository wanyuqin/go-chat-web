<template>
    <div class="common-layout">
        <el-container>
            <el-header></el-header>
            <el-container>
                <el-aside width="200px"></el-aside>
                <el-container>
                    <el-main>
                        <el-form ref="formRef" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
                            <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key" :label="'问题' + (index+1)" :prop="'domains.' + index + '.value'" :rules="{
      }">
                                {{ domain.question }}
                                <!-- <el-divider></el-divider> -->
                                <div class="divider"></div>
                                <div class="answer-div">
                                    <text v-for="(as,asIndex) in domain.answer" :key="asIndex">
                                        {{as}}
                                    </text>
                                </div>
                                <div class="divider"></div>
                            </el-form-item>
                        </el-form>
                    </el-main>
                    <el-footer>
                        <el-form :model="questionForm">
                            <el-form-item label="">
                                <el-input class="conversion-input" v-model="questionForm.content" placeholder="输入内容...." type="textarea" />
                                <div class="divider"></div>
                                <el-button class="conversion-btn" type="primary" @click="onSubmit">发送</el-button>
                            </el-form-item>
                        </el-form>

                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
  

  <script  setup>
import { onMounted, ref, reactive } from "vue";

import { ElNotification } from "element-plus";
const socket = new WebSocket("ws://127.0.0.1:8081/v1/conversation");
const dynamicValidateForm = reactive({
    domains: [],
    email: "",
});

const questionMessage = ref([]);
const questionForm = ref({
    content: "",
});

const onSubmit = () => {
    // inputList.value.push({ name: `输入框${inputList.value.length + 1}`, id: `input-${inputList.value.length + 1}` });

    // inputList.value.push(question);
    // inputList.value.push("AI 回答中....");
    const message = {
        role: "user",
        content: questionForm.value.content,
    };

    questionMessage.value.push(message);
    const pb = JSON.stringify(questionMessage.value);
    console.log(pb);
    socket.send(pb);
    dynamicValidateForm.domains.push({
        question: questionForm.value.content,
        answer: [],
    });
};

const getMessage = () => {
    socket.onmessage = function (e) {
        console.log(e.data);
        dynamicValidateForm.domains[
            dynamicValidateForm.domains.length - 1
        ].answer.push(e.data);
    };
};

const onOpen = () => {
    socket.onopen = function (e) {
        ElNotification({
            title: "go-chat",
            message: "已连接",
        });
    };
};

onMounted(() => {
    getMessage();
    onOpen();
});
</script>


<style>
.answer-div {
    --tw-text-opacity: 1;
    --tw-bg-opacity: 1;
    background-color: rgba(247, 247, 248, var(--tw-bg-opacity));
    width: 100%;
    min-height: 100px;
    height: auto;
    padding-left: 10px;
    border-radius: 10px;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.23);

}

.answer-div p {
    padding: 20px;
    max-width: 100%;
}
.infinite-list {
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
}
.infinite-list .infinite-list-item {
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: right;
    height: 50px;
    margin: 10px;
}
.infinite-list .infinite-list-item + .list-item {
    margin-top: 10px;
}

.divider {
    display: block;
    height: 1px;
    width: 100%;
}

.conversion-input {
    border: none;
    background-color: #eee;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.23);
    border-radius: 10px;
    float: left; /* 左浮动 */
}

.conversion-btn {
    display: inline-block;
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 5px;
}
.el-textarea__inner {
    resize: none !important;
    height: auto !important;
    min-height: 45px !important;
    box-sizing: border-box !important;
}
</style>