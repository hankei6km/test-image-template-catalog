import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { rewrite, rewriteImage } from '../lib/rewrite';

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

const TemplatePreview = ({
  template,
  imageUrl
}: {
  template: string;
  imageUrl: string;
}) => {
  const classes = useStyles();
  //const outerEl = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState(template);

  const outerRef = useCallback((node) => {
    if (node !== null) {
      // console.log('done');
      // おそらく画像のロード完了は待たない。あとで対応
      // TODO: 画像のロード完了を待つようにする
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setTag(rewrite(template).use(rewriteImage(imageUrl)).run());
  }, [template, imageUrl]);

  return (
    <Box>
      {loading && <Skeleton variant="rect" width="100%" height="100%" />}
      <div
        ref={outerRef}
        className={classes.preview}
        style={{ height: loading ? 0 : '100%' }}
        dangerouslySetInnerHTML={{ __html: tag }}
      />
    </Box>
  );
};

export default TemplatePreview;
