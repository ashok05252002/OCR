import React from 'react';
import { CheckCircle, Clock, XCircle, FileText, TrendingUp, Users, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../components/UI/StatCard.jsx';
import TimeCard from '../components/Dashboard/TimeCard.jsx';
import { dashboardStats, mockExpenseRequests } from '../data/mockData.js';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { formatCurrency, formatCurrencyCompact } from '../utils/currency.js';

const Dashboard = () => {
  const { currentColors } = useTheme();
  const recentRequests = mockExpenseRequests.filter(req => req.status === 'pending').slice(0, 5);
  const totalApprovedAmount = mockExpenseRequests.filter(req => req.status === 'approved').reduce((sum, req) => sum + req.amount, 0);
  const totalPendingAmount = mockExpenseRequests.filter(req => req.status === 'pending').reduce((sum, req) => sum + req.amount, 0);

  return (
    <div>
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: currentColors.text }}>Dashboard</h1>
        <p style={{ color: currentColors.textSecondary }}>Here's your real-time expense approval overview.</p>
      </motion.div>
      <div className="mb-8"><TimeCard /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Approvals" value={dashboardStats.totalApprovals} icon={CheckCircle} color="green" trend={{ value: 12, isPositive: true }} delay={0.1} />
        <StatCard title="Pending Approvals" value={dashboardStats.pendingApprovals} icon={Clock} color="yellow" trend={{ value: 3, isPositive: false }} delay={0.2} />
        <StatCard title="Total Rejected" value={dashboardStats.totalRejected} icon={XCircle} color="red" trend={{ value: 8, isPositive: false }} delay={0.3} />
        <StatCard title="Total Requests" value={dashboardStats.totalRequests} icon={FileText} color="primary" trend={{ value: 15, isPositive: true }} delay={0.4} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Approved Amount" value={totalApprovedAmount} icon={DollarSign} color="green" trend={{ value: 18, isPositive: true }} delay={0.5} format={formatCurrencyCompact} />
        <StatCard title="Pending Amount" value={totalPendingAmount} icon={TrendingUp} color="yellow" trend={{ value: 5, isPositive: true }} delay={0.6} format={formatCurrencyCompact} />
        <StatCard title="Active Users" value={mockExpenseRequests.length} icon={Users} color="purple" trend={{ value: 7, isPositive: true }} delay={0.7} />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="rounded-xl shadow-lg border" style={{ backgroundColor: currentColors.surface, borderColor: currentColors.border }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: currentColors.border }}><h2 className="text-lg font-semibold" style={{ color: currentColors.text }}>Recent Pending Requests</h2></div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead style={{ backgroundColor: currentColors.background }}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>User</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: currentColors.border }}>
              {recentRequests.map((request, index) => (
                <motion.tr key={request.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><img className="h-8 w-8 rounded-full" src={request.user.avatar} alt={request.user.name} /><div className="ml-3"><div className="text-sm font-medium" style={{ color: currentColors.text }}>{request.user.name}</div></div></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium" style={{ color: currentColors.text }}>{formatCurrency(request.amount)}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: currentColors.secondary, color: currentColors.primary }}>{request.category}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm" style={{ color: currentColors.text }}>{request.date}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">{request.status}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
