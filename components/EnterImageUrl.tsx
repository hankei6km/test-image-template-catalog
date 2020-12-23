import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > .MuiBox-root': {
      display: 'flex',
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
        id="enter-image-url"
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
        <Box>
          <IconButton
            aria-label="enter"
            color="default"
            onClick={() => setImageUrl(inputValue)}
          >
            <DoneIcon color="primary" />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            aria-label="clear"
            color="default"
            onClick={() => {
              setInputValue('');
              setImageUrl('');
            }}
          >
            <ClearIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
export default EnterImageUrl;
