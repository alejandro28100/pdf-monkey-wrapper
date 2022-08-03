type getAccountDetailsResponse = {
  current_user: {
    id: string;
    auth_token: string;
    available_documents: number;
    created_at: string;
    current_plan: string;
    desired_plan_interval: string;
    desired_name: string;
    email: string;
    lang: string;
    paying_customer: boolean;
    trial_ends_on: string;
    updated_at: string;
    block_resources: boolean;
    share_links: boolean;
  };
};

export default getAccountDetailsResponse;
