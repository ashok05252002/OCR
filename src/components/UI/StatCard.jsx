import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import AnimatedCounter from './AnimatedCounter.jsx';

const StatCard = ({ title, value, icon: Icon, color, trend, delay = 0, format }) => {
  const { mode } = useTheme();
  const colors = {
    primary: { light: 'from-blue-500 to-indigo-600', dark: 'from-blue-800 to-indigo-900', iconBgLight: 'bg-white/20', iconBgDark: 'bg-blue-600/30' },
    green: { light: 'from-green-500 to-teal-600', dark: 'from-green-800 to-teal-900', iconBgLight: 'bg-white/20', iconBgDark: 'bg-green-600/30' },
    red: { light: 'from-red-500 to-orange-600', dark: 'from-red-800 to-orange-900', iconBgLight: 'bg-white/20', iconBgDark: 'bg-red-600/30' },
    yellow: { light: 'from-yellow-500 to-amber-600', dark: 'from-yellow-800 to-amber-900', iconBgLight: 'bg-white/20', iconBgDark: 'bg-yellow-600/30' },
    purple: { light: 'from-purple-500 to-fuchsia-600', dark: 'from-purple-800 to-fuchsia-900', iconBgLight: 'bg-white/20', iconBgDark: 'bg-purple-600/30' },
  };
  const selectedColor = colors[color];
  const gradient = mode === 'dark' ? selectedColor.dark : selectedColor.light;
  const iconBg = mode === 'dark' ? selectedColor.iconBgDark : selectedColor.iconBgLight;

  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, delay }} whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.2 } }} className={`rounded-xl shadow-lg p-6 relative overflow-hidden text-white bg-gradient-to-br ${gradient}`}>
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-sm font-medium mb-2 opacity-80">{title}</p>
          <p className="text-3xl font-bold mb-2">{typeof value === 'number' ? <AnimatedCounter value={value} format={format} /> : value}</p>
          {trend && <div className="flex items-center"><span className={`text-sm font-medium ${trend.isPositive ? 'text-green-300' : 'text-red-300'}`}>{trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%</span><span className="text-sm ml-1 opacity-70">from last month</span></div>}
        </div>
        <div className={`p-4 rounded-full ${iconBg}`}><Icon className="w-6 h-6" /></div>
      </div>
    </motion.div>
  );
};

export default StatCard;
