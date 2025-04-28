<template>
    <div>
        <SidebarProvider v-model:open="open" style="--sidebar-width: 20rem; --sidebar-width-mobile: 20rem;">
            <AppSidebar />
            <SidebarInset>
                <header
                    class="flex bg-sidebar h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div class="flex w-full items-center justify-between px-4">
                        <div class="flex items-center gap-2">
                            <SidebarTrigger class="-ml-1" />
                            <Breadcrumb />
                        </div>
                        <div class="w-[200px]">
                            <Search />
                        </div>
                    </div>
                </header>
                <Separator />
                <main>
                    <div class="flex flex-1 flex-col gap-4 p-4">
                        <View />
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    </div>
</template>

<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ref } from "vue";
import SidebarInset from "@/components/ui/sidebar/SidebarInset.vue";
import AppSidebar from "@/components/sidebar/AppSidebar.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import View from "@/views/View.vue";
import Search from "@/components/Search.vue";
import Separator from "@/components/ui/separator/Separator.vue";
import DialogAddSubFolder from "@/components/DialogAddSubFolder.vue";


const open = ref(true);
</script>