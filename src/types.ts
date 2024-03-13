export type Agent = {
    id: string;
    name: string;
    user_id: string;
};

export type Message = {
    id: string;
    date_created: Date;
    date_updated: Date | null;
    sender: 'agent' | 'complainant';
    complaint_id: string;
    text: string;
};

export type Notification = {
    id: string;
    status: 'not-read' | 'read';
    date_created: Date;
    date_updated: Date | null;
    type: 'complaints' | 'validations' | 'messages';
    message: string;
};

export type Complaint = {
    id: string;
    code: string;
    date_created: string;
    date_updated: string | null;
    closed_date: string | null;
    end_date: string;
    validated_date: string | null;
    state:
        | 'open'
        | 'validated'
        | 'not_validated'
        | 'investigating'
        | 'resolved'
        | 'closed';
    relationship_with_company:
        | 'employee'
        | 'supplier'
        | 'customer'
        | 'partners'
        | 'exemployee'
        | 'other';
    fullname: string | null;
    phone: string | null;
    email: string | null;
    witnesses: boolean;
    evidence: boolean;
    password: string;
    kind_of_abuse: ComplaintCategory;
    workspace: ComplaintWorkplace | null;
    department: ComplaintDepartment | null;
    reported_facts: string;
    documentation: any;
    serious: boolean;
    resolution_category:
        | 'not_applicable'
        | 'appropriate_internal_resolution'
        | 'applicable_external_resolution'
        | 'appropriate_resolution_other'
        | null;
    resolution: any;
    agent: Agent | null;
    messages: Message[];
};

export type ComplaintCategory = {
    id: string;
    name: string;
};

export type ComplaintDepartment = {
    id: string;
    name: string;
};

export type ComplaintWorkplace = {
    id: string;
    name: string;
};
