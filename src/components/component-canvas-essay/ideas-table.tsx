import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { essayWorkshopActions, RootState, AppDispatch } from '../../store';
import { v4 as uuidv4 } from 'uuid';
import './ideas-table.css';
import { EssayIdeaRefinementRequest, ProgressModal, RefineEssayIdeaTaskResult, TaskResult, TaskType, useTaskRunner } from '../component-service-proxy';

interface IdeasTableProps {
    editable: boolean;
  }
  
export const IdeasTable: React.FC<IdeasTableProps> = ({ editable }) => {
    const ideas = useSelector((state: RootState) => state.essayWorkshop.ideas);
    const dispatch = useDispatch();
  
    const [selectedIdeaKey, setSelectedIdeaKey] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [newIdeaText, setNewIdeaText] = useState<string>('');
    const [textAreaValue, setTextAreaValue] = useState<string>('');

    const college: string = useSelector((state: RootState) => state.essayWorkshop.college);
    const major: string = useSelector((state: RootState) => state.essayWorkshop.major);
    const essay_prompt: string = useSelector((state: RootState) => state.essayWorkshop.essayPrompt);
    const additional_ask: string = useSelector((state: RootState) => state.essayWorkshop.additionalAsk);
  
    const ideaEntries = Object.entries(ideas);

    const {startTask: startRefineEssayIdeaTask, showModal, progressMessage } = useTaskRunner({
      taskType: TaskType.RefineEssayIdea,
      requestData: {college: college, major: major, prompt: essay_prompt, additionalCollegeAsk: additional_ask, 
                    idea: ideas[selectedIdeaKey as string], feedback: textAreaValue} as EssayIdeaRefinementRequest, 
      onResult: (data: TaskResult) => {
        const result = (data as RefineEssayIdeaTaskResult).idea;
          dispatch(essayWorkshopActions.addIdea({key:selectedIdeaKey as string, value: result})); 
      }
  })    
  
    const handleAdd = () => {
      setShowAddModal(true);
    };
  
    const handleAddDone = () => {
      if (newIdeaText.trim() !== '') {
        const newKey = uuidv4();
        dispatch(essayWorkshopActions.addIdea({ key: newKey, value: newIdeaText }));
        setShowAddModal(false);
        setNewIdeaText('');
      }
    };
  
    const handleAddCancel = () => {
      setShowAddModal(false);
      setNewIdeaText('');
    };
  
    const handleDelete = () => {
      if (selectedIdeaKey) {
        dispatch(essayWorkshopActions.deleteIdea(selectedIdeaKey));
        setSelectedIdeaKey(null);
      }
    };
  
    const handleRefine = () => {
      if (selectedIdeaKey) {
        startRefineEssayIdeaTask();
      } else {
        alert("Please select an idea");
      }
    };
  
    const handleRowClick = (key: string) => {
      setSelectedIdeaKey(key);
    };
  
    return (
      <div className="ideas-table-container">
            <ProgressModal show = {showModal} message = {progressMessage}/>
        <h2>Essay Ideas</h2>
        {editable && (
          <div className="buttons-container">
            <button onClick={handleAdd}>Add</button>
            <button onClick={handleDelete} disabled={!selectedIdeaKey}>Delete</button>
            <button onClick={handleRefine} disabled={!selectedIdeaKey}>Refine</button>
          </div>
        )}
  
        {showAddModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Add New Idea</h3>
              <input
                type="text"
                value={newIdeaText}
                onChange={(e) => setNewIdeaText(e.target.value)}
              />
              <button onClick={handleAddDone}>Done</button>
              <button onClick={handleAddCancel}>Cancel</button>
            </div>
          </div>
        )}
  
        <table className="table-container">
          <thead>
            <tr>
              <th>#</th>
              <th>Idea</th>
            </tr>
          </thead>
          <tbody>
            {ideaEntries.map(([key, value], index) => (
              <tr
                key={key}
                onClick={() => handleRowClick(key)}
                style={{
                  backgroundColor: selectedIdeaKey === key ? 'lightgray' : 'white',
                  cursor: 'pointer',
                }}
              >
                <td>{index + 1}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {editable && (
          <div className="textarea-container">
            <div className="label-container">Refinement Feedback:</div>
            <textarea
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
            />
          </div>
        )}
      </div>
    );
  };
  