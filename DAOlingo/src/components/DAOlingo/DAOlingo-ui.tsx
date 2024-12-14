'use client'

import { Keypair, PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'
import { ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useDAOlingoProgram, useDAOlingoProgramAccount } from './DAOlingo-data-access'
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export function DAOlingoCreate() {
  const { CreateProposal } = useDAOlingoProgram();
  const { publicKey } = useWallet();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expiration, setExpiration] = useState(BigInt(Date.now()));

  const isFormValid = title.trim() !== "" && description.trim() !== "";

  const handleSubmit = () => {
    if (publicKey && isFormValid) {
      CreateProposal.mutateAsync({ title, description, expiration });
    }
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedDate = new Date(e.target.value).getTime();
    setExpiration(BigInt(selectedDate));
  };

  if (!publicKey) {
    return <p>Connect your wallet</p>;
  }

  return (
    <div>
      <input
        type = "text"
        placeholder = "Title"
        value = {title}
        onChange = {(e) => setTitle(e.target.value)}
        className = "input input-bordered w-full max-w-xs"
      />
      <input
        type="datetime-local"
        onChange={handleExpirationChange}
        className="input input-bordered w-full max-w-xs"
      />
      <textarea
        placeholder = "Description"
        value = {description}
        onChange = {(e) => setDescription(e.target.value)}
        className = "textarea textarea-bordered w-full max-w-xs"
      />
      <br></br>
      <button
        onClick = {handleSubmit}
        disabled = {CreateProposal.isPending || !isFormValid}
        className = "btn btn-xs lg:btn-md btn-primary"
      >
        Create Proposal {CreateProposal.isPending && <span className="loading loading-sm"></span>}
      </button>
    </div>
  )
}

export function DAOlingoList() {
  const { accounts, getProgramAccount } = useDAOlingoProgram()

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>Program account not found. Make sure you have deployed the program and are on the correct cluster.</span>
      </div>
    )
  }
  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {accounts.data?.map((account) => (
            <DAOlingoCard key={account.publicKey.toString()} account={account.publicKey} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </div>
  )
}

function DAOlingoCard({ account }: { account: PublicKey }) {
  const { accountQuery, CastVote } = useDAOlingoProgramAccount({
    account,
  })

  const { publicKey } = useWallet()
  const [vote, setVote] = useState(false)
  const title = accountQuery.data?.title
  const description = accountQuery.data?.description
  const expiration = new Date(Number(accountQuery.data?.expiration) * 1000).toLocaleString(); // Format expiration date
  const votedFor = accountQuery.data?.votedFor || 0;
  const votedAgainst = accountQuery.data?.votedAgainst || 0;

  const isFormValid = !accountQuery.isLoading && !accountQuery.isError;

  const handleSubmit = () => {
    if (publicKey && isFormValid) {
      CastVote.mutateAsync({ vote });
    }
  };

  if (!publicKey){
    return <p>Connect your wallet</p>;
  }

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content w-full max-w-lg mx-auto">
      <div className="card-body items-center text-center space-y-4">
        {/* Title */}
        <h2
          className="card-title text-3xl cursor-pointer"
          onClick={() => accountQuery.refetch()}
        >
          {title}
        </h2>

        {/* Description */}
        <p className="text-base">{description}</p>

        {/* Details */}
        <div className="bg-base-200 p-4 rounded-lg shadow-md w-full">
          <h3 className="text-lg font-bold mb-2">Proposal Details</h3>
          <ul className="list-disc list-inside text-left">
            <li>
              <span className="font-semibold">Expiration:</span> {expiration}
            </li>
            <li>
              <span className="font-semibold">Votes For:</span> {votedFor.toString()}
            </li>
            <li>
              <span className="font-semibold">Votes Against:</span> {votedAgainst.toString()}
            </li>
          </ul>
        </div>

        {/* Voting Buttons */}
        <div className="card-actions justify-around mt-4">
          <button
            className="btn btn-xs lg:btn-md btn-outline"
            onClick={() => setVote(true)}
            disabled={CastVote.isPending}
          >
            Vote For
          </button>
          <button
            className="btn btn-xs lg:btn-md btn-outline"
            onClick={() => setVote(false)}
            disabled={CastVote.isPending}
          >
            Vote Against
          </button>
          <button
            className="btn btn-xs lg:btn-md btn-primary"
            onClick={handleSubmit}
            disabled={CastVote.isPending || !isFormValid}
          >
            Submit Vote {CastVote.isPending && <span className="loading loading-sm"></span>}
          </button>
        </div>

        {/* Explorer Link */}
        <p className="mt-4">
          <ExplorerLink path={`account/${account}`} label={ellipsify(account.toString())} />
        </p>
      </div>
    </div>
  )
}
