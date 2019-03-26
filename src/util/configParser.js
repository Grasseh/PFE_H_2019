const cosmiconfig = require('cosmiconfig');
const ArgumentParser = require('argparse').ArgumentParser;

class ConfigParser{
    parseConfig(){
        let args = this.parseArgs();
        return {paths: this.parsePaths(args.config), args};
    }

    parseArgs(){
        let parser = new (this._getArgParser())({
            version: '0.3',
            addHelp: true,
            description: 'Behavior Driven Development Test Framework'
        });
        parser.addArgument(
            ['-c', '--config'],
            {
                help: 'Path to the configuration file.'
            },
        );
        parser.addArgument(
            ['-e', '--verbose'],
            {
                help: 'Increase software verbosity',
                nargs: 0,
                defaultValue : false
            }
        );
        let args = parser.parseArgs();
        return args;
    }

    parsePaths(configPath){
        const explorer = this._getCosmiconfig()('taffee');
        let configs = explorer.searchSync();
        if(configPath){
            configs = explorer.loadSync(configPath);
        }
        if(!configs){
            console.error('No config file found!');
            return this._getProcess().exit(1);
        }
        let basePath = configs.config.basePath;
        let outputPath = configs.config.outputPath;
        let cssFiles = configs.config.cssFile;
        let template = configs.config.template;
        return {basePath, outputPath, cssFiles, template};
    }

    _getArgParser(){
        return ArgumentParser;
    }

    _getCosmiconfig(){
        return cosmiconfig;
    }

    _getProcess(){
        return process;
    }
}

module.exports = ConfigParser;
