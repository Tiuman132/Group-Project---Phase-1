import { useState, useEffect } from 'react';
import DashboardStats from '../components/DashboardStats';
import ActivityChart from '../components/ActivityChart';
import RecentActivities from '../components/RecentActivities';

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    joinDate: '2024-01-15',
    totalFootprint: 2.5,
    weeklyFootprint: 0.6,
    goal: 2.0
  });

  const [activities, setActivities] = useState([
    { id: 1, type: 'transport', description: 'Bus to work', emissions: 0.8, date: '2024-12-27' },
    { id: 2, type: 'energy', description: 'Home electricity', emissions: 1.2, date: '2024-12-27' },
    { id: 3, type: 'diet', description: 'Vegetarian lunch', emissions: 0.3, date: '2024-12-26' },
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const handleGoalUpdate = (newGoal) => {
    setUserProfile(prev => ({ ...prev, goal: newGoal }));
  };

  const addActivity = (activity) => {
    setActivities(prev => [
      { id: Date.now(), ...activity, date: new Date().toISOString().split('T')[0] },
      ...prev
    ]);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {userProfile.name}!</h1>
        <p>Track your carbon footprint and make a difference</p>
      </div>

      <DashboardStats 
        profile={userProfile} 
        onGoalUpdate={handleGoalUpdate}
      />

      <div className="dashboard-content">
        <div className="chart-section">
          <div className="period-selector">
            <button 
              className={selectedPeriod === 'week' ? 'active' : ''}
              onClick={() => setSelectedPeriod('week')}
            >
              Week
            </button>
            <button 
              className={selectedPeriod === 'month' ? 'active' : ''}
              onClick={() => setSelectedPeriod('month')}
            >
              Month
            </button>
            <button 
              className={selectedPeriod === 'year' ? 'active' : ''}
              onClick={() => setSelectedPeriod('year')}
            >
              Year
            </button>
          </div>
          <ActivityChart period={selectedPeriod} activities={activities} />
        </div>

        <RecentActivities 
          activities={activities}
          onAddActivity={addActivity}
        />
      </div>
    </div>
  );
}