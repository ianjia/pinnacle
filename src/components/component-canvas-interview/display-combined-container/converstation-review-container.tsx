import * as React from 'react';
import { TabList, Tab, SelectTabEvent, SelectTabData, Card } from '@fluentui/react-components';
import { ConversationItem } from '../../../shared';
import { ConversationDisplay } from '../conversation-display/conversation-display';
import { ReviewDisplay } from '../review-display/review-dislay';

interface ContainerProps {
    /** The conversation array for ConversationDisplay */
    conversation: ConversationItem[];
    /** The review text (Markdown-supported) for ReviewDisplay */
    review: string;
  }
  
export const ConversationReviewContainer: React.FC<ContainerProps> = ({ conversation, review }) => {
    const [selectedTab, setSelectedTab] = React.useState<string>('conversation');
  
    // Use the correct event/data types from Fluent UI React v9
    const onTabSelect = (event: SelectTabEvent<HTMLElement>, data: SelectTabData) => {
      setSelectedTab(data.value as string);
    };
  
    return (
      <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <TabList selectedValue={selectedTab} onTabSelect={onTabSelect} style={{ marginBottom: '16px' }}>
          <Tab value="conversation">Conversation</Tab>
          <Tab value="review">Review</Tab>
        </TabList>
  
        {selectedTab === 'conversation' && <ConversationDisplay conversation={conversation} />}
        {selectedTab === 'review' && <ReviewDisplay review={review} />}
      </Card>
    );
  };