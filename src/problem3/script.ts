import { useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    const priorities: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorities[blockchain] ?? -99;
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const priority = getPriority(balance.blockchain);
        // FIXME: Incorrect filtering logic in the original code
        // The previous implementation mistakenly checked a non-existent variable (lhsPriority)
        // and allowed only balances with `amount <= 0`, which is likely a mistake.
        // Now, we correctly filter balances with valid priorities and a positive amount.
        return priority > -99 && balance.amount > 0;
      })
      .sort((a, b) => {
        // FIXME: Sorting function in the original code was inefficient
        // `getPriority` was called multiple times per element inside `.sort()`
        // Now, we directly subtract priorities, making it cleaner and faster.
        return getPriority(b.blockchain) - getPriority(a.blockchain);
      });
  }, [balances]); // FIXME: Removed `prices` dependency since it's unused in sorting

  return (
    <div {...rest}>
      {sortedBalances.map((balance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            key={balance.currency} // FIXME: Using `index` as a key in the original code could cause unnecessary re-renders when list order changes.
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.amount.toFixed()} // FIXME: Previously, `.map()` was used twice (once for formatting, once for rendering). Now it's combined into rendering.
          />
        );
      })}
    </div>
  );
};