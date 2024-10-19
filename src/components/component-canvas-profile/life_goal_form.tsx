// Component: LifeAndGoalsForm.tsx

import React, { useState, useRef } from 'react';
import './academic-file-form.css'; // Reusing the same CSS file

export interface ILifeStory {
  story: string;
}

export interface ICareerAndAcademicGoals {
  goal: string;
}

export const LifeAndGoalsForm: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [lifeStories, setLifeStories] = useState<ILifeStory[]>([]);
  const [careerAndAcademicGoals, setCareerAndAcademicGoals] = useState<ICareerAndAcademicGoals[]>([]);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState<number | null>(null);

  // Refs to store initial data when entering edit mode
  const initialLifeStoriesRef = useRef<ILifeStory[]>([]);
  const initialCareerAndAcademicGoalsRef = useRef<ICareerAndAcademicGoals[]>([]);

  // State for showing instructions
  const [showLifeStoryInstructions, setShowLifeStoryInstructions] = useState(false);
  const [showGoalInstructions, setShowGoalInstructions] = useState(false);

  // Handlers for entering and exiting edit mode
  const handleEditClick = () => {
    // Save the current data
    initialLifeStoriesRef.current = [...lifeStories];
    initialCareerAndAcademicGoalsRef.current = [...careerAndAcademicGoals];
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Revert to the initial data
    setLifeStories(initialLifeStoriesRef.current);
    setCareerAndAcademicGoals(initialCareerAndAcademicGoalsRef.current);
    setIsEditing(false);
    setSelectedStoryIndex(null);
    setSelectedGoalIndex(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lifeAndGoals = {
      lifeStories,
      careerAndAcademicGoals,
    };
    console.log(lifeAndGoals);
    setIsEditing(false);
    setSelectedStoryIndex(null);
    setSelectedGoalIndex(null);
    // Send the data to the server here
  };

  // Handlers for life stories
  const handleAddStory = () => {
    if (isEditing) {
      setLifeStories([...lifeStories, { story: '' }]);
    }
  };

  const handleStoryChange = (index: number, value: string) => {
    if (isEditing) {
      const newLifeStories = [...lifeStories];
      newLifeStories[index] = { ...newLifeStories[index], story: value };
      setLifeStories(newLifeStories);
    }
  };

  const handleRemoveStory = (index: number) => {
    if (isEditing) {
      const newLifeStories = [...lifeStories];
      newLifeStories.splice(index, 1);
      setLifeStories(newLifeStories);
      setSelectedStoryIndex(null);
    }
  };

  // Handlers for career and academic goals
  const handleAddGoal = () => {
    if (isEditing) {
      setCareerAndAcademicGoals([...careerAndAcademicGoals, { goal: '' }]);
    }
  };

  const handleGoalChange = (index: number, value: string) => {
    if (isEditing) {
      const newGoals = [...careerAndAcademicGoals];
      newGoals[index] = { ...newGoals[index], goal: value };
      setCareerAndAcademicGoals(newGoals);
    }
  };

  const handleRemoveGoal = (index: number) => {
    if (isEditing) {
      const newGoals = [...careerAndAcademicGoals];
      newGoals.splice(index, 1);
      setCareerAndAcademicGoals(newGoals);
      setSelectedGoalIndex(null);
    }
  };

  return (
    <div>
      <h2>Life and Goals</h2>

      {!isEditing ? (
        <button className="academic-btn" onClick={handleEditClick}>
          Edit
        </button>
      ) : (
        <>
          <button className="academic-btn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="academic-btn" onClick={handleCancel}>
            Cancel
          </button>
        </>
      )}

      {/* Life Stories Table */}
      <h3>
        Life Stories
        <button
          className="tip-button"
          onClick={() => setShowLifeStoryInstructions(!showLifeStoryInstructions)}
        >
          ?
        </button>
      </h3>
      {showLifeStoryInstructions && (
        <p className="instructions">
          A life story is a significant event or experience in your life that has shaped who you are.
        </p>
      )}
      <table className="academic-table">
        <thead>
          <tr>
            <th>Story</th>
          </tr>
        </thead>
        <tbody>
          {lifeStories.map((storyObj, index) => (
            <tr
              key={index}
              onClick={() => isEditing && setSelectedStoryIndex(index)}
              className={selectedStoryIndex === index && isEditing ? 'selected-row' : ''}
            >
              <td>
                <textarea
                  value={storyObj.story}
                  onChange={(e) => handleStoryChange(index, e.target.value)}
                  readOnly={!isEditing}
                  rows={3}
                  cols={50}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div className="button-container">
          <button className="academic-btn" type="button" onClick={handleAddStory}>
            Add Story
          </button>
          <button
            className="academic-btn"
            type="button"
            onClick={() =>
              selectedStoryIndex !== null && handleRemoveStory(selectedStoryIndex)
            }
            disabled={selectedStoryIndex === null}
          >
            Remove Story
          </button>
        </div>
      )}

      {/* Career and Academic Goals Table */}
      <h3>
        Career and Academic Goals
        <button
          className="tip-button"
          onClick={() => setShowGoalInstructions(!showGoalInstructions)}
        >
          ?
        </button>
      </h3>
      {showGoalInstructions && (
        <p className="instructions">
          Describe your aspirations for your career and academic journey.
        </p>
      )}
      <table className="academic-table">
        <thead>
          <tr>
            <th>Goal</th>
          </tr>
        </thead>
        <tbody>
          {careerAndAcademicGoals.map((goalObj, index) => (
            <tr
              key={index}
              onClick={() => isEditing && setSelectedGoalIndex(index)}
              className={selectedGoalIndex === index && isEditing ? 'selected-row' : ''}
            >
              <td>
                <textarea
                  value={goalObj.goal}
                  onChange={(e) => handleGoalChange(index, e.target.value)}
                  readOnly={!isEditing}
                  rows={2}
                  cols={50}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div className="button-container">
          <button className="academic-btn" type="button" onClick={handleAddGoal}>
            Add Goal
          </button>
          <button
            className="academic-btn"
            type="button"
            onClick={() =>
              selectedGoalIndex !== null && handleRemoveGoal(selectedGoalIndex)
            }
            disabled={selectedGoalIndex === null}
          >
            Remove Goal
          </button>
        </div>
      )}
    </div>
  );
};
