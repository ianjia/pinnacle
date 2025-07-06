import React, { useState } from 'react';
import {
  Field,
  Input,
  Textarea,
  Card,
} from '@fluentui/react-components';
import { useStyles } from './entity-card.styles';

export interface BasicEntity {
  id: number;
  user_id: number;
  name?: string;
  description?: string;
}

interface Props<T extends BasicEntity> {
  entity: T;
  onUpdateEntity: (e: T) => void;
}

export function EntityCard<T extends BasicEntity>({
  entity,
  onUpdateEntity,
}: Props<T>) {
  const [localEntity, setLocalEntity] = useState<T>(entity);
  const styles = useStyles();

  const handleBlur = (field: keyof T, value: any) => {
    if (entity[field] === value) return;
    const updated = { ...localEntity, [field]: value };
    setLocalEntity(updated);
    onUpdateEntity(updated);
  };

  return (
    <Card className={styles.card}>
      {/* name row */}
      <div className={styles.fieldRow}>
        <div className={styles.nameFieldContainer}>
          <Field label="Name" className={styles.field}>
            <Input
              value={localEntity?.name ?? ''}
              onChange={(e) =>
                setLocalEntity({ ...localEntity, name: e.target.value })
              }
              onBlur={(e) => handleBlur('name', e.target.value)}
            />
          </Field>
        </div>
      </div>

      {/* description row */}
      <div className={styles.grid}>
        <Field label="Description" className={styles.field}>
          <Textarea
            value={localEntity?.description ?? ''}
            onChange={(e) =>
              setLocalEntity({
                ...localEntity,
                description: e.target.value,
              })
            }
            onBlur={(e) => handleBlur('description', e.target.value)}
            resize="vertical"
            className={styles.textarea}
          />
        </Field>
      </div>
    </Card>
  );
}
