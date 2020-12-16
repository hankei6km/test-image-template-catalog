import React, { useState } from 'react';
import { getSortedTemplatesData } from '../lib/templates';
import { GetStaticProps } from 'next';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import Link from '../components/Link';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { TemplateEntryField } from '../interfaces/template';
import TemplatePreview from '../components/TemplatePreview';

const useStyles = makeStyles((theme) => ({
  // root: {},
  inputImageUrlOuter: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > .MuiBox-root': {
      paddingLeft: theme.spacing(1)
    }
  },
  previewOuter: { minHeight: '30vh' }
}));

const IndexPage = ({
  allPostsData
}: {
  allPostsData: TemplateEntryField[];
}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  return (
    <Layout title="Home" home>
      <Container max-width="md">
        <Box>
          <Box py={1}>
            <Box className={classes.inputImageUrlOuter}>
              <TextField
                label="Enter image url"
                fullWidth
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Box>
                <Button
                  variant="contained"
                  disableElevation={true}
                  color="primary"
                  onClick={() => setImageUrl(inputValue)}
                >
                  Enter
                </Button>
              </Box>
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
          </Box>
          <Box>
            {allPostsData.map((v) => (
              <Box>
                <Card elevation={1}>
                  <CardHeader
                    titleTypographyProps={{ variant: 'body2' }}
                    title={v.label}
                  />
                  <CardActionArea component={Link} href={`templates/${v.id}`}>
                    <Box className={classes.previewOuter}>
                      <TemplatePreview
                        template={v.template}
                        imageUrl={imageUrl}
                      />
                    </Box>
                  </CardActionArea>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedTemplatesData();
  return {
    props: {
      allPostsData
    }
  };
};
