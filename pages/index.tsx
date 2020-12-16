import { getSortedTemplatesData } from '../lib/templates';
import { GetStaticProps } from 'next';
// import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import Link from '../components/Link';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import { TemplateEntryField } from '../interfaces/template';
import TemplatePreview from '../components/TemplatePreview';

// const useStyles = makeStyles(() => ({
//   root: {}
// }));

const IndexPage = ({
  allPostsData
}: {
  allPostsData: TemplateEntryField[];
}) => {
  // const classes = useStyles();
  return (
    <Layout title="Home" home>
      <Container max-width="md">
        {allPostsData.map((v) => (
          <Box>
            <Card elevation={0}>
              <CardHeader
                titleTypographyProps={{ variant: 'body2' }}
                title={v.label}
              />
              <CardActionArea component={Link} href={`templates/${v.id}`}>
                <TemplatePreview template={v.template} />
              </CardActionArea>
            </Card>
          </Box>
        ))}
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
