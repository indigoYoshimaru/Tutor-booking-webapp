const nodemailer = require('nodemailer');
const query_service = require('./query_service');
const update_service = require('./update_service');
const { updateMoneyAccount, addTransaction } = require('./update_service');
const Database = use('Database');

function lowerFirst(str) {
    return str[0].toLowerCase() + str.slice(1);
}
module.exports = {
    async sendMail(receiver, content) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'sendmailserviceweb@gmail.com',
                pass: '12211991LTK'
            }
        });
        console.log(receiver);
        console.log(content);
        let mailOptions = {
            from: 'sendmailserviceweb@gmail.com',
            to: receiver,
            subject: 'Welcome to TuHub',
            // text: `Click this URL to verify account ${url}`
            text: content
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return {
                    result: error
                }
            }
            return {
                result: "successful"
            }
        });
    },

    async makeTransaction(senderAcc, receiverAcc, amount) {
        const transaction = await Database.beginTransaction();
        try {
            // check valid money from sender
            if (senderAcc.balanceAmount <= amount) {
                throw new Error("Not enough money in sender's account.");
            }


            // minus money from sender
            // add money to receiver
            // make transaction
            await updateMoneyAccount(senderAcc.id, senderAcc.balanceAmount - amount);
            await updateMoneyAccount(receiverAcc.id, receiverAcc.balanceAmount + amount);
            await addTransaction(senderAcc.id, receiverAcc.id, amount);
            return {
                result: "transaction completed"
            }
        }
        catch (err) {
            console.log(err);
            await transaction.rollback();
        }
    },

    camel(obj) {
        let result = {}

        for (let p in obj)
            result[lowerFirst(p)] = obj[p];

        return result;
    }
}

