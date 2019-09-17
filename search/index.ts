import { NowRequest, NowResponse } from '@now/node'
import parser from './parser';
import query from './query';
import highlight from './highlight';
import hpp from './hpp';

export default async function (req: NowRequest, res: NowResponse) {
  const { term = '', limit = '4' } = hpp(req.query);

  if (term.length < 1) {
    res.status(404).json({ code: 1, msg: 'no search term provided' });
  }

  try {
    const data = await parser("posts/*.md");
    const matches: any[] = await query(data, term, parseInt(limit, 10));
    const results = await highlight(matches);
    res.json(results);
  } catch (error) {
    res.status(500).json({ code: 1, msg: error });
  }
}
