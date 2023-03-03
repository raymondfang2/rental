import web3 from './web3';

const address = '0x48488aC9EAdDD0639a70ac53B3d4108952A0Ae16'; //'0xa8caE7fCD1091764558B1D22B0bB9b44919bD848';
const abi = [
    {
        "inputs": [],
        "name": "payRental",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "owner1",
                "type": "address"
            },
            {
                "internalType": "address payable",
                "name": "owner2",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "getOwners",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export default new web3.eth.Contract(abi, address);
