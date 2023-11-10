#![cfg(test)]
extern crate std;

use crate::{contract::Credits, CreditsClient};
use soroban_sdk::{
  testutils::{Address as _, },
  Address, Env
};

fn create_contract<'a>(e: &Env, admin: &Address, initiative: u128, provider: &Address, vendor: &Address, bucket: i128, xlm: &Address) -> CreditsClient<'a> {
  let ctr = CreditsClient::new(e, &e.register_contract(None, Credits {}));
  ctr.initialize(admin, &initiative, provider, vendor, &bucket, xlm);
  ctr
}

#[test]
fn test_views() {
  let e = Env::default();
  e.mock_all_auths();

  let admin      = Address::random(&e);
  let bucket     = 200000000i128;
  let initiative = 31220920570639204721711120384u128;
  let provider   = Address::random(&e);
  let vendor     = Address::random(&e);
  let xlm        = Address::random(&e);
  let credit     = create_contract(&e, &admin, initiative, &provider, &vendor, bucket, &xlm);

  // Views should all pass
  assert_eq!(credit.getAdmin(), admin);
  assert_eq!(credit.getBalance(), 0);
  assert_eq!(credit.getBucket(), 200000000);
  assert_eq!(credit.getFees(), 10);
  assert_eq!(credit.getInitiative(), initiative);
  assert_eq!(credit.getMinimum(), 10000000);
  assert_eq!(credit.getProvider(), provider);
  assert_eq!(credit.getProviderFees(), 80);
  assert_eq!(credit.getTreasury(), admin);
  assert_eq!(credit.getVendor(), vendor);
  assert_eq!(credit.getVendorFees(), 10);
  assert_eq!(credit.getXLM(), xlm);
}

// FAIL
/*
#[test]
fn test_donate() {
  let e = Env::default();
  e.mock_all_auths();

  let admin      = Address::random(&e);
  let bucket     = 200000000i128;
  let donor      = Address::random(&e);
  let initiative = 31220920570639204721711120384u128;
  let provider   = Address::random(&e);
  let vendor     = Address::random(&e);
  let xlm        = Address::random(&e);
  let credit     = create_contract(&e, &admin, initiative, &provider, &vendor, bucket, &xlm);

  // Donate
  credit.donate(&donor, &100000000);
  assert_eq!(credit.getBalance(), 80000000); // amount - fees
}
*/