#![allow(clippy::result_large_err)]
#![allow(unexpected_cfgs)] // Suppress cfg warnings

use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::Clock;

use crate::states::proposal::{Proposal, Dao, VoterInfo};
use crate::error::ErrorCode;    

pub fn create_proposal(
    ctx: Context<CreateProposal>, 
    description: String,
    expiration: i64,
    proposal_number: u64, // New parameter
) -> Result<()> {
    // Enforce maximum length for description
    require!(description.len() <= 280, ErrorCode::DescriptionTooLong);

    let dao = &mut ctx.accounts.dao;

    // Ensure the proposal_number is correct
    require!(
        proposal_number == dao.total_proposals + 1,
        ErrorCode::InvalidProposalNumber
    );

    // Generate the title as "Vote #<proposal_number>"
    let title = format!("Vote #{}", proposal_number);

    // Initialize the proposal account
    let proposal = &mut ctx.accounts.proposal;
    proposal.user = ctx.accounts.user.key();
    proposal.description = description;
    proposal.title = title;
    proposal.expiration = expiration;
    proposal.vote_number = proposal_number;
    proposal.voted_for = 0;
    proposal.voted_against = 0;

    // Update dao.total_proposals
    dao.total_proposals = proposal_number;

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
    #[account(
        init, // Initialize DAO only if it doesn't exist
        seeds = [b"dao"],
        bump,
        payer = user,
        space = 8 + Dao::LEN,
    )]
    pub dao: Account<'info, Dao>,

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