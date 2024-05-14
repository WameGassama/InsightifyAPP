interface Channels {
  channels: {
    display_name: string;
    handle: string;
    statistics: {
      total: {
        subscribers: number;
        uploads: number;
        views: number;
      };
    };
  }[];
}
