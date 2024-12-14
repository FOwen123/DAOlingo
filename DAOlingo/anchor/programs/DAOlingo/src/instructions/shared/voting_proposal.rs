#![allow(clippy::result_large_err)]
#![allow(unexpected_cfgs)] // Suppress cfg warnings

use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::Clock;

use crate::states::proposal::{Proposal, VoterInfo};
use crate::error::ErrorCode;    

pub fn create_proposal(
    ctx: Context<CreateProposal>, 
    title: String,
    description: String,
    expiration: i64, // New parameter
) -> Result<()> {
    require!(title.len() <= 50, ErrorCode::TitleTooLong);
    // Enforce maximum length for description
    require!(description.len() <= 280, ErrorCode::DescriptionTooLong);

    // Initialize the proposal account
    let proposal = &mut ctx.accounts.proposal;
    proposal.user = ctx.accounts.user.key();
    proposal.title = title;
    proposal.description = description;
    proposal.expiration = expiration;
    proposal.voted_for = 0;
    proposal.voted_against = 0;

    Ok(())
}


pub fn cast_vote(ctx: Context<CastVote>, vote_for: bool) -> Result<()> {
    let proposal = &mut ctx.accounts.proposal;
    let voter_info = &mut ctx.accounts.voter_info;

    // Ensure the proposal hasn't expired
    require!(
        Clock::get()?.unix_timestamp < proposal.expiration,
        ErrorCode::ProposalExpired
    );

    // Ensure the voter hasn't already voted
    require!(!voter_info.voted, ErrorCode::AlreadyVoted);

    // Update vote counts based on user's choice
    if vote_for {
        proposal.voted_for += 1;
    } else {
        proposal.voted_against += 1;
    }

    // Mark the voter as having voted
    voter_info.voted = true;
    Ok(())
}


pub fn status(ctx: Context<Status>) -> Result<()> {
    let proposal = &ctx.accounts.proposal;

    if proposal.voted_for >= 15 {
        msg!("Passed!");
    } else {
        msg!("Not yet passed!");
    }

    Ok(())
}


pub fn results(ctx: Context<Results>) -> Result<()> {
    let proposal = &ctx.accounts.proposal;

    msg!("Votes for: {}", proposal.voted_for);
    msg!("Votes against: {}", proposal.voted_against);

    Ok(())
}



#[derive(Accounts)]
pub struct CreateProposal<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space = 8 + Proposal::LEN,
        seeds = [b"proposal".as_ref()],
        bump,
    )]
    pub proposal: Account<'info, Proposal>,

    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct CastVote<'info> {
    #[account(mut)]
    pub proposal: Account<'info, Proposal>,

    #[account(
        init,
        payer = voter,
        space = 8 + VoterInfo::LEN,
        seeds = [b"voter_info", proposal.key().as_ref(), voter.key().as_ref()],
        bump,
    )]
    pub voter_info: Account<'info, VoterInfo>,  

    #[account(mut)]
    pub voter: Signer<'info>,

    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct Status<'info> {
    pub proposal: Account<'info, Proposal>,
}


#[derive(Accounts)]
pub struct Results<'info> {
    pub proposal: Account<'info, Proposal>,
}