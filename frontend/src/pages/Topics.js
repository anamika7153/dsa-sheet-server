import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TopicCard from '../components/TopicCard';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [topicsRes, progressRes] = await Promise.all([
        axios.get(`${API_URL}/topics`),
        axios.get(`${API_URL}/progress`)
      ]);
      setTopics(topicsRes.data.data);
      setProgress(progressRes.data.data);
    } catch (error) {
      setError('Failed to load topics');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (topicId, subtopicIndex, completed) => {
    try {
      await axios.post(`${API_URL}/progress`, {
        topicId,
        subtopicIndex,
        completed
      });

      // Update local state
      if (completed) {
        setProgress(prev => [...prev, { topicId, subtopicIndex }]);
      } else {
        setProgress(prev =>
          prev.filter(p => !(p.topicId === topicId && p.subtopicIndex === subtopicIndex))
        );
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-500 mb-2">Topics</h1>
          <p className="text-gray-600">Explore these exciting topics!</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="max-w-5xl mx-auto">
          {topics.map(topic => (
            <TopicCard
              key={topic._id}
              topic={topic}
              progress={progress}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topics;
