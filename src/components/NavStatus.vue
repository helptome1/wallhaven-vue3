<template>
    <div>
        <div class="title-opt">
            <div>
                <el-icon class="min">
                    <semi-select />
                </el-icon>
                <el-icon class="close" @click="closeWindow">
                    <close-bold />
                </el-icon>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { CloseBold, SemiSelect } from "@element-plus/icons-vue";
const closeWindow = () => {
    /**
     * 
     */
    // window.icp.send("close")
}
</script>
<style lang="less" scoped>
.title-opt {
    position: absolute;
    right: 0;
    margin-right: 20px;
    top: -4px;
    color: gray;
    font-size: 18px;
    .min {
        margin-right: 15px;
    }
    .el-icon:hover {
        color: #fff;
    }
}
</style>