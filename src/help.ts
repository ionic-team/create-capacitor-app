const help = `
  Usage: npm init @capacitor/app [<path>] [options]

  Options:

    --name <name> ............. Human-friendly app name
    --app-id <id> ............. Unique app ID in reverse-DNS notation

    -h, --help ................ Print help, then quit
    --verbose ................. Print verbose output to stderr
`;

export const run = (): void => {
  process.stdout.write(help);
};
