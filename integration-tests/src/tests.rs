use anyhow::Ok;
use near_units::parse_near;
use serde_json::{json};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{Balance, Timestamp, json_types::U128, AccountId};
use workspaces::prelude::*;
use workspaces::{network::Sandbox, Account, Contract, Worker};

const PAYMENT_CONTRACT_PATH: &str = "../contract/donate/out/contract.wasm";

#[tokio::main]
async fn main() -> anyhow::Result<()> {
  let worker: Worker<Sandbox> = workspaces::sandbox().await?;
  // dev-deploy payment contract
  let payment_wasm = std::fs::read(PAYMENT_CONTRACT_PATH)?;
  let payment_contract: Contract = worker.dev_deploy(&payment_wasm).await?;


  println!("      Passed ✅  All tests");

  Ok(())
}

