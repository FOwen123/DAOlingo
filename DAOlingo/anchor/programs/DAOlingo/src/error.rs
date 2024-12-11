use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Description too long")]
    DescriptionTooLong,
    #[msg("The proposal has already expired.")]
    ProposalExpired,
    #[msg("The voter has already cast a vote.")]
    AlreadyVoted,
    #[msg("Invalid proposal number.")]
    InvalidProposalNumber,
}