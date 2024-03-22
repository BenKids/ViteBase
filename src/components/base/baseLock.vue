<script setup lang="ts">
let leafs = ref<number[]>([]);
const setLeafs = () => {
    leafs.value = [];
    let num = Math.ceil(document.body.clientWidth / 50);
    for (let index = 0; index < num; index++) {
        leafs.value.push(index * 50)
    }
}
onMounted(() => {
    setLeafs();
    window.addEventListener("resize", () => {
        setLeafs();
    })
})
</script>

<template>
    <div class="base-lock">
        <!--Hey! This is the original versionof Simple CSS Waves-->
        <div class="lock-box ">
            <div class="lock-box-content"><slot></slot></div>
            <!--Waves Container-->
            <svg class="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
            </svg>
            <svg class="leaf-box" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="leaf" d="M0 0 5 60" fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" />
                </defs>
                <g class="leaf">
                    <use v-for="(item, index) in leafs" :key="index" xlink:href="#leaf" :x="item" y="0" />
                </g>
            </svg>
            <!--Waves end-->
        </div>
        <!--Header ends-->
    </div>
</template>
<style scoped>
.base-lock {
    position: fixed;
    z-index: 110;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.base-lock .lock-box {
    position: relative;
    background: linear-gradient(60deg,
            rgba(84, 58, 183, 1) 0%,
            rgba(0, 172, 193, 1) 100%);
    color: white;
    width: 100%;
    height: 100%;
    z-index: -3;
}
.base-lock .lock-box-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.base-lock .leaf-box {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
}

.base-lock .leaf>use {
    /* animation: move-leaf 0.5s cubic-bezier(0.8, 0.6, 0.4, 0.2) infinite; */
    animation: move-leaf 0.5s linear infinite;
    animation-delay: -0.1s;
}

.base-lock .leaf>use:nth-child(2n) {
    animation-delay: -0.5s;
}

.base-lock .leaf>use:nth-child(3n) {
    animation-delay: -0.8s;
}

.base-lock .leaf>use:nth-child(4n) {
    animation-delay: -0.3s;
    opacity: 0.85;
    animation-duration: 0.8s;
}

.base-lock .leaf>use:nth-child(5n) {
    animation-delay: -0.6s;
    opacity: 0.45;
    animation-duration: 1.5s;
}

.base-lock .leaf>use:nth-child(6n) {
    animation-delay: -0.2s;
}

.base-lock .leaf>use:nth-child(7n) {
    animation-delay: -0.7s;
    animation-duration: 1.2s;
}

.base-lock .leaf>use:nth-child(8n) {
    animation-delay: -0.4s;
}

.base-lock .leaf>use:nth-child(9n) {
    animation-delay: -0.9s;
}

.base-lock .leaf>use:nth-child(10n) {
    animation-delay: -1s;
}

.base-lock .leaf>use:nth-child(29n),
.base-lock .leaf>use:nth-child(13n),
.base-lock .leaf>use:nth-child(61n),
.base-lock .leaf>use:nth-child(43n),
.base-lock .leaf>use:nth-child(17n) {
    animation-delay: -0.2s;
}

.base-lock .waves {
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 15vh;
    margin-bottom: -7px;
    /*Fix for safari gap*/
    min-height: 100px;
    max-height: 150px;
    z-index: -2;
}

/* Animation */

.base-lock .parallax>use {
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.base-lock .parallax>use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
}

.base-lock .parallax>use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
}

.base-lock .parallax>use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
}

.base-lock .parallax>use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
}

@keyframes move-forever {
    0% {
        transform: translate3d(-90px, 0, 0);
    }

    100% {
        transform: translate3d(85px, 0, 0);
    }
}

@keyframes move-leaf {
    0% {
        transform: translate3d(0, 0, 0);
    }

    100% {
        transform: translate3d(5%, 100%, 0);
    }
}

/*Shrinking for mobile*/
</style>