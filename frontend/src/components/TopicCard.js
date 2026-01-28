import React, { useState } from 'react';

const TopicCard = ({ topic, progress, onToggleComplete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate topic completion status
  const completedCount = topic.subtopics.filter((_, index) =>
    progress.some(p => p.topicId === topic._id && p.subtopicIndex === index)
  ).length;
  const totalCount = topic.subtopics.length;
  const isTopicDone = completedCount === totalCount && totalCount > 0;

  const isSubtopicCompleted = (index) => {
    return progress.some(p => p.topicId === topic._id && p.subtopicIndex === index);
  };

  const getLevelBadgeColor = (level) => {
    switch (level) {
      case 'EASY':
        return 'text-green-600';
      case 'MEDIUM':
        return 'text-yellow-600';
      case 'HARD':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleMarkAllComplete = () => {
    topic.subtopics.forEach((_, index) => {
      if (!isSubtopicCompleted(index)) {
        onToggleComplete(topic._id, index, true);
      }
    });
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-white border-2 border-blue-500 text-blue-500 px-6 py-4 rounded-lg flex justify-between items-center hover:bg-blue-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <span className="text-lg font-medium">{topic.name}</span>
          <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${
            isTopicDone ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {isTopicDone ? 'Done' : 'Pending'}
          </span>
        </div>
        <svg
          className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="bg-white rounded-b-lg shadow-md p-6 border-x border-b border-blue-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Sub Topics</h3>
            {!isTopicDone && (
              <button
                onClick={handleMarkAllComplete}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Mark All as Complete
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">LeetCode Link</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">YouTube Link</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Article Link</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Level</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {topic.subtopics.map((subtopic, index) => {
                  const completed = isSubtopicCompleted(index);
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={completed}
                            onChange={() => onToggleComplete(topic._id, index, !completed)}
                            className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                          />
                          <span>{subtopic.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <a
                          href={subtopic.leetcodeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Practise
                        </a>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <a
                          href={subtopic.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Watch
                        </a>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <a
                          href={subtopic.articleLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Read
                        </a>
                      </td>
                      <td className={`py-3 px-4 text-center font-medium ${getLevelBadgeColor(subtopic.level)}`}>
                        {subtopic.level}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={completed ? 'text-green-600' : 'text-gray-500'}>
                          {completed ? 'Done' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicCard;
