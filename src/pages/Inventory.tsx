import bs58 from 'bs58';
import { useEffect, useState } from 'react';
import { WALLET_NETWORK } from '../config';
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
import { useWallet } from '@solana/wallet-adapter-react';
import Button from '../components/Button/Button';
import LoadingScreenControls from '../components/LoadingScreen/LoadingScreenControls';
import { usePlanetConfig } from '../providers/planet_config_provider';
import { useNavigate } from "react-router-dom";
import LoadingScreenPlanet from '../components/LoadingScreen/LoadingScreenPlanet';


// const connection = new Connection(clusterApiUrl(WALLET_NETWORK));
// const MAX_NAME_LENGTH = 32;
// const MAX_URI_LENGTH = 200;
// const MAX_SYMBOL_LENGTH = 10;
// const MAX_CREATOR_LEN = 32 + 1 + 1;
// const MAX_CREATOR_LIMIT = 5;
// const MAX_DATA_SIZE = 4 + MAX_NAME_LENGTH + 4 + MAX_SYMBOL_LENGTH + 4 + MAX_URI_LENGTH + 2 + 1 + 4 + MAX_CREATOR_LIMIT * MAX_CREATOR_LEN;
// const MAX_METADATA_LEN = 1 + 32 + 32 + MAX_DATA_SIZE + 1 + 1 + 9 + 172;
// const CREATOR_ARRAY_START = 1 + 32 + 32 + 4 + MAX_NAME_LENGTH + 4 + MAX_URI_LENGTH + 4 + MAX_SYMBOL_LENGTH + 2 + 1 + 4;

// const TOKEN_METADATA_PROGRAM = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
const CANDY_MACHINE_V2_PROGRAM = new PublicKey('cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ');
const SHUTTLE_CREATOR = "Gw9TR8S1pripPSXCk8zvWVE42ddqa71ZFBNJZg8cJ1Qo";
// const candyMachineId = new PublicKey('5Bhg2dsiVYVEAejkp3Hvngw6m6W7TYRKDKKpSJsDfosg');

// const getMintAddresses = async (firstCreatorAddress: PublicKey) => {
//   const metadataAccounts = await connection.getProgramAccounts(
//       TOKEN_METADATA_PROGRAM,
//       {
//         // The mint address is located at byte 33 and lasts for 32 bytes.
//         dataSlice: { offset: 33, length: 32 },

//         filters: [
//           // Only get Metadata accounts.
//           { dataSize: MAX_METADATA_LEN },

//           // Filter using the first creator.
//           {
//             memcmp: {
//               offset: CREATOR_ARRAY_START,
//               bytes: firstCreatorAddress.toBase58(),
//             },
//           },
//         ],
//       },
//   );

//   return metadataAccounts.map((metadataAccountInfo) => (
//       bs58.encode(metadataAccountInfo.account.data)
//   ));
// };

const getCandyMachineCreator = async (candyMachine: PublicKey): Promise<[PublicKey, number]> => (
    PublicKey.findProgramAddress(
        [Buffer.from('candy_machine'), candyMachine.toBuffer()],
        CANDY_MACHINE_V2_PROGRAM,
    )
);

//check solana on window. This is useful to fetch address of your wallet.
// const getProvider = () => {
//   if ("solana" in window) {
//     // @ts-ignore
//     const provider = window.solana;
//     console.log(provider);
//     if (provider.isPhantom) {
//       return provider;
//    }
//   }
// };
//Function to get all NFT information.
//get NFT
const getAllNftData = async (publicKey: string) => {
  try {
      const connect =    createConnectionConfig(clusterApiUrl(WALLET_NETWORK));
      let ownerToken = publicKey;
      const result = isValidSolanaAddress(ownerToken);
      const nfts = await getParsedNftAccountsByOwner({
        publicAddress: ownerToken,
        connection: connect,
      });
      console.log(nfts);
      return nfts;
  } catch (error) {
    console.log(error);
  }
};

