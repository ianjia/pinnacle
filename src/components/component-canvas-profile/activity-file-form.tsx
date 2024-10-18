import React, { useState } from 'react';
import './activity-file-form.css';  // Import external CSS file

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
  const [originalActivities, setOriginalActivities] = useState<Activity[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleEditClick = () => {
    // Backup the current activities
    setOriginalActivities(activities.map((activity) => ({ ...activity })));
    setIsEditing(true);
  };

  const handleAddActivity = () => {
    if (isEditing) {
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
    }
  };

  const handleActivityChange = (index: number, field: string, value: any) => {
    if (isEditing) {
      const newActivities = [...activities];
      newActivities[index] = { ...newActivities[index], [field]: value };
      setActivities(newActivities);
    }
  };

  const handleRemoveActivity = (index: number) => {
    if (isEditing) {
      const newActivities = [...activities];
      newActivities.splice(index, 1);
      setActivities(newActivities);
      setSelectedRowIndex(null);
    }
  };

  const handleSubmit = () => {
    setIsEditing(false);  // Exit editing mode, cells become non-editable
    setSelectedRowIndex(null);
    console.log(activities);
    // Send the data to the server here
  };

  const handleCancel = () => {
    // Restore activities from the backup
    setActivities(originalActivities.map((activity) => ({ ...activity })));
    setIsEditing(false);
    setSelectedRowIndex(null);
  };

  return (
    <div>
      <h2>Activities</h2>
      {!isEditing ? (
        <button className="activity-btn" onClick={handleEditClick}>
          Edit
        </button>
      ) : (
        <>
          <button className="activity-btn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="activity-btn" onClick={handleCancel}>
            Cancel
          </button>
        </>
      )}
      <table className="activity-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Description</th>
            <th>Achievement</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr
              key={index}
              onClick={() => isEditing && setSelectedRowIndex(index)}
              className={selectedRowIndex === index && isEditing ? 'selected-row' : ''}
            >
              <td>
                <input
                  type="text"
                  value={activity.name}
                  onChange={(e) =>
                    isEditing && handleActivityChange(index, 'name', e.target.value)
                  }
                  readOnly={!isEditing}  // Make the input non-editable when not editing
                  className="activity-input"
                />
              </td>
              <td>
                <select
                  value={activity.type}
                  onChange={(e) =>
                    isEditing &&
                    handleActivityChange(index, 'type', e.target.value as ActivityType)
                  }
                  disabled={!isEditing}  // Disable the select when not editing
                  className="activity-select"
                >
                  {Object.values(ActivityType).map((typeOption) => (
                    <option key={typeOption} value={typeOption}>
                      {typeOption}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={activity.duration}
                  onChange={(e) =>
                    isEditing && handleActivityChange(index, 'duration', e.target.value)
                  }
                  readOnly={!isEditing}  // Make the input non-editable when not editing
                  className="activity-input"
                />
              </td>
              <td>
                <textarea
                  value={activity.description}
                  onChange={(e) =>
                    isEditing && handleActivityChange(index, 'description', e.target.value)
                  }
                  readOnly={!isEditing}  // Make the textarea non-editable when not editing
                  rows={3}
                  className="activity-textarea"
                />
              </td>
              <td>
                <textarea
                  value={activity.achievement}
                  onChange={(e) =>
                    isEditing && handleActivityChange(index, 'achievement', e.target.value)
                  }
                  readOnly={!isEditing}  // Make the textarea non-editable when not editing
                  rows={3}
                  className="activity-textarea"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div className="button-container">
          <button className="activity-btn" type="button" onClick={handleAddActivity}>
            Add Activity
          </button>
          <button
            className="activity-btn"
            type="button"
            onClick={() =>
              selectedRowIndex !== null && handleRemoveActivity(selectedRowIndex)
            }
            disabled={selectedRowIndex === null}
          >
            Remove Activity
          </button>
        </div>
      )}
    </div>
  );
};
