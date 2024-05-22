const getChannelsQuery = `
query Channels($limit: Int, $offset: Int, $status: String) {
  channels(where: {status: {_eq: $status}}, offset: $offset, limit: $limit) {
    id
    status
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
  channels_aggregate(where: {status: {_eq: $_eq}}) {
    count
  }
}`;

const updateChannelMutation = `
mutation UpdateChannel($id: String!, $status: String) {
  update_channel(id: $id, input: {status: $status}) {
    display_name
    id
    handle
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

export default { getChannelsQuery, getCountQuery, updateChannelMutation };
