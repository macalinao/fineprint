import server.blockchain as blockchain
import gevent
import time
from mastercardblockchain import *
import time
from collections import defaultdict
import traceback

class state:
    balances = defaultdict(int)
    cur_token = None

    def __init__(self, balances=None, cur_token=None):
        if balances:
            self.balances = balances

        self.cur_token = cur_token

    def set_token(self, token):
        self.cur_token = token

class Accountant:
    _state = state()

    def __init__(self, start_at=None):
        self._state.set_token(start_at)

    def start(self):
        def poll():
            while True:
                try:
                    self._poll()
                except Exception as ex:
                    print "Accountant: Exception"
                    traceback.print_exc()
                    time.sleep(5)

        gevent.spawn(poll)

    def _poll(self):
        print "Polling from {}".format(self._state.cur_token)

        mapObj = RequestMap()
        if self._state.cur_token:
            mapObj.set("from", self._state.cur_token)

        new_state = state(self._state.balances.copy(),
            self._state.cur_token)

        res = Block.listByCriteria(mapObj)
        blocks = res.__dict__['_SmartMap__properties']['list']
        for block in blocks:
            new_state.set_token(block['slot'])

            partitions = block.get('partitions', [])
            for partition in partitions:
                if partition['application'] != 'TX67':
                    continue

                for entry in partition['entries']:
                    tx = blockchain.get_transaction(entry)
                    new_state.balances[tx.fromAddr] -= tx.amount
                    new_state.balances[tx.toAddr] += tx.amount

        # only swap state at end (in case of failure)
        self._state = new_state

    def get_balance(self, addr):
        return self._state.balances[addr]
