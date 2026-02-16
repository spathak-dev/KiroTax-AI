/**
 * File Generation Script for KiroTax AI Frontend
 * Generates 80+ files for complete frontend implementation
 * 
 * Run: node generate-files.js
 */

const fs = require('fs');
const path = require('path');

// File templates
const templates = {
  hook: (name, apiMethod) => `import { useState, useEffect } from 'react';
import { backendAPI } from '../api/backend';

export const use${name} = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch${name} = async (params?: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await backendAPI.${apiMethod}(params);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetch${name} };
};
`,

  component: (name) => `import React from 'react';

interface ${name}Props {
  // Add props here
}

export const ${name}: React.FC<${name}Props> = (props) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">${name}</h2>
      {/* Component content */}
    </div>
  );
};

export default ${name};
`,

  page: (title) => `import React from 'react';

export default function ${title}Page() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">${title}</h1>
      {/* Page content */}
    </div>
  );
}
`,

  store: (name) => `import { create } from 'zustand';

interface ${name}State {
  items: any[];
  loading: boolean;
  error: string | null;
  setItems: (items: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const use${name}Store = create<${name}State>((set) => ({
  items: [],
  loading: false,
  error: null,
  setItems: (items) => set({ items }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
`,

  type: (name) => `export interface ${name} {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
`,
};

// File definitions
const files = [
  // Hooks
  { path: 'src/lib/hooks/useBills.ts', template: 'hook', args: ['Bills', 'getBills'] },
  { path: 'src/lib/hooks/useTemplates.ts', template: 'hook', args: ['Templates', 'getTemplates'] },
  { path: 'src/lib/hooks/useGST.ts', template: 'hook', args: ['GST', 'validateGST'] },
  { path: 'src/lib/hooks/useTax.ts', template: 'hook', args: ['Tax', 'calculateTax'] },
  { path: 'src/lib/hooks/useAdmin.ts', template: 'hook', args: ['Admin', 'getStats'] },
  { path: 'src/lib/hooks/useUsers.ts', template: 'hook', args: ['Users', 'getUsers'] },
  { path: 'src/lib/hooks/useActivity.ts', template: 'hook', args: ['Activity', 'getActivity'] },
  { path: 'src/lib/hooks/useSettings.ts', template: 'hook', args: ['Settings', 'getSettings'] },
  
  // Admin Pages
  { path: 'src/app/(dashboard)/admin/page.tsx', template: 'page', args: ['Admin Dashboard'] },
  { path: 'src/app/(dashboard)/admin/users/page.tsx', template: 'page', args: ['Users'] },
  { path: 'src/app/(dashboard)/admin/bills/page.tsx', template: 'page', args: ['Bills'] },
  { path: 'src/app/(dashboard)/admin/templates/page.tsx', template: 'page', args: ['Templates'] },
  { path: 'src/app/(dashboard)/admin/activity/page.tsx', template: 'page', args: ['Activity'] },
  { path: 'src/app/(dashboard)/admin/settings/page.tsx', template: 'page', args: ['Settings'] },
  
  // Admin Components
  { path: 'src/components/admin/UserTable.tsx', template: 'component', args: ['UserTable'] },
  { path: 'src/components/admin/UserForm.tsx', template: 'component', args: ['UserForm'] },
  { path: 'src/components/admin/BillTable.tsx', template: 'component', args: ['BillTable'] },
  { path: 'src/components/admin/TemplateTable.tsx', template: 'component', args: ['TemplateTable'] },
  { path: 'src/components/admin/ActivityFeed.tsx', template: 'component', args: ['ActivityFeed'] },
  { path: 'src/components/admin/SettingsForm.tsx', template: 'component', args: ['SettingsForm'] },
  { path: 'src/components/admin/StatsCards.tsx', template: 'component', args: ['StatsCards'] },
  { path: 'src/components/admin/AdminSidebar.tsx', template: 'component', args: ['AdminSidebar'] },
  
  // Bill Components
  { path: 'src/components/bills/BillList.tsx', template: 'component', args: ['BillList'] },
  { path: 'src/components/bills/BillCard.tsx', template: 'component', args: ['BillCard'] },
  { path: 'src/components/bills/BillDetails.tsx', template: 'component', args: ['BillDetails'] },
  { path: 'src/components/bills/BillUpload.tsx', template: 'component', args: ['BillUpload'] },
  { path: 'src/components/bills/BillEditor.tsx', template: 'component', args: ['BillEditor'] },
  { path: 'src/components/bills/BillFilters.tsx', template: 'component', args: ['BillFilters'] },
  
  // Template Components
  { path: 'src/components/templates/TemplateGrid.tsx', template: 'component', args: ['TemplateGrid'] },
  { path: 'src/components/templates/TemplateCard.tsx', template: 'component', args: ['TemplateCard'] },
  { path: 'src/components/templates/TemplateDetails.tsx', template: 'component', args: ['TemplateDetails'] },
  { path: 'src/components/templates/TemplateUpload.tsx', template: 'component', args: ['TemplateUpload'] },
  { path: 'src/components/templates/TemplateRating.tsx', template: 'component', args: ['TemplateRating'] },
  
  // GST Components
  { path: 'src/components/gst/GSTValidator.tsx', template: 'component', args: ['GSTValidator'] },
  { path: 'src/components/gst/GSTCalculator.tsx', template: 'component', args: ['GSTCalculator'] },
  { path: 'src/components/gst/GSTReport.tsx', template: 'component', args: ['GSTReport'] },
  { path: 'src/components/gst/GSTINLookup.tsx', template: 'component', args: ['GSTINLookup'] },
  
  // Tax Components
  { path: 'src/components/tax/TaxCalculator.tsx', template: 'component', args: ['TaxCalculator'] },
  { path: 'src/components/tax/TaxSlabs.tsx', template: 'component', args: ['TaxSlabs'] },
  { path: 'src/components/tax/DeductionsForm.tsx', template: 'component', args: ['DeductionsForm'] },
  { path: 'src/components/tax/TaxReport.tsx', template: 'component', args: ['TaxReport'] },
  
  // Report Components
  { path: 'src/components/reports/ReportDashboard.tsx', template: 'component', args: ['ReportDashboard'] },
  { path: 'src/components/reports/BillReport.tsx', template: 'component', args: ['BillReport'] },
  { path: 'src/components/reports/TaxReport.tsx', template: 'component', args: ['TaxReport'] },
  { path: 'src/components/reports/ExportButton.tsx', template: 'component', args: ['ExportButton'] },
  
  // Form Components
  { path: 'src/components/forms/LoginForm.tsx', template: 'component', args: ['LoginForm'] },
  { path: 'src/components/forms/RegisterForm.tsx', template: 'component', args: ['RegisterForm'] },
  { path: 'src/components/forms/ProfileForm.tsx', template: 'component', args: ['ProfileForm'] },
  { path: 'src/components/forms/PasswordChangeForm.tsx', template: 'component', args: ['PasswordChangeForm'] },
  
  // UI Components
  { path: 'src/components/ui/Button.tsx', template: 'component', args: ['Button'] },
  { path: 'src/components/ui/Input.tsx', template: 'component', args: ['Input'] },
  { path: 'src/components/ui/Select.tsx', template: 'component', args: ['Select'] },
  { path: 'src/components/ui/Table.tsx', template: 'component', args: ['Table'] },
  { path: 'src/components/ui/Badge.tsx', template: 'component', args: ['Badge'] },
  
  // Store
  { path: 'src/store/billStore.ts', template: 'store', args: ['Bill'] },
  { path: 'src/store/templateStore.ts', template: 'store', args: ['Template'] },
  { path: 'src/store/userStore.ts', template: 'store', args: ['User'] },
  { path: 'src/store/settingsStore.ts', template: 'store', args: ['Settings'] },
  { path: 'src/store/notificationStore.ts', template: 'store', args: ['Notification'] },
  
  // Types
  { path: 'src/types/models/user.ts', template: 'type', args: ['User'] },
  { path: 'src/types/models/bill.ts', template: 'type', args: ['Bill'] },
  { path: 'src/types/models/template.ts', template: 'type', args: ['Template'] },
  { path: 'src/types/models/gst.ts', template: 'type', args: ['GST'] },
  { path: 'src/types/models/tax.ts', template: 'type', args: ['Tax'] },
];

