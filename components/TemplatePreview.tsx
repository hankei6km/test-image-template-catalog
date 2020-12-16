import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  preview: {
    '&  picture': {
      // '&  source': {
      //   width: '100%',
      //   height: '100%',
      //   objectFit: 'contain'
      // },
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }
    }
  }
}));

const TemplatePreview = ({ template }: { template: string }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.preview}
      dangerouslySetInnerHTML={{ __html: template }}
    />
  );
};

export default TemplatePreview;
