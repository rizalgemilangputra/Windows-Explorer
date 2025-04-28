<template>
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem v-for="(bread, index) in folderStore.breadcrumbs" :key="index">
                <template v-if="bread.parent">
                    <BreadcrumbLink @click="redirectTo(bread.folderId)" href="#" class="hidden md:block">
                        {{ bread.name }}
                    </BreadcrumbLink>

                    <BreadcrumbSeparator class="hidden md:block" />
                </template>

                <template v-else>
                    <BreadcrumbPage>{{ bread.name }}</BreadcrumbPage>
                </template>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
</template>

<script setup lang="ts">
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useFolderStore } from "@/store/folderStore";

const folderStore = useFolderStore();

function redirectTo(folderId: number) {
    folderStore.redirectTo(folderId);
}

</script>