/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BarChart3,
  Users,
  CheckSquare,
  FileText,
  UserSquare2,
  Mail,
  Shuffle,
  LayoutGrid,
  FolderOpen,
  HardDrive,
  Settings,
  LifeBuoy,
  Briefcase,
  Box,
  Settings2,
  Search, 
  Bell, 
  HelpCircle, 
  Accessibility, 
  ChevronRight, 
  ExternalLink,
  ChevronDown,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  MoreVertical,
  Clock,
  Layout,
  Maximize2,
  Filter,
  Sparkles,
  X,
  GripVertical,
  Download,
  Eye,
  SlidersHorizontal,
  PenLine,
  ArrowLeft,
  Share2,
  Tag,
  Upload,
  Archive,
  ArchiveRestore,
  Ban,
  Send,
  ActivitySquare,
  Star,
  Folder,
  ChevronLeft,
  CheckCircle2,
  Circle,
  UserCircle,
  Globe,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active = false, 
  hasChevron = false, 
  isExternal = false, 
  isCollapsed = false,
  onClick
}: { 
  icon: any, 
  label: string, 
  active?: boolean, 
  hasChevron?: boolean,
  isExternal?: boolean,
  isCollapsed?: boolean,
  onClick?: () => void
}) => (
  <div 
    onClick={onClick}
    className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-2 cursor-pointer transition-colors ${active ? 'bg-[#7A005D]/10 text-[#7A005D] font-medium rounded-lg mx-2' : 'text-gray-700 hover:bg-gray-100 rounded-lg mx-2'}`} 
    title={isCollapsed ? label : undefined}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} className={active ? 'text-[#7A005D]' : 'text-gray-500'} strokeWidth={1.5} />
      {!isCollapsed && <span className="text-[14px] whitespace-nowrap">{label}</span>}
    </div>
    {!isCollapsed && hasChevron && <ChevronDown size={16} className="text-gray-400" />}
    {!isCollapsed && isExternal && <ExternalLink size={14} className="text-gray-400" />}
  </div>
);

const Card = React.forwardRef(({ 
  title, 
  children, 
  action, 
  subtitle, 
  style, 
  className, 
  onMouseDown, 
  onMouseUp, 
  onTouchEnd 
}: any, ref: any) => (
  <div 
    ref={ref}
    style={style}
    className={`bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col group/card h-full ${className}`}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    onTouchEnd={onTouchEnd}
  >
    <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50 drag-handle cursor-grab active:cursor-grabbing">
      <div className="flex items-center gap-2">
        <GripVertical size={14} className="text-gray-300 opacity-0 group-hover/card:opacity-100 transition-opacity" />
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div onMouseDown={e => e.stopPropagation()}>
        {action}
      </div>
    </div>
    <div className="p-5 flex-1 overflow-auto scrollbar-hide">
      {children}
    </div>
  </div>
));

const StatGroup = ({ label, value, colorClass, sublabel }: { label: string, value: number, colorClass: string, sublabel?: string }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-2 mb-1">
      <div className={`w-2 h-2 rounded-full ${colorClass}`} />
      <span className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{label}</span>
    </div>
    <div className="text-xl font-semibold text-gray-900">{value}</div>
    {sublabel && <div className="text-[10px] text-gray-400 mt-0.5">{sublabel}</div>}
  </div>
);

const ProgressBar = ({ current, total, color = "bg-[#7A005D]" }: { current: number, total: number, color?: string }) => {
  const percentage = Math.min(100, (current / total) * 100);
  return (
    <div className="w-24">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-medium text-gray-500">{current}/{total} completed</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSendDropdownOpen, setIsSendDropdownOpen] = useState(false);
  const [isRemindDropdownOpen, setIsRemindDropdownOpen] = useState(false);
  const [activeView, setActiveView] = useState<'overview' | 'team' | 'tasks' | 'templates' | 'recipients'>('overview');
  const [isInsightBannerVisible, setIsInsightBannerVisible] = useState(true);
  const [selectedEnvelopeId, setSelectedEnvelopeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('Any');
  const [filterSentBy, setFilterSentBy] = useState('Anyone');
  const [filterHasWords, setFilterHasWords] = useState('');
  const [filterItemName, setFilterItemName] = useState('');
  const [filterLastUpdate, setFilterLastUpdate] = useState('Any time');
  const [filterTags, setFilterTags] = useState('');
  const [filterAwaitingApproval, setFilterAwaitingApproval] = useState(false);
  const [filterRequestedByMe, setFilterRequestedByMe] = useState(false);
  const [filterInitialBlocked, setFilterInitialBlocked] = useState(false);
  const [openDropdownIdx, setOpenDropdownIdx] = useState<number | null>(null);
  const [isSendReminderOpen, setIsSendReminderOpen] = useState(false);
  const [reminderType, setReminderType] = useState<'all' | 'expiring' | 'person' | 'doc'>('all');
  const [reminderPersonSearch, setReminderPersonSearch] = useState('');
  const [reminderDocSearch, setReminderDocSearch] = useState('');
  // Templates
  const [taskTab, setTaskTab] = useState<'toComplete' | 'sentByMe'>('toComplete');
  const [selectedFolder, setSelectedFolder] = useState('All Document Templates');
  const [templateTab, setTemplateTab] = useState<'active' | 'archived'>('active');
  const [templateSearch, setTemplateSearch] = useState('');
  // Recipients
  const [recipientSearch, setRecipientSearch] = useState('');
  const [favoritedRecipients, setFavoritedRecipients] = useState<Set<number>>(new Set());
  const [recipientDropdown, setRecipientDropdown] = useState<number | null>(null);
  const [viewingExternal, setViewingExternal] = useState<number | null>(null);
  const [isBulkAddOpen, setIsBulkAddOpen] = useState(false);
  const [bulkPasteText, setBulkPasteText] = useState('');
  const [bulkCsvText, setBulkCsvText] = useState('');
  const [docCategory, setDocCategory] = useState('All');
  const [bulkDragOver, setBulkDragOver] = useState(false);

  const layouts = {
    lg: [
      { i: 'status', x: 0, y: 0, w: 8, h: 12 },
      { i: 'templates', x: 8, y: 0, w: 4, h: 8 },
      { i: 'people', x: 8, y: 8, w: 4, h: 6 }
    ],
    md: [
      { i: 'status', x: 0, y: 0, w: 6, h: 12 },
      { i: 'templates', x: 6, y: 0, w: 4, h: 8 },
      { i: 'people', x: 6, y: 8, w: 4, h: 6 }
    ],
    sm: [
      { i: 'status', x: 0, y: 0, w: 6, h: 12 },
      { i: 'templates', x: 0, y: 12, w: 6, h: 8 },
      { i: 'people', x: 0, y: 20, w: 6, h: 6 }
    ]
  };

  type Recipient = { initials: string; name: string; email: string; avatar?: string; status: 'Completed' | 'In progress' | 'Waiting'; action: string; order: number; sentOn: string; completedOn: string | null };
  const envelopeData: Record<string, {
    name: string; sentOn: string; sentBy: string; status: string;
    docs: string[]; recipients: Recipient[];
  }> = {
    'ENV-001': {
      name: 'Onboarding Package - Mar 2026',
      sentOn: '03/01/2026 9:00 AM',
      sentBy: 'Harry Porter',
      status: 'Yet to sign',
      docs: ['Employment_Agreement_John_Doe.pdf', 'W4_Tax_Form_2026.pdf', 'Health_Insurance_Enrollment.pdf'],
      recipients: [
        { initials: 'DG', name: 'David Gonzales',  email: 'david.gonzales@javvycoffee.com',  avatar: '1', status: 'Completed',   action: 'To sign', order: 1, sentOn: '03/01/2026 9:00 AM',  completedOn: '03/01/2026 9:14 AM' },
        { initials: 'CB', name: 'Carmen Brown',    email: 'carmen.brown@javvycoffee.com',    avatar: '2', status: 'In progress', action: 'To sign', order: 2, sentOn: '03/01/2026 9:00 AM',  completedOn: null },
        { initials: 'HP', name: 'Harry Porter',    email: 'harry.porter@javvycoffee.com',    avatar: '3', status: 'In progress', action: 'To view', order: 2, sentOn: '03/01/2026 10:05 AM', completedOn: null },
        { initials: 'TD', name: 'Tracy Davis',     email: 'tracy.davis@javvycoffee.com',     avatar: '4', status: 'Waiting',     action: 'To sign', order: 3, sentOn: '-',                   completedOn: null },
      ],
    },
    'ENV-002': {
      name: 'Finance Compliance Bundle Q1',
      sentOn: '02/20/2026 2:30 PM',
      sentBy: 'Tracy Davis',
      status: 'Yet to sign',
      docs: ['Mutual_Non_Disclosure_Agreement.pdf', 'Offer_Letter_Template.pdf', 'W4_Tax_Form_2026.pdf'],
      recipients: [
        { initials: 'MG', name: 'Michael Gomez',   email: 'michael.gomez@javvycoffee.com',   avatar: '5', status: 'Completed',   action: 'To sign', order: 1, sentOn: '02/20/2026 2:30 PM', completedOn: '02/20/2026 3:47 PM' },
        { initials: 'NJ', name: 'Natalie Jackson', email: 'natalie.jackson@javvycoffee.com', avatar: '6', status: 'In progress', action: 'To sign', order: 2, sentOn: '02/20/2026 2:30 PM', completedOn: null },
        { initials: 'KW', name: 'Kenneth Walker',  email: 'kenneth.walker@javvycoffee.com',  avatar: '7', status: 'Waiting',     action: 'To sign', order: 3, sentOn: '-',                  completedOn: null },
      ],
    },
  };

  // lastUpdateState: 'sent' | 'opened' | 'signed'
  const documentData = [
    { doc: 'Employment_Agreement_John_Doe.pdf',   docId: 'DOC-001', envelopeId: 'ENV-001', employee: 'David Gonzales',  role: 'CEO, Finance',                             docStatus: 'Pending',   avatar: '1', lastUpdateState: 'sent'   as const, lastUpdate: 'Mar 1, 2026'    },
    { doc: 'W4_Tax_Form_2026.pdf',                docId: 'DOC-002', envelopeId: 'ENV-001', employee: 'David Gonzales',  role: 'CEO, Finance',                             docStatus: 'Signed',    avatar: '1', lastUpdateState: 'signed' as const, lastUpdate: 'Mar 3, 2026'    },
    { doc: 'Health_Insurance_Enrollment.pdf',     docId: 'DOC-003', envelopeId: 'ENV-001', employee: 'Carmen Brown',    role: 'COO, Customer Support',                    docStatus: 'Pending',   avatar: '2', lastUpdateState: 'opened' as const, lastUpdate: 'Mar 2, 2026'    },
    { doc: 'Employment_Agreement_John_Doe.pdf',   docId: 'DOC-001', envelopeId: null,       employee: 'Harry Porter',    role: 'Demo Admin, Engineering',                  docStatus: 'Signed',    avatar: '3', lastUpdateState: 'signed' as const, lastUpdate: 'Feb 28, 2026'   },
    { doc: 'Mutual_Non_Disclosure_Agreement.pdf', docId: 'DOC-004', envelopeId: 'ENV-002', employee: 'Harry Porter',    role: 'Demo Admin, Engineering',                  docStatus: 'Pending',   avatar: '3', lastUpdateState: 'sent'   as const, lastUpdate: 'Feb 20, 2026'   },
    { doc: 'W4_Tax_Form_2026.pdf',                docId: 'DOC-002', envelopeId: 'ENV-002', employee: 'Tracy Davis',     role: 'CFO, Finance',                             docStatus: 'Pending',   avatar: '4', lastUpdateState: 'opened' as const, lastUpdate: 'Feb 22, 2026'   },
    { doc: 'Offer_Letter_Template.pdf',           docId: 'DOC-005', envelopeId: 'ENV-002', employee: 'Michael Gomez',   role: 'CTO, Engineering',                         docStatus: 'Pending',   avatar: '5', lastUpdateState: 'signed' as const, lastUpdate: 'Feb 20, 2026'   },
    { doc: 'Health_Insurance_Enrollment.pdf',     docId: 'DOC-003', envelopeId: null,       employee: 'Natalie Jackson', role: 'VP Engineering, Engineering',              docStatus: 'Pending',   avatar: '6', lastUpdateState: 'sent'   as const, lastUpdate: 'Mar 1, 2026'    },
    { doc: 'Mutual_Non_Disclosure_Agreement.pdf', docId: 'DOC-004', envelopeId: null,       employee: 'Kenneth Walker',  role: 'Director of Engineering Ops, Engineering', docStatus: 'Expired',   avatar: '7', lastUpdateState: 'opened' as const, lastUpdate: 'Jan 15, 2026'   },
    { doc: 'Offer_Letter_Template.pdf',           docId: 'DOC-005', envelopeId: null,       employee: 'Tara Moore',      role: 'Software Engineer, Engineering',           docStatus: 'Signed',    avatar: '8', lastUpdateState: 'signed'   as const, lastUpdate: 'Mar 4, 2026'    },
    { doc: 'Employment_Agreement_John_Doe.pdf',   docId: 'DOC-001', envelopeId: null,       employee: 'Tara Moore',      role: 'Software Engineer, Engineering',           docStatus: 'Signed',    avatar: '8', lastUpdateState: 'signed'   as const, lastUpdate: 'Mar 4, 2026'    },
    { doc: 'W4_Tax_Form_2026.pdf',                docId: 'DOC-002', envelopeId: null,       employee: 'Michael Gomez',   role: 'CTO, Engineering',                         docStatus: 'Archived',  avatar: '5', lastUpdateState: 'signed'   as const, lastUpdate: 'Jan 10, 2026'   },
    { doc: 'Mutual_Non_Disclosure_Agreement.pdf', docId: 'DOC-004', envelopeId: null,       employee: 'Carmen Brown',    role: 'COO, Customer Support',                    docStatus: 'Uploaded',  avatar: '2', lastUpdateState: 'signed'   as const, lastUpdate: 'Mar 7, 2026'    },
  ];

  const monthAbbreviations: Record<string, string> = {
    january: 'jan', february: 'feb', march: 'mar', april: 'apr',
    may: 'may', june: 'jun', july: 'jul', august: 'aug',
    september: 'sep', october: 'oct', november: 'nov', december: 'dec',
  };
  const normalizeQuery = (q: string) => {
    let normalized = q.toLowerCase();
    for (const [full, abbr] of Object.entries(monthAbbreviations)) {
      normalized = normalized.replace(full, abbr);
    }
    return normalized;
  };

  const filteredDocumentData = documentData.filter(row => {
    const q = normalizeQuery(searchQuery);
    if (!q) return true;
    const envName = row.envelopeId ? envelopeData[row.envelopeId]?.name ?? '' : '';
    return (
      row.doc.toLowerCase().includes(q) ||
      row.employee.toLowerCase().includes(q) ||
      envName.toLowerCase().includes(q) ||
      row.docStatus.toLowerCase().includes(q) ||
      row.lastUpdate.toLowerCase().includes(q)
    );
  });

  // ── Tasks data ──────────────────────────────────────────────────
  const myTasks = [
    { id: 1, title: 'Sign Employment Agreement', doc: 'Employment_Agreement_John_Doe.pdf', dueDate: 'Mar 15, 2026', priority: 'High',   status: 'pending'   },
    { id: 2, title: 'Review Health Insurance Enrollment', doc: 'Health_Insurance_Enrollment.pdf', dueDate: 'Mar 18, 2026', priority: 'Medium', status: 'pending'   },
    { id: 3, title: 'Complete W4 Tax Form', doc: 'W4_Tax_Form_2026.pdf', dueDate: 'Mar 12, 2026', priority: 'High',   status: 'pending'   },
    { id: 4, title: 'Sign MNDA', doc: 'Mutual_Non_Disclosure_Agreement.pdf', dueDate: 'Feb 28, 2026', priority: 'Low',    status: 'completed' },
  ];
  const sentTasks = [
    { id: 5, title: 'Offer Letter Sent to Tara Moore',     doc: 'Offer_Letter_Template.pdf',           sentTo: 'Tara Moore',      sentDate: 'Mar 4, 2026',  status: 'completed' },
    { id: 6, title: 'Employment Agreement to Harry Porter', doc: 'Employment_Agreement_John_Doe.pdf', sentTo: 'Harry Porter',    sentDate: 'Feb 28, 2026', status: 'completed' },
    { id: 7, title: 'W4 Tax Form to Tracy Davis',          doc: 'W4_Tax_Form_2026.pdf',                sentTo: 'Tracy Davis',     sentDate: 'Feb 22, 2026', status: 'pending'   },
    { id: 8, title: 'Health Insurance to Carmen Brown',    doc: 'Health_Insurance_Enrollment.pdf',     sentTo: 'Carmen Brown',    sentDate: 'Mar 2, 2026',  status: 'pending'   },
    { id: 9, title: 'MNDA to Kenneth Walker',              doc: 'Mutual_Non_Disclosure_Agreement.pdf', sentTo: 'Kenneth Walker',  sentDate: 'Jan 15, 2026', status: 'pending'   },
  ];

  // ── Templates data ───────────────────────────────────────────────
  const templateFolders = [
    { name: 'All Document Templates', count: 18 },
    { name: 'Tax Withholding Documents', count: 3 },
    { name: 'Offer Letter Templates', count: 4 },
    { name: 'Termination Templates', count: 2 },
    { name: 'Other Agreement Templates', count: 3 },
    { name: 'Onboarding Packets', count: 2 },
    { name: 'Compliance & Legal', count: 4 },
  ];
  const allTemplates = [
    { id: 1,  name: 'Employment Agreement – Standard',   type: 'Multi-recipient template', entity: 'All', country: 'All', folder: 'Offer Letter Templates',        archived: false },
    { id: 2,  name: 'W4 Tax Form 2026',                  type: 'Single-recipient template', entity: 'All', country: 'US',  folder: 'Tax Withholding Documents',     archived: false },
    { id: 3,  name: 'Health Insurance Enrollment Form',  type: 'Single-recipient template', entity: 'All', country: 'All', folder: 'Onboarding Packets',            archived: false },
    { id: 4,  name: 'Mutual Non-Disclosure Agreement',   type: 'Multi-recipient template', entity: 'All', country: 'All', folder: 'Compliance & Legal',            archived: false },
    { id: 5,  name: 'Offer Letter – Engineering',        type: 'Single-recipient template', entity: 'Engineering', country: 'All', folder: 'Offer Letter Templates', archived: false },
    { id: 6,  name: 'Offer Letter – Finance',            type: 'Single-recipient template', entity: 'Finance',     country: 'All', folder: 'Offer Letter Templates', archived: false },
    { id: 7,  name: 'CA Withholding DE-4',               type: 'Single-recipient template', entity: 'All', country: 'US',  folder: 'Tax Withholding Documents',     archived: false },
    { id: 8,  name: 'Federal W-9 Form',                  type: 'Single-recipient template', entity: 'All', country: 'US',  folder: 'Tax Withholding Documents',     archived: false },
    { id: 9,  name: 'Termination Letter – Involuntary',  type: 'Single-recipient template', entity: 'All', country: 'All', folder: 'Termination Templates',         archived: false },
    { id: 10, name: 'Termination Letter – Voluntary',    type: 'Single-recipient template', entity: 'All', country: 'All', folder: 'Termination Templates',         archived: false },
    { id: 11, name: 'IP Assignment Agreement',           type: 'Multi-recipient template', entity: 'Engineering', country: 'All', folder: 'Compliance & Legal',     archived: false },
    { id: 12, name: 'Arbitration Agreement',             type: 'Multi-recipient template', entity: 'All', country: 'All', folder: 'Other Agreement Templates',      archived: false },
    { id: 13, name: 'Remote Work Agreement',             type: 'Single-recipient template', entity: 'All', country: 'All', folder: 'Other Agreement Templates',     archived: false },
    { id: 14, name: 'Onboarding Checklist',              type: 'Single-recipient template', entity: 'All', country: 'All', folder: 'Onboarding Packets',            archived: false },
    { id: 15, name: 'CCPA Privacy Disclosure',           type: 'Single-recipient template', entity: 'All', country: 'US',  folder: 'Compliance & Legal',            archived: true  },
    { id: 16, name: 'Old Offer Letter 2023',             type: 'Single-recipient template', entity: 'All', country: 'All', folder: 'Offer Letter Templates',        archived: true  },
    { id: 17, name: 'Legacy NDA Template',               type: 'Multi-recipient template', entity: 'All', country: 'All', folder: 'Compliance & Legal',            archived: true  },
    { id: 18, name: 'Contractor Agreement v1',           type: 'Single-recipient template', entity: 'All', country: 'All', folder: 'Other Agreement Templates',     archived: true  },
  ];
  const visibleTemplates = allTemplates.filter(t => {
    const inFolder = selectedFolder === 'All Document Templates' || t.folder === selectedFolder;
    const isArchived = templateTab === 'archived' ? t.archived : !t.archived;
    const matchesSearch = t.name.toLowerCase().includes(templateSearch.toLowerCase());
    return inFolder && isArchived && matchesSearch;
  });

  // ── Recipients data ──────────────────────────────────────────────
  const recipientsData = [
    { id: 1,  name: 'David Gonzales',  email: 'david.gonzales@javvycoffee.com',  origin: 'internal', lastInteracted: 'Mar 3, 2026',  avatar: '1' },
    { id: 2,  name: 'Carmen Brown',    email: 'carmen.brown@javvycoffee.com',    origin: 'internal', lastInteracted: 'Mar 2, 2026',  avatar: '2' },
    { id: 3,  name: 'Harry Porter',    email: 'harry.porter@javvycoffee.com',    origin: 'internal', lastInteracted: 'Feb 28, 2026', avatar: '3' },
    { id: 4,  name: 'Tracy Davis',     email: 'tracy.davis@javvycoffee.com',     origin: 'internal', lastInteracted: 'Feb 22, 2026', avatar: '4' },
    { id: 5,  name: 'Michael Gomez',   email: 'michael.gomez@javvycoffee.com',   origin: 'internal', lastInteracted: 'Feb 20, 2026', avatar: '5' },
    { id: 6,  name: 'Natalie Jackson', email: 'natalie.jackson@javvycoffee.com', origin: 'internal', lastInteracted: 'Mar 1, 2026',  avatar: '6' },
    { id: 7,  name: 'Kenneth Walker',  email: 'kenneth.walker@javvycoffee.com',  origin: 'internal', lastInteracted: 'Jan 15, 2026', avatar: '7' },
    { id: 8,  name: 'Tara Moore',      email: 'tara.moore@javvycoffee.com',      origin: 'internal', lastInteracted: 'Mar 4, 2026',  avatar: '8' },
    { id: 9,  name: 'Sarah Chen',      email: 'sarah.chen@partnerfirm.com',      origin: 'external', lastInteracted: 'Feb 15, 2026', avatar: '9' },
    { id: 10, name: 'James Wright',    email: 'james.wright@contractor.io',      origin: 'external', lastInteracted: 'Jan 30, 2026', avatar: '10' },
    { id: 11, name: 'Priya Patel',     email: 'priya.patel@vendor.co',           origin: 'external', lastInteracted: 'Mar 5, 2026',  avatar: '11' },
    { id: 12, name: 'Liam Torres',     email: 'liam.torres@freelance.net',       origin: 'external', lastInteracted: 'Feb 10, 2026', avatar: '12' },
  ];
  const filteredRecipients = recipientsData.filter(r =>
    r.name.toLowerCase().includes(recipientSearch.toLowerCase()) ||
    r.email.toLowerCase().includes(recipientSearch.toLowerCase())
  );

  const resetFilters = () => {
    setFilterType('Any');
    setFilterSentBy('Anyone');
    setFilterHasWords('');
    setFilterItemName('');
    setFilterLastUpdate('Any time');
    setFilterTags('');
    setFilterAwaitingApproval(false);
    setFilterRequestedByMe(false);
    setFilterInitialBlocked(false);
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] font-sans text-gray-900">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarCollapsed ? 80 : 240 }}
        className="bg-white border-r border-gray-200 flex flex-col h-full z-20"
      >
        <div className="p-4 flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-[#7A005D] rounded flex items-center justify-center text-white font-bold text-xl shrink-0">
            R
          </div>
          {!isSidebarCollapsed && (
            <div className="flex items-center justify-between flex-1 overflow-hidden">
              <span className="font-bold text-lg truncate">Documents</span>
              <button className="text-gray-400 hover:text-gray-600">
                <ChevronRight size={16} className="rotate-90" />
              </button>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto pb-4">
          <SidebarItem 
            icon={BarChart3} 
            label="Overview" 
            active={activeView === 'overview'} 
            isCollapsed={isSidebarCollapsed} 
            onClick={() => setActiveView('overview')}
          />
          <SidebarItem 
            icon={FileText} 
            label="Documents" 
            active={activeView === 'team'} 
            isCollapsed={isSidebarCollapsed} 
            onClick={() => setActiveView('team')}
          />
          
          <div className="my-2 border-t border-gray-100 mx-4" />
          
          <SidebarItem icon={CheckSquare} label="Tasks" isCollapsed={isSidebarCollapsed} active={activeView === 'tasks'} onClick={() => setActiveView('tasks')} />
          <SidebarItem icon={Folder} label="Templates" isCollapsed={isSidebarCollapsed} active={activeView === 'templates'} onClick={() => setActiveView('templates')} />
          <SidebarItem icon={UserSquare2} label="Recipients" isCollapsed={isSidebarCollapsed} active={activeView === 'recipients'} onClick={() => setActiveView('recipients')} />
          <SidebarItem icon={Mail} label="Envelopes" isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={Shuffle} label="Rules" isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={LayoutGrid} label="Bulk upload" isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={FolderOpen} label="Profile folders" isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={HardDrive} label="Company drive" isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={Settings} label="Settings" isCollapsed={isSidebarCollapsed} />

          <div className="my-2 border-t border-gray-100 mx-4" />

          <SidebarItem icon={LifeBuoy} label="Help docs" isExternal isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={Briefcase} label="Tools" hasChevron isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={Box} label="Custom apps" hasChevron isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={Settings2} label="Global settings" hasChevron isCollapsed={isSidebarCollapsed} />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="flex items-center gap-3 px-2 py-2 w-full text-gray-500 hover:text-gray-900 transition-colors"
          >
            {isSidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            {!isSidebarCollapsed && <span className="text-sm font-medium">Collapse panel</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600" size={18} />
              <input 
                type="text" 
                placeholder="Search for documents, employees..." 
                className="w-full bg-gray-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#7A005D]/20 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-5 ml-4">
            <button className="text-gray-500 hover:text-gray-900"><HelpCircle size={20} /></button>
            <button className="text-gray-500 hover:text-gray-900"><Accessibility size={20} /></button>
            <div className="relative">
              <button className="text-gray-500 hover:text-gray-900"><CheckSquare size={20} /></button>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">2</span>
            </div>
            <button className="text-gray-500 hover:text-gray-900"><Bell size={20} /></button>
            
            <div className="h-8 w-[1px] bg-gray-200 mx-1" />
            
            <div className="flex items-center gap-3 pl-2 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-gray-900">Javvy Coffee Company</p>
              </div>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                <img 
                  src="https://picsum.photos/seed/avatar/100/100" 
                  alt="User" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeView === 'tasks' ? (
            /* ══════════════ TASKS VIEW ══════════════ */
            <div className="space-y-6 max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900">Tasks</h2>

              {/* Tab bar */}
              <div className="flex items-center border-b border-gray-200">
                <button
                  onClick={() => setTaskTab('toComplete')}
                  className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors ${taskTab === 'toComplete' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  To Complete
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${taskTab === 'toComplete' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-400'}`}>
                    {myTasks.filter(t => t.status === 'pending').length}
                  </span>
                  {taskTab === 'toComplete' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-t-full" />}
                </button>
                <button
                  onClick={() => setTaskTab('sentByMe')}
                  className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors ${taskTab === 'sentByMe' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Sent by Me
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${taskTab === 'sentByMe' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'}`}>
                    {sentTasks.length}
                  </span>
                  {taskTab === 'sentByMe' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-t-full" />}
                </button>
              </div>

              {/* Tab content */}
              {taskTab === 'toComplete' ? (
                <div className="space-y-2">
                  {myTasks.map(task => (
                    <div key={task.id} className={`bg-white border rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm transition-colors ${task.status === 'completed' ? 'border-gray-100 opacity-60' : 'border-gray-200 hover:border-[#7A005D]/20'}`}>
                      <button className={task.status === 'completed' ? 'text-emerald-500' : 'text-gray-300 hover:text-[#7A005D]'}>
                        {task.status === 'completed' ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>{task.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <FileText size={11} className="text-gray-400" />
                          <p className="text-[11px] text-gray-400 truncate">{task.doc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${task.priority === 'High' ? 'bg-red-50 text-red-600' : task.priority === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>{task.priority}</span>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Clock size={11} />
                          <span>{task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {sentTasks.map(task => (
                    <div key={task.id} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm hover:border-[#7A005D]/20 transition-colors">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${task.status === 'completed' ? 'bg-emerald-500' : 'bg-orange-400'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{task.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <FileText size={11} className="text-gray-400" />
                          <p className="text-[11px] text-gray-400 truncate">{task.doc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <p className="text-[11px] font-semibold text-gray-600">{task.sentTo}</p>
                          <p className="text-[10px] text-gray-400">{task.sentDate}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${task.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'}`}>
                          {task.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          ) : activeView === 'templates' ? (
            /* ══════════════ TEMPLATES VIEW ══════════════ */
            <div className="flex gap-6 h-full -m-8">
              {/* Folder Sidebar */}
              <div className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto">
                <div className="p-5 border-b border-gray-100">
                  <button className="w-full flex items-center justify-center gap-2 bg-[#7A005D] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[#60004a] transition-colors shadow-sm">
                    <Plus size={15} />
                    New Template
                  </button>
                </div>
                <div className="p-3 flex-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Folders</p>
                  {templateFolders.map(folder => (
                    <button
                      key={folder.name}
                      onClick={() => setSelectedFolder(folder.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${selectedFolder === folder.name ? 'bg-[#7A005D]/8 text-[#7A005D] font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Folder size={14} className={selectedFolder === folder.name ? 'text-[#7A005D]' : 'text-gray-400'} />
                        <span className="truncate">{folder.name}</span>
                      </div>
                      <span className={`text-[10px] font-bold shrink-0 ml-2 ${selectedFolder === folder.name ? 'text-[#7A005D]' : 'text-gray-400'}`}>{folder.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Template Content */}
              <div className="flex-1 overflow-y-auto p-8 pl-0">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedFolder}</h2>
                    <p className="text-sm text-gray-400 mt-0.5">{visibleTemplates.length} template{visibleTemplates.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Tabs + Search */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    {(['active', 'archived'] as const).map(tab => (
                      <button key={tab} onClick={() => setTemplateTab(tab)}
                        className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors capitalize ${templateTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="relative w-60">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={templateSearch} onChange={e => setTemplateSearch(e.target.value)} placeholder="Search templates…"
                      className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm focus:ring-2 focus:ring-[#7A005D]/20 outline-none" />
                  </div>
                </div>

                {/* Template Table */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th style={{width:'44%'}} className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Template</th>
                        <th style={{width:'28%'}} className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Type</th>
                        <th style={{width:'14%'}} className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Entity</th>
                        <th style={{width:'12%'}} className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Country</th>
                        <th style={{width:'48px'}} className="px-3 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {visibleTemplates.length === 0 ? (
                        <tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-400">No templates found</td></tr>
                      ) : visibleTemplates.map((tpl, idx) => (
                        <tr key={tpl.id} className="hover:bg-gray-50/60 transition-colors group">
                          <td className="px-6 py-3.5 overflow-hidden">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-md bg-[#7A005D]/10 flex items-center justify-center shrink-0">
                                <FileText size={13} className="text-[#7A005D]" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-[#7A005D] hover:underline cursor-pointer truncate">{tpl.name}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">TPL-{String(tpl.id).padStart(3,'0')}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-3.5 overflow-hidden">
                            <span className="text-xs text-gray-600 truncate block">{tpl.type}</span>
                          </td>
                          <td className="px-6 py-3.5 overflow-hidden">
                            <span className="text-xs text-gray-600">{tpl.entity}</span>
                          </td>
                          <td className="px-6 py-3.5 overflow-hidden">
                            <span className="text-xs text-gray-600">{tpl.country}</span>
                          </td>
                          <td className="py-3.5 pr-3 pl-1 text-center">
                            <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100">
                              <MoreVertical size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          ) : activeView === 'recipients' ? (
            /* ══════════════ RECIPIENTS VIEW ══════════════ */
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">Recipients</h2>
                  <span className="text-xs text-gray-400 font-medium">{recipientsData.length}</span>
                </div>
                <button
                  onClick={() => { setBulkPasteText(''); setBulkCsvText(''); setIsBulkAddOpen(true); }}
                  className="flex items-center gap-2 bg-[#7A005D] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#60004a] transition-colors shadow-sm"
                >
                  <Plus size={15} />
                  Bulk Add
                </button>
              </div>

              {/* Search */}
              <div className="relative max-w-sm">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={recipientSearch} onChange={e => setRecipientSearch(e.target.value)} placeholder="Search recipients…"
                  className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm focus:ring-2 focus:ring-[#7A005D]/20 outline-none" />
              </div>

              {/* Table */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-visible">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th style={{width:'38%'}} className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Recipient</th>
                      <th style={{width:'15%'}} className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Origin</th>
                      <th style={{width:'19%'}} className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Last Interacted</th>
                      <th style={{width:'28%'}} className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredRecipients.map((r, ri) => (
                      <tr key={r.id} className="hover:bg-gray-50/50 transition-colors group">
                        {/* Recipient */}
                        <td className="px-6 py-4 overflow-hidden">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 shrink-0">
                              <img src={`https://picsum.photos/seed/user${r.avatar}/100/100`} alt={r.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-gray-900 truncate">{r.name}</p>
                              <p className="text-[10px] text-gray-400 truncate">{r.email}</p>
                            </div>
                          </div>
                        </td>
                        {/* Origin */}
                        <td className="px-6 py-4">
                          {r.origin === 'internal'
                            ? <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#7A005D]/8 text-[#7A005D]"><Building2 size={10} />Internal</span>
                            : <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700"><Globe size={10} />External</span>
                          }
                        </td>
                        {/* Last Interacted */}
                        <td className="px-6 py-4">
                          <p className="text-xs text-gray-600">{r.lastInteracted}</p>
                        </td>
                        {/* Actions: star + ... dropdown */}
                        <td className="px-6 py-4 relative">
                          <div className="flex items-center gap-3">
                            {/* Favorite star — always visible */}
                            <button
                              onClick={() => setFavoritedRecipients(prev => {
                                const next = new Set(prev);
                                next.has(r.id) ? next.delete(r.id) : next.add(r.id);
                                return next;
                              })}
                              className="transition-colors shrink-0"
                              title={favoritedRecipients.has(r.id) ? 'Remove from favourites' : 'Add to favourites'}
                            >
                              <Star size={16} className={favoritedRecipients.has(r.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'} />
                            </button>

                            {/* More (...) button */}
                            <div className="relative">
                              <button
                                onClick={e => { e.stopPropagation(); setRecipientDropdown(recipientDropdown === r.id ? null : r.id); }}
                                className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                              >
                                <MoreVertical size={16} />
                              </button>

                              {recipientDropdown === r.id && (
                                <>
                                  <div className="fixed inset-0 z-10" onClick={() => setRecipientDropdown(null)} />
                                  <div className="absolute left-0 top-full mt-1.5 z-20 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 w-52">
                                    {/* View Profile / View Details */}
                                    {r.origin === 'internal' ? (
                                      <button
                                        onClick={() => setRecipientDropdown(null)}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                                      >
                                        <UserCircle size={15} className="text-gray-400 shrink-0" />
                                        View Profile
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => { setRecipientDropdown(null); setViewingExternal(r.id); }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                                      >
                                        <ExternalLink size={15} className="text-gray-400 shrink-0" />
                                        View Details
                                      </button>
                                    )}
                                    <button
                                      onClick={() => setRecipientDropdown(null)}
                                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                                    >
                                      <Send size={15} className="text-gray-400 shrink-0" />
                                      Send Document
                                    </button>
                                    <button
                                      onClick={() => setRecipientDropdown(null)}
                                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                                    >
                                      <Eye size={15} className="text-gray-400 shrink-0" />
                                      View
                                    </button>
                                    <button
                                      onClick={() => setRecipientDropdown(null)}
                                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                                    >
                                      <Upload size={15} className="text-gray-400 shrink-0" />
                                      Upload a Completed Document
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* External detail popover (triggered from dropdown) */}
                          {viewingExternal === r.id && r.origin === 'external' && (
                            <>
                              <div className="fixed inset-0 z-30" onClick={() => setViewingExternal(null)} />
                              <div className="absolute left-0 top-14 z-40 bg-white rounded-xl shadow-2xl border border-gray-200 p-5 w-68 min-w-[260px]">
                                <div className="flex items-center justify-between mb-4">
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">External Recipient</p>
                                  <button onClick={() => setViewingExternal(null)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shrink-0">
                                    <img src={`https://picsum.photos/seed/user${r.avatar}/100/100`} alt={r.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-gray-900">{r.name}</p>
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-700 mt-0.5"><Globe size={8} />External</span>
                                  </div>
                                </div>
                                <div className="space-y-2.5 text-xs border-t border-gray-100 pt-3">
                                  <div className="flex justify-between gap-4">
                                    <span className="text-gray-400 shrink-0">Email</span>
                                    <span className="text-gray-700 font-medium text-right break-all">{r.email}</span>
                                  </div>
                                  <div className="flex justify-between gap-4">
                                    <span className="text-gray-400 shrink-0">Last interacted</span>
                                    <span className="text-gray-700 font-medium">{r.lastInteracted}</span>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          ) : activeView === 'overview' ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Overview</h2>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Filter by period:</span>
                  <div className="relative">
                    <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
                      Last 30 days
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <ResponsiveGridLayout
                  className="layout"
                  layouts={layouts}
                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                  cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                  rowHeight={30}
                  draggableHandle=".drag-handle"
                  margin={[24, 24]}
                >
                  {/* Document Status Card */}
                  <div key="status" className="h-full">
                    <Card 
                      title="Document Status" 
                      action={
                        <div className="flex gap-2">
                          <button className="text-xs font-semibold text-[#7A005D] border border-[#7A005D]/20 px-3 py-1.5 rounded-lg hover:bg-[#7A005D]/5 transition-colors">
                            All docs
                          </button>
                          <div className="relative">
                            <button 
                              onClick={() => setIsSendDropdownOpen(!isSendDropdownOpen)}
                              className="text-xs font-semibold text-white bg-[#7A005D] px-4 py-1.5 rounded-lg hover:bg-[#60004a] transition-colors flex items-center gap-1 shadow-sm"
                            >
                              Send
                              <ChevronDown size={14} className={`transition-transform ${isSendDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <AnimatePresence>
                              {isSendDropdownOpen && (
                                <>
                                  <div 
                                    className="fixed inset-0 z-[90]" 
                                    onClick={() => setIsSendDropdownOpen(false)}
                                  />
                                  <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-[100] overflow-hidden"
                                  >
                                    <div className="py-1">
                                      <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                                        <FileText size={16} className="text-gray-400" />
                                        Send from template
                                      </button>
                                      <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                                        <Plus size={16} className="text-gray-400" />
                                        Send without template
                                      </button>
                                    </div>
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      }
                    >
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-4xl font-extrabold text-gray-900 tracking-tight">128</span>
                            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">sent documents</span>
                          </div>
                          
                          <div className="flex-1 grid grid-cols-4 gap-4 ml-12">
                            <div className="flex flex-col p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-bold text-emerald-700 uppercase whitespace-nowrap">Completed</span>
                              </div>
                              <span className="text-xl font-bold text-emerald-900">120</span>
                            </div>

                            <div className="flex flex-col p-3 rounded-xl bg-blue-50 border border-blue-100">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <span className="text-[10px] font-bold text-blue-700 uppercase whitespace-nowrap">Yet to sign</span>
                              </div>
                              <span className="text-xl font-bold text-blue-900">20</span>
                            </div>

                            <div className="flex flex-col p-3 rounded-xl bg-orange-50 border border-orange-100">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 rounded-full bg-orange-500" />
                                <span className="text-[10px] font-bold text-orange-700 uppercase whitespace-nowrap">Expiring</span>
                              </div>
                              <span className="text-xl font-bold text-orange-900">1</span>
                            </div>

                            <div className="flex flex-col p-3 rounded-xl bg-red-50 border border-red-100">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="text-[10px] font-bold text-red-700 uppercase whitespace-nowrap">Expired</span>
                              </div>
                              <span className="text-xl font-bold text-red-900">7</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '81%' }}
                              className="h-full bg-emerald-500"
                            />
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '13.5%' }}
                              className="h-full bg-blue-500"
                            />
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '0.5%' }}
                              className="h-full bg-orange-500"
                            />
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '5%' }}
                              className="h-full bg-red-500"
                            />
                          </div>
                          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            <span>81% Completed</span>
                            <span>19% Pending Action</span>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Recent Documents:</h4>
                          </div>
                          <div className="space-y-1">
                            {[
                              { id: 'DOC_03_04_2026_01', name: 'Employment_Agreement_John_Doe.pdf', date: '03/04/2026', status: 'Signed' },
                              { id: 'DOC_03_02_2026_14', name: 'W4_Tax_Form_2026.pdf', date: '03/02/2026', status: 'Signed' },
                              { id: 'DOC_02_28_2026_09', name: 'Health_Insurance_Enrollment.pdf', date: '02/28/2026', status: 'Pending' }
                            ].map((doc, i) => (
                              <div key={i} className="group flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full ${doc.status === 'Signed' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                                  <div>
                                    <p className="text-xs font-semibold text-gray-900">
                                      {doc.id} <span className="text-gray-400 font-normal">due {doc.date}</span>
                                    </p>
                                    <p className="text-[10px] text-gray-500 mt-0.5">{doc.status}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="text-xs font-bold text-gray-900">{doc.name}</span>
                                  <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-600" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Templates Card */}
                  <div key="templates" className="h-full">
                    <Card 
                      title="Templates" 
                      action={
                        <div className="flex gap-2">
                          <button className="text-xs font-semibold text-[#7A005D] border border-[#7A005D]/20 px-3 py-1.5 rounded-lg hover:bg-[#7A005D]/5 transition-colors">
                            Create
                          </button>
                          <button className="text-xs font-semibold text-[#7A005D] border border-[#7A005D]/20 px-3 py-1.5 rounded-lg hover:bg-[#7A005D]/5 transition-colors">
                            All templates
                          </button>
                        </div>
                      }
                    >
                      <div className="space-y-6">
                        <div className="flex flex-col">
                          <span className="text-4xl font-extrabold text-gray-900 tracking-tight">56</span>
                          <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">templates</span>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Recent used:</h4>
                          </div>
                          <div className="space-y-4">
                            {[
                              { name: 'Standard Employment Agreement', time: 'Mar 04, 10:45 AM' },
                              { name: 'W-4 Employee Withholding', time: 'Mar 02, 02:15 PM' },
                              { name: 'Mutual Non-Disclosure Agreement', time: 'Feb 28, 09:30 AM' }
                            ].map((item, i) => (
                              <div key={i} className="flex justify-between items-start group cursor-pointer">
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#7A005D]/40 group-hover:bg-[#7A005D]" />
                                  <p className="text-xs font-semibold text-gray-900 group-hover:text-[#7A005D] transition-colors">{item.name}</p>
                                </div>
                                <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-4">{item.time}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* People Needs Action Card */}
                  <div key="people" className="h-full">
                    <Card 
                      title="People needs action" 
                      action={
                        <div className="flex gap-2">
                          <button className="text-xs font-semibold text-[#7A005D] border border-[#7A005D]/20 px-3 py-1.5 rounded-lg hover:bg-[#7A005D]/5 transition-colors">
                            All people
                          </button>
                          <div className="relative">
                            <button 
                              onClick={() => setIsRemindDropdownOpen(!isRemindDropdownOpen)}
                              className="text-xs font-semibold text-[#7A005D] border border-[#7A005D]/20 px-3 py-1.5 rounded-lg hover:bg-[#7A005D]/5 flex items-center gap-1 transition-colors"
                            >
                              Remind
                              <ChevronDown size={14} className={`transition-transform ${isRemindDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <AnimatePresence>
                              {isRemindDropdownOpen && (
                                <>
                                  <div 
                                    className="fixed inset-0 z-[90]" 
                                    onClick={() => setIsRemindDropdownOpen(false)}
                                  />
                                  <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-[100] overflow-hidden"
                                  >
                                    <div className="py-1">
                                      <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                                        <Bell size={16} className="text-gray-400" />
                                        Remind all
                                      </button>
                                      <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                                        <Users size={16} className="text-gray-400" />
                                        Remind a specific person
                                      </button>
                                    </div>
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      }
                    >
                      <div className="space-y-4">
                        {[
                          { name: 'Harry Porter', role: 'Engineering', count: 5, avatar: '3' },
                          { name: 'Natalie Jackson', role: 'Engineering', count: 3, avatar: '6' },
                          { name: 'Michael Gomez', role: 'Engineering', count: 2, avatar: '5' }
                        ].map((person, i) => (
                          <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                                <img 
                                  src={`https://picsum.photos/seed/user${person.avatar}/100/100`} 
                                  alt={person.name} 
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-gray-900">{person.name}</p>
                                <p className="text-[10px] text-gray-500">{person.role}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-bold text-orange-600">{person.count} pending</span>
                              <p className="text-[10px] text-gray-400">Action needed</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </ResponsiveGridLayout>
              </div>
            </>
          ) : (
            <div className="flex gap-0 h-full -m-8">
              {/* Category Sidebar */}
              <div className="w-56 shrink-0 bg-[#FAF8F7] border-r border-gray-200 flex flex-col h-full overflow-y-auto pt-6 px-3">
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">Apps</h3>
                {(['All', 'HR Management', 'Benefits', 'Payroll', 'Recruiting', 'I9', 'Devices'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setDocCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      docCategory === cat
                        ? 'bg-white font-semibold text-gray-900 shadow-sm border border-gray-200'
                        : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Main Documents Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* AI Insight Banner */}
              {isInsightBannerVisible && (
              <div className="bg-[#7A005D]/5 border border-[#7A005D]/10 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#7A005D] rounded-lg flex items-center justify-center text-white">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#7A005D] uppercase tracking-widest mb-0.5">Rippling AI Insight</p>
                    <h3 className="text-sm font-bold text-gray-900">Backend has the lowest document completion rate</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Backend is at 25% — company average is 58%. Find out who's holding things up.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="bg-[#7A005D] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#60004a] transition-colors">
                    Discover
                  </button>
                    <button className="text-gray-400 hover:text-gray-600" onClick={() => setIsInsightBannerVisible(false)}>
                    <X size={20} />
                  </button>
                </div>
              </div>
              )}

              {/* Team Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">Documents</h2>
                  <span className="text-xs text-gray-400 font-medium">479</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#7A005D]/20 rounded-lg text-xs font-semibold text-[#7A005D] hover:bg-[#7A005D]/5">
                    <Clock size={16} />
                    Send Reminder
                  </button>
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <button className="p-2 bg-gray-50 text-[#7A005D]"><Layout size={16} /></button>
                    <button className="p-2 bg-white text-gray-400 hover:text-gray-600 border-l border-gray-200"><Maximize2 size={16} /></button>
                  </div>
                </div>
              </div>

              {/* Table Controls — hidden when envelope detail is open */}
              {!selectedEnvelopeId && <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-10 text-sm focus:ring-2 focus:ring-[#7A005D]/20 outline-none"
                  />
                  <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7A005D] transition-colors p-0.5 rounded"
                    title="Advanced search"
                  >
                    <SlidersHorizontal size={15} />
                  </button>
                </div>
              </div>}

              {/* Advanced Search Modal */}
              <AnimatePresence>
                {isFilterModalOpen && (
                  <>
                    <motion.div
                      key="filter-backdrop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/30 z-40 backdrop-blur-[2px]"
                      onClick={() => setIsFilterModalOpen(false)}
                    />
                    <motion.div
                      key="filter-modal"
                      initial={{ opacity: 0, scale: 0.97, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200"
                    >
                      {/* Modal Header */}
                      <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-gray-100">
                        <h2 className="text-base font-bold text-gray-900">Advanced search</h2>
                        <button
                          onClick={() => setIsFilterModalOpen(false)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

                        {/* Row helper */}
                        {/* Type */}
                        <div className="flex items-center gap-5">
                          <span className="w-40 text-[11px] font-bold text-gray-500 uppercase tracking-wider shrink-0">Type</span>
                          <div className="relative flex-1">
                            <select
                              value={filterType}
                              onChange={e => setFilterType(e.target.value)}
                              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-[#7A005D]/20 focus:border-[#7A005D]/40 outline-none pr-8 transition-colors"
                            >
                              <option>Any</option>
                              <option>Document</option>
                              <option>Envelope</option>
                            </select>
                            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Sent by */}
                        <div className="flex items-center gap-5">
                          <span className="w-40 text-[11px] font-bold text-gray-500 uppercase tracking-wider shrink-0">Sent by</span>
                          <div className="relative flex-1">
                            <select
                              value={filterSentBy}
                              onChange={e => setFilterSentBy(e.target.value)}
                              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-[#7A005D]/20 focus:border-[#7A005D]/40 outline-none pr-8 transition-colors"
                            >
                              <option>Anyone</option>
                              <option>Harry Porter</option>
                              <option>Tracy Davis</option>
                              <option>Alice Johnson</option>
                            </select>
                            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Has the words */}
                        <div className="flex items-center gap-5">
                          <span className="w-40 text-[11px] font-bold text-gray-500 uppercase tracking-wider shrink-0">Has the words</span>
                          <input
                            type="text"
                            value={filterHasWords}
                            onChange={e => setFilterHasWords(e.target.value)}
                            placeholder="Enter words found in the file"
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-[#7A005D]/20 focus:border-[#7A005D]/40 outline-none transition-colors"
                          />
                        </div>

                        {/* Item name */}
                        <div className="flex items-center gap-5">
                          <span className="w-40 text-[11px] font-bold text-gray-500 uppercase tracking-wider shrink-0">Item name</span>
                          <input
                            type="text"
                            value={filterItemName}
                            onChange={e => setFilterItemName(e.target.value)}
                            placeholder="Enter a term that matches part of the file name"
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-[#7A005D]/20 focus:border-[#7A005D]/40 outline-none transition-colors"
                          />
                        </div>

                        {/* Last update */}
                        <div className="flex items-center gap-5">
                          <span className="w-40 text-[11px] font-bold text-gray-500 uppercase tracking-wider shrink-0">Last update</span>
                          <div className="relative flex-1">
                            <select
                              value={filterLastUpdate}
                              onChange={e => setFilterLastUpdate(e.target.value)}
                              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-[#7A005D]/20 focus:border-[#7A005D]/40 outline-none pr-8 transition-colors"
                            >
                              <option>Any time</option>
                              <option>Today</option>
                              <option>Last 7 days</option>
                              <option>Last 30 days</option>
                              <option>Last 90 days</option>
                              <option>This year</option>
                            </select>
                            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex items-start gap-5">
                          <span className="w-40 text-[11px] font-bold text-gray-500 uppercase tracking-wider shrink-0 pt-2">Tags</span>
                          <div className="flex-1 space-y-2">
                            <div className="relative">
                              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                type="text"
                                value={filterTags}
                                onChange={e => setFilterTags(e.target.value)}
                                placeholder="Search tags"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-[#7A005D]/20 focus:border-[#7A005D]/40 outline-none transition-colors"
                              />
                            </div>
                            <button className="text-xs font-medium text-[#7A005D] hover:text-[#60004a] pl-1">+ Add tag</button>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100" />

                        {/* Approvals and eSignatures */}
                        <div className="flex items-start gap-5">
                          <span className="w-40 text-[11px] font-bold text-gray-500 uppercase tracking-wider shrink-0 pt-0.5 leading-relaxed">Approvals &amp;<br/>eSignatures</span>
                          <div className="flex-1 space-y-3">
                            {/* Awaiting my approval */}
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${filterAwaitingApproval ? 'bg-[#7A005D] border-[#7A005D]' : 'border-gray-300 bg-white group-hover:border-[#7A005D]/50'}`}
                                onClick={() => setFilterAwaitingApproval(v => !v)}>
                                {filterAwaitingApproval && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              </div>
                              <span className="text-sm text-gray-700">Awaiting my approval</span>
                            </label>

                            {/* Requested by me */}
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${filterRequestedByMe ? 'bg-[#7A005D] border-[#7A005D]' : 'border-gray-300 bg-white group-hover:border-[#7A005D]/50'}`}
                                onClick={() => setFilterRequestedByMe(v => !v)}>
                                {filterRequestedByMe && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              </div>
                              <span className="text-sm text-gray-700">Requested by me</span>
                            </label>

                            {/* Initial recipient blocked by others */}
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${filterInitialBlocked ? 'bg-[#7A005D] border-[#7A005D]' : 'border-gray-300 bg-white hover:border-[#7A005D]/50'}`}
                                onClick={() => setFilterInitialBlocked(v => !v)}>
                                {filterInitialBlocked && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              </div>
                              <span className="text-sm text-gray-700 cursor-pointer" onClick={() => setFilterInitialBlocked(v => !v)}>
                                Initial recipient blocked by others
                              </span>
                              {/* Tooltip */}
                              <div className="relative flex items-center">
                                <div className="peer cursor-default text-gray-400 hover:text-[#7A005D] transition-colors">
                                  <HelpCircle size={14} />
                                </div>
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-64 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl leading-relaxed opacity-0 peer-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                                  Initial recipient can not take actions before other recipients complete their required steps
                                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Modal Footer */}
                      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-gray-50/60">
                        <button className="text-xs font-semibold text-[#7A005D] hover:text-[#60004a] hover:underline transition-colors">
                          Learn more
                        </button>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={resetFilters}
                            className="text-xs font-semibold text-[#7A005D] hover:text-[#60004a] hover:underline transition-colors"
                          >
                            Reset
                          </button>
                          <button
                            onClick={() => setIsFilterModalOpen(false)}
                            className="bg-[#7A005D] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#60004a] transition-colors shadow-sm"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Bulk Add Individuals Modal */}
              <AnimatePresence>
                {isBulkAddOpen && (
                  <>
                    <motion.div key="bulk-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/30 z-40 backdrop-blur-[2px]"
                      onClick={() => setIsBulkAddOpen(false)}
                    />
                    <motion.div key="bulk-modal" initial={{ opacity: 0, scale: 0.97, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: -10 }} transition={{ duration: 0.15 }}
                      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] bg-white rounded-2xl shadow-2xl z-50 border border-gray-200 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="px-7 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">Bulk add individuals</h2>
                        <button onClick={() => setIsBulkAddOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                          <X size={16} />
                        </button>
                      </div>

                      {/* Body */}
                      <div className="px-7 py-6 space-y-5">

                        {/* Drop zone */}
                        <div
                          onDragOver={e => { e.preventDefault(); setBulkDragOver(true); }}
                          onDragLeave={() => setBulkDragOver(false)}
                          onDrop={e => { e.preventDefault(); setBulkDragOver(false); }}
                          className={`flex items-center justify-center rounded-xl border-2 border-dashed py-10 cursor-pointer transition-colors ${bulkDragOver ? 'border-[#7A005D] bg-[#7A005D]/5' : 'border-gray-200 hover:border-[#7A005D]/40 hover:bg-gray-50'}`}
                          onClick={() => document.getElementById('bulk-csv-input')?.click()}
                        >
                          <input id="bulk-csv-input" type="file" accept=".csv" className="hidden" />
                          <div className="flex flex-col items-center gap-2">
                            <Upload size={20} className={bulkDragOver ? 'text-[#7A005D]' : 'text-gray-400'} />
                            <span className={`text-sm font-medium ${bulkDragOver ? 'text-[#7A005D]' : 'text-[#7A005D]'}`}>Drop or select (.csv)</span>
                          </div>
                        </div>

                        {/* Or divider */}
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-px bg-gray-200" />
                          <span className="text-sm font-semibold text-gray-500">Or</span>
                          <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* Paste area */}
                        <div className="space-y-2">
                          <p className="text-xs text-gray-500">Add people to the group by name, employee ID, work email, or personal email, separated by commas or new lines</p>
                          <div className="relative">
                            <textarea
                              value={bulkPasteText}
                              onChange={e => setBulkPasteText(e.target.value)}
                              placeholder="Paste details here"
                              rows={5}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 resize-none focus:ring-2 focus:ring-[#7A005D]/20 focus:border-[#7A005D]/40 outline-none"
                            />
                            <button
                              disabled={!bulkPasteText.trim()}
                              onClick={() => setIsBulkAddOpen(false)}
                              className="absolute bottom-3 right-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#7A005D] text-white hover:bg-[#60004a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                            >
                              Import
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Send Reminder Modal */}
              <AnimatePresence>
                {isSendReminderOpen && (() => {
                  const allPeople = [...new Set(documentData.map(d => d.employee))];
                  const allDocs   = [...new Set(documentData.map(d => d.doc))];
                  const filteredPeople = allPeople.filter(p => p.toLowerCase().includes(reminderPersonSearch.toLowerCase()));
                  const filteredDocs   = allDocs.filter(d => d.toLowerCase().includes(reminderDocSearch.toLowerCase()));

                  const RadioOption = ({
                    id, value, label, sublabel,
                  }: { id: string; value: typeof reminderType; label: string; sublabel?: string }) => (
                    <label htmlFor={id} className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${reminderType === value ? 'bg-[#7A005D]/5 border border-[#7A005D]/20' : 'border border-transparent hover:bg-gray-50'}`}>
                      <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${reminderType === value ? 'border-[#7A005D]' : 'border-gray-300'}`}>
                        {reminderType === value && <div className="w-2 h-2 rounded-full bg-[#7A005D]" />}
                      </div>
                      <input id={id} type="radio" className="sr-only" checked={reminderType === value} onChange={() => setReminderType(value)} />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{label}</p>
                        {sublabel && <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>}
                      </div>
                    </label>
                  );

                  return (
                    <>
                      <motion.div key="reminder-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 z-40 backdrop-blur-[2px]"
                        onClick={() => setIsSendReminderOpen(false)}
                      />
                      <motion.div key="reminder-modal" initial={{ opacity: 0, scale: 0.97, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: -10 }} transition={{ duration: 0.15 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white rounded-2xl shadow-2xl z-50 border border-gray-200 overflow-hidden"
                      >
                        {/* Header */}
                        <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-gray-100">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#7A005D]/10 flex items-center justify-center">
                              <Clock size={15} className="text-[#7A005D]" />
                            </div>
                            <h2 className="text-base font-bold text-gray-900">Send Reminder</h2>
                          </div>
                          <button onClick={() => setIsSendReminderOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                            <X size={16} />
                          </button>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-5 space-y-2">
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Remind</p>

                          <RadioOption id="r-all"      value="all"      label="All pending documents for everyone" />
                          <RadioOption id="r-expiring" value="expiring" label="All pending documents expiring within the next week" sublabel="Only sends to recipients with documents due in ≤ 7 days" />
                          <RadioOption id="r-person"   value="person"   label="A specific person" sublabel="Remind all pending documents assigned to one recipient" />

                          {/* Person search */}
                          {reminderType === 'person' && (
                            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="ml-7 mt-1">
                              <div className="relative">
                                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                  type="text"
                                  value={reminderPersonSearch}
                                  onChange={e => setReminderPersonSearch(e.target.value)}
                                  placeholder="Search recipient…"
                                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm focus:ring-2 focus:ring-[#7A005D]/20 focus:border-[#7A005D]/40 outline-none"
                                />
                              </div>
                              {reminderPersonSearch && (
                                <div className="mt-1 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden max-h-40 overflow-y-auto">
                                  {filteredPeople.length > 0 ? filteredPeople.map((p, pi) => (
                                    <button key={pi} onClick={() => setReminderPersonSearch(p)}
                                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-[#7A005D]/5 hover:text-[#7A005D] transition-colors">
                                      {p}
                                    </button>
                                  )) : <p className="px-3 py-2 text-xs text-gray-400">No matching recipients</p>}
                                </div>
                              )}
                            </motion.div>
                          )}

                          <RadioOption id="r-doc" value="doc" label="A specific document" sublabel="Remind all recipients who have this document pending" />

                          {/* Doc search */}
                          {reminderType === 'doc' && (
                            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="ml-7 mt-1">
                              <div className="relative">
                                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                  type="text"
                                  value={reminderDocSearch}
                                  onChange={e => setReminderDocSearch(e.target.value)}
                                  placeholder="Search document…"
                                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm focus:ring-2 focus:ring-[#7A005D]/20 focus:border-[#7A005D]/40 outline-none"
                                />
                              </div>
                              {reminderDocSearch && (
                                <div className="mt-1 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden max-h-40 overflow-y-auto">
                                  {filteredDocs.length > 0 ? filteredDocs.map((d, di) => (
                                    <button key={di} onClick={() => setReminderDocSearch(d)}
                                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-[#7A005D]/5 hover:text-[#7A005D] transition-colors flex items-center gap-2">
                                      <FileText size={12} className="text-gray-400 shrink-0" />
                                      <span className="truncate">{d}</span>
                                    </button>
                                  )) : <p className="px-3 py-2 text-xs text-gray-400">No matching documents</p>}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/60">
                          <button onClick={() => setIsSendReminderOpen(false)} className="text-sm font-medium text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                            Cancel
                          </button>
                          <button
                            disabled={
                              (reminderType === 'person' && !reminderPersonSearch) ||
                              (reminderType === 'doc'    && !reminderDocSearch)
                            }
                            onClick={() => setIsSendReminderOpen(false)}
                            className="bg-[#7A005D] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#60004a] transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Send Reminder
                          </button>
                        </div>
                      </motion.div>
                    </>
                  );
                })()}
              </AnimatePresence>

              {/* Envelope Detail Overlay */}
              <AnimatePresence>
                {selectedEnvelopeId && envelopeData[selectedEnvelopeId] && (() => {
                  const env = envelopeData[selectedEnvelopeId];
                  const statusDotColor: Record<string, string> = {
                    'Completed':   'bg-emerald-500',
                    'In progress': 'bg-orange-400',
                    'Waiting':     'bg-gray-400',
                  };
                  const statusTextColor: Record<string, string> = {
                    'Completed':   'text-emerald-700',
                    'In progress': 'text-orange-600',
                    'Waiting':     'text-gray-500',
                  };
                  return (
                    <motion.div
                      key="envelope-detail"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      className="w-full space-y-4"
                    >
                      {/* Back button */}
                      <button
                        onClick={() => setSelectedEnvelopeId(null)}
                        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        <ArrowLeft size={16} />
                        <span className="font-medium">Back</span>
                      </button>

                      {/* Header + meta card (single card matching screenshot) */}
                      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        {/* Title row */}
                        <div className="px-7 pt-6 pb-4 flex items-start justify-between border-b border-gray-100">
                          <div className="flex items-center gap-4 flex-wrap">
                            <h2 className="text-2xl font-bold text-gray-900">{env.name}</h2>
                            <span className="text-xs font-bold tracking-widest uppercase text-orange-500">{env.status}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button className="inline-flex items-center gap-2 bg-[#7A005D] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#60004a] transition-colors shadow-sm">
                              <PenLine size={15} />
                              Sign
                            </button>
                            <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </div>
                        {/* Sent on / Sent by */}
                        <div className="px-7 py-4 flex items-center gap-10">
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sent on</p>
                            <p className="text-sm font-semibold text-gray-900">{env.sentOn}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sent by</p>
                            <p className="text-sm font-semibold text-[#7A005D]">{env.sentBy}</p>
                          </div>
                        </div>
                      </div>

                      {/* Documents */}
                      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="px-7 py-5">
                          <h3 className="text-base font-bold text-gray-900 mb-4">Documents</h3>
                          <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
                            {env.docs.map((docName, di) => (
                              <div key={di} className="px-5 py-3.5 flex items-center justify-between group hover:bg-gray-50/60 transition-colors bg-white">
                                <div className="flex items-center gap-3">
                                  <FileText size={16} className="text-gray-400 shrink-0" />
                                  <span className="text-sm text-gray-800 font-medium">{docName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                  <button className="hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"><Eye size={16} /></button>
                                  <button className="hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"><Download size={16} /></button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Recipients */}
                      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        {/* Recipients header */}
                        <div className="px-7 pt-5 pb-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-bold text-gray-900">
                              Recipients <span className="text-gray-400 font-normal text-sm">· {env.recipients.length}</span>
                            </h3>
                            <div className="flex items-center gap-2">
                              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"><Share2 size={16} /></button>
                              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"><LayoutGrid size={16} /></button>
                              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"><Maximize2 size={16} /></button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <div className="relative w-64">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                              <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-[#7A005D]/20 outline-none"
                              />
                            </div>
                            <button className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">
                              <SlidersHorizontal size={15} />
                  Filter
                </button>
                          </div>
              </div>

                        {/* Recipients table */}
                <table className="w-full text-left border-collapse">
                  <thead>
                            <tr className="border-t border-b border-gray-100 bg-gray-50/50">
                              <th className="px-7 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-24">Order</th>
                              <th className="px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                <span className="flex items-center gap-1">Recipients <ChevronDown size={12} /></span>
                              </th>
                              <th className="px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                <span className="flex items-center gap-1">Status <ChevronDown size={12} /></span>
                              </th>
                              <th className="px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                <span className="flex items-center gap-1">Actions <ChevronDown size={12} /></span>
                              </th>
                              <th className="px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                <span className="flex items-center gap-1">Sent on <ChevronDown size={12} /></span>
                              </th>
                              <th className="px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                <span className="flex items-center gap-1">Completed on <ChevronDown size={12} /></span>
                              </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                            {env.recipients.map((r, ri) => (
                              <tr key={ri} className="hover:bg-gray-50/40 transition-colors">
                                <td className="px-7 py-4">
                                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-[#7A005D]/30 text-[#7A005D] text-xs font-bold">{r.order}</span>
                                </td>
                                <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-100 shrink-0 bg-gray-100">
                                      {r.avatar
                                        ? <img src={`https://picsum.photos/seed/user${r.avatar}/100/100`} alt={r.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                        : <span className="w-full h-full flex items-center justify-center text-[11px] font-bold text-gray-600">{r.initials}</span>
                                      }
                            </div>
                            <div>
                                      <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                                      <p className="text-[11px] text-gray-400">{r.email}</p>
                            </div>
                          </div>
                        </td>
                                <td className="px-4 py-4">
                                  <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full shrink-0 ${statusDotColor[r.status] ?? 'bg-gray-400'}`} />
                                    <span className={`text-sm font-medium ${statusTextColor[r.status] ?? 'text-gray-500'}`}>{r.status}</span>
                                  </div>
                        </td>
                                <td className="px-4 py-4">
                                  <span className="text-sm font-semibold text-gray-800">{r.action}</span>
                        </td>
                                <td className="px-4 py-4">
                                  <span className="text-sm text-gray-600">{r.sentOn}</span>
                                </td>
                                <td className="px-4 py-4">
                                  <span className="text-sm text-gray-600">{r.completedOn ?? '—'}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>

              {/* Documents Table — hidden when envelope detail is open */}
              {!selectedEnvelopeId && (() => {
                const statusConfig: Record<string, { dot: string; text: string; bg: string }> = {
                  Signed:   { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50'  },
                  Pending:  { dot: 'bg-orange-500',  text: 'text-orange-700',  bg: 'bg-orange-50'   },
                  Expired:  { dot: 'bg-red-500',     text: 'text-red-700',     bg: 'bg-red-50'      },
                  Archived: { dot: 'bg-gray-400',    text: 'text-gray-600',    bg: 'bg-gray-100'    },
                  Uploaded: { dot: 'bg-blue-500',    text: 'text-blue-700',    bg: 'bg-blue-50'     },
                };
                const lastUpdateLabel: Record<string, string> = {
                  sent:   'Sent', opened: 'Last opened', signed: 'Signed',
                };
                type MenuItem = { icon: React.ReactNode; label: string; danger?: boolean; action?: string };
                const getMenuItems = (status: string): MenuItem[] => {
                  switch (status) {
                    case 'Pending':
                      return [
                        { icon: <Eye size={15} />,            label: 'Preview Document' },
                        { icon: <Send size={15} />,           label: 'Resend' },
                        { icon: <Clock size={15} />,          label: 'Send reminder', action: 'send-reminder' as const },
                        { icon: <Upload size={15} />,         label: 'Completed already? Upload' },
                        { icon: <BarChart3 size={15} />,      label: 'View Activity' },
                        { icon: <Ban size={15} />,            label: 'Cancel request', danger: true },
                      ];
                    case 'Signed':
                      return [
                        { icon: <Download size={15} />,       label: 'Download' },
                        { icon: <BarChart3 size={15} />,      label: 'View Activity' },
                        { icon: <Archive size={15} />,        label: 'Archive' },
                      ];
                    case 'Expired':
                      return [
                        { icon: <Send size={15} />,           label: 'Resend' },
                        { icon: <Upload size={15} />,         label: 'Completed already? Upload' },
                        { icon: <BarChart3 size={15} />,      label: 'View Activity' },
                        { icon: <Ban size={15} />,            label: 'Cancel request', danger: true },
                      ];
                    case 'Archived':
                      return [
                        { icon: <Download size={15} />,       label: 'Download' },
                        { icon: <ArchiveRestore size={15} />, label: 'Unarchive' },
                      ];
                    case 'Uploaded':
                      return [
                        { icon: <Download size={15} />,       label: 'Download' },
                        { icon: <Archive size={15} />,        label: 'Archive' },
                      ];
                    default: return [];
                  }
                };
                return (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-visible">
                  <table className="w-full text-left border-collapse table-fixed rounded-xl">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th style={{width:'27%'}} className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider rounded-tl-xl">Document</th>
                        <th style={{width:'21%'}} className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Employee</th>
                        <th style={{width:'21%'}} className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Envelope</th>
                        <th style={{width:'12%'}} className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                        <th style={{width:'13%'}} className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Last Update</th>
                        <th style={{width:'48px'}} className="px-3 py-3 rounded-tr-xl"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredDocumentData.map((row, i) => {
                        const s = statusConfig[row.docStatus] ?? statusConfig['Pending'];
                        const env = row.envelopeId ? envelopeData[row.envelopeId] : null;
                        const menuItems = getMenuItems(row.docStatus);
                        return (
                          <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                            {/* Document */}
                            <td className="px-6 py-4 overflow-hidden">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#7A005D]/10 flex items-center justify-center shrink-0">
                                  <FileText size={15} className="text-[#7A005D]" />
                                </div>
                                <div className="min-w-0 flex-1 overflow-hidden">
                                  <p className="text-xs font-semibold text-gray-900 truncate">{row.doc}</p>
                                  <p className="text-[10px] text-gray-400 mt-0.5">{row.docId}</p>
                                </div>
                          </div>
                        </td>
                            {/* Employee */}
                            <td className="px-6 py-4 overflow-hidden">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 shrink-0">
                                  <img src={`https://picsum.photos/seed/user${row.avatar}/100/100`} alt={row.employee} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                                <div className="min-w-0 overflow-hidden">
                                  <p className="text-xs font-bold text-gray-900 truncate">{row.employee}</p>
                                  <p className="text-[10px] text-gray-500 truncate">{row.role}</p>
                                </div>
                              </div>
                        </td>
                            {/* Envelope */}
                            <td className="px-6 py-4 overflow-hidden">
                              {env ? (
                                <button onClick={() => setSelectedEnvelopeId(row.envelopeId!)} className="text-xs font-medium text-[#7A005D] hover:underline text-left truncate block w-full">
                                  {env.name}
                          </button>
                              ) : (
                                <span className="text-xs text-gray-300">—</span>
                              )}
                        </td>
                            {/* Status */}
                            <td className="px-6 py-4 overflow-hidden">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${s.bg} ${s.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
                                <span className="truncate">{row.docStatus}</span>
                              </span>
                            </td>
                            {/* Last Update */}
                            <td className="px-6 py-4 overflow-hidden">
                              <p className="text-xs font-semibold text-gray-700">{row.lastUpdate}</p>
                              <p className="text-[10px] text-gray-400 mt-0.5">{lastUpdateLabel[row.lastUpdateState]}</p>
                            </td>
                            {/* Actions dropdown */}
                            <td style={{width:'48px'}} className="py-4 pr-3 pl-1 text-center relative">
                              <button
                                onClick={(e) => { e.stopPropagation(); setOpenDropdownIdx(openDropdownIdx === i ? null : i); }}
                                className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100"
                              >
                                <MoreVertical size={16} />
                              </button>
                              {openDropdownIdx === i && (
                                <>
                                  <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownIdx(null)} />
                                  <div className="absolute right-full top-2 mr-1 z-20 bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-52 text-left">
                                    {menuItems.map((item, mi) => (
                                      <button
                                        key={mi}
                                        onClick={() => {
                                          setOpenDropdownIdx(null);
                                          if (item.action === 'send-reminder') {
                                            setReminderType('all');
                                            setReminderPersonSearch('');
                                            setReminderDocSearch('');
                                            setIsSendReminderOpen(true);
                                          }
                                        }}
                                        className={`w-full flex items-start gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-left ${item.danger ? 'text-red-600' : 'text-gray-700'}`}
                                      >
                                        <span className={`mt-0.5 shrink-0 ${item.danger ? 'text-red-500' : 'text-gray-400'}`}>{item.icon}</span>
                                        <span>{item.label}</span>
                                      </button>
                                    ))}
                                  </div>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
                );
              })()}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
