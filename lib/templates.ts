import { ParsedUrlQuery } from 'querystring';
import { GetStaticPropsContext } from 'next';
import { TemplateEntryField } from '../interfaces/template';

// getStaticProps 等のビルド時に実行される関数以外からは呼ばないように注意
// (getStaticProps は デプロイされるときに bundle されないはずだが、明記されたところは見たいことないような。。。)

function getFieldsQueryParams(fileds: string[]): string {
  const q = new URLSearchParams('');
  q.append('fields', fileds.join(','));
  return q.toString();
}
const sortedTemplateDataFields = getFieldsQueryParams([
  'id',
  'label',
  'template'
]);
const allTemplateFields = getFieldsQueryParams(['id']);
const templateDataFields = getFieldsQueryParams(['id', 'label', 'template']);

// async にしても大丈夫? index.js では async から呼んでいるが、await はなかった
export async function getSortedTemplatesData() {
  try {
    const res = await fetch(
      `${process.env.TEMPLATE_API_URL_BASE}?${sortedTemplateDataFields}`,
      {
        method: 'GET',
        headers: { 'X-API-KEY': process.env.TEMPLATE_API_KEY || '' }
      }
    );
    if (res.ok) {
      return ((await res.json()) || []).contents.map(
        ({ id, label, template }: TemplateEntryField) => {
          return {
            id,
            label,
            template
          };
        }
      );
    } else {
      console.error(`getSortedTemplateData error: ${res.statusText}`);
    }
  } catch (err) {
    // TODO: ビルド時のエラーはどう扱うのが正解? 迂闊に err を表示するとシークレットが漏洩する可能性もある.
    console.error(`getSortedTemplateData error: ${err.name}`);
  }
  return [];
}

export async function getAllTemplateIds() {
  try {
    const res = await fetch(
      `${process.env.TEMPLATE_API_URL_BASE}?${allTemplateFields}`,
      {
        method: 'GET',
        headers: { 'X-API-KEY': process.env.TEMPLATE_API_KEY || '' }
      }
    );
    if (res.ok) {
      return ((await res.json()) || []).contents.map(
        ({ id }: TemplateEntryField) => {
          return {
            params: {
              id
            }
          };
        }
      );
    } else {
      console.error(`getAllTemplateIds error: ${res.statusText}`);
    }
  } catch (err) {
    // TODO: ビルド時のエラーはどう扱うのが正解? 迂闊に err を表示するとシークレットが漏洩する可能性もある.
    console.error(`getAllTemplateIds error: ${err.name}`);
  }
  return [];
}

export async function getTemplateData({
  params = { id: '' },
  preview = false,
  previewData = {}
}: GetStaticPropsContext<ParsedUrlQuery>) {
  try {
    let url = `${process.env.TEMPLATE_API_URL_BASE}/${params.id}?${templateDataFields}`;
    if (preview) {
      // console.log('----preview');
      const previewDataFields = new URLSearchParams(templateDataFields);
      previewDataFields.append('draftKey', previewData.draftKey);
      url = `${process.env.TEMPLATE_API_URL_BASE}/${
        previewData.slug
      }?${previewDataFields.toString()}`;
    }
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'X-API-KEY': process.env.TEMPLATE_API_KEY || '' }
    });
    // console.log(res.data.series);
    // Combine the data with the id and contentHtml
    if (res.ok) {
      const data = (await res.json()) || { series: [] };
      return {
        id: data.id,
        label: data.label,
        template: data.template
      };
    } else {
      console.error(`getTemplateData error: ${res.statusText}`);
    }
  } catch (err) {
    // TODO: ビルド時のエラーはどう扱うのが正解? 迂闊に response を表示するとシークレットが漏洩する可能性もある.
    console.error(`getTemplateData error: ${err.name}`);
  }
  return {};
}
