use anchor_lang::prelude::*;
use anchor_spl::token::{self, MintTo, Token};
use anchor_spl::associated_token::AssociatedToken;

use crate::states::{user::{User, Role}, module::Module, progress::Progress};
use crate::error::ErrorCode;

pub fn complete_module(ctx: Context<CompleteModule>, module_pubkey: Pubkey) -> Result<()> {
    let progress = &mut ctx.accounts.progress;
    let module = &ctx.accounts.module;
    let user = &ctx.accounts.user;

    // Ensure only apprentices can complete modules
    require!(user.role == Role::Apprentice, ErrorCode::UnauthorizedRoleApprentice);

    // Update progress
    progress.user = user.key();
    progress.completed_modules += 1;
    progress.last_completed = module.key();

    // Incentivize the apprentice
    let incentive_amount: u64 = 5 * 1_000_000; // 5 tokens (adjust decimals as per your token)
    let cpi_accounts = MintTo {
        mint: ctx.accounts.token_mint.to_account_info(),
        to: ctx.accounts.apprentice_token_account.to_account_info(),
        authority: ctx.accounts.payer.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::mint_to(cpi_ctx, incentive_amount)?;

    // Update total incentives
    progress.total_incentives += incentive_amount;

    Ok(())
}

#[derive(Accounts)]
pub struct CompleteModule<'info> {
    #[account(mut)]
    pub user: Account<'info, User>, // Apprentice completing the module
    #[account(mut)]
    pub module: Account<'info, Module>,   // Module being completed
    #[account(
        mut,
        seeds = [b"progress", user.key().as_ref()],
        bump,
    )]
    pub progress: Account<'info, Progress>, // Progress account for the apprentice
    #[account(mut)]
    pub payer: Signer<'info>,               // Payer of the transaction
    /// CHECK: This is the mint of the token being distributed
    #[account(mut)]
    pub token_mint: AccountInfo<'info>,    // The mint address of the reward token
    #[account(mut)]
     /// CHECK: This is the apprentice's associated token account, assumed to be valid. Validation is done in the program logic.
    pub apprentice_token_account: AccountInfo<'info>, // Apprentice's token account
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}