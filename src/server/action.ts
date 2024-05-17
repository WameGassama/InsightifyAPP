'use server';

import Channels from '@/graphql/channels';
import ChannelsAggregate from '@/graphql/channelsAggregate';
import axios from 'axios';

export default async function getChannels(offset: number, limit: number): Promise<Channels> {
  const headers = {
    'content-type': 'application/json',
  };

  const body = {
    query: Channels,
    variables: {
      limit: limit,
      offset: offset,
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
export async function getChannelsAggregate(): Promise<ChannelsAggregate> {
  const headers = {
    'content-type': 'application/json',
  };

  const body = {
    query: ChannelsAggregate,
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
