import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, selectedProfileActions } from '../../../../store';
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
        // Convert the string value to a number or undefined if the field is empty
        const numericValue = value.trim() === '' ? undefined : Number(value);
        if (isNaN(numericValue!)) {
          alert('Please enter a valid number'); // Optional validation alert
          return;
        }

        if (numericValue !== undefined) {
            if (field === 'sat' && (numericValue < 400 || numericValue > 1600)) {
              alert('Please enter a valid SAT score between 400 and 1600.');
              return;
            }
            if (field === 'act' && (numericValue < 1 || numericValue > 36)) {
              alert('Please enter a valid ACT score between 1 and 36.');
              return;
            }
        }

        dispatch(selectedProfileActions.updateStandardizedTestField({ field, value: numericValue }));
        await stdTestService.update({ ...stdTestRecord, [field]: numericValue });
      } catch (error: unknown) {
        logError(error);
        alert('Retry'); // Replace with a dialog
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
  