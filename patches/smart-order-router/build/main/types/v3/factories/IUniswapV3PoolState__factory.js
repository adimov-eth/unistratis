"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IUniswapV3PoolState__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "feeGrowthGlobal0X128",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "feeGrowthGlobal1X128",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "liquidity",
        outputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "observations",
        outputs: [
            {
                internalType: "uint32",
                name: "blockTimestamp",
                type: "uint32",
            },
            {
                internalType: "int56",
                name: "tickCumulative",
                type: "int56",
            },
            {
                internalType: "uint160",
                name: "secondsPerLiquidityCumulativeX128",
                type: "uint160",
            },
            {
                internalType: "bool",
                name: "initialized",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "key",
                type: "bytes32",
            },
        ],
        name: "positions",
        outputs: [
            {
                internalType: "uint128",
                name: "_liquidity",
                type: "uint128",
            },
            {
                internalType: "uint256",
                name: "feeGrowthInside0LastX128",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "feeGrowthInside1LastX128",
                type: "uint256",
            },
            {
                internalType: "uint128",
                name: "tokensOwed0",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "tokensOwed1",
                type: "uint128",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "protocolFees",
        outputs: [
            {
                internalType: "uint128",
                name: "token0",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "token1",
                type: "uint128",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "slot0",
        outputs: [
            {
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160",
            },
            {
                internalType: "int24",
                name: "tick",
                type: "int24",
            },
            {
                internalType: "uint16",
                name: "observationIndex",
                type: "uint16",
            },
            {
                internalType: "uint16",
                name: "observationCardinality",
                type: "uint16",
            },
            {
                internalType: "uint16",
                name: "observationCardinalityNext",
                type: "uint16",
            },
            {
                internalType: "uint8",
                name: "feeProtocol",
                type: "uint8",
            },
            {
                internalType: "bool",
                name: "unlocked",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "int16",
                name: "wordPosition",
                type: "int16",
            },
        ],
        name: "tickBitmap",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "int24",
                name: "tick",
                type: "int24",
            },
        ],
        name: "ticks",
        outputs: [
            {
                internalType: "uint128",
                name: "liquidityGross",
                type: "uint128",
            },
            {
                internalType: "int128",
                name: "liquidityNet",
                type: "int128",
            },
            {
                internalType: "uint256",
                name: "feeGrowthOutside0X128",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "feeGrowthOutside1X128",
                type: "uint256",
            },
            {
                internalType: "int56",
                name: "tickCumulativeOutside",
                type: "int56",
            },
            {
                internalType: "uint160",
                name: "secondsPerLiquidityOutsideX128",
                type: "uint160",
            },
            {
                internalType: "uint32",
                name: "secondsOutside",
                type: "uint32",
            },
            {
                internalType: "bool",
                name: "initialized",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IUniswapV3PoolState__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IUniswapV3PoolState__factory = IUniswapV3PoolState__factory;
IUniswapV3PoolState__factory.abi = _abi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSVVuaXN3YXBWM1Bvb2xTdGF0ZV9fZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90eXBlcy92My9mYWN0b3JpZXMvSVVuaXN3YXBWM1Bvb2xTdGF0ZV9fZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQStDO0FBQy9DLG9CQUFvQjtBQUNwQixvQkFBb0I7OztBQUdwQixtQ0FBaUQ7QUFNakQsTUFBTSxJQUFJLEdBQUc7SUFDWDtRQUNFLE1BQU0sRUFBRSxFQUFFO1FBQ1YsSUFBSSxFQUFFLHNCQUFzQjtRQUM1QixPQUFPLEVBQUU7WUFDUDtnQkFDRSxZQUFZLEVBQUUsU0FBUztnQkFDdkIsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFNBQVM7YUFDaEI7U0FDRjtRQUNELGVBQWUsRUFBRSxNQUFNO1FBQ3ZCLElBQUksRUFBRSxVQUFVO0tBQ2pCO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsRUFBRTtRQUNWLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsWUFBWSxFQUFFLFNBQVM7Z0JBQ3ZCLElBQUksRUFBRSxFQUFFO2dCQUNSLElBQUksRUFBRSxTQUFTO2FBQ2hCO1NBQ0Y7UUFDRCxlQUFlLEVBQUUsTUFBTTtRQUN2QixJQUFJLEVBQUUsVUFBVTtLQUNqQjtJQUNEO1FBQ0UsTUFBTSxFQUFFLEVBQUU7UUFDVixJQUFJLEVBQUUsV0FBVztRQUNqQixPQUFPLEVBQUU7WUFDUDtnQkFDRSxZQUFZLEVBQUUsU0FBUztnQkFDdkIsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFNBQVM7YUFDaEI7U0FDRjtRQUNELGVBQWUsRUFBRSxNQUFNO1FBQ3ZCLElBQUksRUFBRSxVQUFVO0tBQ2pCO0lBQ0Q7UUFDRSxNQUFNLEVBQUU7WUFDTjtnQkFDRSxZQUFZLEVBQUUsU0FBUztnQkFDdkIsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsSUFBSSxF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