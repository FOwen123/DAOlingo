use anchor_lang::prelude::*;

use crate::states::user::{User, Role};

pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
    let user = &mut ctx.accounts.user;

    user.key = *ctx.accounts.signer.key;
    user.role = Role::Apprentice;

    Ok(())
}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init, 
        payer = user, 
        space = 8 + User::LEN,
        seeds = [b"user", signer.key().as_ref()],
        bump,
    )]
    pub user: Account<'info, User>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}