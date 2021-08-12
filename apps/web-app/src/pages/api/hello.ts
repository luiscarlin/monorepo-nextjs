import { NextApiRequest, NextApiResponse } from 'next';
import { sayHello } from '@your-org/core-lib';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return res.send(sayHello('world loaded from /api/hello'));
}
