<template>
    <canvas ref="canvas" class="bubble-canvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, PropType } from 'vue';

interface BubbleType {
    x: number;
    y: number;
    radius: number;
    speed: number;
    reset: () => void;
    update: () => void;
}

export default defineComponent({
    name: "BubbleBackground",
    props: {
        bubbleCount: {
            type: Number,
            default: 20
        },
        radiusMin: {
            type: Number,
            default: 10,
        },
        radiusMax: {
            type: Number,
            default: 30,
        },
        speedMin: {
            type: Number,
            default: 0.2,
        },
        speedMax: {
            type: Number,
            default: 0.6,
        },
    },
    setup(props) {
        const canvas = ref<HTMLCanvasElement | null>(null);
        let ctx: CanvasRenderingContext2D | null = null;
        let width: number;
        let height: number;
        const bubbles: BubbleType[] = [];

        const resize = () => {
            if (!canvas.value) return;
            width = canvas.value.width = window.innerWidth;
            height = canvas.value.height = window.innerHeight;
            canvas.value.style.width = '100vw';
            canvas.value.style.height = '100vh';
        };

        class Bubble implements BubbleType {
            x = 0;
            y = 0;
            radius = 0;
            speed = 0;

            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.radius =
                    Math.random() * (props.radiusMax - props.radiusMin) + props.radiusMin;
                this.speed =
                    Math.random() * (props.speedMax - props.speedMin) + props.speedMin;

            }

            update() {
                this.y -= this.speed;
                if (this.y + this.radius < 0) {
                    this.reset();
                }
            }
        }

        const drawMetaballs = () => {
            if (!ctx) return;
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;
            const threshold = 1;

            for (let y = 0; y < height; y += 4) {
                for (let x = 0; x < width; x += 4) {
                    let sum = 0;
                    for (const bubble of bubbles) {
                        const dx = x - bubble.x;
                        const dy = y - bubble.y;
                        const distSq = dx * dx + dy * dy;
                        sum += (bubble.radius * bubble.radius) / (distSq + 1);
                    }

                    if (sum > threshold) {
                        const index = (y * width + x) * 4;
                        data[index] = 255;
                        data[index + 1] = 255;
                        data[index + 2] = 255;
                        data[index + 3] = Math.min(255, sum * 25);
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0);
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            for (const bubble of bubbles) {
                bubble.update();
            }
            drawMetaballs();
            requestAnimationFrame(animate);
        };

        onMounted(() => {
            if (!canvas.value) return;
            ctx = canvas.value.getContext('2d');
            if (!ctx) return;
            window.addEventListener('resize', resize);
            resize();

            for (let i = 0; i < props.bubbleCount; i++) {
                bubbles.push(new Bubble());
            }

            animate();
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', resize);
        });

        return {
            canvas
        };
    }
});
</script>