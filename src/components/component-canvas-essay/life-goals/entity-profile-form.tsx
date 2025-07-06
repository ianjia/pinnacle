import React from 'react';
import { Button } from '@fluentui/react-components';
import { Add20Regular, Delete24Regular } from '@fluentui/react-icons';
import { useStyles } from './entity-profile-form.styles';
import { EntityCard, BasicEntity } from './entity-card';

interface Props<T extends BasicEntity> {
  title: string;
  entityList: T[];
  onAddEntity: () => void;
  onUpdateEntity: (e: T) => void;
  onDeleteEntity: (id: number) => void;
}

export function EntityProfileForm<T extends BasicEntity>({
  title,
  entityList,
  onAddEntity,
  onUpdateEntity,
  onDeleteEntity,
}: Props<T>) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>{title}</h2>

      {entityList.map((item) => (
        <div key={item.id} className={styles.itemContainer}>
          <EntityCard entity={item} onUpdateEntity={onUpdateEntity} />

          <Button
            appearance="subtle"
            icon={<Delete24Regular />}
            className={styles.deleteButton}
            onClick={() => onDeleteEntity(item.id)}
            aria-label="Delete item"
          />
        </div>
      ))}

      <Button
        appearance="secondary"
        icon={<Add20Regular />}
        className={styles.addButton}
        onClick={onAddEntity}
      >
        Add
      </Button>
    </div>
  );
}
