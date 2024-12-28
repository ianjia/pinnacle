import { makeStyles } from '@fluentui/react-components';

export const useCanvasBackgroundStyles = makeStyles({
  container: {
    backgroundColor: '#f0f0f0', // Light gray for good text contrast
    backgroundPosition: 'center',
    minHeight: '100vh', // Allows the container to grow beyond viewport height
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // overflow: 'hidden', // omitted per instructions
  },
});