// Create directories
const createDirectories = () => {
  const dirs = [
    'src/lib/hooks',
    'src/app/(dashboard)/admin/users',
    'src/app/(dashboard)/admin/bills',
    'src/app/(dashboard)/admin/templates',
    'src/app/(dashboard)/admin/activity',
    'src/app/(dashboard)/admin/settings',
    'src/components/admin',
    'src/components/bills',
    'src/components/templates',
    'src/components/gst',
    'src/components/tax',
    'src/components/reports',
    'src/components/forms',
    'src/types/models',
  ];

  dirs.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`✓ Created directory: ${dir}`);
    }
  });
};

// Generate files
const generateFiles = () => {
  let created = 0;
  let skipped = 0;

  files.forEach(file => {
    const fullPath = path.join(__dirname, file.path);
    
    if (fs.existsSync(fullPath)) {
      console.log(`⊘ Skipped (exists): ${file.path}`);
      skipped++;
      return;
    }

    const templateFn = templates[file.template];
    const content = templateFn(...file.args);
    
    fs.writeFileSync(fullPath, content);
    console.log(`✓ Created: ${file.path}`);
    created++;
  });

  console.log(`\n========================================`);
  console.log(`Files created: ${created}`);
  console.log(`Files skipped: ${skipped}`);
  console.log(`Total: ${created + skipped}`);
  console.log(`========================================\n`);
};

// Main execution
console.log('KiroTax AI Frontend - File Generator\n');
console.log('Creating directories...\n');
createDirectories();
console.log('\nGenerating files...\n');
generateFiles();
console.log('Done!\n');
