<template>
    <Collapsible v-model:open="folder.isOpen" as-child class="group/collapsible"
        v-for="(folder, index) in props.folders" :key="index">
        <SidebarMenuItem>

            <CollapsibleTrigger as-child>
                <SidebarMenuButton @click="openFolder(folder)" class="w-full" :is-active="folderStore.curentFolder?.id === folder.id">
                    <div class="flex items-center gap-2">
                        <SidebarIcon :hasChild="folder.hasChild" :isOpen="folder.isOpen" />
                        <span>{{ folder.name }}</span>
                    </div>
                </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent v-if="folder.hasChild">
                <SidebarMenuSub>
                    <SidebarMenuRecursive :folders="folder.childs" />
                </SidebarMenuSub>
            </CollapsibleContent>

        </SidebarMenuItem>
    </Collapsible>
</template>

<script setup lang="ts">
import Collapsible from "@/components/ui/collapsible/Collapsible.vue";
import CollapsibleTrigger from "@/components/ui/collapsible/CollapsibleTrigger.vue";
import CollapsibleContent from "@/components/ui/collapsible/CollapsibleContent.vue";
import SidebarMenuItem from "@/components/ui/sidebar/SidebarMenuItem.vue";
import SidebarMenuButton from "@/components/ui/sidebar/SidebarMenuButton.vue";
import SidebarMenuSub from "@/components/ui/sidebar/SidebarMenuSub.vue";
import SidebarIcon from "@/components/sidebar/SidebarIcon.vue";
import SidebarMenuRecursive from "@/components/sidebar/SidebarMenuRecursive.vue";
import { useFolderStore } from "@/store/folderStore";
import IFolder from "@/interface/folderInterface";

const props = defineProps({
    folders: {
        type: Object,
        required: true,
    },
});

const folderStore = useFolderStore();

function openFolder(folder: IFolder) {
    folderStore.redirectTo(folder.id);
}

</script>