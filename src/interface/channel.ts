interface Channel {
  channel: {
    id: string;
    status: string;
    avatar: string | null;
    color: string;
    url: string;
    display_name: string;
    handle: string;
    country: string;
    joined_data: string;
    bio: string;
    statistics: {
      total: {
        subscribers: number;
        uploads: number;
        views: number;
      };
      daily: {
        date: string;
        subscribers: number;
        uploads: number;
        views: number;
      }[];
    };
    socials: {
      facebook: string;
      instagram: string;
      tiktok: string;
      twitter: string;
    };
  };
}
