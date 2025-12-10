'use client';

import React, { useState, useEffect } from 'react';
import { getRecentDetections } from '../../utils/meeting-api';

const RecentDetections = () => {
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDetections();
  }, []);

  const fetchDetections = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getRecentDetections();
      setDetections(data);
    } catch (err) {
      console.error('Error fetching recent detections:', err);
      setError(`❌ Error: ${err.message}. Make sure the backend server is running at http://localhost:9000`);
      setDetections([]);
    } finally {
      setLoading(false);
    }
  };

  const getMeetingEmoji = (type) => {
    const emojis = {
      'request': '📅',
      'confirmation': '✅',
      'cancellation': '❌',
      'reschedule': '🔄',
      'reminder': '⏰',
      'invitation': '📧'
    };
    return emojis[type] || '📅';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
        <div className="text-center py-12">
          <div className="text-4xl mb-4 animate-spin">⏳</div>
          <p className="text-gray-600">Loading recent detections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
        <div className="p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
          <p className="font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (detections.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-600">No meeting detections yet.</p>
          <p className="text-sm text-gray-500 mt-2">Analyze some emails to see meeting intents here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">📅 Recent Meeting Detections</h2>
          <p className="text-gray-600">View your most recent meeting detections from analyzed emails.</p>
        </div>
        <button
          onClick={fetchDetections}
          className="bg-gray-200 text-gray-800 font-bold rounded-full px-6 py-2 shadow-lg hover:shadow-xl transform transition hover:scale-105 duration-300 ease-in-out"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="space-y-4">
        {detections.map((detection, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{getMeetingEmoji(detection.meeting_type)}</span>
                  <span className="text-lg font-bold text-gray-800">
                    {detection.meeting_type.charAt(0).toUpperCase() + detection.meeting_type.slice(1)}
                  </span>
                  <span className="text-sm text-gray-600">
                    ({(detection.confidence_score * 100).toFixed(1)}% confidence)
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    <span className="font-semibold">Subject:</span> {detection.subject}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">From:</span> {detection.sender}
                  </p>
                  {detection.meeting_date && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Date:</span> {detection.meeting_date}
                    </p>
                  )}
                  {detection.meeting_time && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Time:</span> {detection.meeting_time}
                    </p>
                  )}
                  <p className="text-gray-500 text-xs">
                    Detected: {new Date(detection.detected_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDetections;

