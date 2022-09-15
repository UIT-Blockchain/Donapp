use near_sdk::Promise;

use crate::*;

pub(crate) fn assert_one_yocto() {
    assert_eq!(
        env::attached_deposit(),
        1,
        "Requiring attached deposit of EXACTLY 1 yoctoNear"
    );
}

pub(crate) fn random_number(num_of_voters: u64) -> u64 {
    env::block_timestamp() % num_of_voters
}

impl Donap {
    pub(crate) fn internal_transfer(
        &mut self,
        streamer_id: AccountId,
        money: Balance,
        lucky_voter: AccountId,
    ) {
        let money_of_streamer = money * 95 / 100;
        let money_of_voter = money - money_of_streamer;

        Promise::new(streamer_id)
            .transfer(money_of_streamer)
            .and(Promise::new(lucky_voter).transfer(money_of_voter));
    }
}
