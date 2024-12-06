import React from 'react';
import { Button } from '@fluentui/react-components';
import { Add20Regular, Delete24Regular } from '@fluentui/react-icons';
import { useStyles } from './entity-profile-form.styles';
import { EntityCard, BasicEntity } from './entity-card';

interface EntityProfileFormProps<T extends BasicEntity> {
  title: string;
  entityList: T[];
  onAddEntity: () => void;
  onUpdateEntity: (entity: T) => void;
  onDeleteEntity: (id: number) => void;
}

export function EntityProfileForm<T extends BasicEntity>(props: EntityProfileFormProps<T>) {
  const { title, entityList, onAddEntity, onUpdateEntity, onDeleteEntity } = props;
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>{title}</h2>
      {entityList.map((item) => (
        <div key={item.id} className={styles.itemContainer}>
          <EntityCard entity={item} onUpdateEntity={onUpdateEntity} />
          <Button
            icon={<Delete24Regular />}
            appearance="subtle"
            className={styles.deleteButton}
            onClick={() => onDeleteEntity(item.id)}
          />
        </div>
      ))}
      <Button 
        icon={<Add20Regular />}
        className={styles.addButton} 
        onClick={onAddEntity}
      >
        Add
      </Button>
    </div>
  );
}
