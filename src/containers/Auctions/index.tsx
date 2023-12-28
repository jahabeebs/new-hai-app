import { useEffect, useLayoutEffect, useState } from 'react'

import { usePublicGeb } from '~/hooks'
import { useStoreActions, useStoreState } from '~/store'
import { AuctionsList } from './AuctionsList'

export function Auctions() {
    const geb = usePublicGeb()
    
    const {
        auctionModel: { auctionsData },
        connectWalletModel: {
            proxyAddress,
            tokensData,
        },
    } = useStoreState(state => state)
    const { auctionModel: auctionsActions } = useStoreActions(actions => actions)
    
    const [isLoading, setIsLoading] = useState(false)

    // to avoid lag, don't fetch auctions until first render completes
    useLayoutEffect(() => {
        if (!geb) return

        const symbols = Object.values(tokensData || {})
            .filter(({ isCollateral }) => isCollateral)
            .map(({ symbol }) => symbol)
        
        async function fetchAuctions() {
            setIsLoading(true)
            try {
                await Promise.all([
                    ...symbols.map(symbol => (
                        auctionsActions.fetchAuctions({
                            geb,
                            type: 'COLLATERAL',
                            tokenSymbol: symbol,
                        })
                    )),
                    auctionsActions.fetchAuctions({
                        geb,
                        type: 'DEBT',
                    }),
                    auctionsActions.fetchAuctions({
                        geb,
                        type: 'SURPLUS',
                    }),
                ])
                // setError('')
                setIsLoading(false)
            } catch (error) {
                console.error(error)
                // if (error instanceof SyntaxError && error.message.includes('failed')) {
                //     setError('Failed to fetch auctions from the graph node')
                // }
            }
        }
        fetchAuctions()
    }, [auctionsActions.fetchAuctions, geb, tokensData])

    useEffect(() => {
        if (!geb || !proxyAddress || auctionsData) return

        auctionsActions.fetchAuctionsData({ geb, proxyAddress })
    }, [auctionsActions, geb, proxyAddress, auctionsData])

    return (
        <AuctionsList isLoading={isLoading}/>
    )
}
