<template>
    <div class="content-wrap">
        <slot />
    </div>
</template>

<style lang="postcss">
.content-wrap {
    @apply flex flex-col;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ContentWrap",
});
</script>
