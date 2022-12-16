# Lark
Lark is the microblogging platform powered by mina blockchain.

## UI
![ui](ui_react/ui/v2.jpg)

## Features
### currently done
- interface for fetch and display larks (litle text blogposts)
- inteface for creating larks
- mina smart contract for user validation
- backend api for storing the data
### to do
- store data on mina chain
- mint lark blogpost with hashtags
- query larks by hashtags
- filter by hashtags
- add "like button" feature
# Description of the contents

## contracts
consist mina contracts

## ui_react
First iter UI was made with react but there is an error while running the worker so I switched to next from official mina tutorial.
```
Uncaught (in promise) DOMException: Failed to execute 'postMessage' on 'Worker': SharedArrayBuffer transfer requires self.crossOriginIsolated.
```

## ui_next
UI based on next js. Currently in production version of dApp. Basic logic with workers and transaction taken from official [mina 4th tutorial](https://docs.minaprotocol.com/zkapps/tutorials/zkapp-ui-with-react).

## backend
Simple server and api for storing larks