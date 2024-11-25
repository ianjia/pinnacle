import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    Button,
  } from "@fluentui/react-components";
  import { Trophy24Regular } from "@fluentui/react-icons";

import { selectedProfileActions, RootState, AppDispatch } from '../../store';
import { ProfileType } from '../../shared';

export const ProfileNavPaneNewUX: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const activeProfile = useSelector((state: RootState) => state.selectedProfile.activeProfile);

    const handleProfileSelection = (profile: ProfileType) => {
        dispatch(selectedProfileActions.setSelectedProfile(profile));
    };

    const isActive = (profile: ProfileType) => activeProfile === profile;

    return (
        <div
            style={{
                width: "250px",
                borderRight: "1px solid #e0e0e0",
                padding: "16px",
                overflowY: "auto",
            }}
        >
            <Accordion>

                {/* Student Section */}
                <AccordionItem value="student">
                    <AccordionHeader
                        icon={<Trophy24Regular />}
                        onClick={() => handleProfileSelection(ProfileType.Student)}
                    >
                        Student
                    </AccordionHeader>
                </AccordionItem>

                {/* Academics Section */}
                <AccordionItem value="acdemics">
                    <AccordionHeader
                        icon={<Trophy24Regular />}
                        onClick={() => handleProfileSelection(ProfileType.Academic)}
                    >
                        Academics
                    </AccordionHeader>
                    {/* <AccordionPanel>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                        <li>
                            <Button
                            onClick={() => {
                                document
                                .getElementById("extracurricular")
                                ?.scrollIntoView({ behavior: "smooth" });
                            }}
                            appearance="transparent"
                            >
                            Extracurricular Activities
                            </Button>
                        </li>
                        <li>
                            <Button
                            onClick={() => {
                                document
                                .getElementById("internships")
                                ?.scrollIntoView({ behavior: "smooth" });
                            }}
                            appearance="transparent"
                            >
                            Internships
                            </Button>
                        </li>
                        </ul>
                    </AccordionPanel> */}
                </AccordionItem>

                {/* Activities Section */}               
                <AccordionItem value="activities">
                    <AccordionHeader
                        icon={<Trophy24Regular />}
                        onClick={() => handleProfileSelection(ProfileType.Activity)}
                    >
                        Activities
                    </AccordionHeader>
                </AccordionItem>

                {/* Honors Section */}               
                <AccordionItem value="honors">
                    <AccordionHeader
                        icon={<Trophy24Regular />}
                        onClick={() => handleProfileSelection(ProfileType.Honor)}
                    >
                        Honors & Awards
                    </AccordionHeader>
                </AccordionItem>

                {/* Life & Goals Section */}               
                <AccordionItem value="lifegoal">
                    <AccordionHeader
                        icon={<Trophy24Regular />}
                        onClick={() => handleProfileSelection(ProfileType.LifeGoals)}
                    >
                        Life & Goals
                    </AccordionHeader>
                </AccordionItem>

            </Accordion>
        </div>
    );
};


