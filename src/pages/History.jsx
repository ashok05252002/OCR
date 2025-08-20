import React, { useState } from 'react';
import { Check, X, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from '../components/UI/Modal.jsx';
import { mockExpenseRequests } from '../data/mockData.js';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { formatCurrency } from '../utils/currency.js';

const History = () => {
  const { currentColors } = useTheme();
  const [activeTab, setActiveTab] = useState('approved');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const approvedRequests = mockExpenseRequests.filter(req => req.status === 'approved');
  const rejectedRequests = mockExpenseRequests.filter(req => req.status === 'rejected');
  const currentRequests = activeTab === 'approved' ? approvedRequests : rejectedRequests;

  const getStatusBadge = (status) => {
    const base = "inline-flex px-2 py-1 text-xs font-semibold rounded-full";
    if (status === 'approved') return `${base} bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300`;
    if (status === 'rejected') return `${base} bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300`;
    return `${base} bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-300`;
  };

  return (
    <div>
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-2xl font-bold mb-2" style={{ color: currentColors.text }}>History</h1>
        <p style={{ color: currentColors.textSecondary }}>View approved and rejected expense requests</p>
      </motion.div>
      <motion.div className="mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
        <div className="border-b" style={{ borderColor: currentColors.border }}>
          <nav className="-mb-px flex space-x-8">
            <button onClick={() => setActiveTab('approved')} className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'approved' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'}`}><Check className="w-4 h-4 inline mr-2" />Approved ({approvedRequests.length})</button>
            <button onClick={() => setActiveTab('rejected')} className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'rejected' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'}`}><X className="w-4 h-4 inline mr-2" />Rejected ({rejectedRequests.length})</button>
          </nav>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-lg shadow-sm border" style={{ backgroundColor: currentColors.surface, borderColor: currentColors.border }}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead style={{ backgroundColor: currentColors.background }}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>User</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: currentColors.border }}>
              {currentRequests.map((request, index) => (
                <motion.tr key={request.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><img className="h-10 w-10 rounded-full" src={request.user.avatar} alt={request.user.name} /><div className="ml-4"><div className="text-sm font-medium" style={{ color: currentColors.text }}>{request.user.name}</div><div className="text-sm" style={{ color: currentColors.textSecondary }}>{request.user.email}</div></div></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium" style={{ color: currentColors.text }}>{formatCurrency(request.amount)}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm" style={{ color: currentColors.text }}>{request.date}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={getStatusBadge(request.status)}>{request.status}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><button onClick={() => setSelectedRequest(request)} className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 transition-colors"><Eye className="w-4 h-4 mr-1" />View</button></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {currentRequests.length === 0 && <div className="text-center py-12" style={{ color: currentColors.textSecondary }}>No {activeTab} requests found.</div>}
      </motion.div>
      <Modal isOpen={!!selectedRequest} onClose={() => setSelectedRequest(null)} title="Expense Request Details" size="xl">
        {selectedRequest && <div className="grid md:grid-cols-2 gap-8"><div className="flex flex-col"><h3 className="text-lg font-medium mb-4" style={{ color: currentColors.text }}>Receipt Image</h3><div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-2 flex-grow flex items-center justify-center"><img src={selectedRequest.receiptImage} alt="Receipt" className="max-w-full max-h-[500px] h-auto w-auto object-contain rounded-lg"/></div></div><div className="flex flex-col"><h3 className="text-lg font-medium mb-4" style={{ color: currentColors.text }}>Extracted Information</h3><div className="space-y-4 flex-grow overflow-y-auto pr-2" style={{ maxHeight: '500px' }}><div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg"><h4 className="font-semibold mb-1 text-sm" style={{ color: currentColors.text }}>{selectedRequest.ocrData.vendor}</h4><p className="text-sm" style={{ color: currentColors.textSecondary }}>Bill No: {selectedRequest.ocrData.billNo}</p><p className="text-sm mt-1" style={{ color: currentColors.textSecondary }}>Date: {selectedRequest.ocrData.date}</p></div><div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg"><h4 className="font-semibold mb-2 text-sm" style={{ color: currentColors.text }}>Itemized Details</h4><table className="w-full text-sm"><thead><tr className="border-b" style={{borderColor: currentColors.border}}><th className="text-left font-medium pb-2" style={{color: currentColors.textSecondary}}>Item</th><th className="text-center font-medium pb-2" style={{color: currentColors.textSecondary}}>Qty</th><th className="text-right font-medium pb-2" style={{color: currentColors.textSecondary}}>Rate</th><th className="text-right font-medium pb-2" style={{color: currentColors.textSecondary}}>Amount</th></tr></thead><tbody>{selectedRequest.ocrData.items.map((item, index) => <tr key={index} className="border-b" style={{borderColor: currentColors.border}}><td className="py-2" style={{color: currentColors.text}}>{item.name}</td><td className="text-center py-2" style={{color: currentColors.textSecondary}}>{item.quantity}</td><td className="text-right py-2" style={{color: currentColors.textSecondary}}>{formatCurrency(item.price)}</td><td className="text-right py-2 font-medium" style={{color: currentColors.text}}>{formatCurrency(item.amount)}</td></tr>)}</tbody></table></div><div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg space-y-2"><div className="flex justify-between items-center text-sm"><span style={{color: currentColors.textSecondary}}>Subtotal</span><span style={{color: currentColors.text}}>{formatCurrency(selectedRequest.ocrData.subtotal)}</span></div><div className="flex justify-between items-center text-sm"><span style={{color: currentColors.textSecondary}}>CGST ({selectedRequest.ocrData.cgst.rate}%)</span><span style={{color: currentColors.text}}>{formatCurrency(selectedRequest.ocrData.cgst.amount)}</span></div><div className="flex justify-between items-center text-sm"><span style={{color: currentColors.textSecondary}}>SGST ({selectedRequest.ocrData.sgst.rate}%)</span><span style={{color: currentColors.text}}>{formatCurrency(selectedRequest.ocrData.sgst.amount)}</span></div><div className="flex justify-between items-center text-sm"><span style={{color: currentColors.textSecondary}}>Service Charge ({selectedRequest.ocrData.serviceCharge.rate}%)</span><span style={{color: currentColors.text}}>{formatCurrency(selectedRequest.ocrData.serviceCharge.amount)}</span></div><div className="flex justify-between items-center text-lg font-bold border-t pt-2 mt-2" style={{borderColor: currentColors.border}}><span style={{color: currentColors.text}}>Total</span><span style={{color: currentColors.primary}}>{formatCurrency(selectedRequest.ocrData.total)}</span></div></div></div><div className="mt-6"><button onClick={() => setSelectedRequest(null)} className="w-full inline-flex justify-center items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors" style={{ borderColor: currentColors.border, color: currentColors.text, backgroundColor: currentColors.surface }}>Close</button></div></div></div>}
      </Modal>
    </div>
  );
};

export default History;
