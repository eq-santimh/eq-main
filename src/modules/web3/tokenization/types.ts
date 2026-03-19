export type TokenSymbol = string;
export type TokenName = string;

export type TokenizedAssetDraft = {
  name: TokenName;
  symbol: TokenSymbol;
  chainId: number;
  contractAddress?: string;
};

