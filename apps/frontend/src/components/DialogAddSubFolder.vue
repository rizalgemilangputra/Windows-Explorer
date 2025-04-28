<template>
    <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formCreateFolderSchema">
        <Dialog v-model:open="isOpenDialog">
            <DialogTrigger as-child>
                <Button variant="outline" :disabled="!folderStore.curentFolder" class="cursor-pointer">
                    Tambah Folder
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
                <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
                    <FormField v-slot="{ componentField }" name="name">
                        <FormItem>
                            <FormLabel>Nama Folder</FormLabel>
                            <FormControl>
                                <Input type="text" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </form>

                <DialogFooter>
                    <Button type="submit" form="dialogForm">
                        Simpan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </Form>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formCreateFolderSchema } from '@/schema/folderSchema';
import { useFolderStore } from '@/store/folderStore';
import { Plus } from 'lucide-vue-next';
import { ref } from 'vue';

const folderStore = useFolderStore();

const isOpenDialog = ref(false);

function onSubmit(values: any) {
    isOpenDialog.value = false;
    const parentId = folderStore.curentFolder?.id ?? null;
    folderStore.createFolder(parentId, values.name);
}
</script>