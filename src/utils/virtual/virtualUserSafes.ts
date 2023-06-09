import { BigNumber, ethers } from 'ethers';
import { Geb, utils } from '@hai-on-op/sdk';
import {bytecode} from '../../artifacts/contracts/VirtualUserSafes.sol/VirtualUserSafes.json';
import { TOKENS } from '../tokens';

interface SafeData {
  addy: string;
  id: BigNumber;
  lockedCollateral: BigNumber;
  generatedDebt: BigNumber;
  collateralType: string;
}

export async function fetchUserSafes(geb: Geb, userAddress: string): Promise<[BigNumber, SafeData[]]> {
  // Encoded input data to be sent to the batch contract constructor
  const inputData = ethers.utils.defaultAbiCoder.encode(
    ['address', 'address', 'address', 'address', 'address', 'address'],
    [TOKENS.HAI.address, geb.contracts.proxyRegistry.address, geb.contracts.getSafes.address, geb.contracts.safeEngine.address, geb.contracts.safeManager.address, userAddress]
  );
  // Generate payload from input data
  const payload = bytecode.concat(inputData.slice(2));

  // Call the deployment transaction with the payload
  const returnedData = await geb.provider.call({ data: payload });

  // Parse the returned value to the struct type in order
  const decoded = ethers.utils.defaultAbiCoder.decode(
    [
      'uint256 coinBalance',
      'tuple(address addy, uint256 id, uint256 lockedCollateral, uint256 generatedDebt, bytes32 collateralType)[]'
    ],
    returnedData
  ) as [BigNumber, SafeData[]];

  return decoded;
}