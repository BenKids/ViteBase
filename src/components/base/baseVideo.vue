<script setup lang="ts">
withDefaults(
    defineProps<{
        modelValue: TsVideo.Model;
        sets?: TsVideo.Sets;
    }>(),
    {
        sets: () => {
            return {}
        }
    }
)
const emits = defineEmits(["play","pause","seeking","fullscreen","volume","volumeCross"])
const videoRef = ref();
const iconPlay = markRaw(IconSolarPlayCircleLinear);
const iconPause = markRaw(IconSolarPauseCircleLinear);
const iconFullscreen = markRaw(IconSolarMaximizeSquareMinimalisticLinear);
const iconVolume = markRaw(IconSolarVolumeLoudLinear);
const iconVolumeCross = markRaw(IconSolarVolumeCrossLinear);
let isPlay = ref<boolean>(false);
let isInput = ref<boolean>(false);
let isEnd = ref<boolean>(false);
let timeTotal = ref<number>(100);
let timeCurr = ref<number>(0);
let timeupdate = ref<number>(0.1);
let volume = ref<number>(50);
onMounted(()=>{
    videoRef.value.volume = 0.5;
    volume.value = videoRef.value.volume * 100;
    videoRef.value.onloadedmetadata = function() {
        timeTotal.value = Math.trunc(videoRef.value.duration);
    }
    videoRef.value.onended = function() {
        isPlay.value = false;
        isEnd.value = false;
    }
    videoRef.value.ontimeupdate = function() {
        timeupdate.value = videoRef.value.currentTime - timeCurr.value;
        timeCurr.value = Math.trunc(videoRef.value.currentTime);
    }
    videoRef.value.onseeking = function() {
        timeCurr.value = Math.trunc(videoRef.value.currentTime);
        emits("seeking");
    }
    videoRef.value.onplay = function() {
        isPlay.value = true;
        emits("play");
    }
    videoRef.value.onpause = function() {
        isPlay.value = false;
        emits("pause");
    }
    videoRef.value.onvolumechange =  function() {
        emits("volume",volume.value)
    }
})
//handle 格式转换
function onFormat(time:number):string {
    let minute:number | string = Math.trunc(time / 60);
    if(minute < 10) minute = "0" + minute;
    let second:number | string = time % 60;
    if(second < 10) second = "0" + second;
    return minute + ":" + second;
}
//handle 播放
function onPlay() {
    videoRef.value.play();
    isPlay.value = true;
    isInput.value = false;
    if(isEnd.value) timeCurr.value = 0;
}
//handle 暂停
function onPause() {
    videoRef.value.pause();
    isPlay.value = false;
}
//handle 格式化提示信息
function formatTooltip(val:number) {
    return onFormat(val);
}
//handle 进度条拖动
function onSlider(val:number) {
    videoRef.value.currentTime = val;
    isInput.value = true;
}
//handle 全屏
function onFullscreen() {
    videoRef.value.requestFullscreen();
    emits("fullscreen")
}
//handle 静音
function onVolume() {
    if(volume.value === 0) return;
    volume.value = 0;
    videoRef.value.muted = true;
    emits("volumeCross");
}
//handle 调节音量
function onVolumeChange() {
    videoRef.value.muted = volume.value === 0;
    videoRef.value.volume = volume.value / 100;
}
</script>
<template>
    <div class="base-video" :style="'--base-video-timeupdate:'+timeupdate+'s'">
        <video :src="modelValue" ref="videoRef" class="base-video-ref" :style="sets.height ? 'height:'+sets.height+'px;' : ''"></video>
        <div class="base-video-controls">
            <base-icons :icon="iconPlay" class="base-video-icon base-video-play" @click="onPlay" v-if="!isPlay"/>
            <base-icons :icon="iconPause" class="base-video-icon base-video-pause" @click="onPause" v-else-if="isPlay"/>
            <el-slider v-model="timeCurr" :max="timeTotal" :format-tooltip="formatTooltip" @input="onSlider" :class="'base-video-progress ' + (isInput ? 'is-input' : '')" />
            <div class="base-video-times">{{ onFormat(timeCurr) + "/" + onFormat(timeTotal) }}</div>
            <base-icons :icon="volume === 0 ? iconVolumeCross : iconVolume" class="base-video-icon" @click="onVolume"></base-icons>
            <el-slider v-model="volume" :max="100" class="base-video-volume" @change="onVolumeChange"></el-slider>
            <base-icons :icon="iconFullscreen" class="base-video-icon base-video-fullscreen" @click="onFullscreen"></base-icons>
        </div>
    </div>
</template>
<style scoped>
.base-video {
    position: relative;
    background-color: var(--base-bgc-gray);
    overflow: hidden;
    --base-video-timeupdate: 0.1s;
}
.base-video-ref {
    display: block;
    height: 240px;
    width: 100%;
    object-fit: contain;
}
.base-video .base-video-controls {
    display: flex;
    padding: 0 10px;
    position: absolute;
    left: 0;
    bottom: -32px;
    width: 100%;
    align-items: center;
    background-color: rgba(0,0,0,0.4);
    transition: opacity 0.5s, bottom 0.5s;
    opacity: 0;
    transition-delay: 0.6s;
}
.base-video:hover .base-video-controls {
    opacity: 1;
    bottom: 0;
    transition-delay: 0s;
}
.base-video-icon {
    cursor: pointer;
    color: var(--base-color-white);
    font-size: 18px;
}
.base-video-times {
    font-size: var(--el-text-font-size);
    color: var(--base-color-white);
    margin-right: 10px;
}
.base-video .base-video-progress {
    padding: 0 20px;
}
.base-video :deep(.base-video-progress .el-slider__bar) {
    transition: width var(--base-video-timeupdate) linear;
}
.base-video :deep(.base-video-progress .el-slider__button-wrapper) {
    transition: left var(--base-video-timeupdate) linear;
}
.base-video:hover :deep(.base-video-progress.is-input .el-slider__bar),
.base-video:hover :deep(.base-video-progress.is-input .el-slider__button-wrapper) {
    transition: none;
}
.base-video-volume {
    width: 100px;
    padding: 0 20px 0 10px;
}
</style>