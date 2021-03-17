import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  cardRoot: {
    width: 575,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  cardTitle: {
    marginBottom: '20px',
  },
  cardPos: {
    marginBottom: 12,
  },
  cardButton: {
    fontSize: '24px',
  },
  cardInput: {
    fontSize: '24px',
  },
  gridContainer: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))
