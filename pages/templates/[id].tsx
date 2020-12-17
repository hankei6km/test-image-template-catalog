import { getAllTemplateIds, getTemplateData } from '../../lib/templates';
import { GetStaticProps, GetStaticPaths } from 'next';
import ErrorPage from 'next/error';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/Layout';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { TemplateData } from '../../interfaces/template';
import TemplatePreview from '../../components/TemplatePreview';
import Link from '../../components/Link';

const useStyles = makeStyles((theme) => ({
  templateCode: {
    width: '100%',
    // overflowWrap: 'anywhere',
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
    fontSize: theme.typography.body1.fontSize
  }
}));

export default function Post({
  postData
}: {
  postData: TemplateData;
  preview: boolean;
}) {
  const classes = useStyles();

  if (!postData) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout title={postData.label}>
      <Container max-width="sm">
        <Box>
          <Box py={1}>
            <Box>
              <Typography variant="h5">{postData.label}</Typography>
            </Box>
            <Box>
              <Typography variant="body2">{postData.id}</Typography>
            </Box>
          </Box>
          <Box py={1}>
            <Typography variant="h6">template preview</Typography>
            <TemplatePreview template={postData.template} imageUrl={''} />
          </Box>
          <Box py={1}>
            <Typography variant="h6">template code</Typography>
            <pre>
              <code
                className={`hljs ${classes.templateCode}`}
                dangerouslySetInnerHTML={{
                  __html: postData.templatehigHlighted
                }}
              />
            </pre>
          </Box>
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
