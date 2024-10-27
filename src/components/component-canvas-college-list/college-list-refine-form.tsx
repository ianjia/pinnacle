// File: CollegeListRefineForm.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CollegeCategory, CollegeDetails, collegeListWorkshopActions, RootState } from '../../store';
import './college-list-refine-form.css';

export const CollegeListRefineForm: React.FC = () => {
  const dispatch = useDispatch();

  // Selectors to get data from Redux store
  const collegeList = useSelector((state: RootState) => state.collegeListWorkshop.collegeList);
  const collegeDetails = useSelector((state: RootState) => state.collegeListWorkshop.collegeDetails);

  // Local state for managing UI interactions
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCollegeName, setNewCollegeName] = useState('');

  // Handler for "Create Initial List" button
  const handleCreateInitialList = async () => {
    // Simulate remote call to backend AI service
    const fetchedCollegeList = await fetchInitialCollegeList();
    dispatch(collegeListWorkshopActions.setCollegeList(fetchedCollegeList));
  };

  // Handler for "Add" button
  const handleAddCollege = () => {
    setIsAddModalOpen(true);
  };

  // Handler for "Done" button in the modal dialog
  const handleAddCollegeDone = () => {
    if (newCollegeName.trim()) {
      dispatch(collegeListWorkshopActions.addCollege(newCollegeName.trim()));
    }
    setIsAddModalOpen(false);
    setNewCollegeName('');
  };

  // Handler for "Cancel" button in the modal dialog
  const handleAddCollegeCancel = () => {
    setIsAddModalOpen(false);
    setNewCollegeName('');
  };

  // Handler for "Delete" button
  const handleDeleteCollege = () => {
    if (selectedCollege) {
      dispatch(collegeListWorkshopActions.deleteCollege(selectedCollege));
      dispatch(collegeListWorkshopActions.deleteCollegeDetail(selectedCollege));
      setSelectedCollege(null);
    }
  };

  // Handler for "Save" button
  const handleSaveCollege = () => {
    // Placeholder for save functionality
    console.log('Save action triggered');
  };

  // Handler for "Evaluate All" button
  const handleEvaluateAll = async () => {
    const fetchedDetails = await fetchCollegeDetailsForAll(collegeList);
    dispatch(collegeListWorkshopActions.setCollegeCategory(fetchedDetails));
  };

  // Handler for "Evaluate" button
  const handleEvaluate = async () => {
    if (selectedCollege) {
      const detail = await fetchCollegeDetail(selectedCollege);
      dispatch(collegeListWorkshopActions.addCollegeDetail({ name: selectedCollege, detail }));
    }
  };

  // Handler for "Committee Review" button
  const handleCommitteeReview = () => {
    // Placeholder function
    console.log('Committee Review triggered');
  };

  // Helper functions to simulate remote calls
  const fetchInitialCollegeList = async (): Promise<string[]> => {
    return ['Harvard University', 'Stanford University', 'MIT'];
  };

  const fetchCollegeDetailsForAll = async (colleges: string[]): Promise<Record<string, CollegeDetails>> => {
    const details: Record<string, CollegeDetails> = {};
    colleges.forEach((college) => {
      details[college] = {
        myChance: Math.random() * 100,
        acceptanceRate: Math.random() * 100,
        undergraduateEnrollment: Math.floor(Math.random() * 20000),
        annualCost: Math.floor(Math.random() * 70000),
        ranking: Math.floor(Math.random() * 100),
        programRanking: Math.floor(Math.random() * 100),
        category: CollegeCategory.Target,
      };
    });
    return details;
  };

  const fetchCollegeDetail = async (college: string): Promise<CollegeDetails> => {
    return {
      myChance: Math.random() * 100,
      acceptanceRate: Math.random() * 100,
      undergraduateEnrollment: Math.floor(Math.random() * 20000),
      annualCost: Math.floor(Math.random() * 70000),
      ranking: Math.floor(Math.random() * 100),
      programRanking: Math.floor(Math.random() * 100),
      category: CollegeCategory.Reach,
    };
  };

  return (
    <div>
      <h2>Build and Craft Your College List</h2>

      {/* First row of buttons */}
      <div>
        <button onClick={handleCreateInitialList}>Create Initial List</button>
        <button onClick={handleAddCollege}>Add</button>
        <button onClick={handleDeleteCollege} disabled={!selectedCollege}>
          Delete
        </button>
        <button onClick={handleSaveCollege} disabled={collegeList.length === 0}>
          Save
        </button>
      </div>

      {/* Second row of buttons */}
      <div>
        <button onClick={handleEvaluateAll} disabled={collegeList.length === 0}>
          Evaluate All
        </button>
        <button onClick={handleEvaluate} disabled={!selectedCollege}>
          Evaluate
        </button>
        <button onClick={handleCommitteeReview}>Committee Review</button>
      </div>

      {/* College List Table */}
      <table>
        <thead>
          <tr>
            <th>College<br/>Name</th>
            <th>My<br/>Chance</th>
            <th>Admit<br/>Rate</th>
            <th>Undergrad.<br/>Enrollment</th>
            <th>Annual<br/>Cost ($)</th>
            <th>National<br/>Ranking</th>
            <th>Program<br/>Ranking</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {collegeList.map((college) => (
            <tr
              key={college}
              onClick={() => setSelectedCollege(college)}
              style={{ backgroundColor: selectedCollege === college ? '#f0f0f0' : 'white' }}
            >
              <td>{college}</td>
              <td>{collegeDetails[college]?.myChance ?? ''}</td>
              <td>{collegeDetails[college]?.acceptanceRate ?? ''}</td>
              <td>{collegeDetails[college]?.undergraduateEnrollment ?? ''}</td>
              <td>{collegeDetails[college]?.annualCost ?? ''}</td>
              <td>{collegeDetails[college]?.ranking ?? ''}</td>
              <td>{collegeDetails[college]?.programRanking ?? ''}</td>
              <td>{collegeDetails[college]?.category ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add College Modal */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add College</h3>
            <input
              type="text"
              value={newCollegeName}
              onChange={(e) => setNewCollegeName(e.target.value)}
              placeholder="Enter college name"
            />
            <button onClick={handleAddCollegeDone}>Done</button>
            <button onClick={handleAddCollegeCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
