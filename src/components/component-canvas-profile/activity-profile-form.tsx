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
    setIsEditing(false);
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

  // Styles
  const tableStyle = {
    borderCollapse: 'collapse' as const,
    width: '100%',
  };

  const thStyle = {
    border: '1px solid black',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left' as const,
  };

  const tdStyle = {
    border: '1px solid black',
    padding: '8px',
  };

  const buttonStyle = {
    marginRight: '8px',
    padding: '8px 16px',
    fontSize: '14px',
  };

  return (
    <div>
      <h2>Activities</h2>
      {!isEditing ? (
        <button style={buttonStyle} onClick={handleEditClick}>
          Edit
        </button>
      ) : (
        <>
          <button style={buttonStyle} onClick={handleSubmit}>
            Submit
          </button>
          <button style={buttonStyle} onClick={handleCancel}>
            Cancel
          </button>
        </>
      )}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Duration</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Achievement</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr
              key={index}
              onClick={() => isEditing && setSelectedRowIndex(index)}
              style={{
                backgroundColor:
                  selectedRowIndex === index && isEditing ? '#f0f0f0' : 'transparent',
              }}
            >
              <td style={tdStyle}>
                <input
                  type="text"
                  value={activity.name}
                  onChange={(e) =>
                    isEditing && handleActivityChange(index, 'name', e.target.value)
                  }
                  readOnly={!isEditing}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </td>
              <td style={tdStyle}>
                <select
                  value={activity.type}
                  onChange={(e) =>
                    isEditing &&
                    handleActivityChange(index, 'type', e.target.value as ActivityType)
                  }
                  disabled={!isEditing}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                >
                  {Object.values(ActivityType).map((typeOption) => (
                    <option key={typeOption} value={typeOption}>
                      {typeOption}
                    </option>
                  ))}
                </select>
              </td>
              <td style={tdStyle}>
                <input
                  type="text"
                  value={activity.duration}
                  onChange={(e) =>
                    isEditing && handleActivityChange(index, 'duration', e.target.value)
                  }
                  readOnly={!isEditing}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </td>
              <td style={tdStyle}>
                <textarea
                  value={activity.description}
                  onChange={(e) =>
                    isEditing && handleActivityChange(index, 'description', e.target.value)
                  }
                  readOnly={!isEditing}
                  rows={3}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </td>
              <td style={tdStyle}>
                <textarea
                  value={activity.achievement}
                  onChange={(e) =>
                    isEditing && handleActivityChange(index, 'achievement', e.target.value)
                  }
                  readOnly={!isEditing}
                  rows={3}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div style={{ marginTop: '16px' }}>
          <button style={buttonStyle} type="button" onClick={handleAddActivity}>
            Add Activity
          </button>
          <button
            style={buttonStyle}
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
