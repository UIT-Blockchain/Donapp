use crate::*;

pub(crate) fn assert_one_yocto() {
    assert_eq!(
        env::attached_deposit(),
        1,
        "Requiring attached deposit of EXACTLY 1 yoctoNear"
    );
}

impl Donap {
    pub(crate) fn internal_transfer(&mut self) {}
}
