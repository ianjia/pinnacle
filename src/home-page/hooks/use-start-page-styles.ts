import { makeStyles, tokens } from '@fluentui/react-components';

export const useStartPageStyles = makeStyles({
  /* root page */
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },

  /* ─── top section ─── */
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingInline: tokens.spacingHorizontalL,
    minHeight: '120px',
    gap: tokens.spacingHorizontalL,
  },
  logoGroup: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS },
  logo:      { height: '100px' },
  logoText:  { height: '100px' },
  topButtons:{ display: 'flex', gap: tokens.spacingHorizontalS },

  /* ─── middle section ─── */
  middle: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBlock: tokens.spacingVerticalXXL,
    paddingInline: tokens.spacingHorizontalL,
    gap: tokens.spacingHorizontalXL,
  },
  middleBox: {
    flex: 1,
    maxWidth: '400px',
    textAlign: 'center',
    paddingInline: tokens.spacingHorizontalS,
  },
  eagle: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: tokens.borderRadiusSmall,
  },
  headline: {
    fontFamily: 'Georgia, serif',
    fontSize: '45px',
    lineHeight: 1.3,
    margin: 0,
  },
  note: {
    display: 'block',
    marginTop: tokens.spacingVerticalXXL,
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground3,
  },
  bulletList: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: tokens.fontSizeBase500,
    lineHeight: 1.6,
    listStylePosition: 'inside',
    margin: 0,
    padding: 0,
    textAlign: 'left',
  },

  /* ─── bottom section ─── */
  bottom: {
    textAlign: 'center',
    paddingBlock: tokens.spacingVerticalL,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
});
