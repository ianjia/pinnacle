import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { essayWorkshopActions, RootState, AppDispatch } from '../../store';
import { v4 as uuidv4 } from 'uuid';
import './ideas-table.css';


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
  
    const ideaEntries = Object.entries(ideas);
  
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
      // Placeholder function handler
      console.log('Refine button clicked');
    };
  
    const handleRowClick = (key: string) => {
      setSelectedIdeaKey(key);
    };
  
    return (
      <div className="ideas-table-container">
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
  