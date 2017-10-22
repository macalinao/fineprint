from mastercardapicore import RequestMap, Config, APIException, OAuthAuthentication
import os
from mastercardblockchain import *
from server.messages_pb2 import Transaction
import base64


def compute_balance(addr):
	_page_blocks(None, 10000)


def _page_blocks(slot, max):
	mapObj = RequestMap()
	if slot:
		mapObj.set("from", slot)

	res = Block.listByCriteria(mapObj)
	blocks = res.__dict__['_SmartMap__properties']['list']
	for block in blocks:
		nextSlot = block['slot']

		partitions = block.get('partitions', [])
		for partition in partitions:
			if partition['application'] != 'TX67':
				continue



			return

	if nextSlot and max:
		max -= 1
		return _page_blocks(nextSlot, max)


def get_status():
	mapObj = RequestMap()
	response = Status.query(mapObj)
	print response.get("applications[0]") #applications[0]-->MA99


def create_transaction(tx):
	s = tx.SerializeToString()
	return _create_entry(s)

def get_transaction(_hash):
	value = _read_entry(_hash)
	tx = Transaction()
	tx.ParseFromString(value)
	return tx

def _create_entry(value):
	mapObj = RequestMap()
	mapObj.set("app", "TX67")
	mapObj.set("encoding", "base64")
	mapObj.set("value", base64.b64encode(value))

	response = TransactionEntry.create(mapObj)
	return response.get("hash")

def _read_entry(_hash):
	mapObj = RequestMap()
	mapObj.set("hash", _hash)
	response = TransactionEntry.read("", mapObj)
	return response.get('value').decode('hex')


consumerKey = "r2e93TgNZBUUPB289WuFzgDRMrWAX726GWCW2leu5ae31bbf!b329445f61ba471caceaca4c423a0a160000000000000000"   # You should copy this from "My Keys" on your project page e.g. UTfbhDCSeNYvJpLL5l028sWL9it739PYh6LU5lZja15xcRpY!fd209e6c579dc9d7be52da93d35ae6b6c167c174690b72fa
keyStorePath = os.path.join(os.path.dirname(__file__), './fytestkey.p12') # e.g. /Users/yourname/project/sandbox.p12 | C:\Users\yourname\project\sandbox.p12
keyAlias = "keyalias"   # For production: change this to the key alias you chose when you created your production key
keyPassword = "keystorepassword"   # For production: change this to the key alias you chose when you created your production key

auth = OAuthAuthentication(consumerKey, keyStorePath, keyAlias, keyPassword)
Config.setAuthentication(auth)
# Config.setDebug(True) # Enable http wire logging
Config.setSandbox(True)
