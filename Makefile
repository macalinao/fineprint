proto:
	protoc -I=api/server --python_out=api/server/ api/server/messages.proto
