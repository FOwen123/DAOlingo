#![allow(clippy::result_large_err)]
#![allow(unexpected_cfgs)] // Suppress cfg warnings

use anchor_lang::prelude::*;

declare_id!("3sxbp3FudD9sjCtDvUgmpf9P3ENJd3LdsWLo196XW8CL");

pub mod states;
pub mod instructions;
pub mod error;

// use instructions::mentor::*;
// use instructions::apprentice::*;
use instructions::shared::*;

#[program]
pub mod daolingo {
    use super::*;

    pub fn create_proposal(ctx: Context<CreateProposal>, description: String, expiration: i64, proposal_number: u64) -> Result<()> {
        instructions::shared::voting_proposal::create_proposal(ctx, description, expiration, proposal_number)
    }

    pub fn cast_vote(ctx: Context<CastVote>, vote_for: bool) -> Result<()> {
        instructions::shared::voting_proposal::cast_vote(ctx, vote_for)
    }

    pub fn status(ctx: Context<Status>) -> Result<()> {
        instructions::shared::voting_proposal::status(ctx)
    }

    pub fn results(ctx: Context<Results>) -> Result<()> {
        instructions::shared::voting_proposal::results(ctx)
    }
}



