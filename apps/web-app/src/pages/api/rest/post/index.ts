import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from '@/backend/config/container.config';
import { MethodNotAllowed } from '@tsed/exceptions';
import { JsonApiResponseFactory } from '@your-org/core-lib/api/json-api';
import { JsonApiErrorFactory } from '@your-org/core-lib/api/json-api/json-api-error.factory';
import { PostRepositorySsr } from '@/backend/api/rest/post-repository.ssr';

export default async function handleListPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const postRepo = new PostRepositorySsr(prismaClient);
    try {
      return res.json(
        JsonApiResponseFactory.fromSuccess(
          await postRepo.getPosts({
            limit: 100,
          })
        )
      );
    } catch (e) {
      const apiError = JsonApiErrorFactory.fromTsedException(e);
      return res
        .status(apiError.status ?? 500)
        .json(JsonApiResponseFactory.fromError(apiError));
    }
  } else {
    return res
      .status(MethodNotAllowed.STATUS)
      .json(
        JsonApiResponseFactory.fromError(
          `The HTTP ${req.method} method is not supported at this route.`,
          MethodNotAllowed.STATUS
        )
      );
  }
}
