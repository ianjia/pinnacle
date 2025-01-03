import Fuse from 'fuse.js';
import { collegeMapping } from '../college-mapping';

// Configure Fuse.js with locationMap keys
export const fuse = new Fuse(Array.from(collegeMapping.keys()), {
  threshold: 0.3, // Adjust for desired matching sensitivity
  includeScore: true,
});
