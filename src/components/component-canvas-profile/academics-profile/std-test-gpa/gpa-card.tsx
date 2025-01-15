import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alertDialogActions, RootState, selectedProfileActions } from '../../../../store';
import {
  Field,
  Input,
  Card,
  CardPreview,
} from '@fluentui/react-components';
import { GPA } from '../../../../shared';
import { gpaService } from '../../../component-service-proxy';
import { logError } from '../../../../util';
import { useStyles } from './std-test-gpa.styles';

export const GpaCard: React.FC = () => {
    const dispatch = useDispatch();
    const gpaRecord = useSelector((state: RootState) => state.selectedProfile.gpa);
  
    const [ninthGpa, setNinthGpa] = useState<string>(gpaRecord.ninth?.toString() || '');
    const [tenthGpa, setTenthGpa] = useState<string>(gpaRecord.tenth?.toString() || '');
    const [eleventhGpa, setEleventhGpa] = useState<string>(gpaRecord.eleventh?.toString() || '');
    const [twelfthGpa, setTwelfthGpa] = useState<string>(gpaRecord.twelfth?.toString() || '');
    const [overallGpa, setOverallGpa] = useState<string>(gpaRecord.overall?.toString() || '');

    const handleBlur = async (field: keyof GPA, value: string) => {
      try {
        // 1) Convert the string value to a number or undefined if blank
        const numericValue = value.trim() === '' ? undefined : Number(value);
    
        // 2) Validate numeric
        if (numericValue !== undefined && isNaN(numericValue)) {
          dispatch(
            alertDialogActions.showAlert({
              title: 'Validation Error',
              message: 'Please enter a valid number.',
            })
          );
          // Revert local state
          if (field === 'ninth') {
            setNinthGpa(gpaRecord.ninth?.toString() || '');
          } else if (field === 'tenth') {
            setTenthGpa(gpaRecord.tenth?.toString() || '');
          } else if (field === 'eleventh') {
            setEleventhGpa(gpaRecord.eleventh?.toString() || '');
          } else if (field === 'twelfth') {
            setTwelfthGpa(gpaRecord.twelfth?.toString() || '');
          } else if (field === 'overall') {
            setOverallGpa(gpaRecord.overall?.toString() || '');
          }
          return;
        }
    
        // 3) Range check
        if (numericValue !== undefined) {
          if (numericValue < 0.0 || numericValue > 5.0) {
            dispatch(
              alertDialogActions.showAlert({
                title: 'Validation Error',
                message: 'Please enter a valid GPA score between 0.0 and 5.0',
              })
            );
            // Revert local state
            if (field === 'ninth') {
              setNinthGpa(gpaRecord.ninth?.toString() || '');
            } else if (field === 'tenth') {
              setTenthGpa(gpaRecord.tenth?.toString() || '');
            } else if (field === 'eleventh') {
              setEleventhGpa(gpaRecord.eleventh?.toString() || '');
            } else if (field === 'twelfth') {
              setTwelfthGpa(gpaRecord.twelfth?.toString() || '');
            } else if (field === 'overall') {
              setOverallGpa(gpaRecord.overall?.toString() || '');
            }
            return;
          }
        }
    
        // 4) Compare to current Redux value — if no change, return early
        if (gpaRecord[field] === numericValue) {
          return;
        }
    
        // 5) Dispatch the update + service call
        dispatch(selectedProfileActions.updateGpaField({ field, value: numericValue }));
        await gpaService.update({ ...gpaRecord, [field]: numericValue });
      } catch (error: unknown) {
        logError(error);
        dispatch(
          alertDialogActions.showAlert({
            title: 'Saving Error',
            message: 'Error happened on saving to backend',
          })
        );
      }
    };
    
    const styles = useStyles();
  
    return (
      <Card className={styles.card}>
        <h2 className={styles.header} style={{ textAlign: 'left' }}>
          GPA Score
        </h2>
        <CardPreview>
          <div className={styles.grid}>
            <Field label="Ninth Grade GPA" className={styles.field}>
              <Input
                className={styles.input}
                value={ninthGpa}
                onChange={(e) => setNinthGpa(e.target.value)}
                onBlur={(e) => handleBlur('ninth', e.target.value)}
              />
            </Field>
            <Field label="Tenth Grade GPA" className={styles.field}>
              <Input
                className={styles.input}
                value={tenthGpa}
                onChange={(e) => setTenthGpa(e.target.value)}
                onBlur={(e) => handleBlur('tenth', e.target.value)}
              />
            </Field>
            <Field label="Eleventh Grade GPA" className={styles.field}>
              <Input
                className={styles.input}
                value={eleventhGpa}
                onChange={(e) => setEleventhGpa(e.target.value)}
                onBlur={(e) => handleBlur('eleventh', e.target.value)}
              />
            </Field>
            <Field label="Twelfth Grade GPA" className={styles.field}>
              <Input
                className={styles.input}
                value={twelfthGpa}
                onChange={(e) => setTwelfthGpa(e.target.value)}
                onBlur={(e) => handleBlur('twelfth', e.target.value)}
              />
            </Field>
            <Field label="Overall GPA" className={styles.field}>
              <Input
                className={styles.input}
                value={overallGpa}
                onChange={(e) => setOverallGpa(e.target.value)}
                onBlur={(e) => handleBlur('overall', e.target.value)}
              />
            </Field>
          </div>
        </CardPreview>
      </Card>
    );
  };
  