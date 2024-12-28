import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, essayWorkshopActions } from '../../../store';

import { Essay } from '../../../shared';
import { essayDataService } from '../../component-service-proxy';
import { AuthContext } from '../../../auth';
import { ReviewDisplay } from '../../component-review-display/review-dislay';
import { EssayListTable } from './essay-list-table';

/**
 * Container component to display Essay history and a selected Essay review
 */
export const EssayHistoryMainContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  const essayList = useSelector(
    (state: RootState) => state.essayWorkshop.essayHistory
  );

  // Keep track of which Essay is selected
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);

  // Deletion of an essay from history
  const handleDeleteEssay = (essayId: number) => {
    dispatch(essayWorkshopActions.deleteEssayFromHistory(essayId));
    essayDataService.deleteById(essayId, userId as number);

    // If the deleted essay is the one selected, clear the selection
    if (selectedEssay?.id === essayId) {
      setSelectedEssay(null);
    }
  };

  // Row selection
  const handleSelectEssay = (essay: Essay) => {
    setSelectedEssay(essay);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Render the table component */}
      <EssayListTable
        essays={essayList}
        onSelect={handleSelectEssay}
        onDelete={handleDeleteEssay}
        selectedEssayId={selectedEssay?.id}
      />

      {selectedEssay && (
        <ReviewDisplay review={selectedEssay.essay} />
      )}
    </div>
  );
};
