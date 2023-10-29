export default interface OttType {
  ott: {
    version: string;
    locale: 'en';
    currency: 'USD';
    style: 'DARK';
    nodetype: 'CUSTOM';
    nodewss: string;
    account: string;
    accounttype: 'REGULAR';
    accountaccess: 'FULL';
    user: string;
    user_device: {
      currency: 'USD';
      platform: 'ios' | 'android';
    };
    account_info: {
      account: string;
      name: string | null;
      domain: string | null;
      blocked: boolean;
      source: string;
      kycApproved: boolean;
      proSubscription: boolean;
    };
    subscriptions: [];
  };
  app: {
    name: string;
  };
  jwt: string;
}
