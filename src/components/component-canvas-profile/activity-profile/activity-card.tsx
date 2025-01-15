import React, { useState } from 'react';
import {
  Field,
  Input,
  Textarea,
  Card,
  CardPreview,
} from '@fluentui/react-components';
import { Activity, ActivityType } from '../../../shared';
import { DropdownCustom } from '../../component-customized-fluent-ui';
import { useStyles } from './activity-card.styles';
import { alertDialogActions } from '../../../store';
import { useDispatch } from 'react-redux';

interface ActivityCardProps {
  activity: Activity;
  onUpdateActivity: (activity: Activity) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onUpdateActivity,
}) => {
  const dispatch = useDispatch();
  const [localActivity, setLocalActivity] = useState<Activity>(activity);

  const handleBlur = (field: keyof Activity, value: any) => {
    // We’ll store the final “validated” value in finalValue
    let finalValue = value;

    // ========== Date Fields (startDate or endDate) ==========
    if (field === 'startDate' || field === 'endDate') {
      // 1) Validate date format (if not empty)
      const isNonEmptyInvalidDate =
        finalValue !== '' &&
        (!/^\d{4}-\d{2}-\d{2}$/.test(finalValue) || isNaN(new Date(finalValue).getTime()));

      if (isNonEmptyInvalidDate) {
        dispatch(
          alertDialogActions.showAlert({
            title: 'Validation Error',
            message: 'Please provide a valid date (YYYY-MM-DD).',
          })
        );
        return;
      }

      // 2) Convert empty string to null
      finalValue = finalValue === '' ? null : finalValue;

      // 3) Construct an updated activity for range-check
      const updatedActivity = { ...localActivity, [field]: finalValue };

      // If both dates exist, ensure startDate <= endDate
      if (updatedActivity.startDate && updatedActivity.endDate) {
        const start = new Date(updatedActivity.startDate);
        const end = new Date(updatedActivity.endDate);
        if (start > end) {
          dispatch(
            alertDialogActions.showAlert({
              title: 'Validation Error',
              message: 'Start Date must be on or before End Date.',
            })
          );
          return;
        }
      }

      // 4) EARLY RETURN if the new date is the same as the original prop
      //    (meaning no real change compared to what's in the parent)
      if (activity[field] === finalValue) {
        return;
      }

      // 5) If everything is valid and changed, update
      setLocalActivity(updatedActivity);
      onUpdateActivity(updatedActivity);

    // ========== Non-Date Fields ==========
    } else {
      // EARLY RETURN if no real change from the parent’s `activity`
      if (activity[field] === finalValue) {
        return;
      }

      const updatedActivity = { ...localActivity, [field]: finalValue };
      setLocalActivity(updatedActivity);
      onUpdateActivity(updatedActivity);
    }
  };

  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardPreview>
        <div className={styles.gridFourColumns}>
          <Field label="Activity Name" className={styles.field}>
            <Input
              className={styles.input}
              value={localActivity.name || ''}
              onChange={(e) =>
                setLocalActivity({ ...localActivity, name: e.target.value })
              }
              onBlur={(e) => handleBlur('name', e.target.value)}
            />
          </Field>

          <Field label="Activity Type" className={styles.field}>
            <DropdownCustom
              options={ActivityType}
              value={localActivity.type}
              placeHolder="Select activity type"
              onOptionSelect={(e, option) => {
                const newType = option.optionValue as ActivityType;
                // Update local state so the UI changes immediately
                setLocalActivity({ ...localActivity, type: newType });
                // Then run handleBlur for final checks & early return
                handleBlur('type', newType);
              }}
            />
          </Field>

          <Field label="Start Date" className={styles.field}>
            <Input
              className={styles.input}
              type="date"
              value={localActivity.startDate || ''}
              onChange={(e) =>
                setLocalActivity({ ...localActivity, startDate: e.target.value })
              }
              onBlur={(e) => handleBlur('startDate', e.target.value)}
            />
          </Field>

          <Field label="End Date" className={styles.field}>
            <Input
              className={styles.input}
              type="date"
              value={localActivity.endDate || ''}
              onChange={(e) =>
                setLocalActivity({ ...localActivity, endDate: e.target.value })
              }
              onBlur={(e) => handleBlur('endDate', e.target.value)}
            />
          </Field>
        </div>

        <div className={styles.gridTwoColumns}>
          <Field label="Description" className={styles.field}>
            <Textarea
              className={styles.textarea}
              value={localActivity.description || ''}
              onChange={(e) =>
                setLocalActivity({ ...localActivity, description: e.target.value })
              }
              onBlur={(e) => handleBlur('description', e.target.value)}
            />
          </Field>

          <Field label="Achievement" className={styles.field}>
            <Textarea
              className={styles.textarea}
              value={localActivity.achievement || ''}
              onChange={(e) =>
                setLocalActivity({ ...localActivity, achievement: e.target.value })
              }
              onBlur={(e) => handleBlur('achievement', e.target.value)}
            />
          </Field>
        </div>
      </CardPreview>
    </Card>
  );
};
