const { Wechaty } = require('wechaty'); // import { Wechaty } from 'wechaty'
const qrTerm = require('qrcode-terminal');
const randomInt = require('./randonInt');
const rd = require('./readData');
const sleep = require('system-sleep');
const qrImage = require('./qrImage')

const WECHATY_PUPPET_PADCHAT_TOKEN = 'puppet_padchat_50a0f4dfeae3fde7';
const puppet = 'wechaty-puppet-padchat';
const puppetOptions = {
  token: WECHATY_PUPPET_PADCHAT_TOKEN,
};

/**
 * 1. Declare your Bot!
 */
const bot = Wechaty.instance({
    // name: 'mybot',
    // puppet,
    // puppetOptions
}); // Global Instance

/**
 * 2. Register event handlers for Bot
 */
bot
.on('logout', onLogout)
.on('login',  onLogin)
.on('scan',   onScan)
.on('error',  onError)
.on('message', onMessage)


/**
 * 3. Start the bot!
 */
bot.start()
.catch(async e => {
console.error('Bot start() fail:', e)
await bot.stop()
process.exit(-1)
})

/**
 * 4. Define Event Handler Functions for:
 *  `scan`, `login`, `logout`, `error`, and `message`
 */
function onScan (qrcode, status) {
    console.log(`${qrcode}`);
    qrTerm.generate(qrcode, { small: true });

    // Generate a QR Code online via
    // http://goqr.me/api/doc/create-qr-code/
    let qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcode),
    ].join('')

    console.log(`[${status}] ${qrcodeImageUrl}\nScan QR Code above to log in: `)

}

function onLogin (user) {
    console.log(`${user.name()} login`)
    bot.say('Wechaty login').catch(console.error)
    // setTimeout(get_qrcode, randomInt.randomInt(4, 8));
    get_qrcode();
}

function onLogout (user) {
    console.log(`${user.name()} logouted`)
}

function onError (e) {
    console.error('Bot error:', e)
}

async function onMessage (msg) {
    console.log(msg.toString())
    
}



async function get_qrcode () {

    let data = rd.readData('./data/data.txt');

    for(let i in data[0]) {
        let roomName = data[0][i];
        console.log('looking for: ', roomName);
        let maxCheckTimes = 3;
        for(let check = 1; check <= maxCheckTimes; check++) {     //寻找3遍

            let second = randomInt.randomInt(5, 10);
            console.log(`Wait ${second} seconds...`);

            sleep(second * 1000);

            let room = await bot.Room.find({topic: roomName});
            
            if (room) {
                console.log(`=======第${check}次寻找成功======`);
                // const topic = await room.topic();
                
                let qrcode = await room.qrcode();

                console.log(`${qrcode}`);
                qrImage.qrcodeToFile(qrcode, data[1][i]);

                qrTerm.generate(qrcode, { small: true });
                // let qrcodeImageUrl = [
                //     'https://api.qrserver.com/v1/create-qr-code/?data=',
                //     encodeURIComponent(qrcode),
                // ].join('');
                console.log(`Scan QR Code above to join in: ${roomName} \n`);

                break;
            }
            else if (check < maxCheckTimes) {
                console.log(`=======第${check}次寻找失败======`);
                
            }
            else {
                console.log(`=======${check}次寻找全失败======`);
                console.log('no this room:', roomName, '\n');
            }
        }


        

    }

    // process.exit(0);
    
}




























