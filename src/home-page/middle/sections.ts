import { svgPlaceholder } from './utils/svgPlaceholder';

const student_profile_img = '/assets/images/student_profile.png';
const college_matcher_img = '/assets/images/college_matcher.png';
const holistic_review_img = '/assets/images/holistic_review.png';
const mock_interview_img = '/assets/images/mock_interview.png';

const profile_student_info_img = '/assets/images/profile_student_info.png';
const profile_academics_img = '/assets/images/profile_academics.png';
const profile_activities_img = '/assets/images/profile_activities.png';
const profile_awards_img = '/assets/images/profile_awards.png';

const college_pref_img = '/assets/images/college_pref.png';
const college_list_img = '/assets/images/college_list.png';
const college_nav_img = '/assets/images/college_nav.png';
const college_comp_img = '/assets/images/college_comp.png';

const review_chance_img = '/assets/images/review_chance.png';
const review_eval_img = '/assets/images/review_eval.png';
const review_action_img = '/assets/images/review_action.png';
const review_fit_img = '/assets/images/review_fit.png';

const interview_real_img = '/assets/images/interview_real.png';
const interview_tailored_img = '/assets/images/interview_tailored.png';
const interview_perf_img = '/assets/images/interview_perf.png';
const interview_history_img = '/assets/images/interview_history.png';


export type SectionKey = 'student' | 'college' | 'review' | 'interview';

export interface SectionTile {
  img: string;
  title: string;
  body: string;
  alt: string;
}

export interface SectionData {
  heroTitle: string;
  heroCopy: string | string[];
  heroGradient: string;
  heroImage: string;
  tiles: SectionTile[];
  bgGradient: string;
}

export const TABS: { key: SectionKey; label: string }[] = [
  { key: 'student',   label: 'Student Record' },
  { key: 'college',   label: 'College List' },
  { key: 'review',    label: 'Holistic Review' },
  { key: 'interview', label: 'Mock Interview' },
];

export const SECTION_CONTENT: Record<SectionKey, SectionData> = {
  student: {
    heroTitle: 'Set up your profile',
    heroCopy: 'Seamlessly craft a unified personal profile that highlights your experiences both in and outside of school',
    heroGradient:
      'linear-gradient(180deg, #8EC5FC 0%, #84A3FF 45%, #A78BFA 100%)',
    heroImage: student_profile_img,
    tiles: [
      { img: profile_student_info_img,
        title: 'Student Information',
        body: 'Enter core personal details for a complete profile.',
        alt: 'Student Information' },
      { img: profile_academics_img,
        title: 'School Academics',
        body: 'Include courses, grades, and credits for a clean academic snapshot.',
        alt: 'Transcript tracker placeholder' },
      { img: profile_activities_img,
        title: 'Activities Timeline',
        body: 'Organize your activities, track your extracurriculars with key details and highlights at a glance.',
        alt: 'Activities timeline' },
      { img: profile_awards_img,
        title: 'Awards & Honors',
        body: 'Capture distinctions and recognitions in applications.',
        alt: 'Awards and honors' },
    ],
    bgGradient: 'linear-gradient(180deg, #F6EDFF 0%, #EFE6FF 60%, #EDEBFF 100%)',
  },

  college: {
    heroTitle: 'Build a balanced college list',
    heroCopy:
      'Find reach, target, and likely schools that match your goals, budget, and vibe.',
    heroGradient:
      'linear-gradient(180deg, #34D399 0%, #22D3EE 50%, #818CF8 100%)',
    heroImage: college_matcher_img,
    tiles: [
      { img: college_pref_img,
        title: 'College Preferences',
        body: 'Customize your college preferences - from campus culture and housing to academics and extracurriculars.',
        alt: 'College Preferences' },
      { img: college_list_img,
        title: 'College List',
        body: 'Receive a balanced college list tailored to your profile, plus EA, ED suggestions',
        alt: 'College list' },
      { img: college_nav_img,
        title: 'College Navigation',
        body: 'Explore suggested colleges on an interactive map, easily navigate school details with just one click.',
        alt: 'College Navigation' },
      { img: college_comp_img,
        title: 'College Comparison',
        body: 'Compare colleges side by side in details to help you decide which school fits you best.',
        alt: 'College Comparison' },
    ],
    bgGradient: 'linear-gradient(180deg, #ECFEFF 0%, #E6FFFB 60%, #EEF2FF 100%)',
  },

  review: {
    heroTitle: 'See what admissions sees',
    heroCopy:
      'A holistic read of your profile with strengths, gaps, and targeted next steps.',
    heroGradient:
      'linear-gradient(180deg, #60A5FA 0%, #34D399 50%, #4ADE80 100%)',
    heroImage: holistic_review_img,
    tiles: [
      { img: review_chance_img,
        title: 'Admission Chance',
        body: 'Discover your personalized acceptance chance as a percentage along with the reasons.',
        alt: 'Academic Chance' },
      { img: review_eval_img,
        title: 'Holistic Evaluation',
        body: 'Comparing your academics, activities, essays and personal traits to past accepted students.',
        alt: 'Holistic Evaluation' },
      { img: review_action_img,
        title: 'Actionable Suggestions',
        body: 'Receive personalized steps to make your application more solid and well rounded.',
        alt: 'Actionable Suggestions' },
      { img: review_fit_img,
        title: 'Fit Assessment',
        body: 'Evaluate your fit, understand how well you blend into campus life and thrive in this college',
        alt: 'Fit Assessment' },
    ],
    bgGradient: 'linear-gradient(180deg, #E0F2FE 0%, #DCFCE7 60%, #ECFDF5 100%)',
  },

  interview: {
    heroTitle: 'Practice interviews that feel real',
    heroCopy:
      'Do AI mock interviews, practice live with voice, get instant feedback to improve.',
    heroGradient:
      'linear-gradient(180deg, #93C5FD 0%, #818CF8 45%, #A78BFA 100%)',
    heroImage: mock_interview_img,
    tiles: [
      { img: interview_real_img,
        title: 'Realistic Simulations',
        body: 'Experience a voice-based real-time mock interview that truly feels real.',
        alt: 'Realistic Simulations' },
      { img: interview_tailored_img,
        title: 'Tailored Interview',
        body: 'Experience a tailored interview customized to your chosen college, major and background.',
        alt: 'Tailored Interview' },
      { img: interview_perf_img,
        title: 'Performance Review',
        body: 'Get a review analyzing your interview content and speaking style, with improvement feedback.',
        alt: 'Performance Review' },
      { img: interview_history_img,
        title: 'Interview History',
        body: 'View your interview history to track progress and see your past interview transcript.',
        alt: 'Interview History' },
    ],
    bgGradient: 'linear-gradient(180deg, #E0E7FF 0%, #EDE9FE 60%, #F1F5FF 100%)',
  },
};
