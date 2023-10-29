use crate::storage_types::DataKey;
use soroban_sdk::{Address, BytesN, Env};

fn zero_address(e: &Env) -> Address {
  Address::from_contract_id(&BytesN::from_array(e, &[0u8; 32]))
}

pub fn read_operator(e: &Env, owner: Address) -> Address {
  let key = DataKey::Operator(owner);
  let val = e.storage().instance().get(&key);
  match val {
    Some(operator) => operator,
    None => zero_address(&e)
  }
}

pub fn write_operator(e: &Env, owner: Address, operator: Address) {
  let key = DataKey::Operator(owner);
  e.storage().instance().set(&key, &operator);
}

pub fn check_operator(e: &Env, operator: Address, owner: Address) {
  assert!(operator == read_operator(e, owner), "operator not approved");
}

pub fn clear_operator(e: &Env, owner: Address) {
  let key = DataKey::Operator(owner);
  e.storage().instance().set(&key, &zero_address(&e));
}
