<template>
    <template v-if="props.hasChild">
        <component :is="props.isOpen ? ChevronDown : ChevronRight" class="w-4 h-4" />
    </template>
    <template v-else>
        <div class="w-4 h-4" />
    </template>
    <component :is="Folder" class="w-4 h-4" />
</template>

<script setup lang="ts">
import { ChevronDown, ChevronRight, Folder } from "lucide-vue-next";

const props = defineProps({
    hasChild: {
        type: Boolean,
    },
    isOpen: {
        type: Boolean,
    },
});
</script>