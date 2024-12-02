import express from 'express';
import jwt from 'jsonwebtoken';
import process from 'process';
import passport from 'passport';
import validator from 'validator'; // Install this package using: npm install validator
import crypto from 'crypto';
import Account from '../models/account.js'
import Credential from '../models/credential.js'
import Connector from '../models/connector.js'
import Bot from '../models/bot.js'
import User from '../models/user.js';
import Trading from '../models/strategy.js';
import mongoose from 'mongoose';
import ccxt from 'ccxt';
import dotenv from 'dotenv'
dotenv.config();

const router = express.Router();

router.post('/add-account', async (req, res) => {
    const name = req.query.account_name
    const addAccount = new Account({ name: name })
    await addAccount.save()
    return res.send({ msg: "add account success" })
})

router.get('/list-accounts', async (req, res) => {
    const accounts = await Account.find({}, 'name'); // Select only the 'name' field
    const accountsArray = accounts.map(item => item.name); // Create an array of names
    res.send({ accounts })
})

router.post('/delete-account', async (req, res) => {
    const delName = req.query.account_name

    const result = await Account.findByIdAndDelete(delName)
    if (result) {
        return res.send({ msg: 'success' })
    } else {
        return res.send({ msg: "fatal" })
    }
})

router.get('/available-connectors', async (req, res) => {
    const connectors = await Connector.find({}, 'name')
    return res.send({ connectors })
})

router.post('/add-connector-keys/:account_name/:connector', async (req, res) => {
    const { account_name, connector } = req.params;
    const apikey = req.body;
    let Credential_name;
    let Credential_connector;
    if (mongoose.Types.ObjectId.isValid(account_name)) {
        Credential_name = new mongoose.Types.ObjectId(account_name);
    } else {
        console.error('Invalid ObjectId string:', account_name);
    }

    if (mongoose.Types.ObjectId.isValid(connector)) {
        Credential_connector = new mongoose.Types.ObjectId(connector);
    } else {
        console.error('Invalid ObjectId string:', connector);
    }
    const addCredential = new Credential(
        {
            name: Credential_name,
            connector: Credential_connector,
            apikey: apikey
        }
    )
    await addCredential.save()
    return res.send({ msg: "add credential success" })
})

router.get('/list-credentials/:account_name', async (req, res) => {
    const { account_name } = req.params;
    const credentials = await Credential
        .find({ name: account_name })
        .populate('name')
        .populate('connector');

    return res.send({ credentials });
});

router.post('/bot-config', async (req, res) => {
    const botName = req.body.botName
    const size = req.body.size
    const profit = req.body.profit
    const mode = req.body.mode
    const connector = req.body.connectorValue
    const trading = req.body.tradingValue




    try {
        // Initialize KuCoin with credentials
        const kucoin = new ccxt.kucoin({
            apiKey: '673c26606cbc8d0001aa32c4',
            secret: '9179ae15-8ba3-4d75-8c3c-6c4f47aa47d4',
            password: '9717944941',
        });

        // Fetch account information (requires valid credentials)
        const accountInfo = await kucoin.fetchBalance();

        const marketData = await kucoin.loadMarkets()

        // Print some key account details
        console.log('API Key and Credentials Verified Successfully!');
        // console.log('Account Info:', accountInfo.info.data);
        // console.log('Market Data:', marketData);

        const ethUsdtMarket = marketData['ETH/USDT'];
        if (ethUsdtMarket) {
            console.log('ETH/USDT Market Data:', ethUsdtMarket);
            // const trading = new Trading(ethUsdtMarket.info)
            // await trading.save()

            const bot = new Bot({
                botName: botName,
                size: size,
                profit: profit,
                trading: trading,
                connector: connector,
                mode: mode,
                info: ethUsdtMarket.info
            })

            await bot.save()
        } else {
            console.log('ETH/USDT not found in available markets.');
        }
        return true;
    } catch (error) {
        console.error('Error verifying KuCoin API credentials:', error.message);
        return false;
    }




})

router.get('/get-strategy', async (req, res) => {
    try {

        const strategy = await Bot.find()
        return res.send({
            strategy
        })
    } catch (err) {
        console.log("error", err);

    }

})


export default router;
