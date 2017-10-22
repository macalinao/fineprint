from mastercardapicore import RequestMap, Config, APIException, OAuthAuthentication
import os
from mastercardblockchain import *


def compute_balance(addr):
	responseList = Block.listByCriteria()
	for key, val in responseList:
		print(key, val)


def get_status():
	mapObj = RequestMap()
	response = Status.query(mapObj)
	print response.get("applications[0]") #applications[0]-->MA99


def create_transaction(tx):
	s = tx.SerializeToString()
	print tx
	_create_entry(s)

def _create_entry(value):
	mapObj = RequestMap()
	mapObj.set("app", "TX67")
	mapObj.set("encoding", "base64")
	mapObj.set("value", value.encode('base64'))

	response = TransactionEntry.create(mapObj)
	return response.get("hash")

def _read_entry(_hash):
	mapObj = RequestMap()
	mapOB.set("hash", _hash)
	response = TransactionEntry.read("", mapObj)
	return response.get("value")



consumerKey = "r2e93TgNZBUUPB289WuFzgDRMrWAX726GWCW2leu5ae31bbf!b329445f61ba471caceaca4c423a0a160000000000000000"   # You should copy this from "My Keys" on your project page e.g. UTfbhDCSeNYvJpLL5l028sWL9it739PYh6LU5lZja15xcRpY!fd209e6c579dc9d7be52da93d35ae6b6c167c174690b72fa
keyStorePath = os.path.join(os.path.dirname(__file__), './fytestkey.p12') # e.g. /Users/yourname/project/sandbox.p12 | C:\Users\yourname\project\sandbox.p12
keyAlias = "keyalias"   # For production: change this to the key alias you chose when you created your production key
keyPassword = "keystorepassword"   # For production: change this to the key alias you chose when you created your production key

auth = OAuthAuthentication(consumerKey, keyStorePath, keyAlias, keyPassword)
Config.setAuthentication(auth)
Config.setDebug(True) # Enable http wire logging
Config.setSandbox(True)
