use anchor_lang::prelude::*;

#[account]
pub struct User{
    pub key: Pubkey, // Public key of the user
    pub role: Role, 
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum Role{
    Mentor, 
    Apprentice,
}

impl User{
    pub const LEN: usize = 32 + 1; // Pubkey (32 bytes) + Role enum (1 byte)
}

