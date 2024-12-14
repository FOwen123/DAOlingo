'use client'

import {getDAOlingoProgram, getDAOlingoProgramId} from '@project/anchor'
import {useConnection} from '@solana/wallet-adapter-react'
import {Cluster, Keypair, PublicKey} from '@solana/web3.js'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useMemo} from 'react'
import toast from 'react-hot-toast'
import {useCluster} from '../cluster/cluster-data-access'
import {useAnchorProvider} from '../solana/solana-provider'
import {useTransactionToast} from '../ui/ui-layout'

export function useDAOlingoProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getDAOlingoProgramId(cluster.network as Cluster), [cluster])
  const program = getDAOlingoProgram(provider)

  const accounts = useQuery({
    queryKey: ['DAOlingo', 'all', { cluster }],
    queryFn: () => program.account.DAOlingo.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['DAOlingo', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ DAOlingo: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useDAOlingoProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useDAOlingoProgram()

  const accountQuery = useQuery({
    queryKey: ['DAOlingo', 'fetch', { cluster, account }],
    queryFn: () => program.account.DAOlingo.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['DAOlingo', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ DAOlingo: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['DAOlingo', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ DAOlingo: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['DAOlingo', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ DAOlingo: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['DAOlingo', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ DAOlingo: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
