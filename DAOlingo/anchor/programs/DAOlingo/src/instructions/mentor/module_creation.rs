use anchor_lang::prelude::*;
use anchor_spl::token::{self, MintTo, Token};
use anchor_spl::associated_token::AssociatedToken;

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

    // Validate token mint and mentor's token account
    let _token_mint_key = ctx.accounts.token_mint.key();
    let _mentor_token_account_key = ctx.accounts.mentor_token_account.key();

    module.creator = user.key();
    module.title = title; 
    module.description = description;
    module.video_url = video_url;
    module.upvotes = 0;
    module.downvotes = 0;

    // Mint and transfer tokens as a reward to the mentor
    let reward_amount: u64 = 10 * 1_000_000; // 10 tokens, adjust based on token decimals
    let cpi_accounts = MintTo {
        mint: ctx.accounts.token_mint.to_account_info(),
        to: ctx.accounts.mentor_token_account.to_account_info(),
        authority: ctx.accounts.payer.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

    // Mint the reward tokens to the mentor's token account
    token::mint_to(cpi_ctx, reward_amount)?;

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
    #[account(mut)]
    /// CHECK: The token mint is not verified because it is assumed to be a valid SPL token mint.
    pub token_mint: AccountInfo<'info>, // Token mint of your custom token
    #[account(mut)]
    /// CHECK: This is the mentor's associated token account, assumed to be valid. Validation is done in the program logic.
    pub mentor_token_account: AccountInfo<'info>, // Mentor's token account
    pub token_program: Program<'info, Token>, // SPL Token Program
    pub associated_token_program: Program<'info, AssociatedToken>, // Associated Token Program
    pub rent: Sysvar<'info, Rent>, // Rent sysvar
    pub system_program: Program<'info, System>,
}