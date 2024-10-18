import React, { useState } from 'react';
import './honor-file-form.css';  // Import external CSS file

enum HonorType {
  SPORTS = 'Sports',
  VOLUNTEER = 'Volunteer',
  ACADEMIC = 'Academic',
  ACTIVITY = 'Activity',
  OTHERS = 'Others',
}

enum Year {
  NINTH = 9,
  TENTH = 10,
  ELEVENTH = 11,
  TWELFTH = 12,
}

interface Honor {
  name: string;
  type: HonorType;
  year: Year;
  description: string;
}

export const HonorFileForm: React.FC = () => {
  const [honors, setHonors] = useState<Honor[]>([]);
  const [originalHonors, setOriginalHonors] = useState<Honor[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleEditClick = () => {
    // Backup the current honors
    setOriginalHonors(honors.map((honor) => ({ ...honor })));
    setIsEditing(true);
  };

  const handleAddHonor = () => {
    if (isEditing) {
      setHonors([
        ...honors,
        {
          name: '',
          type: HonorType.ACADEMIC,
          year: Year.NINTH,
          description: '',
        },
      ]);
    }
  };

  const handleHonorChange = (index: number, field: string, value: any) => {
    if (isEditing) {
      const newHonors = [...honors];
      newHonors[index] = { ...newHonors[index], [field]: value };
      setHonors(newHonors);
    }
  };

  const handleRemoveHonor = (index: number) => {
    if (isEditing) {
      const newHonors = [...honors];
      newHonors.splice(index, 1);
      setHonors(newHonors);
      setSelectedRowIndex(null);
    }
  };

  const handleSubmit = () => {
    setIsEditing(false);
    setSelectedRowIndex(null);
    console.log(honors);
    // Send the data to the server here
  };

  const handleCancel = () => {
    // Restore honors from the backup
    setHonors(originalHonors.map((honor) => ({ ...honor })));
    setIsEditing(false);
    setSelectedRowIndex(null);
  };

  return (
    <div>
      <h2>Honors</h2>
      {!isEditing ? (
        <button className="honor-btn" onClick={handleEditClick}>
          Edit
        </button>
      ) : (
        <>
          <button className="honor-btn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="honor-btn" onClick={handleCancel}>
            Cancel
          </button>
        </>
      )}
      <table className="honor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Year</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {honors.map((honor, index) => (
            <tr
              key={index}
              onClick={() => isEditing && setSelectedRowIndex(index)}
              className={selectedRowIndex === index && isEditing ? 'selected-row' : ''}
            >
              <td>
                <input
                  type="text"
                  value={honor.name}
                  onChange={(e) => handleHonorChange(index, 'name', e.target.value)}
                  readOnly={!isEditing}  // Make the input non-editable when not editing
                  className="honor-input"
                />
              </td>
              <td>
                <select
                  value={honor.type}
                  onChange={(e) => handleHonorChange(index, 'type', e.target.value as HonorType)}
                  disabled={!isEditing}  // Disable the select when not editing
                  className="honor-select"
                >
                  {Object.values(HonorType).map((typeOption) => (
                    <option key={typeOption} value={typeOption}>
                      {typeOption}
                    </option>
                  ))}
                </select>
              </td>
              <td>
              <select
                value={honor.year}
                onChange={(e) => handleHonorChange(index, 'year', parseInt(e.target.value) as Year)}
                disabled={!isEditing}  // Disable the select when not editing
                className="honor-select"
              >
                <option value={Year.NINTH}>9th Grade</option>
                <option value={Year.TENTH}>10th Grade</option>
                <option value={Year.ELEVENTH}>11th Grade</option>
                <option value={Year.TWELFTH}>12th Grade</option>
              </select>
              </td>
              <td>
                <textarea
                  value={honor.description}
                  onChange={(e) => handleHonorChange(index, 'description', e.target.value)}
                  readOnly={!isEditing}  // Make the textarea non-editable when not editing
                  rows={3}
                  className="honor-textarea"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div className="button-container">
          <button className="honor-btn" type="button" onClick={handleAddHonor}>
            Add Honor
          </button>
          <button
            className="honor-btn"
            type="button"
            onClick={() =>
              selectedRowIndex !== null && handleRemoveHonor(selectedRowIndex)
            }
            disabled={selectedRowIndex === null}
          >
            Remove Honor
          </button>
        </div>
      )}
    </div>
  );
};
