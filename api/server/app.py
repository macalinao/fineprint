from flask import Flask, jsonify, request
from server.messages_pb2 import Transaction
import server.blockchain as blockchain
from gevent import monkey
from server.accountant import Accountant
from datetime import datetime, timedelta
import calendar


d = datetime.utcnow() - timedelta(minutes=5)
unixtime = calendar.timegm(d.utctimetuple())
accountant = Accountant(start_at=unixtime)

app = Flask(__name__)

@app.route('/transactions', methods=['POST'])
def create_transaction():
    content = request.get_json()
    tx = Transaction()
    tx.fromAddr = content['from']
    tx.toAddr = content['to']
    tx.amount = content['amount']
    return blockchain.create_transaction(tx)


@app.route('/transactions/<hash>')
def get_transaction(hash):
    tx = blockchain.get_transaction(hash)
    return jsonify({
        'from': tx.fromAddr,
        'to': tx.toAddr,
        'amount': tx.amount,
    })


@app.route('/accounts/<addr>/balance')
def get_balance(addr):
    return jsonify({
        'balance': accountant.get_balance(addr),
    })


@app.route('/status')
def status():
    blockchain.get_status()
    return ('', 200)


def main():
    accountant.start()
    monkey.patch_all()
    app.run(debug=True)
