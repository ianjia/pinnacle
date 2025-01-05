import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';

import {
  CollegeMapData,
} from './data-types';

import { getCategoryDisplayName } from './utils/getCategoryDisplayName';


interface MarkerPopupProps {
  data: CollegeMapData;
}

/**
 * MarkerPopup is the content shown in each Leaflet marker popup.
 * It shows:
 * 1. The collegeName as a clickable link to the main URL.
 * 2. A "More Info / Less Info" toggle button.
 * 3. When expanded, shows admission info and resource links.
 */
export const MarkerPopup: React.FC<MarkerPopupProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const {
    url,
    resource,
    collegeName,
    admitRate,
    nationalRanking,
    majorRanking,
    myChance,
    category,
  } = data;

  // Toggle the "More Info" / "Less Info"
  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  // Return JSX for the popup
  return (
    <div style={{ padding: '5px', width: '200px' }}>
      {/* Top half: a link to the college website */}
      <div style={{ marginBottom: '8px' }}>
        <a href={url.href} target="_blank" rel="noopener noreferrer">
          {collegeName}
        </a>
      </div>

      {/* More Info / Less Info button */}
      <button onClick={handleToggle} style={{ marginBottom: '8px' }}>
        {expanded ? 'Less Info' : 'More Info'}
      </button>

      {/* Expanded content: admission + resource links */}
      {expanded && (
        <div>
          {/* 1. Admission data */}
          <h4>Admission Data:</h4>
          <div style={{ marginBottom: '10px' }}>
            {category && <div>Category: {getCategoryDisplayName(category)}</div>}
            {admitRate !== undefined && <div>Admit Rate: {admitRate}%</div>}
            {nationalRanking !== undefined && (
              <div>National Ranking: {nationalRanking}</div>
            )}
            {majorRanking !== undefined && (
              <div>Major Ranking: {majorRanking}</div>
            )}
            {myChance !== undefined && (
              <div>My Chance: {myChance}%</div>
            )}
          </div>

          {/* 2. Online resources (if they exist) */}
          {resource && (
            <div>
              <h4>Helpful Resource:</h4>
              <ul style={{ paddingLeft: '16px' }}>
                {/* Only render if not undefined */}
                {resource.admission && (
                  <li>
                    <a
                      href={resource.admission.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Admission Office
                    </a>
                  </li>
                )}
                {resource.niche && (
                  <li>
                    <a
                      href={resource.niche.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Info on Niche
                    </a>
                  </li>
                )}
                {resource.appily && (
                  <li>
                    <a
                      href={resource.appily.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Info on Appily
                    </a>
                  </li>
                )}
                {resource.unigo && (
                  <li>
                    <a
                      href={resource.unigo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Unigo Forum
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
