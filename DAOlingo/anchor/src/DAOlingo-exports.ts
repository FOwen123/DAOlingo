// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import DAOlingoIDL from '../target/idl/DAOlingo.json'
import type { DAOlingo } from '../target/types/DAOlingo'

// Re-export the generated IDL and type
export { DAOlingo, DAOlingoIDL }

// The programId is imported from the program IDL.
export const D_AOLINGO_PROGRAM_ID = new PublicKey(DAOlingoIDL.address)

// This is a helper function to get the DAOlingo Anchor program.
export function getDAOlingoProgram(provider: AnchorProvider) {
  return new Program(DAOlingoIDL as DAOlingo, provider)
}

// This is a helper function to get the program ID for the DAOlingo program depending on the cluster.
export function getDAOlingoProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the DAOlingo program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return D_AOLINGO_PROGRAM_ID
  }
}
