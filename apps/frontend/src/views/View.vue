<template>
    <div>
        <DialogAddSubFolder />
        <DialogAddFile />
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Tanggal Modifikasi</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Ukuran</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="folder in folderStore.curentFolder?.childs" :key="folder.id" @click="folderStore.redirectTo(folder.id)" class="cursor-pointer">
                <TableCell class="font-medium">{{ folder.name }}</TableCell>
                <TableCell>{{ folder.updatedAt }}</TableCell>
                <TableCell>folder</TableCell>
                <TableCell></TableCell>
            </TableRow>
            <TableRow v-for="file in fileStore.getFiles" :key="file.id" @click="" class="cursor-pointer">
                <TableCell class="font-medium">{{ file.name }}</TableCell>
                <TableCell>{{ file.updatedAt }}</TableCell>
                <TableCell>{{ file.mimeType }}</TableCell>
                <TableCell>{{ file.size }} Kb</TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>

<script setup lang="ts">
import { useFileStore } from '@/store/fileStore';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useFolderStore } from '@/store/folderStore';
import DialogAddSubFolder from '@/components/DialogAddSubFolder.vue';
import DialogAddFile from '@/components/DialogAddFile.vue';

const folderStore = useFolderStore();
const fileStore = useFileStore();
</script>