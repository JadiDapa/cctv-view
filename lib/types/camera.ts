export interface CreateCameraType {
  title: string;
  url: string;
  status: string;
}

export interface CameraType extends CreateCameraType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
