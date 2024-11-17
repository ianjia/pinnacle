import { useSelector } from 'react-redux';
import { RootState} from '../../../store';

export interface ISelectedIdeaAndEssay {
    key: string | undefined;
    idea: string | undefined;
    essay: string | undefined;
}

export const useSelectedInfo = (): ISelectedIdeaAndEssay => { 
    const ideas = useSelector((state: RootState) => state.essayWorkshop.ideas);
    const essay = useSelector((state: RootState) => state.essayWorkshop.essay);
    const selectedIdeaKey: string | undefined = useSelector((state: RootState) => state.essayWorkshop.selectedIdeaKey);

    let idea_return: string | undefined = undefined;
    let essay_return: string | undefined = undefined;

    if (selectedIdeaKey !== undefined ) { 
        if (ideas[selectedIdeaKey] !== undefined) {
            idea_return = ideas[selectedIdeaKey];
        }
        if (essay[selectedIdeaKey] !== undefined) {
            essay_return = essay[selectedIdeaKey];
        }
    }

    return {
        key: selectedIdeaKey,
        idea: idea_return,
        essay: essay_return
    }
}
