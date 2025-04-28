<template>
    <Sidebar>
        <SidebarHeader>
            <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formCreateFolderSchema">
                <Dialog v-model:open="isOpenDialog">
                    <DialogTrigger as-child>
                        <Button variant="outline">
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
                                        <Input type="text" placeholder="shadcn" v-bind="componentField" />
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
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuRecursive :folders="folders.folders" />
                    </SidebarMenu>
                </SidebarGroupContent>

            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
</template>

<script setup lang="ts">
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
} from "@/components/ui/sidebar"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import SidebarHeader from "@/components/ui/sidebar/SidebarHeader.vue";
import SidebarMenuRecursive from "@/components/sidebar/SidebarMenuRecursive.vue";
import { Input } from '@/components/ui/input'
import { useFolderStore } from "@/store/folderStore";
import { onMounted, ref } from "vue";
import { Plus } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { formCreateFolderSchema } from "@/schema/folderSchema";

const isOpenDialog = ref(false);

const folders = useFolderStore();

onMounted(() => {
    folders.fetchParentFolders();
});

function onSubmit(values: any) {
    isOpenDialog.value = false;
    folders.createFolder(null, values.name);
}

</script>
