<template>
    <div class="common-layout">
        <el-container>
            <el-header></el-header>
            <el-container>
                <el-aside width="200px"></el-aside>
                <el-container>
                    <el-main>
                        <!-- <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                            <li v-for="i in inputList" :key="i" class="infinite-list-item">{{ i }}</li>
                        </ul> -->
                        <div v-for="(input) in inputList" :key="input.id">
                            <el-text>{{ input }}</el-text>
                            <br>
                        </div>
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
import { ref } from "vue";
import request from "@/js/request";

const inputList = ref([]);

// const count = ref(10);
// // const load = () => {
// //     count.value += 2;
// // };

const questionForm = ref({
    content: "",
});

const onSubmit = () => {
    // inputList.value.push({ name: `输入框${inputList.value.length + 1}`, id: `input-${inputList.value.length + 1}` });
    const question= "问：" + questionForm.value.content
    inputList.value.push(question);
    inputList.value.push("AI 回答中....");

    
    request
        .post("http://localhost:8081/v1/question", questionForm.value)
        .then((response) => {
            const answer ="答："+response.data
            inputList.value.push(answer);
        })
        .catch((error) => {
            console.error(error);
        });
};
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