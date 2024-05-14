const getChannels = `
query Channels($limit: Int, $offset: Int) {
  channels(offset: $offset, limit: $limit) {
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

export default getChannels;
