// src/composables/useActivityMonitor.ts
import { ref, onMounted, onUnmounted } from "vue";

export function useActivityMonitor() {
    // --- 状态 ---
    const isTabHidden = ref(false); // 页面是否被切走
    const isIdle = ref(false);      // 用户是否长时间无操作
    const lastActiveTime = ref(Date.now()); // 最后一次操作时间

    // 配置：判定发呆的阈值 (例如 60秒无操作)
    const IDLE_THRESHOLD = 6 * 1000;

    let idleTimer: number | undefined;

    // --- 1. 更新活跃状态 ---
    const updateActivity = () => {
        lastActiveTime.value = Date.now();
        if (isIdle.value) {
            isIdle.value = false;
            // 这里可以扩展：当用户从发呆中回来时，记录一下
        }
    };

    // --- 2. 检查发呆定时器 ---
    const checkIdle = () => {
        const now = Date.now();
        if (now - lastActiveTime.value > IDLE_THRESHOLD) {
            isIdle.value = true;
        }
    };

    // --- 3. 页面可见性处理 ---
    const handleVisibilityChange = () => {
        isTabHidden.value = document.hidden;
        if (!document.hidden) {
            updateActivity(); // 切回来算一次活跃
        }
    };

    // --- 生命周期 ---
    onMounted(() => {
        // 监听切屏
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // 监听活跃行为 (防抖由浏览器自身事件频率决定，这里简单处理即可)
        window.addEventListener("mousemove", updateActivity);
        window.addEventListener("keydown", updateActivity);
        window.addEventListener("scroll", updateActivity);
        window.addEventListener("click", updateActivity);

        // 启动发呆检测轮询 (每5秒检查一次即可)
        idleTimer = window.setInterval(checkIdle, 5000);
    });

    onUnmounted(() => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("mousemove", updateActivity);
        window.removeEventListener("keydown", updateActivity);
        window.removeEventListener("scroll", updateActivity);
        window.removeEventListener("click", updateActivity);

        if (idleTimer) clearInterval(idleTimer);
    });

    return {
        isTabHidden,
        isIdle,
        lastActiveTime,
    };
}