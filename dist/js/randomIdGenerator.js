export const randomIdGenerator = () => {
    const string = "aA1bB2cC3dD4eE5fF6gG7hH8iI9jJ1kK2lL3mM4nN5oO6pP7qQ8rR9sS1tT2uU3vV4wW5xX6yY7zZ8";
    let id = "";
    for (let i = 0; i <= 20; i++) {
        id += string[Math.floor(Math.random() * string.length)];
    }
    return id;
};
