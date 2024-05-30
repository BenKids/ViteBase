<script setup lang="ts">
// 图标
const iconServe = markRaw(IconSolarServer2Linear);
const iconCpu = markRaw(IconSolarCpuBoltLinear);
const iconMem = markRaw(IconSolarBugLinear);
const iconJava = markRaw(IconSolarServerPathLinear);
const iconDisk = markRaw(IconSolarBoxMinimalisticLinear);
// echarts实例
const echartsMemRef = ref();
const echartsJvmRef = ref();
//sets 进度条设置
const setsProgress: TsProgress.Sets = {
    strokeWidth: 14,
    color: [
        {
            color: "var(--base-color-success)",
            percentage: 30
        }, {
            color: "var(--base-color-warning)",
            percentage: 60
        }, {
            color: "var(--base-color-danger)",
            percentage: 90
        }
    ],
}
//sets 当前空闲率进度条设置
const setsFree: TsProgress.Sets = {
    strokeWidth: 14,
    color: [
        {
            color: "var(--base-color-success)",
            percentage: 90
        }, {
            color: "var(--base-color-warning)",
            percentage: 60
        }, {
            color: "var(--base-color-danger)",
            percentage: 30
        }
    ]
}
//sets 内存饼图设置
const setsPieMem = computed((): TsEchartsPie.Sets => {
    return {
        title: "内存",
        subTitle: "总内存：" + formData.value.mem.total + "G",
        radius: [20, 40],
        borderRadius: 5,
        labelFormatter: "{b}\n{c}G\n{d}%",
        color: ['#fac858', '#91cc75'],
        legendPosition: "bottom",
    }
})
//sets JVM饼图设置
const setsPieJvm = computed((): TsEchartsPie.Sets => {
    return {
        title: "JVM",
        subTitle: "总内存：" + formData.value.jvm.total + "M",
        radius: [20, 40],
        borderRadius: 5,
        labelFormatter: "{b}\n{c}M\n{d}%",
        color: ['#fac858', '#91cc75'],
        legendPosition: "bottom",
    }
})
//sets JAVA描述列表设置
const setsJava: TsDescriptions.Sets = {
    labelWidth: "110px",
    labelAlign: "center",
}
//options JAVA虚拟机信息配置
const optionsJava = computed((): TsDescriptions.Options<TsServe.DataJava> => {
    return [
        {
            label: "Java名称",
            prop: "name",
        }, {
            label: "Java版本",
            prop: "version",
        }, {
            label: "启动时间",
            prop: "startTime"
        }, {
            label: "运行时长",
            prop: "runTime",
        }, {
            label: "安装路径",
            prop: "home"
        }, {
            label: "项目路径",
            prop: "userDir",
        }, {
            label: "运行参数",
            prop: "inputArgs"
        }
    ]
})
//ref 加载状态
let loading = ref<boolean>(true);
//ref 内存数据
let dataMem = reactive<TsEchartsPie.Model>([]);
//ref JVM数据
let dataJvm = reactive<TsEchartsPie.Model>([])
//ref JAVA数据
let dataJava = computed((): TsServe.DataJava => {
    return {...formData.value.jvm, ...formData.value.sys};
})
//api 数据
const {data: formData, onSuccess} = apiServe.data();
onSuccess(res => {
    dataMem = [
        {
            label: "已用内存",
            value: res.data.mem.used,
        }, {
            label: "剩余内存",
            value: res.data.mem.free,
        }
    ]
    dataJvm = [
        {
            label: "已用内存",
            value: res.data.jvm.used,
        }, {
            label: "剩余内存",
            value: res.data.jvm.free,
        }
    ]
    loading.value = false;
    nextTick(() => {
        echartsMemRef.value.setOption();
        echartsJvmRef.value.setOption();
    })
})
</script>
<template>
    <div class="serve-box">
        <div class="serve-row">
            <div class="part serve">
                <div class="part-title">
                    <base-icons :icon="iconServe"></base-icons>
                    <span>服务器信息</span>
                </div>
                <div class="part-content">
                    <el-skeleton :loading="loading" animated :count="4">
                        <template #template>
                            <div class="skeleton-serve-item">
                                <el-skeleton-item variant="text" style="width:4em; height:20px;margin:5px 0;"></el-skeleton-item>
                                <el-skeleton-item variant="text" style="width: calc( 100% - var(--base-gap)); height: 24px;"></el-skeleton-item>
                            </div>
                        </template>
                        <template #default>
                            <base-statistic title="服务器名称" v-model="formData.sys.computerName"/>
                            <base-statistic title="操作系统" v-model="formData.sys.osName"/>
                            <base-statistic title="服务器IP" v-model="formData.sys.computerIp"/>
                            <base-statistic title="系统架构" v-model="formData.sys.osArch"/>
                        </template>
                    </el-skeleton>
                </div>
            </div>
        </div>
        <div class="serve-row">
            <div class="part cpu">
                <div class="part-title">
                    <base-icons :icon="iconCpu"></base-icons>
                    <span>CPU</span>
                </div>
                <div class="part-content">
                    <div class="part-cpu-left">
                        <el-skeleton :loading="loading" animated>
                            <template #template>
                                <div class="skeleton-cpu-left">
                                    <el-skeleton-item variant="text" class="cpu-value" style="width:2em;height: 40px;"></el-skeleton-item>
                                    <el-skeleton-item variant="text" class="cpu-label" style="width:4em;"></el-skeleton-item>
                                </div>
                            </template>
                            <template #default>
                                <div class="cpu-value">{{ formData["cpu"].cpuNum }}</div>
                                <div class="cpu-label">核心数</div>
                            </template>
                        </el-skeleton>
                    </div>
                    <div class="part-cpu-right">
                        <el-skeleton :loading="loading" annimated :count="3">
                            <template #template>
                                <div class="skeleton-cpu-right">
                                    <el-skeleton-item variant="text" style="height: 40px;margin: 15px 0;"></el-skeleton-item>
                                </div>
                            </template>
                            <template #default>
                                <div class="cpu-row">
                                    <div class="cpu-label">用户使用率</div>
                                    <div class="cpu-value">
                                        <base-progress v-model="formData.cpu.used" :sets="setsProgress"></base-progress>
                                    </div>
                                </div>
                                <div class="cpu-row">
                                    <div class="cpu-label">系统使用率</div>
                                    <div class="cpu-value">
                                        <base-progress v-model="formData.cpu.sys" :sets="setsProgress"></base-progress>
                                    </div>
                                </div>
                                <div class="cpu-row">
                                    <div class="cpu-label">当前空闲率</div>
                                    <div class="cpu-value">
                                        <base-progress v-model="formData.cpu.free" :sets="setsFree"></base-progress>
                                    </div>
                                </div>
                            </template>
                        </el-skeleton>
                    </div>
                </div>
            </div>
            <div class="part mem">
                <div class="part-title">
                    <base-icons :icon="iconMem"></base-icons>
                    <span>内存</span>
                </div>
                <div class="part-content">
                    <el-skeleton :loading="loading" animated :count="2">
                        <template #template>
                            <div class="skeleton-mem-item">
                                <el-skeleton-item variant="text" style="width: 40px;"></el-skeleton-item>
                                <el-skeleton-item variant="circle" style="width:80px;height:80px;"/>
                            </div>
                        </template>
                        <template #default>
                            <div class="echarts-box echarts-nc">
                                <base-echarts-pie v-model="dataMem" name="内存" ref="echartsMemRef" :sets="setsPieMem"></base-echarts-pie>
                            </div>
                            <div class="echarts-box echarts-jvm">
                                <base-echarts-pie v-model="dataJvm" name="JVM" ref="echartsJvmRef" :sets="setsPieJvm"></base-echarts-pie>
                            </div>
                        </template>
                    </el-skeleton>
                </div>
            </div>
        </div>
        <div class="serve-row">
            <div class="part java">
                <div class="part-title">
                    <base-icons :icon="iconJava"></base-icons>
                    <span>JAVA虚拟机信息</span>
                </div>
                <div class="part-content" v-loading="loading">
                    <base-descriptions v-model="dataJava" :options="optionsJava" :sets="setsJava"></base-descriptions>
                </div>
            </div>
        </div>
        <div class="serve-row">
            <div class="part disk">
                <div class="part-title">
                    <base-icons :icon="iconDisk"></base-icons>
                    <span>磁盘状态</span>
                </div>
                <div class="part-content" v-loading="loading">
                    <base-table v-model="formData.sysFiles" ref="tableRef" height="initial">
                        <base-table-column label="盘符路径" prop="dirName"></base-table-column>
                        <base-table-column label="文件系统" prop="sysTypeName"></base-table-column>
                        <base-table-column label="盘符类型" prop="typeName"></base-table-column>
                        <base-table-column label="总大小" prop="total"></base-table-column>
                        <base-table-column label="可用大小" prop="free"></base-table-column>
                        <base-table-column label="已用大小" prop="used"></base-table-column>
                        <base-table-column label="已用百分比" prop="usage">
                            <template #default="scope">{{ scope.row.usage }}%</template>
                        </base-table-column>
                    </base-table>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.serve-box {
    height: 100%;
}

