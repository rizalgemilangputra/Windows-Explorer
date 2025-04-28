<template>
    <div class="relative w-full max-w-sm items-center">
        <Input v-model="search" @keydown.enter="onSearch" id="search" type="text" placeholder="Cari File" class="pl-10 bg-white" />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="size-6 text-muted-foreground" />
        </span>
    </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { useFileStore } from '@/store/fileStore';
import { Search } from 'lucide-vue-next'
import { ref } from 'vue';

const search = ref('');

const fileStore = useFileStore();

function onSearch() {
    fileStore.searchFiles(search.value);
}
</script>
