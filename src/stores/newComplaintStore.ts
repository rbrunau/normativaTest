import { defineStore } from 'pinia';
import type {
    Agent,
    ComplaintCategory,
    ComplaintWorkplace,
    ComplaintDepartment,
} from '@/types';

/**
 *
 *  https://pinia.vuejs.org/core-concepts/
 *  https://pinia.vuejs.org/ssr/nuxt.html
 *
 */

export const useNewComplaintStore = defineStore('newComplaintStore', {
    state: () => ({
        complaint: {
            relationship_with_company: null as
                | 'not_applicable'
                | 'appropriate_internal_resolution'
                | 'applicable_external_resolution'
                | 'appropriate_resolution_other'
                | null,
            fullname: null as null | string,
            phone: null as null | string,
            email: null as null | string,
            witnesses: false as boolean,
            evidence: false as boolean,
            password: undefined as undefined | string,
            kind_of_abuse: undefined as undefined | ComplaintCategory,
            workspace: null as null | ComplaintWorkplace,
            department: null as null | ComplaintDepartment,
            reported_facts: undefined as undefined | string,
            documentation: null as any,
            agent: null as null | Agent,
        },
    }),
});
