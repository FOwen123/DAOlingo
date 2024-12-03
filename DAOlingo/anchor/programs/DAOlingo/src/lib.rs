#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod DAOlingo {
    use super::*;

  pub fn close(_ctx: Context<CloseDAOlingo>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.DAOlingo.count = ctx.accounts.DAOlingo.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.DAOlingo.count = ctx.accounts.DAOlingo.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeDAOlingo>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.DAOlingo.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeDAOlingo<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + DAOlingo::INIT_SPACE,
  payer = payer
  )]
  pub DAOlingo: Account<'info, DAOlingo>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseDAOlingo<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub DAOlingo: Account<'info, DAOlingo>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub DAOlingo: Account<'info, DAOlingo>,
}

#[account]
#[derive(InitSpace)]
pub struct DAOlingo {
  count: u8,
}
