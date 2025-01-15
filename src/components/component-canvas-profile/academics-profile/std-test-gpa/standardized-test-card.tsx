import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alertDialogActions, RootState, selectedProfileActions } from '../../../../store';
import {
  Field,
  Input,
  Card,
  CardPreview,
} from '@fluentui/react-components';
import { StandardizedTest } from '../../../../shared';
import { stdTestService } from '../../../component-service-proxy';
import { useStyles } from './std-test-gpa.styles';
import { logError } from '../../../../util';

export const StandardizedTestCard: React.FC = () => {
  const dispatch = useDispatch();
  const stdTestRecord = useSelector((state: RootState) => state.selectedProfile.standardizedTest);

  // Ensure initial state is a string by converting numbers to strings or defaulting to an empty string
  const [satScore, setSatScore] = useState<string>(stdTestRecord.sat?.toString() || '');
  const [actScore, setActScore] = useState<string>(stdTestRecord.act?.toString() || '');

  const handleBlur = async (field: keyof StandardizedTest, value: string) => {
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
        if (field === 'sat') {
          setSatScore(stdTestRecord.sat?.toString() || '');
        } else if (field === 'act') {
          setActScore(stdTestRecord.act?.toString() || '');
        }
        return;
      }
  
      // 3) Range checks for SAT
      if (field === 'sat' && numericValue !== undefined) {
        if (numericValue < 400 || numericValue > 1600) {
          dispatch(
            alertDialogActions.showAlert({
              title: 'Validation Error',
              message: 'Please enter a valid SAT score between 400 and 1600.',
            })
          );
          setSatScore(stdTestRecord.sat?.toString() || '');
          return;
        }
      }
  
      // 4) Range checks for ACT
      if (field === 'act' && numericValue !== undefined) {
        if (numericValue < 1 || numericValue > 36) {
          dispatch(
            alertDialogActions.showAlert({
              title: 'Validation Error',
              message: 'Please enter a valid ACT score between 1 and 36.',
            })
          );
          setActScore(stdTestRecord.act?.toString() || '');
          return;
        }
      }
  
      // 5) Compare with Redux store value — if unchanged, do nothing
      if (stdTestRecord[field] === numericValue) {
        return;
      }
  
      // 6) Otherwise, dispatch/update
      dispatch(selectedProfileActions.updateStandardizedTestField({ field, value: numericValue }));
      await stdTestService.update({ ...stdTestRecord, [field]: numericValue });
    } catch (error: unknown) {
      logError(error);
      dispatch(
        alertDialogActions.showAlert({
          title: 'Save Error',
          message: 'Error happened on saving to backend, please try again.',
        })
      );
    }
  };  

  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <h2 className={styles.header} style={{ textAlign: 'left' }}>
        Standardized Test
      </h2>
      <CardPreview>
        <div className={styles.grid}>
          <Field label="SAT Score" className={styles.field}>
            <Input
              className={styles.input}
              value={satScore}
              onChange={(e) => setSatScore(e.target.value)}
              onBlur={(e) => handleBlur('sat', e.target.value)}
            />
          </Field>
          <Field label="ACT Score" className={styles.field}>
            <Input
              className={styles.input}
              value={actScore}
              onChange={(e) => setActScore(e.target.value)}
              onBlur={(e) => handleBlur('act', e.target.value)}
            />
          </Field>
        </div>
      </CardPreview>
    </Card>
  );
};
