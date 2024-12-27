import { makeStyles } from '@fluentui/react-components';

export const useAccordionStyles = makeStyles({
  accordionContainerPane: {
    width: '250px',
    padding: '16px',
    overflowY: 'auto',
  },
  
  // Accordion
  accordionHeader: {
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex', // ensures flex layout
  },

  accordionHeaderActive: {
    color: '#0078d4',
  },

  accordionTitle: {
    flexGrow: 1,
  },

  accordionIcon: {
    display: 'flex',
    alignItems: 'center',
  },

  // Sub-items
  subItemList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0 0 0 30px', // Increased indent for sub-items
  },
  subItemListItem: {
    marginBottom: '0px', // Spacing for list items
  },

  // Button (with :hover and ::before pseudo-classes)
  subItemButton: {
    background: 'none',
    border: 'none',
    fontSize: '14px',
    color: '#333',
    textAlign: 'left',
    cursor: 'pointer',
    padding: '0px 0',
    width: '100%',
    display: 'inline-block',
    transition: 'color 0.3s ease',
    marginLeft: '10px', // Additional indent for button text

    // Pseudo-element for arrow
    '::before': {
      content: '">"', // or "\\003E" for the unicode character
      marginRight: '10px',
      fontWeight: 'bold',
    },

    // Pseudo-class for hover
    ':hover': {
      color: '#0078d4',
      textDecoration: 'underline',
    },
  },

  // Active state for subItemButton
  subItemButtonActive: {
    color: '#0078d4',
    fontWeight: 'bold',
    textDecoration: 'none', // Remove underline for active state
  },
});
