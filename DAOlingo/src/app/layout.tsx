import './globals.css'
import {ClusterProvider} from '@/components/cluster/cluster-data-access'
import {SolanaProvider} from '@/components/solana/solana-provider'
import {UiLayout} from '@/components/ui/ui-layout'
import {ReactQueryProvider} from './react-query-provider'

export const metadata = {
  title: 'DAOlingo',
  description: 'Generated by create-solana-dapp',
}

const links: { label: string; path: string }[] = [
  { label: 'Vote', path: '/voting' },
  { label: 'Create a Proposal', path: '/createproposal' },
  { label: 'DAOlingo Program', path: '/DAOlingo' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <UiLayout links = {links}> {children}</UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}

