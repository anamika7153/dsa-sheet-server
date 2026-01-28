import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const ProgressBar = ({ percentage, color }) => (
  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
    <div
      className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
      style={{ width: `${percentage}%` }}
    />
  </div>
);

const ProgressCard = ({ title, percentage, completed, total, color, bgColor, borderColor }) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${borderColor} hover:shadow-xl transition-shadow`}>
    <div className="flex justify-between items-center mb-2">
      <h3 className={`text-xl font-semibold ${color}`}>{title}</h3>
      <span className={`text-3xl font-bold ${color}`}>{percentage}%</span>
    </div>
    <p className="text-gray-500 text-sm mb-3">
      <span className="font-semibold text-gray-700">{completed}</span> / {total} completed
    </p>
    <ProgressBar percentage={percentage} color={bgColor} />
    <p className="text-gray-500 text-sm mt-3">
      {percentage === 100 ? 'Completed!' : percentage === 0 ? 'Not started yet' : 'In progress...'}
    </p>
  </div>
);

const Progress = () => {
  const [stats, setStats] = useState({
    easy: { percentage: 0, completed: 0, total: 0 },
    medium: { percentage: 0, completed: 0, total: 0 },
    hard: { percentage: 0, completed: 0, total: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/progress/stats`);
      setStats(res.data.data);
    } catch (error) {
      setError('Failed to load progress statistics');
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalCompleted = stats.easy.completed + stats.medium.completed + stats.hard.completed;
  const totalProblems = stats.easy.total + stats.medium.total + stats.hard.total;
  const overallProgress = totalProblems > 0 ? Math.round((totalCompleted / totalProblems) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Progress Reports</h1>
          <p className="text-gray-600">Track your DSA learning journey</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {/* Overall Progress Circle */}
        <div className="flex justify-center mb-10">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#3b82f6"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${overallProgress * 5.53} 553`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-gray-800">{overallProgress}%</span>
              <span className="text-gray-500 text-sm">Overall</span>
              <span className="text-gray-400 text-xs mt-1">{totalCompleted}/{totalProblems}</span>
            </div>
          </div>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <ProgressCard
            title="Easy"
            percentage={stats.easy.percentage}
            completed={stats.easy.completed}
            total={stats.easy.total}
            color="text-green-600"
            bgColor="bg-green-500"
            borderColor="border-green-500"
          />
          <ProgressCard
            title="Medium"
            percentage={stats.medium.percentage}
            completed={stats.medium.completed}
            total={stats.medium.total}
            color="text-yellow-600"
            bgColor="bg-yellow-500"
            borderColor="border-yellow-500"
          />
          <ProgressCard
            title="Hard"
            percentage={stats.hard.percentage}
            completed={stats.hard.completed}
            total={stats.hard.total}
            color="text-red-600"
            bgColor="bg-red-500"
            borderColor="border-red-500"
          />
        </div>

        {/* Motivational Message */}
        <div className="text-center mt-10">
          <p className="text-gray-600 text-lg">
            {overallProgress === 100
              ? "Congratulations! You've mastered all topics!"
              : overallProgress >= 75
              ? "Almost there! Keep up the great work!"
              : overallProgress >= 50
              ? "Halfway through! You're doing amazing!"
              : overallProgress >= 25
              ? "Good start! Keep pushing forward!"
              : "Start your journey today!"}
          </p>
        </div>
      </div>

      <footer className="fixed bottom-0 w-full bg-white shadow-inner py-4 text-center text-gray-600">
        &copy; 2026 DSA Sheet. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Progress;
