import { useStoreState } from '~/store'

import styled, { keyframes } from 'styled-components'
import Modal from './Modal'

import logo from '~/assets/logo192.png'

const LoadingModal = () => {
    const { popupsModel: popupsState } = useStoreState(state => state)

    return (
        <Modal
            width="350px"
            isModalOpen={popupsState.isLoadingModalOpen.isOpen}
            borderRadius="20px"
            handleModalContent
            showXButton
            backDropColor={'rgba(255,255,255)'}>
            <LoaderContainer>
                <img
                    src={logo}
                    alt={''}
                    width={192}
                    height={192}
                />
                {!!popupsState.isLoadingModalOpen.text && (
                    <Text>{popupsState.isLoadingModalOpen.text}</Text>
                )}
            </LoaderContainer>
        </Modal>
    )
}

export default LoadingModal

const zoom = keyframes`
    0% {
        transform: scale(1,1);
    }
    50% {
        transform: scale(1.2,1.2);
    }
    100% {
        transform: scale(1,1);
    }
`

const LoaderContainer = styled.div`
    text-align: center;
    img {
        display: block;
        width: 60px;
        margin: 0 auto;
        animation: ${zoom} 1.5s ease-in-out infinite;
        animation-fill-mode: both;
        ${({ theme }) => theme.mediaWidth.upToMedium`
            width: 40px;
        `}
    }
`

const Text = styled.div`
    font-size: ${({ theme }) => theme.font.small};
    margin-top: 20px;
`
