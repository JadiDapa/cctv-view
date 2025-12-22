export type Camera = {
  id: string;
  name: string;
  location: string;
  image: string;
  battery: number;
  time: string;
};

export type CameraGroup = {
  title: string;
  cameras: Camera[];
};
