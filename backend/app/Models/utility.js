const nodemailer = require('nodemailer');
const { updateMoneyAccount, addTransaction } = require('./update_service');
const Database = use('Database');


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
            text: content
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                return {
                    error: err
                }
            }
            return {
                result: "Mail sent successfully"
            }
        });
    },

    async makeTransaction(senderAcc, receiverAcc, amount) {
        const transaction = await Database.beginTransaction();
        try {
            // check valid money from sender
            console.log(senderAcc);
            console.log(receiverAcc);
            if (senderAcc.balanceAmount < amount) {
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
        return {
            error: "transaction incomplete"
        }

    },


}

