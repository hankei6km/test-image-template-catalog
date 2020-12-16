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
import { TemplateEntryField } from '../interfaces/template';
import TemplatePreview from '../components/TemplatePreview';
import EnterImageUrl from '../components/EnterImageUrl';

const useStyles = makeStyles(() => ({
  // root: {},
  previewOuter: { minHeight: '30vh' }
}));

const IndexPage = ({
  allPostsData
}: {
  allPostsData: TemplateEntryField[];
}) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState('');

  return (
    <Layout title="Home" home>
      <Container max-width="md">
        <Box>
          <Box py={1}>
            <EnterImageUrl onEnter={({ value }) => setImageUrl(value)} />
          </Box>
          <Box>
            {allPostsData.map((v) => (
              <Box key={v.id}>
                <Card elevation={1}>
                  <CardHeader
                    titleTypographyProps={{ variant: 'body2' }}
                    title={v.label}
                  />
                  <CardActionArea component={Link} href={`/templates/${v.id}`}>
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
