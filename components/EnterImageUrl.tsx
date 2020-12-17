import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > .MuiBox-root': {
      paddingLeft: theme.spacing(1)
    }
  }
}));

const EnterImageUrl = ({
  defaultValue = '',
  onEnter
}: {
  defaultValue?: string;
  onEnter: (e: { value: string }) => void;
}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState(defaultValue);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    onEnter({ value: imageUrl });
  }, [onEnter, imageUrl]);
  return (
    <Box className={classes.root}>
      <TextField
        label="Enter image url"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            setImageUrl(inputValue);
            e.preventDefault();
          }
        }}
      />
      <Box>
        <Button
          variant="contained"
          disableElevation={true}
          color="default"
          onClick={() => {
            setInputValue('');
            setImageUrl('');
          }}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};
export default EnterImageUrl;
