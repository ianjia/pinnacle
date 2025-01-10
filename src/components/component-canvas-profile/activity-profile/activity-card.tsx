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
      // Only handle date validation if it's startDate or endDate
      if (field === 'startDate' || field === 'endDate') {
        // 1. Check if this is a valid date when not empty
        const isValidDate =
          /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(new Date(value).getTime());
        if (!isValidDate && value !== '') {
          dispatch(
            alertDialogActions.showAlert({
              title: 'Validation Error',
              message: 'Please provide a valid date (YYYY-MM-DD).',
            })
          );
          return;
        }
    
        // Convert empty string to null so there's no date if the user clears the input
        const updatedValue = value === '' ? null : value;
    
        // 2. Build the updated activity with the new date
        const updatedActivity = { ...localActivity, [field]: updatedValue };
    
        // 3. If both startDate and endDate are set, ensure startDate <= endDate
        if (updatedActivity.startDate && updatedActivity.endDate) {
          const start = new Date(updatedActivity.startDate);
          const end = new Date(updatedActivity.endDate);
          // If start is strictly after end, show error
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
    
        // 4. Update state and propagate changes
        setLocalActivity(updatedActivity);
        onUpdateActivity(updatedActivity);
      } else {
        // Non-date fields can use the existing logic
        const updatedActivity = { ...localActivity, [field]: value };
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
                onOptionSelect={(e, option) => {
                  const newType = option.optionValue as ActivityType;
                  setLocalActivity({ ...localActivity, type: newType });
                  handleBlur('type', newType);
                }}
                value={localActivity.type}
                placeHolder="Select activity type"
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
                  setLocalActivity({
                    ...localActivity,
                    description: e.target.value,
                  })
                }
                onBlur={(e) => handleBlur('description', e.target.value)}
              />
            </Field>
            <Field label="Achievement" className={styles.field}>
              <Textarea
                className={styles.textarea}
                value={localActivity.achievement || ''}
                onChange={(e) =>
                  setLocalActivity({
                    ...localActivity,
                    achievement: e.target.value,
                  })
                }
                onBlur={(e) => handleBlur('achievement', e.target.value)}
              />
            </Field>
          </div>
        </CardPreview>
      </Card>
    );
  };