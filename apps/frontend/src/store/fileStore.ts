import type IFile from "@/interface/fileInterface";
import axios from "@/lib/axios";
import { defineStore } from "pinia";

interface FileState {
    files: IFile[];
    loading: boolean;
    search?: string | null;
}

export const useFileStore = defineStore('file', {
    state: (): FileState => ({
        files: [],
        loading: false,
        search: null,
    }),

    actions: {
        async fetchFiles(folderId: number) {
            this.loading = true;

            try {
                const res = await axios.get<{ data: IFile[] }>(`/files/${folderId}`);
                this.files = res.data.data;
            } catch (error) {
                console.error("Error fetching files:", error);
            } finally {
                this.loading = false;
            }
        },

        searchFiles(search: string) {
            this.search = search;
        },

        async storeFile(folderId: number | null, file: File) {
            this.loading = true;

            try {
                const formData = new FormData();
                formData.append('file', file);
                if (folderId !== null) {
                    formData.append('folderId', folderId.toString());
                }

                const res = await axios.post<{ data: IFile[] }>('/files', formData);
                const newFile = res.data.data[0];
                this.files.push(newFile);

            } catch (error) {
                console.error("Error store file:", error);
            } finally {
                this.loading = false;
            }
        }
    },

    getters: {
        getFiles(state): IFile[] {
            if (!state.search) return state.files;
            return state.files.filter(file =>
                file.name.toLowerCase().includes(state.search?.toLowerCase() || "")
            );
        },
    }

});