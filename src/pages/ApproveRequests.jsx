import React, { useState } from 'react';
import { Eye, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from '../components/UI/Modal.jsx';
import { mockExpenseRequests } from '../data/mockData.js';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { formatCurrency } from '../utils/currency.js';

const ApproveRequests = () => {
  const { currentColors } = useTheme();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState(mockExpenseRequests.filter(req => req.status === 'pending'));

  const handleAction = (id, type) => {
    setRequests(requests.filter(req => req.id !== id));
    setSelectedRequest(null);
  };

  return (
    <div>
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-2xl font-bold mb-2" style={{ color: currentColors.text }}>Approve Requests</h1>
        <p style={{ color: currentColors.textSecondary }}>Review and approve pending expense requests</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-lg shadow-sm border" style={{ backgroundColor: currentColors.surface, borderColor: currentColors.border }}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead style={{ backgroundColor: currentColors.background }}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>User</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Category</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: currentColors.border }}>
              {requests.map((request, index) => (
                <motion.tr key={request.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><img className="h-10 w-10 rounded-full" src={request.user.avatar} alt={request.user.name}/><div className="ml-4"><div className="text-sm font-medium" style={{ color: currentColors.text }}>{request.user.name}</div><div className="text-sm" style={{ color: currentColors.textSecondary }}>{request.user.email}</div></div></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium" style={{ color: currentColors.text }}>{formatCurrency(request.amount)}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm" style={{ color: currentColors.text }}>{request.date}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: currentColors.secondary, color: currentColors.primary }}>{request.category}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><button onClick={() => setSelectedRequest(request)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 transition-colors" style={{ backgroundColor: currentColors.primary }}><Eye className="w-4 h-4 mr-2" />Review</button></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      <Modal isOpen={!!selectedRequest} onClose={() => setSelectedRequest(null)} title="Expense Request Details" size="xl">
        {selectedRequest && <div className="grid md:grid-cols-2 gap-8"><div className="flex flex-col"><h3 className="text-lg font-medium mb-4" style={{ color: currentColors.text }}>Receipt Image</h3><div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-2 flex-grow flex items-center justify-center"><img src={selectedRequest.receiptImage} alt="Receipt" className="max-w-full max-h-[500px] h-auto w-auto object-contain rounded-lg"/></div></div><div className="flex flex-col"><h3 className="text-lg font-medium mb-4" style={{ color: currentColors.text }}>Extracted Information</h3><div className="space-y-4 flex-grow overflow-y-auto pr-2" style={{ maxHeight: '500px' }}><div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg"><h4 className="font-semibold mb-1 text-sm" style={{ color: currentColors.text }}>{selectedRequest.ocrData.vendor}</h4><p className="text-sm" style={{ color: currentColors.textSecondary }}>Bill No: {selectedRequest.ocrData.billNo}</p><p className="text-sm mt-1" style={{ color: currentColors.textSecondary }}>Date: {selectedRequest.ocrData.date}</p></div><div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg"><h4 className="font-semibold mb-2 text-sm" style={{ color: currentColors.text }}>Itemized Details</h4><table className="w-full text-sm"><thead><tr className="border-b" style={{borderColor: currentColors.border}}><th className="text-left font-medium pb-2" style={{color: currentColors.textSecondary}}>Item</th><th className="text-center font-medium pb-2" style={{color: currentColors.textSecondary}}>Qty</th><th className="text-right font-medium pb-2" style={{color: currentColors.textSecondary}}>Rate</th><th className="text-right font-medium pb-2" style={{color: currentColors.textSecondary}}>Amount</th></tr></thead><tbody>{selectedRequest.ocrData.items.map((item, index) => <tr key={index} className="border-b" style={{borderColor: currentColors.border}}><td className="py-2" style={{color: currentColors.text}}>{item.name}</td><td className="text-center py-2" style={{color: currentColors.textSecondary}}>{item.quantity}</td><td className="text-right py-2" style={{color: currentColors.textSecondary}}>{formatCurrency(item.price)}</td><td className="text-right py-2 font-medium" style={{color: currentColors.text}}>{formatCurrency(item.amount)}</td></tr>)}</tbody></table></div><div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg space-y-2"><div className="flex justify-between items-center text-sm"><span style={{color: currentColors.textSecondary}}>Subtotal</span><span style={{color: currentColors.text}}>{formatCurrency(selectedRequest.ocrData.subtotal)}</span></div><div className="flex justify-between items-center text-sm"><span style={{color: currentColors.textSecondary}}>CGST ({selectedRequest.ocrData.cgst.rate}%)</span><span style={{color: currentColors.text}}>{formatCurrency(selectedRequest.ocrData.cgst.amount)}</span></div><div className="flex justify-between items-center text-sm"><span style={{color: currentColors.textSecondary}}>SGST ({selectedRequest.ocrData.sgst.rate}%)</span><span style={{color: currentColors.text}}>{formatCurrency(selectedRequest.ocrData.sgst.amount)}</span></div><div className="flex justify-between items-center text-sm"><span style={{color: currentColors.textSecondary}}>Service Charge ({selectedRequest.ocrData.serviceCharge.rate}%)</span><span style={{color: currentColors.text}}>{formatCurrency(selectedRequest.ocrData.serviceCharge.amount)}</span></div><div className="flex justify-between items-center text-lg font-bold border-t pt-2 mt-2" style={{borderColor: currentColors.border}}><span style={{color: currentColors.text}}>Total</span><span style={{color: currentColors.primary}}>{formatCurrency(selectedRequest.ocrData.total)}</span></div></div></div><div className="flex space-x-3 mt-6"><button onClick={() => handleAction(selectedRequest.id, 'approve')} className="flex-1 inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus-ring"><Check className="w-5 h-5 mr-2" />Approve</button><button onClick={() => handleAction(selectedRequest.id, 'reject')} className="flex-1 inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus-ring"><X className="w-5 h-5 mr-2" />Reject</button></div></div></div>}
      </Modal>
    </div>
  );
};

export default ApproveRequests;
