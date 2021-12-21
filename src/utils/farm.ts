import { FarmType } from "src/config"

export const getFarm = (farm: string) => {
  if (farm === FarmType.SushiSwap) return FarmType.SushiSwap
  if (farm === FarmType.Ubeswap) return FarmType.Ubeswap
  return null
}