// ActivityFileForm.tsx
import React, { useState } from 'react';

enum ActivityType {
  SPORTS = 'Sports',
  VOLUNTEER = 'Volunteer',
  INTERNSHIP = 'Internship',
  RESEARCH = 'Research',
  SCHOOLCLUB = 'School Club',
  PROJECT = 'Project',
  SUMMERPROGRAM = 'Summer Program',
  ACADEMICCOMPETITION = 'Academic Competition',
}

interface Activity {
  name: string;
  type: ActivityType;
  duration: string;
  description: string;
  achievement: string;
}

export const ActivityFileForm: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const handleAddActivity = () => {
    setActivities([
      ...activities,
      {
        name: '',
        type: ActivityType.SPORTS,
        duration: '',
        description: '',
        achievement: '',
      },
    ]);
  };

  const handleActivityChange = (index: number, field: string, value: any) => {
    const newActivities = [...activities];
    newActivities[index] = { ...newActivities[index], [field]: value };
    setActivities(newActivities);
  };

  const handleRemoveActivity = (index: number) => {
    const newActivities = [...activities];
    newActivities.splice(index, 1);
    setActivities(newActivities);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(activities);
    // Send the data to the server here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Activities</h2>
      {activities.map((activity, index) => (
        <div key={index}>
          <h3>Activity {index + 1}</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={activity.name}
              onChange={e => handleActivityChange(index, 'name', e.target.value)}
            />
          </div>

          <div>
            <label>Type:</label>
            <select
              value={activity.type}
              onChange={e => handleActivityChange(index, 'type', e.target.value as ActivityType)}
            >
              {Object.values(ActivityType).map(typeOption => (
                <option key={typeOption} value={typeOption}>
                  {typeOption}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Duration:</label>
            <input
              type="text"
              value={activity.duration}
              onChange={e => handleActivityChange(index, 'duration', e.target.value)}
            />
          </div>

          <div>
            <label>Description:</label>
            <textarea
              value={activity.description}
              onChange={e => handleActivityChange(index, 'description', e.target.value)}
            />
          </div>

          <div>
            <label>Achievement:</label>
            <textarea
              value={activity.achievement}
              onChange={e => handleActivityChange(index, 'achievement', e.target.value)}
            />
          </div>

          <button type="button" onClick={() => handleRemoveActivity(index)}>
            Remove Activity
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddActivity}>
        Add Activity
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};