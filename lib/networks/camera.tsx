import { CreateCameraType, CameraType } from "../types/camera";
import { axiosInstance } from "./axiosInstance";

export async function getAllCameras() {
  const { data } = await axiosInstance.get<CameraType[]>("/cameras");
  return data;
}

export async function getCameraById(id: string) {
  const { data } = await axiosInstance.get<CameraType>("/cameras/" + id);
  return data;
}

export async function createCamera(values: CreateCameraType) {
  const { data } = await axiosInstance.post("/cameras", values);
  return data;
}

export async function updateCamera(id: string, values: CreateCameraType) {
  const { data } = await axiosInstance.put(`/cameras/${id}`, values);
  return data;
}

export async function deleteCamera(id: string) {
  const { data } = await axiosInstance.delete("/cameras/" + id);
  return data;
}
