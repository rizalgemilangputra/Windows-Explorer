<template>
    <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formStoreFileSchema">
        <Dialog v-model:open="isOpenDialog">
            <DialogTrigger as-child>
                <Button variant="outline" :disabled="!folderStore.curentFolder" class="cursor-pointer">
                    Tambah File
                    <Plus />
                </Button>
            </DialogTrigger>

            <DialogContent class="sm:max-w-[425px]">
                <form id="fileUpload" @submit="handleSubmit($event, onSubmit)">
                    <FormField name="file" v-slot="{ field, meta, setValue }">
                        <FormItem>
                            <FormLabel>File</FormLabel>
                            <FormControl>
                                <Input type="file" placeholder="shadcn" @change="e => setValue(e.target.files[0])" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </form>

                <DialogFooter>
                    <Button type="submit" form="fileUpload">
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
import { formStoreFileSchema } from '@/schema/fileSchema';
import { useFileStore } from '@/store/fileStore';
import { useFolderStore } from '@/store/folderStore';
import { Plus } from 'lucide-vue-next';
import { ref } from 'vue';

const folderStore = useFolderStore();
const fileStore = useFileStore();

const isOpenDialog = ref(false);

function onSubmit(values: any) {
    isOpenDialog.value = false;
    const currentFolderId = folderStore.curentFolder?.id ?? null;
    fileStore.storeFile(currentFolderId, values.file);
}
</script>