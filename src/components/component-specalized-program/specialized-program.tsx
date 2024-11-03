import React from 'react';
import './specialized-program.css'

interface SpecializedProgramProps {
  value: string;
  onPreferenceChange: (value: string) => void;
}

export const SpecializedProgram: React.FC<SpecializedProgramProps> = ({
  value,
  onPreferenceChange,
}) => (
  <div className="specialized-program-row">
    <select
      className="specialized-program-select"
      value={value}
      onChange={(e) => onPreferenceChange(e.target.value)}
    >
      <option>No Preference</option>
      <option>Computer Science</option>
      <option>Biology</option>
      <option>Psychology</option>
      <option>Business Administration</option>
      <option>Economics</option>
      <option>Mechanical Engineering</option>
      <option>Electrical Engineering</option>
      <option>Chemistry</option>
      <option>Political Science</option>
      <option>Mathematics</option>
      <option>Physics</option>
      <option>Sociology</option>
      <option>Environmental Science</option>
      <option>Nursing</option>
      <option>History</option>
      <option>Art & Design</option>
      <option>Philosophy</option>
      <option>Education</option>
      <option>Communications</option>
      <option>Public Health</option>
      <option>Aerospace Engineering</option>
      <option>Anthropology</option>
      <option>Music</option>
      <option>Journalism</option>
      <option>Marketing</option>
      <option>Finance</option>
      <option>Foreign Languages & Linguistics</option>
      <option>Architecture</option>
    </select>
  </div>
);
