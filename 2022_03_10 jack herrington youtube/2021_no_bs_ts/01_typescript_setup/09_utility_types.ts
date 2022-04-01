/*
No BS TS #9 - Typescript Utility Types
https://www.youtube.com/watch?v=tD7DM99nH30&list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n&index=11

Documents
https://www.typescriptlang.org/docs/handbook/utility-types.html

*/

// Example 1
// Partial type
// https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
interface MyUser {
  name: string;
  id: number;
  email?: string;
}

// This basically duplicates the above interface, but all Optional
type MyUserOptionals = Partial<MyUser>;

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
  return {
    ...user,
    ...overrides,
  };
};

console.log(
  merge(
    {
      name: "Jack",
      id: 2,
      email: "dontemail@dontemail.com",
    },
    {
      email: "dontemailbaz@dontemail.com", // this is override
    }
  )
);

// Example 2
// Required type
// https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype
type RequiredMyUser = Required<MyUser>;

// Pick type
// https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
type JustEmailAndName = Pick<MyUser, "email" | "name">;

// Omit type
// https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type UserWithoutID = Omit<MyUser, "id">;

const mapById = (users: MyUser[]): Record<MyUser["id"], UserWithoutID> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;
    return {
      ...a,
      [id]: other,
    };
  }, {});
};

console.log(
  mapById([
    {
      id: 1,
      name: "Mr. Foo",
    },
    {
      id: 2,
      name: "Mrs. Baz",
    },
  ])
);
