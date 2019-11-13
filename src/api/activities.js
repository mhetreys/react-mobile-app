import { authorized } from './instance';

export const postActivityImage = (data) => {
  return authorized.post(`/v0/ui/website/upload-inventory-activity-image-amazon-new/`, data);
};
