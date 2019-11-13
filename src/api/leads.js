import { authorized } from './instance';

export const getLeadsList = ({campaignId}) => {
  return authorized.get(
    `/v0/ui/leads/${campaignId}/form`,
  );
};

export const getExtraLeadsList = ({ campaignId, supplierId, leads_form_id}) => {
  return authorized.get(
    `/v0/ui/website/get-extra-leads/${campaignId}/${leads_form_id}/${supplierId}/`,
  );
};

export const postExtraLeadsData = ({leadsData, leads_form_id}) => {
  return authorized.post(
    `/v0/ui/leads/${leads_form_id}/insert_extra_leads/`,
    leadsData
  );
};
