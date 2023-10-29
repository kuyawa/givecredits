//Anchain URL to retrieve risk score on r-address
const ANCHAIN_URL = 'https://bei.anchainai.com/api/address_risk_score';
//KYC URL to complete KYC with GlobalID
const COMPLETE_KYC_URL = 'https://app.global.id/app';
//Anchain lowrisk response message
const ANCHAIN_RESPONSE_LOWRISK = 'This wallet indicates a low risk. No unusual activity exists beyond the normal concern for known hacking activities, known viruses, or other malicious activity.';
//Anchain medium response message
const ANCHAIN_RESPONSE_MEDIUMRISK = 'This wallet indicates a general risk of illicit activity. The potential exists for malicious cyber activities, but no such activities or known exploits have been identified and no significant impact has occurred.';
//Anchain elevated risk response message
const ANCHAIN_RESPONSE_ELEVATEDRISK = 'This wallet indicates an elevated risk due to increased hacking, criminal, or other malicious cyber activity.';
//Anchain highrisk response message
const ANCHAIN_RESPONSE_HIGHRISK = 'This wallet indicates an established history of past illicit activity and cybercrime engagement.';
//Anchain riscscore currency used in anchain url as query parameter
const ANCHAIN_RISKSCORE_CURRENCY = 'xlm';
//Currently this value is hardcoded but we'll get wallet id from iron-session

export {
  ANCHAIN_URL,
  COMPLETE_KYC_URL,
  ANCHAIN_RESPONSE_LOWRISK,
  ANCHAIN_RESPONSE_MEDIUMRISK,
  ANCHAIN_RESPONSE_HIGHRISK,
  ANCHAIN_RISKSCORE_CURRENCY,
  ANCHAIN_RESPONSE_ELEVATEDRISK
};
