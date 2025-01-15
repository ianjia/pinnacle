import React, { useState } from 'react';
import {
  Field,
  Input,
  Textarea,
  Card,
  CardPreview,
} from '@fluentui/react-components';
import { Honor, HonorType, SchoolYear } from '../../../shared'; 
import { DropdownCustom } from '../../component-customized-fluent-ui';
import { useStyles } from './honor-card.styles';

interface HonorCardProps {
  honor: Honor;
  onUpdateHonor: (honor: Honor) => void;
}

export const HonorCard: React.FC<HonorCardProps> = ({ honor, onUpdateHonor }) => {
  const [localHonor, setLocalHonor] = useState<Honor>(honor);
  const styles = useStyles();

  const handleBlur = (field: keyof Honor, value: any) => {
    // EARLY RETURN if the new value is the same as the original prop’s value
    if (honor[field] === value) {
      return;
    }

    const updatedHonor = { ...localHonor, [field]: value };
    setLocalHonor(updatedHonor);
    onUpdateHonor(updatedHonor);
  };

  return (
    <Card className={styles.card}>
      <CardPreview>
        <div className={styles.gridThreeColumns}>
          <Field label="Honor Name" className={styles.field}>
            <Input
              className={styles.input}
              value={localHonor.name || ''}
              onChange={(e) =>
                setLocalHonor({ ...localHonor, name: e.target.value })
              }
              onBlur={(e) => handleBlur('name', e.target.value)}
            />
          </Field>

          <Field label="Honor Type" className={styles.field}>
            <DropdownCustom
              options={HonorType}
              value={localHonor.type}
              placeHolder="Select honor type"
              onOptionSelect={(e, option) => {
                const newType = option.optionValue as HonorType;

                // Update local state immediately so the UI reflects the new selection
                setLocalHonor({ ...localHonor, type: newType });

                // Then run handleBlur for the final check (early return if unchanged)
                handleBlur('type', newType);
              }}
            />
          </Field>

          <Field label="Year" className={styles.field}>
            <DropdownCustom
              options={SchoolYear}
              value={localHonor.year}
              placeHolder="Select year"
              onOptionSelect={(e, option) => {
                const newYear = parseInt(option.optionValue as string) as SchoolYear;

                // Update local state so user sees change
                setLocalHonor({ ...localHonor, year: newYear });

                // Then do the final check
                handleBlur('year', newYear);
              }}
            />
          </Field>
        </div>

        <div className={styles.singleRow}>
          <Field label="Description" className={styles.field}>
            <Textarea
              className={styles.textarea}
              value={localHonor.description || ''}
              onChange={(e) =>
                setLocalHonor({ ...localHonor, description: e.target.value })
              }
              onBlur={(e) => handleBlur('description', e.target.value)}
            />
          </Field>
        </div>
      </CardPreview>
    </Card>
  );
};
