const myFunction = (name: string, age: number): { name: string; age: number } => {
  console.log('Hello, ' + name + '! You are ' + age + ' years old.');

  return { name: name, age: age };
};

console.log(myFunction('Alice', 25));
