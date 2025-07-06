import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, essayWorkshopActions } from '../../../store';

import { Essay } from '../../../shared';
import { essayDataService } from '../../component-service-proxy';
import { AuthContext } from '../../../auth';
import { ReviewDisplay } from '../../component-review-display/review-dislay';
import { EssayListTable } from './essay-list-table';
import { useContainerStyles } from './essay-history-main-container-styles';

/**
 * Container component to display Essay history and a selected Essay review
 */
export const EssayHistoryMainContainer: React.FC = () => {
  const styles = useContainerStyles();
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  const essays = useSelector(
    (s: RootState) => s.essayWorkshop.essayHistory
  );

  const [selected, setSelected] = useState<Essay | null>(null);

  /* delete essay */
  const deleteEssay = (id: number) => {
    dispatch(essayWorkshopActions.deleteEssayFromHistory(id));
    essayDataService.deleteById(id, userId as number);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className={styles.root}>
      <EssayListTable
        essays={essays}
        onSelect={setSelected}
        onDelete={deleteEssay}
        selectedEssayId={selected?.id}
      />

      {selected && <ReviewDisplay review={selected.essay} />}
    </div>
  );
};