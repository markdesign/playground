/*
Generics
*/

// Example 1
// Original
function simpleStringState(initial: string): [() => string, (v: string) => void] {
  let str: string = initial;
  return [
    () => str,
    (v: string) => {
      str = v;
    },
  ];
}
// Using Generic, we can use the same function for different types
function simpleState<T>(initial: T): [() => T, (v: T) => void] {
  let val: T = initial;
  return [
    () => val,
    (v: T) => {
      val = v;
    },
  ];
}
const [st1getter, st1setter] = simpleState(10); // 10 is a number, now every place with <T> is a number
console.log(st1getter());
st1setter(62);
console.log(st1getter());

// Example 2
// pass null, but error because <T> is now null.
// solution is to use <string | null>
const [st2getter, st2setter] = simpleState<string | null>(null);
console.log(st2getter());
st2setter("str");
console.log(st2getter());

// Example 3
// this interface is outside scope, so make <RankItem> generic when used inside ranker
// watch it again https://www.youtube.com/watch?v=Q4QDyr0jLfo&list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n&index=8
interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}
function ranker<RankItem>(items: RankItem[], rank: (v: RankItem) => number): RankItem[] {
  const ranks: Rank<RankItem>[] = items.map(item => ({
    item,
    rank: rank(item),
  }));
  ranks.sort((a, b) => a.rank - b.rank);
  return ranks.map(rank => rank.item);
}
interface Pokemon {
  name: string;
  hp: number;
}
const pokemon: Pokemon[] = [
  { name: "Bulbasaur", hp: 20 },
  { name: "Megaasaur", hp: 5 },
];
const ranks = ranker(pokemon, ({ hp }) => hp);
console.log(ranks);
