use anchor_lang::prelude::*;

#[account]
pub struct Progress {
    pub user: Pubkey,      // Public key of the apprentice
    pub completed_modules: u64,  // Number of modules completed
    pub last_completed: Pubkey,  // Public key of the last module completed
    pub total_incentives: u64,   // Total incentives received
}

impl Progress {
    pub const LEN: usize = 32        // apprentice: Pubkey
        + 8                          // completed_modules: u64
        + 32                         // last_completed: Pubkey
        + 8;                         // total_incentives: u64
}
