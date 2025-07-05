import React from 'react';
import { Button } from '@fluentui/react-components';
import { Add20Regular, Delete24Regular } from '@fluentui/react-icons';
import { useStyles } from './activity-profile-form.styles';
import { ActivityCard } from './activity-card';
import { useActivityProfile } from './hooks/use-activity-profile-form';

export const ActivityProfileForm: React.FC = () => {
  const styles = useStyles();

  const {
    activityList,
    onAddActivity,
    onUpdateActivity,
    onDeleteActivity
   } = useActivityProfile();

  return (
    <div className={styles.container}>
      {activityList.map((activity) => (
        <div key={activity.id} className={styles.activityContainer}>
          <ActivityCard activity={activity} onUpdateActivity={onUpdateActivity} />
          <Button
            icon={<Delete24Regular />}
            appearance="subtle"
            className={styles.deleteButton}
            onClick={() => onDeleteActivity(activity.id)}
          />
        </div>
      ))}

      <Button 
        icon={<Add20Regular />}
        className={styles.addButton} onClick={onAddActivity}>
          Add Activity
      </Button>

    </div>
  );
};
