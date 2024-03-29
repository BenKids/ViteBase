<script setup lang="ts">
const stores = system();
let {lock} = pinia.storeToRefs(stores);
const {avatar} = pinia.storeToRefs(user());
const avatarSize = ref<number>(70);
let time = ref<string>("00:00:00");
let timeInter = setInterval(() => updateTime(), 1000)

function updateTime() {
    time.value = evDateFormat({
        date: new Date(),
        fmt: "hh:mm:ss"
    })
}

function onMouseEnter() {
    avatarSize.value = 80;
}

function onMouseLeave() {
    avatarSize.value = 70;
}

function unlock() {
    lock.value = false;
    router.back();
}
onMounted(() => updateTime());
onUnmounted(() => clearInterval(timeInter));
</script>

<template>
    <base-lock>
        <div class="clock">{{ time }}</div>
        <base-avatar v-model="avatar" :sets="{ size: avatarSize }" @click="unlock" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave"></base-avatar>
        <div class="spinner">
            <div class="ball-scale-multiple">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </base-lock>
</template>

<style scoped>
.clock {
    position: absolute;
    font: bold 300px "Bebas Neue";
    text-align: center;
    pointer-events: none;
    z-index: -1;
    opacity: .35;
    letter-spacing: var(--base-gap);
}

.base-lock :deep(.lock-box) {
    flex-direction: column;
}

.base-lock :deep(.base-avatar) {
    box-shadow: var(--base-shadow-avatar);
    cursor: pointer;
    transition: all .15s ease-in;
}

.spinner {
    width: 120px;
    height: 120px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -60px;
    margin-left: -60px;
    z-index: -2;
    transition: all .15s ease-in;
}

.base-avatar:hover ~ .spinner {
    width: 160px;
    height: 160px;
    margin-top: -80px;
    margin-left: -80px;
}

.ball-scale-multiple {
    position: relative;
    width: 100%;
    height: 100%;
}

.ball-scale-multiple > div {
    background-color: #ffffff;
    border-radius: 100%;
}

.ball-scale-multiple > div:nth-child(2) {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
}

.ball-scale-multiple > div:nth-child(3) {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
}

.ball-scale-multiple > div {
    position: absolute;
    top: 0;
    opacity: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    animation: ball-scale-multiple 1s 0s linear infinite;
}

@keyframes ball-scale-multiple {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    5% {
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>