interface NFTEntity {
  uri: string;
  name: string;
  authority: string; // creator?
}

interface Shuttle extends NFTEntity {
  role: string; 
  type: string;
}
interface Planet extends NFTEntity  {
  seed: string;
  size: string;
  resourse_quantity: string; 
  skyType: string;
  resourceType: string;
}

function isPlanet(arg: any): arg is Planet {
  return arg.seed !== undefined;
}

interface ShuttleResult {
  loading: boolean;
  shuttles: NFTEntity[];
}

//Function to get all nft data
async function getNftTokenData(publicKey: string): Promise<NFTEntity[]> {
  try {
    const nftData = await getAllNftData(publicKey);
    console.log(nftData);
    const promises = nftData?.map(async (nft) => {
      const response = await fetch(nft.data.uri);
      const actualNft = await response.json();
      // console.log(actualNft);
      switch (actualNft.symbol) {
        case "SPLNT":
          return {
            name: actualNft.name,
            uri: actualNft.image,
            authority: nft.updateAuthority,
            seed: actualNft.attributes[0].value,
            size: actualNft.attributes[1].value,
            resourse_quantity: actualNft.attributes[2].value,
            skyType: actualNft.attributes[3].value,
            resourceType: actualNft.attributes[4].value,
          } as Planet;
        case "SSHTL":
          return {
            name: actualNft.name,
            uri: actualNft.image,
            authority: nft.updateAuthority,
            role: actualNft.attributes[0].value,
            type: actualNft.attributes[1].value,
          } as Shuttle;
        default: 
          return {
            name: actualNft.name,
            uri: actualNft.image,
            authority: nft.updateAuthority,
          };
      } 
    }) ?? [];
    const nfts = await Promise.all(promises);
    return nfts;
    // return [];
    // return nftData;
    // @ts-ignore
    // var data = Object.keys(nftData).map((key) => nftData[key]); 
    // return data;
    // let n = data.length;
    // for (let i = 0; i < n; i++) {
    // console.log(data[i].data.uri);
    // let val = await fetch(data[i].data.uri);
    // arr.push(val);
    // }
    // return arr;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const useShuttles = () => {
  const [shuttles, setShuttles] = useState<NFTEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const { publicKey } = useWallet();
  useEffect(() => {
    if (publicKey == null) {
      setShuttles([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    getNftTokenData(publicKey!.toString()).then(async (data) => {
      // console.log(data);
      // await getCandyMachineCreator(CANDY_MACHINE_V2_PROGRAM).then(creatorData => {
        // const creator = (creatorData[0].toString());
        // console.log('data')
        // console.log(data);
        // console.log(`creator: ${creator}`);
        const filtered = data.filter(nft => nft.authority == SHUTTLE_CREATOR);
        // console.log('filtered')
        // console.log(filtered);
        setShuttles(filtered);
        setLoading(false);
      // });
    })
  }, [publicKey]);
  return {shuttles, loading};
}


const Inventory = () => {
    const shuttles = useShuttles();
    const planetConfig = usePlanetConfig();
    let navigate = useNavigate()

    console.log(shuttles);
    if (shuttles.loading) {
      return <LoadingScreenPlanet enabled={true}></LoadingScreenPlanet>;
    }
    const hanleShuttleSelected = (entity: NFTEntity) => {
      if (isPlanet(entity)) {
        planetConfig.setSeed(entity.seed);
        navigate(`/viewer?id=${entity.seed}`)
      }
    }
    return (
      <div className="examples">
        <div className="examples__cards">
          {shuttles.shuttles.map((shuttle, index) => {
            return (
              <div className={`fade-in fade-delay-${index + 1}`} key={index}>
                  <section className="examples__card">
                      <img src={shuttle.uri} draggable="false" alt="example"/>
                      <h3 className="examples__card__text">{shuttle.name}</h3>
                      <div className="examples__card__button">
                          <Button color='red' onClick={() => hanleShuttleSelected(shuttle)}>Try it out!</Button>
                      </div>
                  </section>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
export default Inventory;