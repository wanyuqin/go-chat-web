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
                                {{ domain.question }}？
                                <el-divider />
                                <div>
                                    <text v-for="(as,asIndex) in domain.answer" :key="asIndex">
                                        {{as}}
                                    </text>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-main>
                    <el-footer>
                        <el-form :model="questionForm">
                            <el-form-item label="">
                                <el-input v-model="questionForm.content" placeholder="Please input" type="textarea" />
                                <el-button type="primary" @click="onSubmit">Query</el-button>
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
import request from "@/js/request";
import axios from "axios";
import { ElNotification } from "element-plus";

const socket = new WebSocket("ws://127.0.0.1:8081/v1/conversation");
const dynamicValidateForm = reactive({
    domains: [],
    email: "",
});
const inputList = ref([]);

const questionForm = ref({
    content: "",
});

const onSubmit = () => {
    // inputList.value.push({ name: `输入框${inputList.value.length + 1}`, id: `input-${inputList.value.length + 1}` });

    // inputList.value.push(question);
    // inputList.value.push("AI 回答中....");
    socket.send(questionForm.value.content);
    dynamicValidateForm.domains.push({
        question: questionForm.value.content,
        answer: [],
    });
};

const getMessage = () => {
    socket.onmessage = function (e) {
        console.log(e.data);
        console.log();
        dynamicValidateForm.domains[
            dynamicValidateForm.domains.length - 1
        ].answer.push(e.data);
    };
};

const onOpen = () => {
    socket.onopen = function (e) {
        ElNotification({
            title: "Socket",
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
</style>