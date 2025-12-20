export interface TaxBracket {
  min: number;
  max?: number; // optional, the last bracket does not have a max
  rate: number;
}
