import React, { useState } from 'react';
import {
  Field,
  Input,
  Textarea,
  Card,
  CardPreview,
} from '@fluentui/react-components';
import { useStyles } from './entity-card.styles';

// We define a minimal interface that matches both LifeStory and AcademicCareerGoal:
export interface BasicEntity {
  id: number;
  user_id: number;
  name?: string;
  description?: string;
}

interface EntityCardProps<T extends BasicEntity> {
  entity: T;
  onUpdateEntity: (entity: T) => void;
}

export function EntityCard<T extends BasicEntity>({ entity, onUpdateEntity }: EntityCardProps<T>) {
  const [localEntity, setLocalEntity] = useState<T>(entity);

  const handleBlur = (field: keyof T, value: any) => {
    const updatedEntity = { ...localEntity, [field]: value };
    setLocalEntity(updatedEntity);
    onUpdateEntity(updatedEntity);
  };

  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardPreview>
        <div className={styles.fieldRow}>
          <div className={styles.nameFieldContainer}>
            <Field label="Name" className={styles.field}>
              <Input
                className={styles.input}
                value={localEntity.name || ''}
                onChange={(e) => setLocalEntity({ ...localEntity, name: e.target.value })}
                onBlur={(e) => handleBlur('name', e.target.value)}
              />
            </Field>
          </div>
        </div>
        <div className={styles.grid}>
          <Field label="Description" className={styles.field}>
            <Textarea
              className={styles.textarea}
              value={localEntity.description || ''}
              onChange={(e) => setLocalEntity({ ...localEntity, description: e.target.value })}
              onBlur={(e) => handleBlur('description', e.target.value)}
            />
          </Field>
        </div>
      </CardPreview>
    </Card>
  );
}
