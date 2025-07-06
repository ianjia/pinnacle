import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  /* ── outer card ─────────────────────────────────────────────── */
  card: {
    marginBottom: tokens.spacingVerticalL,                            
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,   
    backgroundColor: tokens.colorNeutralBackground1,
  },

  header: {
    marginBottom: tokens.spacingVerticalL,                                
    fontSize: tokens.fontSizeBase600,                                  
    fontWeight: tokens.fontWeightSemibold,
    textAlign: 'left',
  },

  /* ── grid wrapper for children (keeps 1-column stack) ───────── */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: tokens.spacingVerticalL,                                         
  },

  /* ── form row inside each section ───────────────────────────── */
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXL,                                       
    marginBottom: tokens.spacingVerticalL,                                 
  },

  label: {
    minWidth: '200px',                                                   
    fontWeight: tokens.fontWeightSemibold,
  },
});
