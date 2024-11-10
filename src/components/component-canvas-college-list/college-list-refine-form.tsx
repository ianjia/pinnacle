import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collegeListWorkshopActions, CollegePreferences, committeeReviewActions, RootState } from '../../store';
import './college-list-refine-form.css';
import { useCollegePreferenceSummary } from './hooks/use-college-preference-summary';
import { getCollegeNameKey } from '../component-map';
import { CollegeDataAndChanceRequest, CollegeListBuildRequest, ProgressModal, ResultType_CollegeDataChance, ResultType_CollegeList, SERVER_URL, TaskResultType, TaskType, useTaskRunner } from '../component-service-proxy';

export const CollegeListRefineForm: React.FC = () => {
  const dispatch = useDispatch();

  const collegeList = useSelector((state: RootState) => state.collegeListWorkshop.collegeList);
  const collegeDetails = useSelector((state: RootState) => state.collegeListWorkshop.collegeDetails);
  const preference: string = useCollegePreferenceSummary();
  const collegePref: CollegePreferences = useSelector(
    (state: RootState) => state.collegePreferences.collegePreferences
  );
  const majorPref: string = collegePref.specializedProgram.value;

  // Local state for managing UI interactions
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCollegeName, setNewCollegeName] = useState('');

  // State to track the active task
  const [activeTask, setActiveTask] = useState<"collegeList" | "evaluation" | null>(null);

  const {startTask: startCollegeListTask, showModal: showCollegeListModal, progressMessage: progressCollegeListMessage } = useTaskRunner({
    taskType: TaskType.BuildCollegeList,
    requestData: {college_preferences: preference} as CollegeListBuildRequest, 
    onResult: (data: TaskResultType) => {
      dispatch(collegeListWorkshopActions.setCollegeList(data as ResultType_CollegeList));
      setActiveTask(null);  // Reset active task on completion
      }
    }
  )
  const {startTask: startEvaluationTask, showModal: showEvaluationModal, progressMessage: progressEvaluationMessage } = useTaskRunner({
    taskType: TaskType.GetCollegeDataChance,
    requestData: {college_name: selectedCollege, major: majorPref} as CollegeDataAndChanceRequest, 
    onResult: (data: TaskResultType) => {
      dispatch(collegeListWorkshopActions.addCollegeDetail({ name: selectedCollege as string, detail: data as ResultType_CollegeDataChance }));
      setActiveTask(null);  // Reset active task on completion
      }
    }
  )  

  const handleStartCollegeListTask = () => {
    setActiveTask("collegeList");
    startCollegeListTask();
  };

  const handleStartEvaluationTask = () => {
    setActiveTask("evaluation");
    startEvaluationTask();
  };

  // Handler for "Add" button
  const handleAddCollege = () => {
    setIsAddModalOpen(true);
  };

  // Handler for "Done" button in the modal dialog
  const handleAddCollegeDone = () => {
    const matchedCollegeName = getCollegeNameKey(newCollegeName.trim());

    if (matchedCollegeName) {
      // Update newCollegeName to matched name, add to college list, and close modal
      setNewCollegeName(matchedCollegeName);
      dispatch(collegeListWorkshopActions.addCollege(matchedCollegeName));
      setIsAddModalOpen(false);
      setNewCollegeName(''); // Clear the input
    } else {
      // Alert user if no match is found
      alert("The college name you entered is not valid. Please re-enter.");
    }
  }

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

  const handleSelectCollege = (college: string) => {
    setSelectedCollege(college);
    dispatch(committeeReviewActions.setCollegeToEvaluate(college));
    dispatch(committeeReviewActions.setMajorToEvaluate(majorPref));
  }

  // Handler for "Committee Review" button
  const handleCommitteeReview = () => {
    // Placeholder function
    console.log('Committee Review triggered');
  };


  return (
    <div>
      <h2>Build and Craft Your College List</h2>

      <ProgressModal
        show={activeTask !== null && (showCollegeListModal || showEvaluationModal)}
        message={
          activeTask === "collegeList"
            ? progressCollegeListMessage
            : activeTask === "evaluation"
            ? progressEvaluationMessage
            : ""
        }
      />

      {/* First row of buttons */}
      <div>
        <button onClick={handleStartCollegeListTask}>Create Initial List</button>
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
        <button onClick={handleStartEvaluationTask} disabled={!selectedCollege}>
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
            <th>Major<br/>Ranking</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
        {collegeList.map((college) => (
          <tr
            key={college}
            onClick={() => handleSelectCollege(college)}
            style={{ backgroundColor: selectedCollege === college ? '#80d4ff' : 'white' }}
          >
            <td>{college}</td>
            <td>{collegeDetails[college]?.chance != null ? `${collegeDetails[college].chance}%` : ''}</td>
            <td>{collegeDetails[college]?.admitRate != null ? `${collegeDetails[college].admitRate}%` : ''}</td>
            <td>{collegeDetails[college]?.undergradEnroll ?? ''}</td>
            <td>{collegeDetails[college]?.annualCost ?? ''}</td>
            <td>{collegeDetails[college]?.nationalRanking ?? ''}</td>
            <td>{collegeDetails[college]?.programRanking ?? ''}</td>
            <td>
              {collegeDetails[college]?.category === 1
                ? 'Reach'
                : collegeDetails[college]?.category === 2
                ? 'Target'
                : collegeDetails[college]?.category === 3
                ? 'Safe'
                : ''}
            </td>
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
