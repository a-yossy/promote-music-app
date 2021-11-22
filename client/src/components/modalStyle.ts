import { makeStyles } from '@material-ui/core';

export default makeStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  content: {
    zIndex: 20,
    width: '30%',
    padding: 1,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
});
