import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, selectedProfileActions } from '../../../store';
import {
  Field,
  Input,
  Card,
  CardPreview,
} from '@fluentui/react-components';
import { GPA } from '../../../shared';
import { gpaService } from '../../component-service-proxy';
import { logError } from '../../../util';
import { useStyles } from './gpa-card.styles';

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
        // Convert the string value to a number or undefined if the field is empty
        const numericValue = value.trim() === '' ? undefined : Number(value);
        if (isNaN(numericValue!)) {
          alert('Please enter a valid number'); // Optional validation alert
          return;
        }

        if (numericValue !== undefined) {
            if (numericValue < 0.0 || numericValue > 5.0) {
              alert('Please enter a valid GPA score between 0.0 and 5.0');
              return;
            }
        }

        dispatch(selectedProfileActions.updateGpaField({ field, value: numericValue }));
        await gpaService.update({ ...gpaRecord, [field]: numericValue });
      } catch (error: unknown) {
        logError(error);
        alert('Retry'); // Replace with a dialog
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
  