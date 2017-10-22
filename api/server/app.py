from flask import Flask, jsonify, request
from server.messages_pb2 import Transaction
import server.blockchain as blockchain


app = Flask(__name__)

@app.route('/transaction', methods=['POST'])
def create_transaction():
    content = request.get_json()
    tx = Transaction()
    tx.fromAddr = content['from']
    tx.toAddr = content['to']
    tx.amount = content['amount']
    blockchain.create_transaction(tx)
    return 'kek'

@app.route('/status')
def status():
    blockchain.get_status()
    return 'kek'


def main():
    app.run(debug=True)
