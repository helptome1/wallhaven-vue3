<template>
    <div>
        <div class="title-opt">
            <div>
                <el-icon class="min" :size="20" @click="SystemOpration('min')">
                    <semi-select />
                </el-icon>
                <el-icon class="max" :size="20" @click="SystemOpration('max')">
                    <full-screen />
                </el-icon>
                <el-icon class="close" :size="20" @click="SystemOpration('close')">
                    <close-bold />
                </el-icon>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { CloseBold, SemiSelect, FullScreen } from "@element-plus/icons-vue";
/**
 * 关闭应用
 */
type Oprate = 'min' | 'close' | 'max'
const SystemOpration = (type: Oprate) => {
    window.icp.send(type)
}
</script>
<style lang="less" scoped>
.title-opt {
    position: absolute;
    right: 0;
    margin-right: 20px;
    top: 5px;
    color: gray;
    font-size: 18px;
    .min,
    .max {
        margin-right: 25px;
        -webkit-app-region: no-drag;
    }
    .close {
        -webkit-app-region: no-drag;
    }
    .el-icon:hover {
        color: #fff;
    }
}
</style>