import { Strategy } from '~/types'
import { LINK_TO_DOCS } from '~/utils'

import styled from 'styled-components'
import { CenteredFlex, Flex, HaiButton, Text } from '~/styles'
import { HaiFace } from '~/components/Icons/HaiFace'
import { Link } from '~/components/Link'

import uniswapLogo from '~/assets/uniswap-icon.svg'
import velodromeLogo from '~/assets/velodrome-img.svg'

const platformMap: Record<
    string,
    {
        logo?: string
        size?: number
        link: string
    }
> = {
    uniswap: {
        logo: uniswapLogo,
        size: 28,
        link: LINK_TO_DOCS,
    },
    velodrome: {
        logo: velodromeLogo,
        size: 20,
        link: LINK_TO_DOCS,
    },
    hai: {
        logo: undefined,
        link: '/vaults',
    },
}

type Props = Pick<Strategy, 'earnPlatform'>
export function StrategyTableButton({ earnPlatform }: Props) {
    const { logo, size, link } = platformMap[earnPlatform || 'hai']

    return (
        <Link href={link} $width="100%" $textDecoration="none">
            <Button earnPlatform={earnPlatform} logo={logo} size={size} />
        </Link>
    )
}

type ButtonProps = Props & {
    size?: number
    logo?: string
}
function Button({ earnPlatform, size, logo }: ButtonProps) {
    return (
        <EarnButton $width="100%" $justify="space-between" $align="center">
            <CenteredFlex $gap={4}>Earn on</CenteredFlex>
            <Flex $justify="flex-start" $align="center" $gap={earnPlatform === 'uniswap' ? 4 : 12}>
                {logo ? (
                    <img src={logo} alt="" width={size} height={size} />
                ) : (
                    <HaiFace size={28} filled style={{ marginLeft: '-4px' }} />
                )}
                <Text $fontSize="0.9em">{(earnPlatform || 'HAI').toUpperCase()}</Text>
            </Flex>
        </EarnButton>
    )
}

const EarnButton = styled(HaiButton)`
    height: 48px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    padding-left: 16px;
    padding-right: 6px;
    font-size: 0.8rem;

    & > *:nth-child(2) {
        background-color: white;
        border-radius: 999px;
        padding: 4px 12px;
        padding-right: 16px;
        width: 100%;
        height: 36px;
    }
`
