---
layout: post
title: Building a Crypto Tax App Part 1
---

In the summer of 2022 I moved to San Diego for the first time. 
I got a position working at a crypto company that wanted to bring me out. They appreciated my talents and passion for blockchain technology.

Two months later, after Bitcoin dropped from the historic 60-70k range to the 20-30k range, I was laid off with many others after 3 seperate failed product launches. We were all crushed by the experience because we had loved working together so much. The seeds seemed to be sowed and out of our hands. (Did I mention we were paid in Bitcoin? Yeah...) 

We had decided we had wanted to make our own crypto based company, as this sort of second-wind rally from a tough blow to the gut. We weren't sure exactly what to do though. Not the same product, certainly.. Seems like we could move on from that at this point.. but where?

The months passed and people dropped off from the idea. Life was happening and there were bills to be paid. It made sense. While we all got jobs however, my pal Mike and I managed to keep the dream alive. 

Mike was our accountant and finance guy. He worked for Deloitt in New York for some time before coming out west to be with us here. He was always talking about creating a better way to manage crypto taxes and accounting procedures. 

While we were in a Twitter (RIP) spaces it had dawned on us. 

There were tons of people in the crypto and NFT spaces simply not saving money for their taxes. People fundamentally were not good with their money and don't really know anything about finances. This space reallyattracts people with the possibility of getting rich quickly. 

If there was a basic tool for withholding funds, a way of managing what you would owe as you go, it would be easier to simple save and know what you have available in your budget.

As we dicussed the idea more and more, I was definitely interested in developing it. I wanted to make sure our idea was sound though. It would be a big project consistenting of a couple servers or a bit of cloud infrastructure. I went with Heroku and Google Cloud for my solutions. 

The main application is a Ruby on Rails app. The server is an express server that is utilizing nodejs processes underneath it.

Currently I've just finished the MVP. We have an application that you can set up your wallet with. Then, when that wallet has taxable transactions recorded on it, it is logged with the server. The users then can see the pending tax withholding transactions per wallet. Right now it's only ethereum but we plan to make it 1 wallet per chain. 

