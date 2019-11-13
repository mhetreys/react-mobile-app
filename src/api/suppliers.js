import { authorized } from './instance';

export const getSuppliersList = (user) => {
  return authorized.get(
    `v0/ui/website/campaigns-suppliers-inventory-list/?assigned_to=${user.user_id}&return_format=new`,
  );
};

export const getSupplierByCampaignList = ({ campaignId }) => {
  return authorized.get(
    `/v0/ui/website/${campaignId}/list_suppliers/`,
  );
};

export const getComment = ({ proposal_id, shortlisted_space_id, related_to }) => {
  return authorized.get(
    `/v0/ui/website/${proposal_id}/comment/?shortlisted_spaces_id=${shortlisted_space_id}&related_to=${related_to}`,
  );
};

export const postCommentData = ({ proposal_id, data }) => {
  return authorized.post(`/v0/ui/website/${proposal_id}/comment/`, data);
};

export const postSuppliersHashtag = (data) => {
  return authorized.post('/v0/ui/proposal/hashtag-images-new/', data);
};
