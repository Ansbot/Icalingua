import fs from 'fs'
import YAML from 'yaml'
import argv from './argv'
import LoginForm from '../types/LoginForm'
import OnlineStatusType from '../types/OnlineStatusType'

type Config = {
    pubKey: string
    custom: boolean
    port: number
    host: string
}

type UserConfig = {
    account: LoginForm
}

const emptyLoginForm: LoginForm = {
    mdbConnStr: 'mongodb://localhost',
    rdsHost: '127.0.0.1',
    storageType: 'sqlite',
    sqlHost: '127.0.0.1',
    sqlUsername: '',
    sqlPassword: '',
    sqlDatabase: '',
    username: '',
    password: '',
    protocol: 5,
    autologin: false,
    onlineStatus: OnlineStatusType.Online,
}

const CONFIG_PATH = argv.config || 'config.yaml'
export const config: Config = fs.existsSync(CONFIG_PATH) ?
    YAML.parse(fs.readFileSync(CONFIG_PATH, 'utf8')) : {
        pubKey: '207a067892821e25d770f1fba0c47c11ff4b813e54162ece9eb839e076231ab6',
        host: 'localhost',
        port: 6789,
        custom: false,
    }

if (!fs.existsSync('data'))
    fs.mkdirSync('data')

const USER_CONFIG_PATH = argv.data || `data/${config.port}.json`
export const userConfig: UserConfig = fs.existsSync(USER_CONFIG_PATH) ?
    JSON.parse(fs.readFileSync(USER_CONFIG_PATH, 'utf8')) :
    {account: emptyLoginForm}
export const saveUserConfig = () => {
    fs.writeFileSync(USER_CONFIG_PATH, JSON.stringify(userConfig), 'utf-8')
}


