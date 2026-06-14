import { BotController } from '../controllers/bot.controller';
import { Request, Response } from 'express';
jest.mock('../services/whatsapp.service', () => ({
    WhatsAppService: jest.fn().mockImplementation(() => ({
        sendMessage: jest.fn().mockResolvedValue(true)
    }))
}));
jest.mock('../services/stellar.service', () => ({
    StellarService: jest.fn().mockImplementation(() => ({
        checkBalance: jest.fn().mockResolvedValue('100.50'),
        sendPayment: jest.fn().mockResolvedValue({ successful: true, hash: 'tx123' })
    }))
}));
