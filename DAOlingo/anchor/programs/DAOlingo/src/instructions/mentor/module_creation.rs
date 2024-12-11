use anchor_lang::prelude::*;

use crate::states::{user::{User, Role}, module::Module};
use crate::error::ErrorCode;    

pub fn create_module(
    ctx: Context<CreateModule>,
    title: String, 
    description: String, 
    video_url: String,
) -> Result<()> {
    let user = &ctx.accounts.user;
    let module = &mut ctx.accounts.module;

    // Ensure only mentors can create modules
    require!(user.role == Role::Mentor, ErrorCode::UnauthorizedRole);

    module.creator = user.key();
    module.title = title; // Clone the title to use in seeds
    module.description = description;
    module.video_url = video_url;
    module.upvotes = 0;
    module.downvotes = 0;

    Ok(())
}

#[derive(Accounts)]
pub struct CreateModule<'info>{
    #[account(mut)]
    pub user: Account<'info, User>, // The mentor creating the module
    #[account(
        init, 
        payer = user, 
        space = 8 + Module::LEN,
        seeds = [b"module", user.key().as_ref()],
        bump,
    )]
    pub module: Account<'info, Module>, // The new module being created
    #[account(mut)]
    pub payer: Signer<'info>, // Payer of the transaction (mentor)
    pub system_program: Program<'info, System>,
}