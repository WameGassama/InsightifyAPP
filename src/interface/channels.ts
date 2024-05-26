interface Channels {
  channels: {
    id: string;
    status: string;
    avatar: string | null;
    color: string;
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
