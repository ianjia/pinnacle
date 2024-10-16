// HonorFileForm.tsx
import React, { useState } from 'react';

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

  const handleAddHonor = () => {
    setHonors([
      ...honors,
      {
        name: '',
        type: HonorType.ACADEMIC,
        year: Year.NINTH,
        description: '',
      },
    ]);
  };

  const handleHonorChange = (index: number, field: string, value: any) => {
    const newHonors = [...honors];
    newHonors[index] = { ...newHonors[index], [field]: value };
    setHonors(newHonors);
  };

  const handleRemoveHonor = (index: number) => {
    const newHonors = [...honors];
    newHonors.splice(index, 1);
    setHonors(newHonors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(honors);
    // Send the data to the server here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Honors</h2>
      {honors.map((honor, index) => (
        <div key={index}>
          <h3>Honor {index + 1}</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={honor.name}
              onChange={e => handleHonorChange(index, 'name', e.target.value)}
            />
          </div>

          <div>
            <label>Type:</label>
            <select
              value={honor.type}
              onChange={e => handleHonorChange(index, 'type', e.target.value as HonorType)}
            >
              {Object.values(HonorType).map(typeOption => (
                <option key={typeOption} value={typeOption}>
                  {typeOption}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Year:</label>
            <select
              value={honor.year}
              onChange={e => handleHonorChange(index, 'year', parseInt(e.target.value) as Year)}
            >
              {Object.values(Year).map(yearOption => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}th Grade
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Description:</label>
            <textarea
              value={honor.description}
              onChange={e => handleHonorChange(index, 'description', e.target.value)}
            />
          </div>

          <button type="button" onClick={() => handleRemoveHonor(index)}>
            Remove Honor
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddHonor}>
        Add Honor
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

