use anchor_lang::prelude::*;

#[account]
// No expiration unlike proposal
pub struct Module{
    pub creator: Pubkey,
    pub title: String, 
    pub description: String,
    pub video_url: String,
    pub upvotes: u64,
    pub downvotes: u64,
}

impl Module {
    pub const LEN: usize = 32        // creator: Pubkey
        + 4 + 20                     // title: String (max 20 bytes with prefix)
        + 4 + 280                    // description: String (max 280 bytes with prefix)
        + 4 + 2083                   // video_url: String (max 2083 bytes for a URL)
        + 8                          // upvotes: u64
        + 8;                         // downvotes: u64
}

#[account]
pub struct MVoterInfo { // Module Voter Info
    pub voted: bool,
}

impl MVoterInfo {
    pub const LEN: usize = 1; // Size of the voted field (bool)
}