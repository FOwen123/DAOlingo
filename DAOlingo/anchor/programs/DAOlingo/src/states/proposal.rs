use anchor_lang::prelude::*;

#[account]
pub struct Proposal {
    pub user: Pubkey,
    pub title: String,
    pub description: String,
    pub expiration: i64,
    pub voted_for: u64,
    pub voted_against: u64,
}

impl Proposal {
    pub const LEN: usize = 32        // user: Pubkey
        + 4 + 20                     // title: String (max 20 bytes including length prefix)
        + 4 + 280                    // description: String (max 280 bytes including length prefix)
        + 8                          // expiration: i64
        + 8                          // voted_for: u64
        + 8;                         // voted_against: u64
}

#[account]
pub struct Dao {
    pub total_proposals: u64,
}

impl Dao {
    pub const LEN: usize = 8; // Size of total_proposals (u64)
}

#[account]
pub struct VoterInfo {
    pub voted: bool,
}

impl VoterInfo {
    pub const LEN: usize = 1; // Size of the voted field (bool)
}