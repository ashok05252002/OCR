import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const SidePanel = ({ isOpen, onClose, title, children }) => {
  const { currentColors } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 z-[60]" />
          <motion.div initial={{ x: '100%' }} animate={{ x: '0%' }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed top-0 right-0 h-full w-full max-w-md shadow-xl z-[70]" style={{ backgroundColor: currentColors.surface }}>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: currentColors.border }}>
                <h3 className="text-lg font-semibold" style={{ color: currentColors.text }}>{title}</h3>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors" style={{ color: currentColors.textSecondary }}><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 flex-grow overflow-y-auto">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidePanel;
