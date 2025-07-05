import { makeStyles, tokens } from '@fluentui/react-components';

export const useAccordionStyles = makeStyles({
  /* ───────── container ───────── */
  accordionContainerPane: {
    width: '240px',
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    overflowY: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
  },

  /* ───────── header (neutral) ───────── */
  accordionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightRegular,
    cursor: 'pointer',
    color: tokens.colorNeutralForeground1,
    borderRadius: tokens.borderRadiusMedium,

    '& .fui-AccordionHeader__content': {
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacingHorizontalS,
    },

    ':hover': { backgroundColor: tokens.colorNeutralBackground1Hover },
    ':focus': {
      outline: `2px solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: '2px',
    },
  },

  /* ───────── header (active) ───────── */
  accordionHeaderActive: {
    '& .fui-AccordionHeader__content': {
      fontWeight: tokens.fontWeightSemibold,
    },
    '& .fui-AccordionHeader__expandIcon': {
      color: tokens.colorBrandForeground1,
    },
  },

  /* ───────── custom icon span ───────── */
  accordionIcon: {
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    marginInlineEnd: tokens.spacingHorizontalS,
  },
  accordionIconActive: { color: tokens.colorBrandForeground1 },

  /* ───────── title slot ───────── */
  accordionTitle: { flexGrow: 1 },
  accordionTitleActive: { fontWeight: tokens.fontWeightSemibold },

  /* ───────── sub-items ───────── */
  subItemList: {
    listStyleType: 'none',
    margin: 0,

    /* ▼ moved panel further right (≈ 28 + 12 = 40 px) */
    paddingLeft: `calc(${tokens.spacingHorizontalXXXL} + ${tokens.spacingHorizontalM})`,
  },
  subItemListItem: { marginBottom: tokens.spacingVerticalXXS },

  subItemButton: {
    border: 0,
    background: 'none',
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    textAlign: 'left',
    cursor: 'pointer',
    width: '100%',
    padding: 0,
    transition: 'text-decoration .2s',

    '::before': {
      content: '">"',
      marginInlineEnd: tokens.spacingHorizontalM, // arrow–label gap
      fontWeight: 'bold',
      color: tokens.colorNeutralForeground2,      // arrow neutral by default
    },

    /* hover matches main headers: underline only */
    ':hover': { textDecoration: 'underline' },
    ':focus': {
      outline: `2px solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: '1px',
    },
  },

  /* selected sub-item: bold label + brand arrow */
  subItemButtonActive: {
    fontWeight: tokens.fontWeightSemibold,
    textDecoration: 'none',
    '&::before': { color: tokens.colorBrandForeground1 },
  },
});
