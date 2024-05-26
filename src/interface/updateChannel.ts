interface UpdateChannel {
  update_channel: {
    id: string;
    status: string;
    avatar: string;
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
  };
}
