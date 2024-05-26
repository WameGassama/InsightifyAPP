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

const channels = { getChannelsQuery, getCountQuery, updateChannelMutation };

export default channels;
