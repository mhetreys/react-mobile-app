import { authorized } from './instance';

export const getCampaignList = () => {
  return authorized.get(
    '/v0/ui/website/all-campaigns/',
  );
};
