// File: CollegeListRefineForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { collegeListWorkshopActions, CollegePreferences, RootState } from '../../store';
import './college-list-refine-form.css';
import { useCollegePreferenceSummary } from './hooks/use-college-preference-summary';
import { MIDDLE_SERVER_URL } from '../../common';

export const CollegeListRefineForm: React.FC = () => {

  const dispatch = useDispatch();

  const collegeList = useSelector((state: RootState) => state.collegeListWorkshop.collegeList);
  const collegeDetails = useSelector((state: RootState) => state.collegeListWorkshop.collegeDetails);

  const preference: string = useCollegePreferenceSummary();

  const collegePref: CollegePreferences = useSelector(
    (state: RootState) => state.collegePreferences.collegePreferences
  );

  const majorPref: string | undefined = collegePref.specializedProgram.value;


  // Local state for managing UI interactions
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCollegeName, setNewCollegeName] = useState('');
  const [sessionId, setSessionId] = useState<string|undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Handler for "Create Initial List" button
  const handleCreateInitialList = async () => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    setIsProcessing(true);

    try {
        const response = await axios.post(`${MIDDLE_SERVER_URL}/api/create-college-list`, {
            college_preferences: preference,
            session_id: sessionId,
          });

        const aiResponse = response.data.college_list;
        dispatch(collegeListWorkshopActions.setCollegeList(aiResponse));
    } catch(error) {
        console.error('Error communicating with the server:', error);
        alert('An error occurred. Please try again.');
    } finally {
        setIsProcessing(false);
    }
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

  // Handler for "Evaluate" button
  const handleEvaluate = async () => {
    if (selectedCollege) {
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
      setIsProcessing(true);

      const majorVal: string = majorPref !== undefined? majorPref : "N/A";
  
      try {
        const response = await axios.post(`${MIDDLE_SERVER_URL}/api/get-college-data-chance`, {
            college_name: selectedCollege,
            session_id: sessionId,
            major: majorVal,
          });

        const aiResponse = response.data;
        console.log(aiResponse);
        // dispatch(collegeListWorkshopActions.addCollegeDetail({ name: selectedCollege, detail }));
      } catch(error) {
          console.error('Error communicating with the server:', error);
          alert('An error occurred. Please try again.');
      } finally {
          setIsProcessing(false);
      }

    }
  };

  // Handler for "Committee Review" button
  const handleCommitteeReview = () => {
    // Placeholder function
    console.log('Committee Review triggered');
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

      {isProcessing && (
        <div className="processing-modal">
            <div className="processing-dialog">
                <h2>Processing...</h2>
                <p>Please wait while we process your response.</p>
            </div>
        </div>
     )}
    </div>
  );
};