.serve-row {
    display: flex;
    gap: var(--base-gap);
}

.serve-row + .serve-row {
    margin-top: var(--base-gap);
}

.part {
    flex: 1;
    padding: var(--base-gap);
    border-radius: var(--base-radius);
    box-shadow: var(--base-shadow-part);
    background-color: var(--base-bgc-white);
}

.part-title {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: var(--base-gap);
    margin-bottom: var(--base-gap);
    border-bottom: var(--base-border);
}

.part-title :deep(.base-icons) {
    margin-right: calc(var(--base-gap) / 2);
    top: 3px;
    color: var(--base-color-primary);
}

.part-content {
    height: calc(100% - 55px);
}

.part.cpu,
.part.mem {
    height: 300px;
}

.part.serve .part-content,
.part.cpu .part-content {
    display: flex;
}

.part.serve .part-content :deep(.el-statistic) {
    flex: 1;
    text-align: center;
    margin: calc(var(--base-gap) / 2) 0;
}

.part.cpu .part-cpu-left {
    width: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: var(--base-gap);
}

.part.cpu .part-cpu-left .cpu-value {
    font: bold 36px "Bebas Neue";
    margin-bottom: var(--base-gap);
    color: var(--base-color-primary);
}

.part.cpu .part-cpu-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    padding-bottom: var(--base-gap);
}

.part.mem .part-content {
    display: flex;
}

.part.mem .echarts-box {
    flex: 1;
    height: 100%;
}

.part.serve :deep(.el-skeleton) {
    display: flex;
}

.part.serve :deep(.el-skeleton .skeleton-serve-item) {
    flex: 1;
    text-align: center;
}

.part.cpu .skeleton-cpu-left {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.part.mem :deep(.el-skeleton) {
    display: flex;
    padding-bottom: 30px;
}

.part.mem .skeleton-mem-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--base-gap);
}
</style>