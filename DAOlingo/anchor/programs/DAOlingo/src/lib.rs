#![allow(clippy::result_large_err)]
#![allow(unexpected_cfgs)] // Suppress cfg warnings

use anchor_lang::prelude::*;

declare_id!("3sxbp3FudD9sjCtDvUgmpf9P3ENJd3LdsWLo196XW8CL");

pub mod states;
pub mod instructions;
pub mod error;

use instructions::mentor::*;
use instructions::apprentice::*;
use instructions::shared::*;

#[program]
pub mod daolingo {
    use super::*;

    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        instructions::shared::user_initialization::initialize_user(ctx)
    }
    
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

    pub fn create_module(ctx: Context<CreateModule>, title: String, description: String, video_url: String) -> Result<()> {
        instructions::mentor::module_creation::create_module(ctx, title, description, video_url)
    }

    pub fn vote_module(ctx: Context<VoteModule>, vote_for: bool) -> Result<()> {
        instructions::shared::module_vote::vote_module(ctx, vote_for)
    }

    pub fn submit_certification(ctx: Context<SubmitCertification>, certification_ids: Vec<String>,) -> Result<()> {
        instructions::shared::certification::submit_certification(ctx, certification_ids)
    }

    pub fn approve_certification(ctx: Context<ApproveCertification>) -> Result<()> {
        instructions::shared::certification::approve_certification(ctx)
    }

    pub fn complete_module(ctx: Context<CompleteModule>, module_pubkey: Pubkey) -> Result<()> {
        instructions::apprentice::progress_tracking::complete_module(ctx, module_pubkey)
    }   
}



