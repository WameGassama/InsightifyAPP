'use server';

import axios from 'axios';

export default async function GraphqlRequest(query: string, variables = null || {}): Promise<GraphqlRequest> {
  const headers = {
    'content-type': 'application/json',
  };

  const body = {
    query: query,
    variables: variables,
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
