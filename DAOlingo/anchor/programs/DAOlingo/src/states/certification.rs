use anchor_lang::prelude::*;

#[account]
pub struct Certification {
    pub apprentice: Pubkey,      // Public key of the apprentice
    pub certifications: Vec<String>, // List of certification IDs or links (e.g., IPFS links)
    pub approved: bool,          // Whether the certifications have been approved
}

impl Certification {
    pub const LEN: usize = 32                 // apprentice: Pubkey
        + 4 + (32 * 10)                       // certifications: Vec<String> (max 10 items, 32 bytes each)
        + 1;                                  // approved: bool
}
