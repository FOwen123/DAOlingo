'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useDAOlingoProgram } from './DAOlingo-data-access'
import { DAOlingoCreate, DAOlingoList } from './DAOlingo-ui'

export default function DAOlingoFeature() {
  const { publicKey } = useWallet()
  const { programId } = useDAOlingoProgram()

  return publicKey ? (
    <div>
      <AppHero
        title="DAOlingo"
        subtitle={
          'Create a new proposal by clicking the "Create Proposal" button.'
        }
      >
        <p className="mb-6">
          <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <DAOlingoCreate />
      </AppHero>
      <DAOlingoList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
