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
  GripVertical
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
    className={`bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col group/card ${className}`}
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
  const [activeView, setActiveView] = useState<'overview' | 'team'>('overview');

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

  const teamData = [
    { name: 'David Gonzales', role: 'CEO, Finance', docs: { c: 2, t: 7 }, envs: { c: 0, t: 5 }, status: 'Active', notices: 4, avatar: '1' },
    { name: 'Carmen Brown', role: 'COO, Customer Support', docs: { c: 2, t: 3 }, envs: { c: 0, t: 1 }, status: 'Active', notices: 1, avatar: '2' },
    { name: 'Harry Porter', role: 'Demo Admin, Engineering', docs: { c: 17, t: 17 }, envs: { c: 3, t: 21 }, status: 'Active', notices: 5, avatar: '3' },
    { name: 'Tracy Davis', role: 'CFO, Finance', docs: { c: 2, t: 3 }, envs: { c: 0, t: 2 }, status: 'Active', notices: 1, avatar: '4' },
    { name: 'Michael Gomez', role: 'CTO, Engineering', docs: { c: 2, t: 2 }, envs: { c: 0, t: 4 }, status: 'Active', notices: 2, avatar: '5' },
    { name: 'Natalie Jackson', role: 'VP Engineering, Engineering', docs: { c: 2, t: 3 }, envs: { c: 0, t: 4 }, status: 'Active', notices: 2, avatar: '6' },
    { name: 'Kenneth Walker', role: 'Director of Engineering Ops, Engineering', docs: { c: 2, t: 3 }, envs: { c: 0, t: 4 }, status: 'Active', notices: 2, avatar: '7' },
    { name: 'Tara Moore', role: 'Software Engineer, Engineering', docs: { c: 2, t: 3 }, envs: { c: 0, t: 4 }, status: 'Active', notices: 2, avatar: '8' },
  ];

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
            icon={Users} 
            label="My team" 
            active={activeView === 'team'} 
            isCollapsed={isSidebarCollapsed} 
            onClick={() => setActiveView('team')}
          />
          
          <div className="my-2 border-t border-gray-100 mx-4" />
          
          <SidebarItem icon={CheckSquare} label="Tasks" isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={FileText} label="Templates" isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={UserSquare2} label="Recipients" isCollapsed={isSidebarCollapsed} />
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
          {activeView === 'overview' ? (
            <>
              <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
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
              <div className="max-w-7xl mx-auto px-6">
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
                  <div key="status">
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
                  <div key="templates">
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
                  <div key="people">
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
            <div className="max-w-7xl mx-auto space-y-6">
              {/* AI Insight Banner */}
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
                  <button className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Team Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">People</h2>
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

              {/* Table Controls */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search for an employee" 
                    className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#7A005D]/20 outline-none"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#7A005D]/20 rounded-lg text-xs font-semibold text-[#7A005D] hover:bg-[#7A005D]/5">
                  <Filter size={16} />
                  Filter
                </button>
              </div>

              {/* Team Table */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Documents</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Envelopes</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Employee Status</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Notices</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {teamData.map((person, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                              <img 
                                src={`https://picsum.photos/seed/user${person.avatar}/100/100`} 
                                alt={person.name} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{person.name}</p>
                              <p className="text-[11px] text-gray-500">{person.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <ProgressBar current={person.docs.c} total={person.docs.t} />
                        </td>
                        <td className="px-6 py-4">
                          <ProgressBar current={person.envs.c} total={person.envs.t} color="bg-blue-500" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-xs font-medium text-gray-700">{person.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-semibold text-[#7A005D] underline cursor-pointer">{person.notices} received</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
