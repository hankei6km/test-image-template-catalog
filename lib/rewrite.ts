import cheerio from 'cheerio';
// https://microcms.io/blog/syntax-highlighting-on-server-side

type rewritePlug = ($: cheerio.Root) => Error | null;

export function rewriteImage(imageUrl: string): rewritePlug {
  return ($) => {
    if (imageUrl) {
      const sourcesParams: string[][] = [];
      $('picture source').each((_idx, elm) => {
        sourcesParams.push(
          ($(elm).attr('srcset') || '')
            .split(', ')
            .map((v) => v.split('?', 2)[1])
        );
      });
      const imgParams = ($('picture img').attr('src') || '').split('?', 2)[1];

      const u = imageUrl.split('?', 1)[0];
      $('picture source').each((idx, elm) => {
        $(elm).attr(
          'srcset',
          sourcesParams[idx].map((v) => `${u}?${v}`).join(',')
        );
      });
      $('picture img').attr('src', `${u}?${imgParams}`);
    }
    return null;
  };
}

type chain = {
  use: (p: rewritePlug) => chain;
  run: () => string;
};

export function rewrite(body: string): chain {
  const $ = cheerio.load(body);

  const plugs: rewritePlug[] = [];
  const runFunc = () => {
    plugs.forEach((v) => v($));
    return $.html();
  };
  const useFunc = (p: rewritePlug) => {
    plugs.push(p);
    return {
      use: useFunc,
      run: runFunc
    };
  };
  return {
    use: useFunc,
    run: runFunc
  };
}
