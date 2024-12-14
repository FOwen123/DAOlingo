'use client'

import { getDAOlingoProgram, getDAOlingoProgramId, DAOlingoIDL } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'
import { BN } from "bn.js";

interface CreateProposalArgs {
  title: string;
  description: string;
  expiration: bigint;
}

export function useDAOlingoProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getDAOlingoProgramId(cluster.network as Cluster), [cluster])
  const program = getDAOlingoProgram(provider)

  const accounts = useQuery({
    queryKey: ['DAOlingo', 'all', { cluster }],
    queryFn: () => program.account.proposal.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const CreateProposal = useMutation<string, Error, CreateProposalArgs>({
    mutationKey: ["proposal", "create", { cluster }],
    mutationFn: async ({ title, description, expiration }) => {
      return program.methods.createProposal(title, description, new BN(expiration.toString())).rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      accounts.refetch();
    },
    onError: (error) => {
      toast.error("Error creating entry: ${error.message}");
    },
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    CreateProposal,
  }
}

export function useDAOlingoProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useDAOlingoProgram()

  const accountQuery = useQuery({
    queryKey: ['DAOlingo', 'fetch', { cluster, account }],
    queryFn: () => program.account.proposal.fetch(account),
  })

  const CastVote = useMutation<string, Error, { vote: boolean }>({
    mutationKey: ["proposal", "vote", { cluster }],
    mutationFn: async ({ vote }) => {
      return program.methods.castVote(vote).rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      accounts.refetch();
    },
    onError: (error) => {
      toast.error("Error creating entry: ${error.message}");
    },
  });

  return {
    accountQuery,
    CastVote,
  }
}
