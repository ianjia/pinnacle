import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  card: {
    marginBottom: '16px',
    padding: '24px',
  },
  header: {
    marginBottom: '32px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    paddingLeft: '0px',
  },
  reviewHeader: {
    marginTop: '10px',
    marginBottom: '-10px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    paddingLeft: '0px',
  },
  row: {
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  wideColumn: {
    width: '120px',
    minWidth: '100px',
    maxWidth: '150px',
  },
  cell: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: '2px',
    paddingRight: '20px',
    margin: '0',
    height: '100%',
    fontSize: '14px',
  },
  headerCell: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '2px',
    paddingRight: '20px',
    margin: '0',
    fontSize: '15px',
    fontWeight: 'bold',
    height: '100%',
  },
  actionCell: {
    justifyContent: 'left',
    paddingLeft: '20px',
  },
  actionButton: {
    padding: '0',
    height: '28px',
    lineHeight: '1',
  },
  addItemButton: {
    fontSize: '14px',
    color: 'gray',
    height: '28px',
  },
  actionPanelButton: {
    fontSize: '14px',
    width: '250px',
    height: '28px',
  },

  buttonWithInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '6px',
  },

  infoIcon: {
    marginLeft: '4px',
  },
  
  addItemContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '10px',
  },
});
