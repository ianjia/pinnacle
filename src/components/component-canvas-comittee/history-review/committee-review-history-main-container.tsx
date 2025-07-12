import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { committeeReviewActions, RootState } from '../../../store';

import { CommitteeReview } from '../../../shared';
import { committeeReviewService } from '../../component-service-proxy';
import { AuthContext } from '../../../auth';

import { CommitteeReviewListTable } from './committee-review-list-table';
import { ReviewDisplay } from '../../component-review-display/review-dislay';
import { useStyles } from './committee-review-history-main-container.styles';
import { Card } from '@fluentui/react-components';

export const CommitteeReviewHistoryMainContainer: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  const reviews = useSelector(
    (s: RootState) => s.committeeReview.committeeReviewHistory
  );

  const [selected, setSelected] = useState<CommitteeReview | null>(null);

  /* delete review */
  const handleDelete = (id: number) => {
    dispatch(committeeReviewActions.deleteReviewFromHistory(id));
    committeeReviewService.deleteById(id, userId as number);
    if (selected?.id === id) setSelected(null);
  };

  // return (
  //   <div className={styles.container}>
  //     <CommitteeReviewListTable
  //       reviews={reviews}
  //       onDelete={handleDelete}
  //       onSelect={setSelected}
  //       selectedReviewId={selected?.id}
  //     />

  //     {selected && <ReviewDisplay review={selected.review} />}
  //   </div>
  // );

    return (
    <div className={styles.container}>
      <CommitteeReviewListTable
        reviews={reviews}
        onDelete={handleDelete}
        onSelect={setSelected}
        selectedReviewId={selected?.id}
      />

      {/* wrap the display in its own card so it has a layout box */}
      {selected && (
        <Card className={styles.reviewCard}>
          <ReviewDisplay review={selected.review} />
        </Card>
      )}
    </div>
  );
};
