export const shortenAddress = (
  account: string | null,
  truncation: number = 4
) => {
  if (!account) {
    return "0x????...????";
  }
  return (
    account.slice(0, truncation + 2) +
    ".." +
    account.slice(account.length - truncation - 1, account.length)
  );
};
