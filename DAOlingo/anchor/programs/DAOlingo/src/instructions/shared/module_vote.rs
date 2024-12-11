use anchor_lang::prelude::*;

use crate::states::module::{Module, MVoterInfo};
use crate::error::ErrorCode;

pub fn vote_module(ctx: Context<VoteModule>, vote_for: bool) -> Result<()> {
    let module = &mut ctx.accounts.module;
    let mvoter_info = &mut ctx.accounts.mvoter_info; // module voter info

    // Ensure the voter hasn't already voted
    require!(!mvoter_info.voted, ErrorCode::AlreadyVoted);

    // Update vote counts based on user's choice
    if vote_for {
        module.upvotes += 1;
    } else {
        module.downvotes += 1;
    }

    // Mark the voter as having voted
    mvoter_info.voted = true;
    Ok(())
}

#[derive(Accounts)]
pub struct VoteModule<'info> {
    #[account(mut)]
    pub module: Account<'info, Module>, // The module being voted on

    #[account(
        init,
        payer = voter,
        space = 8 + MVoterInfo::LEN,
        seeds = [b"mvoter_info", module.key().as_ref(), voter.key().as_ref()],
        bump,
    )]
    pub mvoter_info: Account<'info, MVoterInfo>,  

    #[account(mut)]
    pub voter: Signer<'info>,

    pub system_program: Program<'info, System>,
}