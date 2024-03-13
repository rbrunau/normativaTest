import { defineStore } from 'pinia';
import type { Complaint } from '@/types';

/**
 *
 *  https://pinia.vuejs.org/core-concepts/
 *  https://pinia.vuejs.org/ssr/nuxt.html
 *
 */

export const useQueryComplaintStore = defineStore('queryComplaintStore', {
    state: () => ({
        result: false,
        complaint_id: undefined as string | undefined,
        complaint_code: undefined as string | undefined,
    }),
    getters: {
        getResult: (state) => state.result,
        getComplaintID: (state) => state.complaint_id,
        getComplaintCode: (state) => state.complaint_code,
    },
    actions: {
        setResult(bool: boolean) {
            this.result = bool;
        },
        setComplaintID(id: string | undefined) {
            this.complaint_id = id;
        },
        setComplaintCode(code: string | undefined) {
            this.complaint_code = code;
        },
    },
    persist: true,
});
