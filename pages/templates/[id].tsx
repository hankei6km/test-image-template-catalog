import Layout from '../../components/Layout';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import ErrorPage from 'next/error';
import { getAllTemplateIds, getTemplateData } from '../../lib/templates';
import { GetStaticProps, GetStaticPaths } from 'next';
import { TemplateEntryField } from '../../interfaces/template';
import TemplatePreview from '../../components/TemplatePreview';
import Link from '../../components/Link';

export default function Post({
  postData
}: {
  postData: TemplateEntryField;
  preview: boolean;
}) {
  if (!postData) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Container max-width="sm">
        <Box p={1}>
          <Card elevation={0}>
            <CardHeader
              titleTypographyProps={{ variant: 'body2' }}
              title={
                <Box>
                  <Box>{postData.label}</Box>
                  <Box>{postData.id}</Box>
                </Box>
              }
            />
            <CardContent>
              <TemplatePreview template={postData.template} imageUrl={''} />
            </CardContent>
          </Card>
          <Box>
            <Link href="/">← Back to home</Link>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllTemplateIds();
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postData = await getTemplateData(context);
  return {
    props: {
      postData,
      preview: context.preview ? context.preview : null
    }
  };
};
