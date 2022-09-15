use crate::*;

pub(crate) fn assert_one_yocto() {
    assert_eq!(
        env::attached_deposit(),
        1,
        "Requiring attached deposit of EXACTLY 1 yoctoNear"
    );
}

pub(crate) fn random_number() -> u64 {
    0
}

impl Donap {
    pub(crate) fn internal_transfer(
        &mut self,
        streamer_id: AccountId,
        money: Balance,
        lucky_voter: AccountId,
    ) {
    }
}
