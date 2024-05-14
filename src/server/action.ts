'use server';

import Channels from '@/graphql/channels';
import axios from 'axios';

export default async function getChannels(page: number): Promise<Channels> {
  const headers = {
    'content-type': 'application/json',
  };

  const body = {
    query: Channels,
    variables: {
      limit: 10 * page,
      offset: 0,
    },
  };

  const options = {
    method: 'POST',
    url: 'http://localhost:4000/graphql',
    headers,
    data: body,
  };

  return axios(options)
    .then((response) => response.data.data)
    .catch((err) => {
      throw {
        error: err,
      };
    });
}
