use anchor_lang::prelude::*;

use crate::states::{user::{User, Role}, certification::Certification};
use crate::error::ErrorCode;

pub fn submit_certification(
    ctx: Context<SubmitCertification>,
    certification_ids: Vec<String>, // IDs or links to certifications
) -> Result<()> {
    let certification = &mut ctx.accounts.certification;

    // Ensure the apprentice is submitting their own certification
    require!(ctx.accounts.user.role == Role::Apprentice, ErrorCode::UnauthorizedRoleApprentice);

    // Store the certifications
    certification.apprentice = ctx.accounts.user.key();
    certification.certifications = certification_ids;
    certification.approved = false; // Initially not approved

    Ok(())
}

pub fn approve_certification(ctx: Context<ApproveCertification>) -> Result<()> {
    let certification = &mut ctx.accounts.certification;
    let user = &mut ctx.accounts.user;

    // Ensure only a mentor or admin can approve certifications
    require!(ctx.accounts.approver.role == Role::Mentor, ErrorCode::UnauthorizedRole);

    // Mark the certification as approved
    certification.approved = true;

    // Promote the apprentice to mentor
    user.role = Role::Mentor;

    Ok(())
}



#[derive(Accounts)]
pub struct SubmitCertification<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + Certification::LEN,
        seeds = [b"certification", user.key().as_ref()],
        bump,
    )]
    pub certification: Account<'info, Certification>,
    #[account(mut)]
    pub user: Account<'info, User>, // Apprentice submitting certification
    #[account(mut)]
    pub payer: Signer<'info>,       // Payer of the transaction
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct ApproveCertification<'info> {
    #[account(mut)]
    pub certification: Account<'info, Certification>,
    #[account(mut)]
    pub user: Account<'info, User>, // Apprentice being promoted
    #[account()]
    pub approver: Account<'info, User>, // Mentor or admin approving the certification
}

