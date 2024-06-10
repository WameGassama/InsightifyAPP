const getHandlesQuery = `
query Handle {
  channels {
    id
    handle
  }
}`;

const getChannelQuery = `
query Channel($handle: string_filter_operators) {
  channel(where: {handle: $handle}) {
    id
    handle
    avatar
    display_name
    country
    joined_date
    status
    url
    statistics {
      total {
        subscribers
        uploads
        views
      }
      daily {
        date
        subscribers
        uploads
        views
      }
    }
    socials {
      facebook
      instagram
      tiktok
      twitter
    }
    bio
    color
  }
}
`;

const getChannelsQuery = `
query Channels($status: string_filter_operators!, $limit: Int, $offset: Int) {
  channels(where: {status: $status, avatar: {}}, offset: $offset, limit: $limit) {
    id
    status
    avatar
    color
    display_name
    handle
    statistics {
      total {
        subscribers
        uploads
        views
      }
    }
  }
}`;

const getCountQuery = `
query ChannelsAggregate($_eq: String) {
  channels_aggregate(where: {status: {_eq: $_eq}, avatar: {}}) {
    count
  }
}`;

const updateChannelMutation = `
mutation UpdateChannel($id: String!, $status: String) {
  update_channel(id: $id, input: {status: $status}) {
    display_name
    id
    handle
    avatar
    statistics {
      total {
        subscribers
        uploads
        views
      }
    }
    color
    status
  }
}`;

const channels = { getChannelsQuery, getChannelQuery, getCountQuery, updateChannelMutation, getHandlesQuery };

export default channels;
