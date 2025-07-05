import React from 'react';
import { Button } from '@fluentui/react-components';
import { Add20Regular, Delete24Regular } from '@fluentui/react-icons';
import { HonorCard } from './honor-card';
import { useHonorProfile } from './hooks/use-honor-profile';
import { useStyles } from './honor-profile-form.styles';

export const HonorProfileForm: React.FC = () => {
  const styles = useStyles();

  const {
    honorList,
    onAddHonor,
    onUpdateHonor,
    onDeleteHonor
  } = useHonorProfile();

  return (
    <div className={styles.container}>
      {honorList.map((honor) => (
        <div key={honor.id} className={styles.honorContainer}>
          <HonorCard honor={honor} onUpdateHonor={onUpdateHonor} />
          <Button
            icon={<Delete24Regular />}
            appearance="subtle"
            className={styles.deleteButton}
            onClick={() => onDeleteHonor(honor.id)}
          />
        </div>
      ))}

      <Button
        icon={<Add20Regular />}
        className={styles.addButton}
        onClick={onAddHonor}
      >
        Add Honor
      </Button>
    </div>
  );
};
