use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Title too long")]
    TitleTooLong,
    #[msg("Description too long")]
    DescriptionTooLong,
    #[msg("The proposal has already expired.")]
    ProposalExpired,
    #[msg("The voter has already cast a vote.")]
    AlreadyVoted,
    #[msg("Invalid proposal number.")]
    InvalidProposalNumber,
    #[msg("Unauthorized: Only mentors can perform this action.")]
    UnauthorizedRole,
    #[msg("Unauthorized: Only apprentices can submit certifications.")]
    UnauthorizedRoleApprentice,
    #[msg("Unauthorized: Only mentors can approve certifications.")]
    UnauthorizedApproval,
    #[msg("Certification is already approved.")]
    CertificationAlreadyApproved,
}