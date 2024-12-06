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

  const handleBlur = (field: keyof Honor, value: any) => {
    const updatedHonor = { ...localHonor, [field]: value };
    setLocalHonor(updatedHonor);
    onUpdateHonor(updatedHonor);
  };

  const styles = useStyles();

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
              onOptionSelect={(e, option) => {
                const newType = option.optionValue as HonorType;
                setLocalHonor({ ...localHonor, type: newType });
                handleBlur('type', newType);
              }}
              value={localHonor.type}
              placeHolder="Select honor type"
            />
          </Field>
          <Field label="Year" className={styles.field}>
            <DropdownCustom
              options={SchoolYear}
              onOptionSelect={(e, option) => {
                const newYear = parseInt(option.optionValue as string) as SchoolYear;
                setLocalHonor({ ...localHonor, year: newYear });
                handleBlur('year', newYear);
              }}
              value={localHonor.year}
              placeHolder="Select year"
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
