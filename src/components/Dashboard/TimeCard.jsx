import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';

const TimeCard = () => {
  const { user } = useAuth();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const hours = time.getHours();
  const isDay = hours >= 6 && hours < 18;
  const greeting = isDay ? 'Good Morning' : 'Good Evening';
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const backgroundGradient = isDay ? 'from-sky-400 to-blue-500' : 'from-slate-800 to-indigo-900';
  const iconColor = isDay ? 'text-yellow-300' : 'text-blue-300';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className={`rounded-xl shadow-lg p-6 relative overflow-hidden flex items-center justify-between text-white bg-gradient-to-br ${backgroundGradient}`}>
      <div>
        <h2 className="text-xl font-bold">{greeting}, {user?.name?.split(' ')[0]}!</h2>
        <p className="text-sm opacity-80">{isDay ? "Let's make today productive." : "Hope you had a great day."}</p>
        <div className="mt-4 text-3xl font-bold">{formattedTime}</div>
      </div>
      <motion.div key={isDay ? 'sun' : 'moon'} initial={{ scale: 0, rotate: -90, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} className={`text-6xl ${iconColor}`}>
        {isDay ? <Sun /> : <Moon />}
      </motion.div>
    </motion.div>
  );
};

export default TimeCard;
