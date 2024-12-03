import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {DAOlingo} from '../target/types/DAOlingo'

describe('DAOlingo', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.DAOlingo as Program<DAOlingo>

  const DAOlingoKeypair = Keypair.generate()

  it('Initialize DAOlingo', async () => {
    await program.methods
      .initialize()
      .accounts({
        DAOlingo: DAOlingoKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([DAOlingoKeypair])
      .rpc()

    const currentCount = await program.account.DAOlingo.fetch(DAOlingoKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment DAOlingo', async () => {
    await program.methods.increment().accounts({ DAOlingo: DAOlingoKeypair.publicKey }).rpc()

    const currentCount = await program.account.DAOlingo.fetch(DAOlingoKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment DAOlingo Again', async () => {
    await program.methods.increment().accounts({ DAOlingo: DAOlingoKeypair.publicKey }).rpc()

    const currentCount = await program.account.DAOlingo.fetch(DAOlingoKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement DAOlingo', async () => {
    await program.methods.decrement().accounts({ DAOlingo: DAOlingoKeypair.publicKey }).rpc()

    const currentCount = await program.account.DAOlingo.fetch(DAOlingoKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set DAOlingo value', async () => {
    await program.methods.set(42).accounts({ DAOlingo: DAOlingoKeypair.publicKey }).rpc()

    const currentCount = await program.account.DAOlingo.fetch(DAOlingoKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the DAOlingo account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        DAOlingo: DAOlingoKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.DAOlingo.fetchNullable(DAOlingoKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
