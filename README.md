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
### to be done
- store data on mina chain
- query larks by hashtags
- filter by hashtags
# Description of the contents


## contracts
consist mina contracts

## ui_react
First iter UI was made with react but there is an error while running the worker so I switched to next from official mina tutorial.
```
Uncaught (in promise) DOMException: Failed to execute 'postMessage' on 'Worker': SharedArrayBuffer transfer requires self.crossOriginIsolated.
```

## ui_next
UI based on next js. It's currently in production version of dApp