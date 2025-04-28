import type IBreadcrumbs from "@/interface/breadcrumbInterface";
import type IFolder from "@/interface/folderInterface";
import axios from "@/lib/axios";
import { defineStore } from "pinia";
import { useFileStore } from "./fileStore";

interface FolderState {
    folders: IFolder[];
    loading: boolean;
    curentFolder: IFolder | null;
    breadcrumbs: IBreadcrumbs[];
}

export const useFolderStore = defineStore('folder', {
    state: (): FolderState => ({
        folders: [],
        loading: false,
        curentFolder: null,
        breadcrumbs: [],
    }),

    actions: {
        async fetchParentFolders() {
            if (this.folders.length > 0) {
                return;
            }

            this.loading = true;

            try {
                const res = await axios.get<{ data: IFolder[] }>('/folders/parents');
                this.folders = res.data.data.map(folder => ({
                    ...folder,
                    isOpen: false,
                    childs: [],
                }));
            } catch (error) {
                console.error("Error fetching parent folders:", error);
            } finally {
                this.loading = false;
            }
        },

        async fetchChildFolders(folder: IFolder) {
            const parentFolder = this.findFolderById(this.folders, folder.id);

            if (parentFolder && parentFolder.childs.length > 0) {
                this.setBreadcrumbs(folder);

                // store files data in the file store
                const fileStore = useFileStore();
                if (fileStore.files[0]?.folderId !== folder.id) {
                    fileStore.fetchFiles(folder.id);
                }
                return;
            }

            this.loading = true;

            try {
                const resFolder = await axios.get<{ data: IFolder[] }>(`/folders/childs/${folder.id}`);
                const childFolders = resFolder.data.data.map(folder => ({
                    ...folder,
                    isOpen: false,
                    isActive: false,
                    childs: [],
                }));

                if (parentFolder) {
                    parentFolder.childs = childFolders;
                }

                // store files in the file store
                const fileStore = useFileStore();
                fileStore.fetchFiles(folder.id);

            } catch (error) {
                console.error("Error fetching child folders:", error);
            } finally {
                this.setBreadcrumbs(folder);
                this.loading = false;
            }
        },

        findFolderById(folders: IFolder[], id: number): IFolder | undefined {
            for (const folder of folders) {
                if (folder.id === id) {
                    return folder;
                }
                const found = this.findFolderById(folder.childs, id);
                if (found) {
                    return found;
                }
            }

            return undefined;
        },

        setBreadcrumbs(folder: IFolder) {
            this.breadcrumbs = [];
            let setFolder: IFolder | null = folder;

            while (setFolder) {
                if (setFolder.id !== this.curentFolder?.id) {
                    this.breadcrumbs.unshift({ name: setFolder.name, parent: true, folderId: setFolder.id });
                } else {
                    this.breadcrumbs.unshift({ name: setFolder.name, parent: false, folderId: setFolder.id });
                }
                setFolder = this.findFolderById(this.folders, setFolder.parentId || 0) || null;
            }
        },

        redirectTo(folderId: number) {
            const folder = this.findFolderById(this.folders, folderId);
            if (folder) {
                if (this.curentFolder?.id === folder.id) {
                    this.curentFolder = folder;
                    return;
                }
                this.curentFolder = folder;
                this.fetchChildFolders(folder);
            }
        },

        async createFolder(parentId: number | null, name: string) {
            this.loading = true;

            try {

                const payload = {
                    parentId: parentId,
                    name: name
                }

                const res = await axios.post<{ data: IFolder[] }>('/folders', payload);
                const newFolder = res.data.data[0];

                if (parentId === null) {
                    this.folders.push({ ...newFolder, isOpen: false, isActive: false, childs: [] })
                } else {
                    const parent = this.findFolderById(this.folders, parentId);
                    if (parent) {
                        parent.childs.push({ ...newFolder, isOpen: false, isActive: false, childs: [] })
                    }
                }

            } catch (error) {
                console.error("Error creating folders:", error);
            } finally {
                this.loading = false;
            }
        }
    },
});