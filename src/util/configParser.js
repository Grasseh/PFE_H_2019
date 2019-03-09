const cosmiconfig = require('cosmiconfig');
const ArgumentParser = require('argparse').ArgumentParser;

class ConfigParser{
    parseConfig(){
        let configPath = this.parseArgs();
        return this.parsePaths(configPath);
    }

    parseArgs(){
        var parser = new ArgumentParser({
            version: '0.2',
            addHelp: true,
            description: 'Behavior Driven Development Test Framework'
        });
        parser.addArgument(
            ['-c', '--config'],
            {
                help: 'path to the config file'
            }
        );
        var args = parser.parseArgs();
        console.error(args);
        return args.config;
    }

    parsePaths(configPath){
        const explorer = cosmiconfig('pfe');
        let configs = explorer.searchSync();
        if(configPath){
            configs = explorer.loadSync(configPath);
        }
        if(!configs){
            console.error("No config file found!");
            return process.exit(1);
        }
        let basePath = configs.config.basePath;
        let outputPath = configs.config.outputPath;
        return {basePath, outputPath};
    }
}

module.exports = ConfigParser;