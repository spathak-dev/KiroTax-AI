import { Role } from '@/types';

export const roles = {
    OWNER: ["*"],

    PRACTICE_HEAD: [
        "view_all_clients",
        "approve_filing",
        "view_investment_summary"
    ],

    SENIOR_CA: [
        "view_assigned_clients"
    ],

    ARTICLE: [
        "upload_documents"
    ],

    AUDIT: [
        "upload_audit_docs"
    ],

    INVESTOR: [
        "view_portfolio",
        "add_investment",
        "update_portfolio",
        "view_analytics",
        "upload_broker_statement"
    ]
};

export const roleLabels: Record<Role, string> = {
    OWNER: 'Owner',
    PRACTICE_HEAD: 'Practice Head',
    SENIOR_CA: 'Senior CA',
    ARTICLE: 'Article Assistant',
    AUDIT: 'Audit Team',
    INVESTOR: 'Investor',
    ADMIN: 'System Admin',
    CA: 'Chartered Accountant',
    CLIENT: 'Client',
    AUDITOR: 'Auditor'
};

export function hasPermission(role: Role, action: string): boolean {
    // Configured roles
    const roleKey = role as keyof typeof roles;
    if (roles[roleKey]) {
        const permissions = roles[roleKey];
        if (permissions.includes('*')) return true;
        return permissions.includes(action);
    }

    // Fallback for legacy roles or if not defined in new config (treat as no permissions or define mappings)
    // For now, return false if not explicitly defined above
    return false;
}
